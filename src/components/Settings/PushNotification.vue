<template>
  <div class="block flex items-center justify-end lg:hidden md:hidden p-2">
    <img
      :src="getStaticImage('Setting-Menu-Close.svg')"
      alt=""
      @click="clickCloseForm()"
    />
  </div>
  <div class="flex p-5 w-full cls-pushNotification">
    <div class="flex w-full">
      <ul class="w-full">
        <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]">
            Curated Headlines</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Posts from Followers or Curated</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Comments & Likes on your posts</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Following and Followers</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]">Jobs Alert</span>
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, reactive, watchEffect } from "vue";
import useEmitter from "../../composables/useEmitter.js";

export default {
  name: "PushNotification",
  inheritAttrs: false,
  components: {},

  setup() {
    const $emitter = useEmitter();

    function clickCloseForm() {
      $emitter.emit("close_form");
      //router.push({ name: appConstants.display_route_Name.CHANGEPASSWORD });
    }
    return {
      clickCloseForm,
    };
  },
};
</script>
