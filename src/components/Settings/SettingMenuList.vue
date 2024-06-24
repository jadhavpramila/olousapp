<template>
  <div class="cls-settingmenulist h-full">
    <!-- <div class="block flex items-center justify-end lg:hidden md:hidden p-2">
      <img
        :src="getStaticImage('Setting-Menu-Close.svg')"
        alt=""
        @click="clickCloseMenu()"
      />
    </div> -->
    <div
      class="setting-menu-list flex flex-col justify-between lg:p-4 md:p-4 h-full"
    >
      <!-- <div
        class="flex py-3 px-5 bg-[#d1d1d1]"
        style="border-top-left-radius: 10px"
      >
        <div class="w-7 h-7 rounded-full object-cover">
          <img
            src="../../assets/user-dummy.jpg"
            alt="active"
            class="w-7 h-7 rounded-full object-cover"
          />
        </div>
        <div class="ml-2">
          <span class="font-weight-700 text-sm text-[#1c1c1c]"
            >Williams Kolsyn</span
          >
        </div>
      </div> -->
      <div class="flex w-full">
        <ul class="mainmenu w-full">
          <li
            class="w-full flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="shareProfile()"
          >
            <img :src="getStaticImage('Share-Profile-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Share Your Profile</span>
          </li>
          <li
            class="w-full flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="shareOlous()"
          >
            <img :src="getStaticImage('Share-Olous-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Share Olous</span>
          </li>
          <li
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="clickAbout()"
          >
            <img :src="getStaticImage('About-Olous-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">About Olous</span>
          </li>
          <li
            @click="clickChangePassword()"
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
          >
            <img :src="getStaticImage('Change-Password-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Change Password</span>
          </li>

          <li
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="clickNotificationSetting()"
          >
            <img :src="getStaticImage('Notifications-Settings.svg')" alt="" />
            <span class="font-weight-600 text-base">Notification Settings</span>
          </li>
          <div v-if="isShowNotificationSubmenu" class="flex ml-[3.563rem]">
            <ul class="submenu">
              <!-- <li class="cursor-pointer py-2" @click="clickPushNotification()">
                <span
                  class="text-sm text-[#464646] font-weight-500 active:font-weight-600"
                  >Push Notifications</span
                >
              </li> -->
              <li class="cursor-pointer py-2" @click="clickEmailNotification()">
                <span
                  class="text-sm text-[#464646] font-weight-500 active:font-weight-600"
                  >Email Notifications</span
                >
              </li>
            </ul>
          </div>
          <li
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="clickAccount()"
          >
            <img :src="getStaticImage('Account-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Account</span>
          </li>
          <div v-if="isShowAccountSubmenu" class="flex ml-[3.563rem]">
            <ul class="submenu">
              <li class="cursor-pointer py-2" @click="clickPersonalInfo()">
                <span
                  class="text-sm text-[#464646] font-weight-500 active:font-weight-600"
                  >Personal Info</span
                >
              </li>
              <li class="cursor-pointer py-2" @click="clickdeleteAccount()">
                <span
                  class="text-sm text-[#464646] font-weight-500 active:font-weight-600"
                  >Delete Account</span
                >
              </li>
            </ul>
          </div>
          <li
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="clickPrivacyPolicy()"
          >
            <img :src="getStaticImage('Privacy-Policy-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Privacy Policy</span>
          </li>
          <li
            class="flex items-center space-x-2 p-2 border-b-[1px] cursor-pointer"
            @click="clickTermsConditions()"
          >
            <img :src="getStaticImage('Terms-Conditions-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Terms & Conditions</span>
          </li>
          <li
            @click="clickConfirm()"
            class="flex items-center space-x-2 p-2 cursor-pointer"
          >
            <img :src="getStaticImage('Sign-Out-Setting.svg')" alt="" />
            <span class="font-weight-600 text-base">Sign Out</span>
          </li>
        </ul>
      </div>
      <!-- <div class="flex">
        <ul class="mainmenu">
        
        </ul>
      </div> -->
    </div>
    <!-- DELETE ACCOUNT -->
    <div class="resons-overlay" :style="{ display: popupDisplay }">
      <div class="flex justify-center lg:pt-5 md:pt-5 p-4">
        <div class="flex w-full justify-center lg:mt-5 md:mt-5 mt-2">
          <div class="grid grid-cols-5">
            <div class="lg:block md:block hidden"></div>
            <div
              class="col-span-5 md:col-span-3 lg:col-span-5 flex flex-col p-5 bg-white rounded-2xl"
            >
              <div class="" v-if="isShow">
                <div class="mb-4 flex justify-between">
                  <span
                    class="app-text-color-secondary text-base font-weight-700"
                    >It's sad to see you leave :( <br />
                    Can we know why?
                  </span>
                  <button class="flex" type="submit" @click="closeForm()">
                    <img
                      :src="getStaticImage('Setting-Menu-Close.svg')"
                      alt="Close"
                    />
                  </button>
                </div>

                <div class="flex flex-col mt-5">
                  <!-- <ul>
                    <li class="p-3">
                      <div
                        class="field-checkbox grid grid-cols-9 gap-2 items-start"
                      >
                        <div>
                          <Checkbox
                            v-model="reason"
                            :value="deleteAccountReason.NOT_FROM_CONSTRUCTION"
                            name="reason"
                          />
                        </div>
                        <div class="col-span-8 mt-[-0.25rem]">
                          <label
                            for="binary"
                            class="app-text-color-secondary text-sm font-weight-600"
                            >I am not from Construction Industry</label
                          >
                        </div>
                      </div>
                    </li>
                    <li class="p-3">
                      <div class="field-checkbox">
                        <Checkbox
                          v-model="reason"
                          :value="deleteAccountReason.NOT_SATISFIED"
                          name="reason"
                        />
                        <label
                          for="binary"
                          class="app-text-color-secondary text-sm font-weight-600 ml-2"
                          >I am not satisfied with Olous</label
                        >
                      </div>
                    </li>
                    <li class="p-3">
                      <div class="field-checkbox">
                        <Checkbox
                          v-model="reason"
                          :value="deleteAccountReason.FACING_BUGS"
                          name="reason"
                        />
                        <label
                          for="binary"
                          class="app-text-color-secondary text-sm font-weight-600 ml-2"
                          >I am facing bugs</label
                        >
                      </div>
                    </li>
                    <li class="p-3">
                      <div class="field-checkbox">
                        <Checkbox
                          v-model="reason"
                          :value="deleteAccountReason.OTHER"
                          name="reason"
                        />
                        <label
                          for="binary"
                          class="app-text-color-secondary text-sm font-weight-600 ml-2"
                          >Other</label
                        >
                      </div>
                    </li>
                  </ul> -->
                  <div class="flex py-2 pr-2 field-radiobutton">
                    <RadioButton
                      name="reason"
                      inputId="notConstruction"
                      :value="deleteAccountReason.NOT_FROM_CONSTRUCTION"
                      v-model="reason"
                      inputClass="scale-150"
                    />
                    <label
                      for="notConstruction"
                      class="app-text-color-secondary ml-4"
                    >
                      I am not from Construction Industry</label
                    >
                  </div>

                  <div class="flex py-2 pr-2 field-radiobutton">
                    <RadioButton
                      name="reason"
                      inputId="reason2"
                      :value="deleteAccountReason.NOT_SATISFIED"
                      v-model="reason"
                      inputClass="scale-150"
                    />
                    <label for="reason2" class="app-text-color-secondary ml-4">
                      I am not satisfied with Olous</label
                    >
                  </div>
                  <div class="flex py-2 pr-2 field-radiobutton">
                    <RadioButton
                      name="reason"
                      inputId="reason3"
                      :value="deleteAccountReason.FACING_BUGS"
                      v-model="reason"
                      inputClass="scale-150"
                    />
                    <label for="reason3" class="app-text-color-secondary ml-4">
                      I am facing bugs</label
                    >
                  </div>
                  <div class="flex py-2 pr-2 field-radiobutton">
                    <RadioButton
                      name="reason"
                      inputId="reason4"
                      :value="deleteAccountReason.OTHER"
                      v-model="reason"
                      inputClass="scale-150"
                    />
                    <label for="reason4" class="app-text-color-secondary ml-4">
                      Other</label
                    >
                  </div>
                </div>
                <span v-if="!isReasonSelected">
                  <p class="font-size-12 mb-2 ml-2 text-red-400">
                    Please select atleast one reason
                  </p>
                </span>
                <div class="mt-5">
                  <span class="app-text-color-secondary text-sm font-weight-600"
                    >Is there anything that we can do to improve and bring you
                    back?</span
                  >
                  <textarea
                    name="comments"
                    cols="40"
                    placeholder="Please enter your comments"
                    class="form-control text-sm"
                    v-model="message"
                    style="min-height: 75px"
                  ></textarea>
                </div>
                <div class="mt-3">
                  <span class="app-text-color-secondary text-sm font-weight-600"
                    >Your request will initiate deletion of Personal and
                    Business (if any) accounts</span
                  >
                </div>
                <div class="flex justify-end items-center">
                  <button @click="clickNext()" class="w-auto px-5 btn">
                    Next
                  </button>
                </div>
              </div>
              <div class="" v-if="!isShow">
                <div class="flex justify-end mb-4">
                  <button class="flex" type="submit" @click="closeForm()">
                    <img
                      :src="getStaticImage('Setting-Menu-Close.svg')"
                      alt="Close"
                    />
                  </button>
                </div>
                <span class="app-text-color-secondary text-sm font-weight-600"
                  >Please enter your account password to delete your
                  account</span
                >
                <div class="flex mt-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password*"
                    class="form-control bg-[#f2f2f2] text-sm"
                    v-model="password"
                    required
                  />
                </div>
                <div class="flex justify-end mt-5">
                  <button @click="deleteAccount()" class="btn w-auto">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="lg:block md:block hidden"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    :showHeader="false"
    v-model:visible="displayConfirmation"
    :style="{ width: '350px' }"
    :modal="true"
    class="rouned-md"
  >
    <div class="form-bg-w p-6">
      <div class="confirmation-content flex items-center">
        <span class="lg:text-base md:text-base text-sm"
          >Are you sure you want to logout?</span
        >
      </div>
      <div class="flex justify-end space-x-4 mt-4">
        <button @click="clickCancel()" class="btn w-24">No</button>
        <button @click="logoutUser()" class="btn w-24" autofocus>Yes</button>
      </div>
    </div>
  </Dialog>
</template>
<script>
import {
  ref,
  onMounted,
  onBeforeMount,
  reactive,
  watchEffect,
  computed,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import Checkbox from "primevue/checkbox";
import {
  getCurrentHostName,
  createUSerProfileURL,
} from "../../common/js/webUrls.js";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import useEmitter from "../../composables/useEmitter.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import { readUserTokenCookie } from "../../common/js/UserToken.js";

export default {
  name: "SettingMenuList",
  inheritAttrs: false,
  components: {
    Checkbox,
    Dialog,
    Button,
    RadioButton,
  },

  setup() {
    let deleteAccountReason = appConstants.delete_account_reasons;
    const router = useRouter();
    const store = useStore();
    const toast = useToast();
    const $emitter = useEmitter();
    let isShowNotificationSubmenu = ref(false);
    let isShowAccountSubmenu = ref(false);
    let isShowDeleteReasons = ref(false);
    let popupDisplay = ref("none");
    let isShow = ref(true);
    let reason = ref();
    let password = ref("");
    let message = ref("");
    let isReasonSelected = ref(true);
    let polling = ref(null);
    let displayConfirmation = ref(false);

    let userdata = computed(() => store.getters["login/getter_user"]);
    let isUserLoggedIn = computed(
      () => store.dispatch["login/getter_isUserLoggedIn"]
    );

    function clickNotificationSetting() {
      if (!isShowNotificationSubmenu.value) {
        isShowNotificationSubmenu.value = true;
      } else {
        isShowNotificationSubmenu.value = false;
      }
    }
    function clickAccount() {
      if (!isShowAccountSubmenu.value) {
        isShowAccountSubmenu.value = true;
      } else {
        isShowAccountSubmenu.value = false;
      }
    }
    function clickAbout() {
      router.push({ name: appConstants.routes.ABOUT });
    }

    function clickPrivacyPolicy() {
      router.push({ name: appConstants.routes.PRIVACYPOLICY });
    }

    function clickTermsConditions() {
      router.push({ name: appConstants.routes.TERMSOFSERVICE });
    }
    function shareOlous() {
      router.push({ name: appConstants.display_route_Name.SETTINGS });
      let host = getCurrentHostName();

      let result = copyTextToClipboard(host);
      //console.log("url", result);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
    }
    function shareProfile() {
      router.push({ name: appConstants.display_route_Name.SETTINGS });
      let host = getCurrentHostName();
      let userSlug;
      if (userdata.value) {
        userSlug = userdata.value.slug;
      }
      let url = createUSerProfileURL(host, userSlug);
      let result = copyTextToClipboard(url);
      //console.log("url", url);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
    }
    function clickdeleteAccount() {
      router.push({ name: appConstants.display_route_Name.SETTINGS });
      $emitter.emit("close_form");
      isReasonSelected.value = true;
      isShowDeleteReasons.value = true;
      popupDisplay.value = "block";
      document.body.style.overflow = "hidden";
    }
    function clickNext() {
      if (reason.value >= 0 && reason.value != null) {
        console.log("value", reason.value);
        isShow.value = false;
        isReasonSelected.value = true;
      } else {
        isReasonSelected.value = false;
      }
    }
    function deleteAccount() {
      let data = {
        password: password.value,
        reason: reason.value,
        message: message.value,
      };
      store.dispatch("setting/action_deleteAccount", data).then((res) => {
        if (res.status == "success") {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Account deleted successfully",
            life: 3000,
          });
          logoutUser();
          //router.push({ name: appConstants.display_route_Name.HOME });
        }
      });
      //console.log("data", data);
    }
    function clickChangePassword() {
      $emitter.emit("change_password");
      router.push({ name: appConstants.display_route_Name.CHANGEPASSWORD });
    }
    function clickPushNotification() {
      $emitter.emit("push_notification");
      router.push({ name: appConstants.display_route_Name.PUSHNOTIFICATION });
    }
    async function clickEmailNotification() {
      const token = readUserTokenCookie();
      // console.log("token", token);
      await store.dispatch("setting/action_getEmailNotificationStatus");
      $emitter.emit("email_notification");
      router.push({ name: appConstants.display_route_Name.EMAILNOTIFICATION });
    }
    function clickPersonalInfo() {
      $emitter.emit("personal_info");
      router.push({ name: appConstants.display_route_Name.PERSONALINFO });
    }

    function clickCloseMenu() {
      $emitter.emit("close_menu");
    }
    function clickConfirm() {
      displayConfirmation.value = true;
    }
    function clickCancel() {
      displayConfirmation.value = false;
    }

    function logoutUser() {
      //stopTimerAPIFetch();
      store.dispatch("login/logout").then(() => {
        router.push({ name: appConstants.routes.HOME });
      });
      // this.logout().then(() => {
      // console.log("after logout");
      // if (
      //   this.$router.currentRoute._value.name ==
      //   appConstants.routes.HOME
      // ) {
      //   //if user on sane URl viewing other users profile
      //   this.$router.go();
      // } else {
      //   this.$router.push({ name: appConstants.routes.HOME });
      // }
      //});
      //this.display = "none";
    }
    // function stopTimerAPIFetch() {
    //   if (polling.value != null) {
    //     clearInterval(polling.value);
    //     polling.value = null;
    //   }
    // }

    // function getUnreadMessageCount() {
    //   if (isUserLoggedIn.value) {
    //     polling.value = setInterval(() => {
    //       store.dispatch("messaging/action_fetchUserTotalUnreadMessageCount");
    //       // .then((res) => {
    //       //   console.log(res);
    //       //   if (res) {
    //       //     this.IsNotify = true;
    //       //     if (this.IsNotify == true) {
    //       //       this.notify();
    //       //     }
    //       //   }
    //       // });
    //     }, 5000);
    //   } else {
    //     return;
    //   }
    // }
    function closeForm() {
      isShow.value = true;
      popupDisplay.value = "none";
      reason.value = null;
      message.value = "";
      password.value = "";

      document.body.style.overflow = "scroll";
    }
    // onMounted(() => {
    //   getUnreadMessageCount();
    // });
    onUnmounted(() => {
      //stopTimerAPIFetch();
    });
    return {
      isShowNotificationSubmenu,
      isShowAccountSubmenu,
      userdata,
      isUserLoggedIn,
      isShowDeleteReasons,
      popupDisplay,
      isShow,
      reason,
      deleteAccountReason,
      password,
      message,
      isReasonSelected,
      polling,
      displayConfirmation,
      clickNotificationSetting,
      clickAccount,
      clickAbout,
      clickPrivacyPolicy,
      clickTermsConditions,
      shareProfile,
      shareOlous,
      clickdeleteAccount,
      clickNext,
      deleteAccount,
      clickChangePassword,
      clickPushNotification,
      clickEmailNotification,
      clickPersonalInfo,
      clickCloseMenu,
      //getUnreadMessageCount,
      //stopTimerAPIFetch,
      logoutUser,
      closeForm,
      clickCancel,
      clickConfirm,
    };
  },
};
</script>
<style>
.resons-overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(112, 112, 112, 0.5);
  z-index: 10;
  cursor: pointer;
}
</style>
