<template>
  <div class="page-without-header form-container">
    <LoginPageImage>
      <template v-slot:child-component>
        <div class="max-w-full mx-4 md:mx-auto antialiased relative">
          <div class="max-w-[40rem] m-auto">
            <div class="rounded-[2rem] signin-forms">
              <div class="w-full flex">
                <div class="w-full">
                  <img :src="getStaticImagesUrl('olous_logo.svg')" />
                </div>
                <div class="w-full flex items-center justify-end">
                  <div class="flex items-center">
                    <button class="" type="submit" @click="clickClose()">
                      <img src="../../assets/close.svg" alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full mt-10 sm:mt-16">
                <div
                  class="text-4xl app-text-color-primary font-bold leading-4"
                >
                  <div v-if="otpSent == false">Forgot Password</div>
                  <div v-if="otpSent == true">Verification OTP</div>
                </div>
              </div>
              <!-- <div class="flex justify-end">
                <button class="m-4" type="submit" @click="clickClose()">
                  <img src="../../assets/close.svg" alt="" />
                </button>
              </div> -->
              <div class="mt-10 signin-forms-inner">
                <!-- logo and tag line -->

                <!-- form -->
                <div class="flex flex-col">
                  <!-- <h1 v-if="otpSent == false" class="form-title mb-4">
                    Forgot Password
                  </h1>
                  <h1 v-if="otpSent == true" class="form-title mb-4">
                    Verification OTP
                  </h1> -->
                  <span v-if="otpSent == true" class="">
                    <small
                      >Please enter OTP sent on your Email {{ email }}
                    </small>
                  </span>
                  <div class="flex w-full flex-col mt-3">
                    <input
                      v-if="otpSent == false"
                      v-model="email"
                      type="search"
                      id="email"
                      name="email"
                      placeholder="Registered Email"
                      autocomplete="email_off"
                      class="form-control focus:outline-none mb-1"
                      @keyup="isEnterClicked($event)"
                    />
                    <p class="mb-2">
                      <small
                        class="invalid-feedback"
                        v-for="error of v$.email.$errors"
                        :key="error.$uid"
                      >
                        {{ error.$message }}
                      </small>
                    </p>

                    <!-- <div
                  v-if="getter_forgotPasswordOTP.status == 'error'"
                  class="invalid-feedback"
                >
                  <small>Entered Wrong Email ID</small>
                </div> -->

                    <!-- enter otp field -->
                    <form autocomplete="off">
                      <input
                        v-if="otpSent == true"
                        v-model="otp"
                        type="search"
                        id="otp_textbox"
                        name="otp_textbox"
                        placeholder="Enter OTP"
                        class="form-control focus:outline-none"
                        autocomplete="for_OTP_off"
                      />
                      <p v-if="otpSent == true" class="">
                        <small
                          class="invalid-feedback"
                          v-for="error of v$.otp.$errors"
                          :key="error.$uid"
                        >
                          {{ error.$message }}
                        </small>
                      </p>
                    </form>
                    <div
                      class="text-right"
                      v-if="otpSent == true && OTPTimerInSecond > 0"
                    >
                      <label for="timer">{{ countDown }}</label>
                    </div>
                    <div class="relative">
                      <Password
                        v-if="otpSent == true"
                        v-model="password"
                        toggleMask
                        id="resetpw_textbox"
                        name="resetpw_textbox"
                        class="w-full text-center form-control"
                        placeholder="Password*"
                        strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
                        @keyup="validtePassword()"
                        autocomplete="for_password_off"
                        hideIcon="pi pi-eye"
                        showIcon="pi pi-eye-slash"
                        @paste.prevent
                      ></Password>
                      <small
                        v-if="strongPass && password != ''"
                        class="invalid-feedback"
                        >Please enter strong password.</small
                      >
                      <p v-if="otpSent == true" class="mb-3">
                        <small
                          class="invalid-feedback"
                          v-for="error of v$.password.$errors"
                          :key="error.$uid"
                        >
                          {{ error.$message }}
                        </small>
                      </p>
                    </div>
                    <div class="relative">
                      <Password
                        v-if="otpSent == true"
                        v-model="confirmPassword"
                        toggleMask
                        class="w-full text-center form-control"
                        placeholder="Confirm Password*"
                        strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
                        autocomplete="for_confirmPW_off"
                        hideIcon="pi pi-eye"
                        showIcon="pi pi-eye-slash"
                        @paste.prevent
                        @keyup="isClickEnter($event)"
                      ></Password>
                      <p v-if="otpSent == true" class="mb-5">
                        <small
                          class="invalid-feedback"
                          v-for="(error, index) of v$.confirmPassword.$errors"
                          :key="error.$uid"
                        >
                          <span v-if="index == 0">{{ error.$message }}</span>
                        </small>
                      </p>
                    </div>

                    <!-- <input
                  v-if="otpSent == true"
                  v-model="password"
                  type="password"
                  placeholder="Enter new password"
                  class="form-control text-center focus:outline-none mb-5"
                /> -->
                    <!-- <input
                  v-if="otpSent == true"
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  class="form-control text-center focus:outline-none mb-5"
                /> -->
                    <button
                      v-if="otpSent == false"
                      class="mt-3 btn-cursor btn"
                      @click="sendOtp()"
                    >
                      <span class="">Reset Password</span>
                    </button>
                    <button
                      v-if="otpSent == true"
                      class="mt-2 btn"
                      @click="ResetPassword()"
                    >
                      <span class="">Submit</span>
                    </button>
                    <span v-if="otpSent">
                      <div
                        class="error-color text-sm"
                        v-if="getter_resetPassword.status == 'error'"
                      >
                        {{ getter_resetPassword.message }}
                      </div>
                    </span>

                    <span v-if="otpSent == true" class="mt-2 text-center">
                      <small class="error-color"
                        >Please note that your firewall may block OTP email
                        <br />
                        for company email address
                      </small>
                      <!-- <img src="../assets/Back _text.svg" alt="" /> -->
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="form-group text-right top-0">
          <button
            v-if="otpSent == true"
            @click="back()"
            class="text-right active mt-2 btn-cursor border-2 border-[#B7B7B7] rounded-md"
          >
            <span class="text-lg font-weight-700 p-2">Back</span>
          </button>
        </div> -->
          </div>
        </div>
      </template>
    </LoginPageImage>
  </div>
</template>

<script>
import {
  helpers,
  required,
  email,
  sameAs,
  requiredIf,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { ValidateEach } from "@vuelidate/components";
import { mapActions, mapGetters } from "vuex";
import appConstants from "../../appConstants.js";
import Password from "primevue/password";
import LoginPageImage from "../common/LoginPageImage.vue";

export default {
  name: "forgotPassword",
  computed: {
    countDown() {
      let time = this.OTPTimerInSecond / 60;
      let minutes = parseInt(time);
      let secondes = Math.round((time - minutes) * 60);
      return minutes + ":" + secondes;
    },
  },
  setup() {
    return {
      v$: useVuelidate({ $autoDirty: false }),
    };
  },
  components: {
    ValidateEach,
    Password,
    LoginPageImage,
  },
  computed: {
    ...mapGetters("login", [
      "getter_forgotPasswordOTP",
      "getter_resetPassword",
      "getter_isUserLoggedIn",
    ]),
  },
  data() {
    return {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
      otpSent: false,
      popup: false,
      submitted: true,
      strongPass: false,
      OTPTimerInSecond: 119,
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("Please enter email", required),
        email: helpers.withMessage("Please enter valid email", email),
      },
      otp: {
        required: helpers.withMessage("Please enter otp", required),
      },
      password: {
        required: helpers.withMessage("Please enter password", required),
      },
      confirmPassword: {
        required: helpers.withMessage(
          "Please enter confirm Password",
          required
        ),
        sameAsPassword: helpers.withMessage(
          "Password doesn't match.Please re-enter password",
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    ...mapActions("login", [
      "action_sendOTPForForgotPassword",
      "action_resetPassword",
    ]),

    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.sendOtp();
      }
    },

    isClickEnter(e) {
      if (e.keyCode === 13) {
        this.ResetPassword();
      }
    },
    validtePassword() {
      let passw = /^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})/;
      if (this.password.match(passw)) {
        this.strongPass = false;
        return true;
      } else {
        this.strongPass = true;
        return false;
      }
    },
    sendOtp() {
      this.v$.$touch();
      console.log(this.v$.email.$invalid);
      if (this.v$.email.$invalid == false) {
        this.action_sendOTPForForgotPassword(this.email)
          .then(() => {
            this.v$.$reset();
            this.otpSent = true;
            this.resetCountDown();
            this.startCountDown();
          })
          .catch((res) => {
            // console.log(this.getter_forgotPasswordOTP);
          });
      } else {
        return false;
      }
    },
    ResetPassword() {
      this.v$.$touch();
      if (
        this.v$.otp.$invalid == false &&
        this.v$.password.$invalid == false &&
        this.v$.confirmPassword.$invalid == false
      ) {
        if (this.otp != null && this.password != null) {
          this.submitted = false;
          let data = {
            otp: this.otp,
            password: this.password,
            email: this.email,
          };
          this.blockPage = true;
          // alert("call API");
          this.action_resetPassword(data)
            .then(() => {
              this.popup = true;
              this.$router.push({ name: appConstants.routes.LOGIN });
            })
            .catch((res) => {
              // console.log(this.getter_resetPassword);
            });
        } else {
          this.submitted = true;
        }
      } else {
        return false;
      }
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
    clickClose() {
      this.$router.push({ name: appConstants.routes.LOGIN });
    },
    getStaticImagesUrl(imageName) {
      let url = this.getStaticImage(imageName);
      return url;
    },
  },
  created() {
    if (this.getter_isUserLoggedIn) {
      this.$router.push({ name: appConstants.routes.HOME });
    }
  },
};
</script>

<style></style>
