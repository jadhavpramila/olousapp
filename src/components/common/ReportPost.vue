<template>
  <div
    class="fixed z-50 inset-0 p-5 overflow-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
        class="inline-block m-auto align-bottom bg-[#f2f2f2] rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl sm:w-full left-popup"
      >
        <div class="p-5">
          <div class="flex justify-end">
            <img
              src="../../assets/Close-Black.svg"
              @click="close()"
              class="cursor-pointer"
            />
          </div>
          <div class="">
            <p
              class="text-lg text-center leading-6 font-medium text-black mb-5"
            >
              Report Post
            </p>
          </div>
          <div class="flex flex-col items-center text-center lg:px-[4rem]">
            <div
              class="w-full p-2 mr-2 border-current border-2 rounded-xl cursor-pointer mb-5 hover:bg-sky-700"
              @click="select(constant.report_states.NOT_RELATE)"
            >
              <span> Not related to construction Industry </span>
            </div>
            <div
              class="w-full p-2 mr-2 border-current border-2 rounded-xl cursor-pointer mb-5"
              @click="select(constant.report_states.SPAM)"
            >
              <span> Offensive </span>
            </div>
            <div
              class="w-full p-2 mr-2 border-current border-2 rounded-xl cursor-pointer mb-5"
              @click="select(constant.report_states.OFFENSIVE)"
            >
              <span> Spam </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
export default {
  name: "ReportPost",
  data() {
    return {
      constant: appConstants,
    };
  },
  setup(props, { emit }) {
    function select(number) {
      emit("report_post", number);
    }
    function close() {
      emit("close");
    }
    return {
      select,
      close,
    };
  },
  // methods: {
  // close() {
  //   this.$emit("close");
  // },
  // select(number) {
  //   //   console.log(number);
  //   this.$emit("report_post", number);
  // },
  // },
};
</script>

<style></style>
