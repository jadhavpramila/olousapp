<template>
  <div class="cls-joblist form-container">
    <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
      <div class="p-2 bg-[#333] rounded-md" v-for="index in 8" :key="index">
        <div class="flex items-center">
          <Skeleton shape="circle" size="3rem" class="mr-2"></Skeleton>
          <div style="flex: 1">
            <Skeleton
              width="50%"
              height="1rem"
              class="mb-2 rounded-md"
            ></Skeleton>
            <Skeleton
              width="80%"
              height="0.75rem"
              class="rounded-md"
            ></Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Skeleton from "primevue/skeleton";
import { onMounted } from "vue";

export default {
  name: "FollowersAndFollowingListSkeleton",

  components: {
    Skeleton,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>
