<template>
  <!-- <NavVue></NavVue> -->
  <div class="content-max-width pt-10 md:pt-20">
    <div class="mx-auto lg:mt-8 md:mt-6 mt-2">
      <div class="grid grid-cols-12 gap-4 px-4">
        <!-- First Column on Mobile -->
        <!-- <div class="col-span-12 lg:col-span-1"></div> -->
        <!-- Main Content Column -->
        <div class="col-span-12 md:col-span-6 lg:px-0 md:px-4">
          <p class="heading mt-6 md:mt-0 pb-2">
            Yes, It’s free to be on <span class="highlight"> Olous!</span>
          </p>
          <div class="flex items-center">
            <div class="w-full">
              <!-- Content for the first column goes here -->
              <ul role="list" class="list-disc pt-4 pl-5">
                <li class="sublist">Update your Business Information</li>
                <li class="sublist">Add your Products & Services</li>
                <li class="sublist">Post a Job</li>
                <li class="sublist">Upload your Company Brochure</li>
                <li class="sublist">Post your Lead</li>
                <li class="sublist">Receive and Respond to messages</li>
              </ul>
              <p class="account lg:pt-4 pb-6 md:pt-4 pt-2.5">
                Create your Account in a few minutes
              </p>

              <button
                class="btn h-11 md:text-lg text-base text-white border-0 app-bg-color-primary flex justify-center items-center w-auto px-6"
                @click="businessClick()"
              >
                Add Your Business
              </button>
            </div>
          </div>
        </div>
        <!-- Image and Video Column -->
        <div class="col-span-12 md:col-span-6 lg:px-0 md:px-4">
          <a
            href="https://www.youtube.com/watch?v=yIxd1nMFl64"
            target="__blank "
            class="flex items-center justify-center relative"
          >
            <img
              class="md:max-w-full mx-auto mb-4 md:mb-0"
              src="../../assets/landingpagenew/business_static.png"
              alt="video_image"
            />
            <div class="absolute text-center">
              <p class="button-text">Watch full Video</p>
              <p class="button-text1">How Olous for Business Works</p>
            </div>
          </a>
          <!-- <div class="flex item-center justify-center mb-2 space-x-3">
            <div>
              <a
                href="https://www.youtube.com/watch?v=yIxd1nMFl64"
                target="__blank "
              >
                <img
                  class="pt-4 md:pt-6"
                  :src="getStaticImage('play.svg')"
                  alt="play_btn"
                />
              </a>
            </div>
            <div>
              <p class="button-text pt-4 md:pt-6">Watch full Video</p>
              <p class="button-text1">How Olous for Business Works</p>
            </div>
          </div> -->
        </div>
      </div>
      <!-- <div
        class="centered-container-img flex items-center justify-center mb-2 mt-4"
      >
        <img :src="getStaticImage('scrolldown.svg')" alt="Scroll down arrow" />
      </div> -->
    </div>
  </div>

  <!--section 2 start-->
  <div class="app-bg-color-secondary mt-16">
    <div class="content-max-width lg:py-10 md:py-8 py-6">
      <div class="flex justify-center items-center lg:px-0 md:px-0 px-4">
        <div class="hr-line"></div>
        <h3 class="section-title px-3">Olous Business Page Includes</h3>
        <div class="hr-line"></div>
      </div>

      <p class="section-subtitle lg:pb-4 lg:px-0 md:px-0 px-4 mt-2.5">
        Olous has resources to help you Plan, Grow, Find Leads, Create<br />Network
        and Advertise your Business
      </p>

      <div class="flex justify-center items-center text-center pt-4 md:p-4">
        <div
          class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 lg:gap-4 md:gap-4 gap-4"
        >
          <!-- Column 1 (Responsive padding and image size) -->
          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-5">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('exposure_in _search_result.svg')"
                    alt="exposure_search"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem] lg:pt-4 md:pt-4 pt-2"
                >
                  Exposure in
                  <br />
                  Search Result
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Decide which Categories, Services, and Service areas are most
                  relevant to your business, so the right people can find you
                  while searching
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('contactinfo.svg')"
                    alt="contactinfo"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Contact <br />
                  Information
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Add your phone number, address, map and/or directions to
                  easily connect with customers
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('company_detail_information.svg')"
                    alt="company detail"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Company Detail <br />
                  Information
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Showcase Your Specialties, Amenities, Business Story, and even
                  a little bit about yourself.
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img src="../../assets/job_posting.svg" alt="job_post" />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Job <br />
                  Posting
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Post job ads for free and connect with qualified candidates on
                  our user-friendly platform. Build a successful workforce for
                  your business today.
                </p>
              </div>
            </div>
          </div>

          <!-- Column 1 (Responsive padding and image size) -->
          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('upload_your_products_brochure.svg')"
                    alt="upload_products"
                  />
                </div>

                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Upload your <br />
                  Products Brochure
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Easily Share Information about Your Business and Services with
                  Your Convenient Brochure Upload
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('unlimited_product_and_ services.svg')"
                    alt="unlimited_products"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Unlimited Products <br />
                  and Services
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Let your Products and Photos Speak Volumes About your Business
                  Expertise
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('lead_generation.svg')"
                    alt="lead_generation"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Lead <br />
                  Generation
                </p>

                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Grow your business with effective lead generation - find
                  potential customers and turn them into paying ones!
                </p>
              </div>
            </div>
          </div>

          <div class="flex lg:justify-center">
            <div class="rounded-top-l-bottom-r overflow-hidden p-4">
              <div
                class="flex flex-col items-center justify-center lg:pt-4 md:pt-4 pt-1"
              >
                <div class="business-icon flex justify-center">
                  <img
                    :src="getStaticImage('links_to_more _information.svg')"
                    alt="link_info"
                  />
                </div>
                <p
                  class="app-text-color-primary font-bold lg:text-[1.375rem] leading-[1.27] text-[1rem]lg:pt-4 md:pt-4 pt-2"
                >
                  Links to <br />
                  more Information
                </p>
                <p class="square-box-text pt-4 lg:flex md:hidden hidden">
                  Give people even more detail about your business by linking to
                  your Website or Portfolio (or both!)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TODO -->
      <!-- 
      <button class="btn w-auto py-2 px-7 ml-6 lg:mt-3 md:mt-2">
        Download Now
      </button>
    </div> -->
    </div>
  </div>
  <div class="lg:px-0 md:px-0 px-4">
    <p class="section-bottom lg:mt-6 pb-6 md:mt-4 mt-2.5">
      "Discover More About Our Business and Services with Olous Informative
      Brochure.”
    </p>
  </div>
  <!--section 2 end-->

  <!--section 3 start-->
  <div class="app-bg-color-secondary">
    <div class="content-max-width lg:flex md:flex hidden">
      <div class="section-3 justify-center items-center">
        <div class="col-span-2 lg:flex">
          <!-- left 1st coulmn span empty of 2-->
        </div>
        <div
          class="col-span-8 section-bg bg-cover bg-center lg:py-10 md:py-8 py-6 md:px-4"
        >
          <!-- Added a container to center the content -->
          <h3 class="connect pb-4">
            Connect with the Right Audience: Post & View Lead
          </h3>
          <!-- Statistic 1 -->
          <p class="connect-text flex justify-center pt-4 pb-6">
            At Olous, we are dedicated to fostering connections between
            businesses and professionals, empowering them to thrive in their
            respective industries. Our platform serves as a hub for valuable
            content, networking opportunities, and a marketplace for buying
            leads. Join our community and take your business or career to new
            heights.
          </p>

          <div class="flex justify-center space-x-5">
            <button
              class="btn h-11 md:text-lg text-base text-white border-0 app-bg-color-primary flex justify-center items-center w-auto px-6"
              @click="businessClick()"
            >
              Post a Lead
            </button>
            <!-- TODO -->
            <!-- <button class="btn w-auto py-2 px-7 lg:mt-3 md:mt-2">
              Buy Lead
            </button> -->
          </div>
          <div class="col-span-2">
            <!-- left span 2 empty  -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--section 3 end-->

  <!--section 4 start-->
  <div class="content-max-width lg:px-0 md:px-0 px-4">
    <div class="lg:py-10 md:py-8 py-6 md:px-4">
      <div
        class="flex flex-col lg:items-center items-center items-start justify-center"
      >
        <p class="olous-ads">Olous Network</p>
        <p class="olous-ad-txt lg:pt-6 md:pt-5 pt-2">
          Bring your business to life with Olous Network
        </p>
        <p class="ads-list-top mt-2">
          Olous Network lets you post regular updates so you can help potential
          customers learn more about your business
        </p>
      </div>
      <div
        class="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 lg:pt-9 md:pt-10 pt-6 gap-8"
      >
        <!-- First Column -->
        <div class="col-span-1 lg:block md:hidden hidden"></div>

        <!--column 2 of section 4-->
        <!-- <div
        class="lg:col-span-5 lg:px-0 md:px-4 px-4"
        style="background-color: #fff"
      >
        <img
          class="lg:mt-0 md:mt:0 mb-10"
          :src="getStaticImage('olous_ads.svg')"
          alt="olous_add"
        />

        <p class="olous-ads lg:pt-1 md:pt-[21] pt-2 md:text-2xl text-xl">
          Olous Ads
        </p>
        <p class="olous-ad-txt lg:pt-6 md:pt-5 pt-2 pb-1 md:text-lg text-lg">
          Reach more potential customers with Olous Ads
        </p>
        <div class="flex items-center">
          <div class="olous-ads-box pr-6 pl-2 py-6 w-full pt-2">
            <ul
              role="list"
              class="marker pl-2 text-black-400 list-disc text-slate-500"
            >
              <p class="ads-list-top">
                Get in front of more customers when they’re searching for local
                businesses like yours.
              </p>
              <li class="ads-list lg:mt-4 md:mt-4 mt-2">
                Reach 3x more potential customers3
              </li>
              <li class="ads-list">Create and run your ad in minutes</li>
              <li class="ads-list pb-3">
                Only pay when interested people click on your ad
              </li>
              <p class="ads-list lg:flex md:hidden hidden pt-2">
                Business ads can help you increase visibility, build brand
                awareness, gain a competitive advantage, increase sales, and
                target specific groups of people.
              </p>
            </ul>
            <button class="post-btn py-2 px-6 lg:mt-3 md:mt-2">
              Post your Ad
            </button>
          </div>
        </div>
      </div> -->

        <div class="lg:col-span-5">
          <img
            class="pb-4"
            src="../../assets/landingpagenew/landing_network.png"
            alt="olous_network"
          />
        </div>
        <div class="lg:col-span-5">
          <div class="flex items-center">
            <div class="olous-ads-box px-4 pb-8 w-full">
              <!-- Content for the first column goes here -->
              <ul
                role="list"
                class="marker pl-2 text-black-400 list-disc text-slate-500"
              >
                <li class="ads-list">Creating a post is fast and easy</li>
                <li class="ads-list">
                  Post about what’s new, what’s hot and what’s unique about your
                  business
                </li>
                <li class="ads-list pb-2">
                  Your posts are promoted by notification to Olous users
                </li>
                <p class="ads-list lg:flex md:hidden hidden">
                  By participating in an online business network, you can expand
                  your reach beyond your local community & connect with
                  like-minded individuals from around the world.
                </p>
              </ul>
              <button
                class="mt-4 btn h-11 md:text-lg text-base text-white border-0 app-bg-color-primary flex justify-center items-center w-auto px-6"
                @click="clickConnect"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-1 lg:block md:hidden hidden"></div>
      </div>
    </div>
  </div>
  <!--section 4 end-->

  <!--faqs section-->

  <!--trail-->
  <!-- <div class="cls-business hidden lg:block md:hidden">
    <div class="app-bg-color-secondary">
      <div class="content-max-width p-4 mt-0.5">
        <h3 class="connect mt-6 pb-7">Most Frequently Asked Questions</h3>
        <div class="card grid grid-cols-2 gap-5">
          <Accordion :activeIndex="0">
            <AccordionTab header="Is Olous Business Page Free?">
              <p class="collapse-txt ml-5">Yes it is absolutely free</p>
            </AccordionTab>
            <AccordionTab
              header="How much does it cost to put your Business on Olous?
"
            >
              <p class="collapse-txt ml-5">It's absolutely free</p>
            </AccordionTab>
          </Accordion>
          <Accordion :activeIndex="0">
            <AccordionTab header="How do I Create my Business Page on Olous?">
              <p class="collapse-txt ml-5">
                Just sign up on our Business portal and register your
                business<br />
                <a
                  class="text-[#4285f4]"
                  href="https://business.olous.app"
                  target="_blank"
                  >https://business.olous.app</a
                >
              </p></AccordionTab
            >

            <AccordionTab
              header="How people will find my Business Page on Olous?"
            >
              <p class="collapse-txt ml-5">
                By searching Company name or by products/service category
              </p>
            </AccordionTab>
          </Accordion>
        </div>
        <div
          class="flex items-center justify-center pt-8 lg:flex-row md:flex-col"
        >
          <p class="sign-up pr-2">
            Ready to Let Us Help You Grow Your Business?
          </p>
          <button class="btn px-5 sign-btn w-auto" @click="businessClick()">
            Sign Up Today
          </button>
        </div>
      </div>
    </div>
  </div> -->
  <!--trail-->

  <!--faqs end--->
  <!-- <div class="app-bg-color-secondary">
    <div class="content-max-width">
      <div class="max-auto mt-1 lg:py-4 md:py-4 py-4">
        <div class="mb-5">
          <h3 class="testimonial-story">Real Stories from Real People</h3>
        </div>

        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
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
  </div> -->
  <div class="app-bg-color-secondary">
    <div class="content-max-width lg:pb-10 md:pb-8 pb-6 px-4">
      <div class="">
        <h3 class="feedback-title lg:pt-10 md:pt-8 pt-6">
          Real Stories from Real People
        </h3>
      </div>
      <div
        class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-5 gap-5 pt-6"
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
  <!--section 6 end-->

  <!--start 7-->
  <!-- ======= Footer ======= -->
  <HomeFooterVue></HomeFooterVue>
</template>

<script>
import { ref, onMounted } from "vue";
import { getCurrentInstance } from "vue";
//import "../../assets/css/landingpage.css";
import HomeFooterVue from "./HomeFooter.vue";
import HomeHeaderVue from "./HomeHeader.vue";
import ReadMoreLessVue from "../common/ReadMoreLess.vue";
import Panel from "primevue/panel";
import appConstants from "../../appConstants";
import NavVue from "../Layout/Nav.vue";
import { useRouter } from "vue-router";
import AccordionTab from "primevue/accordiontab";
import Accordion from "primevue/accordion";

export default {
  name: "Business",
  components: {
    HomeFooterVue,
    HomeHeaderVue,
    ReadMoreLessVue,
    Panel,
    NavVue,
    AccordionTab,
    Accordion,
  },
  setup() {
    const app = getCurrentInstance();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;

    const router = useRouter();
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

    function businessClick() {
      window.open(`${appConstants.BUSINESS_URL}`, "_self");
    }
    function clickConnect() {
      if (router.currentRoute._value.name == appConstants.routes.MESSAGING) {
      } else {
        router.push({ name: appConstants.routes.MESSAGING }).then(() => {});
      }
    }
    return {
      testimonials,
      businessClick,
      clickConnect,
    };
  },
};
</script>
<style scoped>
@import url(../../assets/css/landingpage.css);

/*--------------------------------------------------------------
# General section 1
--------------------------------------------------------------*/
.hr-line {
  width: 90px;
  height: 2px;
  /* margin: 29.5px 263px 28.5px 0; */
  background-color: var(--app-secondary-text-color);
}
.content-max-width {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
}
.account {
  color: var(--app-secondary-text-color);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  font-family: "Manrope Bold" !important;
}
.square {
  border-radius: 10px;
  border: 1px solid var(--app-secondary-text-color);
  background: #fff;
  width: 571px;
  height: 340px;
  flex-shrink: 0;
}
.heading {
  color: var(--app-secondary-text-color);
  text-align: left;
  font-size: 44px;
  font-family: "Manrope Bold";
  line-height: 56px;
  font-family: "Manrope Bold" !important;
}
.highlight {
  color: var(--app-primary-color);
  font-size: 44px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-family: "Manrope Bold" !important;
}
.sublist {
  color: var(--app-secondary-text-color);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 27px */
  letter-spacing: 0.36px;
  font-family: "Manrope Light" !important;
}
.sublist::marker {
  color: var(--app-primary-color);
}
.button-text {
  color: var(--app-bg-white);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: "Manrope Bold" !important;
}
.button-text1 {
  color: var(--app-bg-white);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: "Manrope Bold" !important;
}

/* Optional: You can add additional styles for the arrow image if needed */
.centered-container img {
  width: 44px; /* Adjust the width of the arrow image as per your preference */
  height: 44px; /* This maintains the aspect ratio of the arrow image */
}

.section-subtitle {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.45; /* 166.667% */
  letter-spacing: 0.36px;
  font-family: "Manrope Light" !important;
}
/* .rounded {
  border-radius: 27px 0px;
  border: 1px solid var(--app-secondary-text-color);
  background: var(--app-secondary-color);
  border-radius: 27px 0px;
 height: 250px;
 width: 290px

} */
.rounded-full {
  background-color: var(--app-primary-color);
  width: 75px;
  height: 75px;
}

/* .box-borders {
  border-radius: 27px 0px;
  border: 1px solid var(--app-secondary-text-color);
  background: var(--app-secondary-color);
} */
/*-----------------testimonial---------------*/
.testimonial {
  color: var(--app-secondary-text-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  font-family: "Manrope Light" !important;
}
/*-----------------footer---------------*/

.story {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 1.4px;
  text-transform: capitalize;
  font-family: "Manrope Bold" !important;
}

.footer-download-txt {
  color: var(--app-bg-white);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  text-transform: capitalize;
  font-family: "Manrope Bold" !important;
  /* margin-left: 18px;
margin-bottom: 8px; */
}
.news1 {
  color: var(--app-secondary-text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  font-family: "Manrope Bold" !important;
}
.newsletter-input {
  height: 44px;
  border-right: none;
  padding-left: 10px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
}
.lclass {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  font-family: "Manrope Light" !important;
}
.collapse-txt {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.28px;
  font-family: "Manrope Light" !important;
}

.lclass1 {
  color: var(--app-secondary-text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  font-family: "Manrope Bold" !important;
}
.slink {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--app-primary-color);
}

.slink:hover {
  background-color: #000;
}

.faq {
  color: var(--app-secondary-text-color);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: "Manrope Bold" !important;
}
.post-btn {
  border-radius: 8px;
  border: 1px solid var(--app-primary-color);
  color: var(--app-secondary-text-color);
  display: flex;
  width: 145px;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
}

rb-zeplin .rb-zeplin-selected {
  outline: transparent !important;
}
/* ...............section 2...............
....................................*/
.section-title {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  font-family: "Manrope Bold" !important;
}
.rounded-top-l-bottom-r {
  background: var(--app-bg-white);
  width: 309px;
  height: 309px;
  border-radius: 10px;
  /* border-top-left-radius: 24px;
  border-bottom-right-radius: 24px;border: 1px solid transparent; */
}
/* .rounded-top-l-bottom-r:hover {
  border: 1px solid #000;
} */
.rounded-top-l-bottom-r:hover .business-icon {
  background: #000;
}

.business-icon {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: var(--app-primary-color);
}
.rounded-text {
  color: var(--app-primary-color);
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.27;
  font-family: "Manrope Bold" !important;
}

.square-box-text {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.43; /* 171.429% */
  letter-spacing: 0.28px;
  font-family: "Manrope SemiBold" !important;
}
.section-bottom {
  color: var(--app-primary-color);
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.87;
  font-family: "Manrope Bold" !important;
}

.download-btn {
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 170px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
/*--------------------------------------------------------------
# section 3
--------------------------------------------------------------*/
.connect {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  font-family: "Manrope Bold" !important;
}

.connect-text {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.45; /* 171.429% */
  letter-spacing: normal;
  font-family: "Manrope Light" !important;
}
.lead-btn {
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
}
.buy-lead {
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
}

/*--------------------------------------------------------------
# section 3 end
--------------------------------------------------------------*/
/*--------------------------------------------------------------
# section 4 start
--------------------------------------------------------------*/

.olous-ads {
  color: var(--app-secondary-text-color);
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 100% */
  font-family: "Manrope Bold" !important;
}
.olous-ads-box {
  width: 631px;
}

.ads-list {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 171.429% */
  letter-spacing: 0.28px;
  font-family: "Manrope Medium" !important;
}
.ads-list::marker {
  color: var(--app-primary-color);
  font-size: 20px;
}
.ads-list-top {
  color: var(--app-secondary-text-color);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.28px;
  padding-right: 14px;
  font-family: "Manrope Light" !important;
}

.olous-ad-txt {
  color: var(--app-secondary-text-color);
  font-style: normal;
  font-weight: 600;
  line-height: 32px; /* 100% */
  font-size: 22px;
  font-family: "Manrope SemiBold" !important;
}
.rb-zeplin-focused {
  outline: none !important;
}
/*--------------------------------------------------------------
# section 4 end
--------------------------------------------------------------*/
/*--------------------------------------------------------------
# section 5 start
--------------------------------------------------------------*/
.panel-header {
  background-color: transparent;
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
  letter-spacing: 0.28px;
  border-radius: 10px;
  font-family: "Manrope SemiBold" !important;
}
.sign-up {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  font-family: "Manrope Light" !important;
}
.bus-btn {
  border-radius: 8px;
  border: 1px solid var(--app-primary-color);
  display: flex;
  padding: 8px 24px;
  align-items: center;
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
}

/*--------------------------------------------------------------
# section 5 end
--------------------------------------------------------------*/
/*--------------------------------------------------------------
# media query
--------------------------------------------------------------*/
/* Media query for screens smaller than or equal to the MD breakpoint (typical tablet and mobile screens) */
@media (max-width: 768px) {
  .heading {
    color: var(--app-secondary-text-color);
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: "Manrope Regular" !important;
  }
  .highlight {
    color: var(--app-primary-color);
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    font-family: "Manrope Bold" !important;
  }

  .business-icon {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  .testimonial {
    font-size: 14px; /* Adjust font size for smaller screens */
  }

  .head {
    font-size: 16px; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 576px) {
  .heading {
    color: var(--app-secondary-text-color);
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: "Manrope Medium" !important;
  }
  .olous-ads {
    color: var(--app-secondary-text-color);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 100% */
    font-family: "Manrope Bold" !important;
  }
  .olous-ad-txt {
    color: var(--app-secondary-text-color);
    font-style: normal;
    font-weight: 600;
    line-height: 32px; /* 100% */
    font-size: 16px;
    font-family: "Manrope SemiBold" !important;
  }

  .ads-list-top {
    color: var(--app-secondary-text-color);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.28px;
    padding-right: 14px;
    font-family: "Manrope Light" !important;
  }
  .connect {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-family: "Manrope Bold" !important;
  }
  .highlight {
    color: var(--app-primary-color);
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    font-family: "Manrope Bold" !important;
  }
  .section-subtitle {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0.32px;
  }
  .section-title {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-family: "Manrope Bold" !important;
  }
  .rounded-top-l-bottom-r {
    /* border-radius: 20px 0px; */
    background: var(--app-bg-white);
    width: 150px;
    height: 160px;
  }
  .section-bottom {
    color: var(--app-primary-color);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-family: "Manrope Bold" !important;
  }

  .sublist {
    color: var(--app-secondary-text-color);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: 0.36px;
    font-family: "Manrope Light" !important;
  }
  .square {
    border-radius: 10px;
    border: 1px solid var(--app-secondary-text-color);
    background: #fff;
    width: 571px;
    height: 330px;
    flex-shrink: 0;
  }
}

@media (max-width: 1024px) {
  .rounded-top-l-bottom-r {
    /* border-radius: 20px 0px; */
    background: var(--app-bg-white);
    width: 160px;
    height: 200px;
  }
}

/*--------------------------------------------------------------
# General style css file end
--------------------------------------------------------------*/
</style>
