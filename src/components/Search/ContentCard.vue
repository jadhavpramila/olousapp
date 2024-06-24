<template>
  <div v-if="details" class="w-full bg-[#343434] rounded-lg">
    <a :href="postUrl">
      <div class="cursor-pointer">
        <div class="flex flex-col">
          <div
            v-if="details._index === enum_search_response.DOCUMENT"
            class="h-[18rem] sm:h-[13rem] md:h-[13rem] lg:h-[13rem] rounded-lg bg-[#cad9e7] flex items-center justify-center"
          >
            <img src="/src/assets/pdf.svg" alt="" class="" />
          </div>
          <!--<img v-else class="rounded-lg h-[18rem] lg:h-[13rem] object-cover object-top" 
                                    :src="details._source.author.profile_image" alt="">-->
          <VLazyImage
            v-else
            class="rounded-t-[0.625rem] h-[18rem] sm:h-[13rem] md:h-[13rem] lg:h-[13rem] object-cover object-top"
            :src="setImageURL(details._source)"
            alt=""
          />
          <div class="flex flex-col text-sm justify-between p-2 h-[7rem]">
            <span class="overflow-hidden">
              <h1 v-if="details._source.content" class="text-sm">
                {{ details._source.content }}
              </h1>
              <h1 class="text-sm">{{ details._source.title }}</h1>
            </span>
            <div
              class="flex justify-between mt-4 text-[#d3d3d3] font-medium text-xs break-all"
            >
              <a
                v-if="details._index === enum_search_response.DOCUMENT"
                class="overflow-hidden"
                href="#"
                >{{ details._source.region }}
              </a>
              <div v-else>
                <!-- <a v-if="details._source.url== '' || details._source.url == undefined" class="overflow-hidden" href="" >{{getDisplayValue(details._source)}}</a>
                                              <a v-else class="overflow-hidden" :href="details._source.url" >{{getDisplayValue(details._source)}}</a>-->
                <span
                  v-if="
                    details._source.url == '' ||
                    details._source.url == undefined
                  "
                  class="overflow-hidden truncate text-[#d3d3d3]"
                  >{{ getDisplayValue(details._source) }}</span
                >
                <span v-else class="overflow-hidden truncate text-[#d3d3d3]">{{
                  getDisplayValue(details._source)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import { ref } from "vue";
import appConstants from "../../appConstants.js";
import VLazyImage from "v-lazy-image";
import { getUUID } from "../../common/js/commonFunctions.js";
import { useRouter, useRoute } from "vue-router";
import {
  createPostPageUrl,
  getCurrentHostName,
  createPostDocumentPageUrl,
} from "../../common/js/webUrls.js";
import {
  getAuthorName,
  getCoverImageURL,
  getHostName,
  getParamsForPostURL,
} from "/src/common/js/ReadPostData.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
export default {
  name: "ContentCard",
  props: {
    details: Object,
  },
  components: {
    VLazyImage,
  },
  async setup(props, context) {
    const enum_search_response = appConstants.search_response_types;

    const router = useRouter();

    let postUrl = ref();

    postUrl.value = await showPostDetails(props.details);

    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }
    function getDisplayValue(data) {
      var displayValue = "";

      if (data.url == "" || data.url == undefined) {
        displayValue = getAuthorName(data);
      } else {
        displayValue = getHostName(data.url);
      }

      return displayValue;
    }

    function setImageURL(data) {
      return getCoverImageURL(data);
    }
    function showPostDetails(detail) {
      if (detail._index == enum_search_response.POST) {
        return showPost(detail._source, appConstants.shape_page_postfix.POST);
      }
      if (detail._index == enum_search_response.DOCUMENT) {
        return showPost(
          detail._source,
          appConstants.shape_page_postfix.DOCUMENT
        );
      }

      if (detail._index == enum_search_response.HEADLINES) {
        return showPost(
          detail._source,
          appConstants.shape_page_postfix.HEADLINE
        );
      }
    }

    async function showPost(post, prefix) {
      let encode_str = getUUIDtoEncodedString(post.id) + prefix;
      let res = await getParamsForPostURL(post);
      let host = getCurrentHostName();

      if (prefix == appConstants.shape_page_postfix.DOCUMENT) {
        let url = createPostDocumentPageUrl(host, encode_str, res.title);
        // router.push({
        //   name: appConstants.routes.POST,
        //   params: {
        //     post_id: `${res.title}${appConstants.url_separator}${encode_str}${prefix}`,
        //   },
        // });
        return url;
      } else {
        let url = createPostPageUrl(host, encode_str, res.user_slur, res.title);
        // router.push({
        //   name: appConstants.routes.POST,
        //   params: {
        //     post_id: `${res.user_slur}_${res.title}${appConstants.url_separator}${encode_str}${prefix}`,
        //   },
        // });
        return url;
      }
    }
    return {
      enum_search_response,
      postUrl,
      getUUIDAsKey,
      getDisplayValue,
      setImageURL,
      showPostDetails,
      showPost,
    };
  },
};
</script>
