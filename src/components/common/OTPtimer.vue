<template>
  <div class="form-group text-right relative">
    <label
      class="app-text-color-secondary"
      v-if="showTimer == true && OTPTimerInSecond > 0"
    >
      {{ countDown }}
    </label>
    <label
      class="app-text-color-secondary"
      v-if="showTimer == true && !(OTPTimerInSecond > 0)"
      @click="resendOTP()"
    >
      Resend OTP
    </label>
  </div>
</template>

<script>
export default {
  name: "OTPtimer",
  props: {
    showTimer: Boolean,
  },
  data() {
    return {
      OTPTimerInSecond: 0,
      timer: null,
    };
  },
  watch: {
    showTimer(val) {
      if (val) {
        this.resetCountDown();
        this.startCountDown();
      }
    },
  },
  computed: {
    countDown() {
      let time = this.OTPTimerInSecond / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    },
  },
  methods: {
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
  mounted() {
    if (this.showTimer) {
      this.resetCountDown();
      this.startCountDown();
    }
  },
};
</script>

<style></style>
