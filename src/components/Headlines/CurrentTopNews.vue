<template>
  <div class="flex w-full mt-4">
    <h1 class="headline-title">Todays Top Headlines</h1>
  </div>
  <div class="flex w-full mt-3 cls-currenttopnews">
    <Carousel
      :id="getUnique()"
      :value="topNewsList"
      :numVisible="test()"
      :numScroll="1"
    >
      <template #item="slotProps">
        <div class="product-item">
          <div class="product-item-content">
            <div class="product-img-size">
              <img
                v-if="slotProps.data.url"
                :src="slotProps.data.url"
                alt="img"
                class="product-image relative select-none"
              />
              <div
                v-if="slotProps.data.url"
                class="overlay absolute top-0 cursor-pointer select-none"
                @click="showTopNewsSlider(slotProps.data.url_str)"
              >
                <h4 class="mb-2 news-title select-none">
                  {{ slotProps.data.title }}
                </h4>
              </div>
              <div v-if="!slotProps.data.url" class="end-slide relative"></div>

              <div
                v-if="!slotProps.data.url"
                class="end-slide absolute top-0 cursor-pointer select-none"
                @click="showTopNewsList()"
              >
                <h4 class="mb-2 view-more select-none">
                  {{ slotProps.data.title }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Carousel from "primevue/carousel";
import appConstants from "../../appConstants.js";
import { useToast } from "primevue/usetoast";
import { UniqueComponentId } from "primevue/utils";

export default {
  name: "CurrentTopNews",
  components: {
    Carousel,
  },
  props: {
    topNewsList: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let unique_Id = ref();

    const responsiveOptions = ref([
      {
        breakpoint: "1024",
        numVisible: 6,
        numScroll: 1,
      },
      {
        breakpoint: "600",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "480",
        numVisible: 3,
        numScroll: 1,
      },
    ]);
    onMounted(() => {
      let type = 1;
      test();
      //getNewsList(type);
      unique_Id.value = UniqueComponentId();
      let getclass = document.querySelector(".p-carousel-items-container");
      getclass.style.transform = "translate3d(0%, 0px, 0px)";
      //console.log("UniqueComponentId", getclass);
    });

    // let newsList = computed(
    //   () => store.getters["unsubscribe/getter_NewsListData"]
    // );

    // function getNewsList(type) {
    //   store.dispatch("unsubscribe/action_getNewsList", type).then(() => {});
    // }

    function showTopNewsSlider(url_str) {
      router.push({
        name: appConstants.routes.SINGLEDAYTOPNEWS,
        params: { encrypted_str: url_str },
      });
    }
    function test() {
      let desktop = responsiveOptions.value[0];
      let tab = responsiveOptions.value[1];
      let mobile = responsiveOptions.value[2];
      //console.log(responsiveOptions.value);
      let windowWidth = window.innerWidth;
      //console.log(window.innerWidth);
      if (window.innerWidth < tab.breakpoint) {
        return 3;
      } else {
        return 6;
      }
    }
    function showTopNewsList() {
      router.push({ name: appConstants.routes.TOPNEWSLIST });
    }
    function UniqueComponentId() {
      let uniqueId = "pv_id_2";
      return uniqueId;
    }
    let count = 2;
    function getUnique() {
      let uniqueId = `pv_id_${count}`;
      count++;
      return uniqueId;
    }

    return {
      unique_Id,
      responsiveOptions,
      showTopNewsSlider,
      showTopNewsList,
      getUnique,
      test,
      //newsList,
      // getNewsList,
    };
  },
};
</script>
<style lang="css" scoped>
.product-item .product-item-content {
  /* border: 1px solid var(--surface-border); */
  border-radius: 3px;
  margin: 0.3rem 0 0.3rem 0;
  text-align: center;
  /* padding: 2rem 0; */
}

.product-item .product-image {
  width: 100%;
  max-height: 145px;
  border-radius: 10px;
}
.news-title {
  max-width: 92px;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  padding-left: 8px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 8px;
}
.view-more {
  max-width: 92px;
  font-size: 10.2px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;
}
.overlay {
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-image: linear-gradient(
    to top,
    #000,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0) 19%
  );
  top: 4% !important;
  border-radius: 10px;
  width: 96px;
  height: 145px;
}
.end-slide {
  width: 96px;
  height: 145px;
  border-radius: 10px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  background: #343434;
  color: #fff;
}
.product-img-size {
  max-width: 96px;
  max-height: 145px;
}
.headline-title {
  font-size: 16.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--white);
}
</style>
