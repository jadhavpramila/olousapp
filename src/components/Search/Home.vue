<template>
  <Suspense>
    <template #default>
      <HomeChild />
    </template>
    <template #fallback>
      <HomeSkeleton/>
    </template>
  </Suspense>
</template>

<script>
import HomeChild from "./HomeChild.vue";
import HomeSkeleton from "./HomeSkeleton.vue"

export default {
  name: "Post",
   inheritAttrs: false,
  components: {
    HomeChild,
    HomeSkeleton
  },

};
</script>
