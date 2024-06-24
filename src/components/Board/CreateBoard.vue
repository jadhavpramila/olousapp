<template lang="">
  <div class="flex justify-center w-full">
    <!-- input for search -->
    <!-- {{ getter_searchString }} -->
    <div class="grid grid-cols-1 w-1/2">
      <div class="flex flex-col bg-[#000] mt-10 rounded-3xl px-16 py-10">
        <h1 class="font-size-30 text-white font-medium text-center mb-8">
          Create Board
        </h1>
        <div class="grid grid-cols-1 flex-col mb-3">
          <label for="BoardName" class="form-label">Board Name</label>
          <input type="text" class="form-control" />
        </div>
        <div class="grid grid-cols-1 flex-col">
          <label for="Description" class="form-label"
            >Description (Optional)</label
          >
          <input type="text" class="form-control" />
        </div>
        <div class="flex mt-11 justify-between">
          <div class="inline-flex">
            <label class="switch">
              <input type="checkbox" checked />
              <span class="slider round"></span>
            </label>
            <label for="private" class="form-label">
              Private<br /><small>Only you can see this board</small></label
            >
          </div>
          <div>
            <button class="btn">Done</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ad from "/src/components/Ads/Ad.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "BoardDetails",
  components: {},
  // props: ["query"],
  computed: {
    ...mapGetters("board", ["getter_boardData"]),
    ...mapMutations("board", ["commit_boardData"]),
  },
  mounted() {},
  unmounted() {},
  data() {
    return {};
  },
};
</script>

<!--<style scoped>
@import url("https://css.gg/more-vertical.css");
</style>-->
