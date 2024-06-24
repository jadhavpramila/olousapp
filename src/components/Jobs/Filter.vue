<template>
  <div class="cls-jobs-filter rounded-[8px]">
    <div
      class="flex justify-between app-bg-color-primary rounded-md items-center py-1 px-3"
    >
      <div class="flex items-center">
        <img :src="getStaticImage('Filter-icon.svg')" alt="Filter" />
        <p class="text-base text-white font-medium ml-1 font-bold leading-7">
          Filter
        </p>
      </div>
      <div class="p-1 rounded-md text-white pulse" v-if="isShowAdvanceFilter()">
        <p class="text-xs cursor-pointer font-bold" @click="clearFilter()">
          Clear All
        </p>
      </div>
    </div>
    <div class="p-3">
      <div v-if="isUserLoggedIn">
        <div class="flex flex-inline space-x-2 items-center justify-start mb-3">
          <input
            type="radio"
            name="jobType"
            id="jobTypeAll"
            class="scale-125"
            v-model="jobTypes"
            :value="jobType.ALL"
            @click="clickFilter(jobType.ALL)"
            checked
          />
          <label
            for="jobTypeAll"
            class="text-sm app-text-color-secondary font-light"
            >All Jobs</label
          >
        </div>
        <div class="flex flex-inline space-x-2 items-center justify-start mb-3">
          <input
            type="radio"
            name="jobType"
            id="jobTypeBookmark"
            class="scale-125"
            v-model="jobTypes"
            :value="jobType.BOOKMARKED"
            @click="clickFilter(jobType.BOOKMARKED)"
          />
          <label
            for="jobTypeBookmark"
            class="font-light text-sm app-text-color-secondary"
            >Saved Jobs</label
          >
        </div>
        <div class="flex flex-inline space-x-2 items-center justify-start mb-3">
          <input
            type="radio"
            name="jobType"
            id="jobTypeApplied"
            v-model="jobTypes"
            class="scale-125"
            :value="jobType.APPLIED"
            @click="clickFilter(jobType.APPLIED)"
          />
          <label
            for="jobTypeApplied"
            class="text-sm app-text-color-secondary font-light"
            >Applied Jobs</label
          >
        </div>
      </div>

      <Transition>
        <div
          class="flex flex-col mt-5 advance-filter"
          v-if="isShowAdvanceFilter()"
        >
          <h1 class="text-[0.906rem] font-bold app-text-color-secondary mb-2">
            Advanced Filters
          </h1>
          <div class="w-full">
            <!-- <AutoComplete
              v-model="location"
              :suggestions="filteredLocation"
              @complete="selectedPlace($event)"
              inputStyle="font-size:0.875rem !important;color: #6c757d !important;"
              style="font-size: 0.875rem !important; color: #6c757d !important"
              field="_source.name"
              forceSelection
              placeholder="Location"
              class="border relative border-[#ced4da] rounded-lg form-control text-black"
              :disabled="disabled"
              @item-select="locationSelectedByUser"
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
            </AutoComplete> -->
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
              placeholder="Select country"
              class="p-2 form-control text-gray-900"
            >
            </AutoComplete>
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
              placeholder="Select city"
              class="p-2 form-control text-gray-900"
              :disabled="selectedCountry ? false : true"
              @click="checkCountrySelected"
            >
              <template #item="slotProps">
                <div class="country-item">
                  <div class="p-ml-2">
                    {{ slotProps.item._source.city }},
                    {{ slotProps.item._source.state }}
                  </div>
                </div>
              </template>
            </AutoComplete>
            <div
              class="absolute lg:w-[16.5rem] md:w-[16.5rem] w-[15rem]"
              v-if="isLocationSelect"
            ></div>
            <!-- <span><img src="" alt=""></span> -->
          </div>

          <!-- <Dropdown
          v-model="location"
          @filter="selectedPlace($event)"
          filterMatchMode="startsWith"
          optionLabel="_source.name"
          :options="filteredLocation"
          :filter="true"
          placeholder="Select a Country"
          :showClear="true"
          class="form-control bg-white text-gray-700 rounded-lg"
        >
          <template #value="slotProps">
            <div class="country-item country-item-value" v-if="slotProps.value">
              <div>{{ setSelectedLocation(slotProps.value) }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="country-item">
              <div>{{ setLocationOptions(slotProps.option) }}</div>
            </div>
          </template>
        </Dropdown> -->
          <!-- <AutoComplete
          :multiple="true"
          v-model="location"
          :suggestions="filteredLocation"
          @complete="selectedPlace($event)"
          class="text-black text-xs"
          @item-select="locationSelectedByUser"
          @item-unselect="locationUnSelectedByUser"
          @clear="locationUnSelectedByUser"
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
          <span class="p-autocomplete-token-icon pi pi-times-circle"></span>
        </AutoComplete>  -->
          <Dropdown
            v-model="profession"
            :options="professionData"
            optionLabel="display_string"
            optionValue="id"
            placeholder="Profession"
            class="bg-white text-gray-700 rounded-lg form-control primevue-dropdown"
            :showClear="true"
            :disabled="disabled"
          ></Dropdown>

          <Dropdown
            v-model="employment"
            :options="employmentTypes"
            optionLabel="employment_type"
            optionValue="id"
            placeholder="Employment Type"
            class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control primevue-dropdown"
            :disabled="disabled"
            :showClear="true"
          ></Dropdown>
          <div class="">
            <h5
              class="lg:text-sm md:text-sm text-xs app-text-color-secondary mb-4 font-extralight"
            >
              Experience in years: (Closest match)
            </h5>
            <div class="flex ml-3 justify-between items-center">
              <Slider
                v-model="experience"
                :step="1"
                :min="0"
                :max="30"
                :modelValue="90"
                :disabled="disabled"
              />

              <span
                class="app-text-color-secondary lg:text-sm md:text-sm text-xs"
                >{{ experience }}</span
              >
            </div>
          </div>

          <div class="flex items-center mt-5">
            <input
              type="checkbox"
              name="workFromHome"
              id="workFromHome"
              class="bg-[#cbcbcb] scale-150"
              v-model="workFromHome"
              :disabled="disabled"
            />
            <label
              for="workFromHome"
              class="font-bold lg:text-sm md:text-sm text-[0.906rem] app-text-color-secondary ml-2.5"
              >Work From Home</label
            >
          </div>
          <div class="flex space-x-3 w-full mt-5 justify-end">
            <button
              class="btn p-1 text-sm lg:w-24 md:w-24"
              @click="applyFilter()"
            >
              Apply
            </button>
            <!-- <button class="btn bg-[#333] p-1 text-white text-sm" @click="clearFilter()">
                  Clear
                </button> -->
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, reactive, watchEffect } from "vue";
import appConstants from "../../appConstants.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import AutoComplete from "primevue/autocomplete";
import Dropdown from "primevue/dropdown";
import Slider from "primevue/slider";

export default {
  name: "Filter",
  components: {
    AutoComplete,
    Dropdown,
    Slider,
  },
  data() {
    return {};
  },
  async setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let isClosingSoon = ref(false);
    let isClosed = ref(false);
    let location = ref();
    let profession = ref();
    let employment = ref();
    let experience = ref(0);
    let workFromHome = ref();
    let isLocationSelect = ref(false);
    let filteredLocation = ref([]);
    let professionData = ref(null);
    let city = ref("");
    let country = ref("");
    let state = ref("");
    let countryIso = ref("");
    const jobType = appConstants.jobType;
    let jobTypes = computed(() => store.getters["jobs/getter_currentJobType"]);
    let disabled = ref(false);
    let checkedAllJob = "checked";
    let selectedCountry = ref("");
    let selectedCity = ref("");
    // let showAdvanceFilter = ref(true);

    let jobData = computed(() => store.getters["jobs/getter_jobListData"]);
    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );

    let searchLocationData = computed(
      () => store.getters["dropdown/getter_searchLocation"]
    );
    let professionDropdownData = computed(
      () => store.getters["dropdown/getter_profession"]
    );
    let jobFilterData = computed(() => store.getters["jobs/getter_filterData"]);

    let isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    let getter_countries = computed(
      () => store.getters["dropdown/getter_countries"]
    );
    let getter_cities = computed(() => store.getters["dropdown/getter_cities"]);
    onBeforeMount(() => {
      // let filterType = route.query.q;
      if (isUserLoggedIn.value) {
        if (route.query.isFromBookMark) {
          jobTypes.value = jobType.BOOKMARKED;
          store.commit("jobs/commit_currentJobType", jobType.BOOKMARKED);
          emit("clickFilter", {
            eventName: jobType.BOOKMARKED,
            filterQuery: "",
          });
        }
      } else {
        jobTypes.value = jobType.ALL;
        store.commit("jobs/commit_currentJobType", jobType.ALL);
        emit("clickFilter", { eventName: jobType.ALL, filterQuery: "" });
      }
    });
    await getEmploymentType();
    await getDropdownData();
    // async function getJobData() {
    //   await store.dispatch("jobs/action_getJobListData").then((res) => {
    //     //console.log("data", jobData.value.jobs[0].expires_at);
    //   });
    // }
    function setCompanyImage(image) {
      let imageUrl = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${image}`;

      return imageUrl;
    }
    async function getEmploymentType() {
      await store.dispatch("dropdown/action_getEmploymentType").then((res) => {
        //console.log("emp types", employmentTypes.value);
      });
    }
    function setEmpoymentType(type) {
      for (let i = 0; i < employmentTypes.value.length; i++) {
        if (employmentTypes.value[i].id == type) {
          return employmentTypes.value[i].employment_type;
        }
        //const element = array[index];
      }
    }

    function isShowAdvanceFilter() {
      if (jobTypes.value == jobType.ALL) {
        return true;
      } else {
        return false;
      }
    }
    function fetchFilteredCountries(event) {
      store.dispatch("dropdown/action_fetchFilteredCountries", event.query);
    }
    function countrySelectedByUser(countryData) {
      // console.log("country data=>", country);
      selectedCountry.value = countryData.value._source.name;
      country.value = countryData.value._source.name;
      countryIso.value = countryData.value._source.iso2;
    }
    function countryUnSelectedByUser(val) {
      selectedCountry.value = "";
      country.value = "";
      city.value = "";
      state.value = "";
      selectedCity.value = "";
    }
    function fetchFilteredCities(event) {
      let obj = {
        city: event.query,
        // stateiso: selectedState.value._source.state_iso,
        countryiso: countryIso.value,
      };
      store.dispatch("dropdown/action_getCities", obj);
    }
    function citySelectedByUser(cityData) {
      selectedCity.value =
        cityData.value._source.city + ", " + cityData.value._source.state;
      city.value = cityData.value._source.city;
      state.value = cityData.value._source.state;
    }
    function cityUnSelectedByUser(val) {
      city.value = "";
      selectedCity.value = "";
      state.value = "";
    }
    // function goToJobDetails(id) {
    //   router.push({
    //     name: appConstants.routes.JOBDETAILS,
    //     params: { job_id: id },
    //   });
    //   //ssrouter.push({ name: appConstants.routes.DEFAULT_SEARCH_PROFILE });
    // }
    // function calculateNoOfDays(expiryDate) {
    //   var currentDate = new Date().toISOString().split(".")[0] + "Z";
    //   const d2 = new Date(currentDate);
    //   //for (let i = 0; i < jobData.value.jobs.length; i++) {
    //   const d1 = new Date(expiryDate);
    //   var Difference_In_Time = d1.getTime() - d2.getTime();
    //   var Difference_In_Days = Math.round(
    //     Difference_In_Time / (24 * 60 * 60 * 1000)
    //   );
    //   return Difference_In_Days;
    // }
    // function setClosingStatus(expiryDate) {
    //   let days = calculateNoOfDays(expiryDate);
    //   //console.log("Difference_In_Days",days);
    //   if (days <= 0) {
    //     return JobsStatus.CLOSED;
    //   } else if (days <= 5) {
    //     return JobsStatus.CLOSINGSOON;
    //   } else {
    //     return JobsStatus.ACTIVE;
    //   }
    //   //}
    // }
    // function setImageForJobStatus(expiryDate) {
    //   let days = calculateNoOfDays(expiryDate);
    //   //console.log("Difference_In_Days",days);
    //   if (days <= 0) {
    //     return "/src/assets/Closed.svg";
    //   } else if (days <= 5) {
    //     return "/src/assets/Closing-Soon.svg";
    //   } else {
    //     return "/src/assets/Active.svg";
    //   }
    // }
    function clickFilter(data) {
      //console.log("data", data);
      if (data == jobType.BOOKMARKED) {
        clearAdvancedFilter();
        disabled.value = true;
        // showAdvanceFilter.value = false;
        store.commit("jobs/commit_currentJobType", jobType.BOOKMARKED);
        emit("clickFilter", { eventName: data, filterQuery: "" });
      } else if (data == jobType.APPLIED) {
        clearAdvancedFilter();
        disabled.value = true;
        // showAdvanceFilter.value = false;
        store.commit("jobs/commit_currentJobType", jobType.APPLIED);
        emit("clickFilter", { eventName: data, filterQuery: "" });
      } else {
        disabled.value = false;
        // showAdvanceFilter.value = true;
        store.commit("jobs/commit_currentJobType", jobType.ALL);
        emit("clickFilter", { eventName: data, filterQuery: "" });
      }
    }
    async function selectedPlace(event) {
      let data = {
        query: event.query,
        countryIso2: "",
      };
      // console.log("event location", event.query);
      await store.dispatch("dropdown/action_searchLocation", data).then(() => {
        filteredLocation.value = searchLocationData.value;
        //console.log(searchLocationData.value);
      });
    }
    function checkCountrySelected() {
      if (country.value == "") {
        isLocationSelect.value = true;
      }
    }
    // function setLocationOptions(selectedLocation) {
    //   let addressObj =
    //     selectedLocation._source.name +
    //     ", " +
    //     selectedLocation._source.state.name +
    //     ", " +
    //     selectedLocation._source.country.name;

    //   // location.value =  addressObj;

    //   return addressObj;
    // }
    // function setSelectedLocation(location) {
    //   // console.log("event location", location);
    //   city.value = location._source.name;
    //   country.value = location._source.country.name;
    //   state.value = location._source.state.name;
    //   let addressObj =
    //     location._source.name +
    //     ", " +
    //     location._source.state.name +
    //     ", " +
    //     location._source.country.name;

    //   return addressObj;
    // }
    function locationSelectedByUser(selectedLocation) {
      city.value = selectedLocation.value._source.name;
      country.value = selectedLocation.value._source.country.name;
      state.value = selectedLocation.value._source.state.name;
      let addressObj =
        selectedLocation.value._source.name +
        ", " +
        selectedLocation.value._source.state.name +
        ", " +
        selectedLocation.value._source.country.name;

      location.value = addressObj;
      isLocationSelect.value = true;
      // console.log("select location", location.value);
    }

    function locationUnSelectedByUser(val) {
      location.value = null;
    }
    async function getDropdownData() {
      await store.dispatch("dropdown/action_getProfessionDetails").then(() => {
        professionData.value = professionDropdownData.value;
        //console.log(professionData.value)
      });
    }
    async function applyFilter() {
      let isWorkFromHome = 0;
      if (workFromHome.value == true) {
        isWorkFromHome = 1;
      }
      var filterData = {
        city: city.value,
        country: country.value,
        state: state.value,
        profession: profession.value,
        employment: employment.value,
        experience: experience.value,
        workFromHome: isWorkFromHome,
      };
      store.dispatch("jobs/setFilterData", filterData).then(() => {
        //console.log("getter_filterData",jobFilterData.value)
      });
      //isLocationSelect.value = false;
      //console.log("filter data", filterData)
      emit("clickFilter", {
        eventName: jobType.ADVANCED,
        filterQuery: filterData,
      });
    }
    async function clearFilter() {
      jobTypes.value = jobType.ALL;
      store.commit("jobs/commit_currentJobType", jobType.ALL);
      emit("clickFilter", { eventName: jobType.ALL, filterQuery: "" });
      disabled.value = false;
      clearAdvancedFilter();
    }
    function clearAdvancedFilter() {
      location.value = null;
      selectedCity.value = null;
      selectedCountry.value = null;
      city.value = null;
      country.value = null;
      countryIso.value = null;
      state.value = null;

      profession.value = null;
      employment.value = null;
      experience.value = 0;
      workFromHome.value = false;
      isLocationSelect.value = false;
    }
    function clickLocationClose() {
      location.value = null;
      isLocationSelect.value = false;
    }
    // function setJobFilterData() {
    //   let data = jobFilterData.value;
    //   location.value = data.city+","+data.state+","+data.country;
    //   profession.value = data.profession;
    //   employment.value = data.employment;
    //   experience.value = data.experience;
    // }

    return {
      jobData,
      // getJobData,
      getEmploymentType,
      setCompanyImage,
      employmentTypes,
      setEmpoymentType,
      // goToJobDetails,
      // setClosingStatus,
      // setImageForJobStatus,
      disabled,
      isLocationSelect,
      checkCountrySelected,
      //clickApplied,
      //clickBookmark,
      isClosingSoon,
      isClosed,
      applyFilter,
      location,
      profession,
      employment,
      experience,
      workFromHome,
      selectedPlace,
      selectedCountry,
      selectedCity,
      countryIso,
      //setLocationOptions,
      // setSelectedLocation,
      locationSelectedByUser,
      locationUnSelectedByUser,
      filteredLocation,
      searchLocationData,
      professionDropdownData,
      jobFilterData,
      professionData,
      isUserLoggedIn,
      getDropdownData,
      clearFilter,
      // calculateNoOfDays,
      city,
      country,
      state,
      checkedAllJob,
      clickFilter,
      jobTypes,
      jobType,
      clickLocationClose,
      isShowAdvanceFilter,
      fetchFilteredCountries,
      countrySelectedByUser,
      countryUnSelectedByUser,
      fetchFilteredCities,
      citySelectedByUser,
      cityUnSelectedByUser,
      getter_countries,
      getter_cities,
    };
  },
};
</script>
<style scoped>
.p-slider-horizontal,
.p-inputtext {
  width: 14rem !important;
}
.p-slider-vertical {
  height: 8rem !important;
}
.autocomplete-font-size {
  font-size: 0.75rem !important;
}
.p-dropdown .p-dropdown-trigger {
  background: transparent;
  color: #6c757d;
  width: 1.357rem !important;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* input[type="radio"]:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
input[type="radio"]:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #333;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
} */

/* input[type="checkbox"]:checked:after {
  width: 15px;
  height: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #333;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
input[type="checkbox"]:after {
  width: 15px;
  height: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
input[type="checkbox"]:checked + label::after {
  content: "";
  position: absolute;
  width: 1.2ex;
  height: 0.4ex;
  background: rgba(0, 0, 0, 0);
  top: 0.9ex;
  left: 0.4ex;
  border: 3px solid red;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
} */
input[type="radio"]:checked + label {
  font-weight: bold !important;
}
/* .p-dropdown {
  border: 0.5px solid var(--app-input-border);
} */
</style>
