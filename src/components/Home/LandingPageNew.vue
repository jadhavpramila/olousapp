<template>
  <div
    class="flex justify-center items-center app-bg-white text-center flex-col"
  >
    <div class="content-max-width lg:px-0 md:px-2 px-4">
      <div>
        <div class="body-top-head">
          <h3 class="top-heads">
            Top<span class="app-text-color-primary"> Digital Platform</span> For
            Construction <br />
            & Real Estate Industry
          </h3>
        </div>
        <p class="header-subtitles">
          It Is One Stop Platform For Jobs, Network, Business & Learning
        </p>
      </div>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:mt-16 md:mt-10 mt-5"
      >
        <div class="flex justify-center cursor-pointer mb-4">
          <div
            class="box-borders relative flex items-end justify-center app-bg-white"
            @click="businessClick()"
          >
            <div class="inner-square-box absolute">Business</div>
            <div class="flex items-center justify-center h-full">
              <img
                class="box-img"
                src="../../assets/landingpagenew/landing_business.png"
                alt="Your Image Alt Text"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center cursor-pointer mb-4">
          <div
            class="box-borders relative flex items-end justify-center app-bg-white"
            @click="jobClick()"
          >
            <div class="inner-square-box absolute">Jobs</div>
            <div class="flex items-center justify-center h-full">
              <img
                class="box-img"
                src="../../assets/landingpagenew/landing_jobs.png"
                alt="Your Image Alt Text"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center cursor-pointer mb-4">
          <div
            class="box-borders relative flex items-end justify-center app-bg-white"
            @click="networkClick()"
          >
            <div class="inner-square-box absolute">Network</div>
            <div class="flex items-center justify-center h-full">
              <img
                class="box-img"
                src="../../assets/landingpagenew/landing_network.png"
                alt="Your Image Alt Text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--section scrolling logo-->
  <div class="app-bg-color-secondary lg:mt-[61px] mt-5">
    <div
      class="content-max-width lg:py-10 md:py-10 py-6 lg:mx-auto md:mx-0 mx-4"
    >
      <div class="flex justify-center items-center">
        <div class="line-ver mr-4"></div>
        <p class="logo-title">Trusted By Leading Companies</p>
        <div class="line-ver ml-4"></div>
      </div>

      <div
        class="flex overflow-auto hide-scrollbar justify-center lg:mt-[33px] md:mt-5 mt-5"
      >
        <div class="flex">
          <!-- <img src="../../assets/img/prev_arrow.png" alt="" /> -->
          <div class="imagegroup lg:mr-[130px] md:mr-[125px] mr-[50px]">
            <img src="../../assets/fidesto_logo.svg" alt="" class="" />
            <img src="../../assets/zameel_steel_logo.svg" alt="" class="" />
            <img src="../../assets/kumar_properties_logo.svg" alt="" class="" />
            <img src="../../assets/malpani_logo.svg" alt="" class="" />
            <img src="../../assets/gera_logo.svg" alt="" class="" />
            <img src="../../assets/pride_world_city.svg" alt="" class="" />
            <img src="../../assets/kalptaru_logo.svg" class="" />
            <img src="../../assets/puranik_logo.svg" class="" />
            <img src="../../assets/shpoorji_pallonji_logo.svg" />
          </div>
          <div class="imagegroup">
            <img src="../../assets/fidesto_logo.svg" alt="" class="" />
            <img src="../../assets/zameel_steel_logo.svg" alt="" class="" />
            <img src="../../assets/kumar_properties_logo.svg" alt="" class="" />
            <img src="../../assets/malpani_logo.svg" alt="" class="" />
            <img src="../../assets/gera_logo.svg" alt="" class="" />
            <img src="../../assets/pride_world_city.svg" alt="" class="" />
            <img src="../../assets/kalptaru_logo.svg" class="" />
            <img src="../../assets/puranik_logo.svg" class="" />
            <img src="../../assets/shpoorji_pallonji_logo.svg" />
            <div class="arrow arrow-next"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--section scrolling logo-->
  <!--section 3-->
  <div class="">
    <div
      class="content-max-width lg:mt-10 md:mt-10 mt-6 lg:mx-auto md:mx-auto mx-4"
    >
      <h3 class="item-title">
        Unleash your growth potential with Olous features
      </h3>

      <div
        class="grid lg:grid-cols-10 md:grid-cols-4 grid-cols-4 gap-4 lg:mt-10 md:mt-10 mt-6"
      >
        <div class="lg:flex md:hidden hidden justify-center items-center"></div>
        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nbusinesshub.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Business Hub
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/njobsearch.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Job Search
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nlearningresource.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Learning Resources
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nresumebuilder.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Resume Builder
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nblogs_videos.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Blogs & Videos
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nbusiness_lead.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Business Lead
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nnetwork.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            Networking
          </span>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img src="../../assets/img/nnews_headlines.svg" />
          </div>
          <span
            class="ibox text-center flex items-start lg:flex md:hidden hidden mt-[30px]"
          >
            News & Headlines
          </span>
        </div>
      </div>
    </div>

    <!--slider-->
    <div class="features-details lg:mt-[41px] md:mt-[21px] mt-5">
      <div class="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 py-10">
        <div class="col-span-2">
          <!-- You can add content here if needed -->
        </div>
        <div class="slideshow-container mx-auto col-span-8 relative">
          <div class="Slides flex-center">
            <div class="mySlides">
              <div class="slider-text">
                Find the right construction services and products for
                contractors, architects, BIM professionals and construction
                equipments are now just a click away!
              </div>
            </div>
            <!--bussiness hub end-->
            <!--Job Search-->
            <div class="mySlides">
              <div class="slider-text">
                Stay updated on top jobs across India in the Construction
                Industry and apply effortlessly with our job application
                feature. Find jobs near me at ease and directly apply to
                vacancies..
              </div>
            </div>
            <!--Job Search end-->
            <!--learning resources-->
            <div class="mySlides">
              <div class="slider-text">
                Learn Construction with Olous. We publish informative Video and
                Image heavy content on Olous to keep you informed on various
                aspects and subjects of our Industry.
              </div>
            </div>
            <!--learning resources end-->
            <!--Resume builder-->
            <div class="mySlides">
              <div class="slider-text">
                Be Job ready with Olous. With our innovative tool, you will be
                able to build an amazing Infographic CV in minutes and with
                minimal effort. The CV template has been designed such that it
                will catch the eye of potential Employers and Recruiters.
              </div>
            </div>
            <!--Resume builder end-->
            <!--blog & video-->
            <div class="mySlides">
              <div class="slider-text">
                Explore Olous Vlogs for blogs and videos to update yourself with
                the latest trends and developments in the construction industry
              </div>
            </div>
            <!--blog & video end-->
            <div class="mySlides">
              <div class="slider-text">
                Get verified business leads matching your expertise and grow
                your business with Olous
              </div>
            </div>
            <!--business lead end-->
            <div class="mySlides">
              <div class="slider-text">
                Build your network with Olous. Connect with Top Construction
                Companies, Architectural Practices, Interior Design Firms,
                Construction Product Companies, MEP Design Firms, BIM Firms and
                many such other to deliver your projects and grow together as a
                community
              </div>
            </div>
            <div class="mySlides">
              <div class="slider-text">
                Stay professionally alert with Olous. We provide you with
                curated Global Construction Industry News and headlines to keep
                you informed on the latest in Construction Industry
              </div>
            </div>

            <!-- Other content here -->
          </div>
        </div>
        <div class="col-span-2">
          <!-- You can add content here if needed -->
        </div>
      </div>
    </div>
  </div>

  <!--section 3 end-->
  <div class="content-max-width lg:mt-[70px] md:mt-10 mt-6 p-4">
    <div
      class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 lg:gap-5 md:gap-4 gap-4"
    >
      <!--stat 1-->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="count-shadow lg:py-7 md:py-5 py-4">
          <img
            class="counters-icons"
            :src="getStaticImage('job_icon.svg')"
            alt="Available Jobs Icon"
          />
          <span class="count-no">1000+</span>
          <p class="c-strip">Available Jobs</p>
        </div>
      </div>
      <!--stat 1-->

      <!--stat 2-->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="count-shadow lg:py-7 md:py-5 py-4">
          <img
            class="counters-icons"
            :src="getStaticImage('olous_user.svg')"
            alt="Olous Users Icon"
          />
          <span class="count-no">100K+</span>
          <p class="c-strip">Olous Users</p>
        </div>
      </div>
      <!--stat 2 -->
      <!--stat 3-->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="count-shadow lg:py-7 md:py-5 py-4">
          <img
            class="counters-icons"
            :src="getStaticImage('resumeicon_v1.svg')"
            alt="Resumes Icon"
          />
          <span class="count-no">30,000</span>
          <p class="c-strip">Resumes</p>
        </div>
      </div>
      <!--stat 3 -->
      <!--stat 4-->
      <div class="flex flex-col items-center justify-center text-center">
        <div class="count-shadow lg:py-7 md:py-5 py-4">
          <img
            class="counters-icons"
            :src="getStaticImage('business_v2.svg')"
            alt="Businesses Icon"
          />
          <span class="count-no">5000</span>
          <p class="c-strip">Business</p>
        </div>
      </div>
    </div>
  </div>
  <!--section 4 start-->

  <!-- <div class="test-bg lg:mt-[70px] md:mt-0 mt-[27px]">
    <div class="content-max-width">
      <div class="">
        <h3 class="feedback-title lg:pt-[50px] md:pt-4 pt-4 pb-5">
          Real Stories from Real People
        </h3>
      </div>
      <div class="carousel-container pb-10">
        <div class="carousel-content-slide flex-center">
          <div class="carousel-content mx-auto">
            <div class="feedback-dd">
              Thanks to Olous App. | landed my dream job! The platform’s
              user-friendly interfaceand job matching algorithm made the job
              search process efficient and enjoyable. The wide range of job
              listings and the ability to customize my search preferences were
              particularly helpful, also appreciated the email notifications for
              new job postings. Overall, Olous App played a pivotal role in
              helping me secure this fantastic opportunity highly recommendit to
              anyone seeking their next career move
            </div>
            <div class="flex justify-center mt-8">
              <div class="line-testi mt-7"></div>
              <div>
                <p class="testi-name mx-auto">Ganesh Dushing</p>
                <p class="testi-name mx-auto">Zamil Steel Buildings</p>
              </div>
              <div class="line-testi mt-7"></div>
            </div>
          </div>
          <div class="carousel-content mx-auto">
            <div class="feedback-dd">
              Really helped with my search for employment, kept me informed at
              all times and were in contact regularly to give any updates.I
              would definitely recommend Olous transformed my job search
              experience. Their platform connected me with my dream job,offering
              incredible opportunities. The user-friendly interface and
              personalized support were outstanding. Olous made my job search
              efficient, ultimately helping me secure my ideal position. Im
              grateful for their invaluable assistance
            </div>
            <div class="flex justify-center mt-8">
              <div class="line-testi mt-7"></div>
              <div>
                <p class="testi-name">Jyoti Bade</p>
                <p class="testi-name">Kumar Properties</p>
              </div>
              <div class="line-testi mt-7"></div>
            </div>
          </div>
          <div class="carousel-content mx-auto">
            <div class="feedback-dd">
              Thanks to Olous, I secured my dream job! Their platform offered a
              seamless job search experience,with valuable resources and a
              supportive community. The personalized job recommendations were
              spot-on.Olous truly made my job hunt efficient and effective.
              Grateful for this opportunity
            </div>
            <div class="flex justify-center mt-8">
              <div class="line-testi mt-7"></div>
              <div>
                <p class="testi-name">Sourabh Kinekar</p>
                <p class="testi-name">Aksha Engineering</p>
              </div>

              <div class="line-testi mt-7"></div>
            </div>
          </div>

          <a
            class="prev absolute left-0 top-1/2 transform -translate-y-1/2"
            @click="nextslide(-1)"
            >❮</a
          >
          <a
            class="next absolute right-0 top-1/2 transform -translate-y-1/2"
            @click="nextslide(1)"
            >❯</a
          >
        </div>
      </div>
   
    </div>
  </div> -->
  <div class="app-bg-color-secondary mt-10">
    <div class="content-max-width pb-10 lg:px-0 md:px-2 px-4 pb-10">
      <div class="">
        <h3 class="feedback-title lg:py-10 md:py-8 py-6">
          Real Stories from Real People
        </h3>
      </div>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-5 gap-5"
      >
        <div
          class="app-bg-white testi-card"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div class="flex mb-6">
            <img src="../../assets/landingpagenew/star_blue.svg" alt="star" />
            <img src="../../assets/landingpagenew/star_blue.svg" alt="star" />
            <img src="../../assets/landingpagenew/star_blue.svg" alt="star" />
            <img src="../../assets/landingpagenew/star_blue.svg" alt="star" />
            <img src="../../assets/landingpagenew/star_blue.svg" alt="star" />
          </div>

          <div>
            <ReadMoreLessVue
              :content="testimonial.content"
              :maxLimit="250"
            ></ReadMoreLessVue>
            <h4 class="head mt-10">{{ testimonial.from }}</h4>
            <h4 class="text-sm font-light mt-1" v-if="testimonial.company">
              {{ testimonial.company }}
            </h4>
            <h4 class="text-sm font-light mt-1" v-if="testimonial.designation">
              {{ testimonial.designation }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <HomeFooter></HomeFooter>
</template>
<script>
import { ref, onMounted } from "vue";
import Galleria from "primevue/galleria";
import { getCurrentInstance } from "vue";
import Carousel from "primevue/carousel";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import HomeFooter from "./HomeFooter.vue";
import ReadMoreLessVue from "../common/ReadMoreLess.vue";

export default {
  name: "LandingPage",
  components: {
    Galleria,
    Carousel,
    HomeFooter,
    ReadMoreLessVue,
  },
  setup() {
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    const router = useRouter();
    const route = useRoute();
    const clientLogos = ref([
      {
        logo: "/src/assets/fidesto_logo.svg",
      },
      {
        logo: "/src/assets/zameel_steel_logo.svg",
      },
      {
        logo: "/src/assets/kumar_properties_logo.svg",
      },
      {
        logo: "/src/assets/malpani_logo.svg",
      },
      {
        logo: "/src/assets/gera_logo.svg",
      },
      {
        logo: "/src/assets/pride_world_city.svg",
      },
      {
        logo: "/src/assets/kalptaru_logo.svg",
      },
      {
        logo: "/src/assets/puranik_logo.svg",
      },
      {
        logo: "/src/assets/shpoorji_pallonji_logo.svg",
      },
    ]);
    const testimonials = ref([
      {
        content:
          "Thanks to Olous App. | lasnded my dream job! The platform's user-friendly interface" +
          "and job matching algorithm made the job search process efficient and enjoyable. " +
          "The wide range of job listings and the ability to customize my search preferences " +
          "were particularly helpful, also appreciated the email notifications for new job postings. " +
          "Overall, Olous App played a pivotal role in helping me secure this fantastic opportunity " +
          "highly recommendit to anyone seeking their next career move",
        from: "Ganesh Dushing",
        company: "Zamil Steel Buildings",
        designation: "",
      },
      {
        content:
          "Really helped with my search for employment, kept me informed at all times and were in " +
          "contact regularly to give any updates.I would definitely recommend " +
          "Olous transformed my job search experience. Their platform connected me with my dream job," +
          "offering incredible opportunities. The user-friendly interface and personalized support " +
          "were outstanding. Olous made my job search efficient, ultimately helping me secure my ideal position. " +
          "Im grateful for their invaluable assistance",
        from: "Jyoti Bade",
        company: "Kumar Properties",
        designation: "",
      },
      {
        content:
          "Thanks to Olous, I secured my dream job! Their platform offered a seamless job search experience," +
          "with valuable resources and a supportive community. The personalized job recommendations were spot-on." +
          "Olous truly made my job hunt efficient and effective. Grateful for this opportunity",
        from: "Saurabh Kinekar",
        company: "Aksha Engineering",
        designation: "",
      },
      // {
      //   content:
      //     "It is a long established fact that a reader will be distracted by the readable content of a " +
      //     "page when looking at its layout.",
      //   from: "Mrunmayee Deshpande",
      //   company: "",
      //   designation: "UI/UX Designer",
      // },
    ]);
    onMounted(() => {
      showSlides();
      featuresSlider();
      stopSlideTimer();
      //showNextslide();
    });
    function featuresSlider() {
      document
        .querySelector(".features-box")
        .addEventListener("click", function () {
          this.classList.toggle("clicked");
        });

      // Get all feature boxes
      const featureBoxes = document.querySelectorAll(".feature-box");

      // Get all slides
      const slides = document.querySelectorAll(".mySlides");

      // Loop through each feature box and add event listener for hover
      featureBoxes.forEach((box, index) => {
        box.addEventListener("mouseover", () => {
          // Hide all slides
          slides.forEach((slide) => (slide.style.display = "none"));
          // Show the corresponding slide
          slides[index].style.display = "block";
        });
      });
    }

    let slideIndex = 0;
    let slideTimer; // Declare a variable to store the timer ID

    function showSlides() {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      slideTimer = setTimeout(showSlides, 8000); // Change slide every 8 seconds (8000 milliseconds)
    }

    // Call this function to stop the slider timer
    function stopSlideTimer() {
      clearTimeout(slideTimer);
    }

    // Function to navigate to the next or previous slide
    function plusSlides(n) {
      showSlides((slideIndex += n));
    }
    // let nextIndex = 0;
    // function showNextslide() {
    //   let j;
    //   const allslides = document.getElementsByClassName("carousel-content");

    //   for (j = 0; j < allslides.length; j++) {
    //     allslides[j].style.display = "none";
    //   }
    //   nextIndex++;
    //   if (nextIndex > allslides.length) {
    //     nextIndex = 1;
    //   }
    //   allslides[nextIndex - 1].style.display = "block";
    // }
    // function nextslide(n) {
    //   showNextslide((nextIndex += n));
    // }

    function businessClick() {
      router.push({ name: appConstants.routes.BUSINESS_EXPLORE });
    }
    function jobClick() {
      router.push({ name: appConstants.routes.JOB_EXPLORE });
    }
    function networkClick() {
      router.push({ name: appConstants.routes.LOGIN });
    }
    return {
      //nextslide,
      //showNextslide,
      plusSlides,
      showSlides,
      featuresSlider,
      clientLogos,
      businessClick,
      jobClick,
      networkClick,
      testimonials,
    };
  },
};
</script>
<style scoped>
@import url(../../assets/css/landingpage.css);
</style>
