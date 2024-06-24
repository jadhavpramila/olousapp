<template>
  <div class="py-5">
    <!-- {{allActivityData}} -->
    <div>
      <div class="card">
        <!-- <h5>Default</h5> -->
        <TabView ref="tabview1" lazy @tab-click="activityTabClick">
          <TabPanel :header="tabs.PRODUCTS">
            <div
              v-if="allCompanyData.products.length > 0"
              class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 mt-3"
            >
              <div
                class="w-full app-bg-color-secondary rounded-xl cursor-pointer"
                v-for="(product, index) in allCompanyData.products"
                :key="index"
              >
                <ProductCard
                  :product="product"
                  :company_slug="allCompanyData.slug"
                ></ProductCard>
                <!-- <a :href="clickEnquire(product.id)" target="_blank">
                  <div class="">
                    <img
                      :src="setProductImage(product)"
                      alt=""
                      class="rounded-t-[0.625rem] object-cover lg:h-[10.25rem] md:lg:h-[10.25rem] h-[10.25rem] w-full"
                    />
                  </div>

                  <div class="flex-col">
                    <div>
                      <h1
                        class="text-sm app-text-color-secondary mb-1 leading-5 p-2 text-ellipsis font-extralight"
                        data-bs-toggle="tooltip"
                        :title="product.name"
                      >
                        {{ product.name }}
                      </h1>
                    </div>
                    <div class="flex flex-inline p-2">
                      <p class="text-base app-text-color-secondary">
                        View Details
                      </p>
                      &nbsp;&nbsp;
                      <img
                        src="../../assets/arrow-company-enquire.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </a> -->
              </div>
            </div>
            <div v-else class="mt-3">
              <span class="app-text-color-secondary text-base font-bold"
                >Oops! It seems that this company hasn't added any products
                yet.</span
              >
            </div>
          </TabPanel>
          <TabPanel :header="tabs.ABOUTUS">
            <AboutCompany :allCompanyData="allCompanyData" />
          </TabPanel>
          <TabPanel
            :header="tabs.CATALOGUE"
            v-if="allCompanyData.catalouges?.length > 0"
          >
            <!-- <div>
              <h1 class="text-lg text-white font-medium mb-4">
                Products Catalogue
              </h1>
            </div> -->
            <div class="text-subtitle font-bold">Catalogue</div>
            <div
              class="grid lg:grid-cols-4 md:grid-cols-4 xs:grid-cols-2 gap-3 mt-3"
            >
              <div
                class="w-full rounded-xl cursor-pointer app-bg-color-gradient app-comp-box-shadow h-[9.975rem] flex justify-center items-center"
                v-for="(catalouge, index) in allCompanyData.catalouges"
                :key="index"
                @click="clickCatalouge(catalouge.media.name)"
              >
                <div>
                  <div
                    class="w-full flex justify-center rounded-t-[0.625rem] cursor-pointer"
                  >
                    <img
                      src="../../assets/pdf-new.svg"
                      alt=""
                      class="p-2 w-[4rem]"
                    />
                  </div>
                  <div class="flex-col">
                    <div class="flex justify-center items-center">
                      <h1
                        class="text-small leading-4 p-3 text-ellipsis font-extralight"
                      >
                        {{ setCatalogTitle(catalouge.name) }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="grid lg:grid-cols-4 grid-cols-1 gap-8 mt-2.5">
              <div
                class="w-[12.25rem] h-[12.25rem] rounded-[0.625rem] bg-[#f2f2f2] cursor-pointer"
                v-for="(catalouge, index) in allCompanyData.catalouges"
                :key="index"
                @click="clickCatalouge(catalouge.media.name)"
              >
                <div class="flex items-start justify-end">
                  <img
                    src="../../assets/pdf-new.svg"
                    alt=""
                    class="p-2 w-[2.5rem]"
                  />
                </div>
                <div class="flex flex-col h-full justify-center">
                  <p class="app-text-color-secondary font-light text-xs pl-6 capitalize">
                    {{ setCatalogTitle(catalouge.name) }}
                    {{  }}
                  </p>
                </div>
              </div>
            </div> -->
          </TabPanel>
          <!-- <TabPanel :header="tabs.ACTIVITIES">
            <div class="pb-5">
              <div
                class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-3 pb-4 mt-3"
                v-if="postData.length > 0"
              >
                <div
                  class="col-span-3"
                  v-for="(data, index) in postData"
                  :key="index"
                >
                  <SinglePost
                    :postData="data"
                    :showFollowing="showFollowing"
                    :post_type="post_prefix"
                  />
                </div>
                <div>
                  <InfiniteLoading
                    :comments="postData"
                    @infinite="load"
                    class="col-span-3"
                  >
                    <template #spinner class="w-full" style="width=100%">
                      <SinglePostSkeleton></SinglePostSkeleton>
                    </template>
                  </InfiniteLoading>
                </div>
              </div>
              <div v-else>
                <h1 class="text-base text-white text-[#8d8d8d]">
                  No activities at present.
                </h1>
              </div>
            </div>
          </TabPanel> -->
        </TabView>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeMount, reactive } from "vue";
import TabView from "primevue/tabview";
import appConstants from "../../appConstants.js";
import TabPanel from "primevue/tabpanel";
import AboutCompany from "/src/components/CompanyWebsite/AboutCompany.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import SinglePost from "../Post/SinglePost.vue";
import { useRouter } from "vue-router";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import {
  createCompanyProductURL,
  getCurrentHostName,
  getCurrentEncodedURL,
} from "../../common/js/webUrls.js";
import VLazyImage from "v-lazy-image";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import SinglePostSkeleton from "../Post/SinglePostSkeleton.vue";
import {
  getCoverImageURL,
  getPostTitleElseContent,
} from "/src/common/js/ReadPostData.js";
import ProductCard from "./ProductCard.vue";

export default {
  name: "CompanyWithLogin",
  components: {
    TabView,
    TabPanel,
    AboutCompany,
    SinglePost,
    VLazyImage,
    InfiniteLoading,
    SinglePostSkeleton,
    ProductCard,
  },
  props: {
    allCompanyData: {
      type: Object,
      default: {},
    },
    // allActivityData: {
    //   type: Object,
    //   default: {},
    // },
    isUserLogin: Boolean,
  },
  data() {
    return {
      post_prefix: appConstants.shape_page_postfix.POST,
    };
  },
  async setup(props) {
    const store = useStore();
    const router = useRouter();
    const maxLimit = 100;
    let isTruncate = false;
    let showFollowing = ref(false);

    const tabs = {
      PRODUCTS: "Products",
      ABOUTUS: "About",
      CATALOGUE: "Catalogue",
      ACTIVITIES: "Activities",
    };
    // let allActivityData = ref({});

    let postData = computed(
      () => store.getters["companyData/getter_ActivityData"]
    );
    // console.log(props.allCompanyData.slug);
    let args = reactive({
      page: 1,
      offset: 0,
      limit: 10,
      slug: props.allCompanyData.slug,
    });
    // let pageNumber = 1;

    onBeforeMount(() => {
      let obj = {
        page: 1,
        postData: null,
      };
      store.commit("companyData/commit_activityData", obj);
    });

    async function load($state) {
      // args.page = args.page + 1;
      args.offset = (args.page - 1) * args.limit;
      try {
        await store
          .dispatch("companyData/action_getActivityData", args)
          .then((res) => {
            //pageNumber.value = res.currentPage+1
            args.page = res.currentPage + 1;
            if (res.next == null) {
              $state.complete();
            }
          });

        $state.loaded();
        // pageNumber++;
      } catch (error) {
        $state.error();
      }
    }
    function setProductImage(product) {
      //console.log(product);
      for (let j = 0; j < product.medias.length; j++) {
        if (product.medias[j].is_primary == true) {
          // let productImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
          //   product.medias[j].name
          // }`;

          return product.medias[j].name;
        }
      }
    }
    function setCatalogTitle(title) {
      if (title.length > maxLimit) {
        //let dots = "...";
        let formattedTitle = title.slice(0, maxLimit) + "...";

        // console.log(dots.formattedTitle);
        return formattedTitle;
      } else {
        return title;
      }
    }
    // async function getActivity() {
    //   console.log("in getAct fun");
    //   await store
    //     .dispatch(
    //       "companyData/action_getActivityData",
    //       props.allCompanyData.company_user_id
    //     )
    //     .then(() => {
    //      // console.log("get", getter_ActivityData);
    //       // allActivityData = getter_ActivityData.value.results;
    //     });
    //   // console.log("Activities", allActivityData);
    // }
    function clickCatalouge(catalougeName) {
      //console.log("Catalouge Name",catalougeName)
      // let catalougeUrl = `${
      //   import.meta.env.VITE_APP_CATALOUGE_URL
      // }${catalougeName}`;

      window.open(catalougeName, "_blank");
    }
    function clickEnquire(index) {
      //console.log("product index id", index);
      let productId = getUUIDtoEncodedString(index);
      //  console.log('product id',productId)
      let host = getCurrentHostName();
      let url = createCompanyProductURL(
        host,
        props.allCompanyData.slug,
        productId
      );
      // let url = router.resolve({
      //   name: appConstants.routes.PRODUCTDETAILS,
      //   params: { product_id: productId },
      // });
      // window.open(url.href, "_blank");
      return url;
    }

    function setPostTitleElseContent(data) {
      var postData = getPostTitleElseContent(data);
      return postData;
    }

    function setImageURL(data) {
      return getCoverImageURL(data);
    }
    // function showPostDetails(post_id) {
    //   let encode_str = getUUIDtoEncodedString(post_id);
    //   router.push({
    //     name: appConstants.routes.POST,
    //     params: {
    //       post_id: `${encode_str}${appConstants.shape_page_postfix.POST}`,
    //     },
    //   });
    // }

    async function activityTabClick(tabinfo) {
      if (tabinfo.originalEvent.target.innerText == tabs.ACTIVITIES) {
        if (props.isUserLogin == false) {
          getCurrentEncodedURL();
        } else {
          args.offset = (args.page - 1) * args.limit;
          try {
            await store
              .dispatch("companyData/action_getActivityData", args)
              .then((res) => {
                //pageNumber.value = res.currentPage+1
                args.page = res.currentPage + 1;
                if (res.next == null) {
                  $state.complete();
                }
              });

            // $state.loaded();
            // pageNumber++;
          } catch (error) {
            //$state.error();
          }
        }
      }
      /// console.log(tabinfo.originalEvent.target.innerText);
    }

    onMounted(() => {
      //getActivity();
      //setCatalogTitle();
    });
    return {
      setProductImage,
      //getActivity,
      // allActivityData,
      clickEnquire,
      postData,
      showFollowing,
      clickCatalouge,
      setImageURL,
      setPostTitleElseContent,
      // showPostDetails,
      maxLimit,
      setCatalogTitle,
      isTruncate,
      activityTabClick,
      tabs,
      load,
      //pageNumber,
      args,
    };
  },
};
</script>

<style>
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  width: 130px !important;
}

@media only screen and (max-width: 600px) {
  .p-tabview .p-tabview-nav li .p-tabview-nav-link {
    width: 80px !important;
  }
}
</style>
