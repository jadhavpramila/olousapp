<template>
  <Suspense>
    <template #default>
      <BusinessChild />
      <!-- <BusinessSkeleton/> -->
    </template>
    <template #fallback>
      <BusinessSkeleton />
    </template>
  </Suspense>
</template>

<script>
import BusinessChild from "./BusinessChild.vue";
import BusinessSkeleton from "./BusinessSkeleton.vue";
//import { useRoute } from "vue-router";

export default {
  name: "Business",
  inheritAttrs: false,
  components: {
    BusinessChild,
    BusinessSkeleton,
  },
};
</script>
