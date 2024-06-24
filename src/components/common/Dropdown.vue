<template>
  <Button
    class="bg-[#fff]"
    type="button"
    label="Toggle"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    <img src="../../assets/img/Kebab.svg" class=""
  /></Button>
  <Menu
    id="overlay_menu"
    ref="menu"
    :model="dataDropdown"
    @click="clickLink"
    :popup="true"
  />
  <!-- <div v-for="(item, index) in data" :key="index">
    <a
      @click="clickLink(item.id)"
      class="text-xs p-3 cursor-pointer"
      :class="roundedClass(index)"
      >{{ item.display_name }}
    </a>
  </div> -->
  <Dialog
    header="Confirmation"
    v-model:visible="displayConfirmation"
    :style="{ width: '350px' }"
    :modal="true"
    class="rouned-md"
  >
    <div class="confirmation-content flex items-center">
      <span class="lg:text-base md:text-base text-sm"
        >Are you sure you want to delete this post?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        @click="noDeleteRecord"
        class="p-button-text lg:text-base md:text-base text-sm"
      />
      <Button
        label="Yes"
        @click="deleteRecord"
        class="p-button-text lg:text-base md:text-base text-sm"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import Menu from "primevue/menu";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  name: "Dropdown",
  components: {
    Menu,
    Button,
    Dialog,
  },
  inheritAttrs: false,
  props: {
    dataDropdown: Array,
  },
  data() {
    return {
      items: this.dataDropdown,
      displayConfirmation: false,
    };
  },
  methods: {
    clickLink(event) {
      let value = event.target.innerText;
      // console.log(event.target.innerText);
      if (value == "Delete") {
        // console.log("in if");
        this.displayConfirmation = true;
      } else {
        this.$emit("selected_dropdown_item", value);
      }
    },
    noDeleteRecord() {
      this.displayConfirmation = false;
    },
    deleteRecord() {
      this.displayConfirmation = false;
      let value = "Delete";
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
    toggle(event) {
      this.$refs.menu.toggle(event);
      //console.log(this.dataDropdown);
    },
    save() {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Data Saved",
        life: 3000,
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
