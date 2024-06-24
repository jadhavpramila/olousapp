<template>
  <div class="form-container cls-topnews cls-topnews-mobile">
    <!-- <div class="flex mb-5 justify-center">
      <span class="news-headline">Olous Top Headlines</span>
    </div> -->
    <div class="flex justify-center" v-if="isShowSkeleton">
      <Skeleton height="70vh" width="420px" class="rounded-2xl"> </Skeleton>
    </div>
    <div class="flex justify-center">
      <!-- <Galleria
        :value="newsList"
        :numVisible="5"
        :showThumbnails="false"
        :showItemNavigators="true"
        :activeIndex="activeIndex"
      >
        <template #item="{ item }">
          <img
            :src="item.medias[0]?.name"
            alt="item.alt"
            style="
              width: 450px !important;
              display: block;
              height: 78vh !important;
            "
          />
        </template>

        <template #caption="{ item }">
          <h4 class="text-white news-headline">
            {{ item.title }}
          </h4>
          <br />
          <p class="news-text">
            <span class="">{{ item.content }}</span>
          </p>
        </template>
      </Galleria> -->
      <Carousel
        :id="unique_Id"
        :value="newsList"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="">
                <img
                  :src="slotProps.data?.medias[0].name"
                  alt="slotProps.data.url"
                  class="product-image relative select-none"
                  style="
                    width: 420px !important;
                    display: block;
                    height: 70vh !important;
                  "
                />
              </div>
              <div
                v-if="slotProps.data"
                class="overlay-single-news absolute top-0"
              >
                <span class="flex justify-end" @click="clickClose()"
                  ><img
                    src="../../assets/Close-News.svg"
                    alt=""
                    class="cursor-pointer select-none"
                /></span>

                <h4
                  class="news-headline lg:px-6 lg:py-3 md:px-6 md:py-3 px-4 py-2 select-none"
                >
                  {{ slotProps.data.title }}
                </h4>
                <p
                  class="news-text lg:px-6 lg:py-3 md:px-6 md:py-3 px-4 py-2 select-none"
                >
                  <span>{{ slotProps.data.content }}</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
import Galleria from "primevue/galleria";
import Carousel from "primevue/carousel";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import { UniqueComponentId } from "primevue/utils";
import Skeleton from "primevue/skeleton";

export default {
  name: "SingleDayTopNews",
  components: {
    Galleria,
    Carousel,
    Skeleton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let newsList = ref([]);
    let activeIndex = ref(0);
    let unique_Id = ref();
    let isShowSkeleton = ref(true);
    let isInternational = ref(false);
    let topNewsListData = computed(
      () => store.getters["topnews/getter_topNewsListData"]
    );
    let selected_article_id = ref();
    // computed(
    //   () => store.getters["topnews/getter_selected_article_id"]
    // );
    let isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    onMounted(() => {
      let url = window.location.href;
      let encryptedString = route.params.encrypted_str;
      //url.substring(url.lastIndexOf("/") + 1);

      if (route.query.q != undefined) {
        isInternational.value = JSON.parse(route.query.q);
      } else {
        isInternational.value = false;
      }

      unique_Id.value = UniqueComponentId();
      getMultipleNews(encryptedString);
    });
    const responsiveOptions = ref([
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
    ]);

    async function getMultipleNews(encryptedString) {
      let obj = {
        article_data: encryptedString,
        is_international: isInternational.value,
      };
      await store.dispatch("topnews/action_getTopNewsList", obj).then((res) => {
        selected_article_id.value = res;
        getNewsList(res);
      });
    }
    function getNewsList(id) {
      let newsObj = [];
      for (let i = 0; i < topNewsListData.value.length; i++) {
        if (topNewsListData.value[i].id == id) {
          activeIndex.value = i;
          newsObj.unshift(topNewsListData.value[i]);
        }
        // let newsObj = {
        //   url: topNewsListData.value[i].medias[0].name,
        //   index: i,
        //   id: topNewsListData.value[i].id,
        //   title: topNewsListData.value[i].title,
        //   content: topNewsListData.value[i].content,
        // };
        newsObj.push(topNewsListData.value[i]);
        //console.log("newsList.value", newsObj);
      }
      var result = newsObj.reduce((unique, o) => {
        if (!unique.some((obj) => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
      //console.log("newsObj befor reverse", newsObj);
      newsList.value = result;
      //.reverse();
      isShowSkeleton.value = false;
      //console.log("newsList.value", newsList.value);
    }
    function UniqueComponentId() {
      let uniqueId = "pv_id_17";
      return uniqueId;
    }

    function clickClose() {
      if (isUserLoggedIn.value) {
        router.push({ name: appConstants.routes.JOBS });
      } else {
        router.push({ name: appConstants.routes.HOME });
      }
      selected_article_id.value = "";
      newsList.value = [];
    }
    onUnmounted(() => {
      selected_article_id.value = "";
      newsList.value = [];
      //store.commit("topnews/commit_selectedArticleId");
    });

    return {
      //images,
      newsList,
      activeIndex,
      unique_Id,
      topNewsListData,
      selected_article_id,
      responsiveOptions,
      isUserLoggedIn,
      isShowSkeleton,
      isInternational,
      getMultipleNews,
      clickClose,
      getNewsList,
    };
  },
};
</script>
<style>
.product-item .product-item-content {
  border-radius: 3px;
  text-align: center;
}

.product-item .product-image {
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
}
.overlay-single-news {
  background-color: rgba(0, 0, 0, 0.5);
  /*top: 3% !important;
     border-radius: 10px; */
  width: 100%;
  height: 100%;
  /* padding: 10px 30px 30px 30px; */
  border-radius: 16px;
}
@media only screen and (max-width: 600px) {
  .overlay-single-news {
    background-color: rgba(0, 0, 0, 0.5);
    /*top: 3% !important;
     border-radius: 10px; */
    width: 100%;
    height: 100%;
    /* padding: 14px; */
  }
}
</style>
