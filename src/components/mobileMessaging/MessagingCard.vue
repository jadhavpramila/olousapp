<template>
  <div>
    <div v-if="!isInfoMessage()" class="my-[0.625rem] relative">
      <div class="flex flex-row mb-3">
        <div class="flex-shrink-0">
          <div class="flex justify-center">
            <div
              v-if="message.sender_user.profile_image"
              class="lg:w-9 lg:h-9 h-9 w-9"
            >
              <VLazyImage
                class="rounded-full"
                :src="message.sender_user.profile_image"
                alt=""
              />
            </div>
            <div v-else>
              <div
                class="rounded-full text-[#3a3a41] flex lg:w-9 lg:h-9 h-9 w-9 justify-center items-center relative bg-[#c7c7c7] cursor-pointer"
              >
                <span> {{ shortForm() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
        >
          <span
            @click="getUserProfileURL(message.sender_user)"
            class="line-height-1-25 focus-off cursor-pointer text-base font-size-16 font-weight-600 text-[#333] mb-[-0.188rem] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ message.sender_user.first_name }}
            {{ message.sender_user.last_name }}
          </span>
          <!-- <span class="Darshan-Teredesai">
            {{ message.sender_user.first_name }}
            {{ message.sender_user.last_name }}
          </span> -->

          <!-- <a
            :href="getUserProfileURL(message.sender_user)"
            class="text-base font-medium text-[#333] mb-[-0.188rem] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ message.sender_user.first_name }}
            {{ message.sender_user.last_name }}
          </a> -->
          <!-- <a
            :href="getUserProfileURL(message.sender_user.slug)"
            target="_blank"
            class="text-base font-medium text-[#333] mb-[-0.188rem] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ message.sender_user.first_name }}
            {{ message.sender_user.last_name }}
          </a> -->
          <!-- <span
            class="font-light text-[0.625rem] text-[#333] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ message.sender_user.about }}
          </span> -->
        </div>
        <!-- timeing  -->
        <!-- <div class="flex-shrink-0">
          <div class="flex flex-col w-full items-end justify-end h-full">
            <span class="text-xs mb-1 text-[#707070]">{{
              getMessageSentTime()
            }}</span>
          </div>
        </div> -->
      </div>

      <div
        class="select-none"
        @mouseover="openTest(true)"
        @mouseleave="openTest(false)"
        v-if="message.type != enum_message_type.DELETE"
      >
        <!--  @click="onMessageClick()"   -->
        <div
          class="flex relative bg-[#f2f2f2] px-[0.875rem] py-[0.625rem] rounded-lg"
          :style="msgSentByMe()"
          @touchend="onMessageClick()"
          @dblclick="onMessageClick()"
        >
          <div class="rounded-lg w-full h-auto text-sm flex justify-between">
            <p
              :innerHTML="getMessageString()"
              class="overflow-auto break-words pointer-events-none"
            ></p>
          </div>
          <!-- test -->
          <!-- <div v-if="showTest" class="absolute right-0 top-0">
            <span class="p-1 z-10 w-[20px] h-[10px] bg-[#000] text-white">
              Show here !!</span
            >
          </div> -->

          <!-- <span class="ml-2">
            {{ getMessageString() }}
          </span> -->
          <!-- <div class="absolute right-0 bottom-0">
            <img
              v-if="message.sent == true"
              src="../../assets/Green.svg"
              class="h-[10px]"
              alt=""
              srcset=""
            />
            <img
              v-else
              src="../../assets/Red.svg"
              class="h-[10px]"
              alt=""
              srcset=""
            />
          </div> -->
          <!-- <div
            class="right-2 top-[-10px] absolute z-10"
            :style="{ display: message_overlay_display }"
          >
            <div>
              <div
                class="flex cursor-pointer"
                v-if="showDeleteAction"
                @click="onDeleteMessage()"
              >
                <img
                  class="w-8 h-8"
                  :src="getStaticImage('Delete-rounded-bg.svg')"
                />
              </div>
            </div>
          </div> -->

          <div
            v-if="showTest"
            :class="[showDeleteAction ? ' top-[-50px]' : ' top-[-24px]']"
            class="right-2 absolute z-10 rounded-lg absolute z-10 pointer"
          >
            <div @mouseover="openTest(true)" class="p-1 z-10 w-full h-[14px]">
              <ul class="bg-[#c7c7c7] rounded-lg">
                <li
                  :class="[showDeleteAction ? 'border-b-2 border-white' : '']"
                  class="mb-0.5 p-1.5"
                >
                  <span
                    class="flex flex-row cursor-pointer text-sm"
                    @click="copyText(copyMsg)"
                    ><img src="../../assets/DmCopy.svg" />
                    <p class="text-[#333333] pl-0.5">Copy</p>
                  </span>
                </li>
                <li v-if="showDeleteAction" class="mb-0.5 p-1.5">
                  <span
                    class="flex flex-row cursor-pointer text-sm"
                    @click="onDeleteMessage()"
                  >
                    <img src="../../assets/dmTrash.svg" />
                    <p class="text-[#333333] pl-0.5">Trash</p>
                  </span>
                </li>
                <!-- <li>
                  <span
                    title="Delete"
                    class="p-1 cursor-pointer text-sm text-white"
                  >
                    <img src="../../assets/dmTrash.svg" />
                    <p class="text-[#333333] pl-0.5">Delete</p>
                  </span>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 py-1 pr-1">
          <div class="flex flex-col w-full items-end justify-end h-full">
            <span class="text-xs mb-1 text-[#707070]">{{
              getMessageSentTime()
            }}</span>
          </div>
        </div>
      </div>

      <div v-else>
        <div
          class="px-[0.625rem] py-[0.5rem] rounded-lg bg-[#fafafa] text-sm delete-msg"
          :style="msgSentByMe()"
        >
          {{ message.message_str }}
        </div>
        <div class="flex-shrink-0 py-1 pr-1">
          <div class="flex flex-col w-full items-end justify-end h-full">
            <span class="text-xs mb-1 text-[#707070]">{{
              getMessageSentTime()
            }}</span>
          </div>
        </div>
      </div>
      <!-- test -->
      <!-- <div v-if="showTest" class="absolute right-0 bottom-3 pointer">
        <span
          @mouseover="openTest(true)"
          class="p-1 z-10 w-full h-[14px] bg-[#f2f2f2] rounded-lg"
        >
          <span class="p-1 cursor-pointer" @click="one()">😀</span>
          <span class="p-1 cursor-pointer" @click="two()">😁</span>
          <span class="p-1 cursor-pointer" @click="three()">🤩</span>
          <span
            v-if="showDeleteAction"
            class="p-1 cursor-pointer"
            @click="onDeleteMessage()"
            >🔨</span
          >
        </span>
      </div> -->
    </div>
    <div v-else class="">
      <!-- <div> -->
      <div v-if="message.type == enum_message_type.DATE" class="mt-3">
        <Divider align="center">
          <span class="text-xs">{{ message.message_str }}</span>
        </Divider>
      </div>
      <div v-else class="grid justify-items-center rounded-lg h-auto text-sm">
        <span
          class="flex justify-center px-6 py-1 rounded-lg text-xs w-full text-[#707070]"
          >{{ message.message_str }}</span
        >
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";
import VLazyImage from "v-lazy-image";
import appConstants from "../../appConstants.js";
import { useStore } from "vuex";
import {
  copyTextToClipboard,
  replaceNewLineWithBreakLine,
} from "../../common/js/commonFunctions.js";
import { useToast } from "primevue/usetoast";
import {
  createUSerProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";
import Divider from "primevue/divider";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { sendSelectedUserSlugToIOS } from "../../bridge/iosBridge.js";
import { sendSelectedUserSlugToAndroid } from "../../bridge/androidBridge.js";
import { useRouter } from "vue-router";
export default {
  name: "MessagingCard",
  components: {
    VLazyImage,

    Divider,
  },
  props: {
    message: {
      type: Object,
      default: {},
    },
    conversation_id: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const limit = 15;
    const delete_message_before_minutes = 10;

    const message_overlay_display = ref("none");

    let getter_user = computed(() => store.getters["login/getter_user"]);
    let enum_message_type = appConstants.message_type;
    let isRecalculateShowDelete = ref(true);
    let conversation_id = props.conversation_id;
    let conversation_id_encoded = getUUIDtoEncodedString(props.conversation_id);
    let message_id = getUUIDtoEncodedString(props.message.uid);

    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
    let getter_device = computed(() => store.getters["login/getter_device"]);

    let showTest = ref(false);
    let copyMsg = ref();

    const showDeleteAction = computed(() => {
      if (
        props.message.sender_id == getter_user.value.id &&
        isRecalculateShowDelete.value
      ) {
        //user will delete message only within 10 min
        let created_dt = moment.utc(props.message.created_at).local().format();
        let created_dt_after_10_min = moment(created_dt);
        let minutes = moment(new Date()).diff(
          created_dt_after_10_min,
          "minutes"
        );
        if (delete_message_before_minutes > minutes) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

    function getMessageSentTime() {
      let date_time = moment.utc(props.message.created_at).local().format("LT");
      return date_time;
    }

    function shortForm() {
      let initialLetters = "";
      if (Object.keys(props.message.sender_user).length == 0) {
        return "";
      }

      initialLetters =
        props.message.sender_user.first_name.charAt(0).toUpperCase() +
        props.message.sender_user.last_name.charAt(0).toUpperCase();

      return initialLetters;
    }

    function msgSentByMe() {
      if (props.message.sender_id == getter_user.value.id) {
        //return "padding-left: 3.125rem";
        return "background-color : #e6e6e6 !important";
      } else {
        return "";
      }
    }

    function isInfoMessage() {
      if (
        props.message.type == appConstants.message_type.INITIATED_CHAT ||
        props.message.type == appConstants.message_type.DATE ||
        props.message.type == appConstants.message_type.MEMBER_LEFT ||
        props.message.type == appConstants.message_type.MEMBER_REMOVED ||
        props.message.type == appConstants.message_type.MEMBER_ADD ||
        props.message.type == appConstants.message_type.BLOCK ||
        props.message.type == appConstants.message_type.UNBLOCK
      ) {
        return true;
      } else {
        return false;
      }
    }

    function onDeleteMessage() {
      message_overlay_display.value = "none";
      let date = {
        message_id: message_id,
        conversation_id: conversation_id_encoded,
      };
      // console.log("data =>", date);
      // context.emit("setScrollbarToBottom");
      store.dispatch("messaging/action_deleteMessage", date);
      showTest.value = false;
    }

    function getMessageString() {
      let msg = props.message.message_str;
      const urlRegex =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      let urlArray = msg.match(urlRegex);
      if (urlArray != null && urlArray.length > 0) {
        let anchorTag = `<a href='${urlArray[0]}' class='text-blue-600' target='_blank'>${urlArray[0]}</a>`;
        msg = msg.replace(urlArray[0], anchorTag);
      }
      // console.log(msg);
      copyMsg.value = replaceNewLineWithBreakLine(msg);

      return replaceNewLineWithBreakLine(msg);
    }

    function onMessageClick() {
      isRecalculateShowDelete.value = false;
      isRecalculateShowDelete.value = true;

      message_overlay_display.value = "block";
      // context.emit("setScrollbarToBottom");
    }

    function getUserProfileURL(data) {
      // console.log(data);
      // let host = getCurrentHostName();
      // let url = createUSerProfileURL(host, data.slug);
      // if (!getter_showNav.value) {
      //   sendSelectedUserSlug(data.id);
      // }
      // return url;
      if (getter_showNav.value) {
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: data.slug },
        });
      } else {
        if (!getter_showNav.value) {
          if (getter_device.value == appConstants.devices.IOS) {
            sendSelectedUserSlugToIOS(data.id);
          } else if (getter_device.value == appConstants.devices.ANDROID) {
            sendSelectedUserSlugToAndroid(data.id);
          }
        }
      }

      // router.push({
      //   name: appConstants.routes.VIEWPROFILE,
      //   params: { user_slug: data.slug },
      // });

      // if (!getter_showNav.value) {
      //   sendSelectedUserSlug(data.id);
      // }
    }

    function openTest(data) {
      showTest.value = data;
    }

    function copyText(TextToCopy) {
      navigator.clipboard.writeText(TextToCopy);
      openTest(false);
    }

    return {
      copyMsg,
      showTest,
      enum_message_type,
      message_overlay_display,
      showDeleteAction,
      conversation_id,
      conversation_id_encoded,
      message_id,
      getter_showNav,
      shortForm,
      msgSentByMe,
      getMessageSentTime,
      onDeleteMessage,
      getMessageString,
      isInfoMessage,
      onMessageClick,
      getUserProfileURL,
      openTest,
      copyText,
    };
  },
};
</script>

<style>
.delete-msg {
  color: #adadad;
}

.show-ellipsis {
  text-overflow: ellipsis;
}
</style>
