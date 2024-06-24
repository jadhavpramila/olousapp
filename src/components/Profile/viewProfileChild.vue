<template>
  <div class="cls-viewProfile form-container">
    <div class="grid lg:grid-cols-4 grid-cols-1 gap-3" v-if="isloadpage">
      <div class="lg:col-span-3 col-span-1">
        <div class="bg-[#333] rounded-t-2xl px-5 pt-5 pb-5">
          <div
            class="user-profile-container items-start"
            v-for="(user_details, index) in getter_UserProfile.user_details"
            :key="index"
          >
            <div v-if="!user_details.profile_image" class="flex self-center">
              <div
                class="rounded-full text-[#333] flex lg:w-[8.125rem] lg:h-[8.125rem] w-24 h-24 justify-center items-center relative bg-[#f2f2f2] mx-auto lg:max-w-none"
              >
                <span class="lg:text-[3rem] text-[1.5rem]">
                  {{ shortForm() }}
                </span>
              </div>
            </div>
            <div v-else class="flex self-center">
              <img
                class="lg:w-[8.125rem] lg:h-[8.125rem] w-24 h-24 bg-gray-300 rounded-full mx-auto lg:max-w-none"
                :src="user_details.profile_image"
                :alt="getUserName(user_details)"
                srcset=""
              />
            </div>
            <div class="grid col-span-2">
              <div
                class="text-center lg:text-left md:text-left lg:col-span-3 md:col-span-3 col-span-12"
              >
                <p class="text-[#ffffff] text-xl mb-1">
                  {{ user_details.first_name }} {{ user_details.last_name }}
                </p>
                <p class="font-size-14 text-[#ffffff] leading-5 font-light">
                  {{ user_details.designation }}
                </p>
                <p class="font-size-14 text-[#ffffff] font-light mt-1 mb-1">
                  {{ user_details.city }}
                </p>

                <p
                  class="font-size-12 text-[#f2f2f2] leading-4 font-extralight mb-2"
                >
                  {{ setUserAboutText(user_details.about) }}
                </p>

                <p class="font-size-12 text-[#ffffff] font-extralight">
                  <span class="mr-8"
                    >{{ getIntToStringValue(user_details.numberOfFollowers) }}
                    Followers
                  </span>
                  <span class="">
                    {{ getIntToStringValue(user_details.numberOfFollowings) }}
                    Following</span
                  >
                </p>
              </div>
            </div>
            <div
              class="flex lg:flex-col md:flex-col gap-2 h-full justify-center lg:mt-0 md:mt-0 mt-3 text-center items-center"
            >
              <button
                v-if="showBuildCV"
                class="hover-buildCV hover-effect lg:w-[7.125rem] md:w-[7.125rem] w-[5rem] mr-4 rounded-lg p-2 lg:text-sm text-xs"
                @click="btnBuildCv"
              >
                Build CV
              </button>
              <Dialog
                :showHeader="false"
                :visible="isCompleteFields"
                :style="{ width: '350px' }"
                :modal="true"
                :position="position"
                :draggable="false"
              >
                <div class="form-bg-w p-6">
                  <p>
                    Your CV is not completed.Please go to "Build CV" to complete
                    it and enable sharing
                  </p>
                  <div class="flex justify-end space-x-4 mt-4">
                    <button
                      label="Ok"
                      @click="closePopup"
                      class="btn w-24"
                      autofocus
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </Dialog>
              <button
                v-if="showBuildCV"
                class="hover-buildCV hover-effect mr-4 lg:w-[7.125rem] md:w-[7.125rem] w-[6rem] rounded-lg p-2 lg:text-sm text-xs"
                @click="clickDownloadCv"
              >
                Download CV
              </button>
              <!-- <button
                @click="clickSeeProfile"
                class="bg-black rounded-lg lg:w-[7.125rem] md:w-[7.125rem] w-[6rem] text-white p-2 lg:text-sm text-xs"
                :style="{ display: display }"
                style="z-index: 3"
              >
                View Profile
              </button> -->
              <button
                v-if="!showBuildCV && !isFollow && getter_isUserLoggedIn"
                class="mr-4 hover-buildCV hover-effect rounded-lg lg:w-[7.125rem] md:w-[7.125rem] w-[5rem] p-2 lg:text-sm text-xs"
                @click="clickFollow(user_details.id)"
              >
                Follow
              </button>
              <button
                v-if="!showBuildCV && isFollow && getter_isUserLoggedIn"
                class="mr-4 hover-buildCV hover-effect rounded-lg lg:w-[7.125rem] md:w-[7.125rem] w-[5rem] p-2 lg:text-sm text-xs"
                @click="clickUnfollow(user_details.id)"
              >
                Unfollow
              </button>

              <!-- <button
                class="mr-4 hover-buildCV hover-effect rounded-lg lg:w-[7.125rem] md:w-[7.125rem] w-[5rem] p-2 lg:text-sm text-xs"
                @click="clickAcivities(user_details)"
              >
                Activities
              </button> -->
            </div>
          </div>
        </div>
        <div class="bg-[#cbcbcb] lg:px-[3.125rem] pt-6 pb-5 px-4">
          <!-- <div class="text-black">
            <p class="font-size-16 font-semibold">Analytics</p>
          </div> -->

          <div class="main-container">
            <div class="interest-container">
              <img
                :src="getStaticImage('Intrest-arrow.svg')"
                alt=""
                srcset=""
                class="interest-container-img-arrow"
              />
              <div class="text-black text-right font-size-14 font-semibold">
                Interest
              </div>
              <div class="text-right">
                <p class="text-black top-0 right-2 font-size-12">
                  {{ getInterestValues() }}
                </p>
              </div>
            </div>

            <div class="image-container">
              <img :src="getStaticImage('Pie.svg')" class="m-auto" alt="" />
              <div class="sector-container text-center">
                <img
                  :src="getStaticImage('Intrest-arrow.svg')"
                  alt=""
                  srcset=""
                  class="sector-container-img-arrow"
                />
                <div
                  class="sector-data-title text-black font-size-14 font-semibold"
                >
                  Sector
                </div>
                <div class="">
                  <p
                    class="text-black sector-data-info top-0 right-2 font-size-12 ml-1 mr-1"
                  >
                    {{ getSectorsValues() }}
                  </p>
                </div>
              </div>
            </div>

            <div class="profession-container">
              <div class="text-black font-size-14 font-semibold">
                Profession
              </div>
              <img
                :src="getStaticImage('Intrest-arrow.svg')"
                alt=""
                srcset=""
                class="profession-container-img-arrow"
              />
              <div class="">
                <p class="text-black top-0 right-2 font-size-12">
                  {{ setProfessionValues() }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#cbcbcb]" :style="{ display: display }">
          <div class="flex justify-center"></div>
        </div>
        <!-- My Professional Journy -->
        <!-- {{ getLengthExp(getter_UserProfile.org_details).length }} -->
        <div
          class="bg-[#d6d6d6] py-5 lg:px-[3.125rem] px-4"
          v-if="getLengthExp(getter_UserProfile.org_details).length > 0"
        >
          <!-- {{ getter_UserProfile.org_details.length }} -->
          <div class="text-black flex justify-between">
            <p class="font-size-16 font-semibold">My Professional Journey</p>
            <div>
              <span class="font-size-30 font-medium">
                {{ getter_UserProfile.user_details[0].total_exp }}
              </span>
              <span>Yrs</span>
            </div>
          </div>
          <div :class="setExpGrid(getter_UserProfile.org_details)">
            <div
              v-for="(org_data, index) in getExpArray(
                getter_UserProfile.org_details
              )"
              :key="index"
            >
              <!-- ************** -->
              <div class="grid education-grid mb-[1.75rem]">
                <div class="">
                  <img
                    :src="getStaticImage('Experience-hexagon.svg')"
                    alt="Snow"
                    class="object-top"
                  />
                  <div class="text-black text-xs org-start-end-date" style="">
                    {{ setDate(org_data.start_date) }} <br />
                    To <br />
                    {{ setDate(org_data.end_date) }}
                  </div>
                  <div
                    class="bg-[#d6d6d6] font-semibold w-[2rem] h-auto text-black text-xs p-1 org-exp-in-year"
                    style=""
                  >
                    {{
                      calculateExpOfOrg(org_data.start_date, org_data.end_date)
                    }}
                  </div>
                </div>
                <div class="flex items-center col-span-2 pl-5">
                  <div class="text-black mt-2">
                    <p
                      class="font-size-14 mb-1 min-h-[2.5rem] font-medium"
                      data-bs-toggle="tooltip"
                      :title="org_data.designation"
                    >
                      {{ org_data.designation }}
                    </p>
                    <div class="grid w-full whitespace-nowrap">
                      <p
                        class="text-xs truncate"
                        data-bs-toggle="tooltip"
                        :title="org_data.organization.name"
                      >
                        {{ org_data.organization.name }}
                      </p>
                      <p class="text-xs truncate">{{ org_data.address }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- *************** -->
              <!-- <div class="grid grid-cols-3">
                <div class="">
                  <div class="relative flex justify-center items-center">
                    <img
                      src="../../assets/Experience-hexagon.svg"
                      alt="Snow"
                      class="object-top w-[6rem] h-[6rem]"
                    />
                    <div
                      class="absolute text-black text-xs"
                      style="line-height: 1.2"
                    >
                      {{ setDate(org_data.start_date) }} <br />
                      To <br />
                      {{ setDate(org_data.end_date) }}
                    </div>
                    <div
                      class="bg-[#d6d6d6] font-semibold absolute ml-[6rem] w-[2rem] h-auto px-2 py-1 text-black text-xs"
                    >
                      {{ calculateExpOfOrg(org_data.start_date, org_data.end_date) }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center col-span-2 pl-5">
                  <div class="text-black">
                    <p
                      class="text-[0.875rem] mb-3 font-semibold"
                      data-bs-toggle="tooltip"
                      :title="org_data.designation"
                    >
                      {{ org_data.designation }}
                    </p>
                    <div class="grid w-full whitespace-nowrap">
                      <p
                        class="text-xs truncate"
                        data-bs-toggle="tooltip"
                        :title="org_data.organization.name"
                      >
                        {{ org_data.organization.name }}
                      </p>
                      <p class="text-xs truncate">{{ org_data.address }}</p>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div
            v-if="getLengthExp(getter_UserProfile.org_details).length > 4"
            class="flex justify-end mt-2"
          >
            <button
              v-if="!showMoreExperience"
              class="cursor-pointer text-xs text-[#333]"
              @click="showMoreExp()"
            >
              See More...
            </button>
            <button
              v-if="showMoreExperience"
              class="cursor-pointer text-xs text-[#333]"
              @click="showMoreExp()"
            >
              See Less
            </button>
          </div>
        </div>
        <!-- Cerifications section -->
        <div
          class="bg-[#e0e0e0] lg:px-[3.125rem] pt-5 pb-4 px-4"
          v-if="getter_UserProfile.accreditions.accreditions?.length > 0"
        >
          <div class="mb-1 text-black">
            <p class="font-size-16 font-semibold">Certifications</p>
          </div>

          <div
            v-if="
              getter_UserProfile.accreditions != null &&
              getter_UserProfile.accreditions.accreditions != null
            "
          >
            <div
              class=""
              v-for="(accredition, index) in getter_UserProfile.accreditions
                .accreditions"
              :key="index"
            >
              <div class="text-black pl-4">
                <ul class="list-disc">
                  <li class="mb-2 text-xs">
                    {{ accredition.month }} {{ accredition.year }} |
                    {{ accredition.accredition }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Education section -->
        <div
          class="bg-[#eaeaea] lg:px-[3.125rem] py-5 px-4"
          v-if="getLengthEdu(getter_UserProfile.org_details).length > 0"
        >
          <div class="text-black mb-1">
            <p class="font-size-16 font-semibold">Education</p>
          </div>
          <div :class="setEduGrid(getter_UserProfile.org_details)">
            <div
              v-for="(org_data, index) in getEduArray(
                getter_UserProfile.org_details
              )"
              :key="index"
            >
              <!-- <div class="grid grid-cols-3">
                <div class="">
                  <div class="relative flex justify-center items-center">
                    <img
                      src="../../assets/Education-hexagon.svg"
                      alt="Snow"
                      class="object-contain w-[6rem] h-[6rem]"
                    />
                    <div
                      class="absolute text-black text-xs"
                      style="line-height: 1.2"
                    >
                      {{ setDate(org_data.start_date) }} <br />
                      To <br />
                      {{ setDate(org_data.end_date) }}
                    </div>
                    <div
                      class="bg-[#eaeaea] font-semibold absolute ml-[6rem] w-[2rem] h-auto px-2 py-1 text-black text-xs"
                    >
                      {{ calculateExpOfOrg(org_data.start_date, org_data.end_date) }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center col-span-2 pl-5">
                  <div class="text-black">
                    <p
                      class="text-[0.875rem] mb-3 font-semibold"
                      data-bs-toggle="tooltip"
                      :title="org_data.department"
                    >
                      {{ org_data.degree }} in {{ org_data.department }}
                    </p>
                    <div class="w-full grid whitespace-nowrap">
                      <p
                        class="text-xs truncate"
                        data-bs-toggle="tooltip"
                        :title="org_data.organization.name"
                      >
                        {{ org_data.organization.name }}
                      </p>
                      <p class="text-xs truncate">{{ org_data.address }}</p>
                    </div>
                  </div>
                </div>
              </div> -->
              <!-- ************** -->
              <div class="grid education-grid mb-[1.75rem]">
                <div class="">
                  <div class="">
                    <img
                      :src="getStaticImage('Education-hexagon.svg')"
                      alt="Snow"
                      class="object-top"
                    />
                    <div class="text-black text-xs org-start-end-date" style="">
                      {{ setDate(org_data.start_date) }} <br />
                      To <br />
                      {{ setDate(org_data.end_date) }}
                    </div>
                    <div
                      class="bg-[#eaeaea] font-semibold w-[2rem] h-auto text-black text-xs p-1 org-exp-in-year"
                      style=""
                    >
                      {{
                        calculateExpOfOrg(
                          org_data.start_date,
                          org_data.end_date
                        )
                      }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center col-span-2 pl-5">
                  <div class="text-black mt-2">
                    <p
                      class="font-size-14 leading-4 mb-1 min-h-[2.5rem] font-medium"
                      data-bs-toggle="tooltip"
                      :title="org_data.department"
                    >
                      {{ org_data.degree }} in {{ org_data.department }}
                    </p>
                    <div class="grid w-full whitespace-nowrap">
                      <p
                        class="text-xs truncate"
                        data-bs-toggle="tooltip"
                        :title="org_data.organization.name"
                      >
                        {{ org_data.organization.name }}
                      </p>
                      <p class="text-xs truncate" :title="org_data.address">
                        {{ org_data.address }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- *************** -->
            </div>
          </div>
          <div
            v-if="getLengthEdu(getter_UserProfile.org_details).length > 4"
            class="flex justify-end mt-2"
          >
            <button
              v-if="!showMoreEducation"
              class="cursor-pointer text-xs text-[#333]"
              @click="showMoreEdu()"
            >
              See More...
            </button>
            <button
              v-if="showMoreEducation"
              class="cursor-pointer text-xs text-[#333]"
              @click="showMoreEdu()"
            >
              See Less
            </button>
          </div>
        </div>
        <!-- Software Proficiency section  -->
        <div
          class="bg-[#f4f4f4] lg:px-[3.125rem] py-5 px-4"
          v-if="
            getter_UserProfile.software_proficiencies.software_proficiencies
              .length > 0
          "
        >
          <div class="text-black mb-3">
            <p class="font-size-16 font-semibold">Software Proficiency</p>
          </div>
          <div
            class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <div
              class=""
              v-for="(software_proficiency, index) in getter_UserProfile
                .software_proficiencies.software_proficiencies"
              :key="index"
            >
              <div
                v-if="
                  software_proficiency.stars && software_proficiency.software
                "
              >
                <Donut :data="software_proficiency.stars" />
                <div class="text-center mt-1">
                  <p class="text-black text-xs">
                    {{ software_proficiency.software }}
                  </p>
                </div>
              </div>
              <!-- <vc-donut :sections="sections">Basic donut</vc-donut> -->
            </div>
          </div>
        </div>
        <!-- Key Techinical Skills section -->
        <div
          class="bg-[#f8f8f8] lg:px-[3.125rem] py-5 px-4"
          v-if="getter_UserProfile.key_skills.key_skills.length > 0"
        >
          <div class="text-black mb-1">
            <p class="font-size-16 font-semibold">Key Techinical Skills</p>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-1 font-size-12">
            <div
              class="pl-4"
              v-for="(key_skills, index) in getter_UserProfile.key_skills
                .key_skills"
              :key="index"
            >
              <div class="text-black">
                <ul class="list-disc">
                  <li class="text-xs">
                    {{ key_skills.skill }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="pl-4">
              <div class="text-black pl-4">
                <ul class="list-disc">
                  <li>Skill three</li>
                </ul>
                <ul class="list-disc">
                  <li>Skill four</li>
                </ul>
              </div>
            </div> -->
          </div>
        </div>
        <!-- soft skills section -->
        <div
          class="bg-[#f8f8f8] lg:px-[3.125rem] py-5 px-4"
          v-if="getter_UserProfile.soft_skills.soft_skills.length > 0"
        >
          <div class="text-black mb-1">
            <p class="font-size-16 font-semibold">Soft Skills</p>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-1 font-size-12">
            <div
              class="pl-4"
              v-for="(soft_skills, index) in getter_UserProfile.soft_skills
                .soft_skills"
              :key="index"
            >
              <div class="text-black">
                <ul class="list-disc">
                  <li>
                    {{ soft_skills.skill }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Achievements section -->
        <div
          class="bg-[#fff] lg:px-[3.125rem] py-5 px-4"
          style="
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
          "
          v-if="getter_UserProfile.achievements.achievements.length > 0"
        >
          <div class="text-black mb-1">
            <p class="font-size-16 font-semibold">Achievements</p>
          </div>
          <div
            class="font-size-12"
            v-for="(achievement, index) in getter_UserProfile.achievements
              .achievements"
            :key="index"
          >
            <div class="text-black pl-4">
              <ul class="list-disc">
                <li class="mb-2">{{ achievement.achievement }}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Is View Profile Or Not -->
        <!-- <div>
          <div
            class="bg-[#f8f8f8] lg:px-[3.125rem] py-5 px-4"
            style="
              border-bottom-left-radius: 16px;
              border-bottom-right-radius: 16px;
            "
            :style="{ display: display }"
          >
            <div class="flex justify-center items-center">
              <button
                @click="clickSeeProfile"
                class="
                  bg-black
                  rounded-lg
                  lg:w-[8rem]
                  md:w-[8rem]
                  w-8rem]
                  text-white
                  p-2
                  lg:text-sm
                  text-xs
                "
                style="z-index: 3"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="w-full">
        <h1 class="font-medium text-white mb-3 text-sm">Suggestions</h1>
        <div
          v-for="(userList, index) in getter_SuggestedUserList"
          :key="index"
          class="h-auto"
        >
          <div
            class="p-2 bg-[#2f2f2f] rounded-lg flex space-y-3 mb-2.5"
            @click="viewUserProfile(userList.slug)"
          >
            <div class="gap-1 user-list-container cursor-pointer">
              <div class="col-span-1 ">
                <div
                  v-if="!userList.profile_image"
                  class="rounded-full text-[#333] lg:w-[2rem] flex justify-center items-center lg:h-[2rem] w-8 h-8 bg-[#f2f2f2]"
                >
                  <span class="lg:text-base text-base">
                    {{ setShortFormForUserList(userList) }}
                  </span>
                </div>
                <div v-else class="flex self-center">
                  <img
                    class="lg:w-[2rem] lg:h-[2rem] w-8 h-8 bg-gray-300 rounded-full"
                    :src="userList.profile_image"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-span-3 flex flex-col justify-start items-start">
                <span class="text-xs font-medium text-white"
                  >{{ capitalize(userList.first_name) }}
                  {{ capitalize(userList.last_name) }}</span
                >
                <div class="truncate w-full">
                   <p class="text-xs font-thin text-white w-full truncate">{{
                  userList.designation
                }}</p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <span
          class="flex justify-end text-xs text-[#8d8d8d] mt-1 text-left cursor-pointer"
          @click="seeAllUserList()"
          >See All...</span
        >
        <div></div>
      </div> -->
    </div>
    <div v-else>
      <NotFound></NotFound>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import moment from "moment";
import Donut from "../common/Donut.vue";
import { intToString } from "../../common/js/commonFunctions.js";
import { decodeUUID } from "../../common/js/UUIDtoBase64.js";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useMeta } from "vue-meta";
import viewProfileSkeleton from "./viewProfileSkeleton.vue";
import { createUSerProfileURL } from "../../common/js/webUrls.js";
import NotFound from "../Layout/NotFound.vue";
import { getProfessionValues } from "../../common/js/getValuesFromIds.js";
import { createImageUrlForOgTags } from "../../common/js/getCompressedImageURL.js";
import { getCurrentEncodedURL } from "../../common/js/webUrls.js";

export default {
  name: "ViewProfileChild",
  components: {
    Donut,
    Dialog,
    Button,
    viewProfileSkeleton,
    NotFound,
  },
  async setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    let software = reactive({
      name: "AutoCad",
      score: 50,
    });
    let isloadpage = ref(false);
    let expLength = ref(false);
    let eduLength = ref(false);
    let showMoreExperience = ref(false);
    let showMoreEducation = ref(false);
    let showBuildCV = ref(false);
    let gridColumn = ref("");
    let isViewProfile = ref("");
    let display = ref("none");
    let isFollow = ref(false);
    let maxLimit = ref(20);
    let isCompleteFields = ref(false);
    let position = ref("center");
    let user_not_found = ref(false);

    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );

    let getter_incompleteFields = computed(
      () => store.getters["UserProfile/getter_incompleteFields"]
    );

    let getter_FollowUnfollowStatus = computed(
      () => store.getters["UserProfile/getter_FollowUnfollowStatus"]
    );
    let getter_UnfollowStatus = computed(
      () => store.getters["UserProfile/getter_UnfollowStatus"]
    );
    let getter_FollowStatus = computed(
      () => store.getters["UserProfile/getter_FollowStatus"]
    );
    //let getter_SuggestedUserList = computed(() => store.getters["UserProfile/getter_SuggestedUserList"]);

    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );

    let getter_sector = computed(() => store.getters["dropdown/getter_sector"]);
    let getter_profession = computed(
      () => store.getters["dropdown/getter_profession"]
    );
    let getter_interest = computed(
      () => store.getters["dropdown/getter_interest"]
    );

    let metaTitle = ref(appConstants.metaData.TITLE);
    let metaDescription = ref(appConstants.metaData.DESCRIPTION);
    let metaImage = ref(appConstants.metaData.IMAGE);
    let metaURL = ref(appConstants.metaData.URL);
    let metaImageAlt = ref(appConstants.metaData.META_IMAGE_ALT);
    let metaSiteName = ref(appConstants.metaData.SITE_NAME);
    let metaFirstName = ref("");
    let metaLastName = ref("");
    let metaKeywords = ref(appConstants.metaData.KEYWORDS);
    let metaLocality = ref("");
    let metaCountry = ref("");
    let metaRegion = ref("");

    useMeta(
      computed(() => ({
        title: metaTitle.value ?? "",
        description: metaDescription.value ?? "",
        meta: [
          { property: "keywords", content: metaKeywords.value },
          // google
          { property: "og:title", content: metaTitle.value },
          { property: "og:description", content: metaDescription.value },
          { property: "og:image", content: metaImage.value },
          { property: "og:url", content: metaURL.value },
          { property: "og:site_name", content: metaSiteName.value },
          { property: "og:type", content: "profile" },
          { property: "og:image:alt", content: metaImageAlt.value },
          { property: "profile:first_name", content: metaFirstName.value },
          { property: "profile:last_name", content: metaLastName.value },
          //  Schema.org markup for Google+
          { itemprop: "name", content: metaTitle.value },
          { itemprop: "description", content: metaDescription.value },
          { itemprop: "image", content: metaImage.value },
          //  Location
          { property: "og:locality", content: metaLocality.value },
          { property: "og:region", content: metaRegion.value },
          { property: "og:country-name", content: metaCountry.value },
        ],
      }))
    );

    watchEffect(() => {
      if (getter_UserProfile.value == "") {
        return;
      }
      // getMetaData();
    });

    onMounted(() => {
      console.log(" getter_incompleteFields", getter_incompleteFields.value);
      if (
        getter_user.value.slug == route.params.user_slug &&
        getter_isUserLoggedIn.value == true
      ) {
        store.dispatch("UserProfile/action_getIncompleteFields");
      }
    });
    await fetchUserProfile();

    function setProfessionValues() {
      if (
        getter_UserProfile.value == "" ||
        getter_UserProfile.value.user_details.length == 0
      ) {
        return "";
      }
      let professionIdList =
        getter_UserProfile.value.user_details[0].profession_cat;
      let professionValues = [];
      professionIdList.map((res) => {
        let selected = res;

        getter_profession.value.map((options) => {
          if (options.id == selected) {
            professionValues.push(options.display_string);
          }
        });
      });

      let strValue = professionValues.join(", ");
      return strValue;
    }

    function getSectorsValues() {
      if (
        getter_UserProfile.value == "" ||
        getter_UserProfile.value.user_details.length == 0
      ) {
        return "";
      }
      let sectorsIDList = getter_UserProfile.value.user_details[0].sectors;
      let sectorValues = [];
      let distinctValues = [];

      if (sectorsIDList.length > 0) {
        for (let id of sectorsIDList) {
          if (!distinctValues.includes(id)) {
            distinctValues.push(id);
          }
        }

        distinctValues.map((res) => {
          let selected = res;

          getter_sector.value.map((options) => {
            if (options.id == selected) {
              sectorValues.push(options.display_string);
            }
          });
        });
      }

      let strValue = sectorValues.join(", ");
      return strValue;
    }

    function getInterestValues() {
      if (
        getter_UserProfile.value == "" ||
        getter_UserProfile.value.user_details.length == 0
      ) {
        return "";
      }
      let InterestIDList = getter_UserProfile.value.user_details[0].interests;
      let InterestValues = [];
      InterestIDList.map((res) => {
        let selected = res;

        getter_interest.value.map((options) => {
          if (options.id == selected) {
            InterestValues.push(options.display_string);
          }
        });
      });

      let strValue = InterestValues.join(", ");
      return strValue;
    }
    // ****
    function btnBuildCv() {
      router.push({ name: appConstants.routes.PROFILENEW });
    }

    function shortForm() {
      if (getter_UserProfile.value) {
        let initialLetters =
          getter_UserProfile.value.user_details[0].first_name
            .charAt(0)
            .toUpperCase() +
          getter_UserProfile.value.user_details[0].last_name
            .charAt(0)
            .toUpperCase();
        return initialLetters;
      }
    }

    function setShortFormForUserList(userList) {
      if (userList) {
        let initialLetters =
          userList.first_name.charAt(0).toUpperCase() +
          userList.last_name.charAt(0).toUpperCase();
        return initialLetters;
      }
    }
    function getExpArray(array) {
      if (array == null || array.length == 0) {
        return [];
      }
      let filteredArray = array.filter(function (data) {
        return data.is_edu_detail == false;
      });

      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      if (showMoreExperience.value == true) {
        return filteredArray;
      } else {
        return filteredArray.slice(0, 4);
      }
    }

    function showMoreExp() {
      if (showMoreExperience.value == false) {
        showMoreExperience.value = true;
      } else {
        showMoreExperience.value = false;
      }
    }

    function showMoreEdu() {
      if (showMoreEducation.value == false) {
        showMoreEducation.value = true;
      } else {
        showMoreEducation.value = false;
      }
    }

    function getEduArray(array) {
      if (array == null || array.length == 0) {
        return [];
      }
      let filteredArray = array.filter(function (data) {
        return data.is_edu_detail == true;
      });

      filteredArray.sort((a, b) =>
        new Date(a.start_date) > new Date(b.start_date)
          ? -1
          : new Date(b.start_date) > new Date(a.start_date)
          ? 1
          : 0
      );
      if (showMoreEducation.value == true) {
        return filteredArray;
      } else {
        return filteredArray.slice(0, 4);
      }
    }

    function getLengthEdu(array) {
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == true;
      });
      return eduData;
    }

    function getLengthExp(array) {
      if (array == undefined) {
        // console.log("in if getLengthExp");
        return;
      }
      // console.log("getLengthExp");
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == false;
      });
      // console.log("eduData getLengthExp =>", eduData, eduData.length);
      return eduData;
    }

    function setDate(date) {
      if (date) {
        let date_obj = new Date(date);
        return moment(date_obj).format("MMM YYYY");
      } else {
        return "present";
      }
    }

    function getTotalExperience(array) {
      if (array == null || array.length == 0) {
        return 0;
      }
      let expInDays = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].is_edu_detail == false) {
          expInDays =
            expInDays +
            getExperienceInDays(array[i].start_date, array[i].end_date);
        }
      }

      let years = calculateExperienceInYearFromDays(expInDays);
      return years;
    }

    function setEduGrid(eduarray) {
      let eduarrayLength = getLengthEdu(eduarray);
      if (eduarrayLength.length <= 1) {
        return "grid grid-cols-1";
      } else {
        return "grid lg:grid-cols-2";
      }
    }

    function setExpGrid(exparray) {
      let exparrayLength = getLengthExp(exparray);
      if (exparrayLength.length <= 1) {
        return "grid grid-cols-1";
      } else {
        return "grid lg:grid-cols-2";
      }
    }

    function calculateExpOfOrg(sDate, eDate) {
      let dateDifference = getExperienceInDays(sDate, eDate);
      let years = calculateExperienceInYearFromDays(dateDifference);
      return years;
    }

    function calculateExperienceInYearFromDays(days) {
      if (days > 0) {
        let result = (Math.round((days / 365) * 10) / 10).toFixed(1);
        return result;
      } else {
        return 0;
      }
    }

    function getExperienceInDays(sDate, eDate) {
      let date1 = new Date();
      let date2 = new Date();

      if (Date != "") {
        date1 = new Date(sDate);
      }

      if (eDate != "") {
        date2 = new Date(eDate);
      }

      var a = moment(date1);
      var b = moment(date2);
      let dateDifference = b.diff(a, "days");

      if (dateDifference > 0) {
        return dateDifference;
      } else {
        return 0;
      }
    }

    function calculateHeight() {
      //  let professionHeight = this.$refs.infoBox.clientHeight;
    }

    function getIntToStringValue(intValueToConvert) {
      let res = intToString(intValueToConvert);
      return res;
    }
    function openFollowersList() {
      // let user_slug = userData.slug;
      if (getter_isUserLoggedIn.value == true) {
        router.push({
          name: appConstants.routes.FOLLOWERSANDFOLLOWING,
          params: {
            user_slug: route.params.user_slug,
            users_type: appConstants.users_type.FOLLOWERS,
          },
        });
      } else {
        getCurrentEncodedURL();
      }
      //router.push({ name: appConstants.routes.FOLLOWERSANDFOLLOWING });
    }
    function openFollowingList() {
      // let user_slug = userData.slug;
      if (getter_isUserLoggedIn.value == true) {
        router.push({
          name: appConstants.routes.FOLLOWERSANDFOLLOWING,
          params: {
            user_slug: route.params.user_slug,
            users_type: appConstants.users_type.FOLLOWING,
          },
        });
      } else {
        getCurrentEncodedURL();
      }
      //router.push({ name: appConstants.routes.FOLLOWERSANDFOLLOWING });
    }

    function isShowProfile() {
      if (getter_isUserLoggedIn.value == true) {
        // this.isViewProfile = "";
        display.value = "none";
      } else {
        //this.isViewProfile = "view-profile-overlay"; params:{current_route:current_route}
        display.value = "block";
      }
    }

    function clickSeeProfile() {
      router.push({ name: appConstants.routes.LOGIN });
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
        // let current_route = window.location.pathname
        // let encoded_route = btoa(current_route)
        // let decoded_route = atob(encoded_route);
        // router.push({ name: appConstants.routes.LOGINWITHPARAM, params:{current_route:encoded_route}});
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
      let userId = getter_UserProfile.value.user_details[0].id;
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

    // new

    function clickDownloadCv() {
      console.log(
        "getter_incompleteFields.value",
        getter_incompleteFields.value
      );
      if (getter_incompleteFields.value.length == 0) {
        // console.log("in if");
        store
          .dispatch("UserProfile/action_sendCvToMail")
          .then(() => {
            //if (this.getter_sendCvStatus.status == "success") {
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: "Your CV has been sent to your email ID.",
              life: 3000,
            });
            //}
            //console.log("Success");
          })
          .catch((error) => {
            cosnole.log(error.response.status);
          });
      } else {
        // console.log("in else");
        isCompleteFields.value = true;
      }
    }

    // old
    // function clickDownloadCv() {
    //   if (getter_UserProfile.value.incomplete_fields.length == 0) {
    //     store.dispatch("UserProfile/action_sendCvToMail").then(() => {
    //       //if (this.getter_sendCvStatus.status == "success") {
    //       toast.add({
    //         severity: appConstants.toast_severity.SUCCESS,
    //         summary: "Your CV has been sent to your email ID.",
    //         life: 3000,
    //       });
    //       //}
    //       //console.log("Success");
    //     });
    //   } else {
    //     isCompleteFields.value = true;
    //   }
    // }

    function closePopup() {
      isCompleteFields.value = false;
    }
    function setUserAboutText(about) {
      let maxLength = 100;
      let aboutText = about;
      if (aboutText.length > maxLength) {
        aboutText = aboutText.slice(0, maxLength) + "...";
      }
      return aboutText;
    }

    async function fetchUserProfile() {
      isShowProfile();
      await store.dispatch("dropdown/action_getProfessionDetails");
      await store.dispatch("dropdown/action_getSectorDetails");
      await store.dispatch("dropdown/action_getInterest");
      //store.dispatch("UserProfile/action_getSuggestedUserList")

      let userSlug = route.params.user_slug;
      console.log();

      if (getter_user.value.slug != userSlug) {
        showBuildCV.value = false;
      } else {
        showBuildCV.value = true;
      }

      if (userSlug) {
        console.log("userSlug", userSlug);
        await store
          .dispatch("UserProfile/action_getUserProfile", userSlug)
          .then(() => {
            console.log(
              "getter_UserProfile in vue =>",
              getter_UserProfile.value
            );
            isloadpage.value = true;
            checkFollowStatus();
            getMetaData();
          })
          .catch((error) => {
            if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
              // router.push({ name: appConstants.routes.HOME })
              user_not_found.value = true;
            }
          });
      }
    }

    function getUserName(data) {
      let name = `${data.first_name} ${data.last_name}`;
      return name;
    }

    function getMetaData() {
      let userData = getter_UserProfile.value;
      let data = userData.user_details[0];

      let name = `${data.first_name} ${data.last_name}`;

      let expDetails = [];
      let eduDetails = [];

      if (
        userData.hasOwnProperty("org_details") &&
        userData.org_details.length > 0
      ) {
        expDetails = getLengthExp(getter_UserProfile.value.org_details);
        eduDetails = getLengthEdu(getter_UserProfile.value.org_details);

        expDetails.sort((a, b) =>
          new Date(a.start_date) > new Date(b.start_date)
            ? -1
            : new Date(b.start_date) > new Date(a.start_date)
            ? 1
            : 0
        );

        eduDetails.sort((a, b) =>
          new Date(a.start_date) > new Date(b.start_date)
            ? -1
            : new Date(b.start_date) > new Date(a.start_date)
            ? 1
            : 0
        );
      }

      let hasExp = expDetails.length > 0 ? true : false;
      let hasEduDetails = eduDetails.length > 0 ? true : false;

      //get Meta Title
      let profileTitle = name;
      if (hasExp) {
        profileTitle = `${name} - ${expDetails[0].designation} at ${expDetails[0].organization.name}`;
      } else if (hasEduDetails) {
        profileTitle = `${name} - ${eduDetails[0].degree} - ${eduDetails[0].organization.name}`;
      }
      profileTitle = `${profileTitle} | Olous`;

      //get Meta Description
      let profileDescription = `View Profile of '${name}'. Connect and Network with Top Construction Professionals across the globe`;
      // if(hasExp){
      //   profileDescription = `${expDetails[0].organization.name} - ${expDetails[0].address}. ${profileDescription}`
      // }else if (hasEduDetails){
      //   profileDescription = `${eduDetails[0].organization.name} - ${eduDetails[0].address}. ${profileDescription}`
      // }

      //Meta image
      let profileImageURl = "";
      if (data.profile_image != "" && data.profile_image != null) {
        profileImageURl = createImageUrlForOgTags(data.profile_image, true);
      }

      //metaURL
      let profilemetaURL = createUSerProfileURL(
        appConstants.current_URL,
        route.params.user_slug
      );

      //getKeywords
      metaKeywords.value =
        "Architecture, Engineering, Design, BIM, Project Management, Cost Management, Electrical, Civil, Digital Architecture, Real Estate, Furniture Design, Industrial Design, Technology";
      if (hasExp) {
        metaKeywords.value =
          "BIM Coordinator, Contractor, Consultants, Project Manager, MEP, Real Estate, Architect, Interior Designer, Urban Planner, Town Planner, Urban Designer, Technician";
        //if not student
        if (
          data.profession_cat != undefined &&
          data.profession_cat != null &&
          data.profession_cat.length > 0
        ) {
          metaKeywords.value = setProfessionValues(); //getProfessionValues
        }
      }

      //get location
      let location = data.city;
      let city = "";
      let country = "";
      if (data.city != null) {
        let location = data.city.split(",");
        if (location.length == 3) {
          metaLocality.value = location[0].trim();
          metaRegion.value = location[1].trim();
          metaCountry.value = location[2].trim();
        }
      }

      metaTitle.value = profileTitle;
      metaDescription.value = profileDescription;
      metaImage.value = profileImageURl;
      metaURL.value = profilemetaURL;
      metaImageAlt.value = name;
      metaFirstName.value = data.first_name;
      metaLastName.value = data.last_name;
    }

    return {
      software,
      isloadpage,
      expLength,
      eduLength,
      showMoreExperience,
      showMoreEducation,
      showBuildCV,
      gridColumn,
      isViewProfile,
      display,
      isFollow,
      maxLimit,
      isCompleteFields,
      position,

      getter_UserProfile,
      getter_FollowUnfollowStatus,
      getter_UnfollowStatus,
      getter_FollowStatus,
      //getter_SuggestedUserList,
      getter_user,
      getter_isUserLoggedIn,
      getter_sector,
      getter_profession,
      getter_interest,

      setProfessionValues,
      getSectorsValues,
      getInterestValues,
      btnBuildCv,
      shortForm,
      setShortFormForUserList,
      getExpArray,
      showMoreExp,
      showMoreEdu,
      getEduArray,
      getLengthEdu,
      getLengthExp,
      setDate,
      getTotalExperience,
      setEduGrid,
      setExpGrid,
      calculateExpOfOrg,
      calculateExperienceInYearFromDays,
      getExperienceInDays,
      calculateHeight,
      getIntToStringValue,
      openFollowersList,
      isShowProfile,
      clickSeeProfile,
      clickAcivities,
      clickFollow,
      clickUnfollow,
      checkFollowStatus,
      //setDesignationInUserList,
      //seeAllUserList,viewUserProfile,capitalize,
      clickDownloadCv,
      closePopup,
      fetchUserProfile,
      getMetaData,
      setUserAboutText,
      getUserName,
      openFollowingList,
    };
  },
};
</script>

<style>
.centered {
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
}

.centered-left {
  position: absolute;
  top: 50%;
  left: 95%;
  transform: translate(-50%, -50%);
}

.container {
  position: relative;
  color: white;
}

/* .view-profile-overlay{
 filter: blur(3.2px);
  display: block;
  background-color: transparent;
  z-index: 2;
  cursor: pointer; 
   -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
} */
</style>
