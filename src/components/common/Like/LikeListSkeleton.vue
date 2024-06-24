<template>
  <div
    class="fixed z-50 inset-0 p-3"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block m-auto align-bottom bg-[#f2f2f2] rounded-xl text-left overflow-hidden shadow-xl transform transition-all mt-8 sm:align-middle lg:max-w-2xl w-full"
      >
        <div class="lg:px-3 lg:py-2 py-2 px-2">
          <!-- top section -->
          <div class="flex grid grid-cols-12 lg:gird-cols-1 w-full">
            <div
              class="flex justify-center w-full mt-1 pt-2 items-center col-span-11"
            >
              <!-- Stars -->
              <Skeleton
                width="15%"
                height="2.3rem"
                class="mb-2 rounded-md"
              ></Skeleton>
            </div>
            <div class="flex justify-end col-span-1">
              <button
                class="bg-[#ffffff] rounded-full h-6"
                type="submit"
                @click="close()"
              >
                <img class="h-7" src="../../../assets/Close-Black.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="lg:px-5 lg:pb-4 sm:pb-4 sm:px-6 max-h-[21.5rem] overflow-auto list"
        >
          <!-- list section -->
          <div class="pt-1 text-black">
            <!-- first user -->
            <div class="rounded-lg">
              <div class="custom-skeleton">
                <div class="p-2" v-for="index in numberOfLikes" :key="index">
                  <div class="flex items-center">
                    <Skeleton
                      shape="circle"
                      size="3rem"
                      class="mr-2"
                    ></Skeleton>
                    <div style="flex: 1">
                      <Skeleton
                        width="40%"
                        height="1rem"
                        class="mb-2 rounded-md"
                      ></Skeleton>
                      <Skeleton
                        width="60%"
                        height="0.75rem"
                        class="rounded-md"
                      ></Skeleton>
                    </div>
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
import { onMounted } from "vue";

export default {
  name: "LikeListSkeleton",
  props: {
    numberOfLikes: Number,
  },
  components: {
    Skeleton,
  },
  setup(props, { emit }) {
    let numberOfLikes = props.numberOfLikes;
    onMounted(() => {
      if (numberOfLikes > 10) {
        numberOfLikes = 10;
      }
    });
    function close() {
      emit("close");
    }
    return {
      close,
    };
  },
};
</script>
<style scoped>
.list::-webkit-scrollbar {
  width: 10px;
  background-color: #f2f2f2;
}

.list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #afafaf;
}
.left-popup {
  margin-left: -214px !important;
}
@media only screen and (max-width: 600px) {
  .left-popup {
    margin-left: 0px !important;
  }
}
</style>
