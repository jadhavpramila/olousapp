<template>
  <Suspense>
    <template #default>
      <SearchChild />
    </template>
    <template #fallback>
      <SearchSkeleton />
    </template>
  </Suspense>
</template>

<script>
import SearchChild from "./SearchChild.vue";
import SearchSkeleton from "./SearchSKeleton.vue";
import { useRoute } from "vue-router";

export default {
  name: "Search",
  inheritAttrs: false,
  components: {
    SearchChild,
    SearchSkeleton,
  },

  setup(props, context) {
    const route = useRoute();
  },
};
</script>
