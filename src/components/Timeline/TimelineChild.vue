<template>
  <div class="form-container cls-timelinenew">
    <div class="md:mx-auto antialiased pb-[2rem] h-full">
      <div class="" id="flex">
        <div
          class="mb-3 place-items-center w-full"
          v-for="(timelineObject, index) in getter_timelineData"
          :key="index"
        >
          <div
            v-if="timelineObject.type == timelineType.BUSINESS_LEAD"
            class="w-full"
            id="businesslead"
          >
            <div class="flex justify-between mb-2">
              <span class="timeline-item-title app-text-color-primary">
                {{ timelineObject.title }}
              </span>
              <span
                class="see-all-text mr-1 app-text-color-secondary"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              >
            </div>
            <div>
              <LeadCard :leadData="timelineObject.items"> </LeadCard>
            </div>
          </div>

          <div v-if="timelineObject.type == timelineType.USER" id="user">
            <div class="flex justify-between mb-2">
              <span class="timeline-item-title app-text-color-primary">
                {{ timelineObject.title }}
              </span>
              <span
                class="see-all-text app-text-color-secondary mr-1"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              >
            </div>
            <div
              class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              <UsersCard :details="timelineObject.items"></UsersCard>
            </div>
          </div>
          <div
            v-if="timelineObject.type == timelineType.JOB"
            class="w-full"
            id="job"
          >
            <div class="flex justify-between mb-2">
              <span class="timeline-item-title app-text-color-primary">
                {{ timelineObject.title }}
              </span>
              <span
                class="see-all-text app-text-color-secondary mr-1"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              >
            </div>
            <div class="">
              <JobCardVue
                :jobs="timelineObject.items"
                :employmentTypes="employmentTypes"
              />
            </div>
          </div>
          <div
            v-if="timelineObject.type == timelineType.BUSINESS"
            id="business"
          >
            <div class="flex justify-between mb-2">
              <span class="timeline-item-title app-text-color-primary">
                {{ timelineObject.title }}
              </span>
              <span
                class="see-all-text app-text-color-secondary mr-1"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              >
            </div>
            <div>
              <div
                class="grid lg:grid-cols-3 grid-cols-1 xs:grid-cols-2 gap-3 pb-4"
              >
                <div
                  v-for="(companyData, index) in timelineObject.items"
                  :key="index"
                  class="w-full box-shadow app-bg-white app-text-color-secondary rounded-xl cursor-pointer"
                >
                  <BusinessCard :details="companyData"></BusinessCard>
                </div>
              </div>
            </div>
          </div>

          <div v-if="timelineObject.type == timelineType.CHANNEL" id="channel">
            <div class="flex justify-between mb-2">
              <span class="timeline-item-title app-text-color-primary">
                {{ timelineObject.title }}
              </span>
              <span
                class="see-all-text app-text-color-secondary mr-1"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              >
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ChannelCard :channelData="timelineObject.items"></ChannelCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "/src/appConstants.js";
import { useStore, mapGetters, mapActions } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import LeadCard from "./LeadCard.vue";
import UsersCard from "./UsersCard.vue";
import JobCardVue from "./JobCard.vue";
import BusinessCard from "./BusinessCard.vue";
import ChannelCard from "./ChannelCard.vue";

export default {
  name: "TimelineChildNew",
  components: { LeadCard, UsersCard, JobCardVue, BusinessCard, ChannelCard },
  data() {
    return {};
  },
  async setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let timelineType = appConstants.Timeline_Type;

    await getTimelineData();
    let getter_timelineData = computed(
      () => store.getters["timeline/getter_timelineData"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);

    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );

    async function getTimelineData() {
      await store.dispatch("timeline/action_getTimelineData");
    }
    async function getEmploymentType() {
      await store
        .dispatch("dropdown/action_getEmploymentType")
        .then((res) => {});
    }
    function goToSeeAllPage(data) {
      let obj = {
        api: data.see_all_api,
      };
      store.dispatch("timeline/action_saveTimelineSeeAllApi", obj);
      router.push({
        name: appConstants.routes.TIMELINESEEALL,
        query: { q: data.type },
      });

      //store.commit('timeline/commit_timelineSeeAllApi')
    }
    // function setOrderValue(index) {
    //   // for (let index = 0; index < 5; index++) {
    //   //   return "order:" + index;
    //   // }
    //   if (index == 0) {
    //     return "order:0";
    //   } else if (index == 1) {
    //     return "order:1";
    //   } else if (index == 2) {
    //     return "order:2";
    //   } else if (index == 3) {
    //     return "order:3";
    //   } else if (index == 4) {
    //     return "order:4";
    //   }
    // }
    return {
      getter_timelineData,
      getter_user,
      timelineType,
      employmentTypes,
      getTimelineData,
      getEmploymentType,
      goToSeeAllPage,
      //setOrderValue,
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
