<template>
  <!-- <div class="max-w-full m-1/6 md:mx-auto text-white">
    <Nav />
  </div> -->
  <div
    class="cls-experience p-6 rounded-md app-border"
    :class="isBackVisible ? 'form-bg-w' : 'form-bg-w mt-4 rounded-lg'"
  >
    <!-- top section -->
    <div class="flex">
      <!-- second section -->
      <div class="w-full mt-2">
        <div class="text-sm flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="flex items-center app-text-color-primary justify-center page-title"
              >Experience</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- add education -->
    <div class="py-1 m-auto w-full mt-1" v-if="editMode == true">
      <div class="">
        <!-- organisation name -->
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col">
              <label class="form-label-bg-w"> Organisation Name </label>
              <AutoComplete
                v-model="form_data.education.organization.name"
                :suggestions="filteredOrganisations"
                @complete="selectedOrg($event)"
                @item-select="orgSelectedByUser"
                @item-unselect="orgUnSelectedByUser"
                @clear="orgUnSelectedByUser"
                field="_source.name"
                placeholder=""
                class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.organization.name
                  .$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label class="form-label-bg-w"> Designation </label>
              <AutoComplete
                v-model="form_data.education.designation"
                :suggestions="filteredDesignation"
                dropdown
                @complete="selectedDesignationList($event)"
                @item-select="afterSelectionSetValue"
                field="designation"
                inputId="id"
                placeholder=""
                class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.designation.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
          </div>
          <div class="ml-3 mb-3 mt-1">
            <Checkbox
              v-model="form_data.education.current_org"
              name="markAsPresent"
              :binary="true"
              id="code"
              @click="chkMarkAsPresentClick"
            />
            <label for="code" class="form-label-bg-w ml-1 form-checkbox"
              >Mark as present</label
            >
          </div>
        </div>
        <!-- Designation -->
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-1"></div>
        </div>

        <!-- start date and end date -->
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-2 gap-4">
            <!-- start date -->
            <div class="flex flex-col">
              <label class="form-label-bg-w"> Start Date </label>
              <Calendar
                v-model="form_data.education.start_date"
                dateFormat="dd M yy"
                class="w-full form-control"
                placeholder=""
                @date-select="startDateSelected"
                :maxDate="getStartDateMaxDate()"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.start_date.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <!-- end date -->
            <div class="flex flex-col">
              <label class="form-label-bg-w overflow-hidden"> End Date</label>
              <Calendar
                v-if="!form_data.education.current_org"
                v-model="form_data.education.end_date"
                dateFormat="dd M yy"
                class="w-full form-control"
                placeholder=""
                @date-select="EndDateSelected"
                :minDate="getEndDateMinDate()"
                :disabled="form_data.education.current_org"
              />
              <input
                v-else
                type="text"
                placeholder="Present"
                disabled
                class="p-2 w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
              />

              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.end_date.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <!-- <div class="flex flex-col">
              <label class="form-label-bg-w"> Location</label>
              <AutoComplete
                v-model="form_data.education.address"
                :suggestions="filteredLocation"
                @complete="selectedPlace($event)"
                @item-select="locationSelectedByUser"
                @item-unselect="locationUnSelectedByUser"
                @clear="locationUnSelectedByUser"
                :dropdown="true"
                field="_source.name"
                forceSelection
                placeholder=""
                class="w-full bg-white text-gray-700 focus:outline-none form-control"
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
                v-if="v$.$dirty"
                v-for="error of v$.form_data.education.address.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div> -->
          </div>
        </div>
        <!-- address -->
        <div>
          <CountryStateCityVue
            ref="country_state_city"
            :isEdit="isEditEducation"
            :locationData="locationData"
          ></CountryStateCityVue>
        </div>
        <!-- <div class="flex flex-col form-group">
          <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col">
              <label class="form-label-bg-w"> Country</label>
              <AutoComplete
                v-model="selectedCountry"
                :suggestions="getter_countries"
                @complete="fetchFilteredCountries($event)"
                @item-select="countrySelectedByUser"
                @item-unselect="countryUnSelectedByUser"
                @clear="countryUnSelectedByUser"
                :dropdown="true"
                field="_source.name"
                forceSelection
                placeholder=""
                class="p-2 form-control text-gray-900 w-full"
              >
              </AutoComplete>
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.country.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label class="form-label-bg-w"> State</label>
              <AutoComplete
                v-model="selectedState"
                :suggestions="getter_states"
                @complete="fetchFilteredStates($event)"
                @item-select="stateSelectedByUser"
                @item-unselect="stateUnSelectedByUser"
                @clear="stateUnSelectedByUser"
                :dropdown="true"
                field="_source.state"
                forceSelection
                placeholder=""
                class="p-2 form-control text-gray-900 w-full"
                :disabled="form_data.education.country ? false : true"
              >
              </AutoComplete>
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.state.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <label class="form-label-bg-w"> City</label>
              <AutoComplete
                v-model="selectedCity"
                :suggestions="getter_cities"
                @complete="fetchFilteredCities($event)"
                @item-select="citySelectedByUser"
                @item-unselect="cityUnSelectedByUser"
                @clear="cityUnSelectedByUser"
                :dropdown="true"
                field="_source.city"
                forceSelection
                placeholder=""
                class="p-2 form-control text-gray-900 w-full"
                :disabled="form_data.education.state ? false : true"
              >
              </AutoComplete>
              <div
                class="invalid-feedback"
                v-for="error of v$.form_data.education.city.$errors"
                :key="error.$uid"
              >
                <span>{{ error.$message }}</span>
              </div>
            </div>
          </div>
        </div> -->
        <!-- profession -->
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-1">
            <label class="form-label-bg-w"
              >Profession (In which profession did you work?)</label
            >
            <MultiSelect
              v-model="form_data.profession_cat_withObject"
              :options="professioalData"
              optionLabel="display_string"
              placeholder=""
              :selectionLimit="2"
              display="chip"
              :filter="true"
              dropdown
              class="w-full bg-white text-gray-700 focus:outline-none form-control primevue-multiselect-dropdown"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.profession_cat_withObject.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <!-- sector -->
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-1">
            <label class="form-label-bg-w"
              >Sector (In which sector did you work?)</label
            >
            <MultiSelect
              v-model="form_data.sectors_withObj"
              :options="sectorData"
              optionLabel="display_string"
              placeholder=""
              display="chip"
              :selectionLimit="6"
              :filter="true"
              class="w-full bg-white text-gray-700 focus:outline-none form-control primevue-multiselect-dropdown"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.sectors_withObj.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <!-- software changes commented -->
        <!-- <div class="mb-5">
          <label class="ml-2 text-gray-300">Softwares (Which Software did you use to perform your role?)</label>
        </div>
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-10 gap-2">
            <div class="flex flex-col col-span-6">
              <label class="form-label mb-1"> Software </label>
              <AutoComplete v-model="software" :suggestions="filteredSoftwares" @complete="selectedSoftware($event)"
                field="_source.name" placeholder=""
                class="bg-white text-gray-700 focus:outline-none rounded-lg form-control" />
              <div class="invalid-feedback" v-if="isCheckAddSoftwareValidation && software == ''">
                Software value required
              </div>
              <div class="invalid-feedback mt-4" v-if="v$.$dirty" v-for="error of v$.form_data.education.software_proficiencies
                .$errors" :key="error.$uid">
                <span>{{ error.$message }}</span>
              </div>
            </div>
            <div class="flex flex-col col-span-2">
              <label class="form-label float-left pb-1.5"> Rating(10) </label>
              <Dropdown v-model="star" :options="ratings" optionLabel="star" optionValue="code" placeholder=""
                class="w-full bg-white text-gray-700 form-control focus:outline-none rounded-lg mt-0" />
              <div class="invalid-feedback" v-if="isCheckAddSoftwareValidation && star == ''">
                Rating value required
              </div>
            </div>
            <div class="flex flex-col col-span-2">
              <label class="form-label float-left pb-1.5 invisible">
                add
              </label>
              <button class="btn btn-controls hover-experience hover-effect mb-[0.625rem] btn-inputeControlHeight w-full"
                @click="addSoftware" type="submit">
                Add+
              </button>
              <div class="invalid-feedback invisible" v-if="isCheckAddSoftwareValidation && star == ''">
                Value required
              </div>
            </div>
          </div>
        </div>

        <div class="invalid-feedback mt-2" v-if="isCheckAddSoftwareValidation && isAlreadyAdded">
          Software is already added
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-2">
          <div class="w-full flex-1 lg:col-span-2 inline-flex items-center"
            v-for="(data, index) in form_data.education.software_proficiencies" :key="index">
            <div class="grid grid-cols-5 gap-2">
              <div class="col-span-3">
                <input type="software" :value="data.software"
                  class="p-2 bg-white text-gray-700 form-control focus:outline-none rounded-lg" readonly />
              </div>
              <div class="">
                <input type="text" :value="data.stars"
                  class="text-center bg-white form-control text-gray-700 focus:outline-none rounded-md" readonly />
              </div>
              <div class="">
                <button @click="deleteSoftware(index)" class="mt-1 hover-experience hover-effect h-11 w-11 btn p-2.5">
                  <img src="../../assets/img/Trash.svg" alt="Trash" class="mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div> -->
        <!-- Responsibility changes commneted -->
        <!-- <div v-if="form_data.education.id">
          <div class="flex flex-col mt-4">
            <div class="flex flex-rows-2">
              <div class="flex flex-col md:w-5/6">
                <div>
                  <label class="form-label float-left"> Responsibility </label>
                </div>
                <label class="mt-1 float-left font-size-13 error-color ml-2.5">Min 3 Fields required to build your
                  CV</label>
              </div>
              <div class="flex flex-col py-2">
                <button class="btn btn-controls hover-experience hover-effect" @click="addResponsibility" type="submit">
                  Add+
                </button>
              </div>
            </div>
          </div>

          <div class="grid-cols-2">
            <div class="flex" v-for="(data, index) in responsibility.responsibilities" :key="index">
              <div class="flex flex-col py-2 p space-y-4 md:w-2/3">
                <Textarea placeholder="Max 160 Characters" v-model="responsibility.responsibilities[index]" rows="3"
                  maxlength="160" />
              </div>
              <div class="flex flex-col py-2 space-y-4 md:w-1/6">
                <div class="ml-2 bottom-0">
                  <button @click="deleteResp(index)" class="hover-experience hover-effect h-11 w-11 btn p-2.5">
                    <img src="../../assets/img/Trash.svg" alt="Trash" class="mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- buttons section-->
        <div class="flex items-end justify-end space-x-3 mt-8">
          <div>
            <button
              v-if="isBackVisible"
              class="btn btn-controls mr-4"
              type="submit"
              @click="backClick"
            >
              Cancel
            </button>
            <button
              v-if="form_data.education.id"
              class="btn btn-controls"
              @click="updateEducation"
              type="submit"
            >
              Update
            </button>
            <button
              v-if="form_data.education.id"
              class="btn btn-controls ml-4"
              @click="deleteRecord()"
              type="submit"
            >
              Delete
            </button>
            <button
              v-if="!form_data.education.id"
              class="btn btn-controls"
              @click="saveEducation"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- education list -->
    <div class="py-1 m-auto w-full mt-1" v-if="editMode == false">
      <div
        class="bg-[#121415] rounded-[2rem] lg:px-[4rem] md:px-[3rem] sm:px-[2rem] px-[1rem] pt-[1.875rem] pb-[1rem] div-border"
        v-if="educationalDetails.length"
      >
        <!--Add button -->
        <div class="mb-[2rem]">
          <div class="flex justify-end space-x-3 ml-auto">
            <div class="text-sm text-grey-dark">
              <button
                v-if="editMode == false"
                class="btn btn-controls"
                @click="backToBuildcv"
                type="add"
              >
                Back
              </button>
            </div>
            <div class="text-sm text-grey-dark">
              <button
                v-if="editMode == false"
                class="btn btn-controls"
                @click="addEduction"
                type="add"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <!-- {{educationalDetails[0]}}ss -->
        <div
          class="bg-white w-full rounded-md overflow-hidden relative shadow-md mb-4"
          v-for="(detail, index) in educationalDetails"
          :key="index"
        >
          <div class="flex flex-wrap mb-1 mb-3 p-2 pl-4">
            <!-- organisation_name -->
            <div class="w-full mb-1.5" v-if="detail.organization">
              <div class="font-size-20 app-text-color-secondary capitalize">
                {{ detail.organization.name }}
              </div>
              <div
                v-if="
                  detail.software_proficiencies.length > 0 &&
                  detail.profession_cat.length > 0 &&
                  detail.sectors.length > 0 &&
                  detail.responsibilities.length >= 3
                "
                class="absolute right-0 top-0 mr-4 mt-2"
              >
                <span
                  class="font-size-20 text-xs top-1 app-text-color-secondary text-green-600"
                ></span>
              </div>

              <div v-else class="absolute right-0 top-0 mr-4 mt-2">
                <span
                  class="font-size-20 text-xs top-1 app-text-color-secondary text-red-600"
                  >Incomplete</span
                >
              </div>
            </div>

            <!-- designation -->
            <div class="w-full mb-1.5" v-if="detail.designation">
              <div class="font-size-18 app-text-color-secondary">
                {{ detail.designation }}
              </div>
            </div>

            <!-- date -->
            <div class="w-full pb-5">
              <p class="card-title font-size-16">
                {{ detail.address }}
              </p>
              <p class="card-title font-size-16 mb-1">
                {{ formatDate(detail.start_date) }} to
                {{ formatDateEndDate(detail.end_date) }}
              </p>
            </div>

            <!-- profession -->
            <!-- <div class="w-full">
              <p class="card-title font-size-14">Profession</p>
              <div class="w-full pb-5" v-if="detail.profession_cat.length > 0">
                <span class="app-text-color-secondary font-size-16">
                  {{ getProfessionValues(detail.profession_cat) }}
                </span>
              </div>
              <div class="w-full pb-5" v-else>
                <span class="app-text-color-secondary font-size-14">
                  Please add professions used with this experience
                </span>
              </div>
            </div> -->

            <!-- sector -->
            <!-- <div class="w-full">
              <p class="card-title font-size-14">Sector</p>
              <div class="w-full pb-5" v-if="detail.sectors.length > 0">
                <span class="app-text-color-secondary font-size-16">
                  {{ getSectorsValues(detail.sectors) }}
                </span>
              </div>
              <div class="w-full pb-5" v-else>
                <span class="app-text-color-secondary font-size-14">
                  Please add sectors used with this experience
                </span>
              </div>
            </div> -->
            <!-- Software Proficiency -->

            <!-- <div class="w-full">
              <p class="card-title font-size-14">Software Proficiency</p>
              <div
                class="w-full pb-3"
                v-if="detail.software_proficiencies.length > 0"
              >
                <span class="app-text-color-secondary font-size-16"
                  >{{ getSoftWareValues(detail.software_proficiencies) }}
                </span>
              </div>
              <div class="w-full pb-5" v-else>
                <span class="app-text-color-secondary font-size-14">
                  Please add softwares used with this experience
                </span>
              </div>
            </div> -->
            <!-- buttons -->
            <div class="w-full mt-3 relative">
              <button
                class="left-0 h-11 w-11 btn p-2.5"
                @click="editRecord(detail)"
              >
                <!-- <p class=""> -->
                <img
                  src="../../assets/img/Edit_new.svg"
                  class="mx-auto"
                  alt="Edit"
                />
                <!-- </p> -->
              </button>
              <button
                @click="deleteRecord(detail)"
                class="absolute right-0 mr-2 h-11 w-11 btn p-2.5"
              >
                <img
                  src="../../assets/img/Trash.svg"
                  alt="Trash"
                  class="mx-auto"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    class="capitalize"
    :showHeader="false"
    v-model:visible="popup.display"
    :style="dialogWidth"
    :modal="true"
  >
    <div class="form-bg-w p-6">
      <p class="m-0">{{ popup.message }}</p>
      <div class="flex justify-end space-x-4 mt-4">
        <button @click="popup.display = false" class="btn w-24">Close</button>
      </div>
    </div>
  </Dialog>
  <Dialog :showHeader="false" v-model:visible="showDeleteConfirmationMessage">
    <div class="p-6 form-bg-w">
      <div>
        <span>Are you sure you want to delete this experience?</span>
      </div>
      <div class="flex justify-end mt-10 space-x-4">
        <button class="btn w-24 px-4" @click="closeConfirmationMessage()">
          No
        </button>
        <button class="btn w-24 px-4" @click="deleteEducation()">Yes</button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import appConstants from "../../appConstants.js";
import Calendar from "primevue/calendar";
import AutoComplete from "primevue/autocomplete";
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
import ConfirmDialog from "primevue/confirmdialog";
import { withoutChangeTimeZoneFormatDate } from "../../common/js/dateFormater.js";
import CountryStateCityVue from "../common/CountryStateCity.vue";

import {
  helpers,
  required,
  maxLength,
  minLength,
  requiredIf,
} from "@vuelidate/validators";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";

export default {
  name: "Experience",
  props: ["data"],
  emits: ["close"],
  components: {
    Calendar,
    MultiSelect,
    AutoComplete,
    Dropdown,
    Textarea,
    ConfirmDialog,
    Checkbox,
    Dialog,
    CountryStateCityVue,
  },

  setup() {
    return { v$: useVuelidate({ $autoDirty: false }) };
  },

  beforeMount() {
    // if (!this.educationalDetails.length) {
    //   this.editMode = true;
    // } else {
    //   this.editMode = false;
    // }
    // this.getDropdownData()
  },
  computed: {
    ...mapGetters("org", ["getter_searchResult"]),

    ...mapGetters("dropdown", [
      "getter_sector",
      "getter_profession",
      "getter_software",
      "getter_searchLocation",
      "getter_jobDesignation",
      "getter_countries",
      "getter_cities",
      "getter_states",
    ]),

    ...mapGetters("login", ["getter_user"]),
    ...mapGetters("UserProfile", ["getter_UserProfile", "getter_newOrg"]),
  },
  data() {
    return {
      filteredOrganisations: null,
      filteredSoftwares: null,
      filteredDesignation: null,
      filteredLocation: null,
      organisationObj: null,
      sectorData: null,
      professioalData: null,
      softwareData: null,
      submitted: false,
      editMode: true,
      educationalDetails: [],
      software_details: [],
      selectedDesignation: "",
      star: "",
      software: "",
      ratings: [
        { star: "1", code: "1" },
        { star: "2", code: "2" },
        { star: "3", code: "3" },
        { star: "4", code: "4" },
        { star: "5", code: "5" },
        { star: "6", code: "6" },
        { star: "7", code: "7" },
        { star: "8", code: "8" },
        { star: "9", code: "9" },
        { star: "10", code: "10" },
      ],
      softare_details: [],
      responsibility: {
        responsibilities: [],
      },
      form_data: {
        education: {
          id: "",
          organization: {
            id: "",
            name: "",
          },
          designation: "",
          designation_id: "",
          department: "",
          degree: "",
          year: "",
          start_date: null,
          end_date: "",
          address: "",
          profession_cat: [],
          sectors: [],
          software_proficiencies: [],
          is_edu_detail: false,
          current_org: false,
          country: "",
          city: "",
          state: "",
        },
        selected_city: "",
        designationUpdateData: "",
        profession_cat_withObject: [],
        sectors_withObj: [],
      },
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
      showDeleteConfirmationMessage: false,
      // selectedCityDropdown = "",
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      isCheckAddSoftwareValidation: false,
      isAlreadyAdded: false,
      popup: {
        status: "",
        display: false,
        message: "",
      },
      dialogWidth: {
        width: "auto",
        "min-width": "200px",
      },
      cv_elements: appConstants.CV_ELEMENTS,
      isBackVisible: false,
      isEditEducation: false,
      locationData: {},
    };
  },
  validations() {
    return {
      form_data: {
        education: {
          organization: {
            name: {
              required: helpers.withMessage(
                "Organization name is required",
                required
              ),
            },
          },
          designation: {
            required: helpers.withMessage("Designation is required", required),
          },
          start_date: {
            required: helpers.withMessage("Start Date is required", required),
          },
          end_date: {
            required: helpers.withMessage(
              "End Date is required",
              requiredIf(!this.form_data.education.current_org)
            ),
            // requiredIf: , requiredIf)
          },
          country: {
            required: helpers.withMessage("Country is required", required),
          },
          state: {
            required: helpers.withMessage("State is required", required),
          },
          city: {
            required: helpers.withMessage("City is required", required),
          },

          // software_proficiencies: {
          //   required: helpers.withMessage("Softwares are required", required),
          // },
        },
        profession_cat_withObject: {
          required: helpers.withMessage("Professions are required", required),
        },
        sectors_withObj: {
          required: helpers.withMessage("Sectors are required", required),
        },
      },
    };
  },
  created() {
    // this.action_getEducationDetails(this.getter_user.id).then(() => {
    // let array = this.getter_UserProfile.org_details;
    // this.educationalDetails = array.filter(function (data) {
    //   return data.is_edu_detail == true;
    // });
    // if (this.educationalDetails.length > 0) {
    //   this.editMode = false;
    // }
    // });

    if (this.$route.query.isFromSignUp) {
      let slug = this.getter_user.slug;
      this.action_getUserProfileNew(slug);
      this.isBackVisible = false;
    } else {
      this.isBackVisible = true;
    }

    if (this.data) {
      this.isEditEducation = true;
      let id = this.data;
      let dataToEditRecord = this.fetchExperienceRecordFromStore(id);

      if (dataToEditRecord == "") {
        this.addEduction();
      } else {
        this.editRecord(dataToEditRecord);
      }
    }
    // this.selectedDesignationList();
    this.getDropdownData();
    this.setDropdowns();
  },
  methods: {
    // ...mapGetters("dropdown", ["getter_jobDesignation"]),
    ...mapActions("org", [
      // "action_getEducationDetails",
      "action_searchResult",
      // "action_searchLocation",
      // "action_saveNewOrg",
      // "action_saveExpDetails",
      "action_updateDetails",
    ]),
    ...mapActions("dropdown", [
      "action_getSectorDetails",
      "action_getProfessionDetails",
      "action_getSoftwareDetails",
      "action_searchLocation",
      "action_getJobDesignationDetails",
      "action_fetchFilteredCountries",
      "action_getStates",
      "action_getCities",
    ]),

    ...mapActions("UserProfile", [
      "action_saveNewOrg",
      "action_saveExperienceDetails",
      "action_updateExperienceDetails",
      "action_deleteOrg",
      "action_getUserProfileNew",
      "action_SaveUserProfileData",
    ]),
    getEducationdataFromStore() {
      this.getUpdatedDataFromStore();

      if (this.educationalDetails.length > 0) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
    },
    getUpdatedDataFromStore() {
      let array = this.getter_UserProfile.org_details;
      this.educationalDetails = array.filter(function (data) {
        return data.is_edu_detail == false;
      });
      if (this.educationalDetails.length > 0) {
        this.educationalDetails.sort((a, b) =>
          new Date(a.start_date) > new Date(b.start_date)
            ? -1
            : new Date(b.start_date) > new Date(a.start_date)
            ? 1
            : 0
        );
      }
    },
    backClick() {
      // if (this.educationalDetails.length > 0) {
      //   if (this.editMode == true) {
      //     this.editMode = false;
      //     this.scrollToTop();
      //     this.star = "";
      //     this.software = "";
      //     this.isAlreadyAdded = false;
      //   }
      // } else {
      //   this.backToBuildcv();
      // }
      this.backToBuildcv();
    },
    backToBuildcv() {
      let userSlug = this.getter_user.slug;
      if (this.$route.query.isFromSignUp) {
        this.$router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userSlug },
        });
      } else {
        this.$emit("close", false);
      }

      // let userSlug = this.getter_user.slug;
      // this.$router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: userSlug, section: this.cv_elements.EXPERIENCE },
      // });
      // window.scrollTo(0, screen.height / 2);
    },
    updateEducation() {
      // debugger;
      // this.isCheckAddSoftwareValidation = false;
      // this.isAlreadyAdded = false;
      if (this.$refs.country_state_city) {
        let data = this.$refs.country_state_city.location;
        this.form_data.education.address = data.address;
        this.form_data.education.country = data.country;
        this.form_data.education.state = data.state;
        this.form_data.education.city = data.city;
        this.form_data.education.country_code = data.country_code;
        this.form_data.education.country_iso = data.country_iso;
        this.form_data.education.state_iso = data.state_iso;
      }
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      }

      if (this.form_data.education.organization.id) {
        this.setDropdowns();
        this.setFormData();
        this.getResponsibilityToSave();

        let details = {
          data: JSON.parse(JSON.stringify(this.form_data.education)),
          id: this.getter_user.id,
          responsibility: this.responsibility,
        };

        details.data.start_date = withoutChangeTimeZoneFormatDate(
          details.data.start_date
        );
        if (details.data.end_date != "") {
          details.data.end_date = withoutChangeTimeZoneFormatDate(
            details.data.end_date
          );
        }
        this.action_updateExperienceDetails(details).then((response) => {
          this.backToBuildcv();
          this.$toast.add({
            severity: appConstants.toast_severity.SUCCESS,
            summary: appConstants.toast_summary.SUCCESS,
            detail: response.message,
            life: 3000,
          });
          // this.editMode = false;
          // this.resetForm();
          // this.getEducationdataFromStore();
        });
      } else {
        this.setDropdowns();
        this.organisationObj = {
          verified: false,
          city: this.form_data.selected_city,
          listed: false,
          address: this.form_data.education.address,
          name: this.form_data.education.organization.name,
        };
        console.log("organisationObj", organisationObj);
        this.action_saveNewOrg(this.organisationObj).then(() => {
          this.form_data.education.organization.id = this.getter_newOrg.id;
          this.getResponsibilityToSave();

          let details = {
            data: JSON.parse(JSON.stringify(this.form_data.education)),
            id: this.getter_user.id,
            responsibility: this.responsibility,
          };

          details.data.start_date = withoutChangeTimeZoneFormatDate(
            details.data.start_date
          );
          if (details.data.end_date != "") {
            details.data.end_date = withoutChangeTimeZoneFormatDate(
              details.data.end_date
            );
          }

          this.action_updateExperienceDetails(details).then((response) => {
            //console.log("response", response);
            this.backToBuildcv();
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.editMode = false;
            // this.resetForm();
            // this.getEducationdataFromStore();
          });
        });
      }
    },
    getResponsibilityToSave() {
      if (this.responsibility.responsibilities.length > 0) {
        const results = this.responsibility.responsibilities.filter(
          (element) => {
            return element.trim() !== "";
          }
        );
        this.responsibility.responsibilities = results;
      } else {
        this.responsibility.responsibilities = [];
      }
    },
    addResponsibility() {
      this.responsibility.responsibilities.push("");
    },
    deleteResp(index) {
      this.responsibility.responsibilities.splice(index, 1);
    },
    deleteSoftware(index) {
      this.form_data.education.software_proficiencies.splice(index, 1);
    },
    addSoftware() {
      if (this.software == "" || this.star == "") {
        this.isCheckAddSoftwareValidation = true;
        return;
      } else {
        this.isCheckAddSoftwareValidation = false;
      }
      if (this.form_data.education.software_proficiencies == null) {
        this.form_data.education.software_proficiencies = [];
      }
      if (this.software._source == undefined) {
        this.popup.status = "information";
        this.popup.display = true;
        this.popup.message = "Please select software from dropdown list";
        this.software = "";
        return;
      }

      if (this.form_data.education.software_proficiencies.length >= 6) {
        this.popup.status = "information";
        this.popup.display = true;
        this.popup.message = "Max 6 softwares are allowed.";
        this.software = "";
        this.star = "";
        return;
      }

      let obj = {
        id: this.software._source.id,
        software: this.software._source.name,
        stars: this.star,
      };
      let alreadyAdded = false;
      this.form_data.education.software_proficiencies.map((res) => {
        let selected = res;
        if (res.software == obj.software) {
          alreadyAdded = true;
          this.isAlreadyAdded = true;
        }
      });

      if (!alreadyAdded) {
        this.form_data.education.software_proficiencies.push(obj);
        this.software = "";
        this.star = "";
        this.isAlreadyAdded = false;
        this.isCheckAddSoftwareValidation = false;
      } else {
        // this.isAlreadyAdded = true
        // this.isCheckAddSoftwareValidation = true
        this.popup.status = "information";
        this.popup.display = true;
        this.popup.message = "Software is already added in list";
      }
    },
    getDropdownData() {
      this.action_getSectorDetails().then(() => {
        this.sectorData = this.getter_sector;
      });
      this.action_getProfessionDetails().then(() => {
        this.professioalData = this.getter_profession;
      });
      this.action_getJobDesignationDetails().then(() => {
        this.jobData = this.getter_sector;
      });
    },
    selectedDesignationList(event) {
      this.action_getJobDesignationDetails(event.query).then(() => {
        this.filteredDesignation = this.getter_jobDesignation;
      });
    },
    afterSelectionSetValue(selecteddes) {
      if (selecteddes) {
        this.form_data.education.designation = selecteddes.value.designation;
        this.form_data.education.designation_id = selecteddes.value.id;
        console.log("selected designation", selecteddes);
      }
    },
    addEduction() {
      this.resetForm();
      this.edtMode = true;
    },
    setFormData() {
      // let orgObj = {
      //   id: this.form_data.education.organization.id,
      //   name: this.form_data.education.organization.name,
      // };
      // let addressObj =
      //   this.form_data.education.address._source.name +
      //   ", " +
      //   this.form_data.education.address._source.state.name +
      //   ", " +
      //   this.form_data.education.address._source.country.name;
      // this.form_data.education.organization = orgObj;
      // this.form_data.education.address = addressObj;
    },
    setDropdowns() {
      if (
        this.form_data.profession_cat_withObject == null ||
        this.form_data.profession_cat_withObject.length == 0
      ) {
        this.form_data.education.profession_cat = [];
      } else {
        this.form_data.education.profession_cat =
          this.form_data.profession_cat_withObject.map(function (element) {
            return element.id;
          });
      }

      if (
        this.form_data.sectors_withObj == null ||
        this.form_data.sectors_withObj.length == 0
      ) {
        this.form_data.education.sectors = [];
      } else {
        this.form_data.education.sectors = this.form_data.sectors_withObj.map(
          function (element) {
            return element.id;
          }
        );
      }
      // if (this.selectedDesignation == null || this.selectedDesignation == 0) {
      //   this.selectedDesignation.designation = "";
      //   this.selectedDesignation.designation_id = "";
      // }
      // if (this.selectedDesignation == "") {
      //   this.selectedDesignation.designation =
      //     this.form_data.education.designation;
      //   this.selectedDesignation.designation_id = "";
      // } else {
      //   this.selectedDesignation.designation =
      //     this.form_data.education.designation;
      //   this.selectedDesignation.designation_id =
      //     this.form_data.education.designation_id;
      // }
    },
    async saveEducation() {
      this.isCheckAddSoftwareValidation = false;
      this.isAlreadyAdded = false;
      if (this.$refs.country_state_city) {
        let data = this.$refs.country_state_city.location;
        this.form_data.education.address = data.address;
        this.form_data.education.country = data.country;
        this.form_data.education.state = data.state;
        this.form_data.education.city = data.city;
        this.form_data.education.country_code = data.country_code;
        this.form_data.education.country_iso = data.country_iso;
        this.form_data.education.state_iso = data.state_iso;
      }
      this.v$.$touch();
      if (this.v$.$invalid) {
        return false;
      }
      if (this.form_data.education.organization.id) {
        this.setDropdowns();
        this.setFormData();
        let data = {
          data: JSON.parse(JSON.stringify(this.form_data.education)),
          id: this.getter_user.id,
          responsibility: this.responsibility,
        };

        data.data.start_date = withoutChangeTimeZoneFormatDate(
          data.data.start_date
        );
        if (data.data.end_date != "") {
          data.data.end_date = withoutChangeTimeZoneFormatDate(
            data.data.end_date
          );
        }
        if (this.$route.query.isFromSignUp) {
          let data = {
            city: this.form_data.education.city,
            country: this.form_data.education.country,
            country_iso: this.form_data.education.country_iso,
            state: this.form_data.education.state,
            state_iso: this.form_data.education.state_iso,
          };
          this.action_SaveUserProfileData(data);
        }

        this.action_saveExperienceDetails(data).then((response) => {
          this.form_data.education.id = response.id;
          this.$toast.add({
            severity: appConstants.toast_severity.SUCCESS,
            summary: appConstants.toast_summary.SUCCESS,
            detail: response.message,
            life: 3000,
          });
          // this.editMode = false;
          // this.resetForm();
          // this.getEducationdataFromStore();
          // this.getUpdatedDataFromStore();
          this.backToBuildcv();
        });
      } else {
        this.setDropdowns();
        this.organisationObj = {
          verified: false,
          city: this.form_data.selected_city,
          listed: false,
          address: this.form_data.education.address,
          name: this.form_data.education.organization.name,
        };
        await this.action_saveNewOrg(this.organisationObj).then(() => {
          this.form_data.education.organization.id = this.getter_newOrg.id;

          let data = {
            data: JSON.parse(JSON.stringify(this.form_data.education)),
            id: this.getter_user.id,
            responsibility: this.responsibility,
          };

          data.data.start_date = withoutChangeTimeZoneFormatDate(
            data.data.start_date
          );
          if (data.data.end_date != "") {
            data.data.end_date = withoutChangeTimeZoneFormatDate(
              data.data.end_date
            );
          }
          if (this.$route.query.isFromSignUp) {
            let data = {
              city: this.form_data.education.city,
              country: this.form_data.education.country,
              country_iso: this.form_data.education.country_iso,
              state: this.form_data.education.state,
              state_iso: this.form_data.education.state_iso,
            };
            this.action_SaveUserProfileData(data);
          }

          this.action_saveExperienceDetails(data).then((response) => {
            this.form_data.education.id = response.id;
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.editMode = false;
            // this.resetForm();
            // this.getEducationdataFromStore();
            // this.getUpdatedDataFromStore();
            this.backToBuildcv();
          });
        });
      }
    },
    resetForm() {
      // this.v$.$reset();
      let form = {
        education: {
          id: "",
          organization: {
            id: "",
            name: "",
          },
          designation: "",
          designation_id: "",
          degree: "",
          department: "",
          year: "",
          start_date: "",
          end_date: "",
          address: "",
          profession_cat: [],
          sectors: [],
          software_proficiencies: [],
          is_edu_detail: false,
          current_org: false,
          country: "",
          state: "",
          city: "",
        },
      };
      this.form_data = form;
      this.organisationObj = null;

      this.star = "";
      this.software = "";
      this.isAlreadyAdded = false;
      this.isCheckAddSoftwareValidation = false;
      this.responsibility.responsibilities = [];

      this.scrollToTop();
    },
    fetchExperienceRecordFromStore(id) {
      let dataToEdit = "";

      for (let i = 0; i < this.getter_UserProfile.org_details.length; i++) {
        if (this.getter_UserProfile.org_details[i].id == id) {
          if (this.getter_UserProfile.org_details[i].is_edu_detail == false) {
            dataToEdit = JSON.parse(
              JSON.stringify(this.getter_UserProfile.org_details[i])
            );
          }
        }
      }
      return dataToEdit;
    },

    editRecord(data) {
      this.resetForm();
      let dataToEdit = JSON.parse(JSON.stringify(data));
      this.form_data.education = dataToEdit;

      this.locationData = {
        country: this.form_data.education.country,
        state: this.form_data.education.state,
        city: this.form_data.education.city,
        country_iso: this.form_data.education.country_iso,
        state_iso: this.form_data.education.state_iso,
        country_code: this.form_data.education.country_code,
      };
      console.log("data to form =>", this.locationData);
      this.form_data.education.start_date = new Date(
        this.form_data.education.start_date
      );

      if (this.form_data.education.start_date != "") {
        this.form_data.education.start_date = new Date(
          this.form_data.education.start_date
        );
      }

      if (this.form_data.education.end_date != "") {
        this.form_data.education.end_date = new Date(
          this.form_data.education.end_date
        );
      }

      this.responsibility.responsibilities = dataToEdit.responsibilities;
      this.getDropdowns();
      this.editMode = true;
    },

    getDropdowns() {
      if (this.form_data.education.sectors) {
        this.form_data.sectors_withObj = [];
        let sectorArray = this.form_data.education.sectors;
        sectorArray.map((res) => {
          let selected = res;
          this.getter_sector.filter((options) => {
            if (options.id == selected) {
              this.form_data.sectors_withObj.push(options);
              return;
            }
          });
        });
      }
      if (this.form_data.education.profession_cat) {
        this.form_data.profession_cat_withObject = [];
        let professionArray = this.form_data.education.profession_cat;
        professionArray.map((res) => {
          let selected = res;
          this.getter_profession.filter((options) => {
            if (options.id == selected) {
              this.form_data.profession_cat_withObject.push(options);
              return;
            }
          });
        });
      }

      if (this.form_data.education.designation) {
        this.form_data.education.designationUpdateData =
          this.form_data.education.designation;
        this.form_data.education.designation_id = "";
      }
    },
    deleteRecord() {
      this.showDeleteConfirmationMessage = true;
    },
    closeConfirmationMessage() {
      this.showDeleteConfirmationMessage = false;
    },
    deleteEducation() {
      // this.$confirm.require({
      //       message: "Are you sure you want to delete this experience?",
      //       header: { class: ["hidden"] },
      //       icon: "pi pi-info-circle",
      //       acceptClass: "p-button-danger",
      //       accept: () => {
      //Delete record
      let expId = this.data;
      let dataToDelete = {
        user_id: this.getter_user.id,
        org_id: expId,
      };
      this.action_deleteOrg(dataToDelete).then(() => {
        this.backToBuildcv();
        this.resetForm();
        this.getEducationdataFromStore();
      });
      //   },
      //   reject: () => {},
      // });
    },
    formatDate(date) {
      if (date == "") {
        return "";
      }
      let date_obj = new Date(date);
      return moment(date_obj).format("MMM YYYY");
    },
    formatDateEndDate(date) {
      if (date == "") {
        return "Present";
      }
      let date_obj = new Date(date);
      return moment(date_obj).format("MMM YYYY");
    },
    // search function
    async selectedOrg(event) {
      this.action_searchResult(event.query).then(() => {
        this.filteredOrganisations = this.getter_searchResult;
      });
    },
    orgSelectedByUser(selectedOrg) {
      let selectedOrgData = {
        id: selectedOrg.value._id,
        name: selectedOrg.value._source.name,
      };
      this.form_data.education.organization = selectedOrgData;
    },
    orgUnSelectedByUser(val) {
      let selectedOrgData = {
        id: "",
        name: "",
      };
      this.form_data.education.organization = selectedOrgData;
    },
    locationSelectedByUser(selectedLocation) {
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;
      this.form_data.education.address = addressObj;
      this.form_data.selected_city = selectedLocation.value._source.name;
      // this.$refs.locationDropdown.blur()
    },
    locationUnSelectedByUser(val) {
      this.form_data.education.address = "";
      this.form_data.selected_city = "";
    },

    selectedSoftware(event) {
      this.action_getSoftwareDetails(event.query).then(() => {
        // this.softwareData = this.getter_software;
        this.filteredSoftwares = this.getter_software;
      });
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
    async fetchFilteredCountries(event) {
      this.action_fetchFilteredCountries(event.query);
    },
    countrySelectedByUser(country) {
      this.form_data.education.country = country.value._source.name;
    },
    countryUnSelectedByUser(val) {
      this.form_data.education.country = "";
    },
    async fetchFilteredStates(event) {
      let obj = {
        state: event.query,
        countryiso: this.selectedCountry._source.iso2,
      };
      this.action_getStates(obj);
    },
    stateSelectedByUser(state) {
      this.form_data.education.state = state.value._source.state;
    },
    stateUnSelectedByUser(val) {
      this.form_data.education.state = "";
    },
    async fetchFilteredCities(event) {
      let obj = {
        city: event.query,
        stateiso: this.selectedState._source.state_iso,
        countryiso: this.selectedCountry._source.iso2,
      };
      this.action_getCities(obj);
    },

    citySelectedByUser(city) {
      this.form_data.education.city = city.value._source.city;
      this.form_data.education.address =
        city.value._source.city +
        "," +
        this.form_data.education.state +
        "," +
        this.form_data.education.country;
    },
    cityUnSelectedByUser(val) {
      this.form_data.education.city = "";
    },
    checkData(response, event) {
      if (response.data.hits.hits.length > 0) {
        this.filteredOrganisations = response.data.hits.hits;
      } else {
        let obj = {
          id: "",
          lat: 0,
          lng: 0,
          verified: false,
          listed: false,
          city: "",
          address: "",
          name: event,
        };
        this.organisationObj = obj;
      }
    },
    getProfessionValues(professionIdList) {
      let professionValues = [];
      professionIdList.map((res) => {
        let selected = res;

        this.getter_profession.map((options) => {
          if (options.id == selected) {
            professionValues.push(options.display_string);
          }
        });
      });

      let strValue = professionValues.join(", ");
      return strValue;
    },
    getSectorsValues(sectorsIDList) {
      let sectorValues = [];
      sectorsIDList.map((res) => {
        let selected = res;

        this.getter_sector.map((options) => {
          if (options.id == selected) {
            sectorValues.push(options.display_string);
          }
        });
      });

      let strValue = sectorValues.join(", ");
      return strValue;
    },
    getSoftWareValues(data) {
      let software = [];
      if (data.length > 0) {
        for (let item of data) {
          software.push(item.software);
        }
      }
      let strValue = software.join(", ");
      return strValue;
    },
    chkMarkAsPresentClick() {
      this.form_data.education.end_date = "";
    },
    startDateSelected(val) {
      this.getEndDateMinDate();
    },
    getEndDateMinDate() {
      if (this.form_data.education.start_date == "") {
        return null;
      } else {
        return this.form_data.education.start_date;
      }
    },
    EndDateSelected(val) {
      this.getEndDateMinDate();
    },
    getStartDateMaxDate() {
      if (this.form_data.education.end_date == "") {
        return null;
      } else {
        return this.form_data.education.end_date;
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
.card-title {
  color: #7c7c7c;
}

.edit-color {
  color: #333;
}

.border-outline {
  color: #707070;
}
</style>
