<template>
  <div class="form-container">
    <!--<metainfo>
      <template v-slot:title="{ content }">{{ content ? `${content} | SITE_NAME` : `Olous` }}</template>
    </metainfo>-->
    <div
      v-if="isloadpage"
      class="md:mx-auto bg-[#fff] antialiased pb-[2rem] h-full"
    >
      <div class="mt-10 space-y-[2rem] text-white">
        <div class="space-y-6 md:space-y-0 md:space-x-[1rem] justify-between">
          <div class="flex flex-col">
            <div class="grid lg:grid-cols-6 grid-cols-12 gap-3 pb-4">
              <!-- Post Details -->
              <div class="lg:col-span-4 col-span-12">
                <SinglePost
                  :postData="getter_post"
                  :post_type="post_prefix"
                  :showFollowing="showFollowing"
                  :key="getUUIDAsKey()"
                />

                <!-- suggestions -->
                <div class="flex flex-col">
                  <span
                    class="pt-5 pb-1 text-lg app-text-color-secondary font-weight-700"
                    >More Suggestions</span
                  >
                  <div
                    class="pt-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 overflow-auto pb-[2rem] w-full"
                  >
                    <div
                      class=""
                      v-for="(data, index) in suggestionsData"
                      :key="index"
                    >
                      <!-- :author="setAuthor(data.author)" -->
                      <!-- <a :href="showPost(data)"> -->
                      <PostCard
                        :postData="data"
                        :author="data.author"
                        :style="{ border: borderRadius }"
                      />
                      <!-- </a> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- Advertisement -->
              <div class="col-span-2"></div>
            </div>
          </div>

          <!-- adds -->
          <!--<Ad class="mx-4" />-->
        </div>
      </div>
    </div>
    <div v-else>
      <NotFound></NotFound>
    </div>
  </div>
</template>

<script>
import Ad from "/src/components/Ads/Ad.vue";
import SinglePost from "/src/components/Post/SinglePost.vue";
import PostCard from "/src/components/Post/PostCard.vue";
import { mapActions, mapGetters } from "vuex";
import appConstants from "/src/appConstants.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import { getUUID } from "../../common/js/commonFunctions.js";
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

import { computed } from "vue";
import { useStore } from "vuex";

import { useMeta, useActiveMeta } from "vue-meta";
import {
  getOGCoverImageURL,
  getParamsForPostURL,
} from "/src/common/js/ReadPostData.js";
import { watch } from "vue";
import { createPostPageUrl } from "../../common/js/webUrls.js";
import { getInterestValues } from "../../common/js/getValuesFromIds.js";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import NotFound from "../Layout/NotFound.vue";

export default {
  name: "PostChild",
  components: {
    SinglePost,
    PostCard,
    NotFound,
  },
  props: {
    post_id: String,
  },

  async setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const res = ref(null);
    const res1 = ref(null);
    const showFollowing = ref(false);
    let isloadpage = ref(false);

    let borderRadius = "4px";
    let suggestionsData = ref([]);
    let post_prefix = appConstants.shape_page_postfix.POST;

    let getter_post = computed(() => store.getters["post/getter_post"]);
    let getter_SuggestionsPost = computed(
      () => store.getters["post/getter_SuggestionsPost"]
    );

    // let metaTitle = ref("");
    // let metaDescription = ref("");
    // let metaImage = ref("");
    // let metaURL = ref(appConstants.current_URL);
    // let metaImageAlt = ref("");

    let metaTitle = ref(appConstants.metaData.TITLE);
    let metaDescription = ref(appConstants.metaData.DESCRIPTION);
    let metaImage = ref(appConstants.metaData.IMAGE);
    let metaURL = ref(appConstants.metaData.URL);
    let metaImageAlt = ref("Olous Construction Post");
    let metaSiteName = ref(appConstants.metaData.SITE_NAME);
    let metaKeywords = ref(appConstants.metaData.KEYWORDS);

    useMeta(
      computed(() => ({
        title: "Post | Olous",
        description: metaTitle.value ?? "",
        meta: [
          { property: "keywords", content: metaKeywords.value },
          // google
          { property: "og:title", content: metaTitle.value },
          { property: "og:description", content: metaDescription.value },
          { property: "og:image", content: metaImage.value },
          { property: "og:url", content: metaURL.value },
          { property: "og:site_name", content: metaSiteName.value },
          { property: "og:type", content: "article" },
          { property: "og:image:alt", content: metaImageAlt.value },
          //  Schema.org markup for Google+
          { itemprop: "name", content: metaTitle.value },
          { itemprop: "description", content: metaDescription.value },
          { itemprop: "image", content: metaImage.value },
        ],
      }))
    );

    watchEffect(() => {
      if (getter_post.value == "") {
        return;
      }
      // getMetaData();

      // metaDescription.value = getMetaDescription();
      // metaTitle.value = getMetaTitle();
      // metaImage.value = getMetaCoverImage();
    });

    await getData(props.post_id);

    function getUUIDAsKey() {
      var res = getUUID();
      return res;
    }

    function setAuthor(data) {
      // console.log(data);
      let author = getter_SuggestionsPost.value.authors.map((res) => {
        if (res.id == data) {
          // console.log('in if', res);
          return res;
        }
      });
      // console.log(author);
      return author;
    }

    // function showPost(post_id) {
    //   let encode_str = getUUIDtoEncodedString(post_id);

    //   router.push({
    //     name: appConstants.routes.POST,
    //     params: { post_id: `${encode_str}` },
    //   });
    // // }
    // async function showPost(post) {
    //   // let encode_str = getUUIDtoEncodedString(post_id);

    //   // router.push({
    //   //   name: appConstants.routes.POST,
    //   //   params: {
    //   //     post_id: `${encode_str}${appConstants.shape_page_postfix.POST}`,
    //   //   },
    //   // });

    //   let encode_str = getUUIDtoEncodedString(post.id);
    //   let res = await getParamsForPostURL(post);
    //   let host = window.location.origin;
    //   if (host.charAt(host.length - 1) == "/") {
    //     host = host.substring(0, host.length - 1);
    //   }
    //   return (
    //     host +
    //     "/post/" +
    //     `${ res?.user_slur}_${res?.title}${appConstants.url_separator}${encode_str}`
    //   );
    //   // let newUrl =
    //   //   host +
    //   //   "/post/" +
    //   //   res?.user_slur +
    //   //   "_" +
    //   //   res?.title +
    //   //   appConstants.url_separator +
    //   //   encode_str +
    //   //   appConstants.shape_page_postfix.POST;
    //   // console.log("newUrl", newUrl);
    //   // router.push({
    //   //   name: appConstants.routes.POST,
    //   //   params: {
    //   //     post_id: `${res.user_slur}_${res.title}${appConstants.url_separator}${encode_str}${appConstants.shape_page_postfix.POST}`,
    //   //   },
    //   // });
    //  // return newUrl;
    // }

    async function getData(post_id) {
      const type = post_id[post_id.length - 1];
      const id = post_id.slice(0, -1);
      post_prefix = type;

      if (type == appConstants.shape_page_postfix.POST) {
        let res = await store
          .dispatch("post/action_fetchPost", id)
          .then(() => {
            isloadpage.value = true;
          })
          .catch(() => {
            isloadpage.value = false;
          });

        getMetaData();
        await store.dispatch(
          "post/action_getSuggestionsPost",
          getter_post.value.id
        );

        suggestionsData.value = getter_SuggestionsPost.value;
        // store.dispatch("post/action_fetchPost", id).then(() => {
        // store.dispatch("post/action_getSuggestionsPost", getter_post.value.id).then(() => {
        //     suggestionsData.value = getter_SuggestionsPost.value.posts;
        //   });
        // });
      }
      if (type == appConstants.shape_page_postfix.DOCUMENT) {
        let res = await store
          .dispatch("post/action_fetchDocument", id)
          .then(() => {
            isloadpage.value = true;
          })
          .catch(() => {
            isloadpage.value = false;
          });

        getMetaData();
        let res1 = await store.dispatch(
          "post/action_getSuggestionsPost",
          getter_post.value.id
        );
        suggestionsData.value = getter_SuggestionsPost.value;

        //   store.dispatch("post/action_fetchDocument", id).then(() => {
        //   store.dispatch("post/action_getSuggestionsPost", getter_post.value.id).then(() => {
        //       suggestionsData.value = getter_SuggestionsPost.value.posts;
        // });
        //   });
      }

      if (type == appConstants.shape_page_postfix.HEADLINE) {
        let res = await store
          .dispatch("post/action_fetchHeadlines", id)
          .then(() => {
            isloadpage.value = true;
          })
          .catch(() => {
            isloadpage.value = false;
          });

        getMetaData();
        await store
          .dispatch("post/action_getSuggestionsPost", getter_post.value.id)
          .then(() => {
            isloadpage.value = true;
          })
          .catch(() => {
            isloadpage.value = false;
          });
        suggestionsData.value = getter_SuggestionsPost.value;

        // store.dispatch("post/action_fetchHeadlines", id).then(() => {
        //   store.dispatch("post/action_getSuggestionsPost", getter_post.value.id).then(() => {
        //       suggestionsData.value = getter_SuggestionsPost.value.posts;
        // });
        // });
      }
    }

    async function getMetaData() {
      if (getter_post.value == "" || getter_post.value == undefined) {
        return;
      }

      //get title
      let title = "";
      if (getter_post.value.title.length > 0) {
        title = getter_post.value.title;
      } else {
        if (
          getter_post.value.content != null &&
          getter_post.value.content.length > 0
        ) {
          title = getter_post.value.content;
        }
      }
      let defaultTitle =
        "Become Digital Construction Influencers & Get known | Olous";

      // debugger;

      if (title.length == 0) {
        title = defaultTitle;
      } else {
        if (title.length < 30) {
          title = `${title} | Olous`;
        } else {
          if (title.length > appConstants.MetaLength.TITLE) {
            title = `${title.substring(0, appConstants.MetaLength.TITLE)}...`;
          }
        }
      }

      //description
      let description =
        "Explore content from global construction industry. Learn and engage with informative videos and posts from Architects, Civil Engineers across the world.";

      //GET IMAGE
      let result = {};
      let image = "";
      if (getter_post.value.media_type == appConstants.media_Type.TEXT) {
        image = appConstants.metaData.IMAGE;
      } else {
        result = getOGCoverImageURL(getter_post.value);
        if (result.is_processed == true) {
          image = result.url;
        } else {
          image = createImageUrlForOgTags(result.url, true);
        }
      }

      //get post U
      let res = await getParamsForPostURL(getter_post.value);
      let host = window.location.origin;
      let url = createPostPageUrl(
        appConstants.current_URL,
        props.post_id,
        res.user_slur,
        res.title
      );

      //getKeywords
      let keywords = "";
      let altText = "";
      let getPostTags = "";

      if (
        getter_post.value.interest_category != undefined &&
        getter_post.value.interest_category != null &&
        getter_post.value.interest_category.length > 0
      ) {
        getPostTags = await getInterestValues(
          getter_post.value.interest_category
        );
      }

      if (getPostTags == "") {
        keywords =
          "Construction Videos,Construction articles,Construction Knowledge,Construction updates,Infrastructure Updates,Global Construction Videos,Construction Technology,Top updates in Construction,Architecture Updates,World Construction Updates";
        altText = "Olous Construction Post";
      } else {
        keywords = getPostTags;
        altText = getPostTags;
      }

      //if text post do not set any image alt text
      if (getter_post.value.media_type == appConstants.media_Type.TEXT) {
        altText = appConstants.metaData.META_IMAGE_ALT;
      }

      metaDescription.value = description;
      metaTitle.value = title;
      metaImage.value = image;
      metaURL.value = url;
      metaKeywords.value = keywords;
      metaImageAlt.value = altText;
    }

    // function getMetaTitle() {
    //   let title = "";
    //   if (getter_post.value == "") {
    //     return title;
    //   }

    //   if (
    //     getter_post.value.content != null &&
    //     getter_post.value.content.length > 0
    //   ) {
    //     title = getter_post.value.content;
    //   }
    //   return title;
    // }

    // function getMetaDescription() {
    //   let description = "";
    //   if (getter_post.value == "") {
    //     return description;
    //   }
    //   // console.log("getter_post.value 244 =>", getter_post.value);
    //   if (getter_post.value.title.length > 0) {
    //     description = post.title;
    //   }
    //   return description;
    // }

    // function getMetaCoverImage() {
    //   if (getter_post.value == "") {
    //     return "";
    //   }
    //   return getCoverImageURL(getter_post.value);
    // }

    return {
      isloadpage,
      borderRadius,
      suggestionsData,
      post_prefix,
      getter_post,
      getter_SuggestionsPost,
      res,
      res1,
      showFollowing,
      getUUIDAsKey,
      setAuthor,
      getData,
    };
  },
};
</script>
