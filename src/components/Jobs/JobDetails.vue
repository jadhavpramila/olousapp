<template>
  <Suspense>
    <template #default>
      <JobDetailsChild :job_id="getJobId()" />
      <!-- <JobListSkeleton/> -->
    </template>
    <template #fallback>
      <JobDetailsSkeleton />
    </template>
  </Suspense>
</template>

<script>
import JobDetailsChild from "./JobDetailsChild.vue";
import JobDetailsSkeleton from "./JobDetailsSkeleton.vue";
import { useRoute } from "vue-router";

export default {
  name: "JobDetails",
  inheritAttrs: false,
  components: {
    JobDetailsChild,
    JobDetailsSkeleton,
  },

  setup(props, context) {
    const route = useRoute();

    function getJobId() {
      //console.log("job id", route.params.job_id)
      return route.params.job_id;
    }

    return {
      getJobId,
    };
  },
};
</script>
