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
        class="inline-block m-auto align-bottom bg-[#f2f2f2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl sm:w-full left-popup"
      >
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center p-5">
          <div class="text-center">
            <div class="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
              <div class="flex">
                <div class="flex-1 text-sm flex items-end">
                  <h3
                    class="text-lg leading-6 font-medium text-black mb-5"
                    id="modal-title"
                  >
                    Create Post
                  </h3>
                </div>
                <div class="flex-1 text-right text-5xl">
                  <button
                    class="m-4 bg-[#ffffff] rounded-full"
                    type="submit"
                    @click="close()"
                  >
                    <img src="../../assets/Close-Black.svg" alt="" />
                  </button>
                </div>
              </div>

              <div class="flex bg-[#ffffff] w-96">
                <div class="relative w-12 h-12">
                  <img
                    class="rounded-full border border-gray-100 shadow-sm"
                    src="https://randomuser.me/api/portraits/women/81.jpg"
                    alt="user image"
                  />
                  <!-- <span class="text-black">Diana Devis</span> -->
                </div>
                <span class="relative text-black font-size-18 p-2"
                  >Diana Devis</span
                >
              </div>
              <div class="flex flex-col mt-3">
                <div class="flex space-x-2 flex-col mb-5">
                  <textarea
                    class="text-black p-2 bg-[#f2f2f2]"
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
              </div>
              <div class="flex space-x-2 flex-col">
                <div class="col-md-12 text-center inline">
                  <div class="box-border h-48 w-48 bg-[#afafaf]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4r p-5">
          <div class="grid grid-cols-5 lg:gap-4 gap-2">
            <div class="col-span-4 text-black">
              <!-- <div class="grid grid-cols-5 lg:gap-4 gap-2"> -->
              <div class="col-span-3 object-left">
                <div class="inline-block mr-6 font-size-10 text-center">
                  <!-- <img
                    src="../../assets/Image _ 2.svg"
                    class="h-9 mx-auto"
                    alt=""
                  /> -->
                  <p>Images</p>
                </div>
                <div class="inline-block mr-7 font-size-10 text-center">
                  <img
                    src="../../assets/Video.svg"
                    class="h-9 mx-auto"
                    alt=""
                  />
                  <p>Video</p>
                </div>
                <div class="inline-block mr-7 font-size-10 text-center">
                  <img
                    src="../../assets/Documents.svg"
                    class="h-9 mx-auto"
                    alt=""
                  />
                  <p>Documents</p>
                </div>
                <div class="inline-block mr-7 font-size-10 text-center">
                  <img
                    src="../../assets/Library.svg"
                    class="h-9 mx-auto"
                    alt=""
                  />
                  <p>Library</p>
                </div>
                <!-- <div class="inline-block mr-7 font-size-10 text-center">
                  <img src="../../assets/Jobs.svg" class="h-9 mx-auto" alt="" />
                  <p>Jobs</p>
                </div> -->
              </div>
              <!-- </div> -->
            </div>
            <div>
              <button
                class="btn my-1 lg:text-lg text-sm p-2 w-full btn-inputeControlHeight bg-[#000000] text-[#f2f2f2]"
                type="submit"
                @click="close()"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePostPopup",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.outline {
  border: 1px solid #f2f2f2;
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
