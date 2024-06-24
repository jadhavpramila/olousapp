<template>
  <div
    class="cls-singlepost app-border flex flex-col bg-white rounded-xl text-gray-600 w-full"
  >
    <div v-if="isShow" class="absolute">
      <ReportPost @close="closeModal" @report_post="report" />
    </div>
    <div v-if="showLikeList">
      <!-- <BlockUI :blocked="showLikeList" :fullScreen="true"> -->
      <!-- <LikeList :objectId="postData.id" @close="closeLikeList" /> -->
      <LikePostList
        :objectId="postData.id"
        :numberOfLikes="postData.numberOfLikes"
        @close="closeLikeList"
      />
      <!-- </BlockUI> -->
    </div>
    <!-- user -->
    <div
      v-if="hideHeader"
      class="flex items-center lg:px-6 lg:py-2 lg:gap-2 md:gap-2 gap-3 md:px-6 md:py-2 sm:px-3 sm:py-1 px-2 py-1"
    >
      <div
        class="flex items-center cursor-pointer"
        @click="clickUser(postData.author)"
      >
        <div v-if="hasProfileImage()" class="w-[2.5rem]">
          <img
            v-if="
              post_type != enum_post_type.DOCUMENT &&
              post_type != enum_post_type.HEADLINE
            "
            class="w-10 h-10 rounded-full object-contain"
            :src="setProfileImage()"
            alt=""
          />
        </div>
        <div
          class="rounded-full border border-white h-10 w-10 text-center flex justify-center items-center bg-[#d8d8d8] text-[#333]"
          v-else
        >
          {{ getUserName() }}
        </div>
      </div>
      <div class="flex w-full flex-col justify-start">
        <h2
          v-if="
            post_type != enum_post_type.DOCUMENT &&
            post_type != enum_post_type.HEADLINE
          "
          @click="clickUser(postData.author)"
          class="lg:text-base md:text-base text-sm subtitle-size font-medium app-text-color-primary font-semibold"
          :style="{ cursor: cursorPointer }"
        >
          {{ setAuthorName() }}
        </h2>
        <p
          v-if="
            post_type != enum_post_type.DOCUMENT &&
            post_type != enum_post_type.HEADLINE
          "
          class="text-xs font-medium subtitle-size text-[#000000]"
        >
          {{ setUserSubTitle() }}
        </p>
        <h2
          v-if="
            post_type == enum_post_type.DOCUMENT ||
            post_type == enum_post_type.HEADLINE
          "
          class="lg:text-lg text-base font-medium text-[#333]"
          :innerHTML="setPostTitle()"
        ></h2>
      </div>
      <!-- follow button -->
      <div class="flex items-center justify-end grow-0">
        <Dropdown
          :dataDropdown="dropdownData"
          @selected_dropdown_item="checkClickEvent"
        />
      </div>
      <!-- <div
        class="flex items-center justify-end grow-0"
        v-if="
          postData.author.is_following == false &&
          postData.author.is_admin == false &&
          isFollowingCheck(postData.author.id) == false &&
          !isLoading &&
          showFollowing
        "
      >
        <button
          @click="PostFollowButtonClick(postData.author.id)"
          class="text-xs rounded-full bg-[#f2f2f2] font-medium px-2 py-2 lg:px-3.5 lg:py-2 border leading-tight border-none"
        >
          <span class="p-2 font-weight-700 text-xs lg:text-sm"> Follow</span>
        </button>
      </div>
      <div v-if="isLoading" class="flex justify-end mr-2.5 items-center">
        <ProgressSpinner
          style="width: 20px; height: 20px"
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration="1s"
        />
      </div> -->
    </div>
    <hr class="" />

    <!-- post image -->
    <span class="">
      <!-- Only Text -->
      <div
        class="h-44 rounded-t-[0.625rem]"
        v-if="
          postData.media_type == media_type.TEXT && postData.numberOfMedias == 1
        "
      >
        <img
          v-if="postData.medias.length > 0"
          class="object-cover h-44 w-full rounded-t-[0.625rem]"
          src="../../assets/Dummy_Image.svg"
          alt=""
        />
      </div>
      <!-- Single Image -->
      <!-- :style="getImageBackgroundColor()" -->
      <div
        class="post-media-back-color"
        v-if="
          postData.media_type == media_type.IMAGE &&
          postData.numberOfMedias == 1
        "
      >
        <!-- <Image
          v-if="postData.medias.length > 0"
          :src="setImageURL()"
          alt="Image"
          class="w-full"
          :imageStyle="setSingleImageHeight"
          imageClass="w-full"
          preview
        /> -->
        <div>
          <img
            v-if="postData.medias.length > 0"
            class="w-full"
            :style="setSingleImageHeight"
            :src="setImageURL()"
            alt=""
            @click="blockDocument()"
          />
        </div>
        <div class="fullscreen-galleria" :style="{ display: isVisible }">
          <div class="flex flex-col relative">
            <button
              class="absolute right-0 m-4 hover:bg-sky-700 hover:rounded-full"
              @click="clickClose()"
            >
              <span class="pi pi-times"></span>
            </button>
            <div class="flex justify-center h-full items-center h-screen">
              <img
                v-if="postData.medias.length > 0"
                :src="setImageURL()"
                alt=""
                style="max-height: 100vh"
                class=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Video -->
      <div ref="videoDiv">
        <div
          v-if="
            postData.media_type == media_type.VIDEO ||
            postData.media_type == media_type.COVER_IMAGE
          "
          class="post-media-back-color"
        >
          <!-- <div v-if="showCoverImage" class="relative flex items-center justify-center w-full single-img-div">
          <img :src="setCoverImageURL()" class="w-full object-cover" :style="getVideoHeight"/>
          <div @click="showVideo()" class="absolute flex items-center justify-center w-12 h-12 bg-black opacity-75 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="15.621" height="21.302" viewBox="0 0 15.621 21.302">
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
        </div> -->
          <!-- v-if="postData.view_count > 0" -->
          <div class="w-full overflow-hidden relative">
            <!-- <div
              class="absolute bg-[#000000] opacity-80 ml-2 mt-2 px-2 py-1 rounded-full"
            >
              <span class="text-white text-xs">
                {{ postData.view_count }} Views
              </span>
            </div> -->
            <!-- @contextmenu.prevent :to prevent right click -->
            <!-- <video
              autoplay
              muted
              ref="videoVisible"
              loop
              controls="controls"
              controlsList="nodownload"
              class="ml-0 mr-auto outline-none w-full"
              :style="getVideoHeight"
              :src="videoURL"
            ></video> -->
            <video
              autoplay
              muted
              ref="videoVisible"
              loop
              controls="controls"
              controlsList="nodownload"
              class="ml-0 mr-auto outline-none w-full"
              :style="getVideoHeight"
            >
              <source :src="setVideoURL()" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <!-- For Multiple Images -->

      <div
        v-if="
          postData.media_type == media_type.IMAGE && postData.numberOfMedias > 1
        "
        class="post-media-back-color"
      >
        <div>
          <!-- <Carousel
            :value="getMultipleImages()"
            :numVisible="1"
            :numScroll="1"
            :circular="true"
            :responsiveOptions="responsiveOptions"
          >
            <template #item="slotProps">
              <div class="car-item">
                <div class="car-content">
                  <div @click="blockDocument(slotProps.index)">
                    <img
                      :src="slotProps.data"
                      class="cursor-pointer"
                      style="width: 100%"
                      :style="setSingleImageHeight"
                    />
                  </div>
                </div>
              </div>
            </template>
          </Carousel> -->
          <Galleria
            :value="getMultipleImages()"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            :showThumbnails="false"
            :circular="true"
            :showItemNavigators="true"
            v-model:activeIndex="activeIndex"
          >
            <template #item="slotProps">
              <div class="" @click="blockDocument(slotProps.item.index)">
                <img
                  :src="slotProps.item.url"
                  alt="slotProps.item.alt"
                  :style="setSingleImageHeight"
                  class="cursor-pointer"
                  style="width: 100%"
                />
              </div>
            </template>
            <template #caption="slotProps">
              <span class="p-3 font-size-12"
                >{{ activeIndex + 1 }}/{{ getMultipleImages().length }}</span
              >
            </template>
          </Galleria>

          <!-- Fullscreen Multiple image -->
        </div>
        <div class="fullscreen-galleria" :style="{ display: isVisible }">
          <div class="h-full flex flex-col relative">
            <button
              class="absolute right-0 m-4 hover:bg-sky-700 hover:rounded-full"
              @click="clickClose()"
            >
              <span class="pi pi-times"></span>
            </button>
            <Galleria
              :value="getMultipleImages()"
              :responsiveOptions="responsiveOptions"
              :numVisible="5"
              :showThumbnails="false"
              :circular="true"
              containerStyle="display:flex;justify-content:center;height:100%;align-items:center"
              :showItemNavigators="true"
              :activeIndex="activeIndex"
            >
              <template #item="slotProps">
                <div class="flex justify-center items-center">
                  <img
                    :src="slotProps.item.url"
                    alt="slotProps.item.alt"
                    style="max-height: 100vh"
                    class="h-full"
                  />
                </div>
              </template>
              <!-- <template #caption="slotProps">
              <button
              class="absolute right-0 m-4 hover:bg-sky-700 hover:rounded-full"
              @click="clickClose()"
            >
              <span class="pi pi-times"></span>
            </button>
            </template> -->
            </Galleria>
          </div>
        </div>
      </div>

      <!-- For URL -->
      <!-- {{ postData.author.id }} <br />
      {{ getter_user.id }} -->
      <div
        v-if="postData.media_type == media_type.URL"
        class="post-media-back-color"
      >
        <a
          :href="postData.url"
          target="_blank"
          class="py-4 text-gray-700 text-xs"
        >
          <img
            v-if="postData.medias.length > 0"
            :src="setImageURL()"
            class="w-full"
            :style="setSingleImageHeight"
          />
        </a>
      </div>
      <!-- For PDF Files -->

      <div v-if="postData.media_type == media_type.FILE" class="h-[46rem]">
        <!-- <embed
            class="pdf_view w-full h-full"
            :src="setDocument()"
          > -->
        <iframe
          :src="setDocumentURL()"
          title="PDF_File"
          class="h-full w-full cursor-pointer"
        >
        </iframe>
        <!-- <noembed>
              <label style="align : center">Not supporting to pdf</label>
            </noembed> -->
      </div>
      <!-- For Mix Media -->
      <div
        v-if="postData.media_type == media_type.MIX_TYPE"
        class="post-media-back-color"
      >
        <Galleria
          :value="setMixMedia(postData.medias)"
          :showThumbnails="false"
          :showItemNavigators="true"
          :circular="true"
          v-model:activeIndex="activeIndex"
        >
          <template #item="slotProps">
            <div
              v-if="slotProps.item.type == media_type.IMAGE"
              @click="setFullscreen(slotProps.item.index)"
            >
              <img
                :src="slotProps.item.url"
                alt="slotProps.item.alt"
                :style="setMixMediaHeight()"
                class="m-auto"
              />
            </div>
            <div
              v-if="slotProps.item.type == media_type.VIDEO"
              @click="setFullscreen(slotProps.item.index)"
            >
              <video
                @contextmenu.prevent
                :src="slotProps.item.url"
                loop
                controls
                controlsList="nodownload"
                :style="setMixMediaHeight()"
                class="m-auto"
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

        <!-- <Carousel
          :value="setMixMedia(postData.medias)"
          :numVisible="1"
          :numScroll="1"
          :circular="true"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div class="car-item">
              <div class="car-content">
                <div v-if="slotProps.data.type == media_type.IMAGE">
                  <img
                    :src="slotProps.data.url"
                    class="mx-auto cursor-pointer"
                    :style="setMixMediaHeight()"
                    @click="setFullscreen(slotProps.data.index)"
                  />
                </div>
                <div
                  class="relative"
                  ref="videoDiv"
                  v-if="slotProps.data.type == media_type.VIDEO"
                >
                  <span
                    class="absolute px-2 right-0 text-sm text-white top-0 p-1.5"
                  >
                    {{ postData.view_count }} Views</span
                  >
                  <video
                    :src="slotProps.data.url"
                    loop
                    controls
                    controlsList="nodownload"
                    :style="setMixMediaHeight()"
                    class="mx-auto cursor-pointer"
                    @click="setFullscreen(slotProps.data.index)"
                  ></video>
                </div>
              </div>
            </div>
          </template>
        </Carousel> -->
      </div>

      <!-- FullScreen Mix Media -->
      <div class="fullscreen-galleria" :style="{ display: isMixMediaVisible }">
        <div class="h-full flex flex-col relative">
          <button
            class="absolute right-0 m-4 hover:bg-sky-700 hover:rounded-full"
            @click="clickClose()"
          >
            <span class="pi pi-times"></span>
          </button>
          <Galleria
            :value="setMixMedia(postData.medias)"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            :showThumbnails="false"
            :circular="true"
            containerStyle="display:flex;justify-content:center;height:100%;align-items:center"
            :showItemNavigators="true"
            :activeIndex="activeIndex"
          >
            <template #item="slotProps">
              <div
                class="flex justify-center items-center"
                v-if="slotProps.item.type == media_type.IMAGE"
              >
                <img
                  :src="slotProps.item.url"
                  style="max-height: 100vh"
                  class="h-full"
                />
              </div>
              <div
                class="flex justify-center items-center"
                v-if="slotProps.item.type == media_type.VIDEO"
              >
                <video
                  @contextmenu.prevent
                  :src="slotProps.item.url"
                  loop
                  controls
                  controlsList="nodownload"
                  style="max-height: 100vh"
                  class="h-full"
                ></video>
              </div>
            </template>
          </Galleria>
        </div>
      </div>
    </span>
    <!-- post details -->
    <div class="px-2 lg:px-6 py-2">
      <!--<span class="flex flex-wrap space-x-3 text-blue-500 font-medium">
        <span>#opentowork </span>
        <span>#opentowork </span>
        <span>#opentowork </span>
        <span>#opentowork </span>
      </span>-->
      <span class="flex flex-col">
        <h1
          v-if="
            post_type != enum_post_type.DOCUMENT &&
            post_type != enum_post_type.HEADLINE
          "
          class="lg:text-lg text-sm font-medium text-[#000000] leading-4 break-all"
          :innerHTML="setPostTitle()"
        ></h1>
        <!-- read more/less component -->
        <div class="lg:block md:block sm:hidden hidden">
          <ReadMoreLess :data="postData" :maxLimit="webMaxLimit" />
        </div>
        <div class="lg:hidden md:hidden sm:block block">
          <ReadMoreLess :data="postData" :maxLimit="mobileMaxLimit" />
        </div>

        <span class="text-sm"
          ><a :href="postData.url" target="_blank">{{ setHostName() }}</a></span
        >
        <!-- boosted post data -->
        <!-- {{ postData.activityAuthor }} -->
        <div
          v-if="postData.activityType == FeedType.LIKED"
          class="mt-2 text-sm"
        >
          <span
            class="app-text-color-secondary font-semibold cursor-pointer"
            @click="clickUser(postData.activityAuthor)"
            >{{ postData.activityAuthor.first_name }}
            {{ postData.activityAuthor.last_name }}</span
          >
          boosted this
        </div>
      </span>
    </div>

    <!-- <hr
      v-if="
        post_type != enum_post_type.HEADLINE &&
        post_type != enum_post_type.DOCUMENT
      "
    /> -->
    <span
      class="flex flex-col"
      v-if="
        post_type != enum_post_type.HEADLINE &&
        post_type != enum_post_type.DOCUMENT
      "
    >
      <!-- <div
        class="grid lg:grid-cols-12 grid-cols-4 pb-2 pt-1.5 lg:gap-2 sm:gap-1"
      >
        <div class="flex items-center lg:col-span-5 col-span-3 lg:pl-2 sm:pl-0"> -->
      <!-- bookmark div -->
      <!-- <div class="flex items-center lg:mx-2 mx-1">
            <button>
              <img src="../../assets/img/Bookmark.svg" />
            </button>
          </div> -->
      <!-- like button div -->
      <!-- <div class="flex items-center lg:mx-2 mx-1">
            <div class="w-[2.75rem] h-[2.75rem]">
              <button
                v-if="postData?.like_id?.id && !postData.like_id.is_deleted"
                @click="unlikeButtonClick(postData.like_id.id, postData.id)"
                :disabled="isButtonClicked"
              >
                <img src="../../assets/img/Star_Fill.svg" />
              </button>

              <button
                v-else
                @click="likeButtonClick(postData.id)"
                :disabled="isButtonClicked"
              >
                <img src="../../assets/img/Star.svg" />
              </button>
            </div>
            <span
              class="pl-1 text-sm"
              :class="[
                postData.numberOfLikes > 0 ? 'cursor-pointer' : 'cursor-auto',
              ]"
              @click="openLikeList()"
            >
              {{ setPostLikes() }}</span
            >
          </div> -->
      <!-- comment button div -->
      <!-- <div class="flex items-center lg:mx-2 mx-1">
            <button>
              <img src="../../assets/img/Comments.svg" />
            </button>
            <span class="pl-1 text-sm"> 53</span>
          </div> -->
      <!-- </div> -->
      <!-- <div class="flex justify-end items-center lg:col-span-7 col-span">
          <Dropdown
            :dataDropdown="dropdownData"
            @selected_dropdown_item="checkClickEvent"
          /> -->
      <!-- <div class="navbar">
            <div class="dropdown">
              <div
                class="dropbtn rounded-full flex items-center cursor-pointer"
                @mouseenter="display = block"
                @mouseleave="display = none"
              >
                <img src="../../assets/img/Kebab.svg" />
                <i class="fa fa-caret-down"></i>
              </div>
              <div
                class="
                  dropdown-content
                  bg-white
                  text-gray-900
                  rounded-lg
                  divide-gray-400 divide-y
                "
                :style="{ display: display }"
              > -->
      <!-- <Dropdown
                  :data="dropdownData"
                  @selected_dropdown_item="checkClickEvent"
                /> -->

      <!-- <a
                  @click="clickCopyLink()"
                  class="text-xs p-3 hover:rounded-t-lg hover:rounded-b-lg cursor-pointer"
                  >Copy Link</a
                > -->
      <!-- </div>
            </div>
          </div>
        </div> 
      </div>-->
    </span>
  </div>
  <!-- <ConfirmDialog></ConfirmDialog> -->
</template>

<script>
import {
  getAuthorName,
  getHostName,
  getImageURL,
  getPostTitle,
  getProfileImage,
  getUserSubTitle,
  getPostLikes,
  getPostComments,
  getVideoMedia,
  getDocumentURLFromMedia,
  getCoverImageURL,
  getPostContent,
  getImageMedia,
  getCommonMediaType,
  getParamsForPostURL,
} from "/src/common/js/ReadPostData.js";
import appConstants from "../../appConstants.js";
import Carousel from "primevue/carousel";
import Galleria from "primevue/galleria";
import { mapGetters, mapActions } from "vuex";
import Dropdown from "../common/Dropdown.vue";
// import ConfirmDialog from "primevue/confirmdialog";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import {
  createPostPageUrl,
  getCurrentEncodedURL,
} from "/src/common/js/webUrls.js";
import ReadMoreLess from "../common/ReadMoreLess.vue";
import ReportPost from "../common/ReportPost.vue";
import {
  getUserNameInitials,
  copyTextToClipboard,
} from "../../common/js/commonFunctions.js";
import LikePostList from "../common/Like/LikePostList.vue";
import ProgressSpinner from "primevue/progressspinner";
import { isFollowing } from "../../common/js/handleFollowSession.js";
import { getAverageRGB } from "../../common/js/getImageAverageColor.js";

export default {
  name: "SinglePost",
  components: {
    Carousel,
    Galleria,
    Dropdown,
    ReadMoreLess,
    ReportPost,
    LikePostList,
    // ConfirmDialog,
    ProgressSpinner,
  },
  props: {
    // showFollowing: Boolean,
    showFollowing: {
      type: Boolean,
      default: false,
    },
    postData: {
      type: Object,
      default: {},
    },
    hideHeader: {
      type: Boolean,
      default: true,
    },
    post_type: {
      type: String,
      default: appConstants.shape_page_postfix.POST,
    },
  },
  data() {
    return {
      isButtonClicked: false,
      videoURL: "",
      isLoading: false,
      FeedType: appConstants.FeedType,
      showLikeList: false,
      checkType: [],
      reportPostID: "",
      deletePostId: "",
      isShow: false,
      mobileMaxLimit: 150,
      webMaxLimit: 300,
      maxLimitForTextPost: 500,
      images: [],
      dropdownData: [],
      blockedDocument: false,
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

      isVisible: "none",
      isMixMediaVisible: "none",
      activeIndex: 0,
      cursorPointer: "pointer",
      media_type: appConstants.media_Type,
      showCoverImage: true,
      enum_post_type: appConstants.shape_page_postfix,
      window_width: window.innerWidth,
      window_height: window.innerHeight,
    };
  },
  computed: {
    ...mapGetters("login", ["getter_isUserLoggedIn", "getter_user"]),
    setSingleImageHeight() {
      // console.log("called")
      let image_media = getImageMedia(this.postData);
      // console.log(image_media.name)
      // alert(video_media)
      //alert(window.innerHeight);
      let page_width = this.window_width;
      let width = 640;
      let image_ratio = image_media?.height / image_media?.width;
      let image_height_to_render = page_width * image_ratio;

      let isWidthIsGreaterThanHeight =
        parseInt(image_media?.width) > parseInt(image_media?.height);

      if (page_width <= width) {
        if (image_height_to_render > 450) {
          return {
            height: `450px!important`,
            "object-fit": "fill!important",
          };
        } else {
          return {
            height: `${image_height_to_render}px!important`,
            "object-fit": "cover!important",
          };
        }
      } else {
        let page_height = this.window_height - 254;

        if (page_height < 320) {
          page_height = 320;
        } else if (page_height > 500) {
          page_height = 500;
        }

        if (image_media?.height > page_height) {
          let object_fit_value = "contain!important";
          let media_height = `${page_height}px!important`;
          //if width is greater than height it is showing black color on top & bottom of media
          if (isWidthIsGreaterThanHeight) {
            object_fit_value = "fill!important";
            media_height = `${page_height - 30}px!important`;
          }
          return {
            height: media_height,
            "object-fit": object_fit_value,
          };
        } else {
          return {
            height: `${image_media?.height}px!important`,
            "object-fit": "cover!important",
          };
        }
      }
    },
    getVideoHeight() {
      let video_media = getVideoMedia(this.postData);

      let page_width = this.window_width;
      let width = 640;
      let video_ratio = video_media.height / video_media.width;
      let video_height_to_render = page_width * video_ratio;
      let isWidthIsGreaterThanHeight =
        parseInt(video_media?.width) > parseInt(video_media?.height);

      if (page_width <= width) {
        if (video_height_to_render > 450) {
          return {
            height: `450px!important`,
            "object-fit": "cover",
          };
        } else {
          return {
            height: `${video_height_to_render}px!important`,
            "object-fit": "cover",
          };
        }
      } else {
        let page_height = this.window_height - 254;
        if (page_height < 320) {
          page_height = 320;
        } else if (page_height > 500) {
          page_height = 500;
        }

        let object_fit_value = "contain";
        let media_height = `${page_height}px!important`;

        if (isWidthIsGreaterThanHeight) {
          object_fit_value = "fill";
          media_height = `${page_height - 30}px!important`;
        }

        if (video_media.height > page_height) {
          return {
            height: media_height,
            "object-fit": object_fit_value,
          };
        } else {
          return {
            height: `${video_media.height}px!important`,
            "object-fit": "contain",
          };
        }
      }
    },
  },
  methods: {
    ...mapActions("timeline", [
      "action_likePost",
      "action_unlike",
      "action_followUserFromTimeline",
      "action_reportPost",
    ]),
    ...mapActions("companyData", [
      "action_likePostCompanyActivity",
      "action_unlikePostCompanyActivity",
    ]),
    ...mapActions("UserProfile", [
      "action_likeUserActivityPost",
      "action_unlikeUserActivityPost",
      "action_deletePost",
    ]),
    ...mapActions("post", ["action_postLike", "action_postUnlike"]),

    isFollowingCheck(id) {
      // console.log("in isFollowingCheck")
      return isFollowing(id);
    },
    PostFollowButtonClick(id) {
      // console.log("in PostFollowButtonClick()");
      if (this.getter_isUserLoggedIn == false) {
        this.$router.push({ name: appConstants.routes.LOGIN });
      } else {
        this.isLoading = true;
        // as this function is getting called from feeds so reet_feeds value is true
        let obj = {
          id: id,
          data: {
            reset_feeds: true,
          },
        };
        this.action_followUserFromTimeline(obj).then((response) => {
          // console.log("in the of action_followUserFromTimeline()");
          this.isLoading = false;
        });
      }
    },
    // viewPort function
    isInViewport(el) {
      var videoDiv = this.$refs.videoDiv;
      // console.log("videoDiv", videoDiv);
      if (videoDiv == null) {
        return;
      }
      const rect = videoDiv.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    disableScroll() {
      document
        .querySelector("#open-modal-button")
        .addEventListener("click", function () {
          document.querySelector("#modal-container").style.display = "block";
          document.querySelector("body").style.overflow = "hidden";
        });
    },

    enableScroll() {
      document
        .querySelector("#close-modal-button")
        .addEventListener("click", function () {
          document.querySelector("#modal-container").style.display = "none";
          document.querySelector("body").style.overflow = "visible";
        });
    },

    boostedPostUser() {
      console.log("in boostedPostUser");
      this.$router.push({
        name: appConstants.routes.VIEWPROFILE,
        params: { user_slug: userSlug },
      });
    },
    checkClickEvent(val) {
      //console.log(val);
      if (val == "Delete") {
        //console.log("delete value =>", this.postData.id);
        this.deletePost(this.postData.id);
      } else if (val == "Copy Link") {
        //console.log("click copy link", this.postData.id);
        this.clickCopyLink(this.postData);
      } else if (val == "Report") {
        this.reportPostID = this.postData.id;
        //console.log("Report post", this.reportPostID);
        this.isShow = true;
      }
    },
    openLikeList() {
      // this.disableScroll();
      // document.body.classList.add("invisible-scrollbar");
      if (this.getter_isUserLoggedIn == false) {
        getCurrentEncodedURL();
      } else {
        let number = getPostLikes(this.postData);
        if (number > 0) {
          this.showLikeList = true;
        }
        // document.body.style.overflow = "hidden";
      }
    },

    closeLikeList() {
      // this.enableScroll();
      // document.body.classList.remove("invisible-scrollbar");
      // document.body.style.overflow = "auto";
      this.showLikeList = false;
    },
    clickDropdown() {
      this.display = "block";
    },
    // onMouseLeave() {
    //   console.log("mouse leave");
    // },
    closeModal() {
      this.isShow = false;
    },
    report(val) {
      this.isShow = false;
      let obj = {
        post_id: this.reportPostID,
        report_id: val,
      };
      //console.log("obj",obj)
      this.action_reportPost(obj).then((response) => {
        // console.log("response in vue =>", response);
        this.$toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: "Thanks fot letting us know.",
          detail: "Your feedback will help us in keeping the community clean.",
          life: 3000,
        });
      });
    },
    setDropdownList() {
      //copy link is always visible to all user
      this.dropdownData = [
        {
          label: "Copy Link",
          // command: () => {
          //   this.clickCopyLink(this.postData.id);
          // },
        },
      ];

      //If user is not loggedIn do not show below options
      if (this.getter_isUserLoggedIn == false) {
        return this.dropdownData;
      }

      //If it's user own post show delete, do not show report
      if (this.postData.author.id == this.getter_user.id) {
        let obj = {
          label: "Delete",
          // command: () => {
          //   this.deletePost(this.postData.id);
          // },
        };
        this.dropdownData.push(obj);
      }
      //Hide when we are showing another user post (according to new timeline)
      // else {
      //   let obj = {
      //     label: "Report",
      //     // command: () => {
      //     //   this.reportPostID = this.postData.id;
      //     //   this.isShow = true;
      //     // },
      //   };
      //   this.dropdownData.push(obj);
      // }
      return this.dropdownData;
    },
    deletePost(post_id) {
      //console.log("Click delete post", post_id);
      this.action_deletePost(post_id).then((response) => {
        //   console.log("response in vue action_deletePost =>", response);
        this.$toast.add({
          severity: appConstants.toast_severity.SUCCESS,
          summary: "Successful",
          detail: "Your post deleted.",
          life: 3000,
        });
      });
      // this.$confirm.require({
      //   message: "Are you sure you want to delete this post?",
      //   header: "Delete Confirmation",
      //   icon: "pi pi-info-circle",
      //   acceptClass: "p-button-danger",
      //   accept: () => {
      //     //
      //   },
      //   reject: () => {},
      // });
    },
    async clickCopyLink(post) {
      let encode_str = getUUIDtoEncodedString(post.id);
      encode_str = `${encode_str}${appConstants.shape_page_postfix.POST}`;
      let res = await getParamsForPostURL(post);
      let host = window.location.origin;
      let url = createPostPageUrl(host, encode_str, res.user_slur, res.title);
      // let dummy = document.createElement("input"),
      //   text = url;

      // document.body.appendChild(dummy);
      // dummy.value = text;
      // console.log(text);
      // dummy.select();
      // document.execCommand("copy");
      // document.body.removeChild(dummy);
      // console.log("dummy =>", dummy);
      // this.display = "none";
      // this.$toast.add({
      //   severity: appConstants.toast_severity.INFO,
      //   summary: appConstants.toast_summary.INFO,
      //   detail: "Link copied to clipboard",
      //   life: 3000,
      // });
      let result = copyTextToClipboard(url);
      if (result) {
        this.$toast.add({
          severity: appConstants.toast_severity.INFO,
          summary: appConstants.toast_summary.INFO,
          detail: "Link copied to clipboard",
          life: 3000,
        });
      }
    },
    // likeButtonClick(id) {
    //   console.log("in likeButtonClick()", this.isButtonClicked);
    //   if (this.isButtonClicked) {
    //     return;
    //   } else {
    //     console.log("in else");
    //     this.isButtonClicked = true;
    //     // console.log("like post id =>", id);
    //     if (this.getter_isUserLoggedIn == false) {
    //       this.$router.push({ name: appConstants.routes.LOGIN });
    //     } else {
    //       if (this.$route.name == appConstants.routes.TIMELINE) {
    //         // console.log("timeline like button");
    //         let data = {
    //           like_type: "post",
    //           object_id: id,
    //           post_id: id,
    //         };
    //         this.action_likePost(data).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else if (this.$route.name == appConstants.routes.PORTFOLIO_URL) {
    //         // console.log("PORTFOLIO_URL");
    //         let data = {
    //           like_type: "post",
    //           object_id: id,
    //           post_id: id,
    //         };
    //         this.action_likePostCompanyActivity(data).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else if (this.$route.name == appConstants.routes.ACTIVITY) {
    //         //console.log("in if activity");
    //         let data = {
    //           like_type: "post",
    //           object_id: id,
    //           post_id: id,
    //         };
    //         this.action_likeUserActivityPost(data).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else {
    //         //console.log("single post like button");
    //         let data = {
    //           like_type: "post",
    //           object_id: id,
    //           post_id: id,
    //         };
    //         this.action_postLike(data).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       }
    //     }
    //   }
    // },
    likeButtonClick(id) {
      // console.log("in likeButtonClick()");
      this.isButtonClicked = true;
      // console.log("like post id =>", id);
      if (this.getter_isUserLoggedIn == false) {
        getCurrentEncodedURL();
        // this.$router.push({ name: appConstants.routes.LOGIN });
      } else {
        if (this.$route.name == appConstants.routes.TIMELINE) {
          // console.log("timeline like button");
          let data = {
            like_type: "post",
            object_id: id,
            post_id: id,
          };
          this.action_likePost(data).then(() => {
            this.isButtonClicked = false;
          });
        } else if (this.$route.name == appConstants.routes.PORTFOLIO_URL) {
          // console.log("PORTFOLIO_URL");
          let data = {
            like_type: "post",
            object_id: id,
            post_id: id,
          };
          this.action_likePostCompanyActivity(data).then(() => {
            this.isButtonClicked = false;
          });
        } else if (this.$route.name == appConstants.routes.ACTIVITY) {
          //console.log("in if activity");
          let data = {
            like_type: "post",
            object_id: id,
            post_id: id,
          };
          this.action_likeUserActivityPost(data).then(() => {
            this.isButtonClicked = false;
          });
        } else {
          //console.log("single post like button");
          let data = {
            like_type: "post",
            object_id: id,
            post_id: id,
          };
          this.action_postLike(data).then(() => {
            this.isButtonClicked = false;
          });
        }
      }
    },
    unlikeButtonClick(id, postId) {
      this.isButtonClicked = true;
      // console.log("unlike click =>", id, postId);
      if (this.getter_isUserLoggedIn == false) {
        this.$router.push({ name: appConstants.routes.LOGIN });
      } else {
        if (this.$route.name == appConstants.routes.TIMELINE) {
          // console.log("timeline unlike button");
          let obj = {
            like_id: id,
            post_id: postId,
          };
          this.action_unlike(obj).then(() => {
            this.isButtonClicked = false;
          });
        } else if (this.$route.name == appConstants.routes.PORTFOLIO_URL) {
          let obj = {
            like_id: id,
            post_id: postId,
          };
          //console.log("data", obj)
          this.action_unlikePostCompanyActivity(obj).then(() => {
            this.isButtonClicked = false;
          });
        } else if (this.$route.name == appConstants.routes.ACTIVITY) {
          // console.log("in if activity");
          let obj = {
            like_id: id,
            post_id: postId,
          };
          this.action_unlikeUserActivityPost(obj).then(() => {
            this.isButtonClicked = false;
          });
        } else {
          // console.log("single post unlike button");
          let obj = {
            like_id: id,
            post_id: postId,
          };

          this.action_postUnlike(obj).then(() => {
            this.isButtonClicked = false;
          });
        }
      }
    },
    // unlikeButtonClick(id, postId) {
    //    console.log("in unlikeButtonClick()", this.isButtonClicked);
    //   if (this.isButtonClicked) {
    //     return;
    //   } else {
    //     console.log("in else");
    //     this.isButtonClicked = true;
    //     console.log("unlike click =>", id, postId);
    //     if (this.getter_isUserLoggedIn == false) {
    //       this.$router.push({ name: appConstants.routes.LOGIN });
    //     } else {
    //       if (this.$route.name == appConstants.routes.TIMELINE) {
    //         // console.log("timeline unlike button");
    //         let obj = {
    //           like_id: id,
    //           post_id: postId,
    //         };
    //         this.action_unlike(obj).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else if (this.$route.name == appConstants.routes.PORTFOLIO_URL) {
    //         let obj = {
    //           like_id: id,
    //           post_id: postId,
    //         };
    //         //console.log("data", obj)
    //         this.action_unlikePostCompanyActivity(obj).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else if (this.$route.name == appConstants.routes.ACTIVITY) {
    //         console.log("in if activity");
    //         let obj = {
    //           like_id: id,
    //           post_id: postId,
    //         };
    //         this.action_unlikeUserActivityPost(obj).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       } else {
    //         // console.log("single post unlike button");
    //         let obj = {
    //           like_id: id,
    //           post_id: postId,
    //         };

    //         this.action_postUnlike(obj).then(() => {
    //           this.isButtonClicked = false;
    //         });
    //       }
    //     }
    //   }
    // },
    getMultipleImages() {
      let images = [];
      if (
        this.postData.media_type == this.media_type.IMAGE &&
        this.postData.numberOfMedias > 1
      ) {
        var mediaCount = this.postData.medias.length;
        for (var i = 0; i < mediaCount; i++) {
          var imageName = this.postData.medias[i].name;

          // var postImageURL = `${
          //   import.meta.env.VITE_APP_MEDIA_IMGURL
          // }${imageName}`;
          let multiImageObj = {
            url: imageName,
            index: i,
          };
          images.push(multiImageObj);
        }
      }
      return images;
    },
    setAuthorName() {
      return getAuthorName(this.postData);
    },
    setUserSubTitle() {
      return getUserSubTitle(this.postData);
    },
    setProfileImage() {
      return getProfileImage(this.postData);
    },
    setPostTitle() {
      return getPostTitle(this.postData);
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
    clickUser(authorData) {
      if (authorData.is_admin == true) return;

      if (authorData.is_pseudo_user == true) {
        let userSlug = authorData.slug;
        this.$store.commit(
          "timeline/commit_scrollBarPosition",
          window.pageYOffset
        );
        this.$router.push({
          name: appConstants.routes.PORTFOLIO_URL,
          params: { slug: userSlug },
        });
      } else {
        //let encodedStr = encodeUUID(authorData.id);
        let userSlug = authorData.slug;
        this.$store.commit(
          "timeline/commit_scrollBarPosition",
          window.pageYOffset
        );
        this.$router.push({
          name: appConstants.routes.VIEWPROFILE,
          params: { user_slug: userSlug },
        });
      }
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

    setCoverImageURL() {
      return getCoverImageURL(this.postData);
    },

    setDocumentURL() {
      return getDocumentURLFromMedia(this.postData);
    },

    setWindowHeightWidth() {
      this.window_width = window.innerWidth;
      this.window_height = window.innerHeight;
    },

    // async setBlobUrlToVideo(url) {
    //   let blob = await fetch(url).then((r) => r.blob());
    //   let videoUrl = URL.createObjectURL(blob);
    //   return videoUrl;
    // },
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
    setMixMediaHeight() {
      let page_height = this.window_height - 254;
      //let mixMedia = this.postData.medias;
      if (this.postData.media_type == appConstants.media_Type.MIX_TYPE) {
        let mixMediaHeight = this.postData.medias[0].height;
        let page_width = this.window_width;
        let image_ratio =
          this.postData.medias[0].height / this.postData.medias[0].width;
        let mixMedia_height_to_render = page_width * image_ratio;
        let width = 640;
        if (page_width <= width) {
          if (mixMedia_height_to_render > 450) {
            return {
              height: `450px!important`,
              "object-fit": "fill",
            };
          } else {
            return {
              height: `${mixMedia_height_to_render}px!important`,
              "object-fit": "cover",
            };
          }
        } else {
          if (mixMediaHeight > page_height) {
            return {
              height: `${page_height}px!important`,
              "object-fit": "cover",
            };
          } else {
            return {
              height: `${mixMediaHeight}px!important`,
              "object-fit": "cover",
            };
          }
        }
      }
    },
    hasProfileImage() {
      if (this.postData.author != "") {
        if (this.postData.author.profile_image != "") {
          return true;
        }
      }
    },
    getUserName() {
      if (this.postData.author.profile_image == "") {
        var nameInitials = getUserNameInitials(
          this.postData.author.first_name,
          this.postData.author.last_name
        );
        return nameInitials;
      } else {
        return "";
      }
    },
    blockDocument(index) {
      this.blockedDocument = true;
      this.isVisible = "block";
      this.activeIndex = index;
      // setTimeout(() => {
      //     this.blockedDocument = false;
      // }, 3000);
    },
    clickClose() {
      //this.displayScrollbar();
      //document.body.style.overflow = "auto";
      this.isVisible = "none";
      this.isMixMediaVisible = "none";
    },
    setFullscreen(index) {
      //this.hideScrollbar();
      //document.body.style.overflow = "hidden";
      this.isMixMediaVisible = "block";
      this.activeIndex = index;
      console.log(index);
    },
    // hideScrollbar() {
    //   var style = document.createElement("style");
    //   style.innerHTML = `body {overflow: hidden;}`;
    //   document.head.appendChild(style);
    // },
    // displayScrollbar() {
    //   var style = document.createElement("style");
    //   style.innerHTML = `body {overflow: auto;}`;
    //   document.head.appendChild(style);
    // },
    // toggle(event) {
    //   this.$refs.menu.toggle(event);
    // },
    // save() {
    //   this.$toast.add({
    //     severity: "success",
    //     summary: "Success",
    //     detail: "Data Saved",
    //     life: 3000,
    //   });
    // },
    // toggleFullScreen() {
    //   let elem = this.$refs.galleria.$el;
    //   if (document.fullscreenElement) {
    //     this.fullScreen = true;
    //     document
    //       .exitFullscreen()
    //       .then(() => console.log("Document Exited from Full screen mode"))
    //       .catch((err) => console.error(err));
    //   } else {
    //     this.fullScreen = false;
    //     elem.requestFullscreen();
    //   }

    // },
    // fullScreenIcon() {
    //   return `pi ${
    //     this.fullScreen ? "pi-window-minimize" : "pi-window-maximize"
    //   }`;
    // },
    // setMediaType(medias) {
    //   return getCommonMediaType(medias);
    // },
    handleScroll(event) {
      let checkUrl = "/" + appConstants.display_route_Name.TIMELINE;
      let activityUrl =
        "/" +
        this.postData.author.slug +
        "/" +
        appConstants.display_route_Name.ACTIVITY;
      if (
        window.location.pathname == checkUrl ||
        window.location.pathname == activityUrl
      ) {
        const isInVisible = this.isInViewport();
        // console.log("in if =>", isInVisible);
        var videoVisible = this.$refs.videoVisible;
        if (videoVisible == undefined) {
          return;
        }
        if (isInVisible) {
          videoVisible.play();
        } else {
          videoVisible.pause();
        }
      }
    },
    //   getImageBackgroundColor(){
    //   // backgroundColor =
    //   //             'rgb(' + rgb.r + ','
    //   //             + rgb.g + ','
    //   //             + rgb.b + ')';
    //   var rgb = getAverageRGB()

    //   var backgroundColor= { background: `rgb(${rgb.r},${rgb.g},${rgb.b})`
    //              }
    //   console.log(backgroundColor)
    //    return backgroundColor
    // },
  },
  beforeMount() {
    // this.postData.media_type = getCommonMediaType(this.postData.medias);
    if (this.postData.media_type == appConstants.media_Type.TEXT) {
      this.maxLimit = this.maxLimitForTextPost;
    }
  },
  created() {
    // this.$router.beforeEach((to, from, next) => {
    //   if (this.isVisible == "block") {
    //     next(false);
    //     this.clickClose();
    //   } else {
    //     next(true);
    //   }
    // });
  },
  mounted() {
    //this.galleriaService.setMixMedia().then(data => this.imagesGallery = data);
    // console.log(this.imagesGallery);
    window.addEventListener("resize", this.setWindowHeightWidth);
    this.setWindowHeightWidth();
    this.setDropdownList();
    if (
      this.postData.author.is_admin == true
      // || this.postData.author.is_pseudo_user == true
    ) {
      this.cursorPointer = "context-menu";
    }

    // console.log(this.postData.media_type);
    // this.setMediaType(this.postData.medias);
    let checkUrl = "/" + appConstants.display_route_Name.TIMELINE;
    let activityUrl =
      "/" +
      this.postData.author.slug +
      "/" +
      appConstants.display_route_Name.ACTIVITY;
    if (
      window.location.pathname == checkUrl ||
      window.location.pathname == activityUrl
    ) {
      // console.log("in if windows listener");
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.setWindowHeightWidth);
  },
};
</script>
<style scoped>
.invisible-scrollbar::-webkit-scrollbar-thumb {
  display: none;
}
.invisible-scrollbar::-webkit-scrollbar-button {
  display: none;
}
#show {
  position: fixed;
  top: 30px;
  left: 10px;
}
.item-fullscreen {
  display: block !important;
}
.fullscreen-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  /* width: auto; */
  justify-content: center;
  /* align-items: center; */
}
.fullscreen-galleria {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1111;
  cursor: pointer;
}
.subtitle-size {
  /* font-size: 0.875rem !important; */
  line-height: 1rem !important;
}
</style>
