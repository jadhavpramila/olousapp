<template>
  <div v-if="selecPhoneCode">
    <selectCountryPhoneCode
      @close_button_click="closePhoneCode"
      @selected_country_click="savePhoneCode"
    />
  </div>
  <Dialog :showHeader="false" v-model:visible="display" :modal="true">
    <div class="form-bg-w p-6">
      <p>Details saved successfully</p>
      <button @click="closeModal" class="btn w-24 mt-4">OK</button>
    </div>
  </Dialog>
  <div class="cls-otherdetails form-bg-w p-6">
    <section>
      <div class="flex flex-row">
        <!-- <div class="">
        <button class="btn ml-2" @click="clickbtn">></button>
      </div> -->
        <div class="text-center app-text-color-primary font-medium page-title">
          Other Details
        </div>
      </div>
    </section>
    <!-- add Details -->
    <div class="flex items-center justify-center">
      <div class="w-full">
        <div class="">
          <div class="flex">
            <div
              class="app-text-color-secondary text-sm font-light mb-3 w-3/4 p-2"
            >
              Please note this information will be visible on your Olous CV. You
              may update this information as required. This change/update will
              not effect your login information
            </div>
          </div>
          <div class="flex flex-col">
            <div class="grid grid-cols-1 gap-1 form-group">
              <label for="Certification" class="form-label-bg-w">
                Email ID
              </label>
              <input
                v-model="otherDetails.cv_email"
                type="email"
                class="form-control text-gray-900 w-full bg-white focus:outline-none rounded-lg"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.otherDetails.cv_email.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div class="w-full">
                <label for="Certification" class="form-label-bg-w">
                  Mobile
                </label>
                <div class="flex space-x-4">
                  <button
                    @click="openPhoneCode($event)"
                    class="lg:w-32 w-24 text-center p-2 form-control text-gray-900 bg-[#f2f2f2] border-r focus:outline-none rounded-r-lg"
                  >
                    {{ otherDetails.cv_country_code }}
                  </button>
                  <!-- <input
                    v-model="otherDetails.cv_country_code"
                    type="text"
                    class="inline-flex p-2 form-control text-gray-900 w-12 bg-[#f2f2f2] border-r focus:outline-none rounded-l-lg text-[1.125rem]"
                  /> -->
                  <input
                    v-model="otherDetails.cv_phone"
                    type="text"
                    class="form-control text-gray-900 w-full bg-white rounded-r-lg focus:outline-none"
                  />
                </div>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.otherDetails.cv_country_code.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
                <div
                  class="invalid-feedback"
                  v-for="error of v$.otherDetails.cv_phone.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div class="w-full">
                <label for="Certification" class="form-label-bg-w">
                  Date Of Birth
                </label>
                <!-- <input
                  v-model="otherDetails.dob"
                  type="date"
                  class="p-2 form-control text-gray-900 w-full bg-white h-10 focus:outline-none rounded-lg text-[1.125rem]"
                /> -->
                <Calendar
                  v-model="otherDetails.dob"
                  dateFormat="dd M yy"
                  manualInput
                  class="w-full form-control rounded-lg"
                  :maxDate="currentDate()"
                />
                <div
                  class="invalid-feedback"
                  v-for="error of v$.otherDetails.dob.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>

            <!--<div class="grid grid-cols-1  pb-4">
              <label for="Certification" class="key-skill skills form-label">
                City
              </label>
             
              <AutoComplete
                v-model="otherDetails.city"
                :suggestions="filteredLocation"
                @complete="selectedPlace($event)"
                @item-select="locationSelectedByUser"
                @item-unselect="locationUnSelectedByUser"
                @clear="locationUnSelectedByUser"
                :dropdown="true"
                field="_source.name"
                forceSelection
                placeholder=""
                class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
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
                v-for="error of v$.otherDetails.city.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>-->
            <div class="flex items-end justify-end space-x-3 mt-8">
              <div>
                <button
                  class="btn btn-controls mr-4"
                  type="submit"
                  @click="backToBuildcv()"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-controls"
                  @click="saveOtherDetails()"
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
  </div>
  <!-- top section -->

  <!-- display cerification -->
</template>

<script>
import useVuelidate from "@vuelidate/core";
//import { ValidateEach } from "@vuelidate/components";
import { helpers, required, email, numeric } from "@vuelidate/validators";
//import Calendar from 'primevue/calendar';
//import Nav from "../../components/Layout/Nav.vue";;
import { mapGetters, mapActions, mapMutations } from "vuex";
import Calendar from "primevue/calendar";
import moment from "moment";
import AutoComplete from "primevue/autocomplete";
import selectCountryPhoneCode from "../../components/common/selectCountryPhoneCode.vue";
import appConstants from "../../appConstants.js";
import Dialog from "primevue/dialog";
import { withoutChangeTimeZoneFormatDate } from "../../common/js/dateFormater.js";

export default {
  name: "OtherDetails",
  props: ["message"],
  emits: ["close"],
  components: {
    //Nav,
    Calendar,
    AutoComplete,
    selectCountryPhoneCode,
    Dialog,
  },
  setup: () => ({ v$: useVuelidate({ $autoDirty: false }) }),
  data() {
    return {
      display: false,
      selecPhoneCode: false,
      submitted: false,
      new_otherDetails: [],
      filteredLocation: [],
      otherDetails: {
        cv_email: "",
        cv_phone: "",
        dob: "",
        // city: "",
        cv_country_code: "+91",
      },
      display: false,
      cv_elements: appConstants.CV_ELEMENTS,
    };
  },
  validations() {
    return {
      otherDetails: {
        cv_email: {
          email,
          required: helpers.withMessage("Please Enter Email", required),
        },
        cv_phone: {
          required: helpers.withMessage("Please Enter Phone", required),
          numeric,
        },
        dob: {
          required: helpers.withMessage("Please Enter DOB", required),
        },
        // city: {
        //   required: helpers.withMessage("Please Enter City", required)
        // },
        cv_country_code: {
          required: helpers.withMessage("Please Enter Country Code", required),
        },
      },
    };
  },
  computed: {
    ...mapGetters("login", ["getter_user"]),
    ...mapGetters("UserProfile", ["getter_UserProfile"]),
    ...mapGetters("dropdown", ["getter_searchLocation"]),
  },
  methods: {
    ...mapActions("UserProfile", [
      "action_SaveUserProfileData",
      "action_getLoggedInUserCVcontactInfo",
    ]),
    ...mapActions("dropdown", ["action_searchLocation"]),

    saveOtherDetails() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      }
      // this.formatDate(this.otherDetails.dob);
      this.submitted = true;
      let dataTosave = JSON.parse(JSON.stringify(this.otherDetails));
      let dob_date = this.otherDetails.dob;
      dataTosave.dob = withoutChangeTimeZoneFormatDate(dob_date);
      this.action_SaveUserProfileData(dataTosave).then((response) => {
        // this.display = true;
        //this.backToBuildcv();
        this.$toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: appConstants.toast_summary.SUCCESS,
          detail: response.message,
          life: 3000,
        });

        this.action_getLoggedInUserCVcontactInfo().then((response) => {
          this.backToBuildcv();
        });
      });
    },
    currentDate() {
      let date = new Date();
      return date;
    },
    backToBuildcv() {
      // this.$router.push({ name: appConstants.routes.PROFILENEW });
      // let userSlug = this.getter_user.slug;
      // this.$router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: {
      //     user_slug: userSlug,
      //     section: this.cv_elements.OTHER_DETAILS,
      //   },
      // });
      this.$emit("close", false);
    },
    closeModal() {
      this.display = false;
    },
    openPhoneCode() {
      this.selecPhoneCode = true;
    },
    closePhoneCode() {
      this.selecPhoneCode = false;
    },
    savePhoneCode(value) {
      this.selecPhoneCode = false;
      this.otherDetails.cv_country_code = value;
    },
    otherDetailsLoop() {
      this.otherDetails = this.getter_UserProfile;
    },
    // formatDate(date) {
    //   let d = new Date(date).toISOString().split(".")[0] + "Z";
    //   this.otherDetails.dob = d;
    // },
    formatDate(date) {
      let date_obj = new Date(date);
      this.otherDetails.dob = date_obj;
    },
    setData() {
      let cv_email = "";
      let otherDetails_obj = "";
      if (this.getter_UserProfile.other_details.show_other_details) {
        otherDetails_obj = this.getter_UserProfile.other_details.other_details;
        this.otherDetails.cv_email = otherDetails_obj.cv_email;
        this.otherDetails.cv_country_code = otherDetails_obj.cv_country_code;
        this.otherDetails.cv_phone = otherDetails_obj.cv_phone;
        this.otherDetails.dob = otherDetails_obj.dob;
      }

      // if (this.getter_UserProfile.user_details[0].cv_email) {
      //   cv_email = this.getter_UserProfile.user_details[0].cv_email;
      // } else {
      //   cv_email = this.getter_UserProfile.user_details[0].email;
      // }
      // let result = cv_email.includes("@olous.email");
      // if (result) {
      //   this.otherDetails.cv_email = "";
      // } else {
      //   this.otherDetails.cv_email = cv_email;
      // }
      // if (this.getter_UserProfile.user_details[0].cv_country_code) {
      //   this.otherDetails.cv_country_code =
      //     this.getter_UserProfile.user_details[0].cv_country_code;
      // } else {
      //   this.otherDetails.cv_country_code = "+91";
      // }

      // if (this.getter_UserProfile.user_details[0].cv_phone) {
      //   this.otherDetails.cv_phone =
      //     this.getter_UserProfile.user_details[0].cv_phone;
      // } else {
      //   this.otherDetails.cv_phone =
      //     this.getter_UserProfile.user_details[0].phone;
      // }

      // if (
      //   (this.getter_UserProfile.user_details[0].dob != "") &
      //   (this.getter_UserProfile.user_details[0].dob != undefined)
      // ) {
      //   this.otherDetails.dob = new Date(
      //     this.getter_UserProfile.user_details[0].dob
      //   );
      // } else {
      //   this.otherDetails.dob = "";
      // }
    },
    async selectedPlace(event) {
      let data = {
        query: event.query,
        countryIso2: "",
      };
      this.action_searchLocation(data).then(() => {
        this.filteredLocation = this.getter_searchLocation;
      });
    },
    locationSelectedByUser(selectedLocation) {
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;
      // this.form_data.education.address = addressObj;

      this.otherDetails.city = addressObj;
    },
    locationUnSelectedByUser(val) {
      this.otherDetails.city = "";
    },
  },
  created() {
    if (this.getter_UserProfile) {
      this.setData();
    }
    // this.action_getOtherDetails(user_id).then(() => {
    //   this.otherDetailsLoop();
    // });
  },
};
</script>

<style scoped>
.content-div {
  width: 450px;
  height: 120px;
}

.p-calendar {
  /* margin-top: 8px !important; */
  padding-left: 0px;
  border-radius: 10px;
}

input {
  line-height: 1.25;
}

.p-inputtext {
  /*font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */

  color: rgba(55, 65, 81, var(--tw-text-opacity));
  background: #ffffff;
  padding: 0.5rem 0.5rem;
  /* border: 1px solid #ced4da; 
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;*/
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 3px;
}

.p-inputtext:enabled:focus {
  outline: 0 none;
  outline-offset: 0;
  /* box-shadow: 0 0 0 0.2rem #a6d5fa; */
  /* border-color: #2196F3; */
}

.p-component {
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
  font-size: 1rem;
  font-weight: normal;
}

@media only screen and (max-width: 600px) {
  .content-div {
    width: 200px;
    height: 120px;
  }
}
</style>
