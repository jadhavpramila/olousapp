<template>
  <div class="form-container cls-timelinenew">
    <Suspense>
      <template #default>
        <TimelineSeeAllChildVue />
      </template>
      <template #fallback>
        <TimelineSeeAllSkeletonVue />
      </template>
    </Suspense>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import TimelineSeeAllSkeletonVue from "./Skeleton/TimelineSeeAllSkeleton.vue";
import TimelineSeeAllChildVue from "./TimelineSeeAllChild.vue";

export default {
  name: "TimelineSeeAll",
  components: { TimelineSeeAllChildVue, TimelineSeeAllSkeletonVue },
  data() {
    return {};
  },
  setup() {
    const route = useRoute();

    return {};
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
