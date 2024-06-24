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
            Daily Newsletter</span
          >
          <div class="toggle-button">
            <img
              :src="getStaticImage('On-Notification.svg')"
              alt=""
              v-if="isOnNotification"
              @click="setEmailPermission()"
            />
            <img
              :src="getStaticImage('Off-Notification.svg')"
              alt=""
              v-if="!isOnNotification"
              @click="setEmailPermission()"
            />
            <!-- <label class="switch">
              <input
                type="checkbox"
                :checked="
                  EmailNotificationStatus.email_permissions[
                    emailPermisssion.ENGAGEMENT
                  ]
                "
              />
              <span class="slider round"></span>
            </label> -->
          </div>
        </li>
        <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]">Job Alerts</span>
          <div class="toggle-button">
            <img
              :src="getStaticImage('On-Notification.svg')"
              alt=""
              v-if="isOnJobNotification"
              @click="setJobNotificationOnOff()"
            />
            <img
              :src="getStaticImage('Off-Notification.svg')"
              alt=""
              v-if="!isOnJobNotification"
              @click="setJobNotificationOnOff()"
            />
            <!-- <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label> -->
          </div>
        </li>
        <!--  <li class="p-2 border-b-[1px] flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Post Views (100)</span
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
            >Board Views (100)</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 flex border-b-[1px] justify-between">
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
        <li class="p-2 flex border-b-[1px] justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Jobs For You</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 flex border-b-[1px] justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Product News</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li>
        <li class="p-2 flex justify-between">
          <span class="text-sm font-weight-500 text-[#464646]"
            >Business Connects</span
          >
          <div class="toggle-button">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import {
  ref,
  onMounted,
  onBeforeMount,
  reactive,
  watchEffect,
  computed,
} from "vue";
import useEmitter from "../../composables/useEmitter.js";
import { useStore } from "vuex";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";

export default {
  name: "PushNotification",
  inheritAttrs: false,
  components: {},

  setup() {
    const $emitter = useEmitter();
    const store = useStore();
    const toast = useToast();
    let isOnNotification = ref();
    let isOnJobNotification = ref();
    //let checked = ref();
    let emailPermisssion = appConstants.email_category;
    let EmailNotificationStatus = computed(
      () => store.getters["setting/getter_emailNotificationStatus"]
    );
    function clickCloseForm() {
      $emitter.emit("close_form");
    }
    async function setEmailPermission() {
      if (
        EmailNotificationStatus.value.email_permissions[
          emailPermisssion.ENGAGEMENT
        ] == true
      ) {
        let obj = {
          issubscribed: false,
          email_category_id: emailPermisssion.ENGAGEMENT,
        };
        await store
          .dispatch("setting/action_setEmailPermission", obj)
          .then((res) => {
            store.dispatch("setting/action_getEmailNotificationStatus");
            //console.log("in if", res);
            if (res.status === "success") {
              isOnNotification.value = false;
              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: res.message,
                life: 3000,
              });
            }
          });
      } else {
        let obj = {
          issubscribed: true,
          email_category_id: emailPermisssion.ENGAGEMENT,
        };
        await store
          .dispatch("setting/action_setEmailPermission", obj)
          .then((res) => {
            store.dispatch("setting/action_getEmailNotificationStatus");
            if (res.status === "success") {
              isOnNotification.value = true;
              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: res.message,
                life: 3000,
              });
            }
          });
      }
    }
    async function setJobNotificationOnOff() {
      if (
        EmailNotificationStatus.value.email_permissions[emailPermisssion.JOB] ==
        true
      ) {
        let obj = {
          issubscribed: false,
          email_category_id: emailPermisssion.JOB,
        };
        await store
          .dispatch("setting/action_setEmailPermission", obj)
          .then((res) => {
            store.dispatch("setting/action_getEmailNotificationStatus");
            //console.log("in if", res);
            if (res.status === "success") {
              isOnJobNotification.value = false;
              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: res.message,
                life: 3000,
              });
            }
          });
      } else {
        let obj = {
          issubscribed: true,
          email_category_id: emailPermisssion.JOB,
        };
        await store
          .dispatch("setting/action_setEmailPermission", obj)
          .then((res) => {
            store.dispatch("setting/action_getEmailNotificationStatus");
            if (res.status === "success") {
              isOnJobNotification.value = true;
              toast.add({
                severity: appConstants.toast_severity.INFO,
                summary: appConstants.toast_summary.INFO,
                detail: res.message,
                life: 3000,
              });
            }
          });
      }
    }
    onBeforeMount(() => {
      if (
        EmailNotificationStatus.value.email_permissions[
          emailPermisssion.ENGAGEMENT
        ] == true
      ) {
        isOnNotification.value = true;
      } else {
        isOnNotification.value = false;
      }
      if (
        EmailNotificationStatus.value.email_permissions[emailPermisssion.JOB] ==
        true
      ) {
        isOnJobNotification.value = true;
      } else {
        isOnJobNotification.value = false;
      }
    });
    return {
      EmailNotificationStatus,
      emailPermisssion,
      isOnNotification,
      isOnJobNotification,
      // checked,
      clickCloseForm,
      setEmailPermission,
      setJobNotificationOnOff,
    };
  },
};
</script>
