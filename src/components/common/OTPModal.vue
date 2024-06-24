<template>
  <div
    class="fixed z-10 inset-0 p-5"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block m-auto align-bottom form-bg-w rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full text-center"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center p-5">
          <div class="text-center">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
              <h3
                class="text-lg lg:text-2xl leading-6 font-medium app-text-color-secondary"
                id="modal-title"
              >
                Verification OTP
              </h3>
              <div class="mt-2">
                <p
                  v-if="details.type == 'phone'"
                  class="text-sm app-text-color-secondary"
                >
                  Please enter the code from the message sent to
                  {{ details.value }}
                </p>
                <p
                  v-if="details.type == 'email'"
                  class="text-sm app-text-color-secondary"
                >
                  Please enter the code from the email sent to
                  {{ details.value }}
                </p>
              </div>
              <div class="flex flex-col mt-3">
                <div class="flex space-x-2 flex-col">
                  <!-- otp -->
                  <input
                    v-model="otp"
                    type="text"
                    placeholder="Enter OTP"
                    v-on:keyup="isEnterClicked($event)"
                    class="text-center p-2 w-full bg-white text-gray-700 rounded-md form-control"
                  />
                  <span class="text-left pr-2">
                    <small
                      class="text-left pr-2 app-text-color-secondary invalid-feedback"
                      v-if="error"
                      >Please enter valid OTP</small
                    >
                    <!-- <small
                      v-if="errorMessage"
                      class="text-left pr-2 invalid-feedback"
                      >{{ errorMessage }}
                    </small> -->
                  </span>
                </div>
                <span class="text-right pr-2 mt-1">
                  <OTPtimer
                    :showTimer="startTimer"
                    @otpTimer_resendOTP="resendOTP()"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-end justify-end space-x-3 mx-2">
          <div class="flex space-x-4">
            <button class="btn px-6 py-2" type="submit" @click="close()">
              Back
            </button>
            <button class="btn px-4 py-2" @click="submit()" type="submit">
              Submit
            </button>
          </div>
        </div>
        <div class="mt-2 mb-4">
          <small
            v-if="details.type == 'email'"
            class="font-size-12 text-gray-500"
          >
            Please note that your firewall may block OTP email for company email
            addresses.
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OTPtimer from "./OTPtimer.vue";
export default {
  name: "OTPModal",
  props: {
    details: Object,
    startTimer: Boolean,
    errorMessage: String,
  },
  components: {
    OTPtimer,
  },
  data() {
    return {
      otp: "",
      error: false,
      screenOff: true,
      OTPTimerInSecond: 119,
    };
  },
  methods: {
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      // console.log("submit otp", this.otp);
      if (this.otp) {
        this.error = false;
        this.$emit("verify_OTP_button_click", this.otp);
      } else {
        this.error = true;
      }

      // this.emitter.emit("otp_verification", this.otp);
    },
    close() {
      this.$emit("otp_verification_cancel");
    },
    countDown() {
      let time = this.OTPTimerInSecond / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    },
    startCountDown() {
      this.timer = setInterval(() => {
        if (this.OTPTimerInSecond > 0) {
          this.OTPTimerInSecond--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    resetCountDown() {
      this.OTPTimerInSecond = 119;
    },
    resendOTP() {
      this.$emit("otpTimer_resendOTP");
    },
  },
};
</script>
<style scoped>
.outline {
  border: 1px solid #f2f2f2;
}
</style>
