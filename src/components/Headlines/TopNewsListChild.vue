<template>
  <div class="form-container cls-topnewslist">
    <div class="flex mb-4 justify-center">
      <span class="text-2xl font-bold">Headlines</span>
    </div>
    <div class="flex flex-col">
      <!-- {{ topNewsList }} -->

      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div
          v-for="(news, index) in topNewsList"
          :key="index"
          class="md:mx-auto bg-[#1C1C1C] text-[#F2F2F2] w-full h-full"
          @click="showTopNewsSlider(news.url_str)"
        >
          <div class="flex flex-col">
            <div class="bg-[#f2f2f2] rounded-lg p-3 cursor-pointer">
              <div class="gap-4 news-container">
                <div class="flex">
                  <div class="bg-[#cdcdcd] news-cover-image rounded-lg">
                    <img
                      :src="setCoverImage(news.medias)"
                      alt=""
                      class="rounded-lg object-cover news-cover-image"
                    />
                  </div>
                </div>

                <div class="flex">
                  <div class="">
                    <h1
                      class="lg:text-xl text-base font-bold text-black leading-5 mb-3"
                    >
                      {{ news.title }}
                    </h1>
                    <p class="text-sm font-bold text-black leading-5">
                      {{ setNewsDescription(news.content) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
import Skeleton from "primevue/skeleton";

export default {
  name: "TopNewsListChild",
  components: { Skeleton },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let topNewsList = computed(
      () => store.getters["topnews/getter_AllTopNewsList"]
    );
    let isNextCall = ref(true);
    let position = ref(0);
    let isFetchingNewData = false;
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 10,
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
    store.commit("topnews/commit_AllTopNewsList", obj);
    await getNewsList();
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          getNewsList();
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

    // onMounted(() => {
    //   getNewsList();
    // });
    async function getNewsList() {
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;

      try {
        await store
          .dispatch("topnews/action_getAllTopNewsList", args)
          .then((res) => {
            // console.log("response topnews", res.data.next);
            isFetchingNewData = false;
            args.page = args.page + 1;
            if (res.data.next == null) {
              isNextCall.value = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
      // store.dispatch("topnews/action_getAllTopNewsList").then(() => {
      //   console.log("TopNewsListTimeline", newsList.value.length);
      // });
    }
    function setCoverImage(media) {
      let image = media[0]?.name;
      //console.log("news", news);
      if (image != null && image.trim() != "") {
        return image;
      }
      // else {
      //   return Olous_Block_img;
      // }
    }
    function setNewsDescription(content) {
      let maxLength = 150;
      let text = content;
      if (text.length > maxLength) {
        text = text.slice(0, maxLength) + "...";
      }
      return text;
    }
    function showTopNewsSlider(url_str) {
      //console.log("url-str", url_str);
      router.push({
        name: appConstants.routes.SINGLEDAYTOPNEWS,
        params: { encrypted_str: url_str },
      });
    }

    return {
      setNewsDescription,
      showTopNewsSlider,
      getNewsList,
      setCoverImage,
      topNewsList,
      isNextCall,
      position,
      isFetchingNewData,
    };
  },
};
</script>
