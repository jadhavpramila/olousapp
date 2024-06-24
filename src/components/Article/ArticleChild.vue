<template>
  <div class="form-container" v-if="articleData">
    <div class="flex w-full justify-center items-center mb-4">
      <div>
        <h1 class="page-title">Articles</h1>
      </div>
    </div>
    <div class="grid lg:grid-cols-4 grid-cols-1 gap-3 pb-4">
      <div class="lg:col-span-4 col-span-12">
        <div class="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
          <div
            v-for="(article, index) in articleData"
            :key="index"
            class="w-full bg-[#343434] rounded-xl text-[#333333] cursor-pointer"
          >
            <div
              class="flex flex-col"
              @click="reditectToArticleDetails(article.url)"
            >
              <v-lazy-image
                class="rounded-t-xl h-40 w-auto object-cover"
                :src="getCoverImage(article.medias[0]?.name)"
                alt=""
              />

              <div class="flex flex-col p-2 w-full">
                <div class="grid grid-cols-1 items-start">
                  <h1
                    class="font-medium text-base text-white leading-tight break-all"
                  >
                    {{ setArticleTitle(article.title) }}
                  </h1>
                </div>

                <div class="grid grid-cols-1 items-center">
                  <div class="col-span-4 text-xs text-white mt-5">
                    <small class="text-[#d3d3d3] font-light text-xs">{{
                      setURL(article.url)
                    }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="form-container text-white">
    <p>Please wait loading ...</p>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import VLazyImage from "v-lazy-image";
import Olous_Block_img from "../../assets/Olous_Block.svg";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
// import Dialog from "primevue/dialog";
// import MultiSelect from "primevue/multiselect";

export default {
  name: "ArticleChild",
  components: {
    VLazyImage,
    // Dialog,
    // MultiSelect,
  },
  async setup() {
    const store = useStore();
    const router = useRouter();
    //const displayInterest = ref(false);
    let position = ref(0);
    let interestListData = "";
    let isNextCall = ref(true);
    let isFetchingNewData = false;
    let articleData = computed(
      () => store.getters["article/getter_articleData"]
    );
    let interestList = computed(
      () => store.getters["article/getter_interestData"]
    );
    let interestData = computed(
      () => store.getters["dropdown/getter_interest"]
    );
    let userData = computed(() => store.getters["login/getter_user"]);
    let args = reactive({
      interest: "",
      page: 1,
      offset: 0,
      limit: 20,
    });
    document.onscroll = function () {
      let pos = getVerticalScrollPercentage(document.body);
      position.value = Math.round(pos);
      // console.log("position =>", position.value);
    };

    function getVerticalScrollPercentage(elm) {
      var p = elm.parentNode;
      return (
        ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) *
        100
      );
    }

    let obj = {
      data: null,
      page: 1,
    };
    store.commit("article/commit_articleData", obj);
    await getData();
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          getData();
        }
      }
    });
    function setInterest() {
      let interestArr;
      if (interestList.value) {
        interestArr = interestList.value;
      } else {
        interestArr = userData.value.interests;
        store.commit("article/commit_InterestList", interestArr);
      }

      return interestArr;
    }
    async function getData() {
      // console.log("in getData()", isFetchingNewData);
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;
      args.interest = await setInterest();
      try {
        await store
          .dispatch("article/action_getArticleData", args)
          .then((res) => {
            // console.log("response", res);
            isFetchingNewData = false;
            args.page = args.page + 1;
            if (res.next == null) {
              isNextCall.value = false;
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    // function openInterestDialog() {
    //   displayInterest.value = true;
    // }
    // function applyInterestDialog() {
    //   displayInterest.value = false;
    // }
    function setArticleTitle(title) {
      let maxLimit = 50;
      let newstring = title.slice(0, maxLimit) + "...";
      return newstring;
    }
    function setURL(url) {
      let maxLimit = 29;
      let newstring = url.slice(0, maxLimit) + "...";
      return newstring;
    }
    function getCoverImage(banerImage) {
      if (banerImage != null && banerImage.trim() != "") {
        //var imageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${banerImage}`;
        return banerImage;
      } else {
        return Olous_Block_img;
      }
    }
    function reditectToArticleDetails(url) {
      // console.log(slug);
      if (url != "") {
        window.open(url, "_blank");
      } else {
        return "";
      }
    }

    return {
      articleData,
      interestList,
      args,
      position,
      isFetchingNewData,
      isNextCall,
      userData,
      //displayInterest,
      interestData,
      interestListData,
      // openInterestDialog,
      // applyInterestDialog,
      getData,
      reditectToArticleDetails,
      getCoverImage,
      setInterest,
      setArticleTitle,
      setURL,
    };
  },
};
</script>

<style></style>
