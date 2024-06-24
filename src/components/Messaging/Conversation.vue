<template>
  <div :class="[isMobileDevice ? '' : 'form-container']">
    <div class="main-div h-auto app-text-color-secondary rounded-lg">
      <div class="md:grid md:grid-cols-9">
        <!-- conversation list -->
        <div
          class="border border-[#c3bfba] left-rounded md:col-span-4"
          v-if="show_conversation_list"
          :class="conversation_list_class"
        >
          <!-- <MessagingListSkeleton /> -->
          <!-- <ConversationListSkeleton /> -->
          <ConversationList
            @on_new_conversation_selected="setControlsVisibilityAsPerDevice()"
            @on_add_conversation_click="setControlsVisibilityAsPerDevice()"
          ></ConversationList>
        </div>

        <!-- Conversation -->
        <div
          class="md:col-span-5 lg:rounded-r-lg"
          :style="getBackgroundImage()"
          style="
            border-bottom: 1px solid #c3bfba;
            border-right: 1px solid #c3bfba;
            border-top: 1px solid #c3bfba;
          "
        >
          <!-- <span v-if="!show_messaging_list"
            >Please Select the User {{ show_messaging_list }}</span
          > -->
          <div v-if="show_messaging_list" class="bg-[#fff] lg:rounded-r-lg">
            <router-view :key="$route.fullPath"></router-view>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watchEffect, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import ConversationList from "./ConversationList.vue";
import MessagingList from "./MessagingList.vue";
import useEmitter from "../../composables/useEmitter.js";
import useStaticImage from "../../composables/useStaticImage.js";
import ConversationListSkeleton from "./ConversationListSkeleton.vue";
import MessagingListSkeleton from "./MessagingListSkeleton.vue";
import { useStore } from "vuex";
import { createUserTokenCookie } from "../../common/js/UserToken.js";
import { getCurrentInstance } from "vue";

export default {
  name: "Conversation",
  components: {
    ConversationList,
    MessagingList,
    ConversationListSkeleton,
    MessagingListSkeleton,
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const getStaticImageURL = useStaticImage();

    let show_conversation_list = ref(true);
    let show_messaging_list = ref(true);
    let conversation_list_class = ref("all-rounded");
    const $emitter = useEmitter();
    let isMobileDevice = ref();
    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
    const app = getCurrentInstance();

    let getter_messaging_media_mx_size = computed(
      () => store.getters["messaging/getter_messaging_media_mx_size"]
    );

    onMounted(() => {
      // alert("in messaging");
      setControlsVisibilityAsPerDevice();
      // console.log("getter_showNav in conver =>", getter_showNav.value);
      // if (!getter_showNav.value) {
      //   store.commit("bridge/commit_AndroidInstance", Android1);
      // }
      // $emitter.on("from_messagingList_show_conversation_clicked", () => {
      //   setControlsVisibilityAsPerDevice();
      // });

      // $emitter.on("emitUserSelected", (value) => {
      //   OnNewUserSelectedForChat(value);
      // });

      // window.addEventListener("backbutton", setControlsVisibilityAsPerDevice());
      window.addEventListener("resize", setControlsVisibilityAsPerDevice);

      getMessagingMediaMaxSize();
    });

    onUnmounted(() => {
      // $emitter.off("from_messagingList_show_conversation_clicked");
      // $emitter.off("messaging_icon_click");
      // window.removeEventListener(
      //   "backbutton",
      //   setControlsVisibilityAsPerDevice()
      // );
      window.removeEventListener("resize", setControlsVisibilityAsPerDevice);
    });

    watchEffect(() => {
      if (route.name) {
        setControlsVisibilityAsPerDevice();
      }
    });

    function setControlsVisibilityAsPerDevice() {
      // console.log("rout=>", route.name);
      let yPadding = document.querySelector(".left-right-page-padding-layout");
      // let main = document.querySelector(".app-container");

      if (
        route.name == appConstants.routes.MESSAGING ||
        route.name == appConstants.routes.NEW_CONVERSATION
      ) {
        // let footer = document.querySelector(".footer");
        // footer.style.display = "none";

        // console.log("if");
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          // document.documentElement.style.setProperty("--vh", `${vh}px`);
          // console.log("one if");
          show_conversation_list.value = true;
          show_messaging_list.value = false;
          isMobileDevice.value = true;
          if (yPadding != null) {
            yPadding.style.padding = "0px";
          }
          // yPadding.classList.remove("left-right-page-padding");
          store.commit("messaging/commit_is_mobile", isMobileDevice.value);
          route.meta.hideHeader = appConstants.hideHeader.NULL;
          conversation_list_class.value = "all-rounded";
          window.scrollTo(0, 1);
          // window.scrollTo(0, document.body.scrollHeight);

          // main.style.background = "#fff";

          // console.log("scroll pos", window);
        } else {
          // console.log("two else");
          show_conversation_list.value = true;
          show_messaging_list.value = true;
          isMobileDevice.value = false;
          window.scrollTo(0, 0);
          // window.scrollTo(0, document.body.scrollHeight);

          // yPadding.removeAttribute("style");
          store.commit("messaging/commit_is_mobile", isMobileDevice.value);
          route.meta.hideHeader = appConstants.hideHeader.LAPTOP;
          conversation_list_class.value = "left-rounded";
          // main.style.background = "#1C1C1C";
        }

        if (getter_showNav == false) {
          route.meta.hideHeader = appConstants.hideHeader.NULL;
        }
      } else {
        // let footer = document.querySelector(".footer");
        // footer.style.display = "block";

        if (yPadding != null) {
          yPadding.removeAttribute("style");
        }

        // main.style.background = "#1C1C1C";
      }

      if (
        route.name == appConstants.routes.CONVERSATION ||
        route.name == appConstants.routes.NEW_CONVERSATION
      ) {
        // let footer = document.querySelector(".footer");
        // footer.style.display = "none";
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          // console.log("three if");
          // window.scrollTo(0, 1);
          window.scrollTo(0, document.body.scrollHeight);

          show_conversation_list.value = false;
          show_messaging_list.value = true;
          isMobileDevice.value = true;
          if (yPadding != null) {
            yPadding.style.padding = "0px";
          }
          // yPadding.classList.remove("left-right-page-padding");
          store.commit("messaging/commit_is_mobile", isMobileDevice.value);
          route.meta.hideHeader = appConstants.hideHeader.NULL;
          // console.log("change =>", route.meta.hideHeader);
          conversation_list_class.value = "all-rounded";

          // main.style.background = "#fff";
        } else {
          // console.log("four else");
          show_conversation_list.value = true;
          show_messaging_list.value = true;
          isMobileDevice.value = false;
          // window.scrollTo(0, 1);
          window.scrollTo(0, document.body.scrollHeight);
          if (yPadding != null) {
            yPadding.removeAttribute("style");
          }
          // yPadding.removeAttribute("style");
          store.commit("messaging/commit_is_mobile", isMobileDevice.value);
          route.meta.hideHeader = appConstants.hideHeader.LAPTOP;
          conversation_list_class.value = "left-rounded";

          // main.style.background = "#1C1C1C";
        }
      } else {
        // yPadding.removeAttribute("style");
      }
    }

    function getBackgroundImage() {
      let image = getStaticImageURL("Chat_Background.svg");
      return `background-image: url(${image})`;
    }

    function getMessagingMediaMaxSize() {
      store
        .dispatch("messaging/action_fetchMessagingMediaMaxSize")
        .then((res) => {
          app.appContext.config.globalProperties.messagingMediaSizeInBytes =
            getter_messaging_media_mx_size.value;
        });
    }

    return {
      show_conversation_list,
      show_messaging_list,
      conversation_list_class,
      isMobileDevice,
      setControlsVisibilityAsPerDevice,
      getBackgroundImage,
    };
  },
};
</script>

<style>
.main-div {
  background-color: #fff;
}

.page-height {
  height: calc(100vh - 122px);
}

@media only screen and (max-width: 640px) {
  .page-height {
    height: calc(calc((100vh * 0.01) * 100) - 20px);
  }
  .page-height-for-conList {
    /* height: calc(calc((100vh * 0.01) * 100) + 10px); */
    height: calc(calc((100vh * 0.01) * 100));
  }
  .page-height-for-msgList {
    height: calc(calc((100vh * 0.01) * 100) - 180px);
  }
}
</style>
