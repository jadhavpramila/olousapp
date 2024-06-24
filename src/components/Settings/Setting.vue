<template>
  <div class="form-container cls-settings">
    <div
      class="lg:grid lg:grid-cols-6 md:grid md:grid-cols-6 app-border rounded-[8px]"
    >
      <div class="lg:col-span-2 md:col-span-2 h-full">
        <div class="lg:hidden md:hidden block">
          <!-- <Button @click="clickVisibleLeft()" class="mb-2 bg-[#333]"
            ><img
              :src="getStaticImage('Setting-Menu-Mobile.svg')"
              alt="FilterIcon"
            />
          </Button> -->
        </div>
        <div class="h-full lg:hidden md:hidden block" v-if="visibleLeft">
          <SettingMenuList></SettingMenuList>
          <!-- <Sidebar
            v-model:visible="visibleLeft"
            :baseZIndex="111"
            class="sidebar-menu"
            :showCloseIcon="false"
          >
            <SettingMenuList></SettingMenuList>
          </Sidebar> -->
        </div>
        <div class="h-full lg:block md:block hidden">
          <SettingMenuList></SettingMenuList>
        </div>

        <!-- <SettingMenuList></SettingMenuList> -->
      </div>
      <div
        class="lg:col-span-4 md:col-span-4 flex w-full h-full bg-[#fff] lg:rounded-tl-none md:rounded-tl-none rounded-tl-lg lg:rounded-bl-none md:rounded-bl-none rounded-bl-lg rounded-tr-lg rounded-br-lg"
      >
        <div
          v-if="isShowPushNotification"
          class="w-full h-full app-border-color"
        >
          <PushNotification></PushNotification>
        </div>
        <div
          v-if="isShowEmailNotification"
          class="w-full h-full app-border-color"
        >
          <EmailNotification></EmailNotification>
        </div>
        <div v-if="isShowPersonalInfo" class="w-full h-full app-border-color">
          <PersonalInfo></PersonalInfo>
        </div>

        <div v-if="isShowChangePassword" class="w-full h-full app-border-color">
          <ChangePassword></ChangePassword>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  ref,
  watchEffect,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";
import SettingMenuList from "./SettingMenuList.vue";
import PushNotification from "./PushNotification.vue";
import PersonalInfo from "./PersonalInfo.vue";
import ChangePassword from "./ChangePassword.vue";
import EmailNotification from "./EmailNotification.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import useEmitter from "../../composables/useEmitter.js";

export default {
  name: "Setting",
  inheritAttrs: false,
  components: {
    SettingMenuList,
    PushNotification,
    PersonalInfo,
    ChangePassword,
    EmailNotification,
    Sidebar,
    Button,
  },

  setup() {
    const router = useRouter();
    let visibleLeft = ref(true);
    const $emitter = useEmitter();
    let isShowPushNotification = ref(false);
    let isShowEmailNotification = ref(false);
    let isShowPersonalInfo = ref(false);
    let isShowChangePassword = ref(false);

    function clickVisibleLeft() {
      // console.log("shgdfuasdj io");
      visibleLeft.value = true;
    }
    onMounted(() => {
      $emitter.on("change_password", () => {
        visibleLeft.value = false;
        isShowChangePassword.value = true;
        isShowPushNotification.value = false;
        isShowEmailNotification.value = false;
        isShowPersonalInfo.value = false;
      });
      $emitter.on("push_notification", () => {
        visibleLeft.value = false;
        isShowPushNotification.value = true;
        isShowChangePassword.value = false;
        isShowEmailNotification.value = false;
        isShowPersonalInfo.value = false;
      });
      $emitter.on("email_notification", () => {
        visibleLeft.value = false;
        isShowEmailNotification.value = true;
        isShowChangePassword.value = false;
        isShowPushNotification.value = false;
        isShowPersonalInfo.value = false;
      });
      $emitter.on("personal_info", () => {
        visibleLeft.value = false;
        isShowPersonalInfo.value = true;
        isShowChangePassword.value = false;
        isShowEmailNotification.value = false;
        isShowPushNotification.value = false;
      });
      $emitter.on("close_menu", () => {
        visibleLeft.value = false;
      });
      $emitter.on("close_form", () => {
        visibleLeft.value = true;
        isShowChangePassword.value = false;
        isShowPushNotification.value = false;
        isShowPersonalInfo.value = false;
        isShowEmailNotification.value = false;
      });
      $emitter.on("close_all_popup", () => {
        visibleLeft.value = true;
        isShowChangePassword.value = false;
        isShowPushNotification.value = false;
        isShowPersonalInfo.value = false;
        isShowEmailNotification.value = false;
      });
    });
    return {
      visibleLeft,
      isShowPushNotification,
      isShowEmailNotification,
      isShowPersonalInfo,
      isShowChangePassword,
      clickVisibleLeft,
    };
  },
};
</script>
<style>
.p-sidebar-left {
  top: 90px !important;
  left: 16px;
  width: 18rem;
  height: 100%;
  background-color: #f2f2f2 !important;
  background: #f2f2f2 !important;
}
.p-sidebar {
  background: #f2f2f2 !important;
}
.p-sidebar .p-sidebar-header {
  padding: 0 !important;
}
</style>
