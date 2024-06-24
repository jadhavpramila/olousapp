<template>
  <div class="form-container">
    
          <div class="flex-col">
           
            <div class="w-full ">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 "
              >
                <div v-for="index in 12" :key="index">
                  <div class="w-full">
                    <!-- Content -->
                    <div class="flex flex-col">
                      <div
                        class="h-[18rem] sm:h-[13rem] md:h-[13rem] lg:h-[13rem] rounded-t-lg bg-[#464646] flex items-center justify-center"
                      ></div>
                      <div
                        class="h-[7rem] rounded-b-lg bg-[#343434] flex flex-col justify-between p-2"
                      >
                        <div class="flex">
                          <div class="w-full">
                            <Skeleton
                              width="70%"
                              height="1rem"
                              class="rounded-md mb-2"
                            ></Skeleton>
                            <Skeleton
                              width="80%"
                              height="0.75rem"
                              class="rounded-md"
                            ></Skeleton>
                          </div>
                        </div>

                        <div>
                          <Skeleton
                            width="90%"
                            height="0.5rem"
                            class="rounded-md mb-2"
                          ></Skeleton>
                          <Skeleton
                            width="80%"
                            height="0.5rem"
                            class="rounded-md"
                          ></Skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End content -->
            </div>
          </div>
        </div>
     
</template>

<script>
import Skeleton from "primevue/skeleton";
export default {
  name: "ArticleSkeleton",
  components: {
    Skeleton,
  },
  setup() {
    
  },
};
</script>

<style></style>
