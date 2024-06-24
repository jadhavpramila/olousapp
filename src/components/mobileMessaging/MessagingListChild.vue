<template>
  <div class="cls-messagingList">
    <div
      class="flex flex-col page-height"
      :class="[classListCheck() ? 'page-height-for-msgList' : 'page-height']"
    >
      <!-- section two -->
      <div
        v-if="!isShowNewUserMsg()"
        class="top-2 lg:py-6 mt-[15px] md:pr-6 pr-[18px] lg:pl-6 pl-[18px] overflow-y-auto messaging-card-list h-full flex flex-col-reverse"
        @scroll="onscroll"
        ref="messaging_scrollbar"
      >
        <div
          v-for="(message, index) in getter_messages_of_conversation"
          :key="getKey(message, index)"
        >
          <MessagingCard
            :message="message"
            :conversation_id="conversation_id"
          />
        </div>
      </div>
      <div
        class="flex flex-col h-full justify-center lg:pl-6 lg:py-6 md:pr-6 messaging-card-list overflow-y-auto pl-[18px] pr-[18px] top-2"
        v-if="isShowNewUserMsg()"
      >
        <div class="lg:pl-0 pl-5">
          <p class="font-size-14 pl-2">Say “Hello!</p>
          <p class="font-size-14 pl-2">I am keen to network</p>
          <p class="font-size-14 pl-2">With you."</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessagingCard from "./MessagingCard.vue";
import { ref, reactive, onMounted, computed, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import VLazyImage from "v-lazy-image";
import { useStore } from "vuex";
import NewConversation from "./NewConversation.vue";
import { useToast } from "primevue/usetoast";
import { getCurrentDateTimeInUTCTimestamp } from "../../common/js/dateFormater.js";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import useEmitter from "../../composables/useEmitter.js";
import CustomDropDownNew from "../common/CustomDropDownNew.vue";
import { useLoading } from "vue-loading-overlay";
import { getUUID } from "../../common/js/commonFunctions.js";

import {
  createUSerProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { uuid } from "vue3-uuid";
import {
  messageSendFunction,
  newMessageSendFunction,
} from "../../common/js/messagingFunctions.js";
import {
  sendSelectedUserSlugToIOS,
  conversationStatusSendToIOS,
  IosDeletelick,
  IosUnBlockClick,
  IosBlockClick,
  messageSearchQuery,
  IosSendMessage,
  IosHideKeyboard,
  dataLoadedSuccessIos,
} from "../../bridge/iosBridge.js";
import {
  sendSelectedUserSlugToAndroid,
  conversesationStatusToAndroid,
  messageQueryAndroid,
  hideKeyboard,
  sendMessageAndroid,
  // testDMSend,
  deletelick,
  unBlockClick,
  blockClick,
  dataLoadedSuccessAndroid,
} from "../../bridge/androidBridge.js";

export default {
  name: "MessagingListChild",
  inheritAttrs: false,
  components: {
    VLazyImage,
    MessagingCard,
    NewConversation,
    Dialog,
    Button,
    CustomDropDownNew,
  },
  props: {},
  async setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const $loading = useLoading();

    const message_list_overlay_display = ref("none");

    const message_textbox = ref(null);
    const messaging_scrollbar = ref(null);
    let lastScroll = ref(0);

    const limit = 10;
    let last_record_date = ref("");
    let timer_last_record_date = ref("");
    let next = ref(true);
    let message_to_send = ref("");
    let showNewConversation = ref();

    let encrypted_conversation_id = ref("");
    let conversation_id = ref("");
    let new_selected_users = ref(null);
    let polling = ref(null);
    let isShowDeleteConfirmation = ref(false);
    const isShowUnblockConfirmation = ref(false);

    const dropdownbg = "#f2f2f2";
    let fileUploadRef = ref(null);
    let imgFile = ref(null);
    let loadingImage = ref(false);

    const conversation_details = reactive({
      id: "",
      profile_pic: "",
      name: "",
      slug: "",
      tagline: "",
    });

    let getter_messages_of_conversation = computed(
      () => store.getters["messaging/getter_messages_of_conversation"]
    );

    let getter_conversation_data = computed(
      () => store.getters["messaging/getter_conversation_data"]
    );

    let isMobile = computed(() => store.getters["messaging/getter_is_mobile"]);

    let getter_device = computed(() => store.getters["login/getter_device"]);

    onMounted(() => {
      if (getter_device.value == appConstants.devices.IOS) {
        isMobile.value = null;
        console.log(getter_conversation_data.value);
        messageSearchQuery();
        IosSendMessage();
        IosDeletelick();
        IosUnBlockClick();
        IosBlockClick();
      }
      if (getter_device.value == appConstants.devices.ANDROID) {
        isMobile.value = null;
        messageQueryAndroid();
        blockClick();
        unBlockClick();
        deletelick();
        sendMessageAndroid();
      }
    });

    onUnmounted(() => {
      stopTimerAPIFetch();
    });

    await loadData();

    async function loadData() {
      if (route.name == appConstants.routes.MOBILECONVERSATION) {
        encrypted_conversation_id.value = route.params.conversation_id;
        await fetchMessagesOfConversation(true);
        getNewMessages();
      }
    }

    function stopTimerAPIFetch() {
      clearInterval(polling.value);
    }

    async function fetchMessagesOfConversation(is_first_call) {
      if (!next.value) {
        return;
      }

      let data = {
        conversation_id: encrypted_conversation_id.value,
        limit: limit,
        last_record_date: last_record_date.value,
      };

      await store
        .dispatch("messaging/action_getMessagesOfConversation", data)
        .then((res) => {
          next.value = res.next;
          last_record_date.value = res.last_record_date;
          timer_last_record_date.value = res.last_fetch_dt;

          if (is_first_call) {
            // conversation_with.id
            scrollToBottom();
            conversation_details.id =
              getter_conversation_data.value.conversation_with.id;
            conversation_details.profile_pic =
              getter_conversation_data.value.profile_pic;
            conversation_details.name = getter_conversation_data.value.name;
            conversation_details.tagline =
              getter_conversation_data.value.tagline;
            conversation_details.slug = getter_conversation_data.value.slug;
            conversation_id.value = getter_conversation_data.value.uid;

            //to fetch updated count
            store.dispatch("messaging/action_fetchUserTotalUnreadMessageCount");
            if (getter_device.value == appConstants.devices.IOS) {
              dataLoadedSuccessIos("msg_list");
            }

            if (getter_device.value == appConstants.devices.ANDROID) {
              dataLoadedSuccessAndroid("msg_list");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function onscroll(value) {
      // let currentScroll = value.target.scrollTop * -1;
      let currentScroll;

      let is_scrolling_up = true;

      if (currentScroll > 0) {
        // console.log("1");
        currentScroll = -Math.abs(currentScroll);
      } else {
        // console.log("2");
        currentScroll = value.target.scrollTop;
      }
      // console.log(currentScroll);

      if (lastScroll.value >= currentScroll) {
        lastScroll.value = currentScroll;
        is_scrolling_up = true;
      } else {
        lastScroll.value = currentScroll;
        is_scrolling_up = false;
      }

      // new logic
      if (currentScroll > lastScroll.value) {
        if (
          Math.round(value.target.scrollTop) * 1 + 1 >=
          value.target.scrollHeight - value.target.clientHeight
        ) {
          // console.log("call api");
          fetchMessagesOfConversation(false);
        }
      } else {
        if (
          Math.round(value.target.scrollTop) * -1 + 1 >=
          value.target.scrollHeight - value.target.clientHeight
        ) {
          // console.log("call api");
          fetchMessagesOfConversation(false);
        }
      }
      // console.log(
      //   "is_scrolling_up =>",
      //   is_scrolling_up,
      //   currentScroll,
      //   lastScroll.value
      // );

      // previous logic
      // if (is_scrolling_up) {
      //   console.log(value.target.scrollHeight, value.target.clientHeight);
      //   if (
      //     Math.round(value.target.scrollTop) * -1 + 1 >=
      //     value.target.scrollHeight - value.target.clientHeight
      //   ) {
      //     // isFetchNewRecords = true;
      //     // console.log("called API");
      //     fetchMessagesOfConversation(false);
      //     message_textbox.value.blur();
      //   }
      // }

      // if (value.target.scrollTop == 0 && conversation_id.value != "") {
      //   fetchMessagesOfConversation(false);
      // }
      if (getter_device.value == appConstants.devices.IOS) {
        // console.log("in if");
        IosHideKeyboard();
        return;
      }
      if (getter_device.value == appConstants.devices.ANDROID) {
        // console.log("in if");
        hideKeyboard();
        return;
      }
    }

    function scrollToBottom() {
      //https://javascript.info/size-and-scroll --refer to understand scrollHeight, scrollTop, clientHeight
      const el = messaging_scrollbar.value;
      // console.log("scrollToBottom", el);
      if (el) {
        // console.log("in if");
        messaging_scrollbar.value.scrollTop = -1;
        // window.scrollTo(0, document.body.scrollHeight);
        // window.scrollTo(0, -1);
        // messaging_scrollbar.value.scrollHeight -
        //   messaging_scrollbar.value.clientHeight;
      }
    }

    function getKey(msg, index) {
      return `message${msg.uid}`;
    }

    function classListCheck() {
      if (
        getter_device.value == appConstants.devices.IOS ||
        getter_device.value == appConstants.devices.ANDROID
      ) {
        return true;
      } else if (isMobile.value) {
        return false;
      } else {
        return false;
      }
    }

    function getNewMessages() {
      polling.value = setInterval(() => {
        let data = {
          conversation_id: encrypted_conversation_id.value,
          last_record_date: timer_last_record_date.value,
        };
        store
          .dispatch(
            "messaging/action_fetchWithTimerNewMessagesOfConversation",
            data
          )
          .then((res) => {
            if (res.isNewMessage == true) {
              timer_last_record_date.value = res.last_fetch_dt;
              scrollToBottom();
            }
          });
      }, 3000);
      // console.log("polling.value in msg list =>", polling.value);
    }

    function isShowNewUserMsg() {
      if (route.name == appConstants.routes.MOBILENEW_CONVERSATION) {
        if (
          getter_device.value == appConstants.devices.IOS ||
          getter_device.value == appConstants.devices.ANDROID
        ) {
          if (getter_device.value == appConstants.devices.IOS) {
            dataLoadedSuccessIos("msg_list");
          }

          if (getter_device.value == appConstants.devices.ANDROID) {
            dataLoadedSuccessAndroid("msg_list");
          }
          return true;
        }
        if (new_selected_users.value != null) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    return {
      getter_device,
      messaging_scrollbar,
      message_textbox,
      getter_messages_of_conversation,
      getter_conversation_data,
      conversation_details,
      message_to_send,
      showNewConversation,
      conversation_id,
      encrypted_conversation_id,
      message_list_overlay_display,
      isShowDeleteConfirmation,
      dropdownbg,
      isShowUnblockConfirmation,
      new_selected_users,
      isMobile,
      loadingImage,
      onscroll,
      getKey,
      getNewMessages,
      scrollToBottom,
      classListCheck,
      isShowNewUserMsg,
    };
  },
};
</script>

<style>
/* 
  .messaging-card-list {
    min-height: 300px;
  } */

.show-ellipsis {
  text-overflow: ellipsis;
}

#msgTextarea:focus-visible {
  outline: none !important;
}
</style>
