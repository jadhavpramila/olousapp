<template>
  <div class="form-container">
    <div
      class="flex flex-col bg-white app-text-color-secondary lg:px-16 md:px-16 px-8 lg:pt-[2.5rem] md:pt-[2.5rem] pt-[1rem] lg:pb-14 md:pb-14 pb-7 rounded-xl"
    >
      <div class="grid grid-cols-5">
        <div class="lg:col-span-4 md:col-span-4 col-span-5">
          <div class="flex mt-2 items-center">
            <span class="text-lg font-weight-700">{{
              getter_applyJobData.company
            }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-sm font-weight-600">{{
              getter_applyJobData.job_title
            }}</span>
          </div>
          <div class="flex mt-2 items-center">
            <span class="text-sm font-weight-600"
              >{{ getter_applyJobData.city }}, {{ getter_applyJobData.state }},
              {{ getter_applyJobData.country }}</span
            >
          </div>
          <div class="flex flex-col mt-4 items-start">
            <h1 class="text-base font-weight-700">Job Description:</h1>
            <span class="text-sm font-weight-500">{{
              getter_applyJobData.job_description
            }}</span>
          </div>

          <div class="flex flex-col mt-4">
            <span class="text-sm font-weight-500"
              >Olous is an aggregator platform and you will be directly applying
              to</span
            >
            <a
              :href="`mailto:${getter_applyJobData.contact_email}`"
              class="text-sm font-weight-700"
            >
              {{ getter_applyJobData.contact_email }}</a
            >
          </div>
          <div class="flex w-auto mt-4 mb-2">
            <a
              :href="`mailto:${getter_applyJobData.contact_email}`"
              class="flex items-center rounded-full px-4 py-2.5 font-weight-600 bg-[#333] text-white text-sm w-auto"
              >Click To Continue</a
            >
          </div>

          <span class="text-sm font-weight-500"
            >Ensure that your email browser is configured in your device.</span
          >
        </div>
        <div class="lg:block md:block hidden m-auto">
          <img
            src="../../assets/External-Job.gif"
            class="w-full h-auto"
            alt="jobgif"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "../../appConstants.js";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

export default {
  name: "JobExternal",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let email = ref("");
    let jobExternalUrl = ref("");

    onMounted(() => {
      let url = window.location.href;
      //let url = "https://olous.app/jobs/external/LMoclghGTxSF2rmk7IWgDw";
      jobExternalUrl.value = url.substring(url.lastIndexOf("/") + 1);
      //console.log("url", url);
      getApplyJobData();
    });

    let getter_applyJobData = computed(
      () => store.getters["jobs/getter_applyJobData"]
    );

    function getApplyJobData() {
      //let jobid = "OqoJc0CtaxSEe1MPCopNrg";
      store
        .dispatch("jobs/action_getApplyJobData", jobExternalUrl.value)
        .then((res) => {
          // console.log("response", res);
          // if (res.data) {
          //   console.log("response", res.data);
          // }
          // else if (res.isExternalUrl) {
          //   window.open("https://www.google.co.in/", "_self");
          // }
        });
    }

    return {
      getApplyJobData,
      email,
      jobExternalUrl,
      getter_applyJobData,
    };
  },
};
</script>
