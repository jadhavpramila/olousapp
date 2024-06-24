<template>
  <div class="form-container cls-timelinenew">
    <div>
      <div
        class="mb-3 place-items-center w-full"
        v-for="(timelineObject, index) in getter_timelineSeeAllData"
        :key="index"
      >
        <div
          v-if="
            timelineObject.type == timelineType.BUSINESS_LEAD &&
            routeQuery == timelineType.BUSINESS_LEAD
          "
          class="w-full"
          id="businesslead"
        >
          <div class="flex justify-between mb-2">
            <span class="timeline-item-title app-text-color-primary">
              {{ timelineObject.title }}
            </span>
            <!-- <span
                class="see-all-text mr-1 app-text-color-secondary"
                v-if="timelineObject.show_see_all"
                @click="goToSeeAllPage(timelineObject)"
                >See All...</span
              > -->
          </div>
          <div>
            <LeadCard :leadData="timelineObject.items"> </LeadCard>
          </div>
        </div>

        <div
          v-if="
            timelineObject.type == timelineType.USER &&
            routeQuery == timelineType.USER
          "
          id="user"
        >
          <div class="flex justify-between mb-2">
            <span class="timeline-item-title app-text-color-primary">
              {{ timelineObject.title }}
            </span>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <UsersCard :details="timelineObject.items"></UsersCard>
          </div>
        </div>
        <div
          v-if="
            timelineObject.type == timelineType.JOB &&
            routeQuery == timelineType.JOB
          "
          class="w-full"
          id="job"
        >
          <div class="flex justify-between mb-2">
            <span class="timeline-item-title app-text-color-primary">
              {{ timelineObject.title }}
            </span>
          </div>
          <div class="">
            <JobCardVue
              :jobs="timelineObject.items"
              :employmentTypes="employmentTypes"
            />
          </div>
        </div>
        <div
          v-if="
            timelineObject.type == timelineType.BUSINESS &&
            routeQuery == timelineType.BUSINESS
          "
          id="business"
        >
          <div class="flex justify-between mb-2">
            <span class="timeline-item-title app-text-color-primary">
              {{ timelineObject.title }}
            </span>
          </div>
          <div>
            <div
              class="grid lg:grid-cols-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 pb-4"
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

        <div
          v-if="
            timelineObject.type == timelineType.CHANNEL &&
            routeQuery == timelineType.CHANNEL
          "
          id="channel"
        >
          <div class="flex justify-between mb-2">
            <span class="timeline-item-title app-text-color-primary">
              {{ timelineObject.title }}
            </span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <ChannelCard :channelData="timelineObject.items"></ChannelCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "/src/appConstants.js";
import { useStore, mapGetters, mapActions } from "vuex";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import LeadCard from "./LeadCard.vue";
import UsersCard from "./UsersCard.vue";
import JobCardVue from "./JobCard.vue";
import BusinessCard from "./BusinessCard.vue";
import ChannelCard from "./ChannelCard.vue";

export default {
  name: "TimelineSeeAllChild",
  components: {
    LeadCard,
    UsersCard,
    JobCardVue,
    BusinessCard,
    ChannelCard,
  },
  data() {
    return {};
  },
  async setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let timelineType = appConstants.Timeline_Type;
    let routeQuery = ref();

    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_timelineSeeAllData = computed(
      () => store.getters["timeline/getter_timelineSeeAllData"]
    );
    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );
    await getUserType();

    async function getUserType() {
      routeQuery.value = route.query.q;
    }
    // onMounted(() => {
    //   //console.log("route.query =>", route.query.q);
    // });
    return {
      getter_user,
      timelineType,
      getter_timelineSeeAllData,
      employmentTypes,
      routeQuery,
    };
  },
};
</script>
<style>
.cls-timelinenew {
  max-width: 767px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
