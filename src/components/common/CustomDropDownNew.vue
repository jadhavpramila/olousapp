<template>
  <div class="cls-customDrp-new rounded-lg">
    <div
      class="dropdown-content text-gray-900 rounded-lg divide-gray-400 divide-y"
      :style="getBackgroundColor()"
    >
      <div v-for="(item, index) in data" :key="index">
        <a
          @click="clickLink(item.id)"
          class="text-xs p-3 cursor-pointer"
          :class="roundedClass(index)"
          >{{ item.display_name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomDropDownNew",
  inheritAttrs: false,
  props: {
    data: Array,
    bgColor: String,
    bgColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    clickLink(value) {
      this.$emit("selected_dropdown_item", value);
    },

    getBackgroundColor() {
      // return "";
      if (this.bgColor == "") {
        return `background : #ffffff`;
      } else {
        return `background : ${this.bgColor}`;
      }
    },
    roundedClass(index) {
      //console.log(index);
      if (this.data.length == 1) {
        return "hover:rounded-t-lg hover:rounded-b-lg";
      } else if (index == 0) {
        return "hover:rounded-t-lg";
      } else if (index == this.data.length - 1) {
        return "hover:rounded-b-lg";
      } else {
        return "";
      }
    },
  },
};
</script>

<style></style>
