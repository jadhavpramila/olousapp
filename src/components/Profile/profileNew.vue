<template>
  <div class="w-full bg-white form-container cls-profilenew">
    <!-- desKTOPcreen -->
    <div class="gap-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 py-4">
      <div class="w-full lg:order-first md:order-first order-last">
        <span class="hello-text md:text-[16px] sm:text-[16x] font-bold">
          Hello World!..
        </span>
        <div
          class="text-left mt-5 text-[25px] text-[#03014c] font-bold"
          style="line-height: initial"
        >
          I' am
          <span class="app-text-color-primary"
            >{{ getter_UserProfile.user_details[0].first_name }}
            {{ getter_UserProfile.user_details[0].last_name }},</span
          >
          <br />
          <!-- an -->
          <span
            >{{ getter_UserProfile.user_details[0].designation }} <br /><span>{{
              getter_UserProfile.user_details[0].city
            }}</span>
          </span>
        </div>
        <div class="mt-5">
          <span class="text-left text-[20px] text-[#03014c] capitalize">
            {{ setUserAboutText(getter_UserProfile.user_details[0].about) }}
          </span>
        </div>

        <!-- <div class="flex flex-row pb-7 mt-14 space-x-10">
          <div class="">
            <span class="text-left text-[#03014c] text-[16px] font-bold">
              {{
                setUserAboutText(
                  getter_UserProfile.user_details[0].numberOfFollowers
                )
              }}
              &nbsp; Followers
            </span>
          </div>
          <div class="ml-8">
            <p class="text-left text-[#03014c] text-[16px] font-bold">
              {{
                setUserAboutText(
                  getter_UserProfile.user_details[0].numberOfFollowings
                )
              }}
              &nbsp; Following
            </p>
          </div>
        </div> -->
        <div class="flex mt-14 flex-row space-x-5">
          <!-- <div class="">
            <button
              class="flex justify-center px-5 py-2 border-solid hover:text-[#fff] border hover:bg-[#d96f20] text-[#7b7b7b] border-[#000] hover:border-[#d96f20] rounded-full font-bold"
            >
              <span
                class="lg:text-[14px] md:text-[14px] text-[14px]"
                @click="clickAcivities(getter_UserProfile.user_details[0])"
                >My Activities</span
              >
            </button>
          </div> -->
          <div class="flex space-x-4 lg:w-2/6 md:w-full w-full">
            <!-- <button class="btn px-8" @click="clickDownloadCv()">
              <span class="lg:text-[16px] md:text-[16px] text-[14px]"
                >Download CV</span
              >
            </button> -->
            <button class="btn px-8" @click="editProfile()">
              <span class="lg:text-[16px] md:text-[16px] text-[14px]"
                >Edit Profile</span
              >
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-full flex lg:justify-end md:justify-end justify-center lg:order-last md:order-last order-first"
      >
        <div
          v-if="getter_UserProfile.user_details[0].profile_image"
          class="lg:mr-10 md:mr-10 mr-0"
        >
          <div class="relative">
            <img
              :src="getter_UserProfile.user_details[0].profile_image"
              class="rounded-full object-cover flex md:w-60 md:h-60 lg:w-72 lg:h-72 h-[8.75rem] w-[8.75rem] justify-center items-center bg-[#f2f2f2]"
              alt=""
              srcset=""
            />
            <!-- <div class="absolute cursor-pointer posi">
              <img
                :src="getStaticImage('editProfile.svg')"
                alt="edit"
                @click="editProfile()"
                class="lg:w-11 md:w-11 w-8"
              />
            </div> -->
          </div>
        </div>
        <div v-if="!getter_UserProfile.user_details[0].profile_image">
          <div class="relative">
            <div
              class="rounded-full text-[#000] flex md:w-60 md:h-60 lg:w-72 lg:h-72 h-[5.75rem] w-[5.75rem] justify-center items-center app-bg-color-secondary"
            >
              <span class="lg:text-[3rem]">
                {{ shortForm() }}
              </span>
            </div>
            <!-- <div class="absolute cursor-pointer posiNoImg">
              <img
                :src="getStaticImage('editProfile.svg')"
                alt="edit"
                @click="editProfile()"
                class="md:w-12"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div id="largeScreen" class="lg:block md:block hidden">
      <div class="bg-[#f2fafa] p-5">
        <div class="flex pb-8 items-center justify-between">
          <span class="text-[#03014c] text-[18px] font-bold w-full">
            Infographic CV Progress
          </span>
          <!-- <button
            @click="clickPreviewCV()"
            class="btn lg:w-1/6 md:2/5 w-1/2 lg:text-[16px] md:text-[16px] text-[14px]"
          >
            Preview Profile
          </button> -->
        </div>
        <div class="infografic-cv-main w-full pb-2 justify-between">
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isExperienceIncomplete()"
            >
              <img
                :src="getStaticImage('experience_red.svg')"
                alt="edit"
                @click="handleClickExperience"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('experience_green.svg')"
                alt="edit"
                @click="handleClickExperience"
                class="cursor-pointer"
              />
            </div>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.accreditions.accreditions.length == 0"
            >
              <img
                :src="getStaticImage('Certificates_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleCertificates"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="isInComplete(profile_completion_enum.ACCREDITIONS)"
              >
                <img
                  :src="getStaticImage('certificates_red.svg')"
                  alt="edit"
                  class="cursor-pointer"
                  @click="handleCertificates"
                />
              </div>
              <div v-else>
                <img
                  :src="getStaticImage('certificates_green.svg')"
                  alt="edit"
                  class="cursor-pointer"
                  @click="handleCertificates"
                />
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.EDUCATIONS)"
            >
              <img
                :src="getStaticImage('education_red.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleEducation"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('education_green.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleEducation"
              />
            </div>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.software_details.length == 0"
            >
              <img
                :src="getStaticImage('Software_Proficiency_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleSoftwareProf"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="
                  isInComplete(profile_completion_enum.SOFTWARE_PROFICIENCIES)
                "
              >
                <img
                  :src="getStaticImage('software_red.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
              <div class="flex flex-col items-center" v-else>
                <img
                  :src="getStaticImage('software_green.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <!-- <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.KEYSKILL)"
            >
              <img
                :src="getStaticImage('technicalSkillsNew_red.svg')"
                alt="edit"
                @click="handleTechnicalSkills"
                class="cursor-pointer"
              />
            </div>
            <div class="flex flex-col items-center" v-else>
              <img
                :src="getStaticImage('technicalSkillsNew_green.svg')"
                alt="edit"
                @click="handleTechnicalSkills"
                class="cursor-pointer"
              />
            </div>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.SOFTSKILL)"
            >
              <img
                :src="getStaticImage('softskills_red.svg')"
                alt="edit"
                @click="handleSoftskills"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('softskills_green.svg')"
                alt="edit"
                @click="handleSoftskills"
                class="cursor-pointer"
              />
            </div>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.achievements.achievements.length == 0"
            >
              <img
                :src="getStaticImage('achievements_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleAchievement"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="isInComplete(profile_completion_enum.ACHIEVEMENT)"
              >
                <img
                  :src="getStaticImage('achievements_red.svg')"
                  alt="edit"
                  @click="handleAchievement"
                  class="cursor-pointer"
                />
              </div>
              <div v-else>
                <img
                  :src="getStaticImage('achievments_green.svg')"
                  alt="edit"
                  @click="handleAchievement"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div> -->
          <!-- <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.INTERESTS)"
            >
              <img
                :src="getStaticImage('interest_red.svg')"
                alt="edit"
                @click="handleInterest"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('interests_green.svg')"
                alt="edit"
                @click="handleInterest"
                class="cursor-pointer"
              />
            </div>
          </div> -->
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.LANGUAGE)"
            >
              <img
                :src="getStaticImage('language_red.svg')"
                alt="edit"
                @click="handleLanguage"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('language_green.svg')"
                alt="edit"
                @click="handleLanguage"
                class="cursor-pointer"
              />
            </div>
          </div>
          <div class="flex items-center justify-center infographic-line-dot">
            <hr class="infographic-line relative w-full" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width">
            <div class="flex flex-col items-center">
              <div
                class="flex flex-col items-center"
                v-if="isOtherDetailsIncomplete()"
              >
                <img
                  :src="getStaticImage('other_red.svg')"
                  alt="edit"
                  @click="handleOther"
                  class="cursor-pointer"
                />
              </div>
              <div v-else>
                <img
                  :src="getStaticImage('other_green.svg')"
                  alt="edit"
                  @click="handleOther"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="infografic-cv-main w-full justify-between">
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center"
              >Experience</span
            >
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center"
              >Certificates</span
            >
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center"
              >Education</span
            >
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center"
              >Software Proficiency</span
            >
          </div>
          <div class="flex items-center justify-center infographic-line-dot">
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm text-black text-center">Languages</span>
          </div>
          <div class="flex items-center justify-center infographic-line-dot">
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm text-black text-center">Other Details</span>
          </div>
          <!-- <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center">Technical Skills</span>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center">Soft Skills</span>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div>
          <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center">Achievements</span>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div> -->
          <!-- <div class="infographic-img-width flex justify-center">
            <span class="text-sm app-text-color-secondary text-center">Interests</span>
          </div>
          <div
            class="flex items-center justify-center infographic-line-dot w-full"
          >
            <hr class="" />
          </div> -->
        </div>
        <div class="flex justify-end space-x-5">
          <div
            class="py-2 flex app-text-color-secondary text-sm font-bold justify-end"
          >
            <img
              class="mr-1"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/green_dot.svg"
              alt=""
              width="15px"
            />
            <span class="ipadPdding">Completed </span>
          </div>
          <div
            class="py-2 flex app-text-color-secondary text-sm font-bold justify-end"
          >
            <img
              class="mr-1"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/Red_dot.svg"
              alt=""
              width="15px"
            />
            <span>Incomplete </span>
          </div>
          <div
            class="py-2 flex app-text-color-secondary text-sm font-bold justify-end"
          >
            <img
              class="mr-1"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
              alt=""
              width="15px"
            />
            <span>Optional </span>
          </div>
        </div>
      </div>
    </div>
    <!-- mobile screen -->
    <div id="mobileScreen" class="lg:hidden md:hidden block">
      <div class="bg-[#f2fafa] p-3">
        <div class="flex pb-4 justify-between items-center">
          <span class="text-[#03014c] text-[22px] font-bold">
            Infographic CV Progress
          </span>
          <!-- <button
            @click="clickPreviewCV()"
            class="btn w-1/2 lg:text-[16px] md:text-[16px] text-[14px]"
          >
            Preview Profile
          </button> -->
        </div>
        <div class="infografic-cv-main-mobile w-full justify-between">
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isExperienceIncomplete()"
            >
              <img
                :src="getStaticImage('experience_red.svg')"
                alt="edit"
                @click="handleClickExperience"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('experience_green.svg')"
                alt="edit"
                @click="handleClickExperience"
                class="cursor-pointer"
              />
            </div>
            <!-- <span class="text-xs ml-1.5 app-text-color-secondary text-center"
              >Experience</span
            > -->
          </div>
          <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.accreditions.accreditions.length == 0"
            >
              <img
                :src="getStaticImage('Certificates_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleCertificates"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="isInComplete(profile_completion_enum.ACCREDITIONS)"
              >
                <img
                  :src="getStaticImage('certificates_red.svg')"
                  alt="edit"
                  class="cursor-pointer"
                  @click="handleCertificates"
                />
              </div>
              <div v-else>
                <img
                  :src="getStaticImage('certificates_green.svg')"
                  alt="edit"
                  class="cursor-pointer"
                  @click="handleCertificates"
                />
              </div>
            </div>
            <!-- <span class="text-xs ml-1.5 app-text-color-secondary text-center"
              >Certificates</span
            > -->
          </div>
          <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.EDUCATIONS)"
            >
              <img
                :src="getStaticImage('education_red.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleEducation"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('education_green.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleEducation"
              />
            </div>
            <!-- <span class="text-xs ml-1.5 app-text-color-secondary text-center">Education</span> -->
          </div>
          <!-- <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.software_details.length == 0"
            >
              <img
                :src="getStaticImage('Software_Proficiency_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleSoftwareProf"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="
                  isInComplete(profile_completion_enum.SOFTWARE_PROFICIENCIES)
                "
              >
                <img
                  :src="getStaticImage('software_red.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
              <div class="flex flex-col items-center" v-else>
                <img
                  :src="getStaticImage('software_green.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div>-->
          <!-- <div class="flex justify-center infographic-line-dot w-full">
            >
          </div>  -->
          <!-- <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.KEYSKILL)"
            >
              <img
                :src="getStaticImage('technicalSkillsNew_red.svg')"
                alt="edit"
                @click="handleTechnicalSkills"
                class="cursor-pointer"
              />
            </div>
            <div class="flex flex-col items-center" v-else>
              <img
                :src="getStaticImage('technicalSkillsNew_green.svg')"
                alt="edit"
                @click="handleTechnicalSkills"
                class="cursor-pointer"
              />
            </div>
          </div> -->
        </div>
        <div class="infografic-cv-main-mobile w-full justify-between">
          <!-- <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.SOFTSKILL)"
            >
              <img
                :src="getStaticImage('softskills_red.svg')"
                alt="edit"
                @click="handleSoftskills"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('softskills_green.svg')"
                alt="edit"
                @click="handleSoftskills"
                class="cursor-pointer"
              />
            </div>
            <span class="text-xs ml-1.5 app-text-color-secondary text-center"
              >Soft Skills</span
            > -->
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="getter_UserProfile.software_details.length == 0"
            >
              <img
                :src="getStaticImage('Software_Proficiency_black.svg')"
                alt="edit"
                class="cursor-pointer"
                @click="handleSoftwareProf"
              />
            </div>
            <div v-else>
              <div
                class="flex flex-col items-center"
                v-if="
                  isInComplete(profile_completion_enum.SOFTWARE_PROFICIENCIES)
                "
              >
                <img
                  :src="getStaticImage('software_red.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
              <div class="flex flex-col items-center" v-else>
                <img
                  :src="getStaticImage('software_green.svg')"
                  alt="edit"
                  @click="handleSoftwareProf"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.LANGUAGE)"
            >
              <img
                :src="getStaticImage('language_red.svg')"
                alt="edit"
                @click="handleLanguage"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('language_green.svg')"
                alt="edit"
                @click="handleLanguage"
                class="cursor-pointer"
              />
            </div>
            <!-- <span class="text-xs ml-1.5 app-text-color-secondary text-center">Languages</span> -->
          </div>
          <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line relative w-full" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div>
          <div class="infographic-img-width-mobile">
            <div class="flex flex-col items-center">
              <div
                class="flex flex-col items-center"
                v-if="isOtherDetailsIncomplete()"
              >
                <img
                  :src="getStaticImage('other_red.svg')"
                  alt="edit"
                  @click="handleOther"
                  class="cursor-pointer"
                />
              </div>
              <div v-else>
                <img
                  :src="getStaticImage('other_green.svg')"
                  alt="edit"
                  @click="handleOther"
                  class="cursor-pointer"
                />
              </div>
              <!-- <span class="text-xs ml-1.5 app-text-color-secondary text-center"
                >Other Details</span
              > -->
            </div>
          </div>
        </div>
        <!-- <div class="flex justify-center infographic-line-dot w-full">
          <hr class="infographic-line w-full relative" />
          <img
            :src="getStaticImage('black_dot.svg')"
            alt=""
            class="md:w-2.5 absolute"
          />
        </div> -->
        <!-- <div class="infographic-img-width-mobile">
          <div
            class="flex flex-col items-center"
            v-if="getter_UserProfile.achievements.achievements.length == 0"
          >
            <img
              :src="getStaticImage('achievements_black.svg')"
              alt="edit"
              class="cursor-pointer"
              @click="handleAchievement"
            />
          </div>
          <div v-else>
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.ACHIEVEMENT)"
            >
              <img
                :src="getStaticImage('achievements_red.svg')"
                alt="edit"
                @click="handleAchievement"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('achievments_green.svg')"
                alt="edit"
                @click="handleAchievement"
                class="cursor-pointer"
              />
            </div>
          </div>
        </div> -->
        <!-- <div class="flex justify-center infographic-line-dot w-full">
          <hr class="infographic-line w-full relative" />
          <img
            :src="getStaticImage('black_dot.svg')"
            alt=""
            class="md:w-2.5 absolute"
          />
        </div> -->
        <!-- <div class="infographic-img-width-mobile">
            <div
              class="flex flex-col items-center"
              v-if="isInComplete(profile_completion_enum.INTERESTS)"
            >
              <img
                :src="getStaticImage('interest_red.svg')"
                alt="edit"
                @click="handleInterest"
                class="cursor-pointer"
              />
            </div>
            <div v-else>
              <img
                :src="getStaticImage('interests_green.svg')"
                alt="edit"
                @click="handleInterest"
                class="cursor-pointer"
              />
            </div>
            <span class="text-xs ml-1.5 app-text-color-secondary text-center">Interests</span>
          </div>
          <div class="flex justify-center infographic-line-dot w-full">
            <hr class="infographic-line w-full relative" />
            <img
              :src="getStaticImage('black_dot.svg')"
              alt=""
              class="md:w-2.5 absolute"
            />
          </div> -->
      </div>
    </div>
  </div>
  <!-- end of mobile divvvvvvvvvvvvvvvvvvvvvv -->
  <div
    class="flex lg:justify-end md:justify-end h-[4rem] items-center brNew py-4 md:py-0"
  >
    <div class="">
      <p
        class="app-text-color-secondary font-bold text-left md:text-right visibleMd lg:block md:block hidden"
      >
        <span class="mr-2 text-sm">
          Having Trouble Completing Your Profile ? Let Us Know we will help
          you</span
        >
      </p>
      <div
        class="app-text-color-secondary text-left hideMd lg:hidden md:hidden block"
      >
        <p class="mr-2 text-xs font-bold">
          Having Trouble Completing Your Profile ?
        </p>
        <p class="mr-2 text-xs font-bold">Let Us Know we will help you</p>
      </div>
    </div>
    <div class="w-[8.695rem]">
      <button
        class="btn lg:text-[16px] md:text-[16px] text-[14px]"
        @click="openContactUs()"
      >
        Contact Us
      </button>
    </div>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mt-2 md:mt-0"
  >
    <div class="flex justify-between">
      <div class="py-7">
        <h2 class="text-[#03014c] text-left text-[18px] font-bold">
          My Professional Journey
        </h2>
      </div>
      <div
        class="py-7"
        v-if="
          getter_oneUserData?.total_exp != 0 &&
          getter_oneUserData?.total_exp != undefined
        "
      >
        <h2 class="text-[#03014c] text-left text-[18px] font-bold mr-2">
          {{ getter_oneUserData?.total_exp }} Yrs
        </h2>
      </div>
      <!-- <div
          class="py-7"
          v-if="
            getter_oneUserData?.total_exp == 0 ||
            getter_oneUserData?.total_exp == undefined
          "
        >
          <h2 class="text-[#03014c] text-left text-[18px] font-bold mr-2">
            Fresher
          </h2>
        </div> -->
    </div>
  </div>
  <div ref="targetRef" id="experience">
    <div class="lg:p-7 md:p-7 p-3 app-bg-color-secondary mb-5 rounded-xl">
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div v-if="isExperienceIncomplete()">
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('experience_red1.svg')"
              alt="exp"
            />
          </div>
          <div v-else>
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('experience_green1.svg')"
              alt="exp"
            />
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left font-bold text-[16px]"
              >Experience</span
            ><br />
            <span
              class="text-[#fe0000] text-left text-[14px]"
              v-if="
                isExperienceIncomplete() &&
                getLengthExp(getter_UserProfile.org_details).length <= 0
              "
              >Please add your Experience
            </span>
            <span v-else class="text-[#696969] text-left text-[14px]">
              Please add your Experience</span
            >
          </p>
        </div>
        <div class="col-span-1 flex justify-end items-start">
          <button>
            <img
              class="w-6 md:w-7"
              @click="addExperienceclick()"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
          </button>
        </div>
      </div>

      <div
        class=""
        v-if="getLengthExp(getter_UserProfile.org_details).length > 0"
      >
        <div
          class="rounded-[20px] bg-[#fff] app-text-color-secondary p-4 mt-7"
          v-for="(org_data, index) in getExpArray(
            getter_UserProfile.org_details
          )"
          :key="index"
        >
          <div class="borderBottom">
            <div class="flex">
              <div class="pb-4">
                <div class="relative flex justify-center items-center">
                  <img
                    :src="getStaticImage('profile_hexagon.svg')"
                    alt="Snow"
                    class="object-top hexagon-size"
                  />
                  <div
                    class="absolute left-6 right-0 md:text-sm text-[11px] flex flex-col"
                  >
                    <span class=""> {{ setDate(org_data.start_date) }}</span>
                    <span class="leading-3">To</span>
                    <span> {{ setDate(org_data.end_date) }} </span>
                  </div>
                  <div class="positionCls">
                    <span class="text-[11px] md:text-sm font-bold">
                      {{
                        calculateExpOfOrg(
                          org_data.start_date,
                          org_data.end_date
                        )
                      }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="lg:pl-4 md:pl-4 pl-2 flex-auto flex flex-col justify-start"
              >
                <p
                  class="app-text-color-secondary md:text-[16px] text-sm text-left font-bold"
                >
                  {{ upperCase(org_data.designation) }}
                </p>
                <p class="app-text-color-secondary md:text-sm text-xs">
                  {{ upperCase(org_data.organization.name) }}
                </p>
                <p class="app-text-color-secondary text-xs md:text-sm">
                  {{ org_data.address }}
                </p>
              </div>
              <div class="text-right flex justify-center align-center">
                <div>
                  <button>
                    <img
                      :src="getStaticImage('Edit+_1.svg')"
                      alt="edit"
                      class="w-5 h-8 cursor-pointer"
                      @click="editExperience(org_data.id)"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="borderBottom py-0">
            <div class="">
              <div class="">
                <h4
                  class="app-text-color-secondary md:text-base text-sm font-bold"
                >
                  Profession
                </h4>
                <span
                  class="text-[#fe0000] text-left text-[14px]"
                  v-if="org_data.profession_cat.length <= 0"
                  >Please add your profession
                </span>
              </div>
              <div class="flex space-x-6">
                <p
                  class="flex"
                  v-for="(data, index) in setProfessionValues(
                    org_data.profession_cat
                  )"
                  :key="index"
                >
                  <img
                    src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                    alt=""
                    class="mr-2 w-1.5"
                  /><span class="text-sm"> {{ data }}</span>
                </p>
              </div>
            </div>
            <div class="pt-1">
              <div class="">
                <h4
                  class="app-text-color-secondary md:text-base text-sm font-bold"
                >
                  Sector
                </h4>
                <span
                  class="text-[#fe0000] text-left text-[14px]"
                  v-if="org_data.sectors.length <= 0"
                  >Please add your sectors
                </span>
              </div>
              <div class="flex space-x-6">
                <p
                  class="flex"
                  v-for="(data, index) in getSectorsValues(org_data.sectors)"
                  :key="index"
                >
                  <img
                    src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                    alt=""
                    class="mr-2 w-1.5"
                  /><span class="text-sm">{{ data }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="grid grid-cols-3 pt-4">
            <div class="col-span-2">
              <h4
                class="app-text-color-secondary md:text-base text-sm font-bold"
              >
                Roles/Responsibilities
              </h4>
              <div v-if="org_data.responsibilities.length == 0">
                <p class="text-sm text-[#fe0000]">
                  Please add your responsibilities
                </p>
              </div>
            </div>
            <div class="col-span-1 flex justify-end items-start">
              <button class="" v-if="org_data.responsibilities.length == 0">
                <img
                  class="md:w-7 w-6"
                  src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
                  @click="addResponsibility(org_data.id)"
                  alt=""
                />
              </button>
              <button v-else>
                <img
                  :src="getStaticImage('Edit+_1.svg')"
                  alt="edit"
                  class="w-9 md:w-5 md:h-8 h-12 cursor-pointer"
                  @click="addResponsibility(org_data.id)"
                />
              </button>
            </div>
            <div
              class="col-span-3 mt-3"
              v-if="org_data.responsibilities?.length > 0"
            >
              <div
                v-for="(res, index) in org_data.responsibilities"
                :key="index"
              >
                <div class="flex flex-row text-sm">
                  <img
                    src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                    alt=""
                    class="mr-2 w-1.5"
                  />
                  {{ res }}
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div
          v-if="getLengthExp(getter_UserProfile.org_details).length > 1"
          class="pt-5"
        >
          <div
            v-if="!showExperience"
            class="grid pl-10 pr-10 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 text-center"
          >
            <p
              class="app-text-color-secondary text-sm font-bold cursor-pointer"
              @click="seeAll()"
            >
              See All
            </p>
          </div>

          <div
            v-if="showExperience"
            class="grid pl-10 pr-10 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 text-center"
          >
            <p
              class="app-text-color-secondary text-sm font-bold cursor-pointer"
              @click="seeAll()"
            >
              See Less
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- START CERTIFICATES -->
  <div ref="targetRef1" id="certificates">
    <div class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl">
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div
            class="flex flex-col"
            v-if="getter_UserProfile.accreditions.accreditions.length == 0"
          >
            <img
              :src="getStaticImage('certificates_black1.svg')"
              alt="edit"
              class="cursor-pointer w-8 md:w-10 md:h-11"
              @click="handleCertificates"
            />
          </div>
          <div v-else>
            <div
              class="flex flex-col"
              v-if="isInComplete(profile_completion_enum.ACCREDITIONS)"
            >
              <img
                :src="getStaticImage('certificates_red1.svg')"
                alt="edit"
                class="cursor-pointer w-8 md:w-10 md:h-11"
                @click="handleCertificates"
              />
            </div>
            <div v-else class="flex flex-col">
              <img
                :src="getStaticImage('certificates_green1.svg')"
                alt="edit"
                class="cursor-pointer w-8 md:w-10 md:h-11"
                @click="handleCertificates"
              />
            </div>
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left text-[16px] font-bold"
              >Certificates</span
            ><br />
            <span class="text-[#696969] text-left text-[14px]">
              Please add your certifications</span
            >
          </p>
        </div>
        <div class="col-span-1 items-start flex justify-end">
          <button>
            <img
              class="w-6 md:w-7"
              @click="AddCertificationclick()"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
          </button>
        </div>
      </div>
      <div
        class="pt-7"
        v-if="getter_UserProfile.accreditions.accreditions.length > 0"
      >
        <div class="bg-[#fff] p-4 rounded-[20px]">
          <div class="grid lg:grid-cols-1 grid-cols-1 gap-1 font-size-12">
            <div
              class="pl-1"
              v-for="(acc, index) in getter_UserProfile.accreditions
                .accreditions"
              :key="index"
            >
              <div class="app-text-color-secondary">
                <ul class="list-disc flex justify-between pl-4">
                  <li class="text-lg">
                    <span class="pl-2 text-[16px] font-bold"
                      >{{ acc.month }} {{ acc.year }} |
                      {{ acc.accredition }}</span
                    >
                  </li>
                  <img
                    :src="getStaticImage('Edit+_1.svg')"
                    alt="edit"
                    class="w-5 h-8 cursor-pointer place-content-start"
                    @click="editCertifications(index)"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END CERTIFICATES -->
  <!-- START EDUCATION -->
  <div
    ref="targetRef2"
    id="education"
    class="mb-4 app-bg-color-secondary rounded-xl lg:p-7 md:p-7 p-3"
  >
    <div class="grid grid-cols-12">
      <div class="lg:col-span-1 md:col-span-1 col-span-2">
        <div v-if="isInComplete(profile_completion_enum.EDUCATIONS)">
          <img
            class="cursor-pointer w-8 md:w-10 md:h-11"
            :src="getStaticImage('education_red1.svg')"
            alt="exp"
          />
        </div>
        <div v-else>
          <img
            class="cursor-pointer w-8 md:w-10 md:h-11"
            :src="getStaticImage('education_green1.svg')"
            alt="exp"
          />
        </div>
      </div>
      <div
        class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
      >
        <p class="">
          <span class="app-text-color-secondary text-left text-[16px] font-bold"
            >Education</span
          ><br />
          <span
            class="text-[#fe0000] text-left text-[14px]"
            v-if="
              isInComplete(profile_completion_enum.EDUCATIONS) &&
              getLengthEdu(getter_UserProfile.org_details).length <= 0
            "
            >Please add your education
          </span>
          <span v-else class="text-[#696969] text-left text-[14px]">
            Please add your Education
          </span>
        </p>
      </div>
      <div class="col-span-1 flex items-start justify-end">
        <button>
          <img
            class="md:w-7 w-6"
            @click="addEducationclick()"
            src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div
      class=""
      v-if="getLengthEdu(getter_UserProfile.org_details).length > 0"
    >
      <div
        class="rounded-[20px] bg-[#fff] mt-7 app-text-color-secondary p-4"
        v-for="(org_data, index) in getEduArray(getter_UserProfile.org_details)"
        :key="index"
      >
        <div class="">
          <div class="">
            <div class="flex">
              <div class="pb-4">
                <div class="relative flex justify-center items-center">
                  <img
                    :src="getStaticImage('profile_hexagon.svg')"
                    alt="Snow"
                    class="object-top hexagon-size"
                  />
                  <div
                    class="absolute left-6 right-0 md:text-sm text-[11px] flex flex-col"
                  >
                    <span class=""> {{ setDate(org_data.start_date) }}</span>
                    <span class="leading-3">To</span>
                    <span> {{ setDate(org_data.end_date) }} </span>
                  </div>
                  <div class="positionCls">
                    <span class="text-[11px] md:text-sm font-bold">
                      {{
                        calculateExpOfOrg(
                          org_data.start_date,
                          org_data.end_date
                        )
                      }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="lg:pl-4 md:pl-4 pl-2 flex-auto flex flex-col justify-start"
              >
                <p
                  class="app-text-color-secondary md:text-[16px] text-sm text-left font-bold"
                >
                  {{ upperCase(org_data.degree) }} in
                  {{ upperCase(org_data.department) }}
                </p>
                <p class="app-text-color-secondary md:text-sm text-xs">
                  {{ upperCase(org_data.organization.name) }}
                </p>
                <p class="app-text-color-secondary text-xs md:text-sm">
                  {{ org_data.address }}
                </p>
              </div>
              <div class="text-right flex justify-center align-center">
                <div>
                  <button>
                    <img
                      :src="getStaticImage('Edit+_1.svg')"
                      alt="edit"
                      class="w-5 h-8 cursor-pointer"
                      @click="editEducation(org_data.id)"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr
            class="borderBottom"
            v-if="
              org_data.profession_cat.length > 0 || org_data.sectors.length > 0
            "
          />
          <div
            class="borderBottom py-4"
            v-if="
              org_data.profession_cat.length > 0 || org_data.sectors.length > 0
            "
          >
            <div class="">
              <div class="" v-if="org_data.profession_cat.length > 0">
                <h4
                  class="app-text-color-secondary md:text-base text-sm font-bold"
                >
                  Profession
                </h4>
              </div>
              <div class="flex space-x-6">
                <p
                  class="flex"
                  v-for="(data, index) in setProfessionValues(
                    org_data.profession_cat
                  )"
                  :key="index"
                >
                  <img
                    src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                    alt=""
                    class="mr-2 w-1.5"
                  /><span class="text-sm"> {{ data }}</span>
                </p>
              </div>
            </div>
            <div class="pt-1">
              <div class="" v-if="org_data.sectors.length > 0">
                <h4
                  class="app-text-color-secondary md:text-base text-sm font-bold"
                >
                  Sector
                </h4>
              </div>
              <div class="flex space-x-6">
                <p
                  class="flex"
                  v-for="(data, index) in getSectorsValues(org_data.sectors)"
                  :key="index"
                >
                  <img
                    src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                    alt=""
                    class="mr-2 w-1.5"
                  /><span class="text-sm">{{ data }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="getLengthEdu(getter_UserProfile.org_details).length > 1">
      <div
        v-if="!showEducation"
        class="grid pl-10 pr-10 pt-5 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 text-center"
      >
        <p
          class="app-text-color-secondary text-sm font-bold cursor-pointer"
          @click="showMoreEdu()"
        >
          See All
        </p>
      </div>
      <div
        v-if="showEducation"
        class="grid pl-10 pr-10 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 text-center pt-5"
      >
        <p
          class="app-text-color-secondary text-sm font-bold cursor-pointer"
          @click="showMoreEdu()"
        >
          See Less
        </p>
      </div>
    </div>
  </div>
  <!-- END EDUCATION -->
  <!-- START SOFTWARE PRO -->
  <div ref="targetRef3" id="software">
    <div class="grid app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl">
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div
            class="flex flex-col"
            v-if="getter_UserProfile.software_details.length == 0"
          >
            <img
              :src="getStaticImage('Software_Proficiency_black1.svg')"
              alt="edit"
              class="cursor-pointer w-8 md:w-10 md:h-11"
              @click="handleSoftwareProf"
            />
          </div>
          <div v-else>
            <div
              v-if="
                isInComplete(profile_completion_enum.SOFTWARE_PROFICIENCIES)
              "
            >
              <img
                class="cursor-pointer w-8 md:w-10 md:h-11"
                :src="getStaticImage('software_red1.svg')"
                alt="exp"
              />
            </div>
            <div v-else>
              <img
                class="w-8 md:w-10 md:h-11"
                :src="getStaticImage('software_green1.svg')"
                alt="exp"
              />
            </div>
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex justify-start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left text-[16px] font-bold"
              >Software Proficiency</span
            ><br />
            <span class="text-[#696969] text-left text-[14px]">
              Software Knowledge is key to do your job efficiently.List all
              softwares you know.</span
            >
          </p>
        </div>
        <div class="col-span-1 flex items-start justify-end">
          <button>
            <img
              class="w-6 md:w-7"
              @click="AddSoftwareProficiency()"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
          </button>
        </div>
      </div>

      <div class="pt-7" v-if="getter_UserProfile.software_details.length > 0">
        <div class="rounded-2xl p-4 bg-[#fff]">
          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 column-gap-7"
          >
            <div
              class="grid grid-cols-3 mb-5"
              v-for="(soft, index) in getter_UserProfile.software_details"
              :key="index"
            >
              <div class="flex space-x-5 col-span-2">
                <div class="flex">
                  <div class="">
                    <div>
                      <Donut :data="soft.stars.toString()" />
                    </div>
                  </div>
                </div>

                <div class="mt-2 md:mt-2 app-text-color-secondary">
                  <span
                    class="app-text-color-secondary text-left text-[16px] font-bold"
                    >{{ soft.software }}</span
                  ><br />
                  <div
                    v-if="
                      getSoftwareExp(soft.software_experience) == 0 &&
                      getSoftExpMonth(soft.software_experience) == 0
                    "
                  >
                    <p class="text-sm text-[#fe0000]">
                      Please add your software experience with this software
                    </p>
                  </div>
                  <span
                    class="app-text-color-secondary text-left text-[12px]"
                    v-if="getSoftwareExp(soft.software_experience) > 0"
                    >{{ getSoftwareExp(soft.software_experience) }} Years
                  </span>

                  <span
                    class="app-text-color-secondary text-left text-[12px]"
                    v-if="getSoftExpMonth(soft.software_experience) > 0"
                  >
                    {{ getSoftExpMonth(soft.software_experience) }}
                    Month
                  </span>
                </div>
              </div>

              <div class="col-span-1 flex justify-end">
                <img
                  :src="getStaticImage('Edit+_1.svg')"
                  alt="edit"
                  class="w-5 h-8 cursor-pointer"
                  @click="AddSoftwareProficiency(soft.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END SOFTWARE PRO -->
  <!-- START TECHINICAL SKILL -->
  <!-- <div
      id="keyskill"
      class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
      ref="targetRef4"
    >
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div v-if="isInComplete(profile_completion_enum.KEYSKILL)">
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('technical_red1.svg')"
              alt="exp"
            />
          </div>
          <div v-else>
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('technical_green1.svg')"
              alt="exp"
            />
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left font-bold text-[16px]"
              >Technical Skill</span
            ><br />
            <span
              class="text-[#fe0000] text-left text-[14px]"
              v-if="isInComplete(profile_completion_enum.KEYSKILL)"
              >Please add your technical skills
            </span>
            <span v-else class="text-[#696969] text-left text-[14px]">
              List your key technical skills, e.g.,Knowlwdge of
              contracts,Excelent at design management. <br />
              This will help employee to shortlist your CV.</span
            >
          </p>
        </div>
        <div class="col-span-1 flex items-start justify-end">
          <button>
            <img
              v-if="getter_UserProfile.key_skills.key_skills.length <= 0"
              class="w-6 md:w-7"
              @click="keyskillclick(getter_UserProfile.key_skills.id)"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
            <img
              v-if="getter_UserProfile.key_skills.key_skills.length > 0"
              :src="getStaticImage('Edit+_1.svg')"
              alt="edit"
              class="w-5 md:w-5 md:h-8 cursor-pointer place-content-start"
              @click="keyskillclick(getter_UserProfile.key_skills.id)"
            />
          </button>
        </div>
      </div>
      <div
        class="pt-7"
        v-if="getter_UserProfile.key_skills.key_skills.length > 0"
      >
        <div class="bg-[#fff] rounded-[20px] p-4">
          <div class="grid lg:grid-cols-1 grid-cols-1 gap-1 font-size-12">
            <div
              class="pl-1"
              v-for="(key_skills, index) in getter_UserProfile.key_skills
                .key_skills"
              :key="index"
            >
              <div class="app-text-color-secondary">
                <ul class="flex justify-between pl-4 list-disc">
                  <li class="text-[16px]">
                    {{ key_skills.skill }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- END TECHINICAL SKILL -->
  <!-- START SOFT SKILL -->
  <!-- <div
      id="softskill"
      class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
      ref="targetRef5"
    >
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div v-if="isInComplete(profile_completion_enum.SOFTSKILL)">
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('softskill_red1.svg')"
              alt="exp"
            />
          </div>
          <div v-else>
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('softskills_green1.svg')"
              alt="exp"
            />
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left font-bold text-[16px]"
              >Soft Skill</span
            ><br />
            <span
              class="text-[#fe0000] text-left text-[14px]"
              v-if="isInComplete(profile_completion_enum.SOFTSKILL)"
              >Please add your soft skills
            </span>
            <span v-else class="text-[#696969] text-left text-[14px]">
              Employer wants to know,if they can work with you.List down your
              key personality skills that help you to do your job well
            </span>
          </p>
        </div>
        <div class="col-span-1 flex items-start justify-end">
          <button>
            <img
              v-if="getter_UserProfile.soft_skills.soft_skills.length <= 0"
              class="w-6 md:w-7"
              @click="softskillclick(getter_UserProfile.soft_skills.id)"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />

            <img
              v-if="getter_UserProfile.soft_skills.soft_skills.length > 0"
              :src="getStaticImage('Edit+_1.svg')"
              alt="edit"
              class="w-5 md:w-5 md:h-8 cursor-pointer place-content-start"
              @click="softskillclick(getter_UserProfile.key_skills.id)"
            />
          </button>
        </div>
      </div>
      <div
        class="pt-7"
        v-if="getter_UserProfile.soft_skills.soft_skills.length > 0"
      >
        <div class="bg-[#fff] rounded-[20px] p-4">
          <div
            class="pl-4"
            v-for="(soft_skills, index) in getter_UserProfile.soft_skills
              .soft_skills"
            :key="index"
          >
            <div class="app-text-color-secondary">
              <ul class="flex justify-between pl-1 list-disc">
                <li class="text-[16px]">
                  {{ soft_skills.skill }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- END SOFT SKILL -->
  <!-- START ACHIEVEMENT -->
  <!-- <div
      id="achievments"
      class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
      ref="targetRef6"
    >
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div
            class="flex flex-col"
            v-if="getter_UserProfile.achievements.achievements.length == 0"
          >
            <img
              :src="getStaticImage('achievements_black1.svg')"
              alt="edit"
              class="cursor-pointer w-8 md:w-10 md:h-11"
              @click="handleAchievement"
            />
          </div>
          <div v-else>
            <div v-if="isInComplete(profile_completion_enum.ACHIEVEMENT)">
              <img
                class="cursor-pointer w-8 md:w-10 md:h-11"
                :src="getStaticImage('achievements_red1.svg')"
                alt="exp"
                @click="handleAchievement"
              />
            </div>
            <div v-else>
              <img
                class="w-8 md:w-10 md:h-11"
                :src="getStaticImage('achievements_green1.svg')"
                alt="exp"
                @click="handleAchievement"
              />
            </div>
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
        >
          <p>
            <span
              class="app-text-color-secondary text-left font-bold text-[16px]"
              >Achievements</span
            ><br />
            <span class="text-[#696969] text-left text-[14px]"
              >Achievements set you apart from others. If you have delivered
              project on time,delivered outstanding design, works on complex
              project,list down here.</span
            >
          </p>
        </div>
        <div class="col-span-1 flex items-start justify-end">
          <button>
            <img
              class="w-6 md:w-7"
              @click="achievementclick()"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
          </button>
        </div>
      </div>
      <div
        class="pt-7"
        v-if="getter_UserProfile.achievements.achievements.length > 0"
      >
        <div class="p-4 bg-[#fff] rounded-[20px]">
          <div
            class="font-size-12"
            v-for="(achievement, index) in getter_UserProfile.achievements
              .achievements"
            :key="index"
          >
            <div class="app-text-color-secondary pl-4">
              <ul class="flex justify-between list-disc pl-1">
                <li class="mb-2 text-[16px]">
                  {{ achievement.achievement }}
                </li>
                <img
                  :src="getStaticImage('Edit+_1.svg')"
                  alt="edit"
                  class="w-5 md:w-5 md:h-8 cursor-pointer"
                  @click="achievementclick(getter_UserProfile.achievements.id)"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- END ACHIEVEMENT -->
  <!-- START INTEREST -->
  <!-- <div
      id="interest"
      class="bg-[#f2f2f2] mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
      ref="targetRef7"
    >
      <div class="grid grid-cols-12">
        <div class="lg:col-span-1 md:col-span-1 col-span-2">
          <div v-if="isInComplete(profile_completion_enum.INTERESTS)">
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('interest_red1.svg')"
              alt="exp"
            />
          </div>
          <div v-else>
            <img
              class="cursor-pointer w-8 md:w-10 md:h-11"
              :src="getStaticImage('interests_green1.svg')"
              alt="exp"
            />
          </div>
        </div>
        <div
          class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
        >
          <p>
            <span class="app-text-color-secondary text-left font-bold text-[16px]"
              >Interest</span
            ><br />
            <span class="text-[#696969] text-left text-[14px]">
              Choose your interest this will help olous to create content for
              you and help employees to understand your interest
            </span>
          </p>
        </div>
        <div class="col-span-1 flex items-start justify-end">
          <button>
            <img
              class="w-6 md:w-7"
              @click="interestclick()"
              src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
              alt=""
            />
          </button>
        </div>
      </div>
      <div class="pt-7" v-if="getter_UserProfile.interests.length > 0">
        <div class="bg-[#fff] rounded-[20px] p-4">
          <div
            class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 column-gap-7"
          >
            <div
              class="pl-4 grid grid-cols-3 mb-5"
              v-for="(data, index) in getInterestValues()"
              :key="index"
            >
              <div class="app-text-color-secondary col-span-2">
                <ul class="flex justify-between pl-1 list-disc">
                  <li class="text-[16px]">
                    {{ data }}
                  </li>
                </ul>
              </div>
              <div class="flex col-span-1 justify-end">
                <img
                  :src="getStaticImage('Edit+_1.svg')"
                  alt="edit"
                  class="w-5 md:w-5 md:h-8 cursor-pointer"
                  @click="interestclick()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  <!-- END INTEREST -->
  <!-- START LANGUAGE -->
  <div
    class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
    ref="targetRef8"
    id="language"
  >
    <div class="grid grid-cols-12">
      <div class="lg:col-span-1 md:col-span-1 col-span-2">
        <div v-if="isInComplete(profile_completion_enum.LANGUAGE)">
          <img
            class="cursor-pointer w-8 md:w-14 md:h-11"
            :src="getStaticImage('language_red1.svg')"
            alt="exp"
          />
        </div>
        <div v-else>
          <img
            class="cursor-pointer w-8 md:w-14 md:h-11"
            :src="getStaticImage('language_green1.svg')"
            alt="exp"
          />
        </div>
      </div>
      <div class="lg:col-span-10 md:col-span-10 col-span-9">
        <p>
          <span class="app-text-color-secondary text-left text-[16px] font-bold"
            >Language</span
          ><br />
          <span
            class="text-[#fe0000] text-left text-[14px]"
            v-if="isInComplete(profile_completion_enum.LANGUAGE)"
            >Please add languages you known
          </span>
          <span v-else class="text-[#696969] text-left text-[14px]">
            Add the Languages that you know along with proficiency level
          </span>
        </p>
      </div>
      <div class="col-span-1 flex items-start justify-end">
        <button>
          <img
            class="w-6 md:w-7"
            @click="addLanguageclick()"
            src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <div class="pt-7" v-if="getter_UserProfile.language_details.length > 0">
      <div class="bg-[#fff] h-auto p-4 rounded-[20px]">
        <div
          class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 column-gap-7"
        >
          <div
            class="pl-1 grid grid-cols-3 mb-5"
            v-for="(lang, index) in getter_UserProfile.language_details"
            :key="index"
          >
            <div class="col-span-2">
              <ul class="list-disc flex justify-between pl-4">
                <li class="app-text-color-secondary">
                  <span class="text-[16px] app-text-color-secondary">{{
                    lang.language_name
                  }}</span>
                  <div class="text-sm font-light text-[#696969]">
                    {{ getLanguageFluencyLevel(lang) }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-span-1 flex justify-end">
              <img
                :src="getStaticImage('Edit+_1.svg')"
                alt="edit"
                class="w-5 h-8 cursor-pointer"
                @click="editLanguageclick(lang.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- END LANGUAGE -->
  <!-- START OTHER DETAILS -->
  <div
    id="otherdetails"
    class="app-bg-color-secondary mb-5 lg:p-7 md:p-7 p-3 rounded-xl"
    ref="targetRef9"
  >
    <div class="grid grid-cols-12">
      <div class="lg:col-span-1 md:col-span-1 col-span-2 w-8 md:w-10 md:h-11">
        <div class="justify-center items-center flex">
          <div
            class="flex flex-col items-center"
            v-if="isOtherDetailsIncomplete()"
          >
            <img
              :src="getStaticImage('other_red1.svg')"
              alt="edit"
              @click="handleOther"
              class="cursor-pointer w-8 md:w-10 md:h-11"
            />
          </div>
          <div v-else>
            <img
              :src="getStaticImage('other_green1.svg')"
              alt="edit"
              @click="handleOther"
              class="cursor-pointer w-8 md:w-10 md:h-11"
            />
          </div>
        </div>
      </div>
      <div
        class="lg:col-span-10 md:col-span-10 col-span-9 flex flex-col justify-start ml-negative10"
      >
        <p>
          <span class="app-text-color-secondary text-left text-[16px] font-bold"
            >Other Details</span
          ><br />
          <span class="text-[#696969] text-left text-[14px]">
            These will be seen only when you apply to jobs or share CV
          </span>
        </p>
      </div>
      <div class="col-span-1 flex items-start justify-end">
        <button>
          <img
            class="w-5 h-8"
            @click="otherdetailsclick()"
            :src="getStaticImage('Edit+_1.svg')"
            alt=""
          />
        </button>
      </div>
    </div>

    <div
      class="pt-7"
      v-if="getter_UserProfile.other_details.show_other_details == true"
    >
      <div class="bg-[#fff] rounded-[20px] p-4 app-text-color-secondary">
        <!-- <template #content> -->
        <div class="">
          <div class="flex align-center">
            <div
              class="flex"
              v-if="getter_UserProfile.other_details.other_details.cv_email"
            >
              <img
                src="../../assets/Email-Company.svg"
                alt=""
                class="w-10"
              /><span class="pt-2 text-[16px]">
                {{
                  getter_UserProfile.other_details.other_details.cv_email
                }}</span
              >
            </div>
            <div v-else>
              <span class="text-[16px] text-[#fe0000] ml-2.5"
                >Please add your email address</span
              >
            </div>
          </div>
        </div>
        <div class="">
          <div class="flex align-center">
            <div
              class="flex"
              v-if="getter_UserProfile.other_details.other_details.cv_phone"
            >
              <img
                src="../../assets/call-company.svg"
                alt=""
                class="w-10"
              /><span class="pt-2 text-[16px]">
                {{
                  getter_UserProfile.other_details.other_details.cv_phone
                }}</span
              >
            </div>
            <div v-else>
              <span class="text-[16px] text-[#fe0000] ml-2.5"
                >Please add your contact number</span
              >
            </div>
          </div>
        </div>
        <div class="">
          <div class="flex pt-2 items-center">
            <div
              class="flex"
              v-if="getter_UserProfile.other_details.other_details.dob"
            >
              <img
                src="../../assets/img/Calender.svg"
                alt=""
                class="ml-2.5 mr-2.5 w-5"
              />
              <div>
                <span class="text-[16px]">
                  {{ getter_UserProfile.other_details.other_details.dob }}</span
                >
              </div>
            </div>
            <div v-else>
              <span class="text-[16px] text-[#fe0000] ml-2.5"
                >Please add your date of birth</span
              >
            </div>
          </div>
        </div>
        <!-- </template> -->
      </div>
    </div>
  </div>
  <!-- END OTHER DETAILS -->
  <Dialog
    v-model:visible="isShowExperience"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <Experience
      :data="dataToExperience"
      @close="closeCVElement(cv_elements.EXPERIENCE)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowEducation"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
    :blockScroll="true"
  >
    <Education
      :data="dataToEducation"
      @close="closeCVElement(cv_elements.EDUCATION)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowResponsibility"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <Responsibility
      :message="parentMessage"
      @close="closeCVElement(cv_elements.RESPONSIBILITY)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowCertificate"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <Certifications
      :data="dataToCertificate"
      @close="closeCVElement(cv_elements.CERTIFICATES)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowSoftware"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <SoftwareProficiencies
      :data="dataToSoftware"
      @close="closeCVElement(cv_elements.SOFTWARE_PROFICIENCY)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowSoftSkill"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <SoftSkills
      :message="dataToSoftSkills"
      @close="closeCVElement(cv_elements.SOFT_SKILL)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowTechnicalSkill"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <KeySkills
      :message="dataToTechnicalSkills"
      @close="closeCVElement(cv_elements.KEYSKILL)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowLanguage"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <Language
      :data="dataToLanguage"
      @close="closeCVElement(cv_elements.LANGUAGES)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowAchievement"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <Achievements
      :message="dataToAchievements"
      @close="closeCVElement(cv_elements.ACHIEVEMENTS)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowOtherDetails"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <OtherDetails
      :message="dataToOtherDetail"
      @close="closeCVElement(cv_elements.OTHER_DETAILS)"
    />
  </Dialog>
  <Dialog
    v-model:visible="isShowEditProfile"
    :showHeader="false"
    :style="{ width: '950px' }"
    modal
  >
    <EditProfile
      :data="dataToEditProfile"
      @close="closeCVElement(cv_elements.EDIT_PROFILE)"
    />
  </Dialog>
  <Dialog
    v-model:visible="contactUs"
    :style="{ width: '550px' }"
    :modal="true"
    class="rouned-md"
    :showHeader="false"
  >
    <div class="p-6">
      <div class="confirmation-content flex flex-col">
        <div class="mb-2">
          <span class="text-base font-bold app-text-color-primary"
            >Contact Us</span
          >
        </div>
        <textarea
          id="contactUs"
          class="form-control focus-visible:outline-none h-20"
          cols="30"
          rows="10"
          v-model="state.contactUsData"
          placeholder="Tell us your problem"
        ></textarea>
        <div
          class="invalid-feedback"
          v-for="error of v$.contactUsData.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </div>
      </div>
      <div class="flex justify-end space-x-4">
        <button @click="clickCancel()" class="btn w-24">Cancel</button>
        <button @click="sendContactUsData()" class="btn w-24">Send</button>
      </div>
    </div>
  </Dialog>
  <Dialog
    :visible="isCompleteFields"
    :style="{ width: '350px' }"
    :modal="true"
    :draggable="false"
    :showHeader="false"
  >
    <div class="p-6">
      <p>"Your CV is not completed. Please complete your cv and then try"</p>
      <div class="flex justify-end">
        <button @click="closePopup()" class="btn w-24">Ok</button>
      </div>
    </div>
  </Dialog>
  <Dialog
    :visible="isWantToGoJob"
    :style="{ width: '350px' }"
    :modal="true"
    :draggable="false"
    :showHeader="false"
  >
    <div class="p-6">
      <p>"Your CV is complete now. You want to apply job"</p>
      <div class="flex justify-end space-x-4 mt-4">
        <button @click="closeJobPopup()" class="btn w-24">No</button>
        <button @click="goToJob()" class="btn w-24">Yes</button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import appConstants from "../../appConstants.js";
import Card from "primevue/card";
import Donut from "../common/Donut.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getCurrentEncodedURL } from "../../common/js/webUrls.js";
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import Responsibility from "./Responsibility.vue";
import Language from "./Language.vue";
import KeySkills from "./KeySkills.vue";
import SoftSkills from "./softSkills.vue";
import Certifications from "./Certifications.vue";
import Achievements from "./Achievements.vue";
import OtherDetails from "./OtherDetails.vue";
import SoftwareProficiencies from "./SoftwareProficiencies.vue";
import Education from "./Education.vue";
import Experience from "./Experience.vue";
import { getCurrentInstance } from "vue";
import EditProfile from "./editProfile.vue";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";

export default {
  name: "profileNew",
  components: {
    Card,
    Donut,
    Dialog,
    Button,
    Responsibility,
    Language,
    KeySkills,
    SoftSkills,
    Certifications,
    Achievements,
    OtherDetails,
    SoftwareProficiencies,
    Education,
    Experience,
    EditProfile,
  },
  async setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    let showExperience = ref(false);
    let showEducation = ref(false);
    let isCompleteFields = ref(false);
    let isWantToGoJob = ref(false);
    let isShowResponsibility = ref(false);
    let isShowExperience = ref(false);
    let isShowEducation = ref(false);
    let isShowCertificate = ref(false);
    let isShowLanguage = ref(false);
    let isShowTechnicalSkill = ref(false);
    let isShowSoftSkill = ref(false);
    let isShowSoftware = ref(false);
    let isShowAchievement = ref(false);
    let isShowInterest = ref(false);
    let isShowOtherDetails = ref(false);
    let isShowEditProfile = ref(false);
    let userSlug = ref("");
    let parentMessage = ref("");
    let dataToLanguage = ref("");
    let dataToTechnicalSkills = ref("");
    let dataToSoftSkills = ref("");
    let dataToCertificate = ref("");
    let dataToAchievements = ref("");
    let dataToEducation = ref("");
    let dataToExperience = ref("");
    let dataToOtherDetail = ref("");
    let dataToEditProfile = ref("");
    let profile_completion_enum = appConstants.profile_completion;
    let language_fluency_level = appConstants.Language_Fluency;
    let cv_elements = appConstants.CV_ELEMENTS;
    let dataToSoftware = ref("");
    const app = getCurrentInstance();
    const $emitter = app.appContext.config.globalProperties.emitter;
    let contactUs = ref(false);
    const state = reactive({
      contactUsData: "",
    });
    const rules = {
      contactUsData: {
        required: helpers.withMessage("Please enter your message", required),
      },
    };
    const v$ = useVuelidate(rules, state);
    userSlug.value = route.params.user_slug;
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );
    let getter_user = computed(() => store.getters["login/getter_user"]);
    let getter_sector = computed(() => store.getters["dropdown/getter_sector"]);
    let getter_interest = computed(
      () => store.getters["dropdown/getter_interest"]
    );
    let getter_profession = computed(
      () => store.getters["dropdown/getter_profession"]
    );
    let getter_isUserLoggedIn = computed(
      () => store.getters["login/getter_isUserLoggedIn"]
    );
    let getter_incompleteFields = computed(
      () => store.getters["UserProfile/getter_incompleteFields"]
    );
    let getter_oneUserData = computed(
      () => store.getters["UserProfile/getter_oneUserData"]
    );

    onMounted(() => {
      if (
        getter_user.value.slug == route.params.user_slug &&
        getter_isUserLoggedIn.value == true
      ) {
        store.dispatch(
          "UserProfile/action_fetchOneUserData",
          getter_user.value.id
        );
        store.dispatch("UserProfile/action_getIncompleteFields").then(() => {
          if (
            route.params.isFromJob == "true" &&
            getter_incompleteFields.value.length != 0
          ) {
            isCompleteFields.value = true;
          }
        });
      }
    });
    await fetchUserProfile();
    $emitter.on("close", (element) => {
      if (element == cv_elements.LANGUAGES) {
        closeCVElement(cv_elements.LANGUAGES);
      } else if (element == cv_elements.SOFTWARE_PROFICIENCY) {
        closeCVElement(cv_elements.SOFTWARE_PROFICIENCY);
      }
      //;
    });

    getSoftExpMonth();

    async function fetchUserProfile() {
      store.dispatch("dropdown/action_getProfessionDetails");
      store.dispatch("dropdown/action_getSectorDetails");
      store.dispatch("dropdown/action_getInterest");

      await store
        .dispatch("UserProfile/action_getUserProfileNew", userSlug.value)
        .then(() => {
          // backToSpecificSection();
          isloadpage.value = true;
        })
        .catch((error) => {
          if (error.response?.status == appConstants.api_response.NOT_FOUNT) {
            user_not_found.value = true;
          }
        });
    }

    function getSectorsValues(sectorsIDList) {
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

      let strValue = sectorValues;
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

      let strValue = InterestValues;
      return strValue;
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
      if (showExperience.value == true) {
        return filteredArray;
      } else {
        return filteredArray.slice(0, 1);
      }
    }
    function seeAll() {
      if (showExperience.value == false) {
        showExperience.value = true;
      } else {
        showExperience.value = false;
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
      if (showEducation.value == true) {
        return filteredArray;
      } else {
        return filteredArray.slice(0, 1);
      }
    }
    function showMoreEdu() {
      if (showEducation.value == false) {
        showEducation.value = true;
      } else {
        showEducation.value = false;
      }
    }

    function setDate(date) {
      if (date) {
        let date_obj = new Date(date);
        return moment(date_obj).format("MMM YYYY");
      } else {
        return "present";
      }
    }
    function calculateExpOfOrg(sDate, eDate) {
      let dateDifference = getExperienceInDays(sDate, eDate);
      let years = calculateExperienceInYearFromDays(dateDifference);
      return years;
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
    function calculateExperienceInYearFromDays(days) {
      if (days > 0) {
        let result = (Math.round((days / 365) * 10) / 10).toFixed(1);
        return result;
      } else {
        return 0;
      }
    }
    function getLengthExp(array) {
      if (array == undefined) {
        return;
      }
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == false;
      });
      return eduData;
    }
    function setProfessionValues(professionIdList) {
      let professionValues = [];
      professionIdList.map((res) => {
        let selected = res;

        getter_profession.value.map((options) => {
          if (options.id == selected) {
            professionValues.push(options.display_string);
          }
        });
      });

      let strValue = professionValues;

      return strValue;
    }
    function getLengthEdu(array) {
      let eduData = array.filter(function (data) {
        return data.is_edu_detail == true;
      });
      return eduData;
    }
    function upperCase(result) {
      let results = result.charAt(0).toUpperCase() + result.slice(1);
      return results;
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

    function clickDownloadCv() {
      if (getter_incompleteFields.value.length == 0) {
        store
          .dispatch("UserProfile/action_sendCvToMail")
          .then(() => {
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: "Your CV has been sent to your email ID.",
              life: 3000,
            });
          })
          .catch((error) => {});
      } else {
        isCompleteFields.value = true;
      }
    }
    function closePopup() {
      isCompleteFields.value = false;
    }

    function isInComplete(id) {
      let isInComplete = false;
      let array = getter_incompleteFields.value?.length;
      for (let i = 0; i < array; i++) {
        if (getter_incompleteFields.value[i] == id) {
          isInComplete = true;
          break;
        }
      }
      return isInComplete;
    }

    function isExperienceIncomplete() {
      let isInComplete = false;
      let array = getter_incompleteFields.value?.length;
      for (let i = 0; i < array; i++) {
        if (
          getter_incompleteFields.value[i] ==
            profile_completion_enum.EXPERIENCES ||
          getter_incompleteFields.value[i] ==
            profile_completion_enum.RESPONSIBILITIES
        ) {
          isInComplete = true;
          break;
        }
      }
      return isInComplete;
    }

    function isOtherDetailsIncomplete() {
      let isInComplete = false;
      let array = getter_incompleteFields.value?.length;
      for (let i = 0; i < array; i++) {
        if (
          getter_incompleteFields.value[i] == profile_completion_enum.EMAIL ||
          getter_incompleteFields.value[i] ==
            profile_completion_enum.PHONENUMBER ||
          getter_incompleteFields.value[i] == profile_completion_enum.DOB
        ) {
          isInComplete = true;
          break;
        }
      }

      return isInComplete;
    }

    function getLanguageFluencyLevel(data) {
      if (data.rating == language_fluency_level.BEGINNER) {
        return "Beginner";
      } else if (data.rating == language_fluency_level.INTERMEDIATE) {
        return "Intermediate";
      } else {
        return "Fluent";
      }
    }
    function sendContactUsData() {
      v$.value.$touch();
      if (v$.value.$invalid) {
        return false;
      } else {
        let data = {
          type: 1,
          message: state.contactUsData,
        };
        store
          .dispatch("UserProfile/action_sendContactUsData", data)
          .then(() => {
            contactUs.value = false;
            state.contactUsData = "";
            toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary:
                "Your request has been submitted. Our team will be in touch.",
              life: 3000,
            });
          })
          .catch((error) => {
            contactUs.value = false;
            state.contactUsData = "";
            cosnole.log("error.response.status");
          });
      }
    }

    function openContactUs() {
      contactUs.value = true;
    }
    function clickCancel() {
      state.contactUsData = "";
      v$.value.$reset();
      contactUs.value = false;
    }
    function getSoftwareExp(exp) {
      let softExpYears = Math.floor(exp / 12);
      return softExpYears;
    }
    function getSoftExpMonth(exp) {
      let softExpMonth = exp - Math.floor(exp / 12) * 12;
      return softExpMonth;
    }
    function clickPreviewCV() {
      store.dispatch("UserProfile/action_getCVImages").then(() => {
        router.push({ name: appConstants.routes.PREVIEWCV });
      });
    }

    function closeSoftware() {
      isShowSoftware.value = false;
    }
    function AddSoftwareProficiency(id) {
      dataToSoftware.value = id;
      isShowSoftware.value = true;
      //this.$router.push({ name: appConstants.routes.SOFTWAREPROFICIENCIES });
    }
    function closeEducation() {
      isShowEducation.value = false;
    }
    function handleClickExperience() {
      let d = document.querySelector("#experience");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleCertificates() {
      let d = document.querySelector("#certificates");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleEducation() {
      let d = document.querySelector("#education");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleSoftwareProf() {
      let d = document.querySelector("#software");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleTechnicalSkills() {
      let d = document.querySelector("#keyskill");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleSoftskills() {
      let d = document.querySelector("#softskill");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleAchievement() {
      let d = document.querySelector("#achievments");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleInterest() {
      let d = document.querySelector("#interest");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleLanguage() {
      let d = document.querySelector("#language");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    function handleOther() {
      let d = document.querySelector("#otherdetails");
      d.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
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
    function setUserAboutText(about) {
      let maxLength = 100;
      let aboutText = about;
      if (aboutText.length > maxLength) {
        aboutText = aboutText.slice(0, maxLength) + "...";
      }
      return aboutText;
    }
    function editProfile() {
      dataToEditProfile.value = "";
      isShowEditProfile.value = true;
      //router.push({ name: appConstants.routes.EDITPROFILE });
    }
    function addExperienceclick() {
      isShowExperience.value = true;
      dataToExperience.value = "";
      //router.push({ name: appConstants.routes.EXPERIENCE });
    }

    function editExperience(id) {
      isShowExperience.value = true;
      dataToExperience.value = id;
      // router.push({
      //   name: appConstants.routes.EXPERIENCE,
      //   query: { q: id },
      // });
    }
    function addEducationclick() {
      isShowEducation.value = true;
      dataToEducation.value = "";
      //router.push({ name: appConstants.routes.EDUCATION });
    }
    function editEducation(id) {
      isShowEducation.value = true;
      dataToEducation.value = id;
      // router.push({
      //   name: appConstants.routes.EDUCATION,
      //   query: { q: id },
      // });
    }
    function AddCertificationclick() {
      isShowCertificate.value = true;
      dataToCertificate.value = -1;
      // this.$router.push({ name: appConstants.routes.CERTIFICATION });
    }
    function editCertifications(index) {
      isShowCertificate.value = true;
      dataToCertificate.value = index;
      // this.$router.push({
      //   name: appConstants.routes.CERTIFICATION,
      //   query: { q: index },
      // });
    }
    function achievementclick(id) {
      dataToAchievements.value = id;
      isShowAchievement.value = true;
      //this.$router.push({ name: appConstants.routes.ACHIEVEMENTS });
    }
    function keyskillclick(id) {
      dataToTechnicalSkills.value = id;
      isShowTechnicalSkill.value = true;
    }
    function softskillclick(id) {
      dataToSoftSkills.value = id;
      isShowSoftSkill.value = true;
    }
    function interestclick() {
      this.$router.push({ name: appConstants.routes.INTEREST });
    }
    function editSoftwareProficiency(id) {
      this.$router.push({
        name: appConstants.routes.SOFTWAREPROFICIENCIES,
        query: { q: id },
      });
    }
    function otherdetailsclick() {
      dataToOtherDetail.value = "";
      isShowOtherDetails.value = true;
      //this.$router.push({ name: appConstants.routes.OTHERDETAILS });
    }
    function addLanguageclick() {
      dataToLanguage.value = "";
      isShowLanguage.value = true;
    }
    function editLanguageclick(id) {
      dataToLanguage.value = id;
      isShowLanguage.value = true;
    }
    function addResponsibility(id) {
      parentMessage.value = id;
      isShowResponsibility.value = true;
    }

    function closeCVElement(element) {
      if (element == cv_elements.EXPERIENCE) {
        store.dispatch(
          "UserProfile/action_fetchOneUserData",
          getter_user.value.id
        );
        isShowExperience.value = false;
      } else if (element == cv_elements.EDUCATION) {
        isShowEducation.value = false;
      } else if (element == cv_elements.RESPONSIBILITY) {
        isShowResponsibility.value = false;
      } else if (element == cv_elements.CERTIFICATES) {
        isShowCertificate.value = false;
      } else if (element == cv_elements.SOFTWARE_PROFICIENCY) {
        isShowSoftware.value = false;
      } else if (element == cv_elements.SOFT_SKILL) {
        isShowSoftSkill.value = false;
      } else if (element == cv_elements.KEYSKILL) {
        isShowTechnicalSkill.value = false;
      } else if (element == cv_elements.LANGUAGES) {
        isShowLanguage.value = false;
      } else if (element == cv_elements.ACHIEVEMENTS) {
        isShowAchievement.value = false;
      } else if (element == cv_elements.OTHER_DETAILS) {
        isShowOtherDetails.value = false;
      } else if (element == cv_elements.EDIT_PROFILE) {
        isShowEditProfile.value = false;
      }
      checkIsCompleteProfile();
    }
    function checkIsCompleteProfile() {
      store.dispatch("UserProfile/action_getIncompleteFields").then(() => {
        if (
          route.params.isFromJob == "true" &&
          getter_incompleteFields.value.length == 0
        ) {
          isWantToGoJob.value = true;
        }
      });
    }
    function closeJobPopup() {
      isWantToGoJob.value = false;
    }
    function goToJob() {
      let encode_str = getUUIDtoEncodedString(route.params.jobId);

      let result = getParamsForURL(route.params.jobTitle);

      router.push({
        name: appConstants.routes.JOBDETAILS,
        params: {
          job_id: `${result}${appConstants.url_separator_jobs}${encode_str}`,
          isFromProfile: true,
        },
      });
    }
    function getParamsForURL(job_title) {
      let jobTitle = "";
      if (job_title != undefined && job_title != null) {
        jobTitle = job_title;
        //Other than all alphabets & space remove other characters
        jobTitle = jobTitle.replace(/[^a-zA-Z ]/g, "");
        //concate with "-""
        jobTitle = jobTitle.replace(/\ /g, "-");
      }
      return jobTitle;
    }
    return {
      isCompleteFields,
      getter_user,
      getter_oneUserData,
      getter_UserProfile,
      showExperience,
      showEducation,
      profile_completion_enum,
      parentMessage,
      dataToLanguage,
      dataToTechnicalSkills,
      dataToSoftSkills,
      dataToEducation,
      dataToAchievements,
      dataToCertificate,
      dataToExperience,
      isShowResponsibility,
      isShowExperience,
      isShowEducation,
      isShowCertificate,
      isShowLanguage,
      isShowTechnicalSkill,
      isShowSoftSkill,
      isShowSoftware,
      isShowAchievement,
      isShowOtherDetails,
      getExpArray,
      getSoftwareExp,
      getSoftExpMonth,
      getEduArray,
      fetchUserProfile,
      getSectorsValues,
      getInterestValues,
      setDate,
      calculateExpOfOrg,
      getExperienceInDays,
      calculateExperienceInYearFromDays,
      upperCase,
      getLengthExp,
      setProfessionValues,
      getLengthEdu,
      clickAcivities,
      clickDownloadCv,
      seeAll,
      showMoreEdu,
      isInComplete,
      language_fluency_level,
      getLanguageFluencyLevel,
      state,
      v$,
      sendContactUsData,
      openContactUs,
      contactUs,
      clickCancel,
      closePopup,
      isExperienceIncomplete,
      isOtherDetailsIncomplete,
      cv_elements,
      clickPreviewCV,
      AddSoftwareProficiency,
      closeSoftware,
      dataToSoftware,
      closeEducation,
      handleClickExperience,
      handleCertificates,
      handleEducation,
      handleSoftwareProf,
      handleTechnicalSkills,
      handleSoftskills,
      handleAchievement,
      handleInterest,
      handleLanguage,
      handleOther,
      shortForm,
      setUserAboutText,
      editProfile,
      addExperienceclick,
      editExperience,
      addEducationclick,
      editEducation,
      AddCertificationclick,
      editCertifications,
      achievementclick,
      keyskillclick,
      softskillclick,
      interestclick,
      editSoftwareProficiency,
      otherdetailsclick,
      addLanguageclick,
      editLanguageclick,
      addResponsibility,
      closeCVElement,
      isShowEditProfile,
      checkIsCompleteProfile,
      goToJob,
      closeJobPopup,
      isWantToGoJob,
      dataToOtherDetail,
      dataToEditProfile,
    };
  },
};
</script>
<style>
.posi {
  top: 12rem;
  left: 11rem;
}

.posiNoImg {
  top: 13rem;
  left: 14rem;
}

.p-card .p-card-content {
  padding: 0rem 0;
}

.p-card .p-card-body {
  padding: 0.5rem;
}

.brNew {
  border-bottom: solid 1px #d1e2ea;
  border-top: solid 1px #d1e2ea;
}

.imgWidth {
  width: 3.5rem;
}

.hrLine1 {
  border: 1px solid #b7b7b7;
  top: 27px;
  position: absolute;
  width: 60%;
  left: 65px;
}

.hrLine {
  position: absolute;
  left: 83px;
  top: 23px;
  width: 3.5rem;
}

/* .borderBottom {
  border-bottom: 0.5px solid #000000;
} */

.p-card {
  background: #ffffff;
  color: #495057;
  box-shadow: none !important;
  border-radius: 16px;
}

.positionCls {
  position: absolute;
  left: 95px;
  bottom: 42px;
  background: #ffffff;
  width: 30px;
}

.c100 {
  font-size: 3.5rem !important;
}

.hexagon-size {
  min-width: 115px;
  height: 99px;
}

/* .bg-\[\#1C1C1C\] {
  --tw-bg-opacity: 1 !important;
  background-color: #ffffff !important;
} */

@media only screen and (max-width: 768px) {
  .posi {
    top: 7rem !important;
    left: 6rem !important;
  }

  .posiNoImg {
    top: 9rem;
    left: 12rem;
  }

  .hrLine {
    position: absolute;
    left: 62px;
    top: 13px;
    width: 10px;
  }

  .imgWidth {
    width: 2.5rem;
  }

  .hrLine1 {
    border: 1px solid #b7b7b7;
    top: 17px;
    position: absolute;
    width: 70%;
    left: 48px;
  }

  .ipadPdding {
    padding-right: 12px !important;
  }
}

@media only screen and (max-width: 425px) {
  /* #mobileScreen {
    display: block !important;
  } */

  /* #largeScreen {
    display: none !important;
  } */

  .positionCls {
    position: absolute;
    left: 87px;
    bottom: 38px;
    background-color: #ffffff;
    width: 20px;
  }

  .hrLine1 {
    border: 1px solid #b7b7b7;
    top: 14px;
    position: absolute;
    width: 65%;
    left: 40px;
  }

  .hrLine {
    position: absolute;
    left: 60px;
    top: 11px;
    width: 7px;
  }

  .mobilePosi {
    top: 237px;
    left: 16rem;
    width: 40px;
  }

  .mobilePosiNoImg {
    top: 10rem;
    left: 14rem;
  }
  /* 
  .visibleMd {
    display: none !important;
  }

  .hideMd {
    display: block !important;
  } */
}
.infografic-cv-main {
  display: grid;
  grid-template-columns: 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px;
  padding-bottom: 30px;
}
/*@media screen and (max-width: 992px) {
   #mobileScreen {
    display: none !important;
  } */

/* #largeScreen {
    display: block !important;
  } */

/* .visibleMd {
    display: block !important;
  }

  .hideMd {
    display: none !important;
  } */

/* .infografic-cv-main {
    display: grid;
    grid-template-columns: 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px 1fr 40px;
    padding-bottom: 30px;
  } 
}*/

/* @media only screen and (min-width: 1024px) and (max-width: 1439px) {
 #mobileScreen {
    display: none !important;
  } */

/* #largeScreen {
    display: block !important;
  } */

/* .visibleMd {
    display: block !important;
  }

  .hideMd {
    display: none !important;
  } 

  .posi {
    top: 14rem;
    left: 14rem;
  }
}
*/
/*@media only screen and (min-width: 1440px) and (max-width: 1919px) {
   #mobileScreen {
    display: none !important;
  } */

/* #largeScreen {
    display: block !important;
  } */

/* .visibleMd {
    display: block !important;
  }

  .hideMd {
    display: none !important;
  } 

  .posi {
    top: 14rem;
    left: 14rem;
  }
}*/

.infografic-cv-main-mobile {
  display: grid;
  grid-template-columns: 40px 1fr 40px 1fr 40px;
  padding-bottom: 30px;
}

.infografic-cv-main-mobile .infographic-line-dot {
  margin-top: 13px;
}

.infografic-cv-main-mobile img {
  margin-top: -5px;
}

@media screen and (max-width: 600px) {
  /* #mobileScreen {
    display: block !important;
  } */

  .positionCls {
    position: absolute;
    left: 77px;
    bottom: 27px;
    background-color: #ffffff;
    width: 15px;
  }

  /* #largeScreen {
    display: none !important;
  } */

  /* .visibleMd {
    display: none !important;
  }

  .hideMd {
    display: block !important;
  } */

  .hexagon-size {
    min-width: 95px;
    height: 80px;
  }
}

/* NEW CSS */
.hello-text {
  color: rgba(3, 1, 76, 0.5);
  text-transform: uppercase;
  letter-spacing: 3px;
}

/* .infographic-line-dot {
  width: auto;
  height: auto;
} */
.infographic-line {
  border: 1px solid #b7b7b7;
}
.ml-negative10 {
  margin-left: -16px;
}
.column-gap-7 {
  column-gap: 6rem;
}
</style>
