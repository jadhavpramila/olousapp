<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
  >
    <div v-for="index in 4" :key="index">
      <div class="w-full">
        <!-- Content -->
        <div class="flex flex-col">
          <div
            class="channel-media rounded-t-lg app-bg-color-secondary flex items-center justify-center"
          ></div>
          <div
            class="h-14 rounded-b-lg app-bg-color-secondary flex flex-col justify-between p-2"
          >
            <div class="flex">
              <div class="w-full flex flex-col items-center">
                <Skeleton
                  width="90%"
                  height="14px"
                  class="rounded-md mb-2"
                ></Skeleton>
                <Skeleton
                  width="80%"
                  height="14px"
                  class="rounded-md"
                ></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "JobListSkeleton",
  components: {
    Skeleton,
  },
};
</script>
<style>
.channel-media {
  height: 153px;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
</style>
