<template>
  <div class="cls-jobdetails rounded-[8px] form-container">
    <div
      class="job-profile-container app-bg-color-secondary lg:p-4 md:p-4 p-2 rounded-t-lg"
    >
      <div
        class="lg:h-[8.125rem] md:h-[8.125rem] h-[4rem] lg:block md:block hidden"
      >
        <Skeleton height="100%" width="90%" class="rounded-lg"> </Skeleton>
      </div>
      <div
        class="lg:h-[8.125rem] md:h-[8.125rem] h-[4rem] lg:hidden md:hidden block"
      >
        <Skeleton height="100%" width="20%" class="rounded-lg"> </Skeleton>
      </div>
      <div
        class="flex flex-col justify-between lg:ml-2 md:ml-2 ml-0 lg:mt-0 md:mt-0 mt-4"
      >
        <div>
          <h1 class="lg:text-lg md:text-lg text-base text-white font-medium">
            <Skeleton height="1.3rem" width="80%"> </Skeleton>
          </h1>
          <p
            class="lg:text-base md:text-base lg:mt-2 md:mt-2 mt-1 text-sm text-white"
          >
            <Skeleton height="1.15rem" width="40%"> </Skeleton>
          </p>
        </div>
        <div class="lg:mt-0 md:mt-0 mt-1">
          <p class="text-xs text-white font-light">
            <Skeleton height="0.75rem" width="20%"> </Skeleton>
          </p>
          <p class="text-xs text-white font-light mt-1">
            <Skeleton height="0.75rem" width="30%"> </Skeleton>
          </p>
        </div>
      </div>
      <div
        class="flex lg:justify-end md:justify-end w-full lg:mt-0 md:mt-0 mt-4"
      >
        <Skeleton
          height="2rem"
          width="40%"
          class="rounded-md px-2 lg:w-1/2 md:w-1/2 w-full"
        >
        </Skeleton>
      </div>
    </div>
    <hr class="" />
    <div class="bg-[#fff] p-5 rounded-b-lg">
      <div class="flex w-full flex-col">
        <h1 class="text-lg text-black font-medium mb-4">
          <Skeleton height="2rem" width="20%" class="rounded-md px-2">
          </Skeleton>
        </h1>
        <p class="text-sm text-black">
          <Skeleton height="0.75rem" width="100%"> </Skeleton>
        </p>
        <p class="text-sm text-black mt-1.5">
          <Skeleton height="0.75rem" width="80%"> </Skeleton>
        </p>
        <p class="text-sm text-black mt-1.5">
          <Skeleton height="0.75rem" width="60%"> </Skeleton>
        </p>
        <p class="text-sm text-black mt-1.5">
          <Skeleton height="0.75rem" width="40%"> </Skeleton>
        </p>
        <p class="text-sm text-black mt-1.5">
          <Skeleton height="0.75rem" width="80%"> </Skeleton>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import NotFound from "../Layout/NotFound.vue";
import Skeleton from "primevue/skeleton";

export default {
  name: "JobDetailsChild",
  components: { NotFound, Skeleton },
  props: {},
  data() {
    return {};
  },
  setup(props) {},
};
</script>
>
