<template>
  <div v-for="(channel, index) in channelData" :key="index">
    <div @click="clickAcivities(channel)" class="cursor-pointer">
      <div class="channel-card">
        <div class="channel-media">
          <img :src="setImageURL(channel)" alt="image" class="channel-img" />
        </div>
        <!-- <div
            class="channel-media"
            v-if="channel.medias[0].mediaType == mediaType.VIDEO"
          >
            <video
              autoplay
              muted
              ref="videoVisible"
              loop
              controls="controls"
              controlsList="nodownload"
              class="w-full channel-img"
            >
              <source :src="channel.medias[0].name" type="video/mp4" />
            </video>
          </div> -->
        <div class="flex justify-center items-center py-3 px-5 h-14">
          <span class="channel-title app-text-color-secondary">{{
            channel.channel_name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appConstants from "../../appConstants.js";
import Card from "primevue/card";
import VLazyImage from "v-lazy-image";
import { useRouter, useRoute } from "vue-router";
import { getCoverImageURL } from "../../common/js/ReadPostData.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { getParamsForPostURL } from "/src/common/js/ReadPostData.js";
import {
  createPostPageUrl,
  getCurrentEncodedURL,
} from "../../common/js/webUrls.js";

export default {
  name: "ChannelCard",
  components: {
    Card,
    VLazyImage,
  },
  props: {
    channelData: {
      type: Array,
      default: [],
    },
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    let mediaType = appConstants.media_Type;

    function setImageURL(data) {
      //let url = getCoverImageURL(data);
      return `https://olous.s3.ap-south-1.amazonaws.com/media/images/${data.cover_image}`;
      // return url;
      //}
    }
    // async function showPost(post) {
    //   let encode_str =
    //     getUUIDtoEncodedString(post.id) + appConstants.shape_page_postfix.POST;
    //   let res = await getParamsForPostURL(post);
    //   let host = window.location.origin;
    //   let url = createPostPageUrl(host, encode_str, res.user_slur, res.title);
    //   window.open(url, "_self");
    //   //return url;
    // }
    function clickAcivities(userData) {
      //console.log("userData => ", userData.author.slug);
      let user_slug = userData.author_slug;
      //let slug = "kanavanand7a935";
      //if (getter_isUserLoggedIn.value == true) {
      router.push({
        name: appConstants.routes.VIDEOS,
        params: { user_slug: user_slug },
      });
      // } else {
      //   getCurrentEncodedURL();
      //   // let current_route = window.location.pathname
      //   // let encoded_route = btoa(current_route)
      //   // let decoded_route = atob(encoded_route);
      //   // router.push({ name: appConstants.routes.LOGINWITHPARAM, params:{current_route:encoded_route}});
      // }
    }

    return {
      setImageURL,
      //showPost,
      clickAcivities,
      mediaType,
    };
  },
};
</script>
<style>
.channel-card {
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  border: 0.5px solid var(--app-primary-color);
  background-color: var(--white);
}
.channel-media {
  height: 153px;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
.channel-img {
  height: 153px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  object-fit: cover;
}
.channel-title {
  font-size: 14px;
  font-weight: bold;
}
</style>
