<template>
  <div class="lead" v-if="leadData">
    <div class="lead-box" v-for="(lead, index) in leadData" :key="index">
      <div
        class="grid grid-cols-9 px-5 py-3 mb-3 cursor-pointer"
        @click="goToLeadDetailsPage(lead.encrypted_id)"
      >
        <!-- <div class="col-span-1">
          <div class="lead-box-img">
            <img src="../../assets/zameel_steel_logo.svg" alt="" />
          </div>
        </div> -->
        <div class="col-span-7">
          <span class="lead-title">{{ lead.title }}</span>
          <div class="lead-desc">
            <span>
              {{ lead.requirement }}
            </span>
          </div>
          <div class="flex items-center">
            <img
              :src="getStaticImage('location_lead.svg')"
              class="mr-1.5"
              alt="location_lead"
            />
            <span class="lead-location">{{ lead.address }}</span>
          </div>
          <div>
            <span class="lead-company-name">{{ lead.company_name }}</span>
          </div>
        </div>
        <div class="col-span-2 flex justify-end">
          <div class="lock-img-box">
            <img :src="getStaticImage('lock_lead.svg')" alt="lock" class="" />
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

export default {
  name: "LeadCard",
  props: {
    leadData: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    function goToLeadDetailsPage(lead_id) {
      router.push({
        name: appConstants.routes.LEAD,
        params: { lead_id: lead_id },
      });
    }
    return {
      goToLeadDetailsPage,
    };
  },
};
</script>
<style>
.lead-box {
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  background: #ffffff;
  border-radius: 8px;
}
.lead-box-img {
  height: 50px;
  width: 50px;
  display: flex;
  height: 100%;
}
.lead-title {
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.lead-desc {
  font-size: 12px;
  font-weight: normal;
  color: #000;
  height: 35px;
  line-height: 1.25;
}
.lead-location {
  font-size: 12px;
  color: #000;
  font-weight: 600;
}
.lock-img-box {
  width: 40px;
  height: 40px;
  background-color: #e8e8e8;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lead-company-name {
  color: #909090;
  font-size: 12px;
  font-weight: 600;
}
</style>
