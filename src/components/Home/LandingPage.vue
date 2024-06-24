<template>
  <div class="flex justify-center items-center bg-[#fff] text-center flex-col">
    <NavVue></NavVue>
    <div class="content-max-width pt-4">
      <div>
        <div class="mt-12 pb-1"></div>
        <div class="body-top-head mt-10 pb-4">
          <h3 class="lg:p-1 md:p-1 top-head">
            Top Digital Platform for Construction & real estate industry
          </h3>
        </div>
        <p class="header-subtitle">
          It is one stop platform for Jobs, network, Business & learning
        </p>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center lg:gap-0 md:gap-0 gap-0 py-10"
      >
        <div class="flex justify-center cursor-pointer mb-4">
          <div
            class="box-border p-4 py-9"
            style="background-color: #fff7f1"
            @click="businessClick()"
          >
            <div class="flex items-center justify-center">
              <img :src="getStaticImage('business.svg')" />
            </div>
            <p class="card-text mt-1.5 pt-2 p-1">Business</p>
          </div>
        </div>

        <div class="flex justify-center cursor-pointer mb-4">
          <div
            class="box-border p-4 py-9"
            style="background-color: #fbffc8"
            @click="jobClick()"
          >
            <div class="flex items-center justify-center">
              <img :src="getStaticImage('jobs_v1.svg')" />
            </div>
            <p class="card-text pt-2">Jobs</p>
          </div>
        </div>

        <div class="flex justify-center cursor-pointer">
          <div
            class="box-border p-4 py-9"
            style="background-color: #e8ffeb"
            @click="networkClick"
          >
            <div class="flex items-center justify-center">
              <img class="mt-1.5" :src="getStaticImage('lead_bg.svg')" />
            </div>
            <p class="card-text mt-1.5 pt-2">Network</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="leading py-4">Trusted By Leading Companies</p>

  <hr />

  <div class="bg-[#fff] cls-clientlogo-home">
    <div class="content-max-width flex w-full">
      <!-- <div class="hidden md:block flex">
        <p class="scroll-text">Trusted By Leading Companies</p>
      </div> -->
      <div class="flex overflow-auto hide-scrollbar justify-center">
        <!-- <Carousel
          :value="clientLogos"
          :numVisible="5"
          :numScroll="1"
          circular
          :autoplayInterval="3000"
        >
          <template #item="slotProps">
            <span v-if="slotProps.data.text">{{ slotProps.data.text }}</span>
            <img
              v-if="slotProps.data.logo"
              :src="slotProps.data.logo"
              class=""
            />
          </template>
        </Carousel> -->

        <!-- <div class="hidden md:block">
          <p class="scroll-text">Trusted By Leading Companies</p>
        </div> -->
        <!-- <div class="">
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="../../assets/kalptaru_logo.svg" />
          <img src="../../assets/puranik_logo.svg" />
          <img src="../../assets/shpoorji_pallonji_logo.svg" />
        </div> -->
        <div class="row small flex">
          <div class="imagegroup">
            <img src="../../assets/fidesto_logo.svg" alt="" />
            <img src="../../assets/zameel_steel_logo.svg" alt="" />
            <img src="../../assets/kumar_properties_logo.svg" alt="" />
            <img src="../../assets/malpani_logo.svg" alt="" />
            <img src="../../assets/gera_logo.svg" alt="" />
            <img src="../../assets/pride_world_city.svg" alt="" />
            <img src="../../assets/kalptaru_logo.svg" />
            <img src="../../assets/puranik_logo.svg" />
            <img src="../../assets/shpoorji_pallonji_logo.svg" />
          </div>
          <div class="imagegroup">
            <img src="../../assets/fidesto_logo.svg" alt="" />
            <img src="../../assets/zameel_steel_logo.svg" alt="" />
            <img src="../../assets/kumar_properties_logo.svg" alt="" />
            <img src="../../assets/malpani_logo.svg" alt="" />
            <img src="../../assets/gera_logo.svg" alt="" />
            <img src="../../assets/pride_world_city.svg" alt="" />
            <img src="../../assets/kalptaru_logo.svg" />
            <img src="../../assets/puranik_logo.svg" />
            <img src="../../assets/shpoorji_pallonji_logo.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <div class="mx-auto" style="background-color: #000">
    <div class="content-max-width">
      <h3 class="feature-title lg:pt-8 md:pt-8 pt-6">
        Unleash your growth potential with Olous features
      </h3>

      <div
        class="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 lg:gap-10 md:gap-8 mt-10 row-gap justify-center"
      >
        <div
          class="col-span-2 lg:flex md:hidden hidden justify-center items-center"
        ></div>
        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('businesshub_v1.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Business Hub
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('jobsearch_v1.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Job Search
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('lresources_v1.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Learning Resources
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('resumebuilder_v1.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Resume Builder
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('blogvideos.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Blogs & Videos
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('lgeneration.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Business Lead
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('networking_v1.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            Networking
          </p>
        </div>

        <div class="flex flex-col items-center feature-box">
          <div class="features-box flex justify-center items-center">
            <img :src="getStaticImage('newsheadlines.svg')" />
          </div>
          <p class="pbox text-center flex items-start lg:flex md:hidden hidden">
            News & Headlines
          </p>
        </div>
      </div>
    </div>

    <div
      class="col-span-2 lg:flex md:hidden hidden justify-center items-center"
    >
      <!-- You can add content here if needed -->
    </div>

    <!--vue slider1-->
    <!-- <Galleria
      :value="content"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 640px"
      thumbnailsPosition="top"
      :showItemNavigators="true"
      :showThumbnailNavigators="false"
    >
      <template #item="slotProps">
        <span class="text-[#000]">{{ slotProps.item.text }}</span>
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.img" :alt="slotProps.item.alt" />
      </template>
    </Galleria> -->

    <!--vue slider1-->

    <!--slider-->
    <div
      class="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 justify-center items-center"
    >
      <div class="col-span-2 lg:flex md:flex hidden"></div>
      <div class="slideshow-container mx-auto col-span-8 relative">
        <div class="Slides flex-center">
          <!--bussiness hub-->
          <div class="mySlides">
            <!-- <p
              class="hub my-4 mx-auto lg:hidden md-flex flex"
              @mouseover="showCursor(index)"
              @mouseout="hideCursor(index)"
            >
              {{ slide.title }}
            </p>
            <div class="feature-box" v-show="showCursorEffect">
              
            </div> -->
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Business Hub
            </p>
            <div class="slider-text h-200">
              Find the right construction services and products for contractors,
              architects, BIM professionals and construction equipments are now
              just a click away!
            </div>
          </div>
          <!--bussiness hub end-->

          <!--Job Search-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Job Search
            </p>
            <div class="slider-text h-200">
              Stay updated on top jobs across India in the Construction Industry
              and apply effortlessly with our job application feature. Find jobs
              near me at ease and directly apply to vacancies..
            </div>
          </div>
          <!--Job Search end-->
          <!--learning resources-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Learning Resources
            </p>
            <div class="slider-text h-200">
              Learn Construction with Olous. We publish informative Video and
              Image heavy content on Olous to keep you informed on various
              aspects and subjects of our Industry.
            </div>
          </div>
          <!--learning resources end-->
          <!--Resume builder-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Resume Builder
            </p>
            <div class="slider-text h-200">
              Be Job ready with Olous. With our innovative tool, you will be
              able to build an amazing Infographic CV in minutes and with
              minimal effort. The CV template has been designed such that it
              will catch the eye of potential Employers and Recruiters.
            </div>
          </div>
          <!--Resume builder end-->
          <!--blog & video-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Blogs & Videos
            </p>
            <div class="slider-text h-200">
              Explore Olous Vlogs for blogs and videos to update yourself with
              the latest trends and developments in the construction industry
            </div>
          </div>
          <!--blog & video end-->
          <!--business lead-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Business Lead
            </p>
            <div class="slider-text h-200">
              Get verified business leads matching your expertise and grow your
              business with Olous
            </div>
          </div>
          <!--business lead end-->
          <!--Networking-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              Networking
            </p>
            <div class="slider-text h-200">
              Build your network with Olous. Connect with Top Construction
              Companies, Architectural Practices, Interior Design Firms,
              Construction Product Companies, MEP Design Firms, BIM Firms and
              many such other to deliver your projects and grow together as a
              community
            </div>
          </div>
          <!--Networking end-->
          <!--News & headline-->
          <div class="mySlides">
            <p class="hub mx-auto lg:pt-1 md:pt-5 pt-4 lg:hidden md-flex flex">
              News & Headline
            </p>
            <div class="slider-text h-200">
              Stay professionally alert with Olous. We provide you with curated
              Global Construction Industry News and headlines to keep you
              informed on the latest in Construction Industry
            </div>
          </div>
          <!--News & headline end-->
        </div>
      </div>
      <div class="col-span-2 lg:flex md:flex hidden"></div>
    </div>
  </div>
  <!--new3 end-->

  <!--start 4-->
  <!-- <div class="flex flex-col md:flex-row items-center justify-center px-4 pb-4" >
  <div class="w-full md:w-1/3 p-4 md:pr-4">
    <img src="assets/img/Untitled.png" alt="Image" class="" />
  </div>

  <div class="w-full md:w-1/2 p-4 text-center space-x-4">
    <p class="text-2xl font-bold">Develop your career & business with Olous</p>
    <p class="text-left font-size:14px">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
      a type specimen book.
    </p>
  </div>

  <div class="w-full md:w-1/4 p-6 rounded-lg border-1 border-[#964B00]">
    <form>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2">Your Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name"
          class="appearance-none border-1 border-[#964B00] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" placeholder="Your Email Address"
          class="border-1 border-[#964B00] appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
      </div>
      <div class="mb-6">
        <label for="message" class="block text-gray-700 font-bold mb-2">Your Message</label>
        <textarea id="message" name="message" placeholder="Your message here..." rows="4"
          class="border-1 border-[#964B00] appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"></textarea>
      </div>
      <div class="flex items-center justify-end">
        <button type="submit"
          class="border-1 border-[#964B00] hover:bg-[#964B00] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
  </div>
</div> -->
  <!--end 4-->

  <!--start 5 new-->
  <div class="content-max-width">
    <div
      class="bg image grid lg:grid-cols-12 md:rid-cols-12 grid-cols-2 justify-center items-center"
    >
      <div class="col-span-2 lg:flex md:flex hidden">
        <!-- You can add content here if needed -->
      </div>
      <div class="col-span-8 section-bg bg-cover bg-center mt-9">
        <div class="container mx-auto">
          <div
            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 lg:gap-6 md:gap-6 row-gap"
          >
            <!-- Statistic 1 -->
            <div
              class="flex flex-col items-center justify-center text-center pb-4"
            >
              <!-- <img src="../../assets/img/availablejobs_v1.svg" alt="" /> -->
              <img
                class="counter-icons"
                :src="getStaticImage('job_icon.svg')"
                alt="Available Jobs Icon"
              />
              <span class="cnumber">1000+</span>
              <p class="mt-0.5 strip text-black font-extrabold">
                Available Jobs
              </p>
            </div>

            <!-- Statistic 2 -->
            <div
              class="flex flex-col items-center justify-center text-center pb-4"
            >
              <img
                class="counter-icons"
                :src="getStaticImage('olous_user.svg')"
                alt="Olous Users Icon"
              />
              <span class="cnumber">100K+</span>
              <p class="strip text-black font-extrabold">Olous Users</p>
            </div>

            <!-- Statistic 3 -->
            <div
              class="flex flex-col items-center justify-center text-center pb-4"
            >
              <img
                class="counter-icons"
                :src="getStaticImage('resumeicon_v1.svg')"
                alt="Resumes Icon"
              />
              <span class="cnumber">30,000</span>
              <p class="strip">Resumes</p>
            </div>

            <!-- Statistic 4 -->
            <div
              class="flex flex-col items-center justify-center text-center pb-4"
            >
              <img
                class="counter-icons"
                :src="getStaticImage('business_v2.svg')"
                alt="Businesses Icon"
              />
              <span class="cnumber">5000+</span>
              <p class="strip">Businesses</p>
            </div>
            <div class="col-span-2">
              <!-- You can add content here if needed -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 lg:flex md:flex hidden">
        <!-- You can add content here if needed -->
      </div>
    </div>
  </div>
  <!--end 5-->

  <!--start 6-->

  <!-- <div style="padding: 16 60 px" ;>
  <div class="row ml-4 ">
    <h3 align="center" style="font-size: 28px; line-height: 7.25rem"
      class="font-manrope text-3xl md:text-3xl lg:text-3xl text-black">A place
      to learn, grow, and connect – blog</h3>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white rounded-lg border border-black">
      <div>
        <img src="assets/img/standard-quality-control-concept-m 1.png" alt="Image 1"
          class="w-full h-48 object-cover rounded-t-lg" />
      </div>
      <div class="p-3">
        <h2 class="text-xl font-semibold mb-2">Maximizing Your Business's Reach with “Olous”</h2>
        <p align="justify" class="text-gray-600 mb-4">It is a long established fact that a reader will be distracted
          by the readable content of
          a </p>
        <div class="flex items-center">
          <a href="#">Read More</a>
          <img src="assets/img/Read More.png" class="ml-2">
        </div>
      </div>

    </div>

    <div class="bg-white rounded-lg border border-black ">
      <div>
        <img src="assets/img/scale-your-construction-business 1.png" alt="Image 2"
          class="w-full h-48 object-cover rounded-t-lg" />
      </div>
      <div class="p-3">
        <h2 class="text-xl font-semibold mb-2"> Essential Tools for Scaling Your Construction Business</h2>
        <p align="justify" class="text-gray-600 mb-4">It is a long established fact that a reader will be distracted
          by the readable content
          of a</p>
        <div class="flex items-center">
          <a href="#">Read More</a>
          <img src="assets/img/Read More.png" class="ml-2">
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg border border-black ">
      <div>
        <img src="assets/img/construction[engineersdaily 1.png" alt="Image 3"
          class="w-full h-48 object-cover rounded-t-lg" />
      </div>
      <div class="p-3 ">
        <h2 class="text-xl font-semibold mb-2">Enhancing Your Construction Business with Olous</h2>
        <p align="justify" class="text-gray-600 mb-4">It is a long established fact that a reader will be distracted
          by the readable content of a </p>
        <div class="flex items-center">
          <a href="#">Read More</a>
          <img src="assets/img/Read More.png" class="ml-2">
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg border border-black ">

      <div>
        <img src="assets/img/istockphoto-1214949225-612x612 1.png" alt="Image 4"
          class="w-full h-48 object-cover rounded-t-lg" />
      </div>

      <div class="p-3">
        <h2 class="text-xl font-semibold mb-2">Finding Your Perfect Business Match on <br>Olous</h2>
        <p align="justify" class="text-gray-600 mb-4">It is a long established fact that a reader will be distracted
          by the readable content of a </p>

        <div class="flex items-center">
          <a href="#">Read More</a>
          <img align="center" src="assets/img/Read More.png" class="ml-2">

        </div>
      </div>
    </div>

  </div>
  <div class="flex justify-center py-3 button-container">
    <button align="center" style="background-color:#964B000D; border-width: 1px; border-color: currentColor;"
      class="rounded px-3 py-2">
      <a href="https://tailwindcss.com/">View All Blogs</a>
    </button>
  </div>
</div> -->

  <!--end 6-->

  <!--start 7-->
  <div class="bg-[#faf6f2]">
    <div class="content-max-width">
      <div class="max-auto lg:py-4 md:py-4 py-4">
        <!-- Added a container to center the content -->
        <div class="mb-5">
          <h3 class="testimonial-story">Real Stories from Real People</h3>
        </div>

        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <!-- Grid Item 1 -->
          <div
            class="p-3 flex space-x-2"
            v-for="(testimonial, index) in testimonials"
            :key="index"
          >
            <img
              :src="getStaticImage('invertedcauma.svg')"
              alt="Inverted Comma"
              class="w-6 h-6"
            />
            <div>
              <ReadMoreLessVue
                :content="testimonial.content"
                :maxLimit="150"
              ></ReadMoreLessVue>
              <!-- <p class="testimonial-text">
                "Thanks to Olous App. | landed my dream job! The platform's
                user-friendly interface and job matching algorithm made the job
                search process efficient and enjoyable. The wide range of job
                listings and the ability to customize my search preferences were
                particularly helpful, also appreciated the email notifications
                for new job postings. Overall, Olous App played a pivotal role
                in helping me secure this fantastic opportunity highly
                recommendit to anyone seeking their next career move".
              </p> -->
              <h4 class="head">{{ testimonial.from }}</h4>
              <h4 class="head mt-1" v-if="testimonial.company">
                {{ testimonial.company }}
              </h4>
              <h4 class="head mt-1" v-if="testimonial.designation">
                {{ testimonial.designation }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--start 7-->

  <!-- ======= Footer ======= -->
  <HomeFooterVue></HomeFooterVue>
</template>

<script>
import { ref, onMounted } from "vue";
import Galleria from "primevue/galleria";
import { getCurrentInstance } from "vue";
import "../../assets/css/landingpage.css";
import ReadMoreLessVue from "../common/ReadMoreLess.vue";
import HomeFooterVue from "./HomeFooter.vue";
import HomeHeaderVue from "./HomeHeader.vue";
import Carousel from "primevue/carousel";
import { useRouter, useRoute } from "vue-router";
import appConstants from "../../appConstants.js";
import NavVue from "../Layout/Nav.vue";
export default {
  name: "LandingPage",
  components: {
    Galleria,
    ReadMoreLessVue,
    HomeFooterVue,
    HomeHeaderVue,
    Carousel,
    NavVue,
  },

  setup() {
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    const router = useRouter();
    const route = useRoute();

    const clientLogos = ref([
      // {
      //   text: "Trusted By Leading Companies",
      // },
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
          "Thanks to Olous App. | landed my dream job! The platform's user-friendly interface" +
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
      plusSlides,
      showSlides,
      featuresSlider,
      testimonials,
      clientLogos,
      businessClick,
      jobClick,
      networkClick,
    };
  },
};
</script>
<!--<style>

</style>-->
