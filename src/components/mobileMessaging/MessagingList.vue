<template>
  <Suspense>
    <template #default>
      <!-- <MessagingListSkeleton /> -->
      <MessagingListChild />
    </template>
    <!-- <template #fallback>
      <MessagingListSkeleton />
    </template> -->
  </Suspense>
</template>

<script>
// import MessagingListSkeleton from "./MessagingListSkeleton.vue";
import MessagingListChild from "./MessagingListChild.vue";
export default {
  name: "MessagingList",
  inheritAttrs: false,
  components: {
    // MessagingListSkeleton,
    MessagingListChild,
  },
};
</script>

<style></style>
