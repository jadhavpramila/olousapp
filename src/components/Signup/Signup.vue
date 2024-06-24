<template>
  <div class="cls-signup form-container page-without-header mb-12">
    <LoginPageImage>
      <template v-slot:child-component>
        <div class="max-w-full mx-4 md:mx-auto bg-[#fff] antialiased relative">
          <div class="w-full flex">
            <div class="w-full">
              <img :src="getStaticImagesUrl('olous_logo.svg')" />
            </div>
            <div class="w-full flex items-center justify-end">
              <div class="flex items-center">
                <button
                  v-if="!verified"
                  class=""
                  type="submit"
                  @click="clickClose()"
                >
                  <img src="../../assets/close.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div class="w-full mt-[2rem] md:mt-[2.375rem]">
            <div class="text-4xl app-text-color-primary font-bold leading-4">
              Sign up
            </div>
          </div>
          <div class="flex flex-col items-center space-3 sm:mt-[1.313rem]">
            <!-- <Toast /> -->
            <div class="rounded-[2rem] signin-forms">
              <!-- <div v-if="!verified" class="flex justify-end">
                <button class="m-4" type="submit" @click="clickClose()">
                  <img src="../../assets/close.svg" alt="" />
                </button>
              </div> -->
              <div
                v-if="!verified"
                class="md:px-0 lg:px-0 pb-11 signin-forms-inner"
              >
                <!-- logo and tag line -->
                <!-- <div class="flex flex-col items-center space-y-3">
            <span class="flex space-x-3 items-center">
              <img
                class="h-[3rem]"
                src="/src/assets/Olous_logo_with_text.svg"
                alt=""
              />
            </span>
            <h1 class="text-center tracking-wide lg:w-full w-3/4 text-sm">
              Empowering Design, Construction & Real Estate
            </h1>
          </div> -->
                <!-- signUp form -->
                <div v-if="!verified" class="flex flex-col items-center">
                  <div class="flex flex-col items-center">
                    <!-- <h1
                      class="lg:text-3xl md:text-3xl text-lg app-text-color-secondary font-medium"
                    >
                      Sign Up
                    </h1> -->
                    <!-- phone or email -->
                    <div class="flex space-x-3 mt-3">
                      <div class="flex flex-col space-4">
                        <div class="grid grid-cols-2 gap-4">
                          <div class="flex-col">
                            <input
                              v-model="form_data.first_name"
                              type="text"
                              placeholder="First Name"
                              class="form-control focus:outline-none"
                              v-on:keyup="isEnterClicked($event)"
                            />
                            <!-- <small v-if="v$.$dirty" class="invalid-feedback"
                        >First Name field has an error.</small
                      > -->
                            <div
                              class="invalid-feedback"
                              v-for="error of v$.form_data.first_name.$errors"
                              :key="error.$uid"
                            >
                              {{ error.$message }}
                            </div>
                          </div>
                          <!-- Name input -->
                          <div class="flex-col">
                            <input
                              v-model="form_data.last_name"
                              type="text"
                              placeholder="Last Name"
                              class="form-control focus:outline-none"
                              v-on:keyup="isEnterClicked($event)"
                            />
                            <div
                              class="invalid-feedback"
                              v-for="error of v$.form_data.last_name.$errors"
                              :key="error.$uid"
                            >
                              {{ error.$message }}
                            </div>
                          </div>
                        </div>
                        <!-- Phone input -->
                        <div class="grid grid-cols-1">
                          <div class="grid grid-cols-4">
                            <div>
                              <button
                                v-if="usePhone"
                                @click="selectPhoneCode = true"
                                class="text-center p-2 form-control text-gray-900 bg-[#f2f2f2] border-r focus:outline-none rounded-r-lg text-[1.125rem]"
                              >
                                <span
                                  v-if="form_data.country_code == ''"
                                  class="text-[#a2a4af]"
                                  >+91</span
                                >
                                <span v-else>
                                  {{ form_data.country_code }}</span
                                >
                              </button>
                              <span v-if="usePhone">
                                <div
                                  class="invalid-feedback"
                                  v-for="error of v$.form_data.country_code
                                    .$errors"
                                  :key="error.$uid"
                                >
                                  {{ error.$message }}
                                </div>
                              </span>
                            </div>
                            <div class="col-span-3 ml-2">
                              <input
                                v-if="usePhone"
                                type="phone"
                                ref="phone"
                                v-model="form_data.phone"
                                placeholder="Phone"
                                class="form-control focus:outline-none"
                                v-on:keyup="isEnterClicked($event)"
                                maxlength="17"
                              />
                              <span v-if="usePhone">
                                <div
                                  class="invalid-feedback"
                                  v-for="error of v$.form_data.phone.$errors"
                                  :key="error.$uid"
                                >
                                  {{ error.$message }}
                                </div>
                              </span>
                            </div>
                          </div>
                          <!-- Email input -->
                          <input
                            v-if="!usePhone"
                            v-model="form_data.email"
                            type="email"
                            placeholder="Email"
                            class="form-control focus:outline-none"
                            v-on:keyup="isEnterClicked($event)"
                          />
                          <span v-if="!usePhone">
                            <div
                              class="invalid-feedback"
                              v-for="error of v$.form_data.email.$errors"
                              :key="error.$uid"
                            >
                              {{ error.$message }}
                            </div>
                          </span>
                        </div>

                        <!-- use phone button -->
                        <!-- <span class="flex justify-center">
                      <button
                        class="mb-3 border text-sm rounded-lg px-2 py-1 hover-effect"
                        v-if="usePhone"
                        @click="removePhone()"
                      >
                        Use Email Instead
                      </button>
                      <button
                        class="mb-3 border text-sm rounded-lg px-2 py-1 hover-effect"
                        v-else
                        @click="removeEmail()"
                      >
                        Use Phone Instead
                      </button>
                    </span> -->
                        <div class="grid grid-cols-1">
                          <!-- <MultiSelect
                      v-model="interest"
                      :options="getter_interest"
                        optionLabel="display_string"
                        placeholder="Interest*"
                       display="chip"
                        :selectionLimit="2"
                        
                        :filter="true"
                        dropdown
                         class="w-full form-control"
                      /> -->
                          <Dropdown
                            v-model="form_data.user_type"
                            :options="getter_userType"
                            optionLabel="name"
                            placeholder="User Type*"
                            v-on:keyup="isEnterClicked($event)"
                            class="w-full form-control primevue-dropdown"
                          />
                          <div
                            class="invalid-feedback"
                            v-for="error of v$.form_data.user_type.$errors"
                            :key="error.$uid"
                          >
                            {{ error.$message }}
                          </div>
                        </div>
                        <!-- password input -->
                        <div class="relative space-0">
                          <Password
                            v-model="form_data.password1"
                            toggleMask
                            class="w-full text-center form-control"
                            placeholder="Password*"
                            strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
                            @keyup="validtePassword()"
                            hideIcon="pi pi-eye"
                            showIcon="pi pi-eye-slash"
                            @paste.prevent
                          ></Password>
                          <div v-if="strongPass" class="invalid-feedback">
                            Please enter strong password.
                          </div>
                          <div
                            class="invalid-feedback"
                            v-for="error of v$.form_data.password1.$errors"
                            :key="error.$uid"
                          >
                            {{ error.$message }}
                          </div>
                          <!-- <input
                      v-if="showPassword1"
                      type="text"
                      placeholder="Password*"
                      class="form-control text-center p-1 lg:w-[29.25rem] bg-white text-gray-700 focus:outline-none rounded-md absolute"
                      v-model="form_data.password1"
                    />
                    <input
                      v-if="!showPassword1"
                      type="password"
                      placeholder="Password*"
                      class="form-control text-center p-1 lg:w-[29.25rem] bg-white text-gray-700 focus:outline-none rounded-md absolute mb-2 p-1"
                      v-model="form_data.password1"
                    />
                    <img
                      v-if="!showPassword1"
                      @click="togglePassword"
                      class="h-[1.3rem] absolute right-0 eye"
                      src="/src/assets/hide.svg"
                      alt=""
                    />
                    <img
                      v-if="showPassword1"
                      @click="togglePassword"
                      class="h-[1.3rem] absolute right-0 eye"
                      src="/src/assets/show.svg"
                      alt=""
                    /> -->
                        </div>
                        <!-- <div class="m-2"></div> -->
                        <div class="relative space-0">
                          <Password
                            v-model="form_data.password2"
                            toggleMask
                            class="w-full text-center form-control"
                            placeholder="Confirm Password*"
                            strongRegex="^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})"
                            hideIcon="pi pi-eye"
                            showIcon="pi pi-eye-slash"
                            @paste.prevent
                          ></Password>
                          <div
                            class="invalid-feedback"
                            v-for="error of v$.form_data.password2.$errors"
                            :key="error.$uid"
                          >
                            {{ error.$message }}
                          </div>
                          <!-- <input
                      v-if="showPassword2"
                      v-model="form_data.password2"
                      type="text"
                      placeholder="Confirm Password*"
                      class="form-control text-center p-1 lg:w-[29.25rem] bg-white text-gray-700 focus:outline-none rounded-md absolute"
                    />
                    <input
                      v-if="!showPassword2"
                      v-model="form_data.password2"
                      type="password"
                      ref="password2"
                      placeholder="Confirm Password*"
                      class="form-control text-center p-1 lg:w-[29.25rem] bg-white text-gray-700 focus:outline-none rounded-md absolute"
                      :class="{
                        'border-red-500': validatePassword,
                      }"
                    />
                    <img
                      v-if="!showPassword2"
                      @click="toggleShow"
                      class="h-[1.3rem] absolute right-0 eye"
                      src="/src/assets/hide.svg"
                      alt=""
                    />
                    <img
                      v-if="showPassword2"
                      @click="toggleShow"
                      class="h-[1.3rem] absolute right-0 eye"
                      src="/src/assets/show.svg"
                      alt=""
                    /> -->
                        </div>
                        <span v-if="validatePassword">
                          <p class="font-size-12 mb-2 ml-2 text-red-400">
                            Passwords didn’t match. Try again.
                          </p>
                        </span>
                        <span class="text-xs">
                          <p
                            class="text-gray-500 text-center font-size-12 normal-case"
                          >
                            The password must be at least 8 characters and
                            contain one special character (!@#$%&*) and one
                            upper case character.
                            <!-- THE PASSWORD MUST BE AT LEAST 8 CHARACTERS AND CONTAIN ONE
                      SPECIAL CHARACTER AND ONE UPPERCASE CHARACTER. -->
                          </p>
                        </span>
                        <div
                          class="flex items-center space-x-2 my-[0.938rem] text-sm"
                        >
                          <Checkbox
                            v-model="terms"
                            name="code"
                            :binary="true"
                            id="code"
                          />
                          <!-- <input
                        v-model="terms"
                        type="checkbox"
                        name="code"
                        id="code"
                        class="scale-125"
                      /> -->
                          <label for="code">
                            <span class="flex items-center"
                              >I Agree Terms & Conditions &nbsp;
                            </span></label
                          >
                          <img
                            src="/src/assets/info.svg"
                            alt="info"
                            class="w-5 cursor-pointer"
                            @click="clickInfo()"
                          />
                        </div>
                        <button
                          v-if="terms"
                          @click="creatAccount()"
                          class="btn"
                        >
                          <span class="">Create Account</span>
                        </button>
                        <button v-else class="btn" disabled>
                          <span class="">Create Account</span>
                        </button>
                        <p class="text-sm mt-4 text-right">
                          Already have an account?
                          <span @click="signIn()" class="cursor-pointer"
                            ><b class="app-text-color-primary">Sign In</b></span
                          >
                        </p>
                      </div>
                    </div>
                    <!-- <span class="text-red-400 w-[20rem]" v-if="!terms"
                    >Accept Terms and Conditions</span
                  >
                  <span class="text-[#396346] w-[20rem]" v-else>All Good</span> -->
                    <span
                      class="text-red-400 w-[20rem] text-center"
                      v-if="error"
                      >{{ error }}</span
                    >
                    <!--<span v-if="signUpStore.onBoard"> On board </span>-->
                  </div>
                  <!-- <div class="mt-10 flex justify-center"></div> -->
                </div>
              </div>
              <!-- <pre>
            {{ getter_user }}
          </pre> -->

              <!-- verify the otp -->
              <!-- <Button label="Success" class="p-button-success" @click="showSuccess" /> -->
              <div v-if="verified" class="flex justify-end">
                <button class="m-4" type="submit" @click="closeVerifyOTP()">
                  <img src="../../assets/close.svg" alt="" />
                </button>
              </div>
              <div v-if="verified" class="signin-forms-inner">
                <verifyOTP
                  :error="otpError"
                  @verify_OTP_button_click="OTPverify"
                  @otpTimer_resendOTP="setOTPToUser"
                  :startTimer="startTimer"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectPhoneCode">
          <selectCountryPhoneCode
            @close_button_click="closePhoneCode"
            @selected_country_click="savePhoneCode"
          />
        </div>
      </template>
    </LoginPageImage>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { mapGetters, mapActions } from "vuex";
import Dropdown from "primevue/dropdown";
import verifyOTP from "../common/verifyOTP.vue";
import Password from "primevue/password";
import useVuelidate from "@vuelidate/core";
import LoginPageImage from "../common/LoginPageImage.vue";
import {
  helpers,
  required,
  email,
  numeric,
  minLength,
  requiredIf,
  maxLength,
} from "@vuelidate/validators";
import Checkbox from "primevue/checkbox";
import Toast from "primevue/toast";
import Button from "primevue/button";
import selectCountryPhoneCode from "./../common/selectCountryPhoneCode.vue";

export default {
  name: "SignUp",
  components: {
    Dropdown,
    verifyOTP,
    Password,
    Checkbox,
    Toast,
    Button,
    selectCountryPhoneCode,
    LoginPageImage,
  },
  setup() {
    return { v$: useVuelidate({ $autoDirty: false }) };
  },
  data() {
    return {
      // v$: useValidate(),
      showPassword1: false,
      showPassword2: false,
      startTimer: false,
      strongPass: false,
      OTP: "",
      form_data: {
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        interest: [],
        password1: "",
        password2: "",
        city: "default",
        is_admin: false,
        country_code: "",
        phone: "",
        verified_credentials: [0],
        user_type: null,
      },
      terms: false,
      verified: false,
      usePhone: false,
      error: "",
      otpError: "",
      validatePassword: false,
      password: "",
      has_minimum_lenth: false,
      has_number: false,
      has_lowercsae: false,
      has_uppercase: false,
      has_special: false,
      interest: "",
      selectPhoneCode: false,
    };
  },
  validations() {
    return {
      // interest: {
      //   required: helpers.withMessage("Please select interest", required),
      //   minLength: helpers.withMessage(
      //     "Please select minimum 3 interest",
      //     minLength(3)
      //   ),
      //   $autoDirty: false,
      // },

      form_data: {
        user_type: {
          required: helpers.withMessage("Please select user type", required),
          $autoDirty: false,
        },
        password1: {
          required: helpers.withMessage("Please enter passwords", required),
          $autoDirty: false,
        },
        password2: {
          required: helpers.withMessage(
            "please enter confirm passwords",
            required
          ),
          $autoDirty: false,
        },
        email: {
          required: helpers.withMessage(
            "Please enter email id",
            requiredIf(this.usePhone == false)
          ),
          email,
          $autoDirty: false,
        },
        phone: {
          required: helpers.withMessage(
            "Please enter phone no.",
            requiredIf(this.usePhone == true)
          ),
          numeric,
          maxLength: helpers.withMessage(
            "Please enter max 17 digit No.",
            maxLength(17),
            requiredIf(this.usePhone == true)
          ),
          $autoDirty: false,
        },
        country_code: {
          required: helpers.withMessage(
            "Select country code",
            requiredIf(this.usePhone == true)
          ),
          $autoDirty: false,
        },

        first_name: {
          required: helpers.withMessage("Please enter first name", required),
          $autoDirty: false,
        },
        last_name: {
          required: helpers.withMessage("Please enter last name", required),
          $autoDirty: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters("login", [
      "getter_user",
      "getter_error",
      "getter_verifyPhoneOTP",
      "getter_verifyEmailOTP",
      "getter_optVerified",
      "getter_userType",
    ]),
    ...mapGetters("dropdown", ["getter_interest"]),
    ...mapGetters("login", ["getter_isUserLoggedIn"]),
    buttonLabel() {
      return this.showPassword1 ? "Hide" : "Show";
    },
  },
  mounted() {
    this.action_getInterest();
    // console.log(this.v$);
  },
  methods: {
    ...mapActions("login", [
      "action_verifyEmailOTP",
      "action_verifyPhoneOTP",
      "action_phoneOTP",
      "action_emailOTP",
      "action_fetchUserType",
    ]),
    ...mapActions("dropdown", ["action_getInterest"]),
    signIn() {
      let redirectUrl = this.$route.query.callback_url;
      // alert(this.$route.query.redirect_url)
      if (redirectUrl == appConstants.callback_url.BUSINESS) {
        window.open(`${appConstants.BUSINESS_URL}`, "_self");
      } else {
        this.$router.push({ name: appConstants.routes.LOGIN });
      }
    },
    isEnterClicked(e) {
      if (e.keyCode === 13) {
        this.creatAccount();
      }
    },
    removePhone() {
      this.usePhone = !this.usePhone;
      this.form_data.phone = "";
      this.form_data.country_code = "";
    },
    removeEmail() {
      this.usePhone = !this.usePhone;
      this.form_data.email = "";
    },
    // showSuccess() {
    //   this.$toast.add({
    //     severity: "success",
    //     summary: "Success Message!!",
    //     detail: "Message Content",
    //     life:1000
    //   });
    // },
    closeVerifyOTP() {
      this.verified = false;
    },
    validtePassword() {
      let passw = /^(?=.*[A-Z])(?=.*[!@#$%&*])(?=.{8,})/;
      if (this.form_data.password1.match(passw)) {
        this.strongPass = false;
        return true;
      } else {
        this.strongPass = true;
        return false;
      }
    },
    OTPverify(value) {
      this.v$.$touch();
      this.otpError = "";
      // console.log("interests =>", this.interest);
      // this.form_data.interest = this.interest.map(function (element) {
      //   return element.id;
      // });
      this.OTP = value;
      this.terms = true;
      if (this.usePhone) {
        this.form_data.username = this.form_data.phone.concat("@olous.email");
        // console.log("intrest in if =>", this.form_data.interest);
        let verifyData = {
          verifyOTP: {
            country_code: this.form_data.country_code,
            phone: this.form_data.phone,
            otp: this.OTP,
          },
          phone_data: {
            is_chat_private: true,
            country_code: this.form_data.country_code,
            username: this.form_data.username,
            phone: this.form_data.phone,
            verified_credentials: [1],
            password1: this.form_data.password1,
            interests: this.form_data.interest,
            email: this.form_data.username,
            first_name: this.form_data.first_name,
            last_name: this.form_data.last_name,
            password2: this.form_data.password2,
            user_type: this.form_data.user_type.id,
          },
        };
        this.action_phoneOTP(verifyData)
          .then(() => {
            //this.$router.push({ name: appConstants.routes.ONBOARD });
            this.redirectOnBoard();
          })
          .catch((error) => {
            this.otpError = error;
          });
      } else {
        // console.log("intrest in else =>", this.form_data.interest);
        let verifyData = {
          verifyOTP: {
            email: this.form_data.email,
            otp: this.OTP,
          },
          email_data: {
            is_chat_private: true,
            country_code: "",
            username: this.form_data.email,
            phone: "",
            verified_credentials: [0],
            password1: this.form_data.password1,
            interests: this.form_data.interest,
            email: this.form_data.email,
            first_name: this.form_data.first_name,
            last_name: this.form_data.last_name,
            password2: this.form_data.password2,
            user_type: this.form_data.user_type.id,
          },
        };
        this.action_emailOTP(verifyData)
          .then(() => {
            // console.log("registered successsfully!!");
            this.error = "";
            // this.$router.push({ name: appConstants.routes.ONBOARD });
            this.redirectOnBoard();
          })
          .catch((error) => {
            this.otpError = error;
          });
      }
    },
    creatAccount() {
      this.v$.$touch();
      this.otpError = "";
      // console.log(this.v$);
      if (this.v$.$invalid) {
        // console.log("in if ");
        return false;
      } else {
        if (this.strongPass) {
          //this.form_data.password1 = "";
          // this.form_data.password2 = "";
          return false;
        }
        console.log("form data", this.form_data);
        // console.log("in else ");
        if (this.form_data.password1 == this.form_data.password2) {
          this.validatePassword = false;

          this.setOTPToUser();
        } else {
          this.validatePassword = true;
          this.form_data.password2 = "";
          this.$refs.password2.focus();
        }
      }
    },
    setOTPToUser() {
      this.terms = true;
      if (this.usePhone) {
        let phoneData = {
          first_name: this.form_data.first_name,
          country_code: this.form_data.country_code,
          last_name: this.form_data.last_name,
          otp_type: "3",
          phone: this.form_data.phone,
          email: "",
        };
        this.startTimer = false;
        this.action_verifyPhoneOTP(phoneData)
          .then(() => {
            this.startTimer = false;
            this.startTimer = true;
            this.verified = true;
          })
          .catch((error) => {
            this.error = error;
          });
      } else {
        let emailData = {
          country_code: "",
          last_name: this.form_data.last_name,
          phone: "",
          first_name: this.form_data.first_name,
          email: this.form_data.email,
        };
        this.startTimer = false;
        this.action_verifyEmailOTP(emailData)
          .then(() => {
            this.startTimer = false;
            this.startTimer = true;
            this.verified = true;
          })
          .catch((error) => {
            this.error = error;
          });
      }
    },
    clickClose() {
      // this.$router.push({ name: appConstants.routes.HOME });
      this.otpSent = false;

      let redirectUrl = this.$route.query.callback_url;
      // alert(this.$route.query.redirect_url)
      if (redirectUrl == appConstants.callback_url.BUSINESS) {
        window.open(`${appConstants.BUSINESS_URL}`, "_self");
      } else {
        this.$router.push({ name: appConstants.routes.HOME });
      }
    },
    clickInfo() {
      let route = this.$router.resolve({ name: appConstants.routes.TERMS });
      window.open(route.href, "_blank");
    },
    redirectOnBoard() {
      let redirectUrl = this.$route.query.callback_url;
      // if (
      //   redirectUrl != "" &&
      //   redirectUrl != undefined &&
      //   redirectUrl != null
      // ) {
      //   this.$router.push({
      //     name: appConstants.routes.ONBOARD,
      //     query: { callback_url: redirectUrl },
      //   });
      // } else {
      //   this.$router.push({ name: appConstants.routes.ONBOARD });
      // }
      if (redirectUrl == appConstants.callback_url.BUSINESS) {
        window.open(`${appConstants.BUSINESS_URL}`, "_self");
      } else {
        var obj = this.getter_userType.find((res) => {
          if (res.id == this.getter_user.user_type) {
            return res;
          }
        });
        if (obj.input_type === 1) {
          this.$router.push({
            name: appConstants.routes.EDUCATION,
            query: { isFromSignUp: true },
          });
        } else if (obj.input_type === 2) {
          this.$router.push({
            name: appConstants.routes.EXPERIENCE,
            query: { isFromSignUp: true },
          });
        } else {
          this.$router.push({ name: appConstants.routes.HOME });
        }
      }
    },
    closePhoneCode() {
      console.log("closed");
      this.selectPhoneCode = false;
    },
    savePhoneCode(value) {
      this.form_data.country_code = value;
      this.selectPhoneCode = false;
    },
    getStaticImagesUrl(imageName) {
      let url = this.getStaticImage(imageName);
      return url;
    },
  },
  created() {
    this.action_fetchUserType();
    if (this.getter_isUserLoggedIn) {
      this.$router.push({ name: appConstants.routes.HOME });
    }
  },
};
</script>

<style>
.eye {
  margin: 17px 17px 0px 0px;
}
.has_required {
  /* visibility: hidden; */
  display: none;
  /* text-decoration: line-through; */
  color: #689868;
}
/* .p-inputtext {
  text-align: center;
} */
</style>
