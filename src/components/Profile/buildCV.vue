<template>
  <div class="cls-buildcv form-container">
    <section>
      <div class="flex flex-row justify-between text-white pb-[1rem]">
        <div class="">
          <!-- <button class="btn ml-2" @click="clickbtn">Back</button> -->
        </div>
        <div class="text-white text-white-700 page-title">Build CV</div>
        <div class="">
          <!-- <button class="btn mr-2" >Preview</button> -->
        </div>
      </div>
      <!-- {{ getter_user }} -->
    </section>
    <div class="flex items-center justify-center">
      <div class="w-full">
        <!-- First Section -->
        <div
          class="border-solid bg-[#00000] border border-gray-600 rounded-2xl lg:p-7 p-3"
        >
          <div class="grid grid-cols-3 lg:items-start items-center">
            <div v-if="!getter_UserProfile.user_details[0].profile_image">
              <div
                class="rounded-full text-[#333] flex lg:w-40 lg:h-40 h-[3.75rem] w-[3.75rem] justify-center items-center relative bg-[#f2f2f2]"
              >
                <span class="lg:text-[3rem]">
                  {{ shortForm() }}
                </span>
              </div>
              <img
                src="../../assets/Edit.svg"
                alt=""
                @click="editProfile()"
                class="absolute cursor-pointer lg:max-h-9 md:max-h-9 max-h-2.5 ml-[2.5rem] mt-[-0.75rem] md:mt-[-2.5rem] md:ml-[7rem] lg:mt-[-2.5rem] lg:ml-[7rem]"
              />
            </div>
            <div v-else class="flex items-center relative">
              <div class="">
                <img
                  :src="getter_UserProfile.user_details[0].profile_image"
                  class="rounded-full lg:w-40 lg:h-40 sm:w-32 sm:h-32 h-20 w-20"
                  alt=""
                  srcset=""
                />
                <img
                  src="../../assets/Edit.svg"
                  alt=""
                  @click="editProfile()"
                  class="absolute cursor-pointer lg:max-h-9 lg:mt-[-2.5rem] lg:ml-[7rem] sm:max-h-7 sm:mt-[-2rem] sm:ml-[6rem] max-h-5 ml-[4rem] mt-[-1.5rem]"
                />
              </div>
            </div>
            <div class="capitalize lg:col-span-0 col-span-2">
              <span
                class="flex items-start text-white text-[0.875rem] font-semibold lg:text-2xl mb-4"
                >{{ getter_UserProfile.user_details[0].first_name }}
                {{ getter_UserProfile.user_details[0].last_name }}
              </span>
              <p class="lg:text-sm text-xs font-light">
                {{ getter_UserProfile.user_details[0].designation }}
              </p>
              <p class="lg:text-sm text-xs font-light mb-4">
                {{ getter_UserProfile.user_details[0].city }}
              </p>
              <p class="lg:text-sm text-xs font-light">
                {{ setUserAboutText(getter_UserProfile.user_details[0].about) }}
              </p>
            </div>
            <div class="flex justify-end">
              <!-- <button class="bg-white rounded-lg text-black p-2 text-sm">
                Preview
              </button> -->
            </div>
          </div>
        </div>
        <!-- Second Section Education Experience -->
        <div class="text-center p-4">
          <h1 class="text-white font-medium text-lg">My Journey</h1>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <button
              @click="experienceclick()"
              class="w-full justify-center p-3 border-solid hover-buildCV hover-effect border border-gray-600 rounded-lg"
            >
              <img
                class="image"
                src="../../assets/Experience.svg"
                alt=""
              /><br />
              <span class="lg:text-lg">Experience</span> <br />
              <!-- {{isInComplete(profile_completion_enum.EXPERIENCES)}} -->
              <div v-if="isUserAddedExperience()">
                <small
                  v-if="isExperienceIncomplete()"
                  class="font-light text-xs text-gray-300"
                  >Incomplete</small
                >
                <small v-else class="font-light text-xs text-gray-300"
                  >Complete</small
                >
              </div>
              <div v-else>
                <small class="font-light text-xs text-gray-300 invisible">
                  Complete
                </small>
              </div>
            </button>
          </div>
          <div>
            <button
              @click="educationclick()"
              class="w-full justify-center p-3 border-solid hover-buildCV hover-effect border border-gray-600 rounded-lg"
            >
              <img
                class="image"
                src="../../assets/Education.svg"
                alt=""
              /><br />
              <span class="lg:text-lg">Education</span><br />
              <!-- {{isInComplete(profile_completion_enum.EDUCATIONS)}} -->
              <small
                v-if="isInComplete(profile_completion_enum.EDUCATIONS)"
                class="font-light text-xs text-gray-300"
                >Incomplete</small
              >
              <small v-else class="font-light text-xs text-gray-300"
                >Complete</small
              >
            </button>
          </div>
        </div>
        <!-- Third Section Certification Achievements -->
        <div class="text-center p-4">
          <h1 class="text-white font-medium text-lg">My Accolades</h1>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <button
              @click="certificationclick()"
              class="justify-center w-full p-3 border-solid hover-buildCV hover-effect border border-gray-600 rounded-lg"
            >
              <img
                class="image"
                src="../../assets/Certification.svg"
                alt=""
              /><br />
              <span class="lg:text-lg">Certification</span><br />
              <!-- {{isInComplete(profile_completion_enum.ACCREDITIONS)}} -->
              <!-- <small
                v-if="isInComplete(profile_completion_enum.ACCREDITIONS)"
                class="font-light text-xs text-gray-300"
                >Incomplete</small
              > -->
              <small class="font-light text-xs text-gray-300 invisible"
                >Complete</small
              >
            </button>
          </div>
          <div>
            <button
              @click="achievementclick()"
              class="justify-center w-full p-3 border-solid hover-buildCV hover-effect border border-gray-600 rounded-lg"
            >
              <img
                class="image"
                src="../../assets/Achievment.svg"
                alt=""
              /><br />
              <span class="lg:text-lg">Achievements</span><br />
              <!-- {{isInComplete(profile_completion_enum.ACHIEVEMENT)}} -->
              <!-- <small
                v-if="isInComplete(profile_completion_enum.ACHIEVEMENT)"
                class="font-light text-xs text-gray-300"
                >Incomplete</small
              > -->
              <small class="font-light text-xs text-gray-300 invisible"
                >Complete</small
              >
            </button>
          </div>
        </div>

        <!-- Forth Section Keyskill Softskill Interest Other Details -->
        <div class="grid grid-rows-1">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <!-- My Ablities -->
            <div>
              <div class="text-center p-4">
                <h1 class="text-white text-lg font-medium">My Abilities</h1>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <button
                    @click="keyskillclick()"
                    class="justify-center p-3 border-solid border hover-buildCV hover-effect border-gray-600 w-full rounded-lg"
                  >
                    <img
                      class="image"
                      src="../../assets/Keyskills.svg"
                      alt=""
                    /><br />
                    <span class="lg:text-lg">Key Skills</span><br />
                    <!-- {{isInComplete(profile_completion_enum.KEYSKILL)}} -->
                    <small
                      v-if="isInComplete(profile_completion_enum.KEYSKILL)"
                      class="font-light text-xs text-gray-300"
                      >Incomplete</small
                    >
                    <small v-else class="font-light text-xs text-gray-300"
                      >Complete</small
                    >
                  </button>
                </div>
                <div>
                  <button
                    @click="softskillclick()"
                    class="justify-center p-3 border-solid border hover-buildCV hover-effect border-gray-600 w-full rounded-lg"
                  >
                    <img
                      class="image"
                      src="../../assets/SoftSkills.svg"
                      alt=""
                    /><br />
                    <span class="lg:text-lg">Soft Skills</span><br />
                    <!-- {{isInComplete(profile_completion_enum.SOFTSKILL)}} -->
                    <small
                      v-if="isInComplete(profile_completion_enum.SOFTSKILL)"
                      class="font-light text-xs text-gray-300"
                      >Incomplete</small
                    >
                    <small v-else class="font-light text-xs text-gray-300"
                      >Complete</small
                    >
                  </button>
                </div>
              </div>
            </div>
            <!-- My Preference & Others -->
            <div>
              <div class="text-center p-4">
                <h1 class="text-white text-lg font-medium">
                  My Preference & Others
                </h1>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <button
                    @click="interestclick()"
                    class="justify-center p-3 border-solid border hover-buildCV hover-effect border-gray-600 w-full rounded-lg"
                  >
                    <img
                      class="image"
                      src="../../assets/Interest.svg"
                      alt=""
                    /><br />
                    <span class="lg:text-lg">Interests</span> <br />
                    <!-- {{isInComplete(profile_completion_enum.INTERESTS)}} -->
                    <small
                      v-if="isInComplete(profile_completion_enum.INTERESTS)"
                      class="font-light text-xs text-gray-300"
                      >Incomplete</small
                    >
                    <small v-else class="font-light text-xs text-gray-300"
                      >Complete</small
                    >
                  </button>
                </div>
                <div>
                  <button
                    @click="otherdetailsclick()"
                    class="justify-center p-3 border-solid border hover-buildCV hover-effect border-gray-600 w-full rounded-lg"
                  >
                    <img
                      class="image"
                      src="../../assets/Other_Details.svg"
                      alt=""
                    /><br />
                    <span class="lg:text-lg">Other Details</span><br />

                    <small
                      v-if="isOtherDetailsIncomplete()"
                      class="font-light text-xs text-gray-300"
                      >Incomplete</small
                    >

                    <small v-else class="font-light text-xs text-gray-300"
                      >Complete</small
                    >
                  </button>
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
import appConstants from "../../appConstants.js";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "BuildCV",
  data() {
    return {
      profile_completion_enum: appConstants.profile_completion,
    };
  },
  computed: {
    ...mapGetters("login", ["getter_user"]),
    ...mapGetters("UserProfile", [
      "getter_UserProfile",
      "getter_incompleteFields",
    ]),
    ...mapMutations("UserProfile", ["commit_incompleteFields"]),
  },
  methods: {
    ...mapActions("UserProfile", ["action_getIncompleteFields"]),

    editProfile() {
      this.$router.push({ name: appConstants.routes.EDITPROFILE });
    },
    experienceclick() {
      this.$router.push({ name: appConstants.routes.EXPERIENCE });
    },
    educationclick() {
      this.$router.push({ name: appConstants.routes.EDUCATION });
    },
    certificationclick() {
      this.$router.push({ name: appConstants.routes.CERTIFICATION });
    },
    achievementclick() {
      this.$router.push({ name: appConstants.routes.ACHIEVEMENTS });
    },
    keyskillclick() {
      this.$router.push({ name: appConstants.routes.KEYSKILLS });
    },
    softskillclick() {
      this.$router.push({ name: appConstants.routes.SOFTSKILLS });
    },
    interestclick() {
      this.$router.push({ name: appConstants.routes.INTEREST });
    },
    otherdetailsclick() {
      this.$router.push({ name: appConstants.routes.OTHERDETAILS });
    },
    shortForm() {
      if (this.getter_UserProfile) {
        let initialLetters =
          this.getter_UserProfile.user_details[0].first_name
            .charAt(0)
            .toUpperCase() +
          this.getter_UserProfile.user_details[0].last_name
            .charAt(0)
            .toUpperCase();
        return initialLetters;
      }
    },
    get_incompleteFields() {
      let incompleteFields = this.getter_incompleteFields;
      //console.log(incompleteFields);
    },
    isOtherDetailsIncomplete() {
      let isCompleteOther = false;
      //let otherdetails = [12,13,14];
      let array = this.getter_incompleteFields.length;
      for (let i = 0; i < array; i++) {
        if (
          this.getter_incompleteFields[i] ==
          this.profile_completion_enum.PHONENUMBER
        ) {
          //return this.getter_interest.display_string;
          isCompleteOther = true;
        } else if (
          this.getter_incompleteFields[i] == this.profile_completion_enum.EMAIL
        ) {
          isCompleteOther = true;
        } else if (
          this.getter_incompleteFields[i] == this.profile_completion_enum.DOB
        ) {
          isCompleteOther = true;
        }
      }

      return isCompleteOther;
    },
    isExperienceIncomplete() {
      let isIncompleteExp = false;
      let array = this.getter_incompleteFields.length;
      for (let i = 0; i < array; i++) {
        if (
          this.getter_incompleteFields[i] ==
          this.profile_completion_enum.RESPONSIBILITIES
        ) {
          //return this.getter_interest.display_string;
          isIncompleteExp = true;
        } else if (
          this.getter_incompleteFields[i] ==
          this.profile_completion_enum.EXPERIENCES
        ) {
          isIncompleteExp = true;
        }
      }
      return isIncompleteExp;
    },
    isInComplete(id) {
      let isComplete = false;
      //console.log(id);
      // for (const incomplete of this.getter_incompleteFields) {
      //   if (incomplete == id ) {
      //     //return this.getter_interest.display_string;
      //     this.isComplete = true;
      //   }
      // }
      let array = this.getter_incompleteFields?.length;
      for (let i = 0; i < array; i++) {
        if (this.getter_incompleteFields[i] == id) {
          //return this.getter_interest.display_string;
          isComplete = true;
        }
      }
      if (isComplete) {
        return true;
      } else {
        return false;
      }
    },
    isUserAddedExperience() {
      if (
        this.getter_UserProfile.org_details == null ||
        this.getter_UserProfile.org_details?.length == 0
      ) {
        return false;
      }
      let filteredArray = this.getter_UserProfile.org_details.filter(function (
        data
      ) {
        return data.is_edu_detail == false;
      });

      if (filteredArray.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    setUserAboutText(about) {
      let maxLength = 100;
      let aboutText = about;
      if (aboutText.length > maxLength) {
        aboutText = aboutText.slice(0, maxLength) + "...";
      }
      return aboutText;
    },
  },
  created() {
    this.action_getIncompleteFields().then(() => {
      this.get_incompleteFields();
      // console.log(this.getter_incompleteFields);
    });
    //let incompleteFields = this.getter_incompleteFields;
  },
};
</script>

<style scoped>
.image {
  display: inline;
}
.content-div {
  padding-left: 10rem;
  padding-right: 10rem;
}

@media only screen and (max-width: 600px) {
  .btn-text {
    word-break: break-all;
  }
  .main-div {
    max-width: 1366px;
  }
  .content-div {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
