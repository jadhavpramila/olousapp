<template>
  <div class="form-container">
    <BlockUI :blocked="blockPage" :fullScreen="true">
      <div v-if="showOTPpopup" class="absolute">
        <OTPModal
          :details="otpData"
          :startTimer="startTimer"
          :errorMessage="errorMessage"
          @verify_OTP_button_click="OTPverify"
          @otp_verification_cancel="OTPVerificationCancel"
          @otpTimer_resendOTP="resendOTP"
        />
      </div>
    </BlockUI>
    <div v-if="showCountryPhoneCodePopup">
      <selectCountryPhoneCode
        @close_button_click="closePhoneCode"
        @selected_country_click="savePhoneCode"
      />
    </div>
    <div v-if="is_show_order_details">
      <div
        class="lg:page-height rounded-lg flex flex-col md:flex-row justify-items-stretch w-full h-full text-black"
        style="overflow-y: auto"
      >
        <div
          class="rounded-l-lg flex-shrink w-full text-center md:text-left"
          :class="
            order_details.module_type == PricingModuleType_enum.LEAD &&
            show_module_details
              ? 'md:pt-5 md:pb-5 app-bg-color-secondary app-border'
              : ''
          "
          style="overflow-y: auto"
        >
          <div
            v-if="
              order_details.module_type == PricingModuleType_enum.LEAD &&
              show_module_details
            "
            class="pl-5 pr-5"
          >
            <div class="font-bold text-lg mb-2">Lead :</div>
            <LeadReadOnly
              :leadData="module_lead_data"
              :id="module_lead_data.id"
            ></LeadReadOnly>
          </div>
          <div
            v-if="
              order_details.module_type == PricingModuleType_enum.JOB &&
              show_module_details
            "
            class="h-full"
          >
            <!-- <div class="font-bold text-lg mb-2">Job Pricing :</div> -->
            <JobReadOnlyVue
              :jobData="module_job_data"
              :id="module_job_data.id"
            ></JobReadOnlyVue>
          </div>
        </div>
        <div class="flex-none w-full md:w-2 h-2 md:h-full"></div>
        <div
          class="rounded-r-lg flex-shrink w-full lg:pt-5 lg:pb-5 md:pt-5 md:pb-5 pb-4 pt-4 app-border"
        >
          <div class="ml-5 mr-5">
            <div class="font-bold text-[20px]">Payment Details</div>

            <div class="mt-4">
              <div class="form-label-bg-w">Phone</div>
              <div class="flex flex-col lg:flex-row">
                <div class="flex flex-grow-1 w-full">
                  <div class="">
                    <!-- <button
                      class="btn text-center text-gray-900 bg-[#f2f2f2] border-r focus:outline-none rounded-r-lg"
                    >
                      +91
                    </button> -->
                    <button
                      @click="openPhoneCodePopup()"
                      class="disabled:opacity-50 inline-flex items-center form-control justify-center w-auto"
                      :disabled="isPhoneDisabled"
                      style="
                        border-right: none;
                        border-bottom-right-radius: 0;
                        border-top-right-radius: 0;
                      "
                    >
                      <span>
                        {{ order_details.country_code_to_display_user }}</span
                      >
                    </button>
                  </div>
                  <div class="flex-grow-1 w-full mr-2">
                    <input
                      type="text"
                      v-model="order_details.contact_to_display_user"
                      class="disabled:opacity-50 w-full form-control"
                      maxlength="60"
                      tabindex="2"
                      :disabled="isPhoneDisabled"
                      style="
                        border-bottom-left-radius: 0;
                        border-top-left-radius: 0;
                      "
                    />
                  </div>
                </div>

                <div
                  class="flex-shrink-0 flex-grow-0 flex-col mt-2 lg:flex-row lg:mt-0"
                >
                  <button
                    class="disabled:opacity-50 btn inline-flex items-center mt-0.5 h-11 disabled:hover:bg-white disabled:hover:text-black justify-center w-auto"
                    @click="requestForOTP()"
                    :disabled="isPhoneDisabled"
                  >
                    Request OTP
                  </button>
                </div>
              </div>
              <div class="invalid-feedback-white-bg mt-2" v-if="is_contact_req">
                Phone number required
              </div>
              <div
                class="invalid-feedback-white-bg mt-2"
                v-if="is_contact_verification_req"
              >
                Please request OTP & verify phone number
              </div>
              <div
                class="invalid-feedback-white-bg mt-2"
                v-if="is_country_code_req"
              >
                Country code required
              </div>
            </div>

            <div class="">
              <div class="">
                <div class="form-label-bg-w">Name</div>
                <div>
                  <input
                    type="text"
                    v-model="order_details.name"
                    class="disabled:opacity-50 form-control"
                    maxlength="60"
                    :disabled="isNameDisabled"
                  />
                </div>
                <div class="invalid-feedback-white-bg" v-if="is_name_req">
                  Name required
                </div>
              </div>

              <div class="">
                <div class="form-label-bg-w">Email</div>
                <div>
                  <input
                    type="text"
                    v-model="order_details.email"
                    class="disabled:opacity-50 w-full form-control"
                    maxlength="60"
                    :disabled="isEmailDisabled"
                  />
                </div>
                <div class="invalid-feedback-white-bg" v-if="is_email_req">
                  Email required
                </div>
              </div>

              <div class="mt-4">
                <div class="flex justify-between">
                  <div class="form-label-bg-w">Original Price:</div>
                  <div class="flex">
                    <div class="form-label-bg-w">
                      {{ order_details.amount_to_display_user }}
                    </div>
                    <div class="w-2"></div>
                    <div class="form-label-bg-w ml-0">
                      {{ show_currency_symbol(order_details.currency) }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <div class="form-label-bg-w">Discount:</div>
                  <div class="flex">
                    <div class="form-label-bg-w">
                      {{ order_details.discount_amount }}
                    </div>
                    <div class="w-2"></div>
                    <div class="form-label-bg-w ml-0">
                      {{ show_currency_symbol(order_details.currency) }}
                    </div>
                  </div>
                </div>
                <hr class="w-full mt-2 mb-2" />
                <div class="flex justify-between">
                  <div class="form-label-bg-w">Amount to be paid:</div>
                  <div class="flex">
                    <div class="form-label-bg-w">
                      {{ order_details.amount_after_discount_to_display_user }}
                    </div>
                    <div class="w-2"></div>
                    <div class="form-label-bg-w ml-0">
                      {{ show_currency_symbol(order_details.currency) }}
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <div class="form-label-bg-w">+ 18% GST:</div>
                  <div class="flex">
                    <div class="form-label-bg-w">
                      {{ getGSTAmount() }}
                    </div>
                    <div class="w-2"></div>
                    <div class="form-label-bg-w ml-0">
                      {{ show_currency_symbol(order_details.currency) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex mt-4">
                <div class="w-full flex-grow-1 w-full mr-2">
                  <input
                    v-model="coupon"
                    type="text"
                    class="disabled:opacity-50 w-full form-control"
                    maxlength="60"
                    placeholder="Have a coupon?"
                  />
                </div>
                <div class="flex-shrink-0 flex-grow-0">
                  <button
                    class="disabled:opacity-50 btn inline-flex items-center justify-center mt-0.5 h-11 w-auto"
                    @click="btnApplyCoupon()"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>

              <div class="mt-8">
                <button
                  class="disabled:opacity-50 btn inline-flex items-center justify-center w-auto mb-2"
                  @click="payButtonClick()"
                  style="width: 100% !important"
                  tabindex="1"
                >
                  Pay
                  {{ getFinalAmountToBePaid() }}&nbsp;{{
                    show_currency_symbol(order_details.currency)
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <!-- <div>
        <span class="px-10 py-5 error-border fontSize16">{{
          error_message
        }}</span>
      </div> -->

      <div class="page-height flex justify-center w-full h-full">
        <div
          class="flex"
          style="max-width: 430px; max-height: 430px; margin: auto"
        >
          <span
            class="px-10 py-5 error-border fontSize16 app-text-color-secondary"
            >{{ error_message }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { order } from "../../store/modelClasses/PricingModel";
import appConstants from "../../appConstants.js";
import { getCurrencySymbol } from "../../common/js/currency.js";
import useStaticImage from "../../composables/useStaticImage.js";
import OTPModal from "../common/OTPModal.vue";
import BlockUI from "primevue/blockui";
import useVuelidate from "@vuelidate/core";
import selectCountryPhoneCode from "../common/selectCountryPhoneCode.vue";
import LeadReadOnly from "../Lead/LeadReadOnly.vue";
import JobReadOnlyVue from "../Jobs/JobReadOnly.vue";
import { getCurrentEncodedURL } from "../../common/js/webUrls";

export default {
  name: "Pricing",
  components: {
    OTPModal,
    BlockUI,
    selectCountryPhoneCode,
    LeadReadOnly,
    JobReadOnlyVue,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    var RPAY_KEY = import.meta.env.VITE_APP_RPAY_KEY;
    var order_id = ref(null);
    var rzp1 = ref(null);
    var coupon = ref("");
    var error_message = ref("");
    var is_show_order_details = ref(false);
    const getStaticImageURL = useStaticImage();
    var showOTPpopup = ref(false);
    var blockPage = ref(false);
    var is_contact_req = ref(false);
    var is_contact_verification_req = ref(false);
    var is_country_code_req = ref(false);
    var is_name_req = ref(false);
    var is_email_req = ref(false);
    var showCountryPhoneCodePopup = ref(false);
    var startTimer = ref(false);
    // var alreadyHasPhoneNumber = ref(false);

    var module_lead_data = ref({});
    var module_job_data = ref({});
    var show_module_details = ref(false);
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );

    var PricingModuleType_enum = appConstants.PricingModuleType;

    var otpData = reactive({
      type: "phone",
      value: "123456",
    });

    var isEmailDisabled = ref(false);
    var isNameDisabled = ref(false);
    var isPhoneDisabled = ref(false);

    const order_details = reactive({
      id: "",
      name: "",
      email: "",
      contact: "",
      country_code: "+91",
      contact_to_display_user: "",
      country_code_to_display_user: "+91",

      currency: "",
      amount: "",
      amount_after_discount: "",
      coupon_id: "",
      discount_amount: 0,
      amount_to_display_user: "",
      amount_after_discount_to_display_user: "",

      module_type: "",
      module_id: "",

      razorpay_order_id: "",
      notes: null,
    });

    onMounted(() => {
      order_id.value = route.params.order_id;
      store
        .dispatch("order/action_getOrderDetails", order_id.value)
        .then((response) => {
          setOrderDetails(response, true);
          is_show_order_details.value = true;

          if (
            order_details.contact != "" &&
            order_details.country_code != null
          ) {
            isPhoneDisabled.value = true;
            // alreadyHasPhoneNumber.value = true;
          }

          if (order_details.email != "" && order_details.email != null) {
            isEmailDisabled.value = true;
          }

          if (order_details.name != "" && order_details.name != null) {
            isNameDisabled.value = true;
          }

          showDetailsOFModuleForWhichThisPaymentIs();
        })
        .catch((err) => {
          //   print(err.message);
          is_show_order_details.value = false;
          error_message.value = err.response.data.message;
        });
    });

    function showDetailsOFModuleForWhichThisPaymentIs() {
      if (order_details.module_type == appConstants.PricingModuleType.LEAD) {
        store
          .dispatch(
            "lead/action_getLeadsDetailsFromLeadApplicationId",
            order_details.module_id
          )
          .then((response) => {
            // alert("inside response")
            module_lead_data.value = response;
            show_module_details.value = true;
          })
          .catch((err) => {});
      }
      if (order_details.module_type == appConstants.PricingModuleType.EVENT) {
        //event page
      }
      if (order_details.module_type == appConstants.PricingModuleType.JOB) {
        if (getter_isUserLoggedIn.value) {
          store
            .dispatch(
              "jobs/action_getPlanDetailsFromPricingPlanId",
              order_details.module_id
            )
            .then((response) => {
              // alert("inside response")
              module_job_data.value = response;
              show_module_details.value = true;
            })
            .catch((err) => {});
        } else {
          getCurrentEncodedURL();
        }
      }

      return;
    }

    function setOrderDetails(response, is_page_load) {
      order_details.id = response.id;
      order_details.name = response.name;
      order_details.email = response.email;
      order_details.contact = response.contact;
      if (
        response.country_code != "" &&
        response.country_code != null &&
        response.contact != "" &&
        response.contact != null
      ) {
        order_details.country_code = response.country_code;
        order_details.contact = response.contact;
      } else {
        order_details.country_code = "+91";
        order_details.contact = "";
      }

      order_details.contact_to_display_user = order_details.contact;
      order_details.country_code_to_display_user = order_details.country_code;
      order_details.currency = response.currency;
      order_details.amount = response.amount;
      order_details.amount_after_discount = response.amount_after_discount;

      //On page load do not show previous coupon details to amount_after_discout =  amount
      order_details.coupon_id = "";
      order_details.discount_amount = 0;

      order_details.amount_to_display_user = response.amount_to_display_user;

      if (is_page_load == true) {
        order_details.amount_after_discount_to_display_user =
          response.amount_to_display_user;
      } else {
        order_details.amount_after_discount_to_display_user =
          response.amount_after_discount_to_display_user;
      }

      order_details.module_type = response.module_type;
      order_details.module_id = response.module_id;

      order_details.notes = response.notes;

      order_details.razorpay_order_id = response.razorpay_order_id;
    }
    function payButtonClick() {
      //Validation
      let is_valid = true;

      if (
        order_details.contact_to_display_user == "" ||
        order_details.contact_to_display_user == null
      ) {
        is_contact_req.value = true;
        is_valid = false;
      } else {
        is_contact_req.value = false;
      }

      if (order_details.contact_to_display_user != order_details.contact) {
        is_contact_verification_req.value = true;
        is_valid = false;
      } else {
        is_contact_verification_req.value = false;
      }

      if (
        order_details.country_code == "" ||
        order_details.country_code == ""
      ) {
        is_country_code_req.value = true;
        is_valid = false;
      } else {
        is_country_code_req.value = false;
      }

      if (order_details.name == "" || order_details.name == "") {
        is_name_req.value = true;
        is_valid = false;
      } else {
        is_name_req.value = false;
      }

      if (order_details.email == "" || order_details.email == "") {
        is_email_req.value = true;
        is_valid = false;
      } else {
        is_email_req.value = false;
      }

      if (is_valid == false) {
        return;
      }

      let obj = {
        order_id: order_details.id,
        name: order_details.name,
        email: order_details.email,
        contact: order_details.contact,
        country_code: order_details.country_code,
        // amount_after_discount:
        //   order_details.amount_after_discount_to_display_user,
        amount_after_discount: getFinalAmountToBePaid(),
        coupon_id: order_details.coupon_id,
      };

      console.log(`pay paylaod : ${obj["amount_after_discount"]}`);
      // return;

      store
        .dispatch("order/action_orderUpdateToTransaction", obj)
        .then((response) => {
          setOrderDetails(response, false);
          set_rayzorpay_details();
          rzp1.open();
          e.preventDefault();
        })
        .catch((err) => {});
    }

    function show_currency_symbol(currency) {
      return getCurrencySymbol(currency);
    }

    function btnApplyCoupon() {
      var data = {
        coupon: coupon.value,
        module_type: order_details.module_type,
        module_id: order_details.module_id,
        amount: order_details.amount_to_display_user,
      };

      store
        .dispatch("order/action_applyCoupon", data)
        .then((response) => {
          coupon.value = "";

          order_details.coupon_id = response["coupon_id"];
          order_details.discount_amount = response["discount"];
          order_details.coupon_id = response["coupon_id"];
          order_details.amount_after_discount_to_display_user =
            response["final_amount"];
        })
        .catch((err) => {
          coupon.value = "";
          order_details.coupon_id = "";
          order_details.discount_amount = 0;
          order_details.coupon_id = "";
          order_details.amount_after_discount_to_display_user =
            order_details.amount_to_display_user;
        });
    }

    function set_rayzorpay_details() {
      //https://razorpay.com/docs/payments/server-integration/python/payment-gateway/build-integration/

      var logo_url = getOlousLogo();
      var options = {
        key: RPAY_KEY,
        amount: order_details.amount_after_discount,
        currency: order_details.currency,
        name: "Olous",
        description: "",
        image: logo_url,
        order_id: order_details.razorpay_order_id,
        handler: function (response) {
          after_payment_successfully_done(response);
        },
        prefill: {
          name: order_details.name,
          email: order_details.email,
          contact: order_details.contact,
        },
        notes: order_details.notes,
        theme: {
          color: "#3399cc",
        },
      };

      rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        // alert("payment fail");
        after_payment_fail(response);
      });
    }

    function after_payment_fail(response) {
      let error_obj = response["error"];
      let metadata_obj = error_obj["metadata"];
      let description =
        error_obj["description"] == undefined ? "" : error_obj["description"];

      if (metadata_obj != undefined) {
        let payment_id = metadata_obj["payment_id"];
        let order_id = metadata_obj["order_id"];

        var obj = {
          razorpay_order_id: order_id,
          razorpay_payment_id: payment_id,
          fail_description: description,
        };

        store
          .dispatch("order/action_orderPaymentFail", obj)
          .then((response) => {
            //console.log("response")
          })
          .catch((err) => {
            //console.log("error")
          });
      }
    }

    function after_payment_successfully_done(response) {
      var obj = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };
      console.log("obj  =>", obj);
      store
        .dispatch("order/action_orderPaymentDone", obj)
        .then((response) => {
          if (order_details.module_type == appConstants.PricingModuleType.JOB) {
            window.open(`${import.meta.env.VITE_APP_BUSINESS_URL}job`, "_self");
          } else if (
            order_details.module_type == appConstants.PricingModuleType.LEAD
          ) {
            router.push({
              name: appConstants.routes.PRICING_SUCCESS,
            });
          }
          // if (
          //   order_details.module_type == appConstants.PricingModuleType.EVENT
          // ) {
          //   //Event success page
          // } else {
          //   //Default success page of payment
          // }
        })
        .catch((err) => {});
    }

    function getOlousLogo() {
      var url = getStaticImageURL("square_olous_logo.png");
      return url;
    }

    function openPhoneCodePopup() {
      showCountryPhoneCodePopup.value = true;
    }

    function closePhoneCode() {
      showCountryPhoneCodePopup.value = false;
    }

    function savePhoneCode(value) {
      closePhoneCode();
      order_details.country_code_to_display_user = value;
    }

    function requestForOTP() {
      let is_valid = true;

      is_contact_verification_req.value = false;

      if (
        order_details.contact_to_display_user == "" ||
        order_details.contact_to_display_user == null
      ) {
        is_contact_req.value = true;
        is_valid = false;
      } else {
        is_contact_req.value = false;
      }

      if (
        order_details.country_code_to_display_user == "" ||
        order_details.country_code_to_display_user == ""
      ) {
        is_country_code_req.value = true;
        is_valid = false;
      } else {
        is_country_code_req.value = false;
      }

      if (is_valid == false) {
        return;
      }

      var obj = {
        otp_for: order_details.contact_to_display_user,
        country_code: order_details.country_code_to_display_user,
        otp_type: appConstants.OTPEnums.PRICING_PHONE_VERIFICATION_OTP,
      };

      store
        .dispatch("otp/action_requestForOTP", obj)
        .then((response) => {
          otpData.value = `${order_details.country_code_to_display_user} ${order_details.contact_to_display_user}`;
          showOTPpopup.value = true;
          startTimer.value = false;
          startTimer.value = true;
        })
        .catch((err) => {});
    }

    function OTPverify(value) {
      var obj = {
        otp_for: order_details.contact_to_display_user,
        country_code: order_details.country_code_to_display_user,
        otp: value,
      };

      store
        .dispatch("otp/action_checkIsOTPCorrect", obj)
        .then((response) => {
          order_details.country_code =
            order_details.country_code_to_display_user;
          order_details.contact = order_details.contact_to_display_user;

          showOTPpopup.value = false;
          isPhoneDisabled.value = true;
        })
        .catch((err) => {});
    }

    function OTPVerificationCancel() {
      showOTPpopup.value = false;
      order_details.contact_to_display_user = order_details.contact;
      order_details.country_code_to_display_user = order_details.country_code;
    }

    function resendOTP() {
      startTimer.value = false;
      requestForOTP();
    }

    // function getDivStyle() {
    //   // if (is_disabled.value) {
    //   //   return "opacity : 50%";
    //   // } else {
    //   //   return "opacity : 100%";
    //   // }
    // }

    function getDisabledStyle(isDisabled) {
      if (isDisabled) {
        return "opacity : 50%";
      } else {
        return "opacity : 100%";
      }
    }

    function getGSTAmount() {
      if (order_details.amount_after_discount_to_display_user > 0) {
        let final_amount_with_GST =
          (order_details.amount_after_discount_to_display_user * 18) / 100;

        if (final_amount_with_GST > 0) {
          return final_amount_with_GST;
        } else {
        }
        return 0;
      } else {
        return 0;
      }
    }

    function getFinalAmountToBePaid() {
      let final_amount =
        order_details.amount_after_discount_to_display_user + getGSTAmount();

      if (final_amount > 0) {
        return final_amount;
      } else {
        return 0;
      }
    }

    return {
      coupon,
      showCountryPhoneCodePopup,
      order_details,
      payButtonClick,
      show_currency_symbol,
      btnApplyCoupon,
      error_message,
      is_show_order_details,
      // getDivStyle,
      showOTPpopup,
      otpData,
      blockPage,
      OTPverify,
      OTPVerificationCancel,
      resendOTP,
      is_contact_req,
      is_name_req,
      is_email_req,
      openPhoneCodePopup,
      closePhoneCode,
      savePhoneCode,
      requestForOTP,
      startTimer,
      module_lead_data,
      module_job_data,
      PricingModuleType_enum,
      show_module_details,
      isEmailDisabled,
      getDisabledStyle,
      isNameDisabled,
      isPhoneDisabled,
      is_contact_verification_req,
      is_country_code_req,
      getter_isUserLoggedIn,
      getGSTAmount,
      getFinalAmountToBePaid,
    };
  },
};
</script>

<style>
.page-height {
  height: calc(100vh - 180px) !important;
  max-height: calc(100vh - 122px) !important;
}

.invalid-feedback-white-bg {
  /* margin-left: 0.625rem; */
  color: var(--app-error-color);
  font-size: 12px;
}

/*.form-label-bg-w {
   margin-left: 0.625rem;
}*/

.error-border {
  border: 0.8px solid #dee2e6;
}
</style>
