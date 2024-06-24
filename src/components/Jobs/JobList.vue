<template>
  <Suspense>
    <template #default>
      <JobListChild />
      <!-- <JobListSkeleton/> -->
    </template>
    <template #fallback>
      <JobListSkeleton />
    </template>
  </Suspense>
</template>

<script>
import JobListChild from "./JobListChild.vue";
import JobListSkeleton from "./JobListSkeleton.vue";
//import { useRoute } from "vue-router";

export default {
  name: "JobList",
  inheritAttrs: false,
  components: {
    JobListChild,
    JobListSkeleton,
  },

  //   setup(props, context) {
  //     const route = useRoute();

  //     function getCompanySlug() {
  //       return route.params.slug;
  //     }

  //     return {
  //       getCompanySlug,
  //     };
  //   },
};
</script>
