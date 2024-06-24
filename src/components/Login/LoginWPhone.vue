<template>
  <div class="grid grid-cols-1">
    <div class="flex flex-col py-2">
      <!-- {{ data }} -->
      <div class="grid grid-cols-1">
        <input
          type="text"
          placeholder="Email or Phone"
          v-model="username"
          autocomplete="off"
          @keyup="isEnterClicked($event)"
          class="form-control w-[auto] focus:outline-none"
          id="txtUsername"
        />
        <!-- <p v-if="!isLoginWithPassWord"> -->
        <div v-if="usernameError" class="invalid-feedback">
          Please enter email or phone
        </div>
      </div>

      <!-- </p> -->
      <!-- <input
        v-if="!isLoginWithPassWord"
        type="text"
        placeholder="OTP"
        v-model="otp"
        autocomplete="off"
        class="form-control text-center w-[auto] focus:outline-none"
        :disabled="disabled"
      />
      <p v-if="!isLoginWithPassWord">
        <small
          class="invalid-feedback"
          v-for="error of v$.otp.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </small>
      </p> -->

      <!-- <div
        v-if="isLoginWithPassWord"
        class="mb-[3.75rem] relative space-0 w-full"
      >
        <Password
          v-model="password"
          @keyup="validtePassword()"
          toggleMask
          placeholder="Password*"
          strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
          hideIcon="pi pi-eye"
          showIcon="pi pi-eye-slash"
          autocomplete="off"
          class="form-control text-center w-[auto] focus:outline-none"
        />
        <span class="">
          <div v-if="usernameError" class="invalid-feedback">
            Value is required
          </div>
        </span>
      </div> -->

      <!-- </p> -->
      <div class="grid grid-cols-1 mb-2">
        <input
          v-if="isLoginWithOtp"
          type="text"
          placeholder="OTP"
          v-model="otp"
          autocomplete="off"
          v-on:keyup="isVerifyOTP($event)"
          class="form-control w-[auto] focus:outline-none"
          :disabled="disabled"
          id="txtOTP"
        />
        <span v-if="isLoginWithOtp" class="">
          <div
            class="invalid-feedback"
            v-for="error of v$.otp.$errors"
            :key="error.$uid"
          >
            {{ error.$message }}
          </div>
        </span>

        <div v-if="!isLoginWithOtp" class="relative space-0 w-full">
          <Password
            v-model="password"
            @keyup="isEnterClicked($event)"
            @keypress="validtePassword()"
            toggleMask
            :feedback="false"
            class="w-full form-control"
            placeholder="Password*"
            hideIcon="pi pi-eye"
            showIcon="pi pi-eye-slash"
            autocomplete="off"
            id="txtPassword"
          ></Password>
          <span v-if="!isLoginWithOtp" class="">
            <div
              class="invalid-feedback"
              v-for="error of v$.password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </span>
        </div>
      </div>
      <div class="grid grid-cols-5">
        <div class="error-color font-size-12 col-span-3">
          <span v-if="error">{{ error }}</span>
        </div>
        <div class="text-right col-span-2">
          <label
            class="cursor-pointer text-sm app-text-color-secondary"
            :style="{ visibility: isLoginWithPassWord ? 'visible' : 'hidden' }"
            @click="forgotPassword()"
            >Forgot Password</label
          >
          <OTPtimer :showTimer="showTimer" @otpTimer_resendOTP="resendOTP()" />
        </div>
      </div>
    </div>

    <div class="flex items-center space-x-2 mt-2 ml-[1.25rem]">
      <!-- <input
        type="checkbox"
        v-model="isLoginWithPassWord"
        name="code"
        id="code"
        class="scale-125"
      /> -->
      <Checkbox
        v-model="isLoginWithOtp"
        @click="loginWithEmail()"
        name="code"
        :binary="true"
        id="chkLoginWithPW"
      />
      <label for="code" class="app-text-color-secondary text-sm font-bold"
        >Login with OTP</label
      >
    </div>
    <button
      v-if="otpSent == true || isLoginWithOtp == true || isLoginWithPassWord"
      @click="verifyOTP()"
      class="btn mt-8"
    >
      <span class="">Login</span>
      <span v-if="loading"> ... </span>
    </button>
    <!-- <button
      v-if="isLoginWithOtp && otpSent == false"
      @click="getOTP()"
      class="login-btn mt-8 btn-cursor hover-effect"
    >
      <span class="">Send OTP</span>
      <span v-if="loading"> ... </span>
    </button> -->
    <!-- <div class="w-[20rem] text-red-300 text-sm mt-2">
      <span v-if="error">{{ error }}</span>
    </div> -->
  </div>
</template>

<script>
import OTPtimer from "../common/OTPtimer.vue";
import appConstants from "/src/appConstants.js";
import { mapActions, mapGetters } from "vuex";
import Checkbox from "primevue/checkbox";
import Password from "primevue/password";
import useVuelidate from "@vuelidate/core";
import { requiredIf, helpers, numeric, required } from "@vuelidate/validators";
import { setCurrentDecodeURL } from "../../common/js/webUrls.js";
import { readUserTokenCookie } from "../../common/js/UserToken.js";

export default {
  name: "LoginWEmail",
  components: {
    OTPtimer,
    Checkbox,
    Password,
  },
  props: {
    data: String,
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      otp: {
        // required: requiredIf(this.isLoginWithPassWord == false),
        required: helpers.withMessage(
          "Please enter a valid OTP",
          requiredIf(this.isLoginWithOtp == true)
        ),
        numeric: helpers.withMessage("OTP should be in numeric form", numeric),
      },
      password: {
        required: helpers.withMessage(
          "Please enter a password",
          requiredIf(this.isLoginWithPassWord == true)
        ),
      },
    };
  },
  data() {
    return {
      lastPath: null,
      showPassword: false,
      strongPass: false,
      usernameError: false,
      passwordError: false,
      loginWith: "",
      isLoginWithPassWord: true,
      otpSent: false,
      disabled: true,
      username: "",
      otp: "",
      password: "",
      user: null,
      loading: false,
      error: "",
      showTimer: false,
      isLoginWithOtp: false,
      LandingPageEnum: appConstants.Landing_Page_Enum,
    };
  },
  computed: {
    ...mapGetters("login", [
      "getter_user",
      "getter_error",
      "getter_landingPage",
    ]),
    // prevRoutePatch() {
    //   return this.lastPath ? this.lastPath : "/dashboard";
    // },
  },
  watch: {
    data(val) {
      this.resetLogin();
    },
  },
  // created() {

  // },
  methods: {
    ...mapActions("login", [
      "sendOTP",
      "login",
      "action_updateUserLastActivity",
      "action_getLandingPage",
    ]),
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    loginWithEmail() {
      if (this.v$.$invalid) {
        this.v$.otp.$reset();
      }

      if (this.isLoginWithPassWord) {
        this.isLoginWithPassWord = false;
        this.password = "";
        this.otp = "";
        this.getOTP();
      } else {
        this.isLoginWithPassWord = true;
        this.error = "";
        this.showTimer = false;
      }
    },
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        if (this.isLoginWithPassWord) {
          this.verifyOTP();
        } else {
          this.getOTP();
        }
      }
    },
    isVerifyOTP(e) {
      if (e.keyCode === 13) {
        this.verifyOTP();
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
    resendOTP() {
      this.showTimer = false;
      this.getOTP();
    },
    forgotPassword() {
      this.$router.push({ name: appConstants.routes.FORGOTPASSWORD });
    },
    resetLogin() {
      this.username = "";
      this.otp = "";
      this.password = "";
      this.otpSent = false;
    },
    verifyOTP() {
      if (this.username) {
        this.usernameError = false;
      } else {
        this.usernameError = true;
      }
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      } else {
        this.loading = true;
        let authData;
        if (this.isLoginWithPassWord) {
          this.passwordError = false;
          authData = {
            email: this.username,
            password: this.password,
          };
        } else {
          authData = {
            username: this.username,
            otp: this.otp,
          };
        }
        this.login(authData)
          .then(() => {
            this.loading = false;
            this.user = this.getter_user;
            let userToken = readUserTokenCookie();
            this.action_getLandingPage().then(() => {
              if (
                this.getter_landingPage.landingPage ==
                this.LandingPageEnum.EXPERIENCE
              ) {
                this.$router.push({
                  name: appConstants.routes.EXPERIENCE,
                  query: { isFromSignUp: true },
                });
              } else if (
                this.getter_landingPage.landingPage ==
                this.LandingPageEnum.EDUCATION
              ) {
                this.$router.push({
                  name: appConstants.routes.EDUCATION,
                  query: { isFromSignUp: true },
                });
              } else {
                setCurrentDecodeURL(this.$route);
              }
            });
            // if (userToken) {
            //   this.action_updateUserLastActivity(userToken);
            // }

            // console.log(window.history);
            //let back = window.history.length > 1;

            // console.log("back =>", this.$route);
            // let cookievalue = readUserTokenCookie()
            // console.log(`before navigation cookie : ${cookievalue} `)
            // if (back) {
            //   // console.log("in if");
            //   this.$router.back();
            // } else {
            //   // console.log("in else");
            //   this.$router.replace({ name: appConstants.routes.HOME });
            // }
            // console.log(this.user);
            // this.$router.push({ name: appConstants.routes.HOME });
            // this.prevRoutePatch();
          })
          .catch((error) => {
            this.loading = false;
            this.user = null;
            this.error = error.data.message;
          });
      }
    },
    getOTP() {
      if (this.username) {
        this.usernameError = false;
        this.loading = true;
        this.sendOTP(this.username)
          .then((res) => {
            this.otpSent = true;
            this.showTimer = false;
            this.showTimer = true;
            this.loading = false;
            this.response = res;
            this.error = res.data.message;
            this.disabled = false;
          })
          .catch((res) => {
            this.otpSent = false;
            this.loading = false;
            this.user = null;
            this.error = res.data.message;
          });
      } else {
        this.usernameError = true;
        return false;
      }
    },
  },
};
</script>

<style>
/* .p-input-icon-right > .p-inputtext {
  text-align: center;
} */
</style>
