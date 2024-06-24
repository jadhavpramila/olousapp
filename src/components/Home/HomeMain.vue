<template>
  <div>
    <div class="home-main-inner">
      <div class="padding-left-right-home padding-top">
        <div class="flex flex-row w-full justify-between">
          <img
            @click="homePage()"
            :src="getStaticImage('Olous_logo_with_text.svg')"
            alt=""
            class="cursor-pointer lg:w-40 md:w-40 w-32"
          />
          <button
            class="bg-white cursor-pointer font-weight-700 px-4 rounded-full text-base app-text-color-secondary"
            @click="signInPage()"
          >
            Sign In
          </button>
        </div>
        <div
          class="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 lg:gap-20 md:gap-20 gap-8 lg:mt-10 md:mt-10 mt-8"
        >
          <div class="justify-between flex flex-col lg:col-span-7">
            <div>
              <span class="home-title"
                >Enter the future of <br class="lg:hidden md:hidden block" />
                construction</span
              >
            </div>
            <div class="flex search-bar w-full lg:pt-0 md:pt-0 pt-8">
              <div class="w-full block relative">
                <div class="flex items-center justify-end">
                  <input
                    v-model="query"
                    type="text"
                    ref="search_query"
                    placeholder="I am interested in"
                    class="app-text-color-secondary"
                    name="search"
                    v-on:keyup="isSearchClick($event)"
                  />
                  <button
                    v-if="query.length > 0"
                    class="absolute bg-transparent border border-0 mr-14"
                  >
                    <img
                      @click="clear()"
                      src="../../assets/Close-Black.svg"
                      alt=""
                      class="w-9"
                    />
                  </button>
                  <button
                    @click="clickSearch"
                    type="submit"
                    class="absolute flex items-center justify-center"
                  >
                    <i class="pi pi-search mr-2"></i>Search
                  </button>
                </div>
              </div>
            </div>
            <div class="lg:pt-0 md:pt-0 pt-5">
              <span class="home-subtitle"
                >Trending Top Topics people are searching for</span
              >
              <div class="pt-3">
                <div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('BIM')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2"
                      >What is BIM?</span
                    >
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Civil Engineering Jobs')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2"
                      >Civil Engineering Jobs</span
                    >
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('3D Printing')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      3D Printing in Construction
                    </span>
                  </div>

                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickNeedAContractor('Need a Contractor')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2"
                      >Need a Contractor</span
                    >
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Digital Twins')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      What are Digital Twins?
                    </span>
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Construction News')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2"
                      >Construction News</span
                    >
                  </div>

                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Project Management')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      How to manage projects effectively?
                    </span>
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('structures')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      Types of Structural Systems
                    </span>
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Bridging the gap')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      Industry Leaders
                    </span>
                  </div>
                  <div
                    class="lg:mt-2 md:mt-2 mt-1 cursor-pointer"
                    @click="clickOnSearchTab('Software')"
                  >
                    <span class="home-main-text lg:px-2 md:px-2 px-2">
                      Trending Softwares in Construction
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="lg:col-span-5 md:col-span-6 flex flex-col justify-between h-full w-full"
          >
            <div class="video-div">
              <video
                id="myVideo"
                :poster="getStaticImage('Video-Home.png')"
                @click="playVideoFullscreen()"
                class="rounded-3xl"
              >
                <source
                  src="../../assets/Home-Video.mp4"
                  type="video/mp4"
                  class="rounded-3xl"
                />
                Your browser does not support HTML5 video.
              </video>
              <!-- <img
            src="../../assets/Video-Home.png"
            alt="video_poster"
            class="h-full w-full rounded-3xl object-cover"
            @click="playVideoFullscreen()"
          /> -->
            </div>
            <div class="text-center lg:pt-5 md:pt-5 pt-4">
              <span
                class="lg:text-2xl md:text-2xl text-lg text-white font-weight-500"
                >Olous is a virtual Global Construction Community to learn,
                share knowledge, get hired and grow</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-row lg:pt-10 md:pt-10 pt-6 w-full h-full">
          <!-- <a
            href="https://apps.apple.com/app/olous/id1493054723?ls=1"
            target="_blank"
          >
            <img src="../../assets/appleStore.svg" alt="" class="lg:mt-0" />
          </a> -->
          <a
            href="https://play.google.com/store/apps/details?id=com.vadcore.olous"
            target="_blank"
          >
            <img
              src="../../assets/androidStore.svg"
              alt=""
              class="ml-2 lg:mt-0"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useStore } from "vuex";
import { ref, computed } from "vue";
export default {
  name: "HomeMain",
  setup() {
    const store = useStore();
    const router = useRouter();
    const search_query = ref(null);

    let query = ref("");

    let getter_getData = computed(() => store.getters["search/getter_getData"]);

    store.dispatch("search/action_getData");

    function clear() {
      query.value = "";
      search_query.value.focus();
    }
    function clickSearch() {
      if (query.value.trim() != "") {
        store.commit("search/commit_saveActiveTabs", {
          mainTab: appConstants.search_tabs.CONTENT,
          subTab: appConstants.search_sub_tabs.ALL,
        });
        router.push({
          name: appConstants.routes.SEARCH_CONTENT,
          params: {
            searchFor: query.value,
          },
        });
      } else {
        this.query = "";
        search_query.value.focus();
      }
    }
    function clickOnSearchTab(searchString) {
      if (searchString.trim() != "") {
        store.commit("search/commit_saveActiveTabs", {
          mainTab: appConstants.search_tabs.CONTENT,
          subTab: appConstants.search_sub_tabs.ALL,
        });
        router.push({
          name: appConstants.routes.SEARCH_CONTENT,
          params: {
            searchFor: searchString,
          },
        });
      } else {
        this.query = "";
        search_query.value.focus();
      }
    }
    function clickNeedAContractor() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
      });
    }
    function isSearchClick(e) {
      if (e.keyCode === 13) {
        clickSearch();
        search_query.value.blur();
      }
    }
    function homePage() {
      router.push({ name: appConstants.routes.HOME });
    }
    function signInPage() {
      router.push({ name: appConstants.routes.LOGIN });
    }
    function playVideoFullscreen() {
      var myVideo = document.getElementById("myVideo");
      //console.log("my video", myVideo);
      if (myVideo.paused) {
        if (myVideo.requestFullscreen) {
          myVideo.requestFullscreen();
        } else if (myVideo.msRequestFullscreen) {
          myVideo.msRequestFullscreen();
        } else if (myVideo.mozRequestFullScreen) {
          myVideo.mozRequestFullScreen();
        } else if (myVideo.webkitRequestFullScreen) {
          myVideo.webkitRequestFullScreen();
        }
        myVideo.play();
      } else {
        myVideo.pause();
      }
    }
    return {
      search_query,
      query,
      getter_getData,
      clear,
      clickSearch,
      isSearchClick,
      clickOnSearchTab,
      clickNeedAContractor,
      homePage,
      signInPage,
      playVideoFullscreen,
    };
  },
};
</script>

<style>
.home-main {
  background: url("../../assets/Backgound-HomeMain.png") no-repeat scroll right
    top;
  /* background-position: center; */
  width: 100%;
  height: 100vh;
  /* background-attachment: fixed; */
  background-size: cover;
  /* background-repeat: no-repeat; */
  -o-background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
}
.home-main-inner {
  height: 100vh;
  width: 100%;
  /* display: flex;
  align-items: center; */
}
.padding-top {
  padding-top: 80px;
}
.home-title {
  font-size: 50px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
.home-subtitle {
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.65;
  letter-spacing: normal;
  text-align: left;
  color: #dedede;
}
.home-main-text {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: #c9c9c9;
  background: #000;
  margin: 6px;
  border-radius: 14px;
  border: 1px solid #dee2e6;
  float: left;
}
.search-bar input[type="text"] {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #fff;
  border-radius: 24px;
  float: left;
  width: 100%;
  background: #fff;
}

.search-bar button {
  float: left;
  width: 18%;
  padding: 8px;
  background: #000;
  color: white;
  font-size: 16px;
  border: 1px solid #000;
  border-left: none;
  border-radius: 24px;
  cursor: pointer;
  margin-right: 4px;
}
.search-bar button:focus-visible {
  outline: none !important;
}
.search-bar input:focus-visible {
  outline: none !important;
}

.search-bar button:hover {
  background: #000;
}
.video-div {
  width: 100%;
  height: 66.5%;
  margin: 0px 0px 0px 0px;
  /* padding: 51px 26px 34px 27px; border: solid 1px #707070;
  background-color: #000;*/
  border-radius: 24px;
}
@media only screen and (max-width: 600px) {
  .home-main {
    background: url("../../assets/Backgound-HomeMain.png") no-repeat scroll
      right;
    /* background-position: center; */
    width: 100%;
    height: 900px;
    /* background-attachment: fixed; */
    background-size: cover;
    /* background-repeat: no-repeat; */
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
  }
  .home-title {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  .home-subtitle {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.65;
    letter-spacing: normal;
    text-align: left;
    color: #dedede;
  }
  .search-bar input[type="text"] {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #fff;
    border-radius: 24px;
    float: left;
    width: 100%;
    background: #fff;
  }

  .search-bar button {
    float: left;
    width: 24%;
    padding: 8px;
    background: #000;
    color: white;
    font-size: 12px;
    border: 1px solid #000;
    border-left: none;
    border-radius: 24px;
    cursor: pointer;
    margin-right: 2.2px;
  }
  .video-div {
    width: 100%;
    height: 100%;
    margin: 0px 0px 0px 0px;
    /*  padding: 51px 26px 34px 27px;border: solid 1px #707070;
    background-color: #000; */
    border-radius: 24px;
  }
  .home-main-text {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #c9c9c9;
    background: #000;
    padding: 3px;
    margin: 5px;
    border-radius: 14px;
    border: 0.8px solid #dee2e6;
    float: left;
  }
  .padding-top {
    padding-top: 20px;
  }
}
</style>
