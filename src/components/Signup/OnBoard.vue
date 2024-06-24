<template>
  <div class="page-without-header form-container">
    <div
      class="max-w-full mx-4 md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased relative"
    >
      <!-- <pre> -->
      <!-- {{getter_user}} -->
      <!-- </pre> -->

      <div class="flex flex-col items-center space-3">
        <div class="bg-[#121415] rounded-[2rem] mb-6 pb-12 signin-forms">
          <!-- <div class="flex justify-end">
            <button class="m-4" type="submit" @click="clickClose()">
              <img src="../../assets/close.svg" alt="" />
            </button>
          </div> -->
          <div class="px-4 lg:px-0 signin-forms-inner pt-12">
            <!-- <div class="mb-4 center">
            <input
              class="hidden"
              type="file"
              id="profileImage"
              ref="profileImage"
              name="profileImage"
              @change="handleFileUpload( $event )"
            />
            <span
              class="lg:w-[10rem] lg:h-[10rem] w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center relative"
            >
              <span class="text-lg text-gray-900">Photo</span>
              <span
                @click="openDialog"
                class="absolute lg:bottom-[1rem] bottom-[0rem] right-0 bg-gray-100 p-[0.1rem] rounded-full text-sm cursor-pointer"
                >
                <img src="../../assets/Edit.svg" alt="" class="max-h-9">
                </span
              >
            </span>
          </div> -->
            <div class="flex flex-col justify-center items-center">
              <UploadImage
                id="logoImage"
                component_height="150"
                is_logo_image="true"
                :save_image_path_value="path_s3_save_image"
                :image_name_value="getter_user.profile_image"
                :submitted="false"
                is_object_fit_contain="true"
                :upload_button_text="shortForm()"
                required_validation_message="Profile picture required"
                @uploadedImage_changed="getUpdatedLogoImage"
              />
            </div>

            <div class="space-x-3 mt-3">
              <div class="flex flex-col space-4 mt-3">
                <AutoComplete
                  v-model="form_data.country"
                  :suggestions="getter_countries"
                  @complete="fetchFilteredCounties($event)"
                  @item-select="countrySelectedByUser"
                  @item-unselect="countryUnSelectedByUser"
                  @clear="countryUnSelectedByUser"
                  :dropdown="true"
                  field="_source.name"
                  forceSelection
                  placeholder="Country"
                  class="p-2 border-current form-control text-left text-gray-900 w-full bg-white focus:outline-none rounded-lg text-[1.125rem]"
                >
                </AutoComplete>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.form_data.country.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
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
                  placeholder="City"
                  :disabled="this.form_data.country ? false : true"
                  class="w-full lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control text-left"
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
                <!-- <small v-if="locationError" class="invalid-feedback"
                  >Please enter your city.</small
                > -->
                <div
                  class="invalid-feedback"
                  v-for="error of v$.form_data.city.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
                <label for="description" class="text-sm text-gray-400 my-4"
                  >Eg. Passionate for construction</label
                >
                <textarea
                  name="description"
                  v-model="form_data.about"
                  id="description"
                  cols="30"
                  rows="3"
                  maxlength="100"
                  class="py-2 pl-4 bg-white text-gray-700 focus:outline-none rounded-xl"
                  placeholder="Professional tag line (Max 100 characters)"
                ></textarea>
                <div
                  class="invalid-feedback pt-3"
                  v-for="error of v$.form_data.about.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
                <button
                  class="mt-8 btn-cursor login-btn"
                  @click="saveDetails()"
                >
                  <span class="">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import appConstants from "../../appConstants.js";
import UploadImage from "../common/UploadImage.vue";
import AutoComplete from "primevue/autocomplete";
import useVuelidate from "@vuelidate/core";

import { helpers, required } from "@vuelidate/validators";

export default {
  name: "onBoard",
  components: {
    UploadImage,
    AutoComplete,
  },
  computed: {
    ...mapGetters("login", [
      "getter_user",
      "getter_onBoardData",
      "getter_userType",
    ]),
    ...mapGetters("dropdown", ["getter_searchLocation", "getter_countries"]),
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      filteredLocation: [],
      file: "",
      // locationError: false,
      form_data: {
        about: "",
        country: "",
        country_iso: "",
        state: "",
        state_iso: "",
        city: "",
        profile_image: "",
        country_code: "",
      },
      selectedCountryIso2: "",
      cityInput: "",
      submitted: false,
      path_s3_save_image: appConstants.PATH_SAVE_MEDIA_IMAGE_ON_S3,
      descriptionData: {
        logo: "",
      },
    };
  },
  validations() {
    return {
      form_data: {
        country: {
          required: helpers.withMessage("Please enter Country", required),
        },
        city: { required: helpers.withMessage("Please enter City", required) },
        about: {
          required: helpers.withMessage("Please enter tag line", required),
        },
      },
    };
  },
  methods: {
    ...mapActions("login", [
      "action_saveOnBoardDetails",
      "action_fetchUserType",
    ]),
    ...mapActions("dropdown", [
      "action_searchLocation",
      "action_fetchFilteredCountries",
    ]),
    getUpdatedLogoImage(value) {
      this.form_data.profile_image = value.image_name;
    },
    // cityData(value) {
    //   console.log(value);
    //   this.form_data.city = value;
    // },
    async fetchFilteredCounties(event) {
      this.action_fetchFilteredCountries(event.query);
    },
    countrySelectedByUser(selectedCountry) {
      console.log("selectedCountry", selectedCountry);
      this.form_data.country_code = selectedCountry.value._source.phone_code;
      this.selectedCountryIso2 = selectedCountry.value._source.iso2;

      this.form_data.country = selectedCountry.value._source.name;
      this.form_data.country_iso = selectedCountry.value._source.iso2;
    },
    countryUnSelectedByUser(val) {
      this.country_code = "";
      this.form_data.city = "";
      this.cityInput = "";
      this.form_data.state = "";
      this.form_data.state_iso = "";
    },
    async selectedPlace(event) {
      let data = {
        query: event.query,
        countryIso2: this.selectedCountryIso2,
      };
      this.action_searchLocation(data).then(() => {
        this.filteredLocation = this.getter_searchLocation;
      });
    },
    // checkIsCountryFilled() {
    //   if (this.form_data.country == "") {
    //   }
    // },
    locationSelectedByUser(selectedLocation) {
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;
      this.form_data.city = addressObj;
      this.cityInput = selectedLocation.value._source.name;
      this.form_data.state = selectedLocation.value._source.state.name;
      this.form_data.state_iso = selectedLocation.value._source.state.state_iso;
    },
    locationUnSelectedByUser(val) {
      this.form_data.city = "";
    },
    shortForm() {
      if (this.getter_user) {
        let initialLetters =
          this.getter_user.first_name.charAt(0).toUpperCase() +
          this.getter_user.last_name.charAt(0).toUpperCase();
        return initialLetters;
      }
    },
    saveDetails() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }

      this.action_saveOnBoardDetails(this.form_data).then(() => {
        if (this.getter_onBoardData) {
          this.redirectAfterSignUp();
        }
      });

      //console.log("this.form_data", this.form_data);
      // if (this.form_data.city) {
      //   // this.locationError = false;
      //   this.action_saveOnBoardDetails(this.form_data).then(() => {
      //     if (this.getter_onBoardData) {
      //       this.redirectAfterSignUp()
      //     }
      //   });
      // } else {
      //   // this.locationError = true;
      // }
    },
    redirectAfterSignUp() {
      let redirectUrl = this.$route.query.callback_url;
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
            params: { isFromSignUp: false },
          });
        } else if (obj.input_type === 2) {
          this.$router.push({
            name: appConstants.routes.EXPERIENCE,
            params: { isFromSignUp: false },
          });
        } else {
          this.$router.push({ name: appConstants.routes.HOME });
        }
      }
    },
    // clickClose() {
    //   this.$router.push({ name: appConstants.routes.HOME });
    // },
  },
  created() {
    this.action_fetchUserType();
  },
};
</script>

<style>
.center {
  margin-left: 25%;
}
</style>
