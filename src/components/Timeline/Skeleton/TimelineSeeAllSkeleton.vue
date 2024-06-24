<template>
  <div class="form-container cls-timelinenew">
    <div class="md:mx-auto antialiased pb-[2rem] h-full">
      <div class="" id="flex">
        <div class="mb-3 place-items-center w-full">
          <div
            v-if="routeQuery == timelineType.BUSINESS_LEAD"
            class="w-full"
            id="businesslead"
          >
            <div class="flex justify-between mb-2">
              <Skeleton
                width="25%"
                height="16px"
                class="mb-1 rounded-lg"
              ></Skeleton
              ><Skeleton
                width="10%"
                height="12px"
                class="mb-1 rounded-lg"
              ></Skeleton>
            </div>

            <div>
              <JobCardSkeletonVue> </JobCardSkeletonVue>
            </div>
          </div>

          <div v-if="routeQuery == timelineType.USER" id="user">
            <div class="flex justify-between mb-2">
              <Skeleton
                width="25%"
                height="16px"
                class="mb-1 rounded-lg"
              ></Skeleton
              ><Skeleton
                width="10%"
                height="12px"
                class="mb-1 rounded-lg"
              ></Skeleton>
            </div>
            <UserCardSkeletonVue></UserCardSkeletonVue>
          </div>
          <div v-if="routeQuery == timelineType.JOB" class="w-full" id="job">
            <div class="flex justify-between mb-2">
              <Skeleton
                width="25%"
                height="16px"
                class="mb-1 rounded-lg"
              ></Skeleton
              ><Skeleton
                width="10%"
                height="12px"
                class="mb-1 rounded-lg"
              ></Skeleton>
            </div>
            <div class="">
              <JobCardSkeletonVue />
            </div>
          </div>
          <div v-if="routeQuery == timelineType.BUSINESS" id="business">
            <div class="flex justify-between mb-2">
              <Skeleton
                width="25%"
                height="16px"
                class="mb-1 rounded-lg"
              ></Skeleton
              ><Skeleton
                width="10%"
                height="12px"
                class="mb-1 rounded-lg"
              ></Skeleton>
            </div>
            <div>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
              >
                <div
                  v-for="index in 12"
                  :key="index"
                  class="w-full app-bg-color-secondary rounded-xl text-[#333333] cursor-pointer p-3"
                >
                  <BusinessCardSkeletonVue></BusinessCardSkeletonVue>
                </div>
              </div>
            </div>
          </div>

          <div v-if="routeQuery == timelineType.CHANNEL" id="channel">
            <div class="flex justify-between mb-2">
              <Skeleton
                width="25%"
                height="16px"
                class="mb-1 rounded-lg"
              ></Skeleton
              ><Skeleton
                width="10%"
                height="12px"
                class="mb-1 rounded-lg"
              ></Skeleton>
            </div>
            <div>
              <ChannelCardSkeletonVue></ChannelCardSkeletonVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JobCardSkeletonVue from "./JobCardSkeleton.vue";
import UserCardSkeletonVue from "./UserCardSkeleton.vue";
import BusinessCardSkeletonVue from "./BusinessCardSkeleton.vue";
import ChannelCardSkeletonVue from "./ChannelCardSkeleton.vue";
import Skeleton from "primevue/skeleton";
import { onMounted, ref } from "vue";
import appConstants from "../../../appConstants";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "TimelineSkeletonNew",
  components: {
    JobCardSkeletonVue,
    UserCardSkeletonVue,
    BusinessCardSkeletonVue,
    ChannelCardSkeletonVue,
    Skeleton,
  },
  setup() {
    const route = useRoute();
    let timelineType = appConstants.Timeline_Type;
    let routeQuery = ref();

    onMounted(() => {
      routeQuery.value = route.query.q;
      //console.log("route.query =>", route.query.q);
    });
    return {
      routeQuery,
      timelineType,
    };
  },
};
</script>
<style>
#flex {
  display: flex;
  flex-direction: column;
}
.cls-timelinenew {
  max-width: 767px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
.see-all-text {
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.timeline-item-title {
  font-size: 14px;
  font-weight: bold;
}
/* #business {
      order: 1 !important;
    }
    #channel {
      order: 2 !important;
    }
    #job {
      order: 3 !important;
    }
    #businesslead {
      order: 4 !important;
    }
    #user {
      order: 5 !important;
    } */
</style>
