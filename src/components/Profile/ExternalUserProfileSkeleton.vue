<template>
  <div class="bg-[#fff]">
    <div class="cls-externaluserprofile form-container py-6">
      <div class="app-bg-color-secondary relative">
        <div
          class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:px-10 lg:py-10 md:px-10 md:py-10 sm:px-5 sm:py-5"
        >
          <div class="col-span-1">
            <Skeleton
              shape="circle"
              class="bg-[#C4C4C4] flex justify-center items-center rounded-full lg:w-44 lg:h-44 md:w-44 md:h-44 w-32 h-32"
            ></Skeleton>
          </div>
          <div class="col-span-2 lg:pt-0 md:pt-0 pt-5">
            <div class="flex flex-col">
              <span class="text-[24px] font-extrabold text-[#222]">
                <Skeleton
                  width="60%"
                  height="33px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>
            <div class="pt-2">
              <span class="font-light text-[16px] text-[#222]">
                <Skeleton
                  width="50%"
                  height="15px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>
            <div>
              <span class="text-[14px] text-[#222] font-light">
                <Skeleton
                  width="50%"
                  height="15px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>
            <div class="pt-3">
              <span class="text-[14px] text-[#222] font-bold">
                <Skeleton
                  width="70%"
                  height="18px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>
            <div class="pt-4">
              <span class="text-[14px] text-[#222] font-bold">
                <Skeleton
                  width="50%"
                  height="18px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>
            <div class="flex justify-between pt-5">
              <Skeleton
                width="20%"
                height="40px"
                class="mb-1 rounded-md"
              ></Skeleton>
            </div>
          </div>
          <!-- <div class="col-span-1 lg:block md:block hidden">
            <div class="experience-flag">
              <span class="arrow-right"></span>
              <div
                class="flex justify-center w-full"
                v-if="getter_UserProfileReadOnly.user_details[0].total_exp <= 0"
              >
                <span
                  class="font-bold lg:text-[16px] md:text-[16px] text-[14px] ml-5"
                  >Fresher</span
                >
              </div>
              <div
                v-if="getter_UserProfileReadOnly.user_details[0].total_exp > 0"
              >
                <span class="font-bold text-[16px] ml-5"
                  >{{
                    getter_UserProfileReadOnly.user_details[0].total_exp
                  }} </span
                >&nbsp;&nbsp;
                <span class="font-light text-[14px]"> Years Of Experience</span>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="px-10 py-4 profile-container">
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold">
            <Skeleton
              width="20%"
              height="25px"
              class="mb-1 rounded-md"
            ></Skeleton>
          </span>
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 pt-5">
          <div class="" v-for="index in 2" :key="index">
            <div class="grid grid-cols-5">
              <div class="col-span-1">
                <span
                  class="text-[14px] font-bold text-[#222] text-center mt-2"
                >
                  <Skeleton
                    width="75%"
                    height="68px"
                    class="mb-1 rounded-md"
                  ></Skeleton
                ></span>
              </div>
              <div class="col-span-4">
                <span class="text-[16px] font-bold capitalize text-[#222]">
                  <Skeleton
                    width="80%"
                    height="20px"
                    class="mb-1 rounded-md"
                  ></Skeleton
                ></span>
                <span class="text-[16px] font-light text-[#222]">
                  <Skeleton
                    width="60%"
                    height="15px"
                    class="mb-1 rounded-md mt-3"
                  ></Skeleton>
                </span>
                <span class="text-[14px] font-light text-[#222]">
                  <Skeleton
                    width="60%"
                    height="15px"
                    class="mb-1 rounded-md"
                  ></Skeleton
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="px-10 py-4 profile-container">
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold">
            <Skeleton
              width="30%"
              height="25px"
              class="mb-1 rounded-md"
            ></Skeleton
          ></span>
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 pt-5">
          <div class="" v-for="index in 4" :key="index">
            <div class="pb-1 grid grid-cols-3">
              <span class="text-[16px] font-light text-[#222] col-span-1">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
              <span class="col-span-1"> </span>
              <span class="text-[12px] font-bold text-[#222] col-span-1">
                <Skeleton
                  width="40%"
                  height="15px"
                  class="mb-1 rounded-md"
                ></Skeleton>
              </span>
            </div>

            <Skeleton
              width="80%"
              height="8px"
              class="mb-1 rounded-md"
            ></Skeleton>
          </div>
        </div>
      </div>
      <!--     <div
        class="px-10 py-4 m-2 profile-container"
        v-if="
          getSectors(getter_UserProfileReadOnly.distinct_sectors_with_exp_per)
            .length > 0
        "
      >
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold"
            >Sector Experience</span
          >
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 pt-5">
          <div
            class=""
            v-for="(sector, index) in getSectors(
              getter_UserProfileReadOnly.distinct_sectors_with_exp_per
            )"
            :key="index"
          >
            <div class="flex justify-between pb-1">
              <span class="text-[16px] font-light text-[#222]">
                {{ getSingleSectorName(sector.id) }}
              </span>
              <span class="text-[12px] font-bold text-[#222]">
                {{ sector.value }}/{{
                  getter_UserProfileReadOnly.user_details[0].total_exp
                }}
              </span>
            </div>

            <ProgressBar
              :value="sector.percentage"
              :unstyled="true"
            ></ProgressBar>
          </div>
        </div>
        <div
          v-if="
            getter_UserProfileReadOnly.distinct_sectors_with_exp_per.length > 4
          "
          class="flex justify-end mt-2"
        >
          <button
            v-if="!showMoreSectors"
            class="cursor-pointer text-xs text-[#333]"
            @click="showMoreSect()"
          >
            See More...
          </button>
          <button
            v-if="showMoreSectors"
            class="cursor-pointer text-xs text-[#333]"
            @click="showMoreSect()"
          >
            See Less
          </button>
        </div>
      </div>
      <div
        class="px-10 py-4 m-2 profile-container"
        v-if="
          getter_UserProfileReadOnly.software_proficiencies
            .software_proficiencies.length > 0
        "
      >
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold"
            >Software Proficiency</span
          >
        </div>
        <div
          class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 pt-4"
        >
          <div
            class="flex"
            v-for="(software_proficiency, index) in getter_UserProfileReadOnly
              .software_proficiencies.software_proficiencies"
            :key="index"
          >
            <div
              v-if="software_proficiency.stars && software_proficiency.software"
            >
              <Donut :data="software_proficiency.stars" />
              <div class="text-center mt-1">
                <p class="text-[#222] text-[16px] font-bold">
                  {{ software_proficiency.software }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="px-10 py-4 m-2 profile-container"
        v-if="
          getCompanyDetails(getter_UserProfileReadOnly.org_details).length > 0
        "
      >
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold"
            >Companies Worked With</span
          >
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 pt-4">
          <div
            class="flex flex-col items-start"
            v-for="(company, index) in getCompanyDetails(
              getter_UserProfileReadOnly.org_details
            )"
            :key="index"
          >
            <div class="company-image flex justify-center">
              <img src="../../assets/Company-Dummy-Icon.svg" alt="company" />
            </div>
            <div class="mt-1">
              <p class="text-[#222] text-[16px] font-medium">
                {{ company.organization.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="px-10 py-4 m-2 profile-container"
        v-if="getter_UserProfileReadOnly.achievements.achievements.length > 0"
      >
        <div>
          <span class="text-[#D96F20] text-[20px] font-bold">Achievements</span>
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
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "ExternalUserProfileSkeleton",
  components: {
    Skeleton,
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
/* .experience-flag {
  width: 200px;
  height: 36px;
  background: #222;
  right: 0;
  display: flex;
  align-items: center;
  position: absolute;
} */
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
/* .company-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #222;
  background: #fff;
} */
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
  /* .experience-flag {
    width: 166px;
    height: 36px;
    background: #222;
    right: 0;
    display: flex;
    align-items: center;
    position: absolute;
  } */
}
</style>
