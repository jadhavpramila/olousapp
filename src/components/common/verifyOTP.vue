<template>
  <div class="flex flex-col items-center mb-6">
    <div class="flex flex-col items-center w-full">
      <h1 class="form-title app-text-color-secondary">Verification OTP</h1>
      <div class="mt-3 w-full">
        <div class="flex flex-col mt-3">
          <div class="flex space-x-2">
            <!-- otp -->
            <input
              type="text"
              v-model="otp"
              placeholder="Enter OTP"
              class="text-center p-1 w-full bg-white text-gray-700 focus:outline-none form-control"
              v-on:keyup="isEnterClicked($event)"
            />
          </div>
          <div class="grid grid-cols-5">
            <div class="error-color font-size-12 col-span-3">
              <span v-if="error">{{ error }}</span>
            </div>
            <div class="text-right col-span-2">
              <span>
                <OTPtimer
                  :showTimer="startTimer"
                  @otpTimer_resendOTP="resendOTP()"
                />
              </span>
            </div>
          </div>

          <button @click="submit()" class="btn mt-8 w-auto">
            <span class="">Verify OTP</span>
          </button>
        </div>
        <div class="mt-5">
          <p class="text-xs text-center text-gray-400">
            Please note that your firewall may block OTP email for company email
            address
            <!-- {{ startTimer }} -->
          </p>
        </div>
        <!-- <span v-if="error" class="mt-4 text-red-400">
          <small>{{ error }}</small>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import OTPtimer from "../common/OTPtimer.vue";
import { mapGetters } from "vuex";
export default {
  name: "verifyOTP",
  props: {
    error: String,
    startTimer: Boolean,
  },
  components: {
    OTPtimer,
  },
  computed: {
    ...mapGetters("login", ["getter_error"]),
  },
  data() {
    return {
      otp: "",
      showTimer: true,
    };
  },
  methods: {
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.submit();
      }
    },
    submit() {
      //   console.log(this.otp);
      this.$emit("verify_OTP_button_click", this.otp);
    },
    resendOTP() {
      this.$emit("otpTimer_resendOTP");
    },
  },
};
</script>

<style></style>
