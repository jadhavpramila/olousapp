<template>
  <div
    class="fixed z-50 top-20 inset-0 overflow-auto"
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
        class="inline-block m-auto align-bottom bg-[#333] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:min-h-[10rem] max-w-2xl max-h-full sm:w-full left-popup"
      >
        <!-- {{ interest_category }} -->
        <!-- {{ tags }} -->
        <div class="px-4 pt-2 pb-4 sm:px-2 sm:pb-4 text-center">
          <div class="text-center">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div class="flex">
                <div class="flex-1 text-sm flex items-end">
                  <h3
                    class="text-lg leading-6 font-medium mb-5"
                    id="modal-title"
                  >
                    Tags
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
              <div class="text-center mb-2">
                <span class="text-sm">Maximum of 6 tags can be selected.</span>
              </div>
              <div class="my-2 text-black">
                <div
                  v-for="(tag, index) in getter_interest"
                  :key="index"
                  class="m-2"
                >
                  <span
                    :class="isInterestSelected(tag)"
                    class="float-left flex items-center p-1.5 m-1 border text-sm rounded-lg text-white cursor-pointer"
                    @click="tagSelected(tag)"
                  >
                    {{ tag.display_string }}
                  </span>
                </div>
              </div>
              <!-- button -->
              <div>
                <button
                  class="btn my-1 lg:text-lg text-sm p-2 w-full btn-inputeControlHeight bg-[#000000] text-[#f2f2f2]"
                  type="submit"
                  @click="done()"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddTags",
  mounted() {
    this.action_getInterest();
  },
  computed: {
    ...mapGetters("dropdown", ["getter_interest"]),
  },
  props: {
    tags: Array,
  },
  data() {
    return {
      interest_category: JSON.parse(JSON.stringify(this.tags)),
      disabled: false,
    };
  },
  methods: {
    ...mapActions("dropdown", ["action_getInterest"]),
    close() {
      this.$emit("close");
    },
    done() {
      this.$emit("tags_selected", this.interest_category);
    },
    isInterestSelected(selectedInterest) {
      var result = this.interest_category.filter(function (el) {
        return el.id == selectedInterest.id;
      });

      if (result.length > 0) {
        return "selected-tag  text-black";
      } else {
        return "";
      }
    },
    tagSelected(id) {
      var result = this.interest_category.filter(function (el) {
        return el.id == id.id;
      });

      if (result.length > 0) {
        // console.log("matched !!", result);
        let arr = this.interest_category;
        let deleteIndex = arr.findIndex((object) => {
          return object.id === id.id;
        });
        // console.log(deleteIndex);
        this.interest_category.splice(deleteIndex, 1);
      } else {
        // console.log("in else");
        if (this.interest_category.length < 6) {
          this.interest_category.push(id);
        }
      }
    },
  },
};
</script>
<style scoped>
.selected-tag {
  background-color: #fff !important;
  color: #121212;
}
</style>
