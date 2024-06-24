<template>
  <div class="rounded-xl" v-if="allCompanyData">
    <div>
      <div class="h-[11.188rem] app-bg-color-gradient rounded-xl">
        <div
          class="grid grid-cols-1 rounded-xl"
          v-if="
            allCompanyData.banner_image != null &&
            allCompanyData.banner_image != ''
          "
        >
          <img
            class="rounded-xl w-full h-[11.188rem] object-cover"
            :src="setBackgroundImage()"
          />
        </div>
        <div
          v-else
          class="flex items-center justify-center rounded-xl h-full bg-[#ffffff]"
        >
          <img
            class="rounded-xl items-center object-none"
            :src="setBackgroundImage()"
            alt=""
          />
        </div>
      </div>
      <div
        v-if="
          !(
            allCompanyData.banner_image != null &&
            allCompanyData.banner_image != ''
          )
        "
      >
        <hr class="bg-[#e4e4d6] h-[0.1px] mt-[0px] border-t-0" />
        <!-- bg-[#707070] -->
      </div>
      <!-- <hr class="bg-[#707070] h-[0.5px] mt-[0px] border-t-0" /> -->
      <div class="relative sm:h-[15.406rem] pl-5 pr-6">
        <div class="sm:mt-[-4.063rem] mt-[-2.5rem]">
          <div class="flex justify-between items-end">
            <div>
              <div v-if="allCompanyData.logo">
                <img
                  class="sm:w-[8.313rem] sm:h-[8.125rem] w-[5em] h-[5rem] rounded-[15px] bg-[#fff] object-contain app-comp-box-shadow"
                  :src="setBannerImage()"
                  alt=""
                />
              </div>
              <div v-else>
                <div
                  class="bg-[#fff] flex w-[8.313rem] h-[8.125rem] items-center justify-center object-contain rounded-[15px] app-comp-box-shadow"
                >
                  <span class="font-semibold text-lg text-[#6c757d]">{{
                    setShortFormCompany(allCompanyData.name)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-row">
              <img
                :src="getStaticImage('call-company.svg')"
                alt=""
                class="bg-white cursor-pointer flex md:h-10 h-8 md:w-10 w-8 items-center justify-center rounded-full mb-0 mt-auto"
                @click="openCall()"
              />
              <a @click="openEmailClient(allCompanyData.contacts[0].email)">
                <img
                  src="/src/assets/Email-Company.svg"
                  alt=""
                  class="bg-white cursor-pointer flex md:h-10 h-8 md:w-10 w-8 items-center justify-center rounded-full ml-3 mb-0 mt-auto"
                />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div class="">
            <div
              class="text-title font-extrabold leading-5 mt-[1rem] app-text-color-primary"
            >
              {{ allCompanyData.name }}
            </div>

            <div class="text-subtitle mt-2 overflow-hidden font-bold">
              {{ setDescriptionText(allCompanyData.short_desrciption) }}
            </div>

            <div class="text-small mt-2">
              {{ allCompanyData.location }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="relative flex lg:items-center md:items-center items-end">
      <img
        v-if="allCompanyData.banner_image"
        :src="setBackgroundImage()"
        alt=""
        class="lg:h-[15.375rem] md:h-[15.375rem] h-[10.375rem] w-full relative rounded-xl object-cover"
      />
      <img
        v-else
        :src="setBackgroundImage()"
        alt=""
        class="lg:h-[15.375rem] md:h-[15.375rem] h-[10.375rem] w-full relative rounded-xl object-fill"
      />
      <div
        v-if="allCompanyData.logo"
        class="bg-[#ffffff] lg:rounded-[1.25rem] md:rounded-[1.25rem] rounded-lg lg:ml-8 md:ml-8 ml-3 lg:mb-0 md:mb-0 mb-3 absolute lg:w-[11.25rem] md:w-[11.25rem] lg:h-[11.25rem] md:h-[11.25rem] w-[5rem] h-[5rem] flex justify-center"
      >
        <img
          :src="setBannerImage()"
          :alt="allCompanyData.name"
          class="lg:rounded-[1.25rem] md:rounded-[1.25rem] rounded-lg object-contain"
        />
      </div>
      <div
        v-else
        class="bg-[#ffffff] lg:rounded-[1.25rem] items-center md:rounded-[1.25rem] rounded-lg lg:ml-8 md:ml-8 ml-3 lg:mb-0 md:mb-0 mb-3 absolute lg:w-[11.25rem] md:w-[11.25rem] lg:h-[11.25rem] md:h-[11.25rem] w-[5rem] h-[5rem] flex justify-center"
      >
        <span class="font-semibold text-4xl app-text-color-secondary">{{
          setShortFormCompany(allCompanyData.name)
        }}</span>
      </div>
    </div> 
    <div
      class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 lg:p-5 md:p-5 p-3"
    >
      <div class="">
        <div class="">
          <h1
            class="app-text-color-secondary text-base lg:text-xl md:text-xl font-bold lg:text-xl md:text-xl leading-normal"
          >
            {{ allCompanyData.name }}
          </h1>
          <p
            class="app-text-color-secondary lg:text-base md:text-base text-sm font-medium leading-normal"
          >
            {{ allCompanyData.short_desrciption }}
          </p>
          <span v-if="allCompanyData.contacts.length != 0">
            <p
              class="app-text-color-secondary"
              v-if="allCompanyData.city && allCompanyData.country"
            >
              {{ allCompanyData.city }}, {{ allCompanyData.country }}
            </p>
            <p
              v-else
              class="app-text-color-secondary lg:text-sm md:text-sm text-xs font-medium leading-normal"
            >
              {{ allCompanyData.contacts[0].city }},
              {{ allCompanyData.contacts[0].country }}
            </p>
          </span>
        </div>
      </div>
      <div
        class="flex lg:justify-end md:justify-end justify-start lg:mt-0 md:mt-0 mt-3 flex-row lg:items-start md:items-start items-center lg:space-x-6 md:space-x-6 space-x-2"
      >
        <img
          :src="getStaticImage('call-company.svg')"
          alt=""
          class="bg-white cursor-pointer flex h-10 items-center justify-center rounded-full w-10"
          @click="openCall()"
        />
        <a @click="openEmailClient(allCompanyData.contacts[0].email)">
          <img
            src="/src/assets/Email-Company.svg"
            alt=""
            class="bg-white cursor-pointer flex h-10 items-center justify-center rounded-full w-10"
          />
        </a>
      </div>
    </div>-->
  </div>
  <!-- <hr class="border-[#414141]" /> -->
  <div
    class="company-overlay lg:overflow-auto overflow-scroll"
    :style="{ display: display }"
  >
    <div class="flex items-center justify-center items-center form-container">
      <div
        class="app-bg-color-secondary rounded-lg lg:min-w-[25rem] md:min-w-[25rem]"
      >
        <div class="flex justify-end">
          <button class="m-3" type="submit" @click="closeCall()">
            <img src="../../assets/Tags-Close.svg" alt="" />
          </button>
        </div>

        <div class="grid gap-5 px-5 pb-8" :class="contactLength()">
          <div
            v-for="(contact, index) in getContacts(allCompanyData.contacts)"
            :key="index"
            class=""
          >
            <p class="text-subtitle font-bold ml-3 mb-3">
              Contact {{ index + 1 }}
            </p>
            <div
              class="app-bg-color-gradient app-comp-box-shadow rounded-xl p-5"
            >
              <p class="text-lg font-weight-700 mb-2">
                {{ contact.name }}
              </p>
              <ul class="text-sm text-[#1c1c1c] font-light">
                <li>
                  <a :href="`tel:${setFullContactNo(contact)}`">
                    <img
                      src="../../assets/Call-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />
                    {{ setFullContactNo(contact) }}</a
                  >
                </li>
                <li>
                  <a :href="`mailto:${contact.email}`">
                    <img
                      src="../../assets/Email-AboutCompany.svg"
                      alt=""
                      class="inline-flex"
                    />
                    {{ contact.email }}</a
                  >
                </li>
                <li v-if="allCompanyData.city && allCompanyData.country">
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ allCompanyData.city }}, {{ allCompanyData.country }}
                </li>
                <li v-else>
                  <img
                    src="../../assets/Address-AboutCompany.svg"
                    alt=""
                    class="inline-flex"
                  />
                  {{ contact.city }}, {{ contact.country }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import appConstants from "../../appConstants.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import Olous_Block_img from "../../assets/Olous_Block.svg";
import { getUserNameInitials } from "../../common/js/commonFunctions.js";
import { getCurrentEncodedURL } from "../../common/js/webUrls.js";

export default {
  name: "CompanyHeader",
  components: {},
  props: {
    allCompanyData: {
      type: Object,
      default: {},
    },
    isUserLogin: Boolean,
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let isFollow = ref(false);
    let display = ref(null);
    display.value = "none";
    let contactType = appConstants.contact_type;
    // let isLoginUserCompany = ref(false);

    let getter_FollowUnfollowStatus = computed(
      () => store.getters["companyData/getter_FollowUnfollowStatus"]
    );

    let getter_UnfollowStatus = computed(
      () => store.getters["companyData/getter_UnfollowStatus"]
    );

    let getter_FollowStatus = computed(
      () => store.getters["companyData/getter_FollowStatus"]
    );
    //let getter_user = computed(() => store.getters["login/getter_user"]);

    function setBannerImage() {
      if (!props.allCompanyData.logo) {
        // let bannerImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
        //   props.allCompanyData.banner_image
        // }`;
        return Olous_Block_img;
      } else {
        // let bannerImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
        //   props.allCompanyData.logo
        // }`;
        return props.allCompanyData.logo;
      }
    }
    function setBackgroundImage() {
      if (props.allCompanyData.banner_image) {
        // let bannerImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
        //   props.allCompanyData.banner_image
        // }`;
        return props.allCompanyData.banner_image;
      } else {
        return Olous_Block_img;
      }
    }
    function clickCompany(slug) {
      if (slug != "") {
        let routeData = router.resolve({
          name: appConstants.routes.PORTFOLIO_URL,
          params: { slug: slug },
        });
        window.open(routeData.href, "_blank");
      } else {
        return "";
      }
    }
    async function clickFollow() {
      if (props.isUserLogin) {
        let data = {
          user_id: props.allCompanyData.company_user_id,
          reset_feeds: false,
        };
        await store
          .dispatch("companyData/action_getFollowStatus", data)
          .then(() => {
            isFollow.value = true;
            //console.log("Follow", isFollow.value);
          });
      } else {
        getCurrentEncodedURL();
        //router.push({ name: appConstants.routes.LOGIN });
      }
    }
    async function clickUnfollow() {
      if (props.isUserLogin) {
        await store
          .dispatch(
            "companyData/action_getUnfollowStatus",
            props.allCompanyData.company_user_id
          )
          .then(() => {
            isFollow.value = false;
            // console.log("Un Follow", isFollow.value);
          });
      } else {
        router.push({ name: appConstants.routes.LOGIN });
      }
    }
    async function checkFollowStatus() {
      if (props.isUserLogin) {
        // console.log(
        //   "in vue company web =>",
        //   props.allCompanyData.company_user_id
        // );
        if (props.allCompanyData.company_user_id) {
          await store.dispatch(
            "companyData/action_getFollowUnfollowStatus",
            props.allCompanyData.company_user_id
          );

          if (getter_FollowUnfollowStatus.value[0] == true) {
            isFollow.value = true;
          } else {
            isFollow.value = false;
          }
        }
      }

      //console.log("follow status", isFollow.value);
    }
    function setShortFormCompany(name) {
      let nameArray;
      let nameInitial;
      if (name != null) {
        nameArray = name.split(" ");
        if (nameArray.length >= 2) {
          nameInitial = getUserNameInitials(nameArray[0], nameArray[1]);
        } else {
          nameInitial =
            nameArray[0].trim().charAt(0).toUpperCase() +
            nameArray[0].trim().charAt(1).toUpperCase();
        }
      }
      return nameInitial;
    }
    function contactLength() {
      if (props.allCompanyData.contacts?.length == 1) {
        return "grid-cols-1";
      } else {
        return "lg:grid-cols-2 md:grid-cols-2 grid-cols-1";
      }
    }
    function setFullContactNo(contact) {
      let phoneNumber = "+" + contact.code + contact.phone;

      // console.log("Conatcts", phoneNumber);
      return phoneNumber;
    }
    // function checkLoginUser() {
    //   if (getter_user.value.company_id== props.allCompanyData.id) {
    //     isLoginUserCompany.value = true;
    //   }
    // }
    // function clickEditCompany() {
    //   let url = router.resolve({
    //     name: appConstants.routes.COMPANYURL,
    //   });
    //   window.open(url.href, "_blank");
    // }
    function openEmailClient(emailTo) {
      if (props.isUserLogin) {
        location.href = "mailto:" + emailTo;
      } else {
        getCurrentEncodedURL();
      }
    }
    function openCall() {
      if (props.isUserLogin) {
        display.value = "block";
      } else {
        getCurrentEncodedURL();
      }

      //return this.display;
    }
    function closeCall() {
      display.value = "none";
    }
    function getContacts(contactData) {
      let contactTypeZero = [];
      let contactTypeOne = [];
      if (contactData.length > 0) {
        for (let i = 0; i < contactData.length; i++) {
          if (contactData[i].contact_type == contactType.USER) {
            contactTypeZero.push(contactData[i]);
          } else if (contactData[i].contact_type == contactType.COMPANY) {
            contactTypeOne.push(contactData[i]);
          }
        }
      }
      if (contactTypeZero.length > 0) {
        return contactTypeZero;
      } else {
        return contactTypeOne;
      }
    }

    function setDescriptionText(description_text) {
      if (description_text.length > 60)
        description_text = description_text.substring(0, 60);
      description_text = `${description_text}...`;

      return description_text;
    }
    onMounted(() => {
      checkFollowStatus();
      //checkLoginUser();
    });
    return {
      //getter_user,
      setBannerImage,
      clickCompany,
      clickFollow,
      clickUnfollow,
      getter_FollowStatus,
      getter_FollowUnfollowStatus,
      getter_UnfollowStatus,
      checkFollowStatus,
      isFollow,
      closeCall,
      openCall,
      display,
      contactLength,
      setFullContactNo,
      setBackgroundImage,
      setShortFormCompany,
      openEmailClient,
      getContacts,
      contactType,
      setDescriptionText,
      // checkLoginUser,
      // clickEditCompany,
      // isLoginUserCompany
    };
  },
};
</script>
<style scoped>
.company-overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.71);
  z-index: 10;
}
</style>
