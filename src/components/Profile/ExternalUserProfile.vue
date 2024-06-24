<template>
  <div class="bg-[#fff]" v-if="isloadpage">
    <div class="cls-externaluserprofile form-container py-6">
      <div class="app-bg-color-secondary relative lg:p-0 md:p-0 p-4">
        <div
          class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:px-6 lg:py-6 md:px-6 md:py-6 sm:px-4 sm:py-4"
        >
          <div class="col-span-1">
            <div
              class="experience-flag lg:hidden md:hidden flex justify-center"
              v-if="getter_UserProfileReadOnly.user_details[0].total_exp > 0"
            >
              <!-- <span class="arrow-right"></span> -->
              <!-- <div
                class="flex justify-center w-full"
                v-if="getter_UserProfileReadOnly.user_details[0].total_exp <= 0"
              >
                <span
                  class="font-bold lg:text-[16px] md:text-[16px] text-[14px] ml-5"
                  >Fresher</span
                >
              </div> -->
              <div class="leading-4 text-center text-[#ffffff]">
                <span
                  class="font-bold lg:text-[16px] md:text-[16px] text-[14px] ml-5"
                  >{{ getter_UserProfileReadOnly.user_details[0].total_exp }}
                </span>
                <span
                  class="font-light lg:text-[14px] md:text-[14px] text-[12px]"
                >
                  Years <br />
                  Of Experience</span
                >
              </div>
            </div>
            <div class="outer-circle-border">
              <div
                class="inner-circle-img"
                v-if="getter_UserProfileReadOnly.user_details[0].profile_image"
              >
                <img
                  :src="
                    getter_UserProfileReadOnly.user_details[0].profile_image
                  "
                  :alt="getUserName(getter_UserProfileReadOnly.user_details[0])"
                  class="rounded-full lg:w-44 lg:h-44 md:w-44 md:h-44 w-32 h-32"
                />
              </div>
              <div class="inner-circle-img" v-else>
                <span class="lg:text-[3rem] text-[1.5rem]">
                  {{ shortForm() }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-span-2 lg:pt-0 md:pt-0 pt-5">
            <div class="flex flex-col">
              <span class="text-[24px] font-extrabold"
                >{{ getter_UserProfileReadOnly.user_details[0].first_name }}
                {{ getter_UserProfileReadOnly.user_details[0].last_name }}</span
              >
            </div>
            <div class="pt-2">
              <span class="font-weight-600 text-[16px] app-text-color-primary">
                {{ getter_UserProfileReadOnly.user_details[0].designation }}
              </span>
            </div>
            <div>
              <span class="text-[14px] font-light"
                >{{ getter_UserProfileReadOnly.user_details[0].city }},
                {{ getter_UserProfileReadOnly.user_details[0].country }}</span
              >
            </div>
            <div class="pt-3">
              <span class="text-[14px] font-bold">
                {{
                  setUserAboutText(
                    getter_UserProfileReadOnly.user_details[0].about
                  )
                }}
              </span>
            </div>
            <!-- <div class="pt-4">
              <span class="text-[16px] text-[#222] font-bold">
                {{
                  getIntToStringValue(
                    getter_UserProfileReadOnly.user_details[0].numberOfFollowers
                  )
                }}
                Followers |
                {{
                  getIntToStringValue(
                    getter_UserProfileReadOnly.user_details[0]
                      .numberOfFollowings
                  )
                }}
                Following
              </span>
            </div> -->
            <!-- <div class="flex justify-between pt-6">
              <button
                v-if="!isFollow && getter_isUserLoggedIn"
                class="btn bg-transparent border border-[#964B00] btn px-5 w-auto flex items-center text-base"
                @click="
                  clickFollow(getter_UserProfileReadOnly.user_details[0].id)
                "
              >
                Follow
              </button>
              <button
                v-if="isFollow && getter_isUserLoggedIn"
                class="btn bg-transparent border border-[#964B00] btn px-5 w-auto flex items-center text-base"
                @click="
                  clickUnfollow(getter_UserProfileReadOnly.user_details[0].id)
                "
              >
                Unfollow
              </button>
               <button
                class="profile-button"
                @click="
                  clickMessage(getter_UserProfileReadOnly.user_details[0].id)
                "
              >
                Message
              </button>
              <button
                class="profile-button"
                @click="
                  clickAcivities(getter_UserProfileReadOnly.user_details[0])
                "
              >
                Activities
              </button> 
            </div>-->
          </div>
          <div
            class="col-span-1 lg:block md:block hidden"
            v-if="getter_UserProfileReadOnly.user_details[0].total_exp > 0"
          >
            <div class="experience-flag justify-center">
              <!-- <span class="arrow-right"></span> -->
              <!-- <div
                class="flex justify-center w-full"
                v-if="getter_UserProfileReadOnly.user_details[0].total_exp <= 0"
              >
                <span
                  class="font-bold lg:text-[16px] md:text-[16px] text-[14px] ml-5"
                  >Fresher</span
                >
              </div> -->
              <div class="leading-4 text-center text-[#ffffff]">
                <strong class=""
                  >{{ getter_UserProfileReadOnly.user_details[0].total_exp }}
                </strong>
                <span class="font-light text-[14px]">
                  Years <br />
                  Of Experience</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre class="app-text-color-secondary">{{ itemsArray }}</pre> -->
      <div
        class="px-10 py-4 bg-white"
        :class="
          isEvenSection(itemsEnum.EDUCATION)
            ? 'app-bg-color-secondary'
            : 'bg-white'
        "
        v-if="getEduArray(getter_UserProfileReadOnly.org_details).length > 0"
      >
        <div>
          <span class="app-text-color-primary text-[20px] font-bold"
            >Education</span
          >
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 pt-5">
          <div
            class="flex space-x-3 app-border p-3 rounded-lg"
            v-for="(education, index) in getEduArray(
              getter_UserProfileReadOnly.org_details
            )"
            :key="index"
          >
            <div class="flex flex-col justify-center">
              <img
                src="../../assets/other_use_profile_edu_icon.svg"
                alt="other_use_profile_edu_icon"
              />
              <span
                class="text-[12px] font-bold text-[#222] text-center mt-1"
                >{{ setDate(education.end_date) }}</span
              >
            </div>
            <div class="border-width flex h-full mx-3"></div>
            <div class="flex flex-col flex-1 justify-between">
              <span class="text-[16px] font-bold capitalize text-[#222]"
                >{{ education.degree }} in {{ education.department }}</span
              >
              <span class="text-[14px] font-light text-[#222]">
                {{ education.organization.name }}
              </span>
              <span class="text-[14px] font-light text-[#222]">
                {{ education.address }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="px-10 py-4"
        :class="
          isEvenSection(itemsEnum.PROFESSION_SECTOR)
            ? 'app-bg-color-secondary'
            : 'bg-white'
        "
      >
        <div
          class=""
          v-if="
            getProfession(
              getter_UserProfileReadOnly.distinct_profession_with_exp_per
            ).length > 0
          "
        >
          <div>
            <span class="app-text-color-primary text-[20px] font-bold"
              >Professional Experience</span
            >
          </div>
          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 pt-4 gap-5"
          >
            <div
              class="mb-3"
              v-for="(prof, index) in getProfession(
                getter_UserProfileReadOnly.distinct_profession_with_exp_per
              )"
              :key="index"
            >
              <div
                class="app-border bg-white flex justify-between p-2 rounded-lg"
              >
                <span class="text-[14px] font-bold app-text-color-secondary">
                  {{ getSingleProfessionName(prof.id) }}
                </span>
                <span class="text-[14px] font-bold app-text-color-primary"
                  >{{ prof.value }} /{{
                    getter_UserProfileReadOnly.user_details[0].total_exp
                  }}
                  Yrs
                </span>
              </div>

              <!-- <ProgressBar
              :value="getExperiencePercentage(prof.percentage)"
              :unstyled="true"
            ></ProgressBar> -->
            </div>
          </div>
          <div
            v-if="
              getter_UserProfileReadOnly.distinct_profession_with_exp_per
                .length > 4
            "
            class="flex justify-end mt-2"
          >
            <button
              v-if="!showMoreProfessions"
              class="cursor-pointer font-bold text-sm text-[#acacac]"
              @click="showMoreProf()"
            >
              See More...
            </button>
            <button
              v-if="showMoreProfessions"
              class="cursor-pointer font-bold text-sm text-[#acacac]"
              @click="showMoreProf()"
            >
              See Less
            </button>
          </div>
        </div>
        <div
          class="mt-4"
          v-if="
            getSectors(getter_UserProfileReadOnly.distinct_sectors_with_exp_per)
              .length > 0
          "
        >
          <div>
            <span class="app-text-color-primary text-[20px] font-bold"
              >Sector Experience</span
            >
          </div>
          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 pt-4 gap-5"
          >
            <div
              class="mb-3"
              v-for="(sector, index) in getSectors(
                getter_UserProfileReadOnly.distinct_sectors_with_exp_per
              )"
              :key="index"
            >
              <div
                class="app-border bg-white flex justify-between p-2 rounded-lg"
              >
                <span class="text-[14px] font-bold app-text-color-secondary">
                  {{ getSingleSectorName(sector.id) }}
                </span>
                <span class="text-[14px] font-bold app-text-color-primary">
                  {{ sector.value }}/{{
                    getter_UserProfileReadOnly.user_details[0].total_exp
                  }}
                  Yrs
                </span>
              </div>

              <!-- <ProgressBar
              :value="sector.percentage"
              :unstyled="true"
            ></ProgressBar> -->
            </div>
          </div>
          <div
            v-if="
              getter_UserProfileReadOnly.distinct_sectors_with_exp_per.length >
              4
            "
            class="flex justify-end mt-2"
          >
            <button
              v-if="!showMoreSectors"
              class="cursor-pointer font-bold text-sm text-[#acacac]"
              @click="showMoreSect()"
            >
              See More...
            </button>
            <button
              v-if="showMoreSectors"
              class="cursor-pointer font-bold text-sm text-[#acacac]"
              @click="showMoreSect()"
            >
              See Less
            </button>
          </div>
        </div>
      </div>

      <div
        class="px-10 py-4"
        :class="
          isEvenSection(itemsEnum.SOFTWARE_PROFECIENCY)
            ? 'app-bg-color-secondary'
            : 'bg-white'
        "
        v-if="
          getter_UserProfileReadOnly.software_proficiencies
            .software_proficiencies.length > 0
        "
      >
        <div>
          <span class="app-text-color-primary text-[20px] font-bold"
            >Software Proficiency</span
          >
        </div>
        <div
          class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 pt-4"
        >
          <div
            class="flex"
            v-for="(software_proficiency, index) in getter_UserProfileReadOnly
              .software_proficiencies.software_proficiencies"
            :key="index"
          >
            <div
              class="flex space-x-3"
              v-if="software_proficiency.stars && software_proficiency.software"
            >
              <Donut :data="software_proficiency.stars" />
              <div class="text-center mt-3">
                <p class="app-text-color-secondary text-[14px] font-normal">
                  {{ software_proficiency.software }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="px-10 py-4"
        :class="
          isEvenSection(itemsEnum.EXPERIENCE)
            ? 'app-bg-color-secondary'
            : 'bg-white'
        "
        v-if="
          getCompanyDetails(getter_UserProfileReadOnly.org_details).length > 0
        "
      >
        <div>
          <span class="app-text-color-primary text-[20px] font-bold"
            >Companies Worked With</span
          >
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-4">
          <div
            class="app-border rounded-lg p-1 grid grid-cols-4 space-x-4 items-center"
            v-for="(company, index) in getCompanyDetails(
              getter_UserProfileReadOnly.org_details
            )"
            :key="index"
          >
            <div class="company-image flex justify-center items-center">
              <img src="../../assets/Company-Dummy-Icon.svg" alt="company" />
            </div>
            <div class="h-full col-span-3">
              <p class="app-text-color-secondary text-[14px] font-weight-600">
                {{ company.organization.name }}
              </p>
              <span class="app-text-color-secondary text-[12px] font-light">
                {{ company.address }}
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="
            getLengthCompanies(getter_UserProfileReadOnly.org_details).length >
            3
          "
          class="flex justify-end mt-2"
        >
          <button
            v-if="!showMoreCompanies"
            class="cursor-pointer font-bold text-sm text-[#acacac]"
            @click="showMoreCompany()"
          >
            See More...
          </button>
          <button
            v-if="showMoreCompanies"
            class="cursor-pointer font-bold text-sm text-[#acacac]"
            @click="showMoreCompany()"
          >
            See Less
          </button>
        </div>
      </div>
      <!-- <div
        class="px-10 py-4 m-2 profile-container"
        v-if="getter_UserProfileReadOnly.achievements.achievements.length > 0"
      >
        <div>
          <span class="app-text-color-primary text-[20px] font-bold">Achievements</span>
        </div>
        <div class="grid grid-cols-1 pt-4">
          <div
            class="flex flex-col items-start"
            v-for="(ach, index) in getter_UserProfileReadOnly.achievements
              .achievements"
            :key="index"
          >
            <ul class="mt-1 list-disc">
              <li class="text-[#222] text-[16px] font-medium">
                {{ ach.achievement }}
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <div
        :class="
          isEvenSection(itemsEnum.PROJECTS)
            ? 'app-bg-color-secondary'
            : 'bg-white'
        "
        class="px-10 py-4"
        v-if="getter_userProjectsDataReadOnly.length > 0"
      >
        <div>
          <span class="app-text-color-primary text-[20px] font-bold"
            >My Projects</span
          >
        </div>
        <div class="grid grid-cols-2 pt-4 gap-5">
          <div
            class="flex items-start app-border rounded-md p-3"
            v-for="(project, index) in getter_userProjectsDataReadOnly"
            :key="index"
          >
            <div class="company-image flex justify-center items-center">
              <img src="../../assets/Company-Dummy-Icon.svg" alt="company" />
            </div>
            <div class="border-width flex h-full mx-3"></div>
            <div class="flex flex-col flex-1">
              <span class="text-sm font-bold app-text-color-secondary">{{
                project.name
              }}</span>
              <span class="text-xs font-light app-text-color-secondary"
                >{{ project.city }}, {{ project.state }},
                {{ project.country }}</span
              >
              <span
                class="text-sm font-semibold app-text-color-secondary mt-4"
                >{{ project.project_organisation_name }}</span
              >
            </div>

            <!-- <div class="mt-2 w-full">
              <img
                :src="getProjectMediaImage(project.medias)"
                alt="project"
                class="w-full"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <NotFound></NotFound>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import ProgressBar from "primevue/progressbar";
import Donut from "../common/Donut.vue";
import { intToString } from "../../common/js/commonFunctions.js";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";
import NotFound from "../Layout/NotFound.vue";
import { getCurrentEncodedURL } from "../../common/js/webUrls.js";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
import moment from "moment";

export default {
  name: "ExternalUserProfile",
  components: {
    ProgressBar,
    Donut,
    NotFound,
  },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let isloadpage = ref(false);
    let isFollow = ref(false);
    let showMoreProfessions = ref(false);
    let showMoreSectors = ref(false);
    let showMoreCompanies = ref(false);
    const itemsEnum = {
      EDUCATION: 1,
      PROFESSION_SECTOR: 2,
      SOFTWARE_PROFECIENCY: 3,
      EXPERIENCE: 4,
      PROJECTS: 5,
    };
    let itemsArray = ref([]);

    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_UserProfileReadOnly = computed(
      () => store.getters["UserProfile/getter_UserProfileReadOnly"]
    );
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    let getter_FollowUnfollowStatus = computed(
      () => store.getters["UserProfile/getter_FollowUnfollowStatus"]
    );
    let getter_sector = computed(() => store.getters["dropdown/getter_sector"]);

    let getter_profession = computed(
      () => store.getters["dropdown/getter_profession"]
    );

    let getter_userProjectsDataReadOnly = computed(
      () => store.getters["UserProfile/getter_userProjectsDataReadOnly"]
    );
    await fetchUserProfile();

    //   function openFollowersList() {
    //     // let user_slug = userData.slug;
    //     if (getter_isUserLoggedIn.value == true) {
    //       router.push({
    //         name: appConstants.routes.FOLLOWERSANDFOLLOWING,
    //         params: {
    //           user_slug: route.params.user_slug,
    //           users_type: appConstants.users_type.FOLLOWERS,
    //         },
    //       });
    //     } else {
    //       getCurrentEncodedURL();
    //     }
    //     //router.push({ name: appConstants.routes.FOLLOWERSANDFOLLOWING });
    //   }
    //   function openFollowingList() {
    //     // let user_slug = userData.slug;
    //     if (getter_isUserLoggedIn.value == true) {
    //       router.push({
    //         name: appConstants.routes.FOLLOWERSANDFOLLOWING,
    //         params: {
    //           user_slug: route.params.user_slug,
    //           users_type: appConstants.users_type.FOLLOWING,
    //         },
    //       });
    //     } else {
    //       getCurrentEncodedURL();
    //     }
    //     //router.push({ name: appConstants.routes.FOLLOWERSANDFOLLOWING });
    //   }

    function setUserAboutText(about) {
      let maxLength = 100;
      let aboutText = about;
      if (aboutText.length > maxLength) {
        aboutText = aboutText.slice(0, maxLength) + "...";
      }
      return aboutText;
    }

    async function fetchUserProfile() {
      store.dispatch("dropdown/action_getProfessionDetails");
      store.dispatch("dropdown/action_getSectorDetails");
      store.dispatch("dropdown/action_getInterest");

      let userSlug = route.params.user_slug;
      if (userSlug) {
        await store
          .dispatch("UserProfile/action_getUserProfileReadOnly", userSlug)
          .then(() => {
            checkFollowStatus();
            isloadpage.value = true;
            getAvailableItemLength();
            store.dispatch(
              "UserProfile/action_getUserCompany",
              getter_UserProfileReadOnly.value.id
            );
          })
          .catch((error) => {
            if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
              user_not_found.value = true;
            }
          });
      }
    }
    function getAvailableItemLength() {
      let exp = getLengthCompanies(
        getter_UserProfileReadOnly.value.org_details
      );
      let edu = getEducationlength(
        getter_UserProfileReadOnly.value.org_details
      );
      let soft_prof =
        getter_UserProfileReadOnly.value.software_proficiencies
          .software_proficiencies;
      let projects = getter_userProjectsDataReadOnly.value;
      let index = 1;
      if (edu.length > 0) {
        let obj = {
          key: itemsEnum.EDUCATION,
          index: index,
        };
        index = index + 1;
        itemsArray.value.push(obj);
      }
      if (
        getter_UserProfileReadOnly.value.distinct_profession_with_exp_per
          .length > 0 ||
        getter_UserProfileReadOnly.value.distinct_sectors_with_exp_per > 0
      ) {
        let obj = {
          key: itemsEnum.PROFESSION_SECTOR,
          index: index,
        };
        index = index + 1;
        itemsArray.value.push(obj);
      }
      if (soft_prof.length > 0) {
        let obj = {
          key: itemsEnum.SOFTWARE_PROFECIENCY,
          index: index,
        };
        index = index + 1;
        itemsArray.value.push(obj);
      }
      if (exp.length > 0) {
        let obj = {
          key: itemsEnum.EXPERIENCE,
          index: index,
        };
        index = index + 1;
        itemsArray.value.push(obj);
      }
      if (projects.length > 0) {
        let obj = {
          key: itemsEnum.PROJECTS,
          index: index,
        };
        index = index + 1;
        itemsArray.value.push(obj);
      }
    }
    function isEvenSection(indexKey) {
      let index = 1;
      for (let i = 0; i < itemsArray.value.length; i++) {
        if (itemsArray.value[i].key == indexKey) {
          index = itemsArray.value[i].index;
          break;
        }
      }
      if (index % 2 == 0) {
        return true;
      } else {
        return false;
      }
      // return index;
    }
    function getUserName(data) {
      let name = `${data.first_name} ${data.last_name}`;
      return name;
    }
    function shortForm() {
      if (getter_UserProfileReadOnly.value) {
        let initialLetters =
          getter_UserProfileReadOnly.value.user_details[0].first_name
            .charAt(0)
            .toUpperCase() +
          getter_UserProfileReadOnly.value.user_details[0].last_name
            .charAt(0)
            .toUpperCase();
        return initialLetters;
      }
    }
    function getIntToStringValue(intValueToConvert) {
      let res = intToString(intValueToConvert);
      return res;
    }
    function getExperiencePercentage(value) {
      //let per = value;
      let res = Math.ceil(value);
      //let r = Math.ceil((per / totalExp) * 100);
      return res;
    }
    function getSingleProfessionName(id) {
      let name = "";
      getter_profession.value.map((options) => {
        if (options.id == id) {
          name = options.display_string;
        }
      });
      return name;
    }
    function getSingleSectorName(id) {
      let name = "";
      getter_sector.value.map((options) => {
        if (options.id == id) {
          name = options.display_string;
        }
      });
      return name;
    }
    function getCompanyDetails(companyArray) {
      if (companyArray == null || companyArray.length == 0) {
        return [];
      }
      let filteredArray = companyArray.filter(function (data) {
        return data.is_edu_detail == false;
      });

      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      if (showMoreCompanies.value == true) {
        return filteredArray;
      } else {
        return filteredArray.slice(0, 3);
      }
      //return filteredArray;
    }
    function showMoreCompany() {
      if (showMoreCompanies.value == false) {
        showMoreCompanies.value = true;
      } else {
        showMoreCompanies.value = false;
      }
    }
    function getLengthCompanies(array) {
      if (array == undefined) {
        return;
      }
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == false;
      });
      return eduData;
    }
    function getEducationlength(array) {
      if (array == undefined) {
        return;
      }
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == true;
      });
      return eduData;
    }
    function getEduArray(eduArray) {
      if (eduArray == null || eduArray.length == 0) {
        return [];
      }
      let filteredArray = eduArray.filter(function (data) {
        return data.is_edu_detail == true;
      });

      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      return filteredArray;
      // if (showMoreEducation.value == true) {
      //   return filteredArray;
      // } else {
      //   return filteredArray.slice(0, 4);
      // }
    }
    function setDate(date) {
      if (date) {
        let date_obj = new Date(date);
        return moment(date_obj).format("MMM YYYY");
      } else {
        return "present";
      }
    }
    function clickFollow(userId) {
      if (getter_isUserLoggedIn.value) {
        store
          .dispatch("UserProfile/action_getFollowStatus", userId)
          .then(() => {
            isFollow.value = true;
            console.log("Follow", isFollow.value);
          })
          .catch((error) => {
            cosnole.log(error.response.status);
            isFollow.value = false;
          });
      } else {
        router.push({ name: appConstants.routes.LOGIN });
      }
    }

    function clickUnfollow(userId) {
      if (getter_isUserLoggedIn.value) {
        store
          .dispatch("UserProfile/action_getUnfollowStatus", userId)
          .then(() => {
            isFollow.value = false;
          })
          .catch((error) => {
            cosnole.log(error.response.status);
            isFollow.value = true;
          });
      } else {
        router.push({ name: appConstants.routes.LOGIN });
      }
    }
    function checkFollowStatus() {
      let userId = getter_UserProfileReadOnly.value.user_details[0].id;
      if (getter_isUserLoggedIn.value) {
        store
          .dispatch("UserProfile/action_getFollowUnfollowStatus", userId)
          .then(() => {
            if (getter_FollowUnfollowStatus.value[0] == true) {
              isFollow.value = true;
            } else {
              isFollow.value = false;
            }
          })
          .catch((error) => {
            cosnole.log(error.response.status);
            isFollow.value = false;
          });
      }
    }
    function clickAcivities(userData) {
      let user_slug = userData.slug;
      if (getter_isUserLoggedIn.value == true) {
        router.push({
          name: appConstants.routes.ACTIVITY,
          params: { user_slug: user_slug },
        });
      } else {
        getCurrentEncodedURL();
      }
    }
    function clickMessage(userId) {
      if (userId) {
        store
          .dispatch("UserProfile/action_getExistingConversation", userId)
          .then((res) => {
            if (res.conversation == "") {
              router.push({
                name: appConstants.routes.NEW_CONVERSATION,
                query: {
                  slug: getter_UserProfileReadOnly.value.user_details[0].slug,
                },
              });
            } else {
              router.push({
                name: appConstants.routes.CONVERSATION,
                params: {
                  conversation_id: getUUIDtoEncodedString(res.conversation.uid),
                },
              });
            }
          });
      }
    }
    function getProfession(array) {
      if (showMoreProfessions.value == true) {
        return array;
      } else {
        return array.slice(0, 4);
      }
    }
    function showMoreProf() {
      if (showMoreProfessions.value == false) {
        showMoreProfessions.value = true;
      } else {
        showMoreProfessions.value = false;
      }
    }
    function getSectors(array) {
      if (showMoreSectors.value == true) {
        return array;
      } else {
        return array.slice(0, 4);
      }
    }
    function showMoreSect() {
      if (showMoreSectors.value == false) {
        showMoreSectors.value = true;
      } else {
        showMoreSectors.value = false;
      }
    }
    function getProjectMediaImage(media) {
      let image = `https://daifhb63cb3v5.cloudfront.net/media/projects/images/${getter_UserProfileReadOnly.value.id}/${media[0].name}`;
      console.log("media", image);
      return image;
    }
    return {
      isloadpage,
      isFollow,
      getter_UserProfile,
      getter_UserProfileReadOnly,
      getter_FollowUnfollowStatus,
      getter_isUserLoggedIn,
      getter_profession,
      getter_userProjectsDataReadOnly,
      getter_sector,
      shortForm,
      getIntToStringValue,
      getCompanyDetails,
      getEduArray,
      setDate,
      getExperiencePercentage,
      getSingleProfessionName,
      getSingleSectorName,
      getProjectMediaImage,
      clickAcivities,
      clickFollow,
      clickUnfollow,
      checkFollowStatus,
      clickMessage,
      fetchUserProfile,
      getUserName,
      setUserAboutText,
      showMoreProfessions,
      showMoreSectors,
      showMoreProf,
      itemsArray,
      itemsEnum,
      getProfession,
      getSectors,
      showMoreSect,
      showMoreCompanies,
      showMoreCompany,
      getLengthCompanies,
      getAvailableItemLength,
      isEvenSection,
    };
  },
};
</script>

<style>
/*.profile-container {
   background-color: #fff;
   border-radius: 9px; 
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}*/
.outer-circle-border {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border-width: 1px;
  border-color: rgba(34, 34, 34, 0.4);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-circle-img {
  background: #000;
  width: 176px;
  height: 176px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.experience-flag {
  width: 102px;
  height: 45px;
  background: #222;
  right: 5%;
  top: 0;
  display: flex;
  align-items: center;
  position: absolute;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.profile-button {
  display: flex;
  width: 124px;
  height: 44px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 22px;
  border: 1px solid #222;
  color: #222;
  font-size: 16px;
  font-weight: 700;
}
.profile-button:hover {
  background: #d96f20;
  border: 1px solid transparent;
}
.company-image {
  width: 74px;
  height: 74px;
  border-radius: 6px;
  /*border: 1px solid #222; */
  background: #fff;
}
.arrow-right {
  border-top: 22px solid transparent;
  border-bottom: 22px solid transparent;
  border-left: 15px solid #fcf7f1;
  position: absolute;
}
.project-image {
  width: 248px;
  height: 117px;
}
.border-width {
  border-left: 0.5px solid #000;
}
@media only screen and (max-width: 768px) {
  .outer-circle-border {
    width: 150px !important;
    height: 150px !important;
    border-radius: 50%;
    border-width: 1px;
    border-color: rgba(34, 34, 34, 0.4);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-circle-img {
    background: #000;
    width: 128px !important;
    height: 128px !important;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media only screen and (max-width: 600px) {
  .profile-button {
    display: flex;
    width: 100px;
    height: 35px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
    border-radius: 22px;
    border: 1px solid #222;
    color: #222;
    font-size: 14px;
    font-weight: 700;
  }
  .outer-circle-border {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border-width: 1px;
    border-color: rgba(34, 34, 34, 0.4);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner-circle-img {
    background: #000;
    width: 128px;
    height: 128px;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .experience-flag {
    width: 102px;
    height: 45px;
    background: #222;
    right: 5%;
    top: 0;
    display: flex;
    align-items: center;
    position: absolute;
  }
}
</style>
