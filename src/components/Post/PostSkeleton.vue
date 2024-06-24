<template>
  <div class="form-container">
    <div class="md:mx-auto text-[#F2F2F2] antialiased pb-[2rem] h-full">
      <div class="mt-10 space-y-[2rem] text-white">
        <div class="space-y-6 md:space-y-0 md:space-x-[1rem] justify-between">
          <div class="flex flex-col">
            <div class="grid lg:grid-cols-6 grid-cols-12 gap-3 pb-4">
              <div class="lg:col-span-4 col-span-12">
                <SinglePostSkeleton></SinglePostSkeleton>
                <div class="flex flex-col mt-5">
                  <Skeleton
                    width="35%"
                    height="0.75rem"
                    class="mb-[1.125rem] rounded-md"
                  ></Skeleton>
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 overflow-auto pb-[2rem] w-full"
                  >
                    <template v-for="index in suggestionCount" :key="index">
                      <div>
                        <Skeleton
                          width="100%"
                          animation="none"
                          class="h-44 rounded-t-xl"
                        ></Skeleton>
                        <div class="h-[5.75rem] bg-[#343434] rounded-b-xl">
                          <div class="w-full h-full pl-2 pb-2 flex">
                            <div class="self-end w-full">
                              <Skeleton
                                width="60%"
                                height="0.75rem"
                                class="rounded-md mb-2"
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
                    </template>
                  </div>
                </div>
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
import SinglePostSkeleton from "./SinglePostSkeleton.vue";
import { useStore } from "vuex";
import { ref, onBeforeMount, computed } from "vue";

export default {
  name: "PostSkeleton",
  components: {
    Skeleton,
    SinglePostSkeleton,
  },

  setup(props, context) {
    const store = useStore();
    let suggestionCount = ref(9);
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );

    onBeforeMount(() => {
      if (!getter_isUserLoggedIn.value) {
        suggestionCount.value = 3;
      }
    });

    return {
      suggestionCount,
    };
  },
};
</script>
