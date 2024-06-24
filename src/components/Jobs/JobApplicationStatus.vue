<template>
  <div class="form-container app-border rounded-[8px]">
    <div
      class="job-profile-container app-bg-color-secondary lg:p-4 md:p-4 p-3 rounded-t-lg"
    >
      <div
        class="flex lg:items-center md:items-center items-start justify-between"
      >
        <img
          :src="singleJobData.company_logo"
          alt=""
          class="object-contain lg:w-[8.125rem] md:w-[8.125rem] w-[3rem] bg-[#fff] lg:h-[8.125rem] md:h-[8.125rem] h-[3rem] rounded-lg"
        />
        <div
          class="lg:hidden md:hidden block flex justify-end"
          v-if="!singleJobData.is_expired"
        >
          <div>
            <button
              class="btn flex inline-flex items-center justify-center w-[6.688rem] h-[1.875rem] hover:bg-white hover:text-black"
              @click="clickShare()"
            >
              <img :src="getStaticImage('Job-Share.svg')" alt="" class="" />
              <span class="lg:ml-1 md:ml-1 ml-0.5"> Share </span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-between lg:ml-2 md:ml-2 ml-0 lg:mt-0 md:mt-0 mt-4"
      >
        <div>
          <h1
            class="lg:text-lg md:text-lg app-text-color-secondary text-base font-weight-700 job-title"
          >
            {{ singleJobData.job_title }}
          </h1>
          <p
            class="text-sm app-text-color-secondary font-weight-700 tracking-wide mt-1"
          >
            {{ singleJobData.company }}
          </p>
          <p
            class="lg:text-sm md:text-sm text-sm flex inline-flex items-center leading-3 lg:mt-2 md:mt-2 mt-6 app-text-color-secondary font-light"
          >
            <img :src="getStaticImage('Location-Job-v1.svg')" alt="location" />
            <span class="ml-1">
              <!-- {{ singleJobData.country }} - -->
              {{ getJobCities(singleJobData.location) }}</span
            >
          </p>
        </div>
        <div>
          <div class="mt-1.5 flex w-full inline-block h-auto">
            <ul
              class="lg:flex md:flex lg:inline-flex md:inline-flex lg:gap-4 md:gap-4 grid grid-cols-1 gap-2"
            >
              <li>
                <div
                  class="flex inline-flex items-center"
                  v-if="singleJobData.min_exp > 0 || singleJobData.max_exp > 0"
                >
                  <img
                    :src="getStaticImage('Experience-Job-v1.svg')"
                    alt="Experience"
                    class=""
                  />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    Min {{ singleJobData.min_exp }} yrs - Max
                    {{ singleJobData.max_exp }} yrs
                  </p>
                </div>
                <div v-else class="flex items-center">
                  <img
                    :src="getStaticImage('Experience-Job-v1.svg')"
                    alt="Experience"
                    class=""
                  />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    Fresher
                  </p>
                </div>
              </li>
              <li>
                <div class="flex inline-flex items-center">
                  <img
                    :src="getStaticImage('Employment-Job-v1.svg')"
                    alt=""
                    class=""
                  />
                  <span v-if="singleJobData.employment">
                    <p
                      class="ml-1 lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                    >
                      {{ setEmpoymentType(singleJobData.employment) }}
                    </p>
                  </span>
                  <span v-else>
                    <p
                      class="lg:text-sm md:text-sm text-sm app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                    >
                      NA
                    </p>
                  </span>
                </div>
                <div class="flex inline-flex items-center lg:ml-4 md:ml-4 ml-4">
                  <img
                    :src="setImageForJobType(singleJobData)"
                    alt=""
                    class=""
                  />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ workLocationText }}
                  </p>
                </div>
              </li>
              <li>
                <div class="flex inline-flex items-center">
                  <img
                    :src="getStaticImage('Vacancy-Job-v1.svg')"
                    alt=""
                    class=""
                  />
                  <p
                    v-if="singleJobData.vacancy <= 1"
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ singleJobData.vacancy }} Position
                  </p>
                  <p
                    v-if="singleJobData.vacancy > 1"
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light lg:ml-1 md:ml-1 ml-1"
                  >
                    {{ singleJobData.vacancy }} Positions
                  </p>
                </div>
              </li>
              <li v-if="singleJobData.ctc">
                <div class="flex inline-flex items-center">
                  <img :src="getStaticImage('CTC-Job-v1.svg')" alt="CTC" />
                  <p
                    class="lg:text-sm md:text-sm text-sm leading-3 app-text-color-secondary font-light ml-1"
                  >
                    {{ singleJobData.ctc }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-end" v-if="!singleJobData.is_expired">
        <div
          v-if="!singleJobData.is_expired"
          class="flex justify-between items-end lg:block md:block hidden"
        >
          <div>
            <button
              class="btn flex inline-flex items-center justify-center hover:bg-white hover:text-black w-[6.688rem] h-[1.875rem]"
              @click="clickShare()"
            >
              <img :src="getStaticImage('Job-Share.svg')" alt="" class="" />
              <span class="lg:ml-1 md:ml-1 ml-0.5"> Share </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-[#ffffff] app-text-color-secondary lg:p-4 md:p-4 p-3 rounded-b-lg"
    >
      <div class="pl-[1.5rem]">
        <div class="pt-[1rem] pb-[1.5rem] text-[0.906rem] font-medium">
          Job Application status
        </div>

        <div class="max-w-sm">
          <JobStatus
            :jobStatus="singleJobData.job_application.application_status"
          ></JobStatus>
        </div>

        <div
          v-if="isApplicationRejected()"
          class="text-[#a8a8a8] text-sm py-[1.5rem]"
        >
          Your application has not progressed. We recommend you to look for
          alternative position
        </div>
        <div v-else class="pt-11"></div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { ref, onMounted, onBeforeMount, reactive } from "vue";
import { getCurrentInstance } from "vue";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from "vue-router";
import JobStatus from "./JobStatus.vue";

export default {
  name: "JobApplicationStatus",
  components: { JobStatus },
  props: {},
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const route = useRoute();
    let workLocationText = ref("");
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;

    let workLocation = appConstants.WORK_LOCATION;

    let singleJobData = computed(
      () => store.getters["jobs/getter_singleJobData"]
    );

    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );
    getSingleJobData();
    getEmploymentType();

    function getEmploymentType() {
      store.dispatch("dropdown/action_getEmploymentType");
    }
    async function getSingleJobData() {
      //const id = props.job_id.slice(0, 0);
      var splittedID = route.params.job_id;
      // let decoded_route = getUUIDtoEncodedString(splittedID[1]);
     // console.log("id", route.params.job_id);
      try {
        await store
          .dispatch("jobs/action_getSingleJobData", splittedID)
          .then((res) => {});
      } catch (error) {
        // if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
        //   // router.push({ name: appConstants.routes.HOME })
        //   isJobFound.value = true;
        // }
      }
    }
    function getJobCities(data) {
      // let cities = [];
      // for (let count = 0; count < data.length; count++) {
      //   cities.push(data[count].city);
      // }

      // let res = cities.join(", ");
      // return res;
      let location = [];
      for (let count = 0; count < data.length; count++) {
        if (count > 0) break;
        if (data[0].city != "") {
          location.push(data[0].city);
        }

        if (data[0].state != "") {
          location.push(data[0].state);
        }

        if (data[0].country != "") {
          location.push(data[0].country);
        }
      }

      let res = location.join(", ");
      return res;
    }

    function setEmpoymentType(type) {
      let emptype = "";
      // console.log("type", type);
      for (let i = 0; i < employmentTypes.value.length; i++) {
        if (employmentTypes.value[i].id === type) {
          emptype = employmentTypes.value[i].employment_type;
          //console.log("type", emptype);
          return emptype;
        }
        //const element = array[index];
      }
    }

    function setImageForJobType(data) {
      if (data.work_location == workLocation.OFFICE) {
        workLocationText.value = "Office";
        return $getStaticImage("Office-Work-Job-v1.svg");
      } else if (data.work_location == workLocation.ONSITE) {
        workLocationText.value = "Onsite";
        return $getStaticImage("Onsite-Job-v1.svg");
      } else if (data.work_location == workLocation.REMOTE) {
        workLocationText.value = "WFH";
        return $getStaticImage("WFH-Job-v1.svg");
      }
      //console.log("single job data", data);
    }

    function clickShare() {
      let pageData = {
        type: 4,
        content: singleJobData.value.job_title,
        tags: "",
        slug: "",
        identifier: singleJobData.value.id,
      };
      store.dispatch("getURL/action_getSharableURL", pageData).then((res) => {
        let result = copyTextToClipboard(res);
        if (result) {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Link copied to clipboard",
            life: 3000,
          });
        }
      });
    }

    function isApplicationRejected() {
      if (
        singleJobData.value.job_application.application_status ==
        appConstants.job_applciation_status.REJECTED
      ) {
        return true;
      } else {
        return false;
      }
    }

    return {
      singleJobData,
      getJobCities,
      setEmpoymentType,
      setImageForJobType,
      clickShare,
      workLocationText,
      isApplicationRejected,
      getSingleJobData,
    };
  },
};
</script>

<style scoped>
.job-profile-container {
  display: grid;
  grid-template-columns: 8.75rem auto 8.75rem;
}

@media only screen and (max-width: 768px) {
  .job-profile-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
