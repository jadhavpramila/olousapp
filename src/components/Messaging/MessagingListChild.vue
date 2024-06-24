<template>
  <div class="cls-messagingList">
    <!-- :class="[
        checkClassList()
          ? 'page-height-for-msgList'
          : 'page-height-for-conList',
      ]" -->
    <!-- class="flex flex-col page-height"  :class="[isMobile ? 'page-height-for-msgList' : 'page-height']"-->
    <div
      class="flex flex-col page-height"
      :class="[isMobile ? 'page-height-for-msgList mt-16' : 'page-height']"
    >
      <!-- section one  -->
      <div
        v-if="getter_showNav"
        class="flex-shrink-0 top-0"
        :class="[isMobile ? 'bg-[#fff] fixed w-full z-10' : '']"
      >
        <div class="flex w-full lg:mt-0 mt-2 items-start pb-1">
          <div
            class="flex-shrink-0 w-[44px] mt-2.5"
            v-if="show_back_to_conversation_btn"
          >
            <img
              draggable="false"
              :src="getStaticImage('Back.svg')"
              class="h-full"
              @click="showConversationList"
            />
          </div>
          <!-- {{ showNewConversation }} -->
          <!-- show new conversation -->
          <div
            v-if="showNewConversation"
            class="w-[85%] lg:w-full pr-0 lg:pr-3"
          >
            <NewConversation
              @OnNewUserSelectedForChat="OnNewUserSelectedForChat"
              @OnSelectedUserRemoved="clearAllData()"
            ></NewConversation>
          </div>

          <!-- Show conversation -->
          <div
            v-else
            class="lg:w-full w-[85%] lg:pt-4 pt-2 mb-1 lg:pl-[25px] pl-[4px]"
          >
            <div
              class="font-weight-700 md:pb-3 lg:text-lg text-base line-height-1-11"
              v-if="!show_back_to_conversation_btn"
            >
              Conversation
            </div>
            <!-- <span class="Conversation">Conversation</span> -->
            <div
              class="flex flex-row lg:pr-6 pr-3 relative items-center lg:pb-[0.813rem]"
            >
              <div>
                <div class="flex justify-center">
                  <div
                    v-if="conversation_details.profile_pic"
                    class="w-10 h-10"
                  >
                    <VLazyImage
                      class="rounded-full"
                      :src="conversation_details.profile_pic"
                      alt=""
                    />
                  </div>
                  <div v-else>
                    <div
                      class="rounded-full flex lg:w-9 lg:h-9 h-9 w-9 justify-center items-center relative bg-[#d8d8d8] cursor-pointer"
                    >
                      <span> {{ shortForm() }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- lg:w-full w-3/4  -->
              <div
                class="ml-3 w-full overflow-hidden whitespace-nowrap show-ellipsis overflow-hidden"
                :class="[conversation_details.designation ? '' : 'h-full']"
              >
                <h1
                  class="font-size-16 font-weight-600 text-[#333] pb-1 lg:pb-0"
                >
                  <span
                    class="app-text-color-primary"
                    v-if="conversation_details.group"
                    :class="[conversation_details.designation ? '' : 'h-full']"
                    >{{ conversation_details.name }}</span
                  >
                  <!-- <a
                    v-else
                    class="cursor-pointer"
                    target="_blank"
                    :href="getUserProfileURL(conversation_details)"
                    >{{ conversation_details.name }}</a
                  > -->
                  <span
                    v-else
                    class="cursor-pointer focus-off app-text-color-primary"
                    :class="[conversation_details.designation ? '' : 'h-full']"
                    @click="getUserProfileURL(conversation_details)"
                    >{{ conversation_details.name }}
                  </span>
                </h1>
                <!-- {{ conversation_details.designation }} -->
                <!-- name test -->
                <!-- <span class="name">
                  {{ conversation_details.name }}
                </span> -->
                <div
                  v-if="conversation_details.designation"
                  class="text-xs text-[#333] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
                >
                  {{ conversation_details.designation }}
                </div>
                <div
                  v-else
                  class="text-xs text-[#333] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis lg:w-full w-3/4"
                >
                  {{ conversation_details.tagline }}
                </div>
                <!-- test tagline -->
                <!-- <br />
                <span class="tagLine">
                  {{ conversation_details.tagline }}
                </span> -->
              </div>
              <div
                @mouseleave="hideMessageListOverlay()"
                class="flex flex-shrink-0 h-[44px] justify-end mt-1 w-[44px]"
              >
                <div
                  :style="{ display: message_list_overlay_display }"
                  class="absolute mt-6 pr-6 ml-auto right-0 z-10"
                >
                  <!-- <div
                      class="rounded-lg bg-[#f2f2f2] z-10 text-sm"
                      style="box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2)"
                    >
                      <div
                        class="px-3 py-3 cursor-pointer"
                        @click="onDeleteConversationClick()"
                      >
                        Delete Conversation
                      </div>
                    </div> -->
                  <CustomDropDownNew
                    :data="getter_conversation_data.user_dropdown_options"
                    @selected_dropdown_item="dropdown_item_clicked"
                  />
                </div>
                <div class="flex h-full items-center">
                  <img
                    draggable="false"
                    class="h-6 cursor-pointer"
                    src="../../assets/img/Kebab.svg"
                    @click="showMessageListOverlay()"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- section two -->
      <div
        v-if="!isShowNewUserMsg()"
        class="top-2 lg:py-6 md:pr-6 pr-[18px] lg:pl-6 pl-[18px] overflow-y-auto messaging-card-list h-full flex flex-col-reverse"
        :class="[isMobile ? 'mt-[15px] ' : '']"
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
      <!-- {{ isShowMessageTextBox() }} -->
      <!-- section three -->
      <!--add code again-->

      <!--trail start-->

      <!--trail end-->
      <!--my trail-->

      <!--my trail end-->
      <!--trail1-->
      <div
        class="flex-shrink-0 bottom-0 lg:pr-4 lg:pl-[25px] lg:py-1 pr-2 pl-[13px] py-1"
        :class="[isMobile ? 'bg-[#fff] fixed w-full z-10' : '']"
        v-if="isShowMessageTextBox()"
      >
        <div>
          <div class="col-12">
            <PreviewSelectedMediaInMessagingVue
              ref="ref_previewselectedMediaInMessaging"
              :fileObject="previewMediaFile"
              :media_height="47"
              :media_width="75"
              :save_image_path_value="path_s3_save_file"
              @preview_uploadedImagePassURL_Removed="removeLogo(counter)"
            ></PreviewSelectedMediaInMessagingVue>
          </div>
        </div>
        <div
          v-if="loadingImage"
          class="bg-[#f2f2f2] mb-2 pt-2 pb-1 px-1 rounded-lg"
        >
          <div class="relative">
            <img
              v-if="checkImage()"
              draggable="false"
              id="image"
              :src="setImageUrl()"
              class="object-cover z-7 h-20 w-20 mb-2 rounded-md"
            />
            <button
              @click="closePreview"
              class="absolute top-0 right-0 cursor-pointer"
            >
              <img src="../../assets/img/close.svg" alt="Cancel preview" />
            </button>
            {{ imgFile.name }}
          </div>
        </div>

        <div
          :class="[!getter_device ? '' : 'hidden']"
          class="gap-2 grid lg:grid-cols-8 grid-cols-12 items-start"
        >
          <div class="lg:col-span-7 col-span-10 relative">
            <textarea
              v-model="message_to_send"
              placeholder="Type here..."
              ref="message_textbox"
              id="msgTextarea"
              class="p-2 form-control"
              name="content"
              style="resize: none; min-height: 44px"
              @input="onMessageTyping()"
              rows="1"
              cols="50"
            ></textarea>

            <!-- <input
              type="file"
              id="imageInput"
              accept="image/png, image/jpeg, image/gif"
              ref="imageInput"
              @change="previewImage($event)"
              style="display: none"
            /> -->
          </div>
          <div
            class="lg:col-span-1 mt-1 col-span-2 flex items-center justify-center w-full ml-auto"
          >
            <button
              class="rounded-full app-bg-color-primary flex justify-center items-center h-[2.5rem] w-[2.5rem] send-message-btn"
              @click="sendMessage"
            >
              <img
                draggable="false"
                class="cursor-pointer"
                src="../../assets/send_message_white.svg"
              />
            </button>
          </div>
          <!--<div>
              <input
              type="file"
              id="documentInput"
              accept="application/pdf, .doc, .docx"
              ref="documentInput"
              @change="handleDocumentUpload($event)"
              style="display: none"
            />
              <input
                type="file"
                id="videoInput"
                accept="video/mp4, video/webm"
                ref="videoInput"
                @change="handleVideoUpload($event)"
                style="display: none"
              />
               <video
                id="videoPreview"
                ref="videoPreview"
                width="320"
                height="240"
                controls
              ></video> 
            </div>-->
          <!-- <div class="flex items-start mt-[-0.75rem]">
              <div class="flex items-center">
                <div class="container">
                  <input
                    type="file"
                    id="documentInput"
                    ref="documentInput"
                    accept="application/pdf"
                    style="display: none"
                  />
                  <iframe
                  ></iframe>
                </div>
              </div> -->

          <!-- <img
                src="../../assets/img/documents_v1.svg"
                alt=""
                @click="triggerDocumentUpload"
                class="cursor-pointer"
              /> -->

          <!-- </div> -->
        </div>
        <div>
          <div class="flex">
            <!-- <img
              src="../../assets/img/documents_v1.svg"
              alt="Document"
              class="cursor-pointer"
              @click="triggerDocumentUpload"
            />
            <span v-if="selectedFile">{{ selectedFile.name }}</span>

            <img
              src="../../assets/img/photo_v1.svg"
              alt=""
              @click="triggerImageUpload"
              class="cursor-pointer"
            />

            <img
              src="../../assets/img/video_v1.svg"
              alt=""
              @click="triggerVideoUpload"
              class="cursor-pointer"
            /> -->
            <div class="file_tooltip">
              <div class="file_tooltiptext">Upload Document</div>
              <GetMediaForUploadInMessagingVue
                ref="ref_GetMediaForUploadInMessaging"
                id="1"
                upload_button_height=""
                seleted_image_height=""
                is_logo_image="false"
                is_object_fit_contain="false"
                :display_image="upload_file_type.PDF"
                upload_button_text=""
                :file_type="upload_file_type.PDF"
                :save_image_path_value="path_s3_save_file"
                :media_max_size="messagingMediaSizeInBytes"
                @media_selected="getSelectedMediaForPreview"
                tooltip="test"
              ></GetMediaForUploadInMessagingVue>
            </div>
            <div class="file_tooltip">
              <div class="file_tooltiptext">Upload Image</div>
              <GetMediaForUploadInMessagingVue
                ref="ref_GetMediaForUploadInMessaging"
                id="2"
                upload_button_height=""
                seleted_image_height=""
                is_logo_image="false"
                is_object_fit_contain="false"
                :display_image="upload_file_type.IMAGE"
                upload_button_text=""
                :file_type="upload_file_type.IMAGE"
                :save_image_path_value="path_s3_save_file"
                :media_max_size="messagingMediaSizeInBytes"
                @media_selected="getSelectedMediaForPreview"
              ></GetMediaForUploadInMessagingVue>
            </div>
            <div class="file_tooltip">
              <div class="file_tooltiptext">Upload Video</div>
              <GetMediaForUploadInMessagingVue
                ref="ref_GetMediaForUploadInMessaging"
                id="3"
                upload_button_height=""
                seleted_image_height=""
                is_logo_image="false"
                is_object_fit_contain="false"
                :display_image="upload_file_type.VIDEO"
                upload_button_text=""
                :file_type="upload_file_type.VIDEO"
                :save_image_path_value="path_s3_save_file"
                :media_max_size="messagingMediaSizeInBytes"
                @media_selected="getSelectedMediaForPreview"
              ></GetMediaForUploadInMessagingVue>
            </div>
          </div>
        </div>
      </div>

      <!--trail1end--->
    </div>

    <Dialog
      :showHeader="false"
      v-model:visible="isShowDeleteConfirmation"
      :style="{ 'min-width': '300px' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <div class="confirmation-content flex items-center">
          <!-- <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" /> -->
          <span class="lg:text-base md:text-base text-sm"
            >Are you sure, you want to delete your entire conversation history
            with
            <span class="font-weight-700">{{ conversation_details.name }}</span
            >? <br />Which cannot be undone.</span
          >
        </div>
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="onClickCancelDelete" class="btn w-auto">
            Cancel
          </button>
          <button @click="onConfirmDelete" class="btn w-auto" autofocus>
            Delete
          </button>
        </div>
      </div>
    </Dialog>
    <Dialog
      :showHeader="false"
      v-model:visible="isShowUnblockConfirmation"
      :style="{ 'min-width': '300px' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <div class="confirmation-content flex items-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
          <span class="lg:text-base md:text-base text-sm">
            Unblock user to send a message.
          </span>
        </div>
        <div class="flex justify-end space-x-4 mt-4">
          <button
            label=""
            @click="isShowUnblockConfirmation = false"
            class="btn w-auto"
          >
            Cancel
          </button>
          <button @click="unblockConversation" class="btn w-auto" autofocus>
            Unblock
          </button>
        </div>
      </div>
    </Dialog>
    <Dialog
      :showHeader="false"
      v-model:visible="isShowInfoMessage"
      :style="{ 'min-width': '300px' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <div class="confirmation-content flex items-center">
          <!-- <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" /> -->
          <span class="lg:text-base md:text-base text-sm">{{
            infoMessageText
          }}</span>
        </div>
        <div class="flex justify-end space-x-4 mt-4">
          <button
            @click="isShowInfoMessage = false"
            class="btn w-auto"
            autofocus
          >
            ok
          </button>
        </div>
      </div>
    </Dialog>
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
} from "../../bridge/androidBridge.js";
import GetMediaForUploadInMessagingVue from "../common/GetMediaForUploadInMessaging.vue";
import PreviewSelectedMediaInMessagingVue from "../common/PreviewSelectedMediaInMessaging.vue";
import { getCurrentInstance } from "vue";

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
    GetMediaForUploadInMessagingVue,
    PreviewSelectedMediaInMessagingVue,
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
    let ref_previewselectedMediaInMessaging = ref();

    let upload_file_type = appConstants.upload_file_type;
    let path_s3_save_file = appConstants.PATH_SAVE_MESSAGING_MEDIA;
    let mediaFile = ref([]);
    let isShowPreview = ref(false);
    let previewMediaFile = ref([]);
    const app = getCurrentInstance();
    const messagingMediaSizeInBytes =
      app.appContext.config.globalProperties.messagingMediaSizeInBytes;

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
    const $emitter = useEmitter();
    const dropdownbg = "#efeff5";
    let fileUploadRef = ref(null);
    let imgFile = ref(null);
    let loadingImage = ref(false);
    let loader_object = ref(null);
    let isShowInfoMessage = ref(false);
    let infoMessageText = ref("");

    const conversation_details = reactive({
      id: "",
      profile_pic: "",
      name: "",
      slug: "",
      tagline: "",
    });

    let show_back_to_conversation_btn = ref(true);

    let getter_messages_of_conversation = computed(
      () => store.getters["messaging/getter_messages_of_conversation"]
    );

    let getter_conversation_data = computed(
      () => store.getters["messaging/getter_conversation_data"]
    );

    let getter_page_height = computed(
      () => store.getters["messaging/getter_page_height"]
    );

    // let getter_androidInstace = computed(
    //   () => store.getters["login/getter_androidInstace"]
    // );

    let isMobile = computed(() => store.getters["messaging/getter_is_mobile"]);

    // let getter_selected_conversation = computed(
    //   () => store.getters["messaging/getter_selected_conversation"]
    // );
    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
    let getter_directFromUserProfile = computed(
      () => store.getters["login/getter_directFromUserProfile"]
    );
    let getter_device = computed(() => store.getters["login/getter_device"]);

    onMounted(() => {
      handleNewMessage();

      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        store.commit("messaging/commit_reset_messaging_state");
        clearConversationData();
        // let mainCls = document.querySelector(".page-height-for-msgList");
        // // console.log("mainCls =>", mainCls);
        // if (mainCls != null) {
        //   mainCls.classList.remove("page-height-for-msgList");
        //   mainCls.classList.add("page-height-for-conList");
        // }
      } else {
        // console.log("in else ");
        window.addEventListener("resize", setControlsVisibilityAsPerDevice);

        focusMessageTextBox();
      }

      setControlsVisibilityAsPerDevice();
    });

    onUnmounted(() => {
      stopTimerAPIFetch();
      window.removeEventListener("resize", setControlsVisibilityAsPerDevice);
    });

    await loadData();

    async function loadData() {
      if (route.name == appConstants.routes.CONVERSATION) {
        encrypted_conversation_id.value = route.params.conversation_id;
        await fetchMessagesOfConversation(true);
        getNewMessages();
      }
    }
    function startLoader() {
      if (loader_object.value == null) {
        loader_object.value = $loading.show();
      }
    }
    function hideLoader() {
      if (loader_object.value != null) {
        try {
          loader_object.value.hide();
        } catch (e) {}
        loader_object.value = null;
      }
    }

    function focusMessageTextBox() {
      if (message_textbox.value != null) {
        message_textbox.value.focus();
      }
    }

    function dropdown_item_clicked(val) {
      // console.log("val =>", val);
      switch (val) {
        case getter_conversation_data.value.available_dropdown_options.delete
          .id:
          onDeleteConversationClick();
          break;
        case getter_conversation_data.value.available_dropdown_options.block.id:
          blockConversation();
          break;
        case getter_conversation_data.value.available_dropdown_options.unblock
          .id:
          unblockConversation();
          break;
      }
      message_list_overlay_display.value = "none";
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function isTextOnly() {
      if (message_to_send.value.trim() == "") {
        return false;
      } else {
        return true;
      }
    }
    function isMediaOnly() {
      if (mediaFile.value.length > 0) {
        return true;
      } else {
        return false;
      }
    }
    // function callFunctionToUploadMediaOnS3() {
    //   ref_GetMediaForUploadInMessaging.value.btnUploadFile();
    // }

    async function sendMessage() {
      try {
        startLoader();

        //callFunctionToUploadMediaOnS3().then(() => {
        // loader.hide();

        //afterMediaUploadSendMessage();
        // });

        if (previewMediaFile.value.length > 0) {
          let uploaded_media =
            await ref_previewselectedMediaInMessaging.value.btnUploadFile();
          if (uploaded_media.length < 1) {
            infoMessageText.value =
              "Facing an issue while uploading media, please try again.";
            isShowInfoMessage.value = true;
            focusMessageTextBox();
            hideLoader();
            return;
          }
          sendMessageAsPerMedia(uploaded_media);
          hideLoader();
        } else {
          sendMessageAsPerMedia([]);
          hideLoader();
        }

        hideLoader();

        // if (message_to_send.value.trim() == "") {
        //   focusMessageTextBox();
        //   // loader.hide();
        //   return;
        // } else {
        // focusMessageTextBox();
        //if is it first message then first create conversation
        //else send message to previous conversation

        //  }
        // console.log("focus call after send");
      } catch (e) {
        hideLoader();
      }
    }

    function sendMessageAsPerMedia(media) {
      mediaFile.value = [];

      if (media.length > 0) {
        for (var i = 0; i < media.length; i++) {
          mediaFile.value.push(media[i]);
        }
      } else {
        if (message_to_send.value.trim() == "") {
          focusMessageTextBox();
          // loader.hide();
          return;
        }
      }

      if (conversation_id.value == "" || conversation_id.value == undefined) {
        //create new conversation
        if (new_selected_users.value == null) {
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: "Please select User to start conversation",
            life: 3000,
          });
          // loader.hide();
        } else {
          let arr = [];
          arr = getMediaArrayToSave(mediaFile.value);
          let msg_type = getMediaType(arr);

          let data = {
            members: [new_selected_users.value.id], //TODO: Group
            message: message_to_send.value.trim(),
            confirmation_id: uuid.v1(),
            created_at: new Date(),
            type: msg_type,
            media: arr,
          };

          createNewConversationAPIcall(data);
          // newMessageSendFunction(data)
          //   .then((res) => {
          //     router.push({
          //       name: appConstants.routes.CONVERSATION,
          //       params: { conversation_id: getUUIDtoEncodedString(res) },
          //     });
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        }
      } else {
        let arr = [];
        arr = getMediaArrayToSave(mediaFile.value);

        let msg_type = getMediaType(arr);
        let data = {
          message: message_to_send.value.trim(),
          type: msg_type,
          conversation_id: conversation_id.value, //uid
          tagged_users: [],
          attachment_id: [],
          media: arr,
          confirmation_id: uuid.v1(),
          created_at: new Date(),
        };

        // if (data.media.length > 0) {
        //   if (data.media[0].media_type == appConstants.media_Type.IMAGE) {
        //     data.type = appConstants.message_type.IMAGE;
        //   } else if (
        //     data.media[0].media_type == appConstants.media_Type.VIDEO
        //   ) {
        //     data.type = appConstants.message_type.VIDEO;
        //   } else if (data.media[0].media_type == appConstants.media_Type.FILE) {
        //     data.type = appConstants.message_type.FILE;
        //   }
        // }

        sendMessageAPIcall(data);
        // messageSendFunction(data)
        //   .then((res) => {
        //     previewMediaFile.value = [];
        //     if (route.name == appConstants.routes.NEW_CONVERSATION) {
        //       router.push({
        //         name: appConstants.routes.CONVERSATION,
        //         params: {
        //           conversation_id: encrypted_conversation_id.value,
        //         },
        //       });
        //     } else {
        //       scrollToBottom();
        //       message_to_send.value = "";
        //       mediaFile.value = [];
        //       let msg_textbox = message_textbox.value;
        //       msg_textbox.style.height = "2.75rem";
        //       // message_textbox.value.blur();
        //       focusMessageTextBox();
        //       // focusMessageTextBoxAsPerDevice();
        //     }
        //   })
        //   .catch((error) => {
        //     // console.log(" error.response.status", error);
        //     if (
        //       error.response.status == appConstants.api_response.NOT_ACCEPTABLE
        //     ) {
        //       // console.log("in if");
        //       isShowUnblockConfirmation.value = true;
        //     }

        //     // loader.hide();
        //   });
      }
      focusMessageTextBox();
    }

    function getMediaType(media) {
      let type = appConstants.message_type.TEXT;
      if (media.length > 0) {
        if (media[0].media_type == appConstants.media_Type.IMAGE) {
          type = appConstants.message_type.IMAGE;
        } else if (media[0].media_type == appConstants.media_Type.VIDEO) {
          type = appConstants.message_type.VIDEO;
        } else if (media[0].media_type == appConstants.media_Type.FILE) {
          type = appConstants.message_type.FILE;
        }
      }

      return type;
    }

    function getMediaArrayToSave(media_saved_on_s3) {
      let arr = [];
      for (let i = 0; i < media_saved_on_s3.length; i++) {
        let single_media = media_saved_on_s3[i];
        let obj = {
          name: single_media.image_name,
          media_type: single_media.media_type,
          cover_image: "",
          contentSize: single_media.file_size,
          width: single_media.width,
          height: single_media.height,
          video_duration: mediaFile.value[i].duration,
          original_file_name: single_media.original_file_name,
        };

        arr.push(obj);
      }

      return arr;
    }

    function sendMessageAPIcall(payload) {
      messageSendFunction(payload)
        .then((res) => {
          previewMediaFile.value = [];
          if (route.name == appConstants.routes.NEW_CONVERSATION) {
            router.push({
              name: appConstants.routes.CONVERSATION,
              params: {
                conversation_id: encrypted_conversation_id.value,
              },
            });
          } else {
            scrollToBottom();
            message_to_send.value = "";
            mediaFile.value = [];
            let msg_textbox = message_textbox.value;
            msg_textbox.style.height = "2.75rem";
            focusMessageTextBox();
          }
        })
        .catch((error) => {
          if (
            error.response.status == appConstants.api_response.NOT_ACCEPTABLE
          ) {
            isShowUnblockConfirmation.value = true;
          }
        });
    }

    function createNewConversationAPIcall(payload) {
      newMessageSendFunction(payload)
        .then((res) => {
          router.push({
            name: appConstants.routes.CONVERSATION,
            params: { conversation_id: getUUIDtoEncodedString(res) },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function getSelectedMediaForPreview(media) {
      previewMediaFile.value = media;
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

    function setControlsVisibilityAsPerDevice() {
      if (route.name == appConstants.routes.MESSAGING) {
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          show_back_to_conversation_btn.value = false;
        } else {
          show_back_to_conversation_btn.value = false;
        }
      }

      if (route.name == appConstants.routes.CONVERSATION) {
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          show_back_to_conversation_btn.value = true;
        } else {
          show_back_to_conversation_btn.value = false;
        }
      }

      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          show_back_to_conversation_btn.value = true;
        } else {
          show_back_to_conversation_btn.value = false;
        }
      }
    }

    function handleNewMessage() {
      // console.log("route.name =>", route.name);
      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        // console.log("in if");
        showNewConversation.value = true;
      } else {
        // console.log("in else");
        showNewConversation.value = false;
      }
    }

    function showConversationList() {
      // console.log(
      //   "getter_directFromUserProfile.value =>",
      //   getter_directFromUserProfile.value
      // );

      if (getter_directFromUserProfile.value == true) {
        console.log("in if");
      } else {
        // console.log("in else");
        router.push({ name: appConstants.routes.MESSAGING });
        // router.push({ name: appConstants.routes.MESSAGING }).then(() => {
        //   // $emitter.emit("from_messagingList_show_conversation_clicked");
        // });
      }
    }

    function shortForm() {
      let initialLetters = "";

      if (conversation_details.name) {
        const myArray = conversation_details.name.split(" ");
        if (myArray.length > 1) {
          initialLetters =
            myArray[0].charAt(0).toUpperCase() +
            myArray[1].charAt(0).toUpperCase();
        }
      }
      return initialLetters;
    }

    function isNewConversationRoute() {
      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        return true;
      } else {
        return false;
      }
    }

    function getKey(msg, index) {
      // var res = getUUID();
      return `message${msg.uid}`;
    }

    function OnNewUserSelectedForChat(selected_users) {
      // console.log("selected_users in vue =>", selected_users);
      //TODO: Group need to change as list of Users
      new_selected_users.value = selected_users;
      fetchSelectedUser(selected_users);
    }

    function fetchSelectedUser(selected_users) {
      store
        .dispatch(
          "messaging/action_checkConversationIsPresent",
          selected_users.id
        )
        .then((res) => {
          // console.log("in action_checkConversationIsPresent");
          if (Object.keys(getter_conversation_data.value).length == 0) {
            // console.log("if");
            //no existing conversation
            clearConversationData();
            isShowMessageTextBox();
          } else {
            // console.log("else");
            //got existing conversation
            showNewConversation.value = false;
            next.value = res.next;
            last_record_date.value = res.last_record_date;
            conversation_id.value = getter_conversation_data.value.uid;
            encrypted_conversation_id.value =
              getter_conversation_data.value.encrpted_uid;

            scrollToBottom();
            conversation_details.profile_pic =
              getter_conversation_data.value.profile_pic;
            conversation_details.name = getter_conversation_data.value.name;
            conversation_details.tagline =
              getter_conversation_data.value.tagline;
          }
          focusMessageTextBox();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function clearAllData() {
      clearUser();
      clearConversationData();
    }

    function clearUser() {
      new_selected_users.value = null;
    }

    function clearConversationData() {
      store.commit("messaging/commit_reset_messaging_state");
      last_record_date.value = "";
      next.value = true;
      message_to_send.value = "";
      conversation_id.value = "";
      encrypted_conversation_id.value = "";
      conversation_details.profile_pic = "";
      conversation_details.name = "";
      conversation_details.slug = "";
      conversation_details.tagline = "";
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

    function onDeleteConversationClick() {
      isShowDeleteConfirmation.value = true;
      hideMessageListOverlay();
    }

    function onClickCancelDelete() {
      isShowDeleteConfirmation.value = false;
    }

    function onConfirmDelete() {
      isShowDeleteConfirmation.value = false;
      store
        .dispatch(
          "messaging/action_deleteConversation",
          encrypted_conversation_id.value
        )
        .then(() => {
          router.push({ name: appConstants.routes.MESSAGING });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function blockConversation() {
      //console.log("block");
      store
        .dispatch(
          "messaging/action_blockConversation",
          encrypted_conversation_id.value
        )
        .then(() => {
          scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function unblockConversation() {
      // console.log("unblock");
      store
        .dispatch(
          "messaging/action_unblockConversation",
          encrypted_conversation_id.value
        )
        .then(() => {
          scrollToBottom();
          if (isShowUnblockConfirmation.value == true) {
            isShowUnblockConfirmation.value = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function hideMessageListOverlay() {
      message_list_overlay_display.value = "none";
    }

    function showMessageListOverlay() {
      message_list_overlay_display.value = "block";
    }

    function onMessageTyping() {
      // debugger;
      let msg_textbox = message_textbox.value;
      let max_height;
      if (window.innerWidth < appConstants.css_breakpoints.MD) {
        max_height = 140;
      } else {
        max_height = 180;
      }
      if (msg_textbox.scrollHeight < max_height) {
        msg_textbox.style.height = "auto";
        // msg_textbox.style.min-height = "2.75rem";
        msg_textbox.style.height = msg_textbox.scrollHeight + "px";
      } else {
        msg_textbox.style.height = "auto";
        // msg_textbox.style.min-height = "2.75rem";
        msg_textbox.style.height = max_height + "px";
      }
    }

    function getUserProfileURL(data) {
      if (getter_showNav.value) {
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: data.slug },
        });
      } else {
        if (!getter_showNav.value) {
          if (getter_device.value == appConstants.devices.IOS) {
            sendSelectedUserSlugToIOS(data.id);
          } else if (getter_device.value == appConstants.devices.IOS) {
            sendSelectedUserSlugToAndroid(data.id);
          }
        }
      }
    }

    function isShowNewUserMsg() {
      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        if (
          getter_device.value == appConstants.devices.IOS ||
          getter_device.value == appConstants.devices.ANDROID
        ) {
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

    function isShowMessageTextBox() {
      // console.log(getter_device.value);
      if (
        getter_device.value == appConstants.devices.IOS ||
        getter_device.value == appConstants.devices.ANDROID
      ) {
        return false;
      }
      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        if (new_selected_users.value != null) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

    function showBorder() {
      if (route.name == appConstants.routes.NEW_CONVERSATION) {
        return false;
      } else {
        return true;
      }
    }

    function getIDandRef() {
      let name = conversation_id.value;
      fileUploadRef.value = `messageUploadFile_${name}`;
      return fileUploadRef.value;
    }

    function getAcceptFileType() {
      return appConstants.ACCEPT_IMAGE_TYPE;
    }

    function previewImage($e) {
      // console.log("in previewImage", $e.target);
      const target = $e.target;
      imgFile.value = target.files[0];
      console.log(imgFile.value);
      loadingImage.value = true;
    }
    function removeLogo(index) {
      previewMediaFile.value.splice(index, 1);
      // this.emitFileChangedEvent();
    }
    // function emitFileChangedEvent() {
    //   if (mediaFile.value.length > 0) {
    //     this.$emit("inMemoryFile_changed", {
    //       file_count: mediaFile.value.length,
    //     });
    //   } else {
    //     this.$emit("inMemoryFile_changed", {
    //       file_count: 0,
    //     });
    //   }
    // }
    function openDialog() {
      loadingImage.value = false;
      // console.log("in openDialog", fileUploadRef.value);
      // fileUploadRef.value.click();
      const myInput = document.getElementById(fileUploadRef.value);
      myInput.click();
    }

    function checkImage() {
      // console.log("in checkImage", imgFile.value);
      if (imgFile.value) {
        return true;
      } else {
        return false;
      }
    }

    function setImageUrl() {
      console.log("in setImageUrl", imgFile.value);
      let src = URL.createObjectURL(imgFile.value);
      return src;
    }

    return {
      imgFile,
      getter_device,
      messaging_scrollbar,
      message_textbox,
      show_back_to_conversation_btn,
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
      getter_page_height,
      isMobile,
      getter_directFromUserProfile,
      getter_showNav,
      loadingImage,
      upload_file_type,
      path_s3_save_file,
      mediaFile,
      isShowPreview,
      ref_previewselectedMediaInMessaging,
      previewMediaFile,
      sendMessage,
      focusMessageTextBox,
      onscroll,
      showConversationList,
      shortForm,
      getKey,
      isNewConversationRoute,
      OnNewUserSelectedForChat,
      clearAllData,
      onDeleteConversationClick,
      onClickCancelDelete,
      onConfirmDelete,
      hideMessageListOverlay,
      showMessageListOverlay,
      onMessageTyping,
      getUserProfileURL,
      dropdown_item_clicked,
      unblockConversation,
      isShowMessageTextBox,
      scrollToBottom,
      showBorder,
      getIDandRef,
      previewImage,
      removeLogo,
      getAcceptFileType,
      openDialog,
      isShowNewUserMsg,
      checkImage,
      setImageUrl,
      getSelectedMediaForPreview,
      // emitFileChangedEvent,
      isTextOnly,
      isMediaOnly,
      isShowInfoMessage,
      infoMessageText,
      //callFunctionToUploadMediaOnS3,
      //afterMediaUploadSendMessage,
      // imagePreviewURL: null,
      messagingMediaSizeInBytes,
    };
  },
};
</script>

<style>
.uploaded-image {
  width: 200px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-top: 10px;
}

.image-icon {
  cursor: pointer;
  /* Add styling for the image icon */
}

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

/* Show the tooltip text when you mouse over the tooltip container */
.file_tooltip:hover .file_tooltiptext {
  visibility: visible;
}

.file_tooltip:click .file_tooltiptext {
  visibility: hidden;
}

/* Tooltip text */
.file_tooltip .file_tooltiptext {
  visibility: hidden;
  /* width: 120px; */
  background-color: var(--app-secondary-color);
  color: #000000;
  text-align: center;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  margin-left: 0px;
  margin-top: -25px;
}
/*.send-message-btn {
  background: var(--app-secondary-color) !important;
  border: 1px solid var(--app-input-border);
} */
</style>
