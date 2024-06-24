<template>
  <div v-for="(item, index) in data" :key="index">
    <a
      @click="clickLink(item.id)"
      class="text-xs p-3 cursor-pointer"
      :class="roundedClass(index)"
      >{{ item.display_name }}
    </a>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  inheritAttrs: false,
  props: {
    data: Array,
  },
  methods: {
    clickLink(value) {
      this.$emit("selected_dropdown_item", value);
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
