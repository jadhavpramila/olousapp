<template>
  <div class="flex py-10 bg-[#101010] padding-left-right-home">
    <div
      class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-16 gap-8"
    >
      <div class="flex w-full">
        <div class="grid grid-cols-2 gap-4">
          <img :src="getStaticImage('Tia-Kim.png')" alt="Tia-Kim" />
          <img :src="getStaticImage('Matt-Syim.png')" alt="Matt-Syim" />
          <img
            :src="getStaticImage('Nivedita-Mishra.png')"
            alt="Nivedita-Mishra"
          />
          <img :src="getStaticImage('Rohan-Kotak.png')" alt="Rohan-Kotak" />
        </div>
      </div>
      <div class="flex flex-col h-full w-full justify-center">
        <div class="static-data-title flex">Network</div>
        <div class="static-data-content lg:pt-10 md:pt-10 pt-6 flex">
          Connect with Global Professionals- Architects,Civil Engineers, Design
          and Interiors BIM and more…..
        </div>
        <div class="flex w-auto pt-10">
          <button class="btn btn-connect" @click="clickConnect()">
            <!-- <img
              src="../../assets/Connect-Button.svg"
              alt="Connect"
              class="cursor-pointer w-1/2"
            /> -->
            Connect
          </button>
        </div>
      </div>
    </div>
  </div>
  <hr class="border border-2 border-[#1b1a1a] bg-[#1b1a1a]" />
  <div class="flex py-10 bg-[#0a0a0a] padding-left-right-home">
    <div
      class="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 flex flex-col-reverse lg:gap-16 md:gap-16 gap-8"
    >
      <div class="flex flex-col h-full w-full justify-center">
        <div class="static-data-title flex">Business</div>
        <div class="static-data-content flex lg:pt-10 md:pt-10 pt-6">
          Find the right construction services and products for contractors,
          architects, BIM professionals and construction equipments are now just
          a click away!
        </div>
        <div class="flex w-auto pt-10">
          <button class="btn btn-connect" @click="clickExploreBusiness()">
            <!-- <img
              src="../../assets/Explore-Button.svg"
              alt="Explore"
              class="cursor-pointer w-1/2"
            /> -->
            Explore
          </button>
        </div>
      </div>
      <div class="flex w-full">
        <div class="grid grid-cols-2 gap-4">
          <img :src="getStaticImage('Architecture.png')" alt="Architecture" />
          <img :src="getStaticImage('BIM.png')" alt="BIM" />
          <img :src="getStaticImage('Contractors.png')" alt="Contractors" />
          <img :src="getStaticImage('Equipments.png')" alt="Equipments" />
        </div>
      </div>
    </div>
  </div>
  <hr class="border border-2 border-[#1b1a1a] bg-[#1b1a1a]" />
  <div class="flex py-10 bg-[#101010] padding-left-right-home">
    <div
      class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-16 gap-8"
    >
      <div class="flex w-full">
        <div class="grid grid-cols-2 gap-4">
          <img :src="getStaticImage('Job-Home-1.png')" alt="JobImage1" />
          <img :src="getStaticImage('Job-Home-2.png')" alt="JobImage2" />
          <img :src="getStaticImage('Job-Home-3.png')" alt="JobImage3" />
          <img :src="getStaticImage('Job-Home-4.png')" alt="JobImage4" />
        </div>
      </div>
      <div class="flex flex-col h-full w-full justify-center">
        <div class="static-data-title flex">Jobs</div>
        <div class="static-data-content flex lg:pt-10 md:pt-10 pt-6">
          Looking for a Career opportunity in construction? Apply to trending
          jobs with our Infographic CV.
        </div>
        <div class="flex w-auto pt-10">
          <button class="btn btn-connect" @click="clickApply()">
            <!-- <img
              src="../../assets/Apply-Button.svg"
              alt="Apply"
              class="cursor-pointer w-1/2"
            /> -->
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
  <hr class="border border-2 border-[#1b1a1a] bg-[#1b1a1a]" />
  <div class="flex py-10 bg-[#0a0a0a] padding-left-right-home">
    <div
      class="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 flex flex-col-reverse lg:gap-16 md:gap-16 gap-8"
    >
      <div class="flex flex-col h-full w-full justify-center">
        <div class="flex static-data-title">Top Headlines</div>
        <div class="flex static-data-content lg:pt-10 md:pt-10 pt-6">
          Get construction industry insights, architecture news, technology
          updates, and everything trending weekly
        </div>
        <div class="flex w-auto pt-10">
          <button class="btn btn-connect" @click="clickExploreHeadlines()">
            <!-- <img
              src="../../assets/Explore-Button.svg"
              alt="Expolre"
              class="cursor-pointer w-1/2"
            /> -->
            Explore
          </button>
        </div>
      </div>
      <div class="flex w-full">
        <div class="grid grid-cols-2 gap-4">
          <img
            :src="getStaticImage('Top-Headlines-1.png')"
            alt="top-headlines1"
          />
          <img
            :src="getStaticImage('Top-Headlines-2.png')"
            alt="top-headlines2"
          />
          <img
            :src="getStaticImage('Top-Headlines-3.png')"
            alt="top-headlines3"
          />
          <img
            :src="getStaticImage('Top-Headlines-4.png')"
            alt="top-headlines4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import appConstants from "../../appConstants.js";
export default {
  name: "HomeStaticData",
  setup() {
    const router = useRouter();

    function clickConnect() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_PROFILE,
      });
    }
    function clickExploreBusiness() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
      });
    }
    function clickApply() {
      router.push({ name: appConstants.routes.JOBS });
    }
    function clickExploreHeadlines() {
      router.push({
        name: appConstants.routes.DEFAULT_SEARCH_HEADLINES,
      });
    }

    return {
      clickConnect,
      clickExploreBusiness,
      clickApply,
      clickExploreHeadlines,
    };
  },
};
</script>

<style>
.static-data-title {
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
.static-data-content {
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
}
.btn-connect {
  width: 150px;
  height: 48px;
  font-size: 18px;
  /* margin: 50px 272.4px 0 0; 
  padding: 12.5px 37.5px 13.5px 36.5px;*/
  border-radius: 28px;
  border: solid 2px #fff;
  background: transparent;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .btn-connect {
    width: 100px;
    height: 40px;
    font-size: 14px;
    /* margin: 50px 272.4px 0 0; 
    padding: 12.5px 15.5px 13.5px 15.5px;*/
    border-radius: 28px;
    border: solid 2px #fff;
    background: transparent;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .static-data-title {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.14;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
  .static-data-content {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #fff;
  }
}
</style>
