<template lang="">
  <div class="form-container">
    <div
      class="max-w-[80rem] md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] antialiased pb-[3rem] h-full"
    >
      <div class="flex w-full">
        <div
          class="flex w-full lg:justify-center md:justify-center justify-start pb-6"
        >
          <span class="page-title lg:ml-20 md:ml-20 ml-0"
            >{{ getter_singleBoardDetails.name }}
          </span>
        </div>
        <div
          class="flex justify-end"
          v-if="!getter_singleBoardDetails.is_private && !isErrorMessageShow"
        >
          <div>
            <button
              class="bg-white flex inline-flex items-center justify-center lg:px-4 md:px-4 px-3 lg:py-2 md:py-2 py-1 rounded-md"
              @click="clickShare()"
            >
              <img
                :src="getStaticImage('Job-Share.svg')"
                alt=""
                class="lg:w-full md:w-full w-2/5"
              />
              <span class="font-bold lg:ml-1 md:ml-1 ml-0.5 text-black text-xs">
                Share
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <div v-for="(data, index) in getter_singleBoardData" :key="index">
              <a :href="postUrl" @click="postClick(data.object_json)">
                <div class="w-full bg-[#343434] rounded-lg">
                  <div class="cursor-pointer">
                    <div class="flex flex-col">
                      <div
                        v-if="data.object_json.medias.length > 0"
                        class="rounded-lg bg-[#f2f2f2] flex items-center justify-center"
                      >
                        <VLazyImage
                          class="rounded-t-lg object-cover object-top lg:h-[13rem] md:h-[13rem] sm:h-[13rem] h-[18rem] w-full"
                          :src="setImageURL(data.object_json)"
                          alt=""
                        />
                        <!-- <img
                          v-else
                          src="/src/assets/Text-Icon.svg"
                          alt=""
                          class="rounded-t-lg h-[1rem] sm:h-[1rem] md:h-[1rem] lg:h-[1rem] object-top w-full"
                          
                        /> -->
                      </div>
                      <div
                        v-else
                        class="rounded-lg bg-[#f2f2f2] flex items-center justify-center h-[18rem] sm:h-[13rem] md:h-[13rem] lg:h-[13rem]"
                      >
                        <img
                          src="/src/assets/Text-Icon.svg"
                          alt=""
                          class="rounded-t-lg h-[6.25rem] object-top w-full"
                        />
                      </div>
                      <div
                        class="flex flex-col text-sm justify-between py-2 px-3 h-[5rem]"
                      >
                        <span class="overflow-hidden">
                          <h1 class="break-all">
                            {{ setContent(data.object_json.content) }}
                          </h1>
                        </span>
                        <span class="text-xs text-[#d3d3d3] mt-3">
                          {{ setUsername(data.object_json.author) }}
                        </span>
                        <!--  
                          <div 
                        class="flex justify-between mt-4 text-gray-400 font-light text-xs break-all"
                      >
                        <span class="overflow-hidden">Lorem Ipsum is simply dummy text of the printing..</span>
                        <span class="overflow-hidden"></span>
                      </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- tabs, grid of cards, ads start here -->
    </div>
    <div
      v-if="isErrorMessageShow"
      class="flex flex-col justify-center text-center items-center h-full w-full"
    >
      <img :src="getStaticImage('Dummy-Not-Found-icon.svg')" alt="" />
      <h1 class="text-white text-2xl text-bold mt-2">
        This board is not available
      </h1>
    </div>
  </div>
</template>

<script>
import Ad from "/src/components/Ads/Ad.vue";
import { useStore } from "vuex";
import { getCoverImageURL } from "/src/common/js/ReadPostData.js";
import VLazyImage from "v-lazy-image";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import {
  getCurrentHostName,
  createBoardPageUrl,
} from "../../common/js/webUrls.js";
import appConstants from "../../appConstants.js";
import { getParamsForPostURL } from "/src/common/js/ReadPostData.js";
import { useRouter, useRoute } from "vue-router";
import { ref, computed, onMounted, reactive, watchEffect } from "vue";
import { copyTextToClipboard } from "../../common/js/commonFunctions.js";
import { useToast } from "primevue/usetoast";
import { useMeta } from "vue-meta";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import { createPostPageUrl } from "../../common/js/webUrls.js";
import { getParamsForBoards } from "/src/common/js/ReadPostData.js";

export default {
  name: "BoardDetailsChild",
  components: { VLazyImage },

  async setup() {
    const route = useRoute();
    let postUrl = ref();
    const store = useStore();
    const toast = useToast();
    let boardId = ref();
    let position = ref(0);
    let isFetchingNewData = false;
    let isNextCall = ref(true);
    let isErrorMessageShow = ref(false);
    let forbiddenErrorMessage = ref();

    let getter_boardData = computed(
      () => store.getters["board/getter_boardData"]
    );
    let getter_publicBoardData = computed(
      () => store.getters["board/getter_publicBoardData"]
    );

    let getter_singleBoardDetails = computed(
      () => store.getters["board/getter_singleBoardDetails"]
    );

    let getter_singleBoardData = computed(
      () => store.getters["board/getter_singleBoardData"]
    );

    let metaTitle = ref(appConstants.metaData.TITLE);
    let metaDescription = ref(appConstants.metaData.DESCRIPTION);
    let metaImage = ref(appConstants.metaData.IMAGE);
    let metaURL = ref(appConstants.metaData.URL);
    let metaImageAlt = ref(appConstants.metaData.META_IMAGE_ALT);
    let metaSiteName = ref(appConstants.metaData.SITE_NAME);
    let metaKeywords = ref("");

    useMeta(
      computed(() => ({
        title: metaTitle.value ?? "Olous",
        description: metaDescription.value ?? "",
        meta: [
          { property: "keywords", content: metaKeywords.value },
          // google
          { property: "og:title", content: metaTitle.value },
          { property: "og:description", content: metaDescription.value },
          { property: "og:image", content: metaImage.value },
          { property: "og:url", content: metaURL.value },
          { property: "og:site_name", content: metaSiteName.value },
          { property: "og:type", content: "website" },
          { property: "og:image:alt", content: metaImageAlt.value },
          //  Schema.org markup for Google+
          { itemprop: "name", content: metaTitle.value },
          { itemprop: "description", content: metaDescription.value },
          { itemprop: "image", content: metaImage.value },
        ],
      }))
    );

    let args = reactive({
      page: 1,
      offset: 0,
      limit: 20,
    });

    document.onscroll = function () {
      let pos = getVerticalScrollPercentage(document.body);
      position.value = Math.round(pos);
      // console.log("position =>", position.value);
    };
    let obj = {
      data: null,
      page: 1,
    };
    // store.commit("board/commit_singleBoardData", obj);
    await loadData();
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          // console.log("fetch");
          isFetchingNewData = true;
          loadData();
        }
      }
    });
    function getVerticalScrollPercentage(elm) {
      var p = elm.parentNode;
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      );
    }

    async function postClick(board) {
      let prefix = appConstants.shape_page_postfix.POST;
      let encode_str = (await getUUIDtoEncodedString(board.id)) + prefix;
      let res = await getParamsForPostURL(board);
      let host = await getCurrentHostName();

      let url = await createPostPageUrl(
        host,
        encode_str,
        res.user_slur,
        res.title
      );
     // console.log("url =>", url);
      // window.open(url.href);
      // router.resolve(url);
      postUrl.value = url;
    }

    function setImageURL(data) {
      let url = getCoverImageURL(data);
      //return `${import.meta.env.VITE_APP_MEDIA_IMGURL}${url}`;
      return url;
      //}
    }

    // function getTitle() {
    //   let id = getBoardID();
    //   let title = getter_boardData.value.boards.find((option) => {
    //     if (option.id === id) {
    //       return option.name;
    //     }
    //   });
    //   if (!title) {
    //     title = getter_publicBoardData.value.find((option) => {
    //       if (option.id === id) {
    //         return option.name;
    //       }
    //     });
    //   }
    //   return title.name;
    // }

    async function loadData() {
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;
      let data = {
        offset: args.offset,
        page: args.page,
        limit: args.limit,
        id: getBoardID(),
      };
      try {
        await store
          .dispatch("board/action_getSingleBoardData", data)
          .then((res) => {
            //console.log("response board", res);
            isFetchingNewData = false;
            args.page = args.page + 1;
            if (res.next == null) {
              isNextCall.value = false;
            }
          });
      } catch (error) {
        if (error.status == 403) {
          isErrorMessageShow.value = true;
          //console.log(isErrorMessageShow.value);
          forbiddenErrorMessage.value = error.data.message;
        }
        //console.log("403 message============", forbiddenErrorMessage.value);
      }
      getMetaData();
    }

    function getBoardID() {
      let titleStr = route.params.board_id;
      let id = titleStr.split(appConstants.url_separator_boards).pop();
      return id;
    }
    function clickShare() {
      let host = window.location.origin;
      let path = window.location.pathname;
      let url = host + path;
      //console.log("url", url);
      let result = copyTextToClipboard(url);
      if (result) {
        toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
    }
    function setContent(content) {
      let maxLength = 68;
      let text = content;
      if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
      }
      return text;
    }
    function setUsername(author) {
      let name = author.first_name + " " + author.last_name;
      return name;
    }
    async function getMetaData() {
      if (getter_singleBoardDetails.value) {
        let data = getter_singleBoardDetails.value;
        let boardData = getter_singleBoardData.value[0].object_json;
        //console.log("image", getter_singleBoardData.value[0].object_json);
        let boardId = getter_singleBoardData.value[0].board;
        let combineData = {
          name: getter_singleBoardDetails.value.name,
          author: getter_singleBoardDetails.value.board_author,
        };

        //set title
        let userName =
          getter_singleBoardDetails.value.board_author.first_name +
          " " +
          getter_singleBoardDetails.value.board_author.last_name;

        metaTitle.value = ` ${userName} | ${getter_singleBoardDetails.value.name} `;

        //set description
        let location = "";
        let description = "";
        if (data.description) {
          description = data.description;
          if (description.length > appConstants.MetaLength.DESCRIPTION) {
            description = `${description.substring(
              0,
              appConstants.MetaLength.DESCRIPTION
            )}...`;
          }
          metaDescription.value = description;
        } else {
          metaDescription.value =
            "Clip and share your favourite videos and posts in Boards. An interactive way to find, share and save posts about any topic for your future reference.";
        }

        //set Image
        let imageURL = "";
        //console.log("image", boardData.medias);
        if (boardData?.medias[0]?.cover_image) {
          imageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
            boardData?.medias[0]?.cover_image
          }`;
          metaImage.value = createImageUrlForOgTags(imageURL, true);
          // }

          // metaImage.value =  createImageUrlForOgTags(imageURL, true)
        } else {
          imageURL = boardData?.medias[0]?.name;
          metaImage.value = createImageUrlForOgTags(imageURL, true);
        }
        // console.log("board id", boardId);
        //set URL
        let encode_str = getUUIDtoEncodedString(boardId);

        let res = await getParamsForBoards(combineData);
        //console.log("res", res.title);
        let host = getCurrentHostName();
        let URL = createBoardPageUrl(
          host,
          encode_str,
          res.user_slur,
          res.title
        );
        //console.log("res", URL);
        metaURL.value = URL;

        //set Alt text
        metaImageAlt.value = "board_cover_image";
      }
    }

    return {
      boardId,
      postUrl,
      getter_publicBoardData,
      getter_boardData,
      getter_singleBoardData,
      isNextCall,
      position,
      isFetchingNewData,
      getter_singleBoardDetails,
      isErrorMessageShow,
      forbiddenErrorMessage,
      postClick,
      setImageURL,
      // getTitle,
      loadData,
      getBoardID,
      clickShare,
      setContent,
      setUsername,
    };
  },
};
</script>

<!--<style scoped>
@import url("https://css.gg/more-vertical.css");
</style>-->
