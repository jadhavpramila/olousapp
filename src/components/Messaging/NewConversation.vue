<template>
  <!-- Actual design start here -->
  <div class="new-conversation md:pl-3 pt-1 w-full" id="new-conversation">
    <div class="flex flex-col popup-height" id="headerPart">
      <div class="flex-shrink-0">
        <div
          v-if="isShowSearch"
          class="ml-1 flex justify-between md:pt-3 pt-2"
          :class="[getter_showNav ? '' : 'hidden']"
        >
          <div class="font-weight-700 app-text-color-primary md:mb-2 text-lg">
            New Network
          </div>
          <button
            class="btn w-[4.375rem] h-[1.875rem] flex items-center justify-center w-full ml-auto"
            @click="onCancelNewMessage()"
          >
            <span class="text-sm">Cancel</span>
          </button>

          <!-- <div>
                  <img class="h-7 cursor-pointer" src="../../assets/Close-Black.svg" alt="" @click="btnCloseNewConversation">
                </div> -->
        </div>

        <!-- @item-unselect="onUserUnSelect($event)"
          @clear="onUserUnSelect($event)" 
          scrollHeight="60%"-->
        <div
          v-if="isShowSearch"
          id="searchDiv"
          class="relative mt-1.5 md:mt-0"
          :class="[getter_showNav ? '' : 'mt-14']"
        >
          <!-- {{ getter_searched_users.length }} -->
          <AutoComplete
            :multiple="false"
            v-model="dropdown_selected_user"
            :forceSelection="false"
            field="full_name"
            :delay="300"
            ref="headline"
            :autoOptionFocus="false"
            :minLength="two"
            scrollHeight="60%"
            appendTo="self"
            loadingIcon=""
            emptySearchMessage="No results found"
            placeholder="Search Network"
            panelClass="new_conversation_autocomplete-overlay rounded-lg"
            :suggestions="getsearchData()"
            @complete="searchData($event)"
            @item-unselect="onUserUnSelect($event)"
            class="form-control w-full items-center"
            @item-select="onUserSelection($event)"
          >
            <template #item="slotProps">
              <div class="ml-2.5" :key="getUUIDAsKey()">
                <div
                  class="py-1"
                  v-if="
                    slotProps.item.id != getter_user.id &&
                    slotProps.item.first_name != 'No Result Found'
                  "
                >
                  <!-- {{ getter_user.id }} -->
                  <!-- {{ slotProps.item.id }} -->
                  <!-- {{ getUUIDAsKey() }} -->
                  <!-- {{ slotProps.item.length }} -->
                  <div class="flex flex-row">
                    <div>
                      <div class="flex justify-center">
                        <div
                          v-if="slotProps.item.profile_image"
                          class="lg:w-10 lg:h-10 h-8 w-8"
                        >
                          <img
                            class="rounded-full"
                            :src="slotProps.item.profile_image"
                            alt=""
                          />
                        </div>
                        <div v-else>
                          <div
                            class="rounded-full text-[#3a3a41] flex lg:w-10 lg:h-10 h-8 w-8 justify-center items-center relative bg-[#ffffff] cursor-pointer border-[1px] border-[#c2c2c2]"
                          >
                            <span> {{ slotProps.item.name_initials }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="ml-3">
                      <!-- <div
                        class="text-sm font-weight-700 text-[#333] mb-[-0.188rem]"
                      > -->
                      <span
                        class="text-sm flex font-weight-700 text-[#333] mb-[-0.188rem]"
                        >{{ slotProps.item.first_name }}
                        {{ slotProps.item.last_name }}</span
                      >
                      <!-- </div> -->

                      <span class="font-light text-xs text-[#333]">
                        {{ getUserAbout(slotProps.item.about) }}
                      </span>
                    </div>
                  </div>
                  <!-- <hr class="w-full" m-0 p-0 /> -->
                </div>
              </div>
              <!-- no result found template -->
              <div
                class="px-2 py-1.5"
                v-if="slotProps.item.first_name == 'No Result Found'"
              >
                <div class="text-sm font-weight-700 text-[#333] mb-[-0.188rem]">
                  <span
                    >{{ slotProps.item.first_name }}
                    {{ slotProps.item.last_name }}</span
                  >
                </div>
              </div>
            </template>
            <span class="p-autocomplete-token-icon pi pi-times-circle"></span>
          </AutoComplete>
          <img
            :src="getStaticImage('Search_gray.svg')"
            class="absolute top-1 h-[44px] w-[44px]"
          />
          <span
            v-if="dropdown_selected_user != null"
            class="bg-[#f2f2f2] absolute top-3 right-2 h-6 w-6 p-1.5 mt-0.5 rounded-full"
            @click="clearSearchUser()"
          >
            <img :src="getStaticImage('Close_Message_Search.svg')" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="lg:pt-4 pt-2 mb-1 pl-0 lg:pl-6" v-if="selected_users != null">
    <!-- {{ selected_users }} -->
    <div class="flex flex-row mb-2.5">
      <div>
        <div class="flex justify-center">
          <div
            v-if="selected_users.profile_image"
            class="lg:w-10 lg:h-10 h-8 w-8"
          >
            <img
              class="rounded-full"
              :src="selected_users.profile_image"
              alt=""
            />
          </div>
          <div v-else>
            <div
              class="rounded-full text-[#3a3a41] flex lg:w-10 lg:h-10 h-8 w-8 justify-center items-center relative bg-[#d8d8d8] cursor-pointer"
            >
              <span> {{ selected_users.name_initials }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col w-full px-2 overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
      >
        <span
          class="cursor-pointer text-sm font-weight-700 text-[#333] mb-[-0.188rem] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          @click="getUserProfileURL(selected_users)"
          >{{ selected_users.first_name }}
          {{ selected_users.last_name }}
        </span>
        <!-- <a
            :href="getUserProfileURL(selected_users.slug)"
            class="cursor-pointer text-sm font-weight-700 text-[#333] mb-[-0.188rem] overflow-hidden whitespace-nowrap text-ellipsis show-ellipsis"
          >
            {{ selected_users.first_name }}
            {{ selected_users.last_name }}
          </a> -->
        <span
          v-if="selected_users.designation"
          class="font-light text-[0.625rem] text-[#333] whitespace-nowrap text-ellipsis show-ellipsis"
        >
          {{ selected_users.designation }}
        </span>
        <span
          v-else
          class="font-light text-[0.625rem] text-[#333] whitespace-nowrap text-ellipsis show-ellipsis"
        >
          {{ selected_users.about }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import AutoComplete from "primevue/autocomplete";
import appConstants from "../../appConstants.js";
import { useRouter, useRoute } from "vue-router";
// import { sendSelectedUserSlug } from "../../bridge/iosBridge.js";
import {
  createUSerProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";
import { eventToSentryRequest } from "@sentry/core";
import { getUUID } from "../../common/js/commonFunctions.js";
import { IosSendMessage } from "../../bridge/iosBridge.js";
import { sendMessageAndroid } from "../../bridge/androidBridge.js";
export default {
  name: "NewConversation",
  inheritAttrs: false,
  emits: [
    "closeNewConversation",
    "OnNewUserSelectedForChat",
    "OnSelectedUserRemoved",
  ],
  components: {
    AutoComplete,
  },

  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const headline = ref(null);
    let searchFor = ref("");
    let selected_users = ref(null);
    let dropdown_selected_user = ref(null);
    let is_user_selected = ref(false);
    const two = 2;
    let forceSelection = true;
    let selectFirstAuto = ref(true);
    let isShowSearch = ref(true);
    let getter_searched_users = computed(
      () => store.getters["messaging/getter_searched_users"]
    );
    let getter_device = computed(() => store.getters["login/getter_device"]);

    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_showNav = computed(() => store.getters["login/getter_showNav"]);

    onMounted(async () => {
      // console.log("router =>", route.query.slug);
      if (getter_device.value == appConstants.devices.IOS) {
        IosSendMessage();
      }
      if (getter_device.value == appConstants.devices.ANDROID) {
        console.log("sendMessageAndroid call !!!!");
        sendMessageAndroid();
      }
      //store.commit("messaging/commit_headerText", "Search Network");
      if (route.query.slug) {
        store.commit("login/commit_directFromUserProfile", true);
        await store.dispatch(
          "UserProfile/action_getUserProfile",
          route.query.slug
        );

        let users = store.getters["UserProfile/getter_UserProfile"];
        // onUserSelection(selected_users.user_details[0]);
        isShowSearch.value = false;
        selected_users.value = users.user_details[0];
        console.log("here !!!");
        context.emit("OnNewUserSelectedForChat", users.user_details[0]);
      }

      // console.log("selected_users =>", selected_users.user_details[0]);
      //searchDropdown.value.
      // console.log(headline.value.clientHeight);
      headline.value.focus();
      // if (!getter_showNav.value) {
      //   SendActivePageState(false);
      // }
      // let mainCls = document.querySelector(".page-height-for-msgList");
      // console.log("mainCls =>", mainCls);
      // mainCls.classList.remove("page-height-for-msgList");
      // mainCls.classList.add("page-height-for-conList");
    });

    watchEffect(() => {
      if (getter_searched_users.value.length != 0) {
        if (getter_searched_users.value[0].first_name == "No Result Found") {
          selectFirstAuto.value = false;
        } else {
          selectFirstAuto.value = true;
        }
      }
    });

    function btnCloseNewConversation() {
      context.emit("closeNewConversation");
    }

    function searchData(event) {
      dropdown_selected_user.value = event.query;
      let searchString = event.query.trim();
      if (searchString == "") {
        store.commit("messaging/commit_searched_users", []);
        return;
      }

      store.dispatch("messaging/action_searchUser", searchString);
    }

    function getKey(index) {
      return `searchedUser${index}`;
    }

    function getUserProfileURL(data) {
      // let host = getCurrentHostName();
      // let url = createUSerProfileURL(host, slug);
      // return url;
      if (getter_showNav.value) {
        router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: data.slug },
        });
      } else {
        // if (!getter_showNav.value) {
        //   sendSelectedUserSlug(data.id);
        // }
      }
    }
    function getsearchData() {
      return getter_searched_users.value;
    }

    function onUserSelection(user) {
      if (
        dropdown_selected_user.value != null &&
        selectFirstAuto.value == true
      ) {
        // console.log("in if");
        // console.log(selected_users.value.id)
        // store.dispatch("messaging/action_checkConversationIsPresent", selected_users.value.id).then(()=>{
        //   context.emit("OnNewUserSelectedForChat", selected_users);
        // })
        // is_user_selected.value = true;
        selected_users.value = dropdown_selected_user.value;
        // dropdown_selected_user.value = null;
        // console.log("user selected =>", selected_users.value);
        context.emit("OnNewUserSelectedForChat", selected_users.value);
        // console.log("user selected");
        // let searchTab = document.getElementById("searchDiv");
        // searchTab.style.display = "none";
        // let headerPart = document.getElementById("headerPart");
        // headerPart.style.display = "none";
        // let headerPartBtn = document.getElementById("headerPartBtn");
        // if (headerPartBtn) {
        //   headerPartBtn.style.display = "none";
        // }
      } else {
        // console.log("in else");
        dropdown_selected_user.value = null;
        // let searchTab = document.getElementById("searchDiv");
        // searchTab.style.display = "block";
        // let headerPart = document.getElementById("headerPart");
        // headerPart.style.display = "block";
        // let headerPartBtn = document.getElementById("headerPartBtn");
        // if (headerPartBtn) {
        //   headerPartBtn.style.display = "block";
        // }
        onUserUnSelect();

        // context.emit("OnSelectedUserRemoved");
      }
    }

    function onUserUnSelect() {
      // is_user_selected.value = false;
      selected_users.value = null;
      context.emit("OnSelectedUserRemoved");
      // alert("data cleared");
    }

    function onUserSearchStringClear(user) {
      // store.commit("messaging/commit_searched_users", []); //creates issue not showing selected user
    }

    function getUserAbout(aboutUser) {
      let msg = aboutUser;
      // if(msg.length > 30){
      //        msg = `${msg.substring(0, 30)}...`
      //   }
      return msg;
    }

    function onCancelNewMessage() {
      router.push({ name: appConstants.routes.MESSAGING });
    }
    function clearSearchUser() {
      // alert("test !!!");
      // console.log("in clearSearchUser");
      getter_searched_users.value = null;
      dropdown_selected_user.value = null;
    }

    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }

    return {
      getter_device,
      selectFirstAuto,
      selected_users,
      dropdown_selected_user,
      searchFor,
      getter_searched_users,
      headline,
      is_user_selected,
      two,
      getter_user,
      getter_showNav,
      isShowSearch,
      btnCloseNewConversation,
      searchData,
      getKey,
      onUserSelection,
      onUserUnSelect,
      getUserAbout,
      getUserProfileURL,
      onCancelNewMessage,
      onUserSearchStringClear,
      clearSearchUser,
      getUUIDAsKey,
      getsearchData,
    };
  },
};
</script>
<style scoped>
.list::-webkit-scrollbar {
  width: 10px;
  background-color: #f2f2f2;
}

.list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #afafaf;
}

.user-list {
  /* height: Calc(100vh - 300px); */
  overflow-y: auto;
  /* min-height : 50px */
}

.popup-height {
  /* height: Calc(100vh - 200px); */
  max-height: 350px;
}

/* .new_conversation_autocomplete-overlay { */
/* width: expression(
    document.getElementsByClassName("new_conversation_autocomplete-overlay")
      [0].style.minWidth
  ) !important; */

/* max-width: calc(100vw -20px) !important; */
/* } */
/* 
@media only screen and (max-width: 600px) {
  .new_conversation_autocomplete-overlay {
    max-width: 100vw !important;
  }
} */
@media only screen and (max-width: 640px) {
  .page-height-for-msgList {
    height: calc(calc((100vh * 0.01) * 100) - 95px);
  }
}
</style>
