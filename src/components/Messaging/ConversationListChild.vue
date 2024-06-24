<template>
  <!-- class="flex flex-col page-height lg:mt-0 md:mt-0 mt-20"  :class="[isMobile ? 'page-height-for-conList' : 'page-height']"-->
  <div
    class="flex flex-col bg-[#fff] lg:rounded-l-lg rounded-tr-lg"
    :class="[
      isMobile ? 'page-height-for-conList' : 'page-height border-r-[1px]',
    ]"
  >
    <!-- <div :class="[getter_showNav ? '' : 'lg:mt-0 md:mt-0 mt-20']"> -->
    <div
      v-if="getter_showNav"
      class="grid gap-3 md:pt-4 pt-0 md:pr-6 md:pl-6 pr-2 pl-3 mb-1 pb-2 rounded-tl-lg"
      :class="[
        getter_showNav ? 'lg:mt-0 md:mt-0 mt-20 border-b-[1px]' : 'mt-1',
      ]"
    >
      <div class="">
        <div
          class="font-weight-700 md:pb-3 lg:text-lg text-base pl-1"
          :class="[getter_showNav ? '' : 'hidden']"
        >
          Olous Network
        </div>
        <!-- <AutoComplete /> -->
        <div class="flex flex-row mb-[4px] md:mt-0 mt-2">
          <div style="flex-grow: 1" class="md:mr-4 mr-1">
            <div class="flex relative">
              <input
                placeholder="Search Conversation "
                type="text"
                v-model="conversation_search_query"
                ref="searchName"
                class="mt-0 pr-16 form-control absolute w-full"
                @keyup="onConversationSearchKeyUp"
              />
              <!-- search button -->
              <button
                v-if="!isShowCloseButton"
                class="search-conversation absolute right-0 cursor-pointer w-[44px] h-[44px]"
                @click="btnSearchConversationClick()"
              >
                <!-- <img
                  draggable="false"
                  :src="getStaticImage('Search_Messages.svg')"
                /> -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 27.414 27.414"
                >
                  <g transform="translate(1 1)">
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></circle>
                    <line
                      x1="8"
                      y1="8"
                      transform="translate(17 17)"
                      fill="none"
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    ></line>
                  </g>
                </svg>
              </button>
              <!-- close button -->
              <button
                v-if="isShowCloseButton"
                class="search-conversation absolute right-0 cursor-pointer w-[44px] h-[44px] rounded-full"
                @click="clearSearchConversation()"
              >
                <!-- <img
                  :src="
                    getStaticImage('Clear_Message_Search_With_Background.svg')
                  "
                /> -->
                <img
                  draggable="false"
                  style="padding-right: 1px"
                  src="../../assets/Search-Close-test.svg"
                />
              </button>
              <!-- <span
                v-if="isShowCloseButton"
                class="
                  bg-[#f2f2f2]
                  absolute
                  right-2
                  mt-3.5
                  h-6
                  w-6
                  p-1.5
                  rounded-full
                "
              >
                <img
                  v-if="conversation_search_query != ''"
                  :src="getStaticImage('Close_Message_Search.svg')"
                  @click="clearSearchConversation()"
                />
              </span> -->
            </div>
          </div>
          <div class="w-11 h-11 ml-2">
            <button
              class="rounded-full app-bg-color-primary flex justify-center items-center cursor-pointer h-[44px] w-[44px] new-conversation-btn"
              @click="showNewConversationPopup"
            >
              <!-- <img
                class="cursor-pointer h-[44px] w-[44px]"
                :src="getStaticImage('ADD_black_bg.svg')"
              /> -->
              <img
                draggable="false"
                class=""
                src="../../assets/add_conversation_white.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getter_showNav" class="md:pl-6 pl-4 pb-2">
      <h1
        v-if="getter_conversation_list.length > 0"
        class="text-[#1c1c1c] lg:text-lg text-base font-weight-700"
      >
        Conversations
      </h1>
    </div>

    <div
      class="overflow-y-auto conversation-card-list w-full h-full"
      @scroll="onscroll"
      ref="conversation_scrollbar"
    >
      <div v-if="getter_conversation_list.length > 0">
        <div
          v-for="(conversation, index) in getter_conversation_list"
          :key="getKey(conversation, index)"
          @click="conversationSelected(conversation)"
          :class="isConversationSelected(conversation)"
          class="cursor-pointer py-1 remove-highlite"
        >
          <!-- {{ conversation.conversation_with.full_name }} -->
          <ConversationCard :conversation="conversation" class="md:px-6 px-4" />
        </div>
      </div>
      <div v-else class="w-full h-full flex">
        <p v-if="conversation_search_query.trim() != ''" class="m-auto">
          No conversation found
        </p>
        <p
          v-else
          class="flex w-full items-center leading-6 mb-1 md:pl-6 md:pr-6 md:pt-4 pb-2 pl-3 pr-3 pt-2"
        >
          Send messages to your network and connect for meaningful professional
          conversations
        </p>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import ConversationCard from "./ConversationCard.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed, onUnmounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import moment from "moment";
// import { getUUID } from "../../common/js/commonFunctions.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import {
  sendUserDataToIOS,
  messageSearchQuery,
} from "../../bridge/iosBridge.js";
import {
  // getToastMessage,
  // callSyn,
  sendUserDataToAndroid,
  messageQueryAndroid,
} from "../../bridge/androidBridge.js";
import { searchConversationFromList } from "../../common/js/messagingFunctions.js";

export default {
  name: "ConversationListChild",
  components: {
    ConversationCard,
  },
  emits: ["on_new_conversation_selected", "on_add_conversation_click"],
  async setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const searchName = ref(null);

    const conversation_scrollbar = ref(null);
    let lastScroll = ref(0);
    let selectedConversation = ref("");
    let conversation_search_query = ref("");
    let polling = ref(null);
    const limit = 20;
    let last_record_date = ref("");
    let timer_last_record_date = ref("");
    let next = ref(true);

    let getter_conversation_list = computed(
      () => store.getters["messaging/getter_conversation_list"]
    );

    let getter_device = computed(() => store.getters["login/getter_device"]);

    let isMobile = computed(() => store.getters["messaging/getter_is_mobile"]);
    let isShowCloseButton = ref(false);
    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);
    // let getter_androidInstace = computed(
    //   () => store.getters["login/getter_androidInstace"]
    // );

    onMounted(async () => {
      if (getter_device.value == appConstants.devices.IOS) {
        messageSearchQuery();
      }

      if (getter_device.value == appConstants.devices.ANDROID) {
        // SendActivePageState(true);
        // sendString();
        // callSyn();
        // getToastMessage();
        messageQueryAndroid();
      }
      // sendString(name);

      // await getNewConversations();
      isShowCloseButton.value = false;
      window.addEventListener("resize", isMessagingRouteShowFirstConversation);
      // console.log("route.meta.hideHeader =>", route.meta.hideHeader);
    });

    onUnmounted(() => {
      store.commit("messaging/commit_reset_Conversation_list");
      stopTimerAPIFetch();
      window.removeEventListener(
        "resize",
        isMessagingRouteShowFirstConversation
      );
      store.commit("messaging/commit_selected_conversation", null);
    });

    watchEffect(() => {
      //if it is browser and we are on messaging route, and has conversation list show first conversation
      if (route.name) {
        isMessagingRouteShowFirstConversation();
      }
    });

    await loadData();

    async function loadData() {
      await getNewConversations();
      if (route.name == appConstants.routes.CONVERSATION) {
        // console.log(" if ");
        await fetchListOfConversation(false);
      } else {
        // console.log("else");
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          // console.log("else if ");
          //it is mobile view o do not load first conversation.
          //in mobile only one view is visible either conversation list or messaging list so
          // let main = document.querySelector(".app-container");
          // main.style.background = "#1c1c1c";
          await fetchListOfConversation(false);
        } else {
          // console.log("else if else");
          await fetchListOfConversation(true);
        }
      }
      resetUserTotalUnreadMessageCount();
    }

    function resetUserTotalUnreadMessageCount() {
      store.dispatch("messaging/action_resetUserTotalUnreadMessageCount");
    }

    function isMessagingRouteShowFirstConversation() {
      if (route.name == appConstants.routes.MESSAGING) {
        if (window.innerWidth < appConstants.css_breakpoints.MD) {
          //it is mobile view o do not load first conversation.
          //in mobile only one view is visible either conversation list or messaging list so
        } else {
          showFirstConversation();
        }
      }
    }

    function showFirstConversation() {
      // console.log("showFirstConversation");
      //   if (getter_conversation_list.value.length > 0) {
      //     conversationSelected(getter_conversation_list.value[0]);
      //   }
    }

    function stopTimerAPIFetch() {
      clearInterval(polling.value);
    }

    function resetAllValues() {
      conversation_scrollbar.value = null;
      lastScroll.value = 0;
      selectedConversation.value = "";
      last_record_date.value = "";
      next.value = true;
    }

    async function fetchListOfConversation(is_select_first_conversation) {
      if (!next.value) {
        return;
      }

      let data = {
        limit: limit,
        last_record_date: last_record_date.value,
        search_query: "",
      };

      let searchString = conversation_search_query.value.trim();
      if (searchString != "") {
        data.search_query = searchString;
      }

      // functionFor Api call
      await searchConversationFromList(data).then((res) => {
        next.value = res.next;
        last_record_date.value = res.last_record_date;
        timer_last_record_date.value = res.last_fetch_dt;

        if (route.name == appConstants.routes.NEW_CONVERSATION) {
          return;
        }

        if (is_select_first_conversation) {
          showFirstConversation();
        }
      });

      // await store
      //   .dispatch("messaging/action_getConversationList", data)
      //   .then((res) => {
      //     next.value = res.next;
      //     last_record_date.value = res.last_record_date;
      //     timer_last_record_date.value = res.last_fetch_dt;

      //     if (route.name == appConstants.routes.NEW_CONVERSATION) {
      //       return;
      //     }

      //     if (is_select_first_conversation) {
      //       showFirstConversation();
      //     }
      //   });
    }

    function getKey(con, index) {
      // var res = getUUID();
      return `conversation${con.uid}`;
    }

    function onscroll(value) {
      let currentScroll = value.target.scrollTop;
      let is_scrolling_drown = true;
      let isFetchNewRecords = false;

      if (currentScroll > 0 && lastScroll.value <= currentScroll) {
        lastScroll.value = currentScroll;
        is_scrolling_drown = true;
      } else {
        lastScroll.value = currentScroll;
        is_scrolling_drown = false;
      }

      if (is_scrolling_drown) {
        //https://medium.com/@jbbpatel94/difference-between-offsetheight-clientheight-and-scrollheight-cfea5c196937 scrollbar properties
        if (
          Math.round(value.target.scrollTop) >=
          value.target.scrollHeight - value.target.clientHeight
        ) {
          isFetchNewRecords = true;
        }
      }

      if (isFetchNewRecords) {
        fetchListOfConversation(false);
      }
    }

    function conversationSelected(conversation) {
      // console.log("conversation =>", conversation);
      if (getter_device.value == appConstants.devices.IOS) {
        // console.log("conversation =>", conversation);
        sendUserDataToIOS(conversation);
      } else if (getter_device.value == appConstants.devices.ANDROID) {
        // console.log("sendUserDataToAndroid", conversation);
        sendUserDataToAndroid(conversation);
      } else {
        selectedConversation.value = conversation;
        store.commit(
          "messaging/commit_selected_conversation",
          conversation.uid
        );

        router
          .push({
            name: appConstants.routes.CONVERSATION,
            params: {
              conversation_id: getUUIDtoEncodedString(conversation.uid),
            },
            // params: { conversation_id: conversation.uid },
          })
          .then(() => {
            emit("on_new_conversation_selected");
            clearSearchConversation();
          });
      }
    }

    function isConversationSelected(conversation) {
      let selected_conversation_class = "conversation-selected";
      let notSelected_conversation_class = "not-selected";

      if (route.name == appConstants.routes.CONVERSATION) {
        let current_conversation = route.params.conversation_id;

        if (current_conversation == getUUIDtoEncodedString(conversation.uid)) {
          return selected_conversation_class;
        } else {
          return notSelected_conversation_class;
        }
      } else {
        return notSelected_conversation_class;
      }
    }

    function onConversationSearchKeyUp(e) {
      // console.log("e.keyCode =", e.keyCode);

      if (e.keyCode === 13) {
        if (conversation_search_query.value.trim() != "") {
          isShowCloseButton.value = true;
          searchConversation();
        } else {
          searchName.value.focus();
        }
      } else {
        if (conversation_search_query.value.trim() == "") {
          searchConversation();
        } else {
          searchName.value.focus();
        }
      }
    }

    function btnSearchConversationClick() {
      if (conversation_search_query.value.trim() != "") {
        isShowCloseButton.value = true;
        searchConversation();
      } else {
        searchName.value.focus();
      }
    }

    function searchConversation() {
      resetAllValues();
      if (window.innerWidth < appConstants.css_breakpoints.MD) {
        //it is mobile view o do not load first conversation.
        //in mobile only one view is visible either conversation list or messaging list so
        fetchListOfConversation(false);
      } else {
        fetchListOfConversation(true);
      }
    }

    function clearSearchConversation() {
      isShowCloseButton.value = false;

      if (conversation_search_query.value.trim() != "") {
        conversation_search_query.value = "";
        searchConversation();
        searchName.value.focus();
      }
    }

    function getLatestConversationTimestamp() {
      if (getter_conversation_list.value.length > 0) {
        // let milliseconds = moment(getter_conversation_list.value[0].last_message_date).format('x')
        let milliseconds = moment("2022-07-26T09:14:49.167000").format("x");
        let timestamp = milliseconds / 1000;
        console.log(timestamp);
      }
    }

    function getNewConversations() {
      polling.value = setInterval(() => {
        let data = {
          last_fetch_dt: timer_last_record_date.value,
        };

        store
          .dispatch("messaging/action_fetchWithTimerNewConversation", data)
          .then((res) => {
            if (res.isNewConversations == true) {
              timer_last_record_date.value = res.last_fetch_dt;
            }
          });
      }, 10000);
    }

    function showNewConversationPopup() {
      clearSearchConversation();
      router.push({ name: appConstants.routes.NEW_CONVERSATION }).then(() => {
        emit("on_add_conversation_click");
      });
    }

    return {
      isShowCloseButton,
      getter_conversation_list,
      conversation_scrollbar,
      selectedConversation,
      conversation_search_query,
      searchName,
      isMobile,
      getter_showNav,
      getter_device,
      onscroll,
      getKey,
      conversationSelected,
      isConversationSelected,
      btnSearchConversationClick,
      clearSearchConversation,
      showNewConversationPopup,
      onConversationSearchKeyUp,
    };
  },
};
</script>

<style>
.conversation-card-list {
  min-height: 100px;
}

.left-rounded {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.all-rounded {
  border-radius: 0.5rem;
}

.conversation-selected {
  background: var(--app-secondary-color);
  /* background: var(--app-gradient-first-color); */
}

.remove-highlite {
  -webkit-tap-highlight-color: transparent !important;
}

.new-conversation-btn:hover {
  background: var(--app-primary-color) !important;
}
</style>
