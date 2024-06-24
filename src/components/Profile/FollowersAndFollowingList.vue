<template>
  <Suspense>
    <template #default>
      <FollowersAndFollowingListChild />
    </template>
    <template #fallback>
      <FollowersAndFollowingListSkeleton />
    </template>
  </Suspense>
</template>
<script>
import FollowersAndFollowingListChild from "../Profile/FollowersAndFollowingListChild.vue";
import FollowersAndFollowingListSkeleton from "../Profile/FollowersAndFollowingListSkeleton.vue";

export default {
  name: "FollowersAndFollowingList",
  components: {
    FollowersAndFollowingListChild,
    FollowersAndFollowingListSkeleton,
  },
  setup() {
    return {};
  },
};
</script>
