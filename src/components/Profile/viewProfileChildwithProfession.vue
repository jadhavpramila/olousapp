<template>
  <div>
    <!-- //////// Personal Details Section ///////// -->
    <div class="personal-details max-w-5xl">
      <div
        class="personal-inner grid md:grid-cols-8 lg:grid-cols-8 bg-[#e3d4d4]"
      >
        <div
          class="user-photo md:col-span-2 lg:col-span-2 gap-x-8 mt-[4rem] mb-[24px]"
        >
          <div class="flex flex-row md:flex-col mt-[40px]">
            <div class="demo">
              <div class="ellipse lg:w-[200px] md:w-[163px] w-[155px]">
                <div class="profile-img">
                  <img
                    class="rounded-full"
                    src="../../assets/veerendraKhot.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              class="font-test20 md:col-span-2 lg:col-span-2 flex justify-end lg:hidden md:hidden"
            >
              <div class="py-16 flex justify-end mr-5">
                <img class="" src="../../assets/tag2.png" alt="" />
                <div class="year-tag-sm absolute">
                  <div class="text-[#FFFFFF] top-2">
                    <span class="font-bold text-sm">20</span>
                    <span class="font-normal text-xs">
                      Years Of Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="content-inner md:col-span-4 lg:col-span-4 px-7 text-left pl-7 md:pt-[120px]"
        >
          <span
            class="lg:text-2xl font-bold leading-8 text-[22px] lg:leading-[33px] md: leading-[1.878rem]"
            >Veerendra Khot
          </span>
          <p
            class="font-normal text-sm leading-6 lg:text-base md:text-sm lg:leading-[1.366rem] md:leading-[1.195rem] leading-[1.195rem]"
          >
            Co Founder At Vadcore
          </p>
          <p
            class="leading-5 md:font-normal text-xs font-normal lg:text-sm lg:leading-[1.195rem] md:leading-[1.195rem] leading-[1.024rem]"
          >
            Pune, Maharashtra, India
          </p>
          <p
            class="text-sm leading-5 font-semibold my-2 lg:text-sm lg:leading-[1.195rem] md:leading-[1.195rem] leading-[1.195rem]"
          >
            Univesity of Greenwich , London, UK
          </p>
          <p
            class="leading-5 mt-4 lg:text-sm md:text-sm md:font-bold text-sm font-bold"
          >
            Tech & Digital Construction
          </p>
          <p
            class="md:text-base lg:text-base leading-8 my-10 text-base font-bold lg:leading-[1.366rem] md:leading-[1.366rem] leading-[1.366rem]"
          >
            5.6K Followers | 65.5K Following
          </p>

          <div class="btn-profile lg:flex lg:flex-row flex flex-row">
            <button
              class="lg:text-base btn1 md:px-6 lg:w-[124px] md:w-[105px] lg:h-[44px] w-[90px] md:h-[44px] md:text-center hover:bg-[#D96F20] hover:border-0 text-[#222222] hover:text-white rounded-3xl border border-[#222222] md:text-sm text-sm font-bold py-2 lg:pl-6"
            >
              Follow
            </button>
            <button
              class="lg:text-base btn2 md:px-6 lg:w-[124px] lg:h-[44px] md:w-[105px] md:h-[44px] w-[90px] hover:bg-[#D96F20] hover:border-0 text-[#222222] hover:text-white font-bold py-2 px-2 ml-4 rounded-3xl text-sm border border-[#222222] pl-2"
            >
              Message
            </button>
            <button
              class="lg:text-base btn3 lg:w-[124px] lg:h-[44px] md:w-[105px] w-[100px] md:h-[44px] md:px-6 w-[90px] hover:bg-[#D96F20] hover:border-0 text-[#222222] hover:text-white font-bold py-2 px-2 ml-4 rounded-3xl border border-[#222222] pl-2 text-sm"
            >
              Activities
            </button>
          </div>
        </div>
        <div class="">
          <div
            class="font-test30 md:col-span-2 lg:col-span-2 gap-x-8 md:mt-[40px] lg:pt-[70px] md:pt-[70px] hidden md:block"
          >
            <div class="flex justify-end lg:mt-[20px] md:mt-[15px]">
              <img class="" src="../../assets/tag2.png" alt="" />
              <div class="year-tag absolute">
                <div class="text-[#FFFFFF] top-2">
                  <span class="text-base font-bold md:text-sm lg:text-base"
                    >30</span
                  >
                  <span class="font-normal text-sm md:text-xs lg:text-sm">
                    Years Of Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ///////////// Professional Progress-Bar //////// -->

    <div
      class="professional-progress-bar max-w-5xl lg:pb-[45px] md:pb-[37px] pb-[37px]"
    >
      <div class="prof-progress-bar-inner lg:mx-[60px] md:mx-[30px] mx-[15px]">
        <div class="row-span-1">
          <div class="test1 pt-4 pb-4">
            <span
              class="font-bold text-[#D96F20] text-lg lg:text-xl lg:leading-[1.708rem] md:leading-[1.708rem] leading-[1.537rem]"
              >Profession Experience</span
            >
          </div>
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-col-1 gap-[25px]">
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between pt-[8px]">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Business Owner</span
              >
              <span class="exp-value text-[#222222]">5/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="20"
            >
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Business development</span
              >
              <span class="exp-value text-[#222222]">3.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="3.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
              >
                Project Manager</span
              >
              <span class="exp-value text-[#222222]">8.7/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="8.7"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>

          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Architecture</span
              >
              <span class="exp-value text-[#222222]">2.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="2.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Construction Management</span
              >
              <span class="exp-value text-[#222222]">1.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF]h-[0.375rem]"
              :value="1.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
        </div>
      </div>
    </div>

    <!-- //////////// Sector Progress Bar  ///////// -->

    <div
      class="professional-progress-bar max-w-5xl lg:pb-[45px] md:pb-[37px] pb-[37px]"
    >
      <div class="prof-progress-bar-inner lg:mx-[60px] md:mx-[30px] mx-[15px]">
        <div class="row-span-1">
          <div class="test1 pt-4 pb-4">
            <span
              class="font-bold text-[#D96F20] text-lg lg:text-xl lg:leading-[1.708rem] md:leading-[1.708rem] leading-[1.537rem]"
              >Sector Experience</span
            >
          </div>
        </div>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-col-1 gap-[25px]">
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between pt-[8px]">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Urban Development</span
              >
              <span class="exp-value text-[#222222]">5/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="20"
            >
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Hospitality</span
              >
              <span class="exp-value text-[#222222]">3.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="3.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
              >
                Education</span
              >
              <span class="exp-value text-[#222222]">8.7/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="8.7"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>

          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Mixed Use</span
              >
              <span class="exp-value text-[#222222]">2.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF] h-[0.375rem]"
              :value="2.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Leisure & Sports
              </span>
              <span class="exp-value text-[#222222]">1.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF]h-[0.375rem]"
              :value="1.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
          <div class="card-bar">
            <div class="test2 flex flex-row justify-between">
              <span
                class="text-[#222222] lg:text-base lg:leading-[1.366rem] lg:font-normal md:font-normal font-normal"
                >Retail
              </span>
              <span class="exp-value text-[#222222]">1.1/20</span>
            </div>
            <ProgressBar
              class="lg:border-2 lg:mt-2 md:mt-2 mt-2 lg:h-[0.375rem] h-[0.375rem] md:h-[0.375rem] :value-[#FFFFFF]h-[0.375rem]"
              :value="1.1"
            >
              <!-- {{ fixed }}/{{ input }} -->
            </ProgressBar>
          </div>
        </div>
      </div>
    </div>

    <!-- /////// Software Efficiency  //////// -->

    <div
      class="software-proficiency-bar max-w-5xl lg:pb-[27px] md:pb-[37px] pb-[37px]"
    >
      <div class="prof-progress-bar-inner lg:ml-[60px] md:ml-[30px] ml-[15px]">
        <div class="test1 pt-4 pb-4 row-span-1">
          <span
            class="font-bold text-[#D96F20] text-lg lg:text-xl lg:leading-[1.708rem] md:leading-[1.708rem] leading-[1.537rem]"
            >Software Proficiency</span
          >
        </div>
        <div class="grid grid grid-cols-3 lg:grid-cols-6 md:grid-cols-6 gap-1">
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Project
              </p>
            </div>
          </div>
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Office
              </p>
            </div>
          </div>
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Project
              </p>
            </div>
          </div>
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Office
              </p>
            </div>
          </div>
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Project
              </p>
            </div>
          </div>
          <div>
            <div class="circular-progress-bar-inner">
              <Donut />
            </div>
            <div class="mt-2">
              <p
                class="text-[#222222] lg:text-base text-base font-bold lg:leading-[1.366rem]"
              >
                MS Office
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ///////// Company List //////// -->

    <div class="company-list max-w-5xl pb-[37px]">
      <div class="company-list-inner lg:ml-[60px] md:ml-[30px] ml-[15px]">
        <div class="inner-company pt-4 pb-4">
          <span
            class="font-bold text-[#D96F20] lg:text-xl md:text-xl text-lg lg:leading-[1.708rem] md:leading-[1.708rem] leading-[1.688rem]"
            >Companies Work With</span
          >
          <div
            class="mt-4 lg:py-4 grid grid-cols-2 gap-8 text-gray-900 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 dark:text-white"
          >
            <div class="flex flex-col">
              <img src="../../assets/WSP.png" alt="" />
              <span class="pt-[8px]">WSP in the UK</span>
            </div>
            <div class="flex flex-col">
              <img src="../../assets/CB.png" alt="" />
              <span class="pt-[8px]">Currie & Brown</span>
            </div>
            <div class="company-grp flex flex-col">
              <img src="../../assets/UOG.png" alt="" />
              <span class="pt-[8px]">University of Greenwich</span>
            </div>
            <div class="flex flex-col">
              <img src="../../assets/Mace.png" alt="" />
              <span class="pt-[8px]">Mace</span>
            </div>

            <div class="flex flex-col">
              <img src="../../assets/Optimus.png" alt="" />
              <span style="width: 149px" class="pt-[8px]"
                >Optimus Engineering Pvt Ltd</span
              >
            </div>
            <div class="flex flex-col">
              <img src="../../assets/IPMA.png" alt="" />
              <span class="pt-[8px]">IPMA Young Crew</span>
            </div>
            <div class="flex flex-col lg:pr-[31px]">
              <img src="../../assets/COEP.png" alt="" />
              <span class="pt-[8px]">College of Engineering Pune</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ///////// Achievements /////////  -->

    <div
      class="achievements-list max-w-5xl bg-[#FFFFF1] lg:pb-[43px] md:pb-[34px] pb-[100px]"
    >
      <div style="padding-top: 32px">
        <span
          class="text-[#D96F20] text font-bold text-xl md:ml-7 lg:ml-[60px] ml-[14px]"
          style="padding-top: 32px"
          >Achievements</span
        >
        <div
          class="lg:ml-[60px] md:ml-[30px] lg:w-[804px] md:w-[688px] ml-[30px]"
        >
          <ul
            class="text-[#000000] ps-16 list-disc lg:text-base md:text-base text-base md:mx-7"
            style="line-height: 28px; padding-top: 16px"
          >
            <li>
              Won "Young Project Manager" Award Conducted by Association of
              Project Management, UK.
            </li>
            <li>
              Served as Board Member - International Project Management
              Association (IPMA) Young Crew (Platform for Young Project
              Management Professionals around the world).
            </li>
            <li>
              Successfully completed 10K runs to raise funds for British Heart
              Foundation, UK.
            </li>
            <li>Built a Tech Startup in Construction and Real Estate Space.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Donut from "../common/Donut.vue";
import ProgressBar from "primevue/progressbar";
import { computed, onMounted } from "vue";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "viewProfileChildwithProfession",
  components: {
    Donut,
    ProgressBar,
  },

  async setup(props, context) {
    const store = useStore();
    const route = useRoute();
    let getter_UserProfile = computed(
      () => store.getters["UserProfile/getter_UserProfile"]
    );

    console.log(getter_UserProfile);

    await fetchUserProfile();

    async function fetchUserProfile() {
      if (userSlug) {
        await store
          .dispatch("UserProfile/action_getUserProfile", userSlug)
          .then(() => {
            commit("commit_UserProfile", response.data.data);
            resolve();
          })
          .catch((error) => {
            console.log(error.message);
            reject(error);
          });
      }
    }
    return {
      getter_UserProfile,
      // isloadpage,
      // isShowProfile,
      fetchUserProfile,
    };
  },
};
</script>

<style scoped>
/* ////// Personal Details CSS /////// */

.personal-details {
  background-color: #e3d4d4;
  color: black;
}

@media screen and (min-width: 320px) {
  .content-inner {
    margin-left: -11px;
    padding-top: -74px;
  }
  .ellipse {
    height: 155px;
    width: 155px;
    background-color: #eae8e8;
    margin-left: 12px;
    border-radius: 100%;
    border: 1px solid;
    border-color: #222222;
  }

  .profile-img img {
    width: 138px;
    height: 139px;
    border-radius: 52%;
    position: absolute;
    top: 112px;
    left: 36px;
  }

  .font-test20 {
    width: 170px;
    position: absolute;
    right: -4px;
  }
  /* .font-test30 {
    display: none;
  } */

  .year-tag-sm {
    padding-right: 6px;
    padding-top: 2px;
    text-align: center;
  }
  /* .btn-profile .test1 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  } */
  /* .btn-profile .test2 {
    padding-left: 1.5rem;
    padding-right: 5.5rem;
  } */
  /* .btn-profile .btn3 {
    padding-left: 1.5rem;
    padding-right: 6.5rem;
  } */
  .btn-profile {
    margin-left: 0px;
    padding-bottom: 26px;
  }
}
@media screen and (min-width: 768px) {
  /* .user-photo {
    margin-top: 60px;
  } */
  .demo {
    margin-top: 47px;
  }
  .content-inner {
    padding-top: 120px !important;
  }
  .ellipse {
    height: 163px;
    width: 163px;
    background-color: #eae8e8;
    margin-left: 12px;
    border-radius: 52%;
    border: 1px solid;
    border-color: #222222;
  }

  .profile-img img {
    width: 144px;
    height: 145px;
    border-radius: 52%;
    position: absolute;
    top: 160px;
    left: 37px;
  }
  /* .font-test20 {
    display: none;
  } */
  .font-test30 {
    margin-left: 45px;
    position: absolute;
  }

  .btn-profile .test1 {
    padding-left: 2.5rem;
    padding-right: 6.5rem;
  }
  .btn-profile .test2 {
    padding-left: 2.5rem;
    padding-right: 6.5rem;
  }
  .btn-profile .test3 {
    padding-left: 2.5rem;
    padding-right: 6.5rem;
  }
  .btn-profile button {
    width: 105px;
  }
  .btn-profile button {
    width: 105px;
  }
  .btn-profile {
    margin-left: 0px;
  }
  .year-tag {
    padding-right: 21px;
    padding-top: 3px;
    text-align: center;
  }
}
@media screen and (min-width: 1024px) {
  /* .content-inner {
    margin-top: 60px !important;
  } */
  .demo {
    margin-top: 30px !important;
  }

  .user-photo {
    margin-top: 48px !important;
  }
  .ellipse {
    height: 200px;
    width: 200px;
    background-color: #eae8e8;
    margin-left: 12px;
    border-radius: 52%;
    border: 1px solid;
    border-color: #222222;
  }

  .profile-img img {
    width: 178px;
    height: 178px;
    border-radius: 52%;
    position: relative;
    left: 10px;
    top: 10px;
  }
  /* .font-test20 {
    display: none;
  } */

  .font-test30 {
    width: 200px;
    margin-left: 56px;
    /* position: absolute; */
  }
  .btn-profile .test1 {
    /* padding-left: 1.5rem; */
    /* width: 124px; */
    /* padding-right: 1.5rem; */
  }
  .btn-profile .test2 {
    /* padding-left: 1.5rem; */
    /* width: 124px; */
    padding-bottom: 12px;
    /* padding-right: 6.5rem; */
  }
  .btn-profile .test3 {
    /* padding-left: 1.5rem; */
    /* width: 124px; */

    /* padding-right: 7.5rem; */
  }
  .btn-profile {
    margin-left: 0px;
  }
  .year-tag {
    padding-right: 24px;
    padding-top: 6px;
    text-align: center;
  }
}

/*  /////// All Progress Bars CSS ////// */

.professional-progress-bar {
  background-color: #f9eeee;
}
.sector-progress-bar {
  background-color: #f8f6f6;
}
@media screen and (min-width: 320px) {
  :deep(.p-progressbar) {
    /* width: 320px !important; */
  }
}
@media screen and (min-width: 768px) {
  .prof-progress-bar-inner {
    margin-left: 30px;
  }
  :deep(.p-progressbar) {
    /* width: 330px !important; */
  }
  .exp-value {
    padding-right: 0px !important;
  }

  .test2 {
    padding-top: 18px !important;
  }
}
@media screen and (min-width: 1024px) {
  .prof-progress-bar-inner {
    margin-left: 61px;
  }
  .test2 {
    display: flex;
  }
  :deep(.p-progressbar) {
    /* width: 360px !important; */
  }

  .exp-value {
    padding-right: 0px !important;
  }
}
.test2 {
  display: flex;
}
.html {
  width: 80%;
}
.card-bar .progressbar {
  height: 0.5rem;
}
.p-progressbar .p-progressbar-label {
  /* color: #67625d; */
  display: none !important;
}
:deep(.p-progressbar .p-progressbar-value) {
  background: #67625d !important;
}
:deep(.p-progressbar .p-progressbar-label) {
  display: none !important;
}

:deep(.p-progressbar) {
  border: 1px solid #67625d !important;
  border-radius: 4px;
}
/* /////////////////////////////////////////// */

/* ////////// Software Proficiency CSS //////// */

.software-proficiency-bar {
  background-color: #f1ecec;
}
@media screen and (min-width: 360px) {
  .circular-progress-bar-inner {
    padding-right: 130px !important;
  }
}

@media screen and (min-width: 768px) {
  .circular-progress-bar-inner {
    padding-right: 50px !important;
  }
}
@media screen and (min-width: 1024px) {
  .circular-progress-bar-inner {
    padding-right: 84px !important;
  }
}
/* /////////////////////////////////////////////// */

/* ///////// Company List CSS ///////// */
.company-list {
  background: #ede5e5;
}
.inner-company img {
  width: 100px;
}
@media screen and (min-width: 768px) {
  .inner-company img {
    margin-left: 0px;
  }
}
/* ///////////////////////////////////// */

/* //////////// Achievements CSS  ////////// */
.achievements-list {
  background-color: #fcf3f3;
  padding-bottom: 20px;
}

.achievements-list ul li {
  line-height: 28px;
}
/* /////////////////////////////////////// */
</style>
