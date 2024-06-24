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
        </div>
        <div @mouseleave="hideDropdown">
          <div v-if="show_dropdown_menu">
            <div class="absolute mt-4 pr-0 ml-auto right-0 z-10">
              <CustomDropDownNew
                :bgColor="dropdownbg"
                :data="user_dropdown_options"
                @selected_dropdown_item="msg_dropdown_item_clicked"
              />
            </div>
          </div>
          <div class="flex items-center" @click="showDropdown">
            <div>
              <img
                draggable="false"
                class="h-4 cursor-pointer"
                src="../../assets/img/Kebab.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="select-none" v-if="message.type != enum_message_type.DELETE">
        <div
          v-if="
            message.media.length > 0 &&
            message.media[0].media_type == enum_media_type.IMAGE
          "
          class="flex relative w-auto px-[0.875rem] py-[0.625rem] rounded-lg"
        >
          <div class="rounded-lg w-auto h-auto text-sm flex justify-between">
            <!-- <pre>{{ message.media[0].media_type }}</pre> -->
            <img
              :src="getMediaURL()"
              alt="img"
              class="sent-img-by-user w-[12.375rem] h-[7.75rem]"
            />
          </div>
        </div>

        <div
          v-if="
            message.media.length > 0 &&
            message.media[0].media_type == enum_media_type.VIDEO
          "
          class="flex relative w-auto px-[0.875rem] py-[0.625rem] rounded-lg"
        >
          <div
            class="rounded-lg w-auto h-auto text-sm flex justify-between w-[15.375rem] max-h-[15.75rem]"
          >
            <!-- <pre>{{ message.media[0].media_type }}</pre> -->
            <video controls class="img-preview logo-image">
              <source :src="getMediaURL()" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>

        <div
          v-if="
            message.media.length > 0 &&
            message.media[0].media_type == enum_media_type.FILE
          "
          :style="msgSentByMe()"
          class="flex relative w-auto px-[0.875rem] py-[0.625rem] rounded-lg app-bg-color-secondary"
        >
          <div class="rounded-lg w-auto h-auto text-sm flex justify-between">
            <div class="flex justify-between">
              <div class="">
                <img src="../../assets/img/documents_v1.svg" alt="" />
              </div>
              <div class="flex items-center">
                <span>{{ message.media[0].original_file_name }}</span>
              </div>

              <!-- <div class="ml-5 flex items-center">
                <img
                  src="../../assets/Download.svg"
                  alt=""
                  @click="downloadFile(message.media)"
                  style="cursor: pointer"
                />
              </div> -->
            </div>
          </div>
        </div>

        <!--  @click="onMessageClick()"   -->
        <!--video media start-->
        <!-- <div
          class="select-none"
          @mouseover="openTest(true)"
          @mouseleave="openTest(false)"
        >
          <div
            class="flex mt-1.5 relative w-auto app-bg-color-secondary px-[0.875rem] py-[0.625rem] rounded-lg"
          >
            <div class="rounded-lg w-auto h-auto text-sm flex justify-between">
              <video controls class="sent-video-by-user">
                <source :src="getSentVideo()" type="video/mp4" />
              </video>
            </div>
          </div>
        </div> -->
        <!-- <div>
          <input type="file" @change="uploadVideo" />
        </div> -->

        <!--video media end-->

        <div
          v-if="message.message_str != ''"
          class="flex mt-2 relative app-bg-color-secondary px-[0.875rem] py-[0.625rem] rounded-lg"
          :style="msgSentByMe()"
          @touchend="onMessageClick()"
          @dblclick="onMessageClick()"
        >
          <div class="rounded-lg w-full h-auto text-sm flex justify-between">
            <p
              :innerHTML="getMessageString()"
              class="overflow-auto break-words"
            ></p>
          </div>

          <!-- <div
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
                    @click="copyText(getMessageString())"
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
              </ul>
            </div>
          </div> -->
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
          class="px-[0.625rem] py-[0.5rem] rounded-lg app-bg-color-gradient-first text-sm delete-msg"
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
import axios from "axios";
import { ref, computed, onMounted } from "vue";
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
import CustomDropDownNew from "../common/CustomDropDownNew.vue";

export default {
  name: "MessagingCard",
  components: {
    VLazyImage,
    axios,
    Divider,
    CustomDropDownNew,
  },
  props: {
    message: {
      message: Object,
      openTest: Function,
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
    let enum_media_type = appConstants.media_Type;
    let isRecalculateShowDelete = ref(true);
    let conversation_id = props.conversation_id;
    let conversation_id_encoded = getUUIDtoEncodedString(props.conversation_id);
    let message_id = getUUIDtoEncodedString(props.message.uid);

    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
    let getter_device = computed(() => store.getters["login/getter_device"]);

    let available_dropdown_options = {
      Copy: {
        display_name: "Copy",
        id: "msg_copy",
      },
      Download: {
        display_name: "Download",
        id: "msg_download",
      },
      Delete: {
        display_name: "Delete",
        id: "msg_delete",
      },
    };
    let user_dropdown_options = ref([]);
    const dropdownbg = "#f2f2f2";

    let showTest = ref(false);
    let show_dropdown_menu = ref(false);

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

    onMounted(() => {});

    // function uploadVideo(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     try {
    //       const formData = new FormData();
    //       formData.append("file", file);

    //       // Make sure to replace 'YOUR_UPLOAD_API_URL' with your actual upload API URL
    //       const response = axios.post("YOUR_UPLOAD_API_URL", formData);

    //       if (response.status === 200) {
    //         this.message.media[0].media_url = response.data.url;
    //       } else {
    //         console.error(
    //           `Failed to upload video, server responded with status: ${response.status}`
    //         );
    //       }
    //     } catch (error) {
    //       console.error("Failed to upload video", error);
    //     }
    //   }
    // }
    // function getSentVideo() {
    //   if (
    //     props.message.media.length > 0 &&
    //     props.message.media[0].media_type === enum_media_type.VIDEO
    //   ) {
    //     return props.message.media[enum_media_0].media_url;
    //   }
    //   // return "enum_media_VIDEO";
    // }

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
        // return "background-color : var(--app-gradient-first-color) !important; filter: brightness(var(--lighter-primary));";
        return "background-color: #ffffff !important;border:  1px solid var(--app-primary-color)";
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

    function onCopyMessage() {
      let result = copyTextToClipboard(props.message.message_str);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Message copied to clipboard",
          life: 3000,
        });
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

      return replaceNewLineWithBreakLine(msg);
    }
    function getMediaURL() {
      let media = props.message.media[0];
      return `${import.meta.env.VITE_APP_MESSAGING_MEDIA_URL}${media.name}`;
      return (
        "https://olous-dev-bucket.s3.ap-south-1.amazonaws.com/media/messaging/" +
        media.name
      );
    }
    // function getSentVideo() {
    //   // Get the first media item from the message's media array
    //   let media = props.message.media[0];

    //   // Construct the URL for the video using the media name
    //   return (
    //     "https://olous-dev-bucket.s3.ap-south-1.amazonaws.com/media/messaging/" +
    //     media.name
    //   );
    // }
    // yesterday part told to uncomment 27-2023//
    // function downloadFile(app) {
    //   console.log("Applicants list", app[0]);
    //   downloadFileFromURL(getPDFURL(app[0]), app[0]);
    // }

    function downloadFile(app) {
      // console.log("Applicants list", app[0]);
      downloadFileFromURL(getPDFURL(app[0]), app[0]);
    }

    // function downloadFileFromURL(fileURL, app) {
    //   let data = {
    //     cv_url: fileURL,
    //   };
    //   console.log("pdf", fileURL);
    //   // var fileURL = window.URL.createObjectURL(result_pdfFile);
    //   console.log("pdf", fileURL);
    //   var fURL = document.createElement("a");
    //   fURL.href = fileURL;
    //   //var download_cv_name = getDownloadCVName(app);
    //   var download_cv_name = `olous_${app.original_file_name}`;
    //   fURL.download = download_cv_name;
    //   // fURL.setAttribute("download", download_cv_name); // Corrected line
    //   console.log("pdf", fURL);
    //   document.body.appendChild(fURL);
    //   console.log("result_pdfFile", fURL);
    //   fURL.click();
    //   document.body.removeChild(fURL);
    // }

    function downloadFileFromURL(url, app) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = `olous_${app.original_file_name}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          toast.add({
            severity: appConstants.toast_severity.INFO,
            summary: appConstants.toast_summary.INFO,
            detail: "Facing an issue, please try again",
            life: 3000,
          });
        });
    }

    function getPDFURL(app) {
      var url = `${import.meta.env.VITE_APP_MESSAGING_MEDIA_URL}${app.name}`;
      // console.log("url", url);
      return url;
    }
    // function getDownloadCVName(app) {
    // var file_name = this.setApplicantName(app.user_details[0]).replace(
    // " ",
    //""
    //);
    //}

    // yesterday part told to uncomment 27-2023//
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

    function copyText(TextToCopy) {
      navigator.clipboard.writeText(TextToCopy);

      showTest.value = false;
    }

    function msg_dropdown_item_clicked(value) {
      switch (value) {
        case available_dropdown_options.Copy.id:
          onCopyMessage();
          break;
        case available_dropdown_options.Download.id:
          downloadFile(props.message.media);
          break;
        case available_dropdown_options.Delete.id:
          onDeleteMessage();
          break;
      }
    }

    function openTest(data) {
      showTest.value = data;
    }

    function hideDropdown() {
      show_dropdown_menu.value = false;
    }

    function showDropdown() {
      setDropdownValue();
      show_dropdown_menu.value = true;
    }

    function setDropdownValue() {
      user_dropdown_options.value = [];
      if (props.message.message_str != "") {
        user_dropdown_options.value.push(available_dropdown_options.Copy);
      }

      if (props.message.media.length > 0) {
        user_dropdown_options.value.push(available_dropdown_options.Download);
      }

      if (showDeleteAction.value) {
        user_dropdown_options.value.push(available_dropdown_options.Delete);
      }
    }

    return {
      showTest,
      enum_message_type,
      enum_media_type,
      message_overlay_display,
      showDeleteAction,
      conversation_id,
      conversation_id_encoded,
      message_id,
      getter_showNav,
      shortForm,
      msgSentByMe,
      getMessageSentTime,
      onCopyMessage,
      onDeleteMessage,
      getMessageString,
      getMediaURL,
      downloadFile,
      downloadFileFromURL,
      getPDFURL,
      isInfoMessage,
      onMessageClick,
      getUserProfileURL,
      openTest,
      copyText,
      //getDownloadCVName,
      // getSentVideo,
      // uploadVideo,
      user_dropdown_options,
      dropdownbg,
      msg_dropdown_item_clicked,
      showDropdown,
      hideDropdown,
      show_dropdown_menu,
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
.sent-img-by-user {
  width: 200px;
  height: 225px;
  /* object-fit: cover; */
}
</style>
