<template>
  <Suspense>
    <template #default>
      <TimelineChild />
    </template>
    <template #fallback>
      <TimelineSkeletonNewVue />
    </template>
  </Suspense>
</template>

<script>
import TimelineSkeletonNewVue from "./Skeleton/TimelineSkeletonNew.vue";
import TimelineChild from "./TimelineChild.vue";

// import PostSkeleton from "../Post/PostSkeleton.vue";

export default {
  name: "Post",
  inheritAttrs: false,
  components: {
    TimelineChild,
    TimelineSkeletonNewVue,
    // PostSkeleton,
  },

  setup(props, context) {},
};
</script>
