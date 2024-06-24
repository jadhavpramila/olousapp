<template>
  <!-- top section -->
  <div class="cls-editprofile form-bg-w p-6">
    <!-- <pre>
      {{ getter_UserProfile.user_details }}
    </pre> -->
    <BlockUI :blocked="blockPage" :fullScreen="true">
      <div v-if="popup" class="absolute">
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
    <div v-if="selecPhoneCode">
      <selectCountryPhoneCode
        @close_button_click="closePhoneCode"
        @selected_country_click="savePhoneCode"
      />
    </div>
    <Dialog
      class="capitalize"
      :showHeader="false"
      v-model:visible="display"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <p class="m-0">{{ message }}</p>
        <div class="flex justify-end mt-4">
          <button class="btn w-24" @click="closeModal">Close</button>
        </div>
      </div>
    </Dialog>
    <div class="flex">
      <div class="w-full">
        <div class="flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="flex app-text-color-primary items-center justify-center page-title"
              >Edit Profile</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- add certification -->
    <div class="flex items-center justify-center">
      <div class="w-full">
        <div class="">
          <div class="flex flex-col">
            <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
              <div class="sm:col-span-1 md:col-span-1">
                <UploadImage
                  id="logoImage"
                  component_height="150"
                  is_logo_image="true"
                  :save_image_path_value="path_s3_save_image"
                  :image_name_value="editProfile.profile_image"
                  :submitted="false"
                  is_object_fit_contain="true"
                  :upload_button_text="shortForm()"
                  required_validation_message="Profile picture required"
                  @uploadedImage_changed="getUpdatedLogoImage"
                />
              </div>

              <div class="sm:col-span-2 md:col-span-4">
                <div>
                  <label for="Certification" class="form-label-bg-w">
                    First Name
                  </label>
                  <input
                    v-model="editProfile.first_name"
                    placeholder=""
                    type="text"
                    class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="error of v$.editProfile.first_name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </div>
                </div>
                <div>
                  <label for="Certification" class="form-label-bg-w">
                    Last Name
                  </label>
                  <input
                    v-model="editProfile.last_name"
                    placeholder=""
                    type="text"
                    class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                  />
                  <div
                    class="invalid-feedback"
                    v-for="error of v$.editProfile.last_name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div>
                <label for="Certification" class="form-label-bg-w">
                  Designation
                </label>
                <input
                  v-model="editProfile.designation"
                  placeholder=""
                  type="text"
                  class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                />
                <div
                  class="invalid-feedback"
                  v-for="error of v$.editProfile.designation.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="">
              <!-- <CountryStateCityVue
                ref="country_state_city"
                :isEdit="isEditProfile"
                :locationData="locationData"
              ></CountryStateCityVue> -->
              <!-- <div>
                <label for="Certification" class="form-label-bg-w">
                  Country
                </label>
                <AutoComplete
                  v-model="editProfile.country"
                  :suggestions="getter_countries"
                  @complete="fetchFilteredCounties($event)"
                  @item-select="countrySelectedByUser"
                  @item-unselect="countryUnSelectedByUser"
                  @clear="countryUnSelectedByUser"
                  :dropdown="true"
                  field="_source.name"
                  forceSelection
                  placeholder=""
                  class="p-2 border-current form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg text-[1.125rem]"
                >
                </AutoComplete>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.editProfile.country.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div>
                <label for="Certification" class="form-label-bg-w">
                  City
                </label>
                <AutoComplete
                  v-model="cityInput"
                  :suggestions="filteredLocation"
                  @complete="selectedPlace($event)"
                  @item-select="locationSelectedByUser"
                  @item-unselect="locationUnSelectedByUser"
                  @clear="locationUnSelectedByUser"
                  :dropdown="true"
                  field="_source.name"
                  forceSelection
                  placeholder=""
                  :disabled="this.editProfile.country ? false : true"
                  class="w-full lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
                >
                  <template #item="slotProps">
                    <div class="country-item">
                      <div class="p-ml-2">
                        {{ slotProps.item._source.name }},
                        {{ slotProps.item._source.state.name }},
                        {{ slotProps.item._source.country.name }}
                      </div>
                    </div>
                  </template>
                </AutoComplete>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.editProfile.city.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div> -->
            </div>

            <div class="">
              <label for="Certification" class="form-label-bg-w">
                Profile Tagline (Eg: Passionate for construction)
              </label>
              <!-- <textarea
                  name="description"
                  v-model="editProfile.about"
                  id="description"
                  cols="30"
                  rows="1"
                  maxlength="100"
                  class=" form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                ></textarea> -->
              <input
                v-model="editProfile.about"
                placeholder=""
                type=""
                maxlength="100"
                class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.editProfile.about.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>
            <!-- {{ editProfile }} -->
            <div class="grid grid-cols-1 sm:grid-cols-2 form-group sm:gap-4">
              <div class="w-full">
                <label for="Certification" class="form-label-bg-w">
                  Mobile </label
                ><br />
                <div class="grid grid-cols-4 lg:gap-2 gap-1">
                  <div class="flex col-span-3 justify-center">
                    <div>
                      <button
                        @click="openPhoneCode()"
                        class="w-14 text-center form-control text-gray-900 bg-[#f2f2f2] border-r focus:outline-none rounded-r-lg"
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
                      v-model="phone_to_verify"
                      placeholder=""
                      type="text"
                      maxlength="17"
                      class="ml-1 form-control text-gray-900 w-full bg-white rounded-pr-lg focus:outline-none"
                    />
                  </div>
                  <div class="">
                    <button
                      class="btn btn-inputeControlHeight form-control text-center"
                      type="submit"
                      @click="sendOTP('phone')"
                    >
                      <span v-if="verifyButtonTextPhone"> Verify </span>
                      <span v-if="!verifyButtonTextPhone"> Change </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-full">
                <label for="Certification" class="form-label-bg-w">
                  Email
                </label>
                <div class="grid grid-cols-4 lg:gap-2 gap-1">
                  <div class="col-span-3 flex">
                    <input
                      v-model="email_to_verify"
                      placeholder=""
                      type="email"
                      class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
                    />
                  </div>
                  <div>
                    <button
                      class="btn btn-inputeControlHeight form-control text-center"
                      type="submit"
                      @click="sendOTP('email')"
                    >
                      <span v-if="isThereEmail"> Verify </span>
                      <span v-if="!isThereEmail"> Change </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Save and Back Button -->
          <div class="flex items-end justify-end space-x-3 mt-4">
            <div>
              <button
                class="btn btn-controls btn-white mr-4"
                type="submit"
                @click="btnBackClick()"
              >
                Cancel
              </button>
              <button
                class="btn btn-controls btn-white"
                @click="saveProfile()"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- display cerification -->
</template>

<script>
//import Calendar from 'primevue/calendar';
//import Nav from "../../components/Layout/Nav.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import UploadImage from "../../components/common/UploadImage.vue";
import appConstants from "../../appConstants.js";
import OTPModal from "../common/OTPModal.vue";
import BlockUI from "primevue/blockui";
import AutoComplete from "primevue/autocomplete";
import Dialog from "primevue/dialog";
import selectCountryPhoneCode from "../../components/common/selectCountryPhoneCode.vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
//import CountryStateCityVue from "../common/CountryStateCity.vue";
export default {
  name: "EditProfile",
  emits: ["close"],
  components: {
    UploadImage,
    OTPModal,
    BlockUI,
    AutoComplete,
    Dialog,
    selectCountryPhoneCode,
    //CountryStateCityVue,
  },

  data() {
    return {
      errorMessage: "",
      submitted: false,
      isThereEmail: "",
      selecPhoneCode: false,
      message: "",
      status: "",
      blockPage: false,
      startTimer: false,
      display: false,
      popup: false,
      isemailORPhone: "",
      otpData: {},
      new_editProfile: [],
      editProfile: {
        first_name: "",
        last_name: "",
        designation: "",
        city: "",
        about: "",
        country_code: "",
        email: "",
        phone: "",
        profile_image: "",
        country: "",
        country_iso: "",
        state: "",
        state_iso: "",
      },
      cityInput: "",
      email_to_verify: "",
      phone_to_verify: "",
      path_s3_save_image: appConstants.PATH_SAVE_MEDIA_IMAGE_ON_S3,
      filteredLocation: [],
      verifyButtonTextPhone: true,
      isEditProfile: false,
      locationData: {},
    };
  },
  computed: {
    ...mapMutations("UserProfile", ["commit_UserProfile"]),
    ...mapGetters("UserProfile", ["getter_UserProfile"]),
    ...mapGetters("login", ["getter_user"]),
    ...mapGetters("dropdown", ["getter_searchLocation", "getter_countries"]),
  },
  mounted() {
    this.emitter.on("otp_verification", (data) => {
      // console.log(data);
      if (data == true) {
        this.popup = false;
        this.blockPage = false;
      }
    });
  },
  setup() {
    return { v$: useVuelidate({ $autoDirty: false }) };
  },
  validations() {
    return {
      editProfile: {
        first_name: {
          required: helpers.withMessage("First name is required", required),
        },
        last_name: {
          required: helpers.withMessage("Last name is required", required),
        },
        designation: {
          required: helpers.withMessage("Designation is required", required),
        },
        about: {
          required: helpers.withMessage(
            "Profile Tagline is required",
            required
          ),
        },
        // city: {
        //   required: helpers.withMessage("City is required", required),
        // },

        // country: {
        //   required: helpers.withMessage("Country is required", required),
        // },
      },
    };
  },
  methods: {
    ...mapActions("UserProfile", [
      "action_SaveUserProfileData",
      "action_getEmailOTP",
      "action_emailOTPVerify",
      "action_getPhoneOTP",
      "action_phoneOTPVerify",
    ]),
    ...mapActions("dropdown", [
      "action_searchLocation",
      "action_fetchFilteredCountries",
    ]),
    openPhoneCode() {
      this.selecPhoneCode = true;
    },
    closePhoneCode() {
      this.selecPhoneCode = false;
    },
    savePhoneCode(value) {
      this.selecPhoneCode = false;
      this.editProfile.country_code = value;
    },
    cancelchange() {
      this.popup = false;
    },
    resendOTP() {
      // console.log(this.isemailORPhone);
      this.sendOTP(this.isemailORPhone);
    },
    closeModal() {
      this.display = false;
    },
    OTPverify(value) {
      // console.log(value);
      if (this.isemailORPhone == "email" && value) {
        // this.popup = false;
        this.blockPage = false;
        let data = {
          otp: value,
          email: this.email_to_verify,
        };
        this.action_emailOTPVerify(data)
          .then((response) => {
            this.popup = false;
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.data.message,
              life: 3000,
            });
            // console.log("email otp verified", response.data);
            // this.message = response.data.message;
            // this.status = response.data.status;
            // this.display = true;
            this.editProfile.email = this.email_to_verify;
          })
          .catch((err) => {
            // console.log(this.popup);
            this.popup = true;
            this.errorMessage = err.message;
            // this.message = err.message;
            // this.status = err.status;
            // this.display = true;
          });
      } else if (this.isemailORPhone == "phone" && value) {
        this.blockPage = false;
        let data = {
          phone: this.phone_to_verify,
          country_code: this.editProfile.country_code,
          otp: value,
          user_id: this.getter_UserProfile.user_details[0].id,
        };
        this.action_phoneOTPVerify(data)
          .then((response) => {
            this.popup = false;
            // console.log("phone otp verified", response);
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.data.message,
              life: 3000,
            });
            // this.message = response.data.message;
            // this.status = response.data.status;
            // this.display = true;
            this.editProfile.phone = this.phone_to_verify;
          })
          .catch((err) => {
            // console.log(err);
            this.errorMessage = err.message;
            // this.message = err.message;
            // this.status = err.status;
            // this.display = true;
          });
      } else {
        // console.log("error in verification of otp of email or phone");
        this.popup = false;
        this.blockPage = false;
      }
    },
    getUpdatedLogoImage(value) {
      // console.log("getUpdatedLogoImage =>",value)
      this.editProfile.profile_image = value.image_name;
    },
    saveProfile() {
      this.v$.$touch();
      // if (this.$refs.country_state_city) {
      //   let data = this.$refs.country_state_city.location;
      //   this.editProfile.address = data.address;
      //   this.editProfile.country = data.country;
      //   this.editProfile.state = data.state;
      //   this.editProfile.city = data.city;
      //   this.editProfile.country_code = data.country_code;
      //   this.editProfile.country_iso = data.country_iso;
      //   this.editProfile.state_iso = data.state_iso;
      // }
      // console.log(this.v$);
      if (this.v$.$invalid) {
        // console.log("in if ");
        return false;
      } else {
        this.submitted = true;

        var dataTosave = this.getDataToSave();
        //console.log("dataTodave", dataTodave);
        this.action_SaveUserProfileData(dataTosave)
          .then((response) => {
            if (response.status == "success") {
              //console.log("in if..........");
              if (
                response.data.profile_image != this.getter_user.profile_image
              ) {
                this.getter_user.profile_image = response.data.profile_image;
              }
            }
            this.$emit("close", false);
            //console.log("response", response.status);
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.message = response.message;
            // this.status = response.status;
            // this.display = true;
            // this.display = true;
            // this.$router.push({ name: appConstants.routes.BUILDCV });
          })
          .catch((err) => {
            // this.message = err.message;
            // this.status = err.status;
            // this.display = true;
          });
      }
    },
    getDataToSave() {
      var dataTosave = {
        first_name: this.editProfile.first_name,
        last_name: this.editProfile.last_name,
        designation: this.editProfile.designation,
        // city: this.editProfile.city,
        about: this.editProfile.about,
        //country: this.editProfile.country,
        // country_iso: this.editProfile.country_iso,
        //state: this.editProfile.state,
        //state_iso: this.editProfile.state_iso,
        profile_image: this.editProfile.profile_image,
        country_code: this.editProfile.country_code,
      };

      return dataTosave;
    },
    setData() {
      this.editProfile.profile_image =
        this.getter_UserProfile.user_details[0].profile_image;
      this.editProfile.first_name =
        this.getter_UserProfile.user_details[0].first_name;
      this.editProfile.last_name =
        this.getter_UserProfile.user_details[0].last_name;
      this.isThereEmail =
        this.getter_UserProfile.user_details[0].email.includes("@olous.email");
      // this.locationData = {
      //   country: this.getter_UserProfile.user_details[0].country,
      //   state: "",
      //   city: this.getter_UserProfile.user_details[0].city,
      //   country_iso: this.getter_UserProfile.user_details[0].country_iso,
      //   state_iso: "",
      //   country_code: this.getter_UserProfile.user_details[0].country_code,
      // };
      // console.log(this.isThereEmail);
      if (!this.isThereEmail) {
        // console.log("in if");
        this.editProfile.email = this.getter_UserProfile.user_details[0].email;
        this.email_to_verify = this.getter_UserProfile.user_details[0].email;
      }
      this.editProfile.designation =
        this.getter_UserProfile.user_details[0].designation;
      this.editProfile.phone = this.getter_UserProfile.user_details[0].phone;
      // if (this.getter_UserProfile.user_details[0].city.indexOf(",") > -1) {
      //   let city = this.getter_UserProfile.user_details[0].city.substring(
      //     0,
      //     this.getter_UserProfile.user_details[0].city.indexOf(",")
      //   );
      //   this.cityInput = city;
      //   this.editProfile.city = city;
      // } else {
      //   this.cityInput = this.getter_UserProfile.user_details[0].city;
      //   this.editProfile.city = this.getter_UserProfile.user_details[0].city;
      // }

      //  this.editProfile.city = this.getter_UserProfile.user_details[0].city;
      // this.editProfile.country =
      //   this.getter_UserProfile.user_details[0].country;
      // this.editProfile.country_iso =
      //   this.getter_UserProfile.user_details[0].country_iso;
      if (this.getter_UserProfile.user_details[0].country_code) {
        this.editProfile.country_code =
          this.getter_UserProfile.user_details[0].country_code;
      }
      //  else {
      //   this.editProfile.country_code = "+91";
      // }

      this.editProfile.about = this.getter_UserProfile.user_details[0].about;

      this.phone_to_verify = this.getter_UserProfile.user_details[0].phone;

      if (this.getter_UserProfile.user_details[0].phone) {
        this.verifyButtonTextPhone = false;
      } else {
        this.verifyButtonTextPhone = true;
      }
    },
    shortForm() {
      if (this.getter_UserProfile == "") {
        return "";
      } else {
        let initialLetters =
          this.getter_UserProfile.user_details[0].first_name
            .charAt(0)
            .toUpperCase() +
          this.getter_UserProfile.user_details[0].last_name
            .charAt(0)
            .toUpperCase();
        return initialLetters;
      }
    },
    sendOTP(value) {
      this.isemailORPhone = value;
      if (value == "phone") {
        if (
          this.editProfile.country_code == "" ||
          this.editProfile.country_code == null ||
          this.editProfile.country_code == undefined
        ) {
          this.$toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Mobile country code required",
            life: 3000,
          });
          return;
        }
        if (
          this.phone_to_verify == "" ||
          this.phone_to_verify == null ||
          this.phone_to_verify == undefined
        ) {
          this.$toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Mobile no. required",
            life: 3000,
          });
          return;
        }
        let phoneData = {
          last_name: this.editProfile.last_name,
          country_code: this.editProfile.country_code,
          email: this.editProfile.email,
          phone: this.phone_to_verify,
          otp_type: "3",
          first_name: this.editProfile.first_name,
        };
        this.startTimer = false;
        this.action_getPhoneOTP(phoneData)
          .then(() => {
            // console.log("phone otp sent");
            this.startTimer = false;
            this.startTimer = true;
            this.popup = true;
            this.blockPage = false;
            this.verifyButtonTextPhone = false;
          })
          .catch((err) => {
            // console.log(err);
            // this.message = err.message;
            // this.status = err.status;
            // this.display = true;
          });
      } else {
        if (
          this.email_to_verify == "" ||
          this.email_to_verify == null ||
          this.email_to_verify == undefined
        ) {
          this.$toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Email id required",
            life: 3000,
          });
          return;
        }

        let emailData = {
          email: this.email_to_verify,
        };
        this.startTimer = false;
        this.action_getEmailOTP(emailData)
          .then(() => {
            // console.log("email otp sent");
            this.startTimer = false;
            this.startTimer = true;
            this.popup = true;
            this.blockPage = false;
          })
          .catch((err) => {
            // console.log(err);
            // this.message = err.message;
            // this.status = err.status;
            // this.display = true;
          });
      }
    },
    async fetchFilteredCounties(event) {
      this.action_fetchFilteredCountries(event.query);
    },
    countrySelectedByUser(selectedCountry) {
      //this.emit_value = selectedCountry.value._source.phone_code;
      this.selectedCountryIso2 = selectedCountry.value._source.iso2;

      this.editProfile.country = selectedCountry.value._source.name;
      this.editProfile.country_iso = selectedCountry.value._source.iso2;
    },
    countryUnSelectedByUser(val) {
      this.country_code = "";
      this.editProfile.city = "";
      this.cityInput = "";
      this.editProfile.state = "";
      this.editProfile.state_iso = "";
    },
    async selectedPlace(event) {
      //let data = {};
      // if (this.selectedCountryIso2) {
      let data = {
        query: event.query,
        countryIso2: this.editProfile.country_iso,
      };
      // } else {
      // data = {
      //   query: event.query,
      //   countryIso2: this.editProfile.country_iso,
      // };
      //  }

      this.action_searchLocation(data).then(() => {
        this.filteredLocation = this.getter_searchLocation;
      });
      //console.log("this.filteredLocation", this.filteredLocation);
    },
    locationSelectedByUser(selectedLocation) {
      //  console.log("selectedCountry", selectedLocation);
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;
      this.editProfile.city = addressObj;
      this.cityInput = selectedLocation.value._source.name;
      this.editProfile.state = selectedLocation.value._source.state.name;
      this.editProfile.state_iso =
        selectedLocation.value._source.state.state_iso;
    },
    locationUnSelectedByUser(val) {
      this.editProfile.city = "";
      this.cityInput = "";
      this.editProfile.state = "";
      this.editProfile.state_iso = "";
    },
    btnBackClick() {
      // let userSlug = this.getter_user.slug;
      // this.$router.push({ name: appConstants.routes.VIEWPROFILE ,params: { user_slug: userSlug } });
      // this.$router.push({ name: appConstants.routes.BUILDCV });
      this.$emit("close", false);
    },
  },

  created() {
    if (this.getter_UserProfile) {
      this.isEditProfile = true;
      this.setData();
    }
    this.emitter.on("selected_city", (data) => {
      this.editProfile.city = data;
    });
  },
};
</script>

<style scoped></style>
