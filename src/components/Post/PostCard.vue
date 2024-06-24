<template>
  <a :href="linkUrl">
    <div
      class="cls-postcard app-comp-box-shadow flex flex-col bg-white rounded-xl text-gray-600 w-full"
    >
      <!-- user -->
      <!-- <div  class="flex justify-between p-2 lg:px-8 lg:py-4">
      <span class="flex items-center">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="setProfileImage()"
          alt=""
        />
        <span class="ml-3">
          <h2 class="text-base font-medium">{{ setAuthorName() }}</h2>
          <p class="text-xs text-gray-500">{{ setUserSubTitle() }}</p>
        </span>
      </span>
      <span>
        <button
          class="font-medium rounded-xl px-4 py-1 lg:px-3.5 lg:py-2 border leading-tight border-gray-400"
        >
          Follow
        </button>
      </span>
    </div> -->

      <!-- post image -->
      <span class="rounded-t-[0.625rem]">
        <!-- Only Text -->
        <div
          class="h-44 rounded-t-[0.625rem]"
          v-if="postData.media_type == media_type.TEXT"
        >
          <img
            class="object-cover h-44 w-full rounded-t-[0.625rem]"
            src="../../assets/Text-Icon.svg"
            alt=""
          />
        </div>
        <!-- Single Image -->
        <div
          class="h-44 rounded-t-[0.625rem]"
          v-if="
            postData.media_type == media_type.IMAGE &&
            postData.medias.length == 1
          "
        >
          <img
            v-if="postData.medias.length > 0"
            class="object-cover h-44 w-full rounded-t-[0.625rem]"
            :src="setImageURL()"
            alt=""
          />
        </div>

        <!-- Video -->

        <div
          v-if="
            postData.media_type == media_type.VIDEO ||
            postData.media_type == media_type.COVER_IMAGE
          "
        >
          <div
            v-if="showCoverImage"
            class="relative flex items-center justify-center h-44 rounded-t-[0.625rem]"
          >
            <img
              :src="setCoverImageURL()"
              class="w-full object-cover h-full rounded-t-[0.625rem]"
              :style="getVideoHeight()"
            />
            <div
              @click="showVideo()"
              class="absolute flex items-center justify-center w-12 h-12 bg-black opacity-75 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.621"
                height="21.302"
                viewBox="0 0 15.621 21.302"
              >
                <g transform="translate(0.5 0.528)">
                  <path
                    d="M366,293.029v16.187a1.993,1.993,0,0,0,3.192,1.621l10.632-8.095a2.044,2.044,0,0,0,0-3.239l-10.632-8.095A1.993,1.993,0,0,0,366,293.029Z"
                    transform="translate(-366 -291)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div v-if="!showCoverImage" class="w-full">
            <video
              autoplay
              controls="controls"
              class="ml-0 mr-auto outline-none w-full h-44 object-cover rounded-t-[0.625rem]"
            >
              <source
                :src="setVideoURL()"
                type="video/mp4"
                controlslist="nodownload"
              />
            </video>
          </div>
        </div>

        <!-- For Multiple Images -->

        <div
          v-if="
            postData.media_type == media_type.IMAGE &&
            postData.medias.length > 1
          "
        >
          <div class="h-44 overflow-hidden">
            <!-- <Carousel :value="images" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
             <template #item="slotProps">
                <div class="car-item">
                        <div class="car-content">
                            <div class="flex justify-center">
                                <img :src="slotProps.data" class="h-36 w-auto"/>
                            </div>
                        </div>
                    </div>
              </template>
          </Carousel> -->
            <Galleria
              :value="getMultipleImages()"
              :responsiveOptions="responsiveOptions"
              :numVisible="5"
              :circular="true"
              containerStyle="max-width: 640px"
              :showItemNavigators="false"
              :showThumbnails="false"
              v-model:activeIndex="activeIndex"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item"
                  alt="slotProps.item.alt"
                  style="width: 100%"
                  class="rounded-t-[0.625rem] object-cover h-44"
                />
              </template>
              <template #caption="slotProps">
                <span class="p-2"
                  >{{ activeIndex + 1 }}/{{ getMultipleImages().length }}</span
                >
              </template>
            </Galleria>
          </div>
        </div>

        <!-- For URL -->

        <div v-if="postData.media_type == media_type.URL" class="">
          <a
            :href="postData.url"
            target="_blank"
            class="py-4 text-gray-700 text-xs"
          >
            <img
              v-if="postData.medias.length > 0"
              :src="setImageURL()"
              class="w-full object-cover h-full rounded-t-[0.625rem]"
              style="width: 100%; object-fit: cover; height: 100%"
            />
          </a>
        </div>

        <!-- For PDF Files/Documents -->
        <div v-if="postData.media_type == media_type.FILE" class="">
          <object
            :data="setDocumentURL()"
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Your web browser doesn't have a PDF plugin. Instead you can
              <a :href="setDocumentURL()"
                >click here to download the PDF file.</a
              >
            </p>
          </object>
          <!-- <embed
            class="pdf_view w-full h-full"
            :src="setDocumentURL()"
          > -->
          <!-- <noembed>
              <label style="align : center">Not supporting to pdf</label>
            </noembed> -->
        </div>
        <!-- For Mix Media -->
        <div v-if="postData.media_type == media_type.MIX_TYPE" class="">
          <div class="h-44 overflow-hidden">
            <Galleria
              :value="setMixMedia(postData.medias)"
              :showThumbnails="false"
              :showItemNavigators="false"
              :circular="true"
              v-model:activeIndex="activeIndex"
            >
              <template #item="slotProps">
                <div v-if="slotProps.item.type == media_type.IMAGE">
                  <img
                    :src="slotProps.item.url"
                    alt="slotProps.item.alt"
                    class="m-auto object-cover h-44 w-full"
                  />
                </div>
                <div v-if="slotProps.item.type == media_type.VIDEO">
                  <video
                    @contextmenu.prevent
                    :src="slotProps.item.url"
                    loop
                    controlsList="nodownload"
                    class="m-auto object-cover h-44 w-full"
                  ></video>
                </div>
              </template>
              <template #caption="slotProps">
                <span class="p-2"
                  >{{ activeIndex + 1 }}/{{
                    setMixMedia(postData.medias).length
                  }}</span
                >
              </template>
            </Galleria>
          </div>
        </div>
      </span>
      <!-- post details -->
      <div class="app-bg-color-gradient rounded-b-[0.625rem]">
        <div
          class="px-2 py-1 lg:w-52 break-all m-auto h-[5.75rem] overflow-hidden"
        >
          <!--<span class="flex flex-wrap space-x-3 text-blue-500 font-medium">
        <span>#opentowork </span>
      </span>-->
          <span class="flex flex-col mt-2 mb-3">
            <h1
              class="text-sm app-text-color-secondary font-light"
              :innerHTML="setContent()"
            ></h1>
            <span class="font-light app-text-color-secondary text-xs"
              ><a :href="postData.url">{{ setHostName() }}</a></span
            >
            <!--<span class="mt-3 text-gray-500"
          ><b>Darshan Teredesai</b> Boosted this
        </span>-->
          </span>
        </div>
      </div>

      <!--<hr />
    <span class="flex flex-col">
      <div class="grid grid-cols-3 py-3 gap-5 bg-[#343434] rounded-b-[0.625rem]">
        <div class="flex justify-center">
          <button><img src="../../assets/img/Star_small.svg" /></button>
          &nbsp;
          <span class="text-sm text-white">{{ setPostLikes() }}</span>
        </div>
        <div class="flex justify-center">
          <button><img src="../../assets/img/Comments_small.svg" /></button>
          &nbsp;
          <span class="text-sm text-white">{{ setPostComments() }}</span>
        </div>
        <div class="flex justify-center">
          <button><img src="../../assets/img/Kebab_small.svg" /></button>
        </div>
      </div>
    </span> -->
    </div>
  </a>
</template>

<script>
import {
  getImageURL,
  getHostName,
  getPostTitle,
  getProfileImage,
  getPostLikes,
  getPostComments,
  getVideoMedia,
  getDocumentURLFromMedia,
  getCoverImageURL,
  getPostTitleElseContent,
  getParamsForPostURL,
} from "/src/common/js/ReadPostData.js";
import appConstants from "../../appConstants.js";
import Carousel from "primevue/carousel";
import { createPostPageUrl } from "../../common/js/webUrls.js";
import Galleria from "primevue/galleria";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";

export default {
  name: "PostCard",
  components: {
    Carousel,
    Galleria,
  },
  props: {
    postData: {
      type: Object,
      default: {},
    },
    author: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      images: [],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 1,
          numScroll: 1,
        },
        {
          breakpoint: "600px",
          numVisible: 1,
          numScroll: 1,
        },
        {
          breakpoint: "480px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
      maxPostTitleLength: 50,
      media_type: appConstants.media_Type,
      showCoverImage: true,
      activeIndex: 0,
      linkUrl: "",
    };
  },
  computed: {},
  methods: {
    getMultipleImages() {
      let images = [];
      if (
        this.postData.media_type == this.media_type.IMAGE &&
        this.postData.medias.length > 1
      ) {
        var mediaCount = this.postData.medias.length;
        for (var i = 0; i < mediaCount; i++) {
          var imageName = this.postData.medias[i].name;
          // var postImageURL = `${
          //   import.meta.env.VITE_APP_MEDIA_IMGURL
          // }${imageName}`;
          images.push(imageName);
        }
      }
      return images;
    },

    setProfileImage() {
      return getProfileImage(this.postData);
    },
    setPostTitleElseContent() {
      return getPostTitleElseContent(this.postData);
    },
    setHostName() {
      return getHostName(this.postData.url);
    },
    setPostLikes() {
      return getPostLikes(this.postData);
    },
    setPostComments() {
      return getPostComments(this.postData);
    },
    setImageURL() {
      return getImageURL(this.postData);
    },
    showVideo() {
      this.showCoverImage = false;
    },
    setVideoURL() {
      if (this.postData.medias.length > 0) {
        var videoName = this.postData.medias[0].name;
        // var postVideoURL = `${
        //   import.meta.env.VITE_APP_MEDIA_VIDEOURL
        // }${videoName}`;
        //console.log(this.postData);

        return videoName;
      } else {
        return "";
      }
    },
    getVideoHeight() {
      let video_media = getVideoMedia(this.postData);
      // alert(video_media)
      //alert(window.innerHeight);
      let page_height = window.innerHeight - 254;

      if (video_media.height > page_height) {
        return {
          height: `${page_height}px`,
        };
      } else {
        return {
          height: `${video_media.height}px`,
        };
      }
    },

    setCoverImageURL() {
      return getCoverImageURL(this.postData);
    },

    setDocumentURL() {
      return getDocumentURLFromMedia(this.postData);
    },
    setContent() {
      let title = this.setPostTitleElseContent();
      let content = title.slice(0, this.maxPostTitleLength);
      if (title.length > this.maxPostTitleLength) {
        content = `${content}...`;
        // console.log(content);
      }
      return content;
    },
    setMixMedia(media) {
      let mixMedias = [];
      // console.log("media", media);
      for (let i = 0; i < media.length; i++) {
        if (media[i].mediaType == 1) {
          // let mixVideoURL = `${import.meta.env.VITE_APP_MEDIA_VIDEOURL}${
          //   media[i].name
          // }`;
          // let setVideoURL = "";
          // console.log(mixVideoURL);
          // await this.setBlobUrlToVideo(mixVideoURL).then((res) => {
          //   // console.log("res =>", res);
          //   setVideoURL = res;
          // });
          // console.log(setVideoURL);
          let mixMediaObj = {
            url: media[i].name,
            type: media[i].mediaType,
            index: i,
          };
          //return mixVideoURL
          mixMedias.push(mixMediaObj);
        } else {
          // let mixImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
          //   media[i].name
          // }`;
          let mixMediaObj = {
            url: media[i].name,
            type: media[i].mediaType,
            index: i,
          };
          // return mixImageURL
          mixMedias.push(mixMediaObj);
        }
      }

      return mixMedias;
    },
    async showPost(post) {
      let encode_str =
        getUUIDtoEncodedString(post.id) + appConstants.shape_page_postfix.POST;
      let res = await getParamsForPostURL(post);
      let host = window.location.origin;
      let url = createPostPageUrl(host, encode_str, res.user_slur, res.title);
      return url;

      // router.push({
      //   name: appConstants.routes.POST,
      //   params: {
      //     post_id: `${res.user_slur}_${res.title}${appConstants.url_separator}${encode_str}${appConstants.shape_page_postfix.POST}`,
      //   },
      // });
    },
  },
  async created() {
    this.linkUrl = await this.showPost(this.postData);
    // this.getMultipleImages();
  },
};
</script>
<style scoped>
.p-galleria .p-galleria-item-nav .p-galleria-item-prev-icon,
.p-galleria .p-galleria-item-nav .p-galleria-item-next-icon {
  font-size: 1rem !important;
}
.p-galleria .p-galleria-item-nav {
  background: transparent;
  color: #f8f9fa;
  width: 0rem !important;
  height: 0rem !important;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  border-radius: 3px;
  margin: 0 0.5rem;
}
/* .p-carousel .p-carousel-indicators .p-carousel-indicator button {
    width: 0.5rem !important;
  }
  .p-carousel .p-carousel-indicators {
    padding: 0.5rem !important;
} */
</style>
