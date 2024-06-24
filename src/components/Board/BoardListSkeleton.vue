<template>
  <div class="form-container">
    <div class="h-full">
      <!-- TABS -->
      <div class="mb-4">
        <Skeleton class="w-1/6 py-1 bg-[#343434] rounded-md h-4"></Skeleton>
      </div>

      <div class="mt-8 flex flex-row">
        <Skeleton
          class="w-1/6 py-1 bg-[#343434] rounded-md h-5 mr-4"
        ></Skeleton>
        <Skeleton
          class="w-1/6 py-1 bg-[#343434] rounded-md h-5 ml-4"
        ></Skeleton>
      </div>
      <div class="mt-2">
        <Skeleton class="w-full py-1 bg-[#343434] rounded-md h-1"></Skeleton>
      </div>
      <!-- create board skeleton -->
      <!-- <div class="bg-[#333] rounded-lg p-5 mt-4 mb-2">
        <div>
          <p class="text-white text-xl mb-9">
            <Skeleton class="w-1/2 py-1 bg-[#343434] rounded-md h-1"></Skeleton>
            <br /><Skeleton
              class="w-1/2 py-1 bg-[#343434] rounded-md h-1"
            ></Skeleton>
          </p>
          <Skeleton
            class="w-1/6 py-1 bg-[#343434] rounded-md h-8 mr-4"
          ></Skeleton>
        </div>
        <div class="mt-2">
          <Skeleton
            class="w-7 py-1 bg-[#343434] rounded-md h-8 mr-4"
          ></Skeleton>
        </div>
      </div> -->

      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div v-for="index in 4">
          <!-- one -->
          <div class="mt-10 flex flex-col">
            <div class="mb-2">
              <Skeleton
                class="w-20 py-1 bg-[#343434] rounded-md mb-6 mt-2 h-2"
              ></Skeleton>
              <Skeleton
                class="w-60 py-1 bg-[#343434] mb-2 rounded-md h-2"
              ></Skeleton>
            </div>
            <div class="bg-[#343434] rounded-lg px-5 py-3">
              <div class="flex items-center mb-3">
                <Skeleton shape="circle" class="w-10 h-10 py-1 bg-[#343434]" />
                <div class="ml-2">
                  <Skeleton
                    class="w-60 py-1 bg-[#343434] mb-2 rounded-md h-2"
                  ></Skeleton>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-3">
                <div class="col-span-4">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <Skeleton
                        class="h-44 py-1 bg-[#343434] rounded-md"
                      ></Skeleton>
                    </div>
                    <div>
                      <Skeleton
                        class="h-44 py-1 bg-[#343434] rounded-md"
                      ></Skeleton>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-3">
                  <div class="">
                    <Skeleton
                      class="h-20 py-1 bg-[#343434] rounded-md"
                    ></Skeleton>
                  </div>
                  <div>
                    <Skeleton
                      class="h-20 py-1 bg-[#343434] rounded-md"
                    ></Skeleton>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="inline-flex">
                  <Skeleton
                    class="h-4 w-4 py-1 bg-[#343434] rounded-md mr-1"
                  ></Skeleton>
                  <Skeleton
                    class="w-16 py-1 bg-[#343434] mb-2 rounded-md h-2"
                  ></Skeleton>
                </div>
                <div class="ml-2">
                  <div class="inline-flex">
                    <Skeleton
                      class="h-4 w-4 py-1 bg-[#343434] rounded-md mr-1"
                    ></Skeleton>
                    <Skeleton
                      class="w-16 py-1 bg-[#343434] mb-2 rounded-md h-2"
                    ></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- two -->
          <!-- <div class="mt-10 flex flex-col">
          <div class="mb-2">
            <Skeleton
              class="w-20 py-1 bg-[#343434] rounded-md mb-6 mt-2 h-2"
            ></Skeleton>
            <Skeleton
              class="w-60 py-1 bg-[#343434] mb-2 rounded-md h-2"
            ></Skeleton>
          </div>
          <div class="bg-[#343434] rounded-lg px-5 py-3">
            <div class="flex items-center mb-3">
              <Skeleton shape="circle" class="w-10 h-10 py-1 bg-[#343434]" />
              <div class="ml-2">
                <Skeleton
                  class="w-60 py-1 bg-[#343434] mb-2 rounded-md h-2"
                ></Skeleton>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-3">
              <div class="col-span-4">
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <Skeleton
                      class="h-44 py-1 bg-[#343434] rounded-md"
                    ></Skeleton>
                  </div>
                  <div>
                    <Skeleton
                      class="h-44 py-1 bg-[#343434] rounded-md"
                    ></Skeleton>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div class="">
                  <Skeleton
                    class="h-20 py-1 bg-[#343434] rounded-md"
                  ></Skeleton>
                </div>
                <div>
                  <Skeleton
                    class="h-20 py-1 bg-[#343434] rounded-md"
                  ></Skeleton>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="inline-flex">
                <Skeleton
                  class="h-4 w-4 py-1 bg-[#343434] rounded-md mr-1"
                ></Skeleton>
                <Skeleton
                  class="w-16 py-1 bg-[#343434] mb-2 rounded-md h-2"
                ></Skeleton>
              </div>
              <div class="ml-2">
                <div class="inline-flex">
                  <Skeleton
                    class="h-4 w-4 py-1 bg-[#343434] rounded-md mr-1"
                  ></Skeleton>
                  <Skeleton
                    class="w-16 py-1 bg-[#343434] mb-2 rounded-md h-2"
                  ></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
export default {
  name: "BoardListSkeleton",
  components: {
    Skeleton,
  },
};
</script>

<style></style>
