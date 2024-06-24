<template>
  <div class="form-container cls-unsubscribe">
    <div class="grid grid-cols-5">
      <div class="lg:block hidden"></div>
      <div class="lg:col-span-3 col-span-5">
        <div
          class="flex flex-col lg:col-span-3 col-span-5 p-5 bg-white rounded-2xl"
        >
          <h1 class="font-weight-700 app-text-color-secondary text-base">
            <span class="font-weight-500"> Olous Masterclass </span><br />
            <span class="text-[#ff5b03] font-weight-700"
              >"How to crack an interview?"</span
            >
          </h1>
          <span class="font-weight-700 app-text-color-secondary text-sm mt-2"
            >Date: 25th March, 2023 I Time: 04:00-05:00 PM (IST)</span
          >
          <h1 class="font-weight-600 app-text-color-secondary text-lg mt-5">
            Meet The Speaker
          </h1>
          <div
            class="flex lg:flex-row md:flex-row flex-col lg:items-center md:items-center justify-between"
          >
            <div class="flex">
              <div>
                <img
                  src="https://olous.s3.ap-south-1.amazonaws.com/emailer/event/UdayKulkarni_25_March_23.png"
                  alt=""
                  class="h-20 w-20"
                />
              </div>
              <!-- <div class="ml-5">
                <span class="text-xs app-text-color-secondary font-weight-700"
                  >Follow On</span
                >
                <div class="flex mt-2 space-x-2">
                   <div class="">
                    <img src="../../assets/Olous.png" alt="" />
                  </div> 
                  <div class="">
                    <img src="../../assets/Linkdine.png" alt="" />
                  </div>
                </div>
              </div> -->
            </div>

            <div class="lg:block md:block hidden">
              <img src="../../assets/Event.png" alt="" class="h-28" />
            </div>
          </div>
          <div>
            <h1 class="font-weight-700 text-sm text-[#ff5b03]">
              Mr. Uday Kulkarni
            </h1>
            <span class="font-weight-700 app-text-color-secondary text-sm mt-2"
              >Trainer, Coach | India, US and Netherlands</span
            >
          </div>
          <div class="app-text-color-secondary mt-3 text-sm">
            <!-- Do you struggle while creating a professional resume? In the absence
            of work experience, what should you include on your resume?
            <br /><br /> <strong class="text-[#ff5b03]">Mr. Uday Kulkarni</strong>-->
            He is a Seasoned Professional with over 30 years of corporate
            experience in Operations, Training, Coaching, and Business
            Development. He has trained 1000+ Professionals and helped them
            reach new heights in their careers
          </div>

          <div class="flex flex-col mt-7">
            <span class="text-base text-[#ff5b03] font-weight-700"
              >Save your Seat Now for &#8377;200/- only
            </span>
            <span class="text-sm app-text-color-secondary font-weight-700 text-italic"
              >Limited Seats Available*</span
            >
          </div>

          <div class="alert mt-5" v-if="getter_registrationData.show_message">
            <span class="closebtn" @click="clickClose()">&times;</span>
            <!-- <strong>Success!</strong>  -->
            {{ getter_registrationData.message }}
          </div>

          <div v-if="showPaymentButton">
            <div class="flex mt-3" id="rzpforms"></div>
          </div>
        </div>
      </div>

      <div class="lg:block hidden"></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
//import { useLoading } from "vue-loading-overlay";
//import ProgressSpinner from "primevue/progressspinner";

export default {
  name: "EventRegistration",
  components: {
    //ProgressSpinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let isShowSuccessMessage = ref(false);
    const rzpforms = ref(null);
    // const $loading = useLoading();
    //let loader = ref(false);
    let duration = ref("1s");

    let encodedStr = ref();
    let showPaymentButton = ref(true);

    let getter_registrationData = computed(
      () => store.getters["eventregister/getter_registrationData"]
    );

    function getEventRegisterUserResponse() {
      let data = {
        user_data: encodedStr.value,
      };
      store
        .dispatch("eventregister/action_eventRegisterUser", data)
        .then((res) => {
          isShowSuccessMessage.value = true;
          showPaymentButton.value =
            getter_registrationData.value.show_payment_button;
        });
    }
    function clickClose() {
      getter_registrationData.value.show_message = false;
    }
    function redirectToPaymentGateway() {
      var el = document.getElementById("rzpforms");
      // console.log("el", el);
      var form = document.createElement("form");
      var rzpScript = document.createElement("script");
      rzpScript["src"] = "https://checkout.razorpay.com/v1/payment-button.js";
      rzpScript.setAttribute("data-payment_button_id", "pl_LFWsxl9pwBodZt");
      rzpScript.setAttribute("async", true);
      form.appendChild(rzpScript);
      el.appendChild(form);
      // loader.value = false;
    }
    onBeforeMount(() => {});
    onMounted(() => {
      redirectToPaymentGateway();

      // loader.value = false;
      encodedStr.value = route.params.encoded_str;
      getEventRegisterUserResponse();
      //  loader.value = true;
    });
    return {
      isShowSuccessMessage,
      getter_registrationData,
      rzpforms,
      //loader,
      duration,
      showPaymentButton,
      clickClose,
      redirectToPaymentGateway,
    };
  },
};
</script>
<style>
.alert {
  padding: 10px;
  background-color: #2aff0059;
  color: #000;
  border-radius: 10px;
  border: 1px solid #2bff00;
  font-size: 14px;
  text-align: center;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
