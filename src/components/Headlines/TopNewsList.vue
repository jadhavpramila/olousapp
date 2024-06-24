<template>
  <Suspense>
    <template #default>
      <TopNewsListChild />
    </template>
    <template #fallback>
      <TopNewsListSkeleton />
    </template>
  </Suspense>
</template>

<script>
import TopNewsListChild from "./TopNewsListChild.vue";
import TopNewsListSkeleton from "./TopNewsListSkeleton.vue";
//import { useRoute } from "vue-router";

export default {
  name: "TopNewsList",
  inheritAttrs: false,
  components: {
    TopNewsListChild,
    TopNewsListSkeleton,
  },
};
</script>
