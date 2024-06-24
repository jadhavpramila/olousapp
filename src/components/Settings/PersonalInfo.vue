<template>
  <div class="block flex items-center justify-end lg:hidden md:hidden p-2">
    <img
      :src="getStaticImage('Setting-Menu-Close.svg')"
      alt=""
      @click="clickCloseForm()"
    />
  </div>
  <div class="cls-personal-info lg:p-8 md:p-8 p-4 w-full">
    <BlockUI :blocked="editProfile.blockPage" :fullScreen="true">
      <div v-if="editProfile.popup" class="absolute">
        <OTPModal
          :details="otpData"
          :startTimer="startTimer"
          :errorMessage="errorMessage"
          @verify_OTP_button_click="OTPverify"
          @otp_verification_cancel="cancelchange"
          @otpTimer_resendOTP="resendOTP"
        />
      </div>
    </BlockUI>
    <div v-if="selectPhoneCode">
      <selectCountryPhoneCode
        @close_button_click="closePhoneCode"
        @selected_country_click="savePhoneCode"
      />
    </div>
    <div class="flex w-full">
      <div class="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 gap-4 w-full">
        <div class="lg:col-span-2 md:col-span-2" v-if="profile_image">
          <UploadImage
            id="logoImage"
            component_height="160"
            background_color="none"
            circle_border="1px solid #000"
            is_logo_image="true"
            :save_image_path_value="path_s3_save_image"
            :image_name_value="profile_image"
            :submitted="false"
            is_object_fit_contain="true"
            :upload_button_text="shortForm()"
            required_validation_message="Profile picture required"
            @uploadedImage_changed="getUpdatedLogoImage"
          />
        </div>
        <div class="lg:col-span-2 md:col-span-2" v-if="!profile_image">
          <UploadImage
            id="logoImage"
            component_height="160"
            background_color="none"
            circle_border="1px solid #000"
            is_logo_image="true"
            :save_image_path_value="path_s3_save_image"
            :image_name_value="profile_image"
            :submitted="false"
            is_object_fit_contain="true"
            :upload_button_text="shortForm()"
            required_validation_message="Profile picture required"
            @uploadedImage_changed="getUpdatedLogoImage"
          />
        </div>
        <div class="col-span-4">
          <div>
            <label for="FirstName" class="form-label-bg-w"> First Name </label>
            <input
              v-model="state.first_name"
              placeholder=""
              type="text"
              class="form-control text-sm text-gray-900 w-full focus:outline-none rounded-lg"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.first_name.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <div>
            <label for="LastName" class="form-label-bg-w"> Last Name </label>
            <input
              v-model="state.last_name"
              placeholder=""
              type="text"
              class="form-control text-sm text-gray-900 w-full focus:outline-none rounded-lg"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.last_name.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-full">
        <label for="Designation" class="form-label-bg-w"> Designation </label>
        <input
          v-model="state.designation"
          placeholder=""
          type="text"
          class="form-control text-sm text-gray-900 w-full focus:outline-none rounded-lg"
        />
        <div
          class="invalid-feedback"
          v-for="error of v$.designation.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="Country" class="form-label-bg-w"> Country </label>
        <AutoComplete
          v-model="state.country"
          :suggestions="countriesList"
          @complete="fetchFilteredCounties($event)"
          @item-select="countrySelectedByUser"
          @item-unselect="countryUnSelectedByUser"
          @clear="countryUnSelectedByUser"
          :dropdown="true"
          field="_source.name"
          forceSelection
          placeholder=""
          class="p-2 text-sm form-control text-gray-900 w-full rounded-lg"
        >
        </AutoComplete>
        <div
          class="invalid-feedback"
          v-for="error of v$.country.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
      <div>
        <label for="City" class="form-label-bg-w"> City </label>
        <AutoComplete
          v-model="selectedCity"
          :suggestions="getter_cities"
          @complete="selectedPlace($event)"
          @item-select="locationSelectedByUser"
          @item-unselect="locationUnSelectedByUser"
          @clear="locationUnSelectedByUser"
          :dropdown="true"
          field="_source.name"
          forceSelection
          placeholder=""
          :disabled="state.country ? false : true"
          class="w-full text-sm text-gray-700 rounded-lg form-control"
        >
          <template #item="slotProps">
            <div class="country-item">
              <div class="p-ml-2">
                {{ slotProps.item._source.city }},
                {{ slotProps.item._source.state }}
                <!-- ,
                {{ slotProps.item._source.country.name }} -->
              </div>
            </div>
          </template>
        </AutoComplete>
        <div
          class="invalid-feedback"
          v-for="error of v$.city.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-1 form-group">
      <label for="ProfileTagline" class="form-label-bg-w">
        Profile Tagline (Eg: Passionate for construction)
      </label>
      <input
        v-model="state.about"
        placeholder=""
        type=""
        maxlength="100"
        class="form-control text-sm text-gray-900 w-full focus:outline-none rounded-lg"
      />
      <div
        class="invalid-feedback"
        v-for="error of v$.about.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </div>
    </div>
    <div class="flex mb-2">
      <span class="text-lg font-weight-600 app-text-color-secondary"
        >Login Details</span
      >
    </div>
    <div class="grid grid-cols-1 form-group gap-1">
      <div class="w-full">
        <label for="Mobile" class="form-label-bg-w"> Mobile </label><br />
        <div class="grid grid-cols-4 lg:gap-4 gap-1">
          <div class="flex col-span-3 justify-center">
            <div>
              <button
                @click="openPhoneCode()"
                class="lg:w-24 w-14 text-center text-sm form-control text-gray-900 border-r focus:outline-none rounded-r-lg"
              >
                <span
                  v-if="editProfile.country_code == ''"
                  class="text-[#a2a4af]"
                  >+91</span
                >
                <span v-else> {{ editProfile.country_code }}</span>
              </button>
            </div>

            <input
              v-model="editProfile.phone_to_verify"
              placeholder=""
              type="text"
              maxlength="17"
              class="ml-1 text-sm form-control text-gray-900 w-full rounded-pr-lg focus:outline-none"
            />
          </div>
          <div class="">
            <button
              class="btn my-1 btn-inputeControlHeight"
              type="submit"
              @click="sendOTP('phone')"
            >
              <span v-if="editProfile.verifyButtonTextPhone"> Verify </span>
              <span v-if="!editProfile.verifyButtonTextPhone"> Change </span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <label for="Email" class="form-label-bg-w"> Email </label>
        <div class="grid grid-cols-4 lg:gap-4 gap-1">
          <div class="col-span-3 flex">
            <input
              v-model="editProfile.email_to_verify"
              placeholder=""
              type="email"
              class="form-control text-sm text-gray-900 w-full focus:outline-none rounded-lg"
            />
          </div>
          <div>
            <button
              class="btn my-1 btn-inputeControlHeight"
              type="submit"
              @click="sendOTP('email')"
            >
              <span v-if="editProfile.isThereEmail"> Verify </span>
              <span v-if="!editProfile.isThereEmail"> Change </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="flex">
        <!-- <button
          class="w-auto text-base flex items-center btn btn-controls hover-experience hover-effect mr-4 px-5"
          type="submit"
          @click="btnBackClick()"
        >
          Back
        </button> -->
        <button class="btn btn-controls" @click="saveProfile()" type="submit">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "../../appConstants.js";
import OTPModal from "../common/OTPModal.vue";
import BlockUI from "primevue/blockui";
import selectCountryPhoneCode from "../../components/common/selectCountryPhoneCode.vue";
import {
  ref,
  onMounted,
  computed,
  onBeforeMount,
  reactive,
  watchEffect,
} from "vue";
import UploadImage from "../common/UploadImage.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AutoComplete from "primevue/autocomplete";
import { useToast } from "primevue/usetoast";
import useEmitter from "../../composables/useEmitter.js";

export default {
  name: "PersonalInfo",
  inheritAttrs: false,
  components: {
    UploadImage,
    AutoComplete,
    OTPModal,
    BlockUI,
    selectCountryPhoneCode,
  },
  data() {
    return {};
  },

  setup() {
    let path_s3_save_image = appConstants.PATH_SAVE_MEDIA_IMAGE_ON_S3;
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let selectedCountryIso2 = ref("");
    let selectPhoneCode = ref(false);
    let profile_image = ref("");
    const $emitter = useEmitter();
    let selectedCity = ref("");

    let countriesList = computed(
      () => store.getters["dropdown/getter_countries"]
    );

    let filteredLocation = computed(
      () => store.getters["dropdown/getter_searchLocation"]
    );

    let userProfileData = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_cities = computed(() => store.getters["dropdown/getter_cities"]);
    let userData = computed(() => store.getters["login/getter_user"]);

    const state = reactive({
      first_name: "",
      last_name: "",
      designation: "",
      country: "",
      city: "",
      about: "",
    });

    let editProfile = reactive({
      country_iso: "",
      country_code: "",
      state: "",
      state_iso: "",
      cityInput: "",
      // errorMessage: "",
      submitted: false,
      isThereEmail: "",
      message: "",
      status: "",
      blockPage: false,
      // startTimer: false,
      display: false,
      popup: false,
      isemailORPhone: "",
      // otpData: {},
      email_to_verify: "",
      phone_to_verify: "",
      verifyButtonTextPhone: true,
      email: "",
      phone: "",
    });
    let otpData = ref({});
    let startTimer = ref(false);
    let errorMessage = ref("");
    const rules = {
      first_name: {
        required: helpers.withMessage("First name is required", required),
      },
      last_name: {
        required: helpers.withMessage("Last name is required", required),
      },
      designation: {
        required: helpers.withMessage("Designation is required", required),
      },
      city: {
        required: helpers.withMessage("City is required", required),
      },
      country: {
        required: helpers.withMessage("Country is required", required),
      },
      about: {
        required: helpers.withMessage("Profile Tagline is required", required),
      },
    };
    const v$ = useVuelidate(rules, state);

    onMounted(async () => {
      $emitter.on("otp_verification", (data) => {
        // console.log(data);
        if (data == true) {
          this.popup = false;
          this.blockPage = false;
        }
      });
    });

    fetchUserProfile();
    function openPhoneCode() {
      selectPhoneCode.value = true;
    }
    function closePhoneCode() {
      selectPhoneCode.value = false;
    }
    function savePhoneCode(value) {
      selectPhoneCode.value = false;
      editProfile.country_code = value;
    }
    function cancelchange() {
      editProfile.popup = false;
    }
    function resendOTP() {
      // console.log(this.isemailORPhone);
      sendOTP(editProfile.isemailORPhone);
    }
    function closeModal() {
      editProfile.display = false;
    }
    function OTPverify(value) {
      // console.log(value);
      if (editProfile.isemailORPhone == "email" && value) {
        // this.popup = false;
        editProfile.blockPage = false;
        let data = {
          otp: value,
          email: editProfile.email_to_verify,
        };
        store
          .dispatch("UserProfile/action_emailOTPVerify", data)
          .then((response) => {
            editProfile.popup = false;
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.data.message,
              life: 3000,
            });
            editProfile.email = email_to_verify;
          })
          .catch((err) => {
            editProfile.popup = true;
            errorMessage.value = err.message;
          });
      } else if (editProfile.isemailORPhone == "phone" && value) {
        editProfile.blockPage = false;
        let data = {
          phone: editProfile.phone_to_verify,
          country_code: editProfile.country_code,
          otp: value,
          user_id: getter_UserProfile.user_details[0].id,
        };
        store
          .dispatch("UserProfile/action_phoneOTPVerify", data)
          .then((response) => {
            editProfile.popup = false;
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.data.message,
              life: 3000,
            });
            editProfile.phone = phone_to_verify;
          })
          .catch((err) => {
            errorMessage.value = err.message;
          });
      } else {
        editProfile.popup = false;
        editProfile.blockPage = false;
      }
    }
    function getUpdatedLogoImage(value) {
      profile_image.value = value.image_name;
    }
    function saveProfile() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      } else {
        editProfile.submitted = true;
        var dataTosave = getDataToSave();
        //console.log("dataTosave", dataTosave);
        store
          .dispatch("UserProfile/action_SaveUserProfileData", dataTosave)
          .then((response) => {
            if (response.status == "success") {
              if (response.data.profile_image != userData.value.profile_image) {
                userData.value.profile_image = response.data.profile_image;
              }
            }
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
          })
          .catch((err) => {});
      }
    }
    function getDataToSave() {
      var dataTosave = {
        first_name: state.first_name,
        last_name: state.last_name,
        designation: state.designation,
        city: state.city,
        about: state.about,
        country: state.country,
        country_iso: editProfile.country_iso,
        state: editProfile.state,
        state_iso: editProfile.state_iso,
        profile_image: profile_image.value,
      };

      return dataTosave;
    }
    function setEditProfileData() {
      profile_image.value = userProfileData.value.user_details[0].profile_image;
      state.first_name = userProfileData.value.user_details[0].first_name;
      state.last_name = userProfileData.value.user_details[0].last_name;
      editProfile.isThereEmail =
        userProfileData.value.user_details[0].email.includes("@olous.email");
      // console.log(this.isThereEmail);
      if (!editProfile.isThereEmail) {
        // console.log("in if");
        editProfile.email = userProfileData.value.user_details[0].email;
        editProfile.email_to_verify =
          userProfileData.value.user_details[0].email;
      }
      state.designation = userProfileData.value.user_details[0].designation;
      editProfile.phone = userProfileData.value.user_details[0].phone;
      if (userProfileData.value.user_details[0].city.indexOf(",") > -1) {
        let city = userProfileData.value.user_details[0].city.substring(
          0,
          userProfileData.value.user_details[0].city.indexOf(",")
        );
        //this.cityInput = city;
        state.city = city;
        selectedCity.value = city;
      } else {
        //this.cityInput = userProfileData.value.user_details[0].city;
        state.city = userProfileData.value.user_details[0].city;
        selectedCity.value = userProfileData.value.user_details[0].city;
      }

      //  this.editProfile.city = userProfileData.value.user_details[0].city;
      state.country = userProfileData.value.user_details[0].country;
      editProfile.country_iso =
        userProfileData.value.user_details[0].country_iso;
      if (userProfileData.value.user_details[0].country_code) {
        editProfile.country_code =
          userProfileData.value.user_details[0].country_code;
      }
      state.about = userProfileData.value.user_details[0].about;

      editProfile.phone_to_verify = userProfileData.value.user_details[0].phone;

      if (userProfileData.value.user_details[0].phone) {
        editProfile.verifyButtonTextPhone = false;
      } else {
        editProfile.verifyButtonTextPhone = true;
      }
    }
    function shortForm() {
      if (userProfileData.value == "") {
        return "";
      } else {
        let initialLetters =
          userProfileData.value.user_details[0].first_name
            .charAt(0)
            .toUpperCase() +
          userProfileData.value.user_details[0].last_name
            .charAt(0)
            .toUpperCase();
        return initialLetters;
      }
    }
    function sendOTP(value) {
      editProfile.isemailORPhone = value;
      if (value == "phone") {
        if (
          editProfile.country_code == "" ||
          editProfile.country_code == null ||
          editProfile.country_code == undefined
        ) {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Mobile country code required",
            life: 3000,
          });
          return;
        }
        if (
          editProfile.phone_to_verify == "" ||
          editProfile.phone_to_verify == null ||
          editProfile.phone_to_verify == undefined
        ) {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Mobile no. required",
            life: 3000,
          });
          return;
        }
        let phoneData = {
          last_name: state.last_name,
          country_code: editProfile.country_code,
          email: editProfile.email_to_verify,
          phone: editProfile.phone_to_verify,
          otp_type: "3",
          first_name: state.first_name,
        };
        startTimer.value = false;
        store
          .dispatch("UserProfile/action_getPhoneOTP", phoneData)
          .then(() => {
            startTimer.value = false;
            startTimer.value = true;
            editProfile.popup = true;
            editProfile.blockPage = false;
            editProfile.verifyButtonTextPhone = false;
          })
          .catch((err) => {});
      } else {
        if (
          editProfile.email_to_verify == "" ||
          editProfile.email_to_verify == null ||
          editProfile.email_to_verify == undefined
        ) {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Email id required",
            life: 3000,
          });
          return;
        }

        let emailData = {
          email: editProfile.email_to_verify,
        };
        startTimer.value = false;
        store
          .dispatch("UserProfile/action_getEmailOTP", emailData)
          .then(() => {
            startTimer.value = false;
            startTimer.value = true;
            editProfile.popup = true;
            editProfile.blockPage = false;
          })
          .catch((err) => {});
      }
    }

    async function fetchUserProfile() {
      //isShowProfile();
      await store.dispatch("dropdown/action_getProfessionDetails");
      await store.dispatch("dropdown/action_getSectorDetails");
      await store.dispatch("dropdown/action_getInterest");
      //store.dispatch("UserProfile/action_getSuggestedUserList")

      let userSlug = userData.value.slug;

      // if (getter_user.value.slug != userSlug) {
      //   showBuildCV.value = false;
      // } else {
      //   showBuildCV.value = true;
      // }

      if (userSlug) {
        await store
          .dispatch("UserProfile/action_getUserProfile", userSlug)
          .then(() => {
            setEditProfileData();
          })
          .catch((error) => {
            if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
              // router.push({ name: appConstants.routes.HOME })
              user_not_found.value = true;
            }
          });
      }
    }

    function btnBackClick() {
      //router.push({ name: appConstants.routes.BUILDCV });
    }

    function fetchFilteredCounties(event) {
      store.dispatch("dropdown/action_fetchFilteredCountries", event.query);
    }
    function countrySelectedByUser(selectedCountry) {
      selectedCountryIso2.value = selectedCountry.value._source.iso2;

      state.country = selectedCountry.value._source.name;
      editProfile.country_iso = selectedCountry.value._source.iso2;
      editProfile.country_code = selectedCountry.value._source.phone_code;
    }
    function countryUnSelectedByUser(val) {
      editProfile.country_code = "";
      state.city = "";
      editProfile.cityInput = "";
      editProfile.state = "";
      editProfile.state_iso = "";
    }
    function selectedPlace(event) {
      let data = {
        city: event.query,
        countryiso: editProfile.country_iso,
      };

      store.dispatch("dropdown/action_getCities", data).then(() => {});
    }
    function locationSelectedByUser(selectedLocation) {
      selectedCity.value = state.city =
        selectedLocation.value._source.city +
        ", " +
        selectedLocation.value._source.state;
      state.city = selectedLocation.value._source.city;
      editProfile.cityInput = selectedLocation.value._source.name;
      editProfile.state = selectedLocation.value._source.state;
      editProfile.state_iso = selectedLocation.value._source.state_iso;
    }
    function locationUnSelectedByUser(val) {
      state.city = "";
      editProfile.cityInput = "";
      editProfile.state = "";
      editProfile.state_iso = "";
    }

    function clickCloseForm() {
      $emitter.emit("close_form");
      //router.push({ name: appConstants.display_route_Name.CHANGEPASSWORD });
    }

    return {
      path_s3_save_image,
      state,
      v$,
      countriesList,
      userProfileData,
      profile_image,
      userData,
      getter_cities,
      selectedCountryIso2,
      editProfile,
      filteredLocation,
      selectPhoneCode,
      selectedCity,
      startTimer,
      otpData,
      errorMessage,
      getUpdatedLogoImage,
      shortForm,
      btnBackClick,
      saveProfile,
      locationUnSelectedByUser,
      locationSelectedByUser,
      selectedPlace,
      countryUnSelectedByUser,
      countrySelectedByUser,
      fetchFilteredCounties,
      openPhoneCode,
      closePhoneCode,
      savePhoneCode,
      cancelchange,
      resendOTP,
      closeModal,
      OTPverify,
      sendOTP,
      clickCloseForm,
    };
  },
};
</script>
<style>
/* .p-inputtext {
  font-size: 16px !important;
} */
</style>
