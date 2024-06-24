<template>
  <div class="form-container cls-businesslist" v-if="businessData">
    <!-- <pre>{{businessData.companies[0]}}</pre> -->
    <div class="flex justify-center mb-5">
      <h1 class="page-title">Business</h1>
    </div>
    <div class="grid lg:grid-cols-4 grid-cols-1 gap-3 pb-4">
      <div class="lg:col-span-4 col-span-12">
        <div
          class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-4"
        >
          <div
            v-for="(detail, index) in businessData"
            :key="index"
            class="w-full"
          >
            <BusinessSingleview :details="detail"></BusinessSingleview>
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
import { getUserNameInitials } from "../../common/js/commonFunctions.js";
import {
  createCompanyProfileURL,
  getCurrentHostName,
} from "../../common/js/webUrls.js";
import BusinessSingleview from "./BusinessSingleview.vue";

export default {
  name: "Business",
  components: {
    VLazyImage,
    BusinessSingleview,
  },
  async setup() {
    const store = useStore();
    const router = useRouter();

    let position = ref(0);
    let isNextCall = ref(true);
    let isFetchingNewData = false;
    let businessData = computed(
      () => store.getters["business/getter_businessData"]
    );
    let userProfile = computed(() => store.getters["login/getter_user"]);
    let isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    let args = reactive({
      city: "",
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
    store.commit("business/commit_businessData", obj);
    // onBeforeMount(() => {
    //   let obj = {
    //     data: null,
    //     page: 1,
    //   };
    //   store.commit("business/commit_businessData", obj);
    //   //  getData();
    // });
    // args.city = await setCity();
    await getData();
    watchEffect(() => {
      if (position.value >= 70) {
        if (!isFetchingNewData) {
          isFetchingNewData = true;
          getData();
        }
      }
    });
    function setCity() {
      let user = userProfile.value;
      if (isUserLoggedIn) {
        let city = user.city.split(",");
        return city[0];
      } else {
        return "";
      }
    }
    async function getData() {
      // console.log("in getData()", isFetchingNewData);
      if (!isNextCall.value) {
        return;
      }
      args.offset = (args.page - 1) * args.limit;
      args.city = await setCity();
      try {
        await store
          .dispatch("business/action_getBusinessData", args)
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

    return {
      businessData,
      args,
      position,
      isFetchingNewData,
      isNextCall,
      userProfile,
      getData,
      setCity,
    };
  },
};
</script>
