<template>
  <div class="cls-joblist form-container">
    <div class="flex flex-row filter-button w-full">
      <div class="flex flex-row w-full lg:mb-4 mb-2 justify-center">
        <div class="lg:hidden md:hidden block">
          <Button @click="visibleLeft = true" class="mr-2 bg-[#333]"
            ><img :src="getStaticImage('Filter-icon.svg')" alt="FilterIcon" />
          </Button>
        </div>
        <div
          class="flex lg:pl-0 md:pl-0 pl-[5.313rem] w-full lg:justify-center md:justify-center"
        >
          <h1 class="page-title">Jobs</h1>
        </div>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-12 gap-3">
      <div class="lg:col-span-3 md:col-span-3 col-span-12">
        <div class="grid grid-cols-6 gap-3">
          <div
            class="w-full bg-[#0e0e0e] rounded-md col-span-2 max-h-[40rem] lg:block md:block hidden"
          >
            <Filter @clickFilter="filterAllJob" />
            <Sidebar v-model:visible="visibleLeft" :baseZIndex="111">
              <!-- <h3 class="text-white font-medium text-lg">Filter</h3> -->
              <Filter @clickFilter="filterAllJob" />
            </Sidebar>
          </div>
          <div class="lg:col-span-4 md:col-span-4 col-span-12">
            <div
              class="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-3"
              v-if="jobData?.length > 0"
            >
              <div v-if="getRecommendedJobs().length > 0">
                <div class="flex mb-2">
                  <h1>Recommended Jobs</h1>
                </div>
                <div v-for="(jobs, index) in getRecommendedJobs()" :key="index">
                  <JobCard :jobs="jobs" :employmentTypes="employmentTypes" />
                </div>
              </div>
              <div class="flex" v-if="getRecommendedJobs().length > 0">
                <h1>More Jobs</h1>
              </div>
              <div v-if="getMoreJobs().length > 0">
                <div v-for="(jobs, index) in getMoreJobs()" :key="index">
                  <JobCard :jobs="jobs" :employmentTypes="employmentTypes" />
                </div>
              </div>
              <!-- <div v-else>
                <h1 class="text-center text-[#cbcbcb]">No Jobs Found</h1>
              </div> -->
              <!-- <div
                class="bg-white rounded-md p-2 text-[#333333] cursor-pointer"
                v-for="(jobs, index) in jobData"
                :key="index"
              >
              
                <div class="job-container">
                  <div class="flex items-center">
                    <img
                      class="lg:w-[4rem] lg:h-[4rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] rounded-md object-contain"
                      :src="setCompanyImage(jobs.company_logo)"
                      alt=""
                    />
                  </div>
                  <div
                    class="ml-2"
                    @click="goToJobDetails(jobs.id, jobs.expires_at)"
                  >
                    <div class="flex flex-col w-full">
                      <h1 class="font-weight-700 text-sm w-full truncate">
                        {{ jobs.job_title }}
                      </h1>
                      <p class="font-medium text-sm w-full truncate mb-3">
                        {{ jobs.company }}
                      </p>
                      <p class="text-gray-400 font-light text-xs mb-1">
                        {{ jobs.city }},{{ jobs.country }}
                      </p>
                      <div class="flex flex-row items-end mb-1">
                        <div class="flex items-end">
                          <p
                            class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >
                            Min {{ jobs.min_exp }}yrs
                          </p>
                          <span>-</span>
                          <p
                            class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >
                            Max {{ jobs.max_exp }}yrs
                          </p>
                        </div>

                        <span
                          class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >&nbsp; | &nbsp;</span
                        >
                        <p
                          class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                        >
                          {{ setEmploymentType(jobs.employment) }}
                        </p>
                        <span
                          class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                          >&nbsp; | &nbsp;</span
                        >
                        <p
                          class="text-black font-light lg:text-xs md:text-xs text-[0.639rem]"
                        >
                          {{ jobs.vacancy }} Position
                        </p>
                      </div>
                      <div
                        v-if="jobs.urgent == true"
                        class="flex flex-row items-center"
                      >
                        <p class="text-black font-light text-xs">Urgent</p>
                        <img
                          :src="getStaticImage('Urgent.svg')"
                          alt=""
                          class="ml-2"
                        />
                      </div>

                    </div>
                  </div>
                  <div class="flex w-full flex-col justify-between items-end">
                    <div v-if="!jobs.bookmark_id?.id" class="p-2">
                      <img
                        src="/src/assets/img/Bookmark.svg"
                        alt=""
                        @click="clickBookmarkJob(jobs.id)"
                      />
                    </div>

                    <div v-if="jobs.bookmark_id?.id" class="p-2">
                      <img
                        src="/src/assets/img/Bookmark-fill.svg"
                        alt=""
                        @click="
                          clickDeleteBookmark(jobs.bookmark_id.id, jobs.id)
                        "
                      />
                    </div>
                    <div
                      class="flex inline-flex items-center"
                      v-if="jobs.job_application.application_id"
                    >
                      <img
                        :src="getStaticImage('Applied.svg')"
                        alt="Applied"
                        class="mr-1"
                      />
                      <p class="text-black font-light text-xs">Applied</p>
                    </div>
                    <div
                      class="flex inline-flex items-center"
                      v-if="!jobs.job_application.application_id"
                    >
                      <img
                        :src="setImageForJobStatus(jobs.expires_at)"
                        alt="call"
                        class="mr-1"
                      />
                      <p
                        class="text-black font-light lg:text-xs md:text-xs text-[0.639rem] leading-3"
                      >
                        {{ setClosingStatus(jobs.expires_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <div v-if="jobData?.length == 0 && !isDataFetching">
              <h1 class="text-center text-[#cbcbcb]">
                No jobs found matching to your search
              </h1>
            </div>
            <div v-if="isDataFetching">
              <h1 class="text-center text-[#cbcbcb]">Loading......</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="lg:block md:block hidden rounded-md"></div> -->
    </div>
  </div>
</template>
<script>
//import { ref, onMounted, onBeforeMount, reactive } from "vue";
import appConstants from "../../appConstants.js";
import JobCard from "./JobCard.vue";
import {
  computed,
  ref,
  watchEffect,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Filter from "./Filter.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import useEmitter from "../../composables/useEmitter.js";

export default {
  name: "JobListChild",
  components: {
    Filter,
    Sidebar,
    Button,
    JobCard,
  },
  data() {
    return {};
  },
  async setup({ emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const visibleLeft = ref(false);
    //let isShowSkeleton = ref(false);
    // let distance = ref(100);
    let position = ref(0);
    let isNextCall = ref(true);
    let isClosedJob = ref(false);
    let isFilterEvent = "jobTypeAll";
    let advancedFilterData = ref({});
    let isDataFetching = ref(false);

    let jobList_scroll_id = "";
    let hasNext_list = false;

    const JobsStatus = {
      ACTIVE: "Active",
      CLOSED: "Closed",
      CLOSINGSOON: "Closing Soon",
      APPLIED: "Applied",
    };
    const jobType = appConstants.jobType;
    const $emitter = useEmitter();
    let isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    let jobData = computed(() => store.getters["jobs/getter_jobListData"]);

    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );
    let isUnauthorizedId = computed(
      () => store.getters["jobs/getter_unauthorizedBookmarkId"]
    );
    /*PAGINATION */
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 20,
    });

    var supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    var wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    document.onscroll = function () {
      let pos = getVerticalScrollPercentage(document.body);
      position.value = Math.round(pos);
      // console.log("position =>", position.value);
    };

    function getVerticalScrollPercentage(elm) {
      var p = elm.parentNode;
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      );
    }
    onBeforeMount(() => {
      let obj = {
        page: 1,
        jobsData: null,
      };
      store.commit("jobs/commit_jobListData", obj);
      if (isUserLoggedIn.value) {
        if (route.query.isFromBookMark) {
          let decryptedId = atob(route.query.bookmarkFor);
          store
            .dispatch("jobs/action_saveBookmarkJob", decryptedId)
            .then((res) => {
              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: "Bookmarked Job successfully",
                life: 3000,
              });
              const url = `/${appConstants.routes.JOBS}`;
              window.history.pushState({}, "", url);
              // router.replace(`/${appConstants.routes.JOBS}`);
              //store.commit("jobs/commit_unauthorizedBookmarkId");
            });
        } else {
          load();
        }
      } else {
        const url = `/${appConstants.routes.JOBS}`;
        window.history.pushState({}, "", url);
        return;
      }
    });
    // load();
    // isShowSkeleton.value = true;
    let isFetchingNewData = false;
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          if (isFilterEvent == jobType.ALL) {
            load();
          } else if (isFilterEvent == jobType.APPLIED) {
            clickApplied();
          } else if (isFilterEvent == jobType.BOOKMARKED) {
            clickBookmark();
          } else if (isFilterEvent == jobType.ADVANCED) {
            clickAdvanced(advancedFilterData.value);
          }
        }
      }
    });

    let getter_previousUrl = computed(
      () => store.getters["login/getter_previousUrl"]
    );
    //console.log(getter_previousUrl._value);
    let getter_scrollBarPosition = computed(
      () => store.getters["jobs/getter_scrollBarPosition"]
    );

    async function load() {
      // if (!isNextCall.value) {
      //   return;
      // }
      // isDataFetching.value = true;
      // args.offset = (args.page - 1) * args.limit;
      // try {
      //   await store.dispatch("jobs/action_getJobListData", args).then((res) => {
      //     isFetchingNewData = false;
      //     args.page = res.currentPage + 1;
      //     if (res.next == null) {
      //       isNextCall.value = false;
      //       isDataFetching.value = false;
      //     }
      //     getMoreJobs();
      //     getRecommendedJobs();
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
      if (!isNextCall.value) {
        return;
      }
      isDataFetching.value = true;

      let arg_value = {
        limit: 20,
        scroll_id: jobList_scroll_id,
      };

      try {
        await store
          .dispatch("jobs/action_getJobListData", arg_value)
          .then((res) => {
            isFetchingNewData = false;
            args.page = res.currentPage + 1;
            if (res.next == null) {
              isNextCall.value = false;
              isDataFetching.value = false;
            }
            getMoreJobs();
            getRecommendedJobs();
          });
      } catch (error) {
        console.log(error);
      }
    }
    function getRecommendedJobs() {
      let recommendedJobs = [];
      for (let i = 0; i < jobData.value.length; i++) {
        if (jobData.value[i].is_recommended == true) {
          recommendedJobs.push(jobData.value[i]);
        }
      }
      return recommendedJobs;
    }
    function getMoreJobs() {
      let moreJobs = [];
      for (let i = 0; i < jobData.value.length; i++) {
        if (jobData.value[i].is_recommended != true) {
          moreJobs.push(jobData.value[i]);
        }
      }
      return moreJobs;
    }
    async function getEmploymentType() {
      await store.dispatch("dropdown/action_getEmploymentType").then((res) => {
        //console.log("data", res);
      });
    }
    function filterAllJob(eventData) {
      isFilterEvent = eventData.eventName;
      advancedFilterData.value = eventData.filterQuery;
      //console.log("eventData", isFilterEvent);
      if (isFilterEvent == jobType.ALL) {
        //console.log("if all ");
        let obj = {
          page: 1,
          jobsData: null,
        };
        store.commit("jobs/commit_jobListData", obj);
        isNextCall.value = true;
        args.page = 1;
        args.limit = 20;
        load();
      } else if (isFilterEvent == jobType.APPLIED) {
        isDataFetching.value = true;
        //console.log("in if previous")
        let obj = {
          page: 1,
          jobsData: null,
        };
        store.commit("jobs/commit_jobListData", obj);
        //console.log("if apply");
        isNextCall.value = true;
        args.page = 1;
        args.limit = 20;

        clickApplied();
      } else if (isFilterEvent == jobType.BOOKMARKED) {
        //console.log("in if previous")
        let obj = {
          page: 1,
          jobsData: null,
        };
        store.commit("jobs/commit_jobListData", obj);
        //console.log("if bookmark");
        isDataFetching.value = true;
        isNextCall.value = true;
        args.page = 1;
        args.limit = 20;

        clickBookmark();
      } else if (isFilterEvent == jobType.ADVANCED) {
        isDataFetching.value = true;
        isNextCall.value = true;
        args.page = 1;
        args.limit = 20;
        clickAdvanced(advancedFilterData.value);
      }
    }
    async function clickAdvanced(filterData) {
      // console.log("filter and args", filterAndArgs);
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;
      let filterAndArgs = {
        data: filterData,
        args: args,
      };

      try {
        await store
          .dispatch("jobs/action_getAdvancedFiltredJobs", filterAndArgs)
          .then((res) => {
            isFetchingNewData = false;
            //isShowSkeleton.value = false;
            args.page = res.currentPage + 1;
            if (res.next == null) {
              isNextCall.value = false;
            }
            isDataFetching.value = false;
          });
      } catch (error) {
        console.log(error);
      }
    }
    async function clickApplied() {
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;

      try {
        await store.dispatch("jobs/action_getAppliedJobs", args).then((res) => {
          isFetchingNewData = false;
          // isShowSkeleton.value = false;
          args.page = res.currentPage + 1;
          if (res.next == null) {
            isNextCall.value = false;
          }
          isDataFetching.value = false;
        });
      } catch (error) {
        console.log(error);
      }
    }
    async function clickBookmark() {
      if (!isNextCall.value) {
        return;
      }

      args.offset = (args.page - 1) * args.limit;

      try {
        await store
          .dispatch("jobs/action_getBookmarkedJobs", args)
          .then((res) => {
            isFetchingNewData = false;
            // isShowSkeleton.value = false;
            args.page = res.currentPage + 1;
            // console.log("next res", res)
            if (res.next == null) {
              isNextCall.value = false;
            }
            isDataFetching.value = false;
          });
        // $state.loaded();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      jobData,
      getRecommendedJobs,
      getMoreJobs,
      getEmploymentType,
      employmentTypes,
      clickApplied,
      clickBookmark,
      visibleLeft,
      supportsPassive,
      wheelOpt,
      wheelEvent,
      getter_previousUrl,
      getter_scrollBarPosition,
      position,
      isFetchingNewData,
      isUnauthorizedId,
      isUserLoggedIn,
      //isShowSkeleton,
      load,
      isNextCall,
      isClosedJob,
      filterAllJob,
      isFilterEvent,
      clickAdvanced,
      advancedFilterData,
      isDataFetching,
    };
  },
};
</script>
<style>
.p-sidebar-left {
  top: 60px !important;
  left: 0;
  width: 20rem;
  height: 100%;
  /* background-color: #343434 !important;
  background: #343434 !important; */
  color: #fff;
}
</style>
