<template>
  <div class="cls-experience cls-softwareproficiencies form-bg-w p-6">
    <!-- top section -->
    <div class="flex flex-wrap mb-2">
      <!-- second section -->
      <div class="w-full">
        <div class="flex items-center">
          <div class="justify-center flex items-center mb-2">
            <span
              class="app-text-color-primary flex items-center justify-center page-title"
              >Software Proficiencies</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- add education -->
    <div class="py-1 m-auto w-full mt-1">
      <div class="">
        <!-- Software name -->
        <div class="grid lg:grid-cols-12 gap-2">
          <div class="lg:col-span-4">
            <div class="grid">
              <label class="form-label-bg-w pb-1.5"> Software Name </label>
              <AutoComplete
                v-model="selectedSoftware"
                :suggestions="filteredSoftwares"
                @complete="selectedSoftwareList($event)"
                field="name"
                inputId="id"
                placeholder="Software name"
                class="w-[auto] lg:w-1/1 bg-white text-gray-700 focus:outline-none rounded-lg form-control"
                :disabled="editMode"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.software_id.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>
          </div>
          <div class="lg:col-span-6">
            <div class="grid grid-cols-2 gap-2">
              <div class="">
                <label class="form-label-bg-w float-left pb-1.5">Year</label>
                <input
                  type="software"
                  v-model="formData.totalExpYear"
                  placeholder="Year"
                  class="bg-white text-gray-700 form-control focus:outline-none rounded-lg"
                  pattern="\d{2}"
                  maxlength="2"
                />
                <div
                  class="invalid-feedback"
                  v-for="error of v$.totalExpYear.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div class="">
                <label class="form-label-bg-w float-left pb-1.5">Month</label>
                <input
                  type="software"
                  placeholder="Month"
                  v-model="formData.totalExpMonth"
                  class="bg-white text-gray-700 form-control focus:outline-none rounded-lg"
                  pattern="\d{2}"
                  maxlength="2"
                />
                <div
                  class="invalid-feedback"
                  v-for="error of v$.totalExpMonth.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="grid grid-col-1"></div>
          </div>
          <div class="lg:col-span-2">
            <div class="">
              <label class="form-label-bg-w float-left pb-1.5">
                Rating(10)
              </label>
              <Dropdown
                v-model="formData.stars"
                :options="ratings"
                optionLabel="star"
                optionValue="code"
                placeholder="Rating"
                class="w-full bg-white primevue-dropdown text-gray-700 focus:outline-none rounded-lg mb-2.5 form-control"
              />
              <div
                class="invalid-feedback"
                v-for="error of v$.stars.$errors"
                :key="error.$uid"
              >
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col my-4">
          <div class="">
            <h4 class="app-text-color-primary font-medium text-[20px]">
              Select Organisation
            </h4>
            <span class="text-[#000] text-xs"
              >Select Organisation when you have used this software</span
            >
            <div
              class="invalid-feedback pl-0 pt-2"
              v-for="error of v$.experience.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <div class="text-left mt-3">
            <button
              class="btn btn-controls"
              type="submit"
              @click="visible = true"
            >
              Add
            </button>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2">
          <div
            class="w-full items-center"
            v-if="formData.experience.length > 0"
          >
            <div class="mb-3">
              <h4 class="font-medium app-text-color-primary text-[18px]">
                Experience
              </h4>
            </div>
            <div
              class=""
              v-for="(org_data, index) in formData.experience"
              :key="index"
            >
              <div class="flex flex-row items-center">
                <img
                  :src="getStaticImage('black_dot.svg')"
                  alt=""
                  class="md:w-2.5"
                />
                <span class="text-sm app-text-color-secondary ml-2 font-medium">
                  {{ getOrgName(org_data) }}</span
                >
              </div>
            </div>
          </div>

          <div class="" v-if="formData.education.length > 0">
            <div class="mb-3">
              <h4 class="font-medium app-text-color-primary text-[18px]">
                Education
              </h4>
            </div>
            <div
              class=""
              v-for="(org_data, index) in formData.education"
              :key="index"
            >
              <div class="flex flex-row items-center">
                <img
                  :src="getStaticImage('black_dot.svg')"
                  alt=""
                  class="md:w-2.5"
                /><span
                  class="text-sm app-text-color-secondary font-medium ml-2"
                >
                  {{ getDegree(org_data) }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- buttons section-->
        <div class="flex items-end justify-end space-x-3 mt-8">
          <div>
            <button
              class="btn btn-controls mr-4"
              type="submit"
              @click="backToProfile"
            >
              Cancel
            </button>
            <button
              v-if="updateKey"
              class="btn btn-controls mr-4"
              type="submit"
              @click="updateSoftware"
            >
              Update
            </button>
            <button
              v-if="!updateKey"
              class="btn btn-controls mr-4"
              type="submit"
              @click="getFormValues($event)"
            >
              Save
            </button>
            <button
              v-if="updateKey"
              class="btn btn-controls"
              type="submit"
              @click="deleteData($event)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Dialog
      v-model:visible="visible"
      modal
      :showHeader="false"
      :style="{ width: '50vw' }"
      :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
      <div class="form-bg-w p-6">
        <p class="m-0">{{ popup.message }}</p>
        <div class="grid grid-cols-2 gap-4">
          <div v-if="getExpArray(getter_UserProfile.org_details).length > 0">
            <h4 class="font-medium app-text-color-primary text-[18px]">
              Experience
            </h4>
            <div
              v-for="(experience_obj, index) of getExpArray(
                getter_UserProfile.org_details
              )"
              :key="index"
              class="flex align-items-center mt-2"
            >
              <Checkbox
                v-model="formData.experience"
                :inputId="experience_obj.id"
                name="experience"
                :value="experience_obj.id"
              />
              <label
                >&nbsp;{{ experience_obj.designation }} |
                {{ experience_obj.organization.name }}</label
              >
            </div>
          </div>
          <div v-if="getEduArray(getter_UserProfile.org_details).length > 0">
            <h4 class="font-medium app-text-color-primary text-[18px]">
              Education
            </h4>
            <div
              v-for="(education_obj, index) of getEduArray(
                getter_UserProfile.org_details
              )"
              :key="index"
              class="flex align-items-center mt-2"
            >
              <Checkbox
                v-model="formData.education"
                :inputId="education_obj.id"
                name="education"
                :value="education_obj.id"
              />
              <label
                >&nbsp;{{ education_obj.designation }} |
                {{ education_obj.organization.name }}</label
              >
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-4">
          <button class="btn w-24" @click="visible = false">Done</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import { mapActions } from "vuex";
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required, maxValue } from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import MultiSelect from "primevue/multiselect";
import Checkbox from "primevue/checkbox";
import { getCurrentInstance } from "vue";
import useEmitter from "../../composables/useEmitter.js";

const checkIsExperienceAdded = (param) => (value) => {
  let month = 0;

  if (param.totalExpMonth != "") {
    month = parseInt(param.totalExpMonth);
  }

  let year = 0;
  if (param.totalExpYear != "") {
    year = parseInt(param.totalExpYear);
  }

  if (month + year > 0) {
    return true;
  } else {
    return false;
  }
};

const checkIsOrgSelected = (param) => (value) => {
  if (param.experience.length + param.education.length > 0) {
    return true;
  } else {
    return false;
  }
};

const checkIsSoftwareSelected = (param) => (value) => {
  if (
    param.value != null &&
    param.value.id != undefined &&
    param.value.id != ""
  ) {
    return true;
  } else {
    return false;
  }
};

export default {
  name: "softwareProficiency",
  components: {
    InputText,
    Dropdown,
    Button,
    AutoComplete,
    Dialog,
    MultiSelect,
    Checkbox,
  },
  props: {
    data: String,
  },
  emits: ["close"],
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // console.log(route.query);
    let editMode = ref(false);
    const visible = ref(false);
    let selectedCategories = ref("");
    let showEducation = ref(false);
    let showExperience = ref(false);
    let updateKey = ref(false);
    let proficiencyLevel = ref("");
    let selectedSoftware = ref({
      id: "",
      name: "",
    });
    let cv_elements = appConstants.CV_ELEMENTS;
    // let selectedSoftware = reactive({
    //     "_source.name": "",
    //     "id": ""
    // }
    // );
    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;
    let filteredSoftwares = ref([""]);
    let newEducationArray = ref([]);
    let newExperienceArray = ref([]);
    let expArrayToUpdate = ref([]);
    let eduArrayToUpdate = ref([]);
    let star = ref("");
    let id = ref("");
    let ratings = [
      { star: "1", code: 1 },
      { star: "2", code: 2 },
      { star: "3", code: 3 },
      { star: "4", code: 4 },
      { star: "5", code: 5 },
      { star: "6", code: 6 },
      { star: "7", code: 7 },
      { star: "8", code: 8 },
      { star: "9", code: 9 },
      { star: "10", code: 10 },
    ];
    let softwareDetails = reactive({
      software_id: "",
      stars: "",
      experience: [],
      education: [],
      software_experience: "",
      software: "",
    });
    const formData = reactive({
      id: "",
      software_id: "",
      stars: "",
      experience: [],
      education: [],
      software: "",
      totalExpYear: "",
      totalExpMonth: "",
    });

    const validation1 = {
      stars: {
        required: helpers.withMessage("Rating is required", required),
      },
      totalExpYear: {
        checkIsExperienceAdded: helpers.withMessage(
          "Total exp. is required",
          checkIsExperienceAdded(formData)
        ),
        maxValue: helpers.withMessage(
          "Please enter valid number",
          maxValue(100)
        ),
      },
      totalExpMonth: {
        maxValue: helpers.withMessage(
          "Please enter month 0 to 12",
          maxValue(11)
        ),
      },
      experience: {
        checkIsOrgSelected: helpers.withMessage(
          "Experience or education is required",
          checkIsOrgSelected(formData)
        ),
      },
      software_id: {
        checkIsSoftwareSelected: helpers.withMessage(
          "Select Software from dropdown",
          checkIsSoftwareSelected(selectedSoftware)
        ),
      },
    };
    const v$ = useVuelidate(validation1, formData);

    const popup = reactive({
      header: "Select Organisation",
      display: false,
      message: "",
    });
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_software = computed(
      () => store.getters["dropdown/getter_software_idAndName"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);
    getSoftwareList();

    if (props.data) {
      let id = props.data;
      updateKey.value = true;
      let dataToEditRecord = fetchSoftwareProficiencyFromStore(id);
      // console.log("dataToEditRecord", dataToEditRecord);
      if (dataToEditRecord == "") {
        //do nothing
      } else {
        editMode.value = true;
        editRecord(dataToEditRecord);
      }
    }

    // const rules = computed(() => {
    //     return {
    //         software_name: helpers.withMessage("Software name is required", required),
    //         totalExpYear: { required },
    //         totalExpMonth: { required },
    //         rating: { required },
    //     }
    // });
    // const v$ = useVuelidate(rules, formData);

    function getSoftwareList() {
      store.dispatch("dropdown/action_getSoftwareDetails");
      // store.dispatch("UserProfile/action_getUserProfileNew", "sheetalsalunkhe")
      // console.log("getter_UserProfile ", getter_UserProfile.value);
    }
    function getExpArray(array) {
      if (array == null || array.length == 0) {
        return [];
      }
      let filteredArray = array.filter(function (data) {
        return data.is_edu_detail == false;
      });
      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      return filteredArray;
    }
    function getEduArray(array) {
      if (array == null || array.length == 0) {
        return [];
      }
      let filteredArray = array.filter(function (data) {
        return data.is_edu_detail == true;
      });
      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      // showEducation = true
      return filteredArray;
    }

    function fetchSoftwareProficiencyFromStore(id) {
      let dataToEdit = "";
      for (
        let i = 0;
        i < getter_UserProfile.value.software_details.length;
        i++
      ) {
        if (getter_UserProfile.value.software_details[i].id == id) {
          dataToEdit = JSON.parse(
            JSON.stringify(getter_UserProfile.value.software_details[i])
          );
        }
      }
      return dataToEdit;
    }

    function editRecord(data) {
      // console.log("data", data);

      formData.id = data.id;
      formData.software_id = data.software_id;
      formData.stars = data.stars;
      formData.experience = data.experience;
      formData.education = data.education;
      formData.software = data.software;
      formData.totalExpYear = Math.floor(data.software_experience / 12);
      formData.totalExpMonth = data.software_experience % 12;

      selectedSoftware.value.id = data.software_id;
      selectedSoftware.value.name = data.software;

      // star.value = data.stars
      // selectedSoftware = data.software
      // softwareDetails.software_id = data.software_id
      // formData.totalExpMonth = data.software_experience - 12
      // formData.totalExpYear = Math.floor(data.software_experience / 12)
    }
    function getExpIdToUpdate(data) {
      // console.log("getExpIdToUpdate", data);/
    }
    function updateSoftware() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      }

      softwareDetails.id = formData.id;
      softwareDetails.stars = formData.stars;
      if (
        selectedSoftware.value != null &&
        selectedSoftware.value.id != undefined
      ) {
        softwareDetails.software = selectedSoftware.value.name;
        softwareDetails.software_id = selectedSoftware.value.id;
      } else {
        softwareDetails.software = "";
        softwareDetails.software_id = "";
      }
      softwareDetails.software_experience = experienceInMonth();
      softwareDetails.experience = formData.experience;
      softwareDetails.education = formData.education;
      // console.log("softwareDetails", softwareDetails);
      store
        .dispatch("UserProfile/action_updateSoftwareDetails", softwareDetails)
        .then((res) => {
          backToProfile();
        });
    }

    function experienceInMonth() {
      let month = 0;

      if (formData.totalExpMonth != "") {
        month = parseInt(formData.totalExpMonth);
      }

      let year = 0;
      if (formData.totalExpYear != "") {
        year = parseInt(formData.totalExpYear);
      }

      let total_month = year * 12 + month;
      return total_month;
    }
    function deleteData(e) {
      e.preventDefault();
      let id = props.data;
      softwareDetails.id = props.data;
      store
        .dispatch("UserProfile/action_deleteSoftwareDetails", softwareDetails)
        .then((res) => {
          backToProfile();
        });
    }
    function backToProfile(e) {
      // if (e != null) {
      //   e.preventDefault();
      // }
      // let userSlug = getter_user.value.slug;
      // router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: {
      //     user_slug: userSlug,
      //     section: cv_elements.SOFTWARE_PROFICIENCY,
      //   },
      // });
      $emitter.emit("close", cv_elements.SOFTWARE_PROFICIENCY);
    }

    function getFormValues() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      }

      // console.log("obj", selectedSoftware.value._source.name);
      softwareDetails.stars = formData.stars;
      if (
        selectedSoftware.value != null &&
        selectedSoftware.value.id != undefined
      ) {
        softwareDetails.software = selectedSoftware.value.name;
        softwareDetails.software_id = selectedSoftware.value.id;
      } else {
        softwareDetails.software = "";
        softwareDetails.software_id = "";
      }
      softwareDetails.software_experience = experienceInMonth();
      softwareDetails.experience = formData.experience;
      softwareDetails.education = formData.education;
      // console.log(
      //   "getFormValues",
      //   softwareDetails.software,
      //   softwareDetails.experience,
      //   softwareDetails.stars,
      //   softwareDetails.software_id
      // );
      store
        .dispatch("UserProfile/action_addSoftwareDetails", softwareDetails)
        .then((res) => {
         // console.log("data added", res);
          backToProfile();
        });
    }
    function getCheckBoxValue(data) {
      // console.log("data", data);
      let expArray = getter_UserProfile.value.org_details;
      // console.log("expArray", expArray);
      if (expArray.length > 0) {
        expArray.forEach((element) => {
          if (element.id == data.id) {
            expArrayToUpdate.value.push(data.id);
            if (newExperienceArray.value.indexOf(data.id) == -1)
              newExperienceArray.value.push(data);
          }
        });
      }
    }
    function getCheckBoxValueEdu(data) {
      // console.log("data", data);
      let expArray = getter_UserProfile.value.org_details;
      // console.log("expArray", expArray);
      if (expArray.length > 0) {
        expArray.forEach((element) => {
          if (element.id == data.id) {
            eduArrayToUpdate.value.push(data.id);
            if (newEducationArray.value.indexOf(data.id) == -1)
              newEducationArray.value.push(data);
          }
        });
      }
    }

    function getOrgName(org_id) {
      for (let i = 0; i < getter_UserProfile.value.org_details.length; i++) {
        let ord_data = getter_UserProfile.value.org_details[i];
        if (ord_data.id == org_id) {
          if (ord_data.is_edu_detail == false) {
            return ord_data.organization.name;
          } else {
            return "";
          }
        }
      }
      return "";
    }

    function getDegree(org_id) {
      for (let i = 0; i < getter_UserProfile.value.org_details.length; i++) {
        let ord_data = getter_UserProfile.value.org_details[i];
        if (ord_data.id == org_id) {
          if (ord_data.is_edu_detail == true) {
            return ord_data.degree;
          } else {
            return "";
          }
        }
      }
      return "";
    }

    return {
      getter_software,
      ratings,
      selectedSoftware,
      proficiencyLevel,
      getter_UserProfile,
      // v$,
      selectedCategories,
      star,
      editMode,
      filteredSoftwares,
      showEducation,
      showExperience,
      softwareDetails,
      visible,
      popup,
      formData,
      updateKey,
      newEducationArray,
      newExperienceArray,
      expArrayToUpdate,
      eduArrayToUpdate,
      // updateSoftwareProficiency,
      id,
      getSoftwareList,
      backToProfile,
      getExpArray,
      getEduArray,
      getFormValues,
      getExpIdToUpdate,
      getCheckBoxValue,
      deleteData,
      getCheckBoxValueEdu,
      fetchSoftwareProficiencyFromStore,
      updateSoftware,
      editRecord,
      getOrgName,
      getDegree,
      v$,
      cv_elements,
    };
  },

  methods: {
    ...mapActions("dropdown", ["action_getSoftwareDetails"]),

    // backToBuildcv() {
    //   let userSlug = getter_user.value.slug;
    //   this.$router.push({
    //     name: appConstants.routes.VIEWPROFILE,
    //     params: {
    //       user_slug: userSlug,
    //       section: cv_elements.SOFTWARE_PROFICIENCY,
    //     },
    //   });
    // },
    selectedSoftwareList(event) {
      // console.log("event", event);
      this.action_getSoftwareDetails(event.query).then(() => {
        this.filteredSoftwares = this.getter_software;
        // console.log(" this.filteredSoftwares ", this.selectedSoftware);
      });
    },
  },
};
</script>

<style scoped>
.white-dot {
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
</style>
