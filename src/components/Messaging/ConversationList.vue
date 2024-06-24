<template>
  <Suspense>
    <template #default>
      <!-- <ConversationListSkeleton /> -->
      <ConversationListChild />
    </template>
    <template #fallback>
      <ConversationListSkeleton />
    </template>
  </Suspense>
</template>

<script>
import ConversationListChild from "./ConversationListChild.vue";
import ConversationListSkeleton from "./ConversationListSkeleton.vue";
export default {
  name: "ConversationList",
  inheritAttrs: false,
  components: {
    ConversationListChild,
    ConversationListSkeleton,
  },
};
</script>

<style></style>
