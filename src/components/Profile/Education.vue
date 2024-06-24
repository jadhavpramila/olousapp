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
      <div class="w-full">
        <div class="flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="flex items-center app-text-color-primary justify-center page-title"
              >Education</span
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
              placeholder="Organisation Name"
              class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.education.organization.name.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Degree -->
          <div class="flex flex-col">
            <label class="form-label-bg-w"> Level</label>
            <Dropdown
              v-model="selectedDegree"
              :options="levelOfStudy"
              @change="selectedFieldOfStudy($event)"
              optionLabel="name"
              class="form-control primevue-dropdown border-0"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.education.degree.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>

            <!-- <AutoComplete v-model="selectedDegree" :suggestions="levelOfStudy" :dropdown="true"
              @complete="fetchLevelOfStudy($event)" field="name" inputId="id" placeholder="" forceSelection
              @item-select="selectedFieldOfStudy($event)" @item-unselect="unselectedFieldOfStudy($event)"
              @clear="unselectedFieldOfStudy($event)"
              class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control" /> -->
            <!-- <label class="form-label"> Degree</label>
            <input type="text" placeholder="" v-model="form_data.education.degree"
              class="py-2 px-5 w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control" />
            <div class="invalid-feedback" v-if="v$.$dirty" v-for="error of v$.form_data.education.degree.$errors"
              :key="error.$uid">
              <span>{{ error.$message }}</span>
            </div> -->
          </div>
          <!-- Department -->
          <div class="flex flex-col">
            <label class="form-label-bg-w"> Field of Study </label>
            <Dropdown
              v-model="selectedDepartment"
              :options="filteredDepartment"
              optionLabel="name"
              dataKey="id"
              class="form-control primevue-dropdown border-0"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.education.department.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Department -->
      <!-- <div class="flex flex-col form-group">
        <div class="flex flex-col">
          <label class="form-label pb-1.5"> Field of Study </label>
          <Dropdown
            v-model="selectedDepartment"
            :options="filteredDepartment"
            optionLabel="name"
            class="form-control primevue-dropdown border-0"
          />
        </div>
        <div
          class="invalid-feedback"
          v-if="v$.$dirty"
          v-for="error of v$.form_data.education.department.$errors"
          :key="error.$uid"
        >
          <span>{{ error.$message }}</span>
        </div>
      </div> -->
      <!-- start date and end date -->
      <div class="flex flex-col form-group">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <!-- start date -->
          <div class="flex flex-col">
            <label class="form-label-bg-w"> Start Date </label>
            <Calendar
              v-model="form_data.education.start_date"
              dateFormat="dd M yy"
              class="pr-2 w-[auto] lg:w-1/1 rounded-lg form-control"
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
            <label class="form-label-bg-w"> End Date (or expected) </label>
            <Calendar
              v-model="form_data.education.end_date"
              dateFormat="dd M yy"
              class="w-[auto] lg:w-1/1 rounded-lg form-control"
              placeholder=""
              @date-select="EndDateSelected"
              :minDate="getEndDateMinDate()"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.form_data.education.end_date.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CountryStateCityVue
          ref="country_state_city"
          :isEdit="isEditEducation"
          :locationData="locationData"
        ></CountryStateCityVue>
      </div>
      <!--<div class="grid grid-cols-3 gap-4">
         <div class="flex flex-col">
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
            v-if="v$.$dirty"
            v-for="error of v$.form_data.education.address.$errors"
            :key="error.$uid"
          >
            <span>{{ error.$message }}</span>
          </div>
        </div> -->
      <!-- <div class="flex flex-col">
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
            v-if="v$.$dirty"
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
            v-if="v$.$dirty"
            v-for="error of v$.form_data.education.city.$errors"
            :key="error.$uid"
          >
            <span>{{ error.$message }}</span>
          </div>
        </div> 
      </div>-->

      <!-- profession -->
      <div class="flex flex-col form-group">
        <div class="flex flex-col">
          <label class="form-label-bg-w">Professions (Optional)</label>
          <MultiSelect
            v-model="form_data.profession_cat_withObject"
            :options="professioalData"
            optionLabel="display_string"
            placeholder=""
            :selectionLimit="2"
            display="chip"
            :filter="true"
            dropdown
            class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control primevue-multiselect-dropdown"
          />
          <!-- <div
              class="invalid-feedback"
              v-if="v$.$dirty"
              v-for="error of v$.form_data.profession_cat_withObject.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div> -->
        </div>
      </div>
      <!-- sector -->
      <div class="flex flex-col form-group">
        <div class="flex flex-col">
          <label class="form-label-bg-w">Sectors (Optional)</label>
          <MultiSelect
            v-model="form_data.sectors_withObj"
            :options="sectorData"
            optionLabel="display_string"
            placeholder=""
            display="chip"
            :selectionLimit="6"
            :filter="true"
            class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control primevue-multiselect-dropdown"
          />
          <!-- <div
              class="invalid-feedback"
              v-if="v$.$dirty"
              v-for="error of v$.form_data.sectors_withObj.$errors"
              :key="error.$uid"
            >
              <span>{{ error.$message }}</span>
            </div> -->
        </div>
      </div>
      <!-- commented software section -->
      <!-- <div class="mb-5">
          <label class="ml-2 text-gray-300 form-label"
            >Softwares (Optional)</label
          >
        </div>
        <div class="flex flex-col form-group">
          <div class="grid grid-cols-10 gap-2">
            <div class="flex flex-col col-span-6">
              <label class="form-label mb-1"> Softwares </label>
              <AutoComplete
                v-model="software"
                :suggestions="filteredSoftwares"
                @complete="selectedSoftware($event)"
                field="_source.name"
                placeholder=""
                class="w-full bg-white text-gray-700 focus:outline-none rounded-lg form-control"
              />
              <div
                class="invalid-feedback"
                v-if="isCheckAddSoftwareValidation && software == ''"
              >
                Software value required
              </div>
              
            </div>
            <div class="flex flex-col col-span-2">
              <label class="form-label float-left pb-1.5"> Rating(10) </label>
              <Dropdown
                v-model="star"
                :options="ratings"
                optionLabel="star"
                optionValue="code"
                placeholder=""
                class="w-full bg-white px-1 py-1 text-gray-700 focus:outline-none rounded-lg mb-2.5"
              />
              <div
                class="invalid-feedback"
                v-if="isCheckAddSoftwareValidation && star == ''"
              >
                Rating value required
              </div>
            </div>
            <div class="flex flex-col col-span-2">
              <label class="form-label float-left pb-1.5 invisible">
                add
              </label>
              <button
                class="btn btn-controls hover-experience hover-effect mb-[0.625rem] btn-inputeControlHeight w-full"
                @click="addSoftware"
                type="submit"
              >
                Add+
              </button>
              <div
                class="invalid-feedback invisible"
                v-if="isCheckAddSoftwareValidation && star == ''"
              >
                Value required
              </div>
            </div>
          </div>
        </div>

        <div
          class="invalid-feedback mt-2"
          v-if="isCheckAddSoftwareValidation && isAlreadyAdded"
        >
          Software is already added
        </div>
        <div class="grid lg:grid-cols-3 grid-cols-1 gap-2">
          <div
            class="w-full flex-1 lg:col-span-2 inline-flex items-center"
            v-for="(data, index) in form_data.education.software_proficiencies"
            :key="index"
          >
            <div class="grid grid-cols-5 gap-2">
              <div class="col-span-3">
                <input
                  type="software"
                  :value="data.software"
                  class="p-2 bg-white text-gray-700 form-control focus:outline-none rounded-lg"
                  readonly
                />
              </div>
              <div class="">
                <input
                  type="text"
                  :value="data.stars"
                  class="text-center p-2 bg-white form-control text-gray-700 focus:outline-none rounded-md"
                  readonly
                />
              </div>
              <div class="">
                <button
                  @click="deleteSoftware(index)"
                  class="mt-1 hover-experience hover-effect h-11 w-11 btn p-2.5"
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
        </div> -->
      <!-- Responsibility -->
      <div v-if="false">
        <div class="flex flex-col mt-4">
          <div class="flex flex-rows-2">
            <div class="flex flex-col md:w-5/6">
              <div>
                <label class="form-label-bg-w float-left">
                  Responsibility
                </label>
              </div>
              <label class="mt-1 float-left font-size-13 error-color ml-2.5"
                >Min 3 Fields required to build your CV</label
              >
            </div>
            <!-- add button -->
            <div class="flex flex-col py-2 space-y-4 md:w-1/6">
              <button
                class="btn btn-white btn-controls ml-2"
                @click="addResponsibility"
                type="submit"
              >
                Add+
              </button>
            </div>
          </div>
        </div>
        <!-- list of resp -->

        <div class="flex flex-col">
          <div
            class="flex flex-rows-2"
            v-for="(data, index) in responsibility.responsibilities"
            :key="index"
          >
            <div class="flex flex-col py-2 p space-y-4 md:w-2/3">
              <Textarea
                v-model="responsibility.responsibilities[index]"
                rows="3"
              />
            </div>
            <div class="flex flex-col py-2 space-y-4 md:w-1/6">
              <button @click="deleteResp(index)" class="ml-2 bottom-0">
                <img src="../../assets/Trash-Icon-White.svg" alt="Trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <!-- {{educationalDetails[0]}} -->
      <div
        class="bg-white w-full rounded-md overflow-hidden relative shadow-md mb-4"
        v-for="(detail, index) in educationalDetails"
        :key="index"
      >
        <div class="flex flex-wrap mb-1 mb-3 p-2 pl-4">
          <!-- Education -->
          <!-- <span class="app-text-color-secondary"> {{detail.software_proficiencies}}</span> -->
          <div class="w-full mb-1.5" v-if="detail.degree">
            <div class="font-size-20 app-text-color-secondary">
              {{ detail.degree }}
            </div>
          </div>

          <!-- organisation_name -->
          <div class="w-full mb-1.5" v-if="detail.organization">
            <div class="font-size-18 app-text-color-secondary">
              {{ detail.organization.name }}
            </div>
          </div>

          <!-- date -->
          <div class="w-full pb-5">
            <div>
              <p class="card-title font-size-16 mb-1">
                {{ formatDate(detail.start_date) }} to
                {{ formatDateEndDate(detail.end_date) }}
              </p>
              <p class="card-title font-size-16">
                {{ detail.address }}
              </p>
            </div>
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
                  Please add professions of your interest
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
                  Please add sectors of your interest
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
                  Which softwares do you know?
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
        <button @click="popup.display = false" class="w-24 btn">Close</button>
      </div>
    </div>
  </Dialog>
  <Dialog :showHeader="false" v-model:visible="showDeleteConfirmationMessage">
    <div class="p-6 form-bg-w">
      <div>
        <span>Are you sure you want to delete this education?</span>
      </div>
      <div class="flex justify-end mt-10 space-x-4">
        <button class="btn w-24 px-4" @click="closeConfirmationMessage()">
          No
        </button>
        <button class="btn w-24 px-4" @click="deleteExperience()">Yes</button>
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
import {
  helpers,
  required,
  maxLength,
  minLength,
  requiredIf,
} from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import { withoutChangeTimeZoneFormatDate } from "../../common/js/dateFormater.js";
import CountryStateCityVue from "../common/CountryStateCity.vue";

export default {
  name: "Education",
  props: ["data"],
  emits: ["close"],
  components: {
    Calendar,
    MultiSelect,
    AutoComplete,
    Dropdown,
    Textarea,
    ConfirmDialog,
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
    ...mapGetters("org", [
      "getter_searchResult",
      // "getter_searchLocation",
      // "getter_newOrg",
      // "getter_saveExpDetails",
      // "getter_SaveResponsibility",
    ]),

    ...mapGetters("dropdown", [
      "getter_sector",
      "getter_profession",
      "getter_software",
      "getter_searchLocation",
      "getter_levelOfStudy",
      "getter_fieldOfStudy",
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
      filteredLocation: null,
      studyOfFields: null,
      organisationObj: null,
      // organisations: null,
      sectorData: null,
      professioalData: null,
      softwareData: null,
      submitted: false,
      editMode: true,
      selectedDegree: {
        name: "",
        id: "",
      },
      selectedDepartment: "",
      educationalDetails: [],
      levelOfStudy: [],
      filteredDepartment: [],
      software_details: [],
      // sectorArray: [],
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
          organization: {
            id: "",
            name: "",
          },
          year: "",
          start_date: null,
          end_date: "",
          address: "",
          profession_cat: [],
          sectors: [],
          software_proficiencies: [],
          is_edu_detail: true,
          current_org: false,
          degree_id: "",
          degree: "",
          department_id: "",
          department: "",
          country: "",
          state: "",
          city: "",
          country_iso: "",
          state_iso: "",
          country_code: "",
        },
        selected_city: "",
        profession_cat_withObject: [],
        sectors_withObj: [],
      },
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
      isEditEducation: false,
      locationData: {},
      isCheckAddSoftwareValidation: false,
      isAlreadyAdded: false,
      popup: {
        status: "",
        display: false,
        message: "",
      },
      dialogWidth: {
        width: "auto",
      },
      cv_elements: appConstants.CV_ELEMENTS,
      isBackVisible: false,
      showDeleteConfirmationMessage: false,
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
          department: {
            required: helpers.withMessage("Department is required", required),
          },
          degree: {
            required: helpers.withMessage("Degree is required", required),
          },
          start_date: {
            required: helpers.withMessage("Start date is required", required),
          },
          end_date: {
            required: helpers.withMessage(
              "End date is required",
              requiredIf(!this.form_data.education.current_org)
            ),
          },
          // address: {
          //   required: helpers.withMessage("Location is required", required),
          // },

          // software_proficiencies: {
          //   required: helpers.withMessage("Softwares are required", required),
          // },
        },
        // profession_cat_withObject: {
        //   required: helpers.withMessage("Professions are required", required),
        // },
        // sectors_withObj: {
        //   required: helpers.withMessage("Sectors are required", required),
        // },
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
      this.isBackVisible = false;
      let slug = this.getter_user.slug;
      this.action_getUserProfileNew(slug);
    } else {
      this.isBackVisible = true;
    }
    if (this.data) {
      this.isEditEducation = true;
      //console.log(this.$route.query.q);
      let id = this.data;
      let dataToEditRecord = this.fetchEducationRecordFromStore(id);
      console;
      if (dataToEditRecord == "") {
        this.addEduction();
      } else {
        this.editRecord(dataToEditRecord);
      }
    }
    this.getDropdownData();
    // this.getEducationdataFromStore();
  },

  methods: {
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
      "action_getLevelOfStudy",
      "action_getFieldOfStudyByLevel",
      "action_fetchFilteredCountries",
      "action_getStates",
      "action_getCities",
    ]),

    ...mapActions("UserProfile", [
      "action_saveNewOrg",
      "action_saveEducationDetails",
      "action_updateEducationDetails",
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
        return data.is_edu_detail == true;
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
      // let userSlug = this.getter_user.slug;
      // this.$router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: userSlug, section: this.cv_elements.EDUCATION },
      // });
      let userSlug = this.getter_user.slug;
      if (this.$route.query.isFromSignUp) {
        this.$router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userSlug },
        });
      } else {
        this.$emit("close", false);
      }
    },
    updateEducation() {
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
        let details = {
          data: JSON.parse(JSON.stringify(this.form_data.education)),
          id: this.getter_user.id,
        };

        details.data.start_date = withoutChangeTimeZoneFormatDate(
          details.data.start_date
        );
        details.data.end_date = withoutChangeTimeZoneFormatDate(
          details.data.end_date
        );

        this.action_updateEducationDetails(details)
          .then((response) => {
            // console.log(response);
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.editMode = false;
            // this.resetForm();
            // this.getEducationdataFromStore();

            this.backToBuildcv();
          })
          .catch((err) => {});
      } else {
        // console.log("address ",this.form_data.education.address);
        // this.setAddress(this.form_data.education.addres);
        this.setDropdowns();
        this.organisationObj = {
          // lat: parseFloat(this.form_data.education.address._source.latitude),
          verified: false,
          city: this.form_data.selected_city,
          listed: false,
          address: this.form_data.education.address,
          name: this.form_data.education.organization.name,
          // lng: parseFloat(this.form_data.education.address._source.longitude),
        };
        this.action_saveNewOrg(this.organisationObj).then(() => {
          this.form_data.education.organization.id = this.getter_newOrg.id;
          // this.form_data.education.address =
          //   this.form_data.education.address._source.name +
          //   ", " +
          //   this.form_data.education.address._source.state.name +
          //   ", " +
          //   this.form_data.education.address._source.country.name;
          // console.log("address =>", this.form_data.education.address);
          let details = {
            data: JSON.parse(JSON.stringify(this.form_data.education)),
            id: this.getter_user.id,
          };

          details.data.start_date = withoutChangeTimeZoneFormatDate(
            details.data.start_date
          );
          details.data.end_date = withoutChangeTimeZoneFormatDate(
            details.data.end_date
          );

          // console.log(details);
          this.action_updateEducationDetails(details).then((response) => {
            // console.log(response);
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.editMode = false;
            // this.resetForm();
            // this.getEducationdataFromStore();
            this.backToBuildcv();
          });
        });
      }
    },
    // setAddress(address) {
    //   var words = address.split(" ");
    //   for (var i = 0; i < words.length - 1; i++) {
    //     words[i] += " ";
    //   }
    //   console.log(words);
    // },
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
      this.action_getLevelOfStudy().then(() => {
        this.levelOfStudy = this.getter_levelOfStudy;
      });
    },

    fetchLevelOfStudy() {
      // if (this.levelOfStudy.length == 0) {
      this.action_getLevelOfStudy().then(() => {
        this.levelOfStudy = this.getter_levelOfStudy;
      });
      // }
    },
    selectedFieldOfStudy(event) {
      //console.log("event", event.value.id);
      let level_id = event.value.id;
      this.action_getFieldOfStudyByLevel(level_id).then(() => {
        this.filteredDepartment = this.getter_fieldOfStudy;
      });
      // this.form_data.selectedDegreeId = event.id
      // this.form_data.selectedDegree = event.name
    },
    unselectedFieldOfStudy(event) {
      // console.log("event", event.value.id);
      // alert("unselected ")
      // this.selectedDegree = {
      //   id: "",
      //   name: ""
      // }
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

      if (this.selectedDegree == null || this.selectedDegree == "") {
        this.form_data.education.degree = "";
        this.form_data.education.degree_id = "";
        this.form_data.education.department = "";
        this.form_data.education.department_id = "";
      } else {
        this.form_data.education.degree = this.selectedDegree.name;
        this.form_data.education.degree_id = this.selectedDegree.id;
        this.form_data.education.department = this.selectedDepartment.name;
        this.form_data.education.department_id = this.selectedDepartment.id;
      }
    },
    setDegreeDeptData() {
      this.form_data.education.degree = this.selectedDegree.name;
      this.form_data.education.degree_id = this.selectedDegree.id;
      this.form_data.education.department = this.selectedDepartment.name;
      this.form_data.education.department_id = this.selectedDepartment.id;
    },
    async saveEducation() {
      this.setDegreeDeptData();
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
        };

        data.data.start_date = withoutChangeTimeZoneFormatDate(
          data.data.start_date
        );
        data.data.end_date = withoutChangeTimeZoneFormatDate(
          data.data.end_date
        );
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
        console.log("data to save education", data);

        this.action_saveEducationDetails(data).then((response) => {
          this.$toast.add({
            severity: appConstants.toast_severity.SUCCESS,
            summary: appConstants.toast_summary.SUCCESS,
            detail: response.message,
            life: 3000,
          });
          // this.editMode = false;
          // this.resetForm();
          // this.getEducationdataFromStore();
          this.backToBuildcv();
        });
      } else {
        this.setDropdowns();
        this.organisationObj = {
          // lat: parseFloat(this.form_data.education.address._source.latitude),
          verified: false,
          city: this.form_data.selected_city,
          listed: false,
          address: this.form_data.education.address,
          name: this.form_data.education.organization.name,
          // lng: parseFloat(this.form_data.education.address._source.longitude),
        };
        await this.action_saveNewOrg(this.organisationObj).then(() => {
          this.form_data.education.organization.id = this.getter_newOrg.id;
          // this.form_data.education.address =
          //   this.form_data.education.address._source.name +
          //   ", " +
          //   this.form_data.education.address._source.state.name +
          //   ", " +
          //   this.form_data.education.address._source.country.name;

          let data = {
            data: JSON.parse(JSON.stringify(this.form_data.education)),
            id: this.getter_user.id,
          };

          data.data.start_date = withoutChangeTimeZoneFormatDate(
            data.data.start_date
          );
          data.data.end_date = withoutChangeTimeZoneFormatDate(
            data.data.end_date
          );
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
          console.log("data to save education", data);
          this.action_saveEducationDetails(data).then((response) => {
            // console.log(response);
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            // this.editMode = false;
            // this.resetForm();
            // this.getEducationdataFromStore();
            this.backToBuildcv();
          });
        });
      }
    },
    resetForm() {
      // this.v$.$reset();
      let form = {
        education: {
          organization: {
            id: "",
            name: "",
          },
          degree: "",
          department: "",
          year: "",
          start_date: "",
          end_date: "",
          address: "",
          profession_cat: [],
          sectors: [],
          software_proficiencies: [],
          is_edu_detail: true,
          current_org: false,
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

    fetchEducationRecordFromStore(id) {
      let dataToEdit = "";

      for (let i = 0; i < this.getter_UserProfile.org_details.length; i++) {
        if (this.getter_UserProfile.org_details[i].id == id) {
          if (this.getter_UserProfile.org_details[i].is_edu_detail) {
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
      if (this.form_data.education.degree) {
        if (this.form_data.education.degree_id == "") {
          let obj = {
            id: "",
            name: this.form_data.education.degree,
          };
          this.selectedDegree = obj;
        } else {
          let obj = {
            id: this.form_data.education.degree_id,
            name: this.form_data.education.degree,
          };
          this.selectedDegree = obj;
        }
        // this.form_data.education.degree = this.form_data.education.degree;
        this.action_getFieldOfStudyByLevel(
          this.form_data.education.degree_id
        ).then(() => {
          this.filteredDepartment = this.getter_fieldOfStudy;
        });
      }
      if (this.form_data.education.department) {
        let obj = {
          id: this.form_data.education.department_id,
          name: this.form_data.education.department,
        };
        this.selectedDepartment = obj;
      }
    },
    deleteRecord() {
      this.showDeleteConfirmationMessage = true;
    },
    closeConfirmationMessage() {
      this.showDeleteConfirmationMessage = false;
    },
    deleteExperience() {
      // this.$confirm.require({
      //   message: "Are you sure you want to delete this education?",
      //   header: "Delete Confirmation",
      //   icon: "pi pi-info-circle",
      //   acceptClass: "p-button-danger",
      //   accept: () => {
      //Delete record
      let eduId = this.data;
      let dataToDelete = {
        user_id: this.getter_user.id,
        org_id: eduId,
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

    // async selectedField(event) {
    //   let data = {
    //     query: event.query,
    //   };
    //   this.action_searchStudyOfFields(data).then(() => {
    //     this.studyOfFields = this.getter_searchStudyOfFields;
    //   });
    // },
    // FieldSelectedByUser() {},
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
