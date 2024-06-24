<template>
  <Suspense>
    <template #default>
      <LikePostListChild :objectId="objectId" @close="close" />
      <!-- <LikeListSkeleton @close="close" :numberOfLikes="numberOfLikes"/> -->
    </template>
    <template #fallback>
      <LikeListSkeleton @close="close" :numberOfLikes="numberOfLikes"/>
    </template>
  </Suspense>
</template>

<script>
import LikePostListChild from "./LikePostListChild.vue";
import LikeListSkeleton from "./LikeListSkeleton.vue";
export default {
  name: "LikePostList",
  inheritAttrs: false,
  components: {
    LikePostListChild,
    LikeListSkeleton,
  },
  props: {
    objectId: String,
    numberOfLikes: Number,
  },
  setup(props, { emit }) {
    function close() {
      emit("close");
    }
    return {
      close,
    };
  },
};
</script>

<style>
</style>