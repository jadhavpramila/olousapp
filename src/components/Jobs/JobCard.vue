<template>
  <div
    class="app-border-static hover:app-bg-hover-gradient app-bg-hover-gradient app-bg-color-gradient rounded-[8px] lg:p-2 md:p-2 px-1 py-2 cursor-pointer mb-3"
  >
    <div class="job-container">
      <div class="flex items-center">
        <img
          class="lg:w-[4rem] lg:h-[4rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] rounded-md object-contain"
          :src="setCompanyImage(jobs.company_logo)"
          alt=""
        />
      </div>
      <div class="lg:ml-2 md:ml-2 ml-1" @click="goToJobDetails(jobs)">
        <div class="flex flex-col w-full">
          <h1 class="font-weight-700 text-sm w-full truncate">
            {{ jobs.job_title }}
          </h1>
          <p class="font-medium text-sm w-full truncate mb-3">
            {{ jobs.company }}
          </p>
          <p class="font-weight-600 text-xs mb-1">
            {{ getJobLocation(jobs) }}
          </p>
          <div class="flex flex-row items-center mb-1">
            <div
              class="flex items-center"
              v-if="jobs.min_exp > 0 || jobs.max_exp > 0"
            >
              <p
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                Min {{ jobs.min_exp }}yrs
              </p>
              <span>-</span>
              <p
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                Max {{ jobs.max_exp }}yrs
              </p>
            </div>
            <div v-else class="flex items-center">
              <p
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                Fresher
              </p>
            </div>
            <div class="flex items-center">
              <span
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                >&nbsp; | &nbsp;</span
              >
              <p
                v-if="jobs.employment"
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                {{ setEmploymentType(jobs.employment) }}
              </p>
              <p
                v-else
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                NA
              </p>
              <span
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                >&nbsp; | &nbsp;</span
              >
              <p
                v-if="jobs.vacancy <= 1"
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                {{ jobs.vacancy }} Position
              </p>
              <p
                v-if="jobs.vacancy > 1"
                class="font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
              >
                {{ jobs.vacancy }} Positions
              </p>
            </div>
          </div>
          <div
            class="flex inline-flex items-center"
            v-if="jobs.job_application?.isApplied"
          >
            <img
              :src="getStaticImage('Applied.svg')"
              alt="Applied"
              class="mr-1"
            />
            <p class="text-[#959595] font-normal text-xs italic">
              Applied
              <span v-if="jobs.job_application.created_at"
                >on {{ setAppliedDate(jobs.job_application.created_at) }}</span
              >
            </p>
          </div>
          <div v-else>
            <span class="font-weight-700 text-xs">Olous CV Required</span>
            <span class="font-weight-700 text-xs">
              {{ getNumberOfApplicantString() }}
            </span>
          </div>
          <!-- <div
            class="flex inline-flex items-center"
            v-if="!jobs.job_application?.isApplied"
          >
            <img
              :src="setImageForJobStatus(jobs.expires_at)"
              alt="call"
              class="mr-1"
            />
            <p
              class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem] leading-3"
            >
              {{ setClosingStatus(jobs.expires_at) }}
            </p>
          </div> -->

          <!-- <img src="../../assets/Call.svg" alt="call" class="w-8" /> -->
        </div>
      </div>
      <div class="flex w-full flex-col justify-between items-end cursor-auto">
        <!-- <div v-if="!jobs.bookmark_id?.id" class="cursor-pointer">
          <img
            src="/src/assets/img/Bookmark.svg"
            alt=""
            @click="clickBookmarkJob(jobs)"
          />
        </div>

        <div v-if="jobs.bookmark_id?.id" class="cursor-pointer">
          <img
            src="/src/assets/img/Bookmark_Fill.svg"
            alt=""
            @click="clickDeleteBookmark(jobs.bookmark_id.id, jobs.id)"
          />
        </div> -->
        <div
          v-if="
            jobs.job_application?.isApplied &&
            selectedJobFilterType == Jobfiltertype.APPLIED
          "
        >
          <button
            class="ursor-pointer flex items-center justify-center btn w-[3rem] sm:w-[6.688rem] h-[1.875rem] hover:bg-white hover:text-black view-status-image"
            @click="btnViewApplicationStatus(jobs)"
          >
            <img
              :src="getStaticImage('job_stats_v1.svg')"
              alt=""
              class="w-[10px] view-status-image"
            />
            <span
              class="font-medium lg:ml-1 md:ml-1 ml-1 text-xs hidden sm:block"
            >
              View status
            </span>
          </button>
        </div>
        <div v-if="!jobs.is_expired">
          <button
            class="cursor-pointer flex items-center justify-center btn sm:w-[6.688rem] w-[3rem] h-[1.875rem] hover:bg-white hover:text-black"
            @click="clickShare()"
          >
            <img
              :src="getStaticImage('Job-Share.svg')"
              alt=""
              class="w-[15px]"
            />
            <span
              class="font-medium lg:ml-1 md:ml-1 ml-0.5 text-xs hidden md:block"
            >
              Share
            </span>
          </button>
        </div>
        <div
          class="flex flex-row items-end cursor-auto lg:ml-0 md:ml-0 sm:ml-[-9.25rem] ml-[-9.25rem]"
        >
          <img
            v-if="jobs.urgent == true"
            :src="getStaticImage('Urgent.svg')"
            alt=""
            class="w-4"
          />

          <p
            v-if="jobs.urgent == true"
            class="font-light lg:text-xs md:text-xs text-[0.625rem] ml-1"
          >
            Urgent
          </p>
          <img
            v-if="jobs.work_from_home == true"
            :src="getStaticImage('WFH.svg')"
            alt=""
            class="ml-2 lg:w-10 md:w-10"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import { ref, onMounted, onBeforeMount, reactive } from "vue";
import appConstants from "../../appConstants.js";
import {
  computed,
  ref,
  watchEffect,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Filter from "./Filter.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { getCurrentInstance } from "vue";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { getCurrentEncodedURLWithQueryParameter } from "../../common/js/webUrls.js";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import { numeric } from "@vuelidate/validators";

export default {
  name: "JobCard",
  components: {
    Filter,
    Sidebar,
    Button,
  },
  props: {
    jobs: {
      type: Object,
      default: {},
    },
    employmentTypes: {
      type: Object,
      default: {},
    },
    selectedJobFilterType: {
      type: String,
      default: appConstants.jobType.ALL,
    },
  },
  data() {
    return {};
  },
  async setup(props) {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let isBookmark = ref();
    let isClosedJob = ref(false);
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    const Jobfiltertype = appConstants.jobType;
    const JobsStatus = {
      ACTIVE: "Open",
      CLOSED: "Closed",
      CLOSINGSOON: "Closing Soon",
      APPLIED: "Applied",
    };
    let isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    // let isUnauthorizedId = compu(
    //   () => store.getters["jobs/getter_unauthorizedBookmarkId"]
    // );
    function setCompanyImage(image) {
      //  let imageUrl = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${image}`;

      return image;
    }
    async function getEmploymentType() {
      await store.dispatch("dropdown/action_getEmploymentType").then((res) => {
        //console.log("data", res);
      });
    }
    function setEmploymentType(type) {
      // console.log("type", type);
      for (let i = 0; i < props.employmentTypes.length; i++) {
        if (props.employmentTypes[i].id == type) {
          // console.log("type", employmentTypes.value[i].employment_type);
          return props.employmentTypes[i].employment_type;
        }
        //const element = array[index];
      }
    }
    function getParamsForURL(job) {
      let jobTitle = "";
      if (job.job_title != undefined && job.job_title != null) {
        jobTitle = job.job_title;
        //Other than all alphabets & space remove other characters
        jobTitle = jobTitle.replace(/[^a-zA-Z ]/g, "");
        //concate with "-""
        jobTitle = jobTitle.replace(/\ /g, "-");
      }
      return jobTitle;
    }

    function goToJobDetails(jobs) {
      let days = calculateNoOfDays(jobs.expires_at);
      // if (days <= 0) {
      //   toast.add({
      //     severity: appConstants.toast_severity.INFO,
      //     summary: appConstants.toast_summary.INFO,
      //     detail: "This job is not available anymore",
      //     life: 3000,
      //   });
      // } else {
      let encode_str = getUUIDtoEncodedString(jobs.id);

      let result = getParamsForURL(jobs);
      // console.log("jobs.id", jobs.id);
      // router.push({
      //   name: appConstants.routes.JOBDETAILS,
      //   params: {
      //     job_id: `${result}${appConstants.url_separator_jobs}${encode_str}`,
      //   },
      // });

      const routeData = router.resolve({
        name: appConstants.routes.JOBDETAILS,
        params: {
          job_id: `${result}${appConstants.url_separator_jobs}${encode_str}`,
        },
      });
      window.open(routeData.href, "_blank");
    }
    function calculateNoOfDays(expiryDate) {
      var currentDate = new Date().toISOString().split(".")[0] + "Z";
      const d2 = new Date(currentDate);
      //for (let i = 0; i < jobData.value.jobs.length; i++) {
      const d1 = new Date(expiryDate);
      var Difference_In_Time = d1.getTime() - d2.getTime();
      var Difference_In_Days = Math.round(
        Difference_In_Time / (24 * 60 * 60 * 1000)
      );
      return Difference_In_Days;
    }
    function setClosingStatus(expiryDate) {
      let days = calculateNoOfDays(expiryDate);
      //console.log("Difference_In_Days",days);
      if (days <= 0) {
        isClosedJob.value = true;
        return JobsStatus.CLOSED;
      } else if (days <= 5) {
        return JobsStatus.CLOSINGSOON;
      } else {
        return JobsStatus.ACTIVE;
      }
      //}
    }
    function setImageForJobStatus(expiryDate) {
      let days = calculateNoOfDays(expiryDate);
      //console.log("Difference_In_Days",days);
      if (days <= 0) {
        return $getStaticImage("Closed.svg");
      } else if (days <= 5) {
        return $getStaticImage("Closing-Soon.svg");
      } else {
        return $getStaticImage("Active.svg");
      }
    }

    // function clickBookmarkJob(job) {
    //   if (isUserLoggedIn.value) {
    //     store.dispatch("jobs/action_saveBookmarkJob", job.id).then((res) => {
    //       isBookmark.value = true;
    //       //console.log("data apply filter", res);
    //     });
    //   } else {
    //     let encryptedId = btoa(job.id);
    //     let obj = {
    //       isFromBookmark: true,
    //       job_id: encryptedId,
    //       //user: job,
    //     };

    //     //store.commit("jobs/commit_unauthorizedBookmarkId", id);
    //     getCurrentEncodedURLWithQueryParameter(obj);
    //   }
    // }
    // function clickDeleteBookmark(bookmarkId, jobId) {
    //   let obj = {
    //     bookmark_id: bookmarkId,
    //     job_id: jobId,
    //   };
    //   store.dispatch("jobs/action_deleteBookmarkJob", obj).then((res) => {
    //     // console.log("data apply filter", filterData);
    //   });
    // }
    function setAppliedDate(date) {
      let date1 = new Date(date);
      let year = date1.getFullYear();
      let month = date1.toLocaleString("en-us", { month: "short" });
      let dt = date1.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let newDate = dt + " " + month + " " + year;
      return newDate;
    }

    function getJobCities(data) {
      // let cities = [];
      // for (let count = 0; count < data.length; count++) {
      //   cities.push(data[count].city);
      // }

      // let res = cities.join(", ");
      // return res;

      let city = props.jobs.city;
      return city;
    }
    function getJobLocation(data) {
      //console.log("jobs data", data);
      let location = [];
      // for (let count = 0; count < data.length; count++) {
      //   if (count > 0) break;
      if (data.city != "") {
        location.push(data.city);
      }

      if (data.state != "") {
        location.push(data.state);
      }

      if (data.country != "") {
        location.push(data.country);
      }
      //}

      let res = location.join(", ");
      return res;
    }

    function getNumberOfApplicantString() {
      if (props.jobs.no_of_applicants > 0) {
        if (props.jobs.no_of_applicants == 1) {
          return ` | ${props.jobs.no_of_applicants} Applicant`;
        } else {
          return ` | ${props.jobs.no_of_applicants} Applicants`;
        }
      } else {
        return "";
      }
    }

    function clickShare() {
      let pageData = {
        type: 4,
        content: props.jobs.job_title,
        tags: "",
        slug: "",
        identifier: props.jobs.id,
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

    function btnViewApplicationStatus(job) {
      store.commit("jobs/commit_singleJobData", job);

      let encode_str = getUUIDtoEncodedString(job.id);

      let result = getParamsForURL(job);

      router.push({
        name: appConstants.routes.JOBSTATUS,
        params: {
          job_id: encode_str,
        },
      });
    }

    onMounted(() => {});
    return {
      isBookmark,
      isUserLoggedIn,
      getEmploymentType,
      setCompanyImage,
      setEmploymentType,
      goToJobDetails,
      setClosingStatus,
      setImageForJobStatus,
      setAppliedDate,
      // clickBookmarkJob,
      getJobCities,
      getJobLocation,
      // clickDeleteBookmark,
      calculateNoOfDays,
      getNumberOfApplicantString,
      clickShare,
      btnViewApplicationStatus,
      Jobfiltertype,
    };
  },
};
</script>
<style scoped>
input[type="radio"]:checked:after {
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
}
input[type="radio"]:after {
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

.view-status-button:hover {
}
</style>
