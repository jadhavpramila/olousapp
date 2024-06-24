<template>
  <div class="form-container cls-jobpage">
    <!---section 1 start -->
    <div class="content-max-width mb-10">
      <div class="grid grid-cols-12 lg:gap-4 md:gap-3">
        <!-- First Column on Mobile (Empty column for spacing) -->
        <div class="lg:col-span-1 md:col-span-1 col-span-12"></div>
        <!-- Text and Buttons (12 columns on mobile, 5 columns on larger screens, order-2 for mobile, order-1 for larger screens) -->

        <div
          class="lg:px-0 lg:col-span-4 md:col-span-4 col-span-12 md:px-0 px-6"
        >
          <h3 class="ml-4 mr-4 pb-2 top-heading">
            Discover Career Opportunity with Olous!
          </h3>
          <p class="find-dream lg:ml-5 md:ml-5 ml-4">
            Find your Dream Job with Olous with a single click!
          </p>
          <div class="flex lg:ml-5 pt-6 md:ml-5 pt-6 ml-4 pt-5 space-x-4">
            <button
              class="btn h-11 md:text-lg text-base text-white border-0 app-bg-color-primary flex justify-center items-center w-auto px-6"
              @click="goToJobPage()"
            >
              Find a Job
            </button>
            <button
              class="btn px-4 w-auto h-11 md:text-lg text-base flex justify-center items-center"
              @click="goToBusinessPortal()"
            >
              Post a Job
            </button>
          </div>
        </div>
        <div class="lg:col-span-1 md:col-span-1 col-span-12"></div>

        <!-- Image Column (12 columns on mobile, 4 columns on larger screens, order-1 for mobile, order-2 for larger screens) -->
        <div class="lg:col-span-5 md:col-span-5 col-span-12">
          <img
            class="lg:ml-4 md:ml-4 px-4 px-6"
            src="../../assets/landingpagenew/job_static.png"
            alt="logo"
          />
        </div>

        <!-- Empty Column for Spacing (12 columns on mobile, 2 columns on larger screens) -->
        <div class="lg:col-span-1 md:col-span-1 col-span-12"></div>
      </div>
    </div>

    <!---section 1 start -->

    <!---section 2 start -->
    <!-- <hr />
  <div class="bg-[#fff] cls-clientlogo-home">
    <div class="content-max-width flex w-full">
      <div class="hidden md:block flex">
        <p class="scroll-text">Trusted By Leading Companies</p>
      </div>
      <div class="flex overflow-auto hide-scrollbar justify-center">
        <div class="row small flex">
          <div class="imagegroup" style="animation-delay: 1s">
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
  <hr /> -->
    <!---section 2 end -->

    <!---section 3 start -->
    <div class="app-bg-color-secondary">
      <div class="content-max-width lg:px-0 md:px-4 px-4">
        <h3 class="recent-jobs text-center lg:py-10 md:py-8 py-6">
          Recently Added Jobs
        </h3>
        <div class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8">
          <div
            v-for="(jobs, index) in getjoblist()"
            :key="index"
            class="app-bg-white rounded-[8px] lg:p-4 md:p-4 px-1 py-4 app-text-color-secondary cursor-pointer"
          >
            <div class="job-card-container">
              <div class="flex items-center">
                <img
                  class="lg:w-[4rem] lg:h-[4rem] md:w-[4rem] md:h-[4rem] w-[3rem] h-[3rem] rounded-md object-contain"
                  :src="setCompanyImage(jobs.company_logo)"
                  alt=""
                />
              </div>
              <div
                class="lg:ml-2 md:ml-2 ml-1 w-full"
                @click="goToJobDetails(jobs)"
              >
                <div class="flex flex-col w-full">
                  <h1
                    class="font-weight-700 app-text-color-primary text-sm w-full truncate"
                  >
                    {{ jobs.job_title }}
                  </h1>
                  <p
                    class="font-medium app-text-color-secondary text-sm w-full truncate mb-3"
                  >
                    {{ jobs.company }}
                  </p>
                  <p
                    class="app-text-color-secondary font-weight-600 text-xs mb-1"
                  >
                    {{ getJobLocation(jobs) }}
                  </p>
                  <div class="flex flex-row items-center mb-1">
                    <div
                      class="flex items-center"
                      v-if="jobs.min_exp > 0 || jobs.max_exp > 0"
                    >
                      <p
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        Min {{ jobs.min_exp }}yrs
                      </p>
                      <span>-</span>
                      <p
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        Max {{ jobs.max_exp }}yrs
                      </p>
                    </div>
                    <div v-else class="flex items-center">
                      <p
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        Fresher
                      </p>
                    </div>
                    <div class="flex items-center">
                      <span
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                        >&nbsp; | &nbsp;</span
                      >
                      <p
                        v-if="jobs.employment"
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        {{ setEmploymentType(jobs.employment) }}
                      </p>
                      <p
                        v-else
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        NA
                      </p>
                      <span
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                        >&nbsp; | &nbsp;</span
                      >
                      <p
                        v-if="jobs.vacancy <= 1"
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        {{ jobs.vacancy }} Position
                      </p>
                      <p
                        v-if="jobs.vacancy > 1"
                        class="app-text-color-secondary font-light lg:text-xs md:text-xs sm:text-xs text-[0.625rem]"
                      >
                        {{ jobs.vacancy }} Positions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex w-full flex-col justify-between items-end">
                <div
                  class="flex flex-col h-full justify-between lg:ml-0 md:ml-0 sm:ml-[-9.25rem] ml-[-9.25rem]"
                >
                  <div class="flex flex-row">
                    <img
                      v-if="jobs.urgent == true"
                      :src="getStaticImage('Urgent.svg')"
                      alt=""
                      class="w-4"
                    />

                    <p
                      v-if="jobs.urgent == true"
                      class="app-text-color-secondary font-light lg:text-xs md:text-xs text-[0.625rem] ml-1"
                    >
                      Urgent
                    </p>
                  </div>

                  <img
                    v-if="jobs.work_from_home == true"
                    :src="getStaticImage('WFH.svg')"
                    alt=""
                    class="ml-2 lg:w-10 md:w-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="lg:px-2 md:px-2 px-2 rectangle lg:block md:hidden hidden">
        <div class="flex flex-col inner-rectangle mt-2 p-2">
          <div class="flex justify-between">
            <button class="june-box">19 June, 2023</button>

            <img
              class="save-icon mt-1"
              :src="getStaticImage('job_land_save_icon.svg')"
              alt="save-icon"
            />
          </div>

          <div class="flex design mt-5">
            Design & Project Coordination Engineer
            <img :src="getStaticImage('job_land_clogo.svg')" alt="logo" />
          </div>
          <div class="flex grid grid-cols-7 lg:mt-4 md:mt-3 mt-4 w-full">
            <div class="flex w-full items-center col-span-2">
              <img :src="getStaticImage('job_land_full_time.svg')" alt="logo" />
              <span class="time text-black ml-1">Full Time</span>
            </div>
            <div class="flex w-full col-span-3 items-center">
              <img
                :src="getStaticImage('job_land_work_from_office.svg')"
                alt="logo"
              />

              <span class="time text-black ml-1">Work from Office</span>
            </div>
            <div class="flex w-full col-span-2 items-center">
              <span class="person">5 Applicants</span>
            </div>
          </div>
        </div>

        <div class="design w-full p-2.5 flex justify-between">
          <div>
            <p class="city">Cushman & Wakefield</p>
            <p class="area mt-2 flex items-center">
              <img
                class="mr-2"
                :src="getStaticImage('job_land_location_v1.svg')"
                alt="location"
              />

              Pune, Maharashtra, India
            </p>
          </div>
          <div>
            <button class="apply-btn">Apply</button>
          </div>
        </div>
      </div>
      <div class="lg:px-2 md:px-2 px-2 rectangle lg:block md:hidden hidden">
        <div class="flex flex-col inner-rectangle mt-2 p-2">
          <div class="flex justify-between">
            <button class="june-box">19 June, 2023</button>

            <img
              class="save-icon mt-1"
              :src="getStaticImage('job_land_save_icon.svg')"
              alt="save-icon"
            />
          </div>

          <div class="flex design mt-5">
            Design & Project Coordination Engineer
            <img :src="getStaticImage('job_land_clogo.svg')" alt="logo" />
          </div>
          <div class="flex grid grid-cols-7 lg:mt-4 md:mt-3 mt-4 w-full">
            <div class="flex w-full items-center col-span-2">
              <img :src="getStaticImage('job_land_full_time.svg')" alt="logo" />
              <span class="time text-black ml-1">Full Time</span>
            </div>
            <div class="flex w-full col-span-3 items-center">
              <img
                :src="getStaticImage('job_land_work_from_office.svg')"
                alt="logo"
              />

              <span class="time text-black ml-1">Work from Office</span>
            </div>
            <div class="flex w-full col-span-2 items-center">
              <span class="person">5 Applicants</span>
            </div>
          </div>
        </div>

        <div class="design w-full p-2.5 flex justify-between">
          <div>
            <p class="city">Cushman & Wakefield</p>
            <p class="area mt-2 flex items-center">
              <img
                class="mr-2"
                :src="getStaticImage('job_land_location_v1.svg')"
                alt="location"
              />

              Pune, Maharashtra, India
            </p>
          </div>
          <div>
            <button class="apply-btn">Apply</button>
          </div>
        </div>
      </div>
      <div class="lg:px-2 md:px-2 px-2 rectangle lg:block md:hidden hidden">
        <div class="flex flex-col inner-rectangle mt-2 p-2">
          <div class="flex justify-between">
            <button class="june-box">19 June, 2023</button>

            <img
              class="save-icon mt-1"
              :src="getStaticImage('job_land_save_icon.svg')"
              alt="save-icon"
            />
          </div>

          <div class="flex design mt-5">
            Design & Project Coordination Engineer
            <img :src="getStaticImage('job_land_clogo.svg')" alt="logo" />
          </div>
          <div class="flex grid grid-cols-7 lg:mt-4 md:mt-3 mt-4 w-full">
            <div class="flex w-full items-center col-span-2">
              <img :src="getStaticImage('job_land_full_time.svg')" alt="logo" />
              <span class="time text-black ml-1">Full Time</span>
            </div>
            <div class="flex w-full col-span-3 items-center">
              <img
                :src="getStaticImage('job_land_work_from_office.svg')"
                alt="logo"
              />

              <span class="time text-black ml-1">Work from Office</span>
            </div>
            <div class="flex w-full col-span-2 items-center">
              <span class="person">5 Applicants</span>
            </div>
          </div>
        </div>

        <div class="design w-full p-2.5 flex justify-between">
          <div>
            <p class="city">Cushman & Wakefield</p>
            <p class="area mt-2 flex items-center">
              <img
                class="mr-2"
                :src="getStaticImage('job_land_location_v1.svg')"
                alt="location"
              />

              Pune, Maharashtra, India
            </p>
          </div>
          <div>
            <button class="apply-btn">Apply</button>
          </div>
        </div>
      </div> -->

        <div
          class="flex flex-col items-center justify-center lg:py-10 md:py-8 py-6"
        >
          <p class="looking-for text-center mb-3">
            Did not find what you're looking for?
          </p>
          <p
            class="btn h-11 md:text-lg text-base w-auto px-4 text-center flex justify-center items-center cursor-pointer"
            @click="goToJobPage()"
          >
            View All Jobs

            <!-- <img
              class="mx-auto mt-2"
              :src="getStaticImage('job_land_line_view.svg')"
              alt="olous_network"
            /> <div class="line-view mt-2"></div>-->
          </p>
        </div>
      </div>
    </div>

    <!---section 3 end -->

    <!---section 4 start -->

    <div class="content-max-width lg:px-0 md:px-4 px-4">
      <div class="lg:py-10 md:py-8 py-6">
        <h3 class="get-start text-center">Getting Started It Easy</h3>
        <p class="profile text-center lg:pt-2 pb-6 p-8 md:pt-2 pt-4">
          Create a profile and we will match you with best your dream companies
          and jobs in the world
        </p>
      </div>

      <div class="flex justify-center">
        <div class="grid grid-col-12">
          <div class="col-span-1"></div>
          <!--code-->
          <!-- Slideshow container -->
          <div class="slideshow-container col-span-10">
            <!--slide 1 start-->
            <div class="fade mySlides">
              <div
                class="flex flex-col lg:flex-row md:flex-row lg:space-x-14 md:space-x-8 space-x-0"
              >
                <div class="img-box">
                  <img
                    class="screen-ss lg:w-96 md:w-96 p-4"
                    :src="getStaticImage('job_land_screenshot_1_v1.png')"
                    alt="screenshot"
                  />
                  <!-- <img
                  class="screen-ss lg:w-96 md:w-96 p-4"
                  src="../../assets/img/screen1_v1.png"
                /> -->
                </div>

                <div class="flex items-start text-left lg:mt-0 md:mt-0 mt-4">
                  <div class="">
                    <!-- <p class="slide-num">01</p> -->
                    <p class="details pt-2">Fill up your Details</p>
                    <p class="save-data mt-1.5">
                      <!-- Adjust the text size based on your requirement -->
                      Sign in with your mail id
                    </p>
                    <p class="long text-black">
                      By using "Edit" button,on your profile page, you can
                      change your personal & login details.
                    </p>
                    <div class="line-01"></div>

                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking on "Edit" button, you can modify your
                          personal & login details, on your profile page.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking on "Experience" button, you have the
                          option to input all your work experiences.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />

                      <div class="">
                        <p class="long">
                          By clicking on "Certificates" button, you have the
                          option to enter relevant certificates, such as
                          relevant courses or professional accreditations like
                          MRICS.(optional feild)
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking on "Education" button, you can provide
                          details about your academic qualifications and
                          educational background.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--slide 1 end-->

            <!--slide 2 start-->
            <div class="fade mySlides">
              <div
                class="flex flex-col lg:flex-row md:flex-row lg:space-x-14 md:space-x-8 space-x-0"
              >
                <div class="img-box">
                  <img
                    class="screen-ss lg:w-96 md:w-96 p-4"
                    :src="getStaticImage('job_land_screenshot_2_v1.png')"
                    alt="screenshot"
                  />
                </div>

                <div class="flex items-start text-left lg:mt-0 md:mt-0 mt-4">
                  <div class="">
                    <!-- <p class="slide-num">02</p> -->
                    <p class="details pt-2 text-base lg:text-xl md:text-xl">
                      Fill up your Details
                    </p>
                    <p class="save-data">
                      <!-- Adjust the text size based on your requirement -->
                    </p>
                    <div class="line-01"></div>

                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking "Software Proficiency" button, you can
                          specify the software applications you are familiar
                          with, such as Stadpro, Autocad, Revit, etc. (optional
                          field).
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking on the "Languages" button, you have the
                          option to list multiple languages you are proficient
                          in.
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start mt-2">
                      <img
                        class="mr-2 pt-2"
                        src="../../assets/landingpagenew/dot_blue.svg"
                        alt="ellipse"
                      />
                      <div class="">
                        <p class="long">
                          By clicking on "Other Details" button, you can enter
                          your contact email and mobile number, which will be
                          displayed on your CV.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--slide 2 end-->
            <!--slide 3 start-->
            <!-- <div class="fade mySlides">
            <div
              class="flex flex-col lg:flex-row md:flex-row lg:space-x-14 md:space-x-8 space-x-0"
            >
              <div class="img-box">
                <img
                  class="screen-ss lg:w-96 md:w-96 p-4"
                  :src="getStaticImage('job_land_screenshot_3.png')"
                  alt="screenshot"
                />
              </div>

              <div class="flex items-start text-left lg:mt-0 md:mt-0 mt-4">
                <div class="">
                  <p class="slide-num">03</p>
                  <p class="details pt-2 text-base lg:text-xl md:text-xl">
                    Fill up your Details
                  </p>
                  <p class="save-data lg:pt-4 md:pt-2 pt-1"></p>
                  <div class="line-01"></div>

                  <div class="flex items-start mt-4">
                    <img
                      class="mr-2 pt-2"
                      :src="getStaticImage('job_land_ellipse_43.svg')"
                      alt="ellipse"
                    />
                    <div class="">
                      <p class="long">
                        By clicking on "Other Details" button, you can enter
                        your contact email and mobile number, which will be
                        displayed on your CV.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start">
                    <p class="long"></p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
            <!--slide 3 end-->
            <!--slide 4 start-->
            <!-- <div class="fade mySlides">
            <div class="flex lg:flex-row md:flex-row flex-col">
              <div class="img-box lg:pr-0 md:pr-0 ml-8 ml-[15px] pr-10">
                <img
                  class="screen-ss lg:mx-auto lg:w-96 md:mx-auto md:w-96 ml-4 mt-10 mx-auto w-[auto]"
                  src="../../assets/img/shot_ss1.svg"
                />
              </div>

              <div
                class="flex items-start lg:mt-0 md:mt-0 mt-4 mt-[-1.5rem] text-left"
              >
                <div class="mt-14">
                  <p
                    class="slide-num text-lg lg:text-2xl md:text-2xl lg:ml-3 md:ml-2 ml-3"
                  >
                    04
                  </p>
                  <p class="details pt-2 text-base lg:text-xl md:text-xl ml-4">
                    Fill up your Details
                  </p>
                  <p
                    class="save-data mt-4 mb-4 ml-4 lg:w-10/12 md:w-10/12 w-3/4"
                  >
                    Once your data is saved, It will be converted into a nice
                    creative Resume.
                  </p>
                  <div class="line-01 lg:ml-1 md:ml-1 ml-7"></div>

                  <div class="flex items-center">
                     <img
                      class="mb-2 mr-2 lg:pl-1 md:pl-1 pl-4"
                      :src="getStaticImage('job_land_ellipse_43.svg')"
                      alt="ellipse"
                    />
                    <div class="">
                      <p class="long mt-4 lg:w-11/12 md:w-10/12 w-[20.5rem]">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center mt-4">
                     <img
                      class="mb-2 mr-2 lg:pl-1 md:pl-1 pl-4"
                      :src="getStaticImage('job_land_ellipse_43.svg')"
                      alt="ellipse"
                    />
                    <p class="long mt-4 lg:w-11/12 md:w-10/12 w-[20.5rem]">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          </div>
          <div class="col-span-1"></div>
        </div>
      </div>
      <div style="text-align: center" class="mt-4">
        <span class="dot mr-4" @click="currentSlide(1)"></span>
        <span class="dot mr-4" @click="currentSlide(2)"></span>
        <!-- <span class="dot mr-4" @click="currentSlide(3)"></span> -->
      </div>
    </div>
    <!---section 4 end -->

    <!--section 5 section start-->
    <div class="counter-background mt-[30px]">
      <div class="content-max-width">
        <div
          class="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 lg:gap-4 md:gap-4 gap-4"
        >
          <div></div>
          <div class="counter-img">
            <img src="../../assets/landingpagenew/google_rating.png" alt="" />
          </div>
          <div class="counter-img">
            <img
              src="../../assets/landingpagenew/registered_business.png"
              alt=""
            />
          </div>
          <div class="counter-img">
            <img src="../../assets/landingpagenew/app_downloads.png" alt="" />
          </div>
          <div></div>
        </div>

        <!-- <div
          class="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-2 justify-center items-center lg:mt-10 md:mt-12 mt-0"
        >
          <div class="col-span-12 section-bg bg-cover bg-center mt-9">
            <div class="container mx-auto">
              <div
                class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 lg:gap-6 md:gap-6 row-gap"
              >
                <div
                  class="flex flex-col items-center justify-center text-center relative"
                >
                  <span class="cnum relative z-10">500+</span>
                  <p class="mb-10 strip-text relative z-10">Jobs Added</p>
                  <div
                    class="line-1 lg:block md:block block absolute top-1/3 transform -translate-y-1/2 right-0 h-[92px] bg-[#000]"
                  ></div>
                </div>

                <div
                  class="flex flex-col items-center justify-center text-center relative"
                >
                  <span class="cnum">50,000</span>
                  <div class="mb-2 md:mb-10 strip-text">
                    Registered <br class="md:hidden /" />
                    Resumes
                  </div>
                  <div
                    class="line-1 lg:block md:block hidden absolute top-1/3 transform -translate-y-1/2 right-0 h-[92px] bg-[#000]"
                  ></div>
                </div>

                <div
                  class="flex flex-col items-center justify-center text-center relative"
                >
                  <span class="cnum">5000+</span>
                  <div class="mb-2 md:mb-10 strip-text">
                    Registered <br class="md:hidden" />
                    Company
                  </div>
                  <div
                    class="line-1 lg:block md:block block absolute top-1/3 transform -translate-y-1/2 right-0 h-[92px] bg-[#000]"
                  ></div>
                </div>

                <div
                  class="flex flex-col items-center justify-center text-center relative"
                >
                  <span class="cnum">20,000+</span>
                  <p class="mb-10 strip-text">Job Seeker</p>
                
                </div>

                <div class="col-span-2">
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-2 lg:flex md:flex hidden">
          </div>
        </div> -->
      </div>
    </div>

    <!--section 5  end-->
    <!--section 5.1 start-->
    <!--start 6-->
    <!-- <div class="content-max-width">
    <h3
      align="center"
      class="mt-10 pb-6 text-3xl lg:text-[28] md:text-3xl lg:text-3xl text-black"
    >
      A place to learn, grow, and connect – blog
    </h3>
    <div
      class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4"
    >
      <div class="bg-white rounded-lg border border-black">
        <div>
          <img
            src="../../assets/img/standard_quality_control_concept1.png"
            alt="Image 1"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div class="p-3">
          <h2 class="text-black font-semibold mb-2">
            Maximizing Your Business's Reach with “Olous”
          </h2>
          <p class="read-more-text mb-4 pt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a
          </p>
          <div class="flex items-center">
            <a class="read-text" href="#">Read More</a>
            <img src="../../assets/img/read_more.svg" class="ml-1.5" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-black">
        <div>
          <img
            src="../../assets/img/scale_construction.png"
            alt="Image 2"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div class="p-3">
          <h2 class="text-black font-semibold mb-2">
            Essential Tools for Scaling Your Construction Business
          </h2>
          <p class="read-more-text mb-4 pt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a
          </p>
          <div class="flex items-center">
            <a class="read-text" href="#">Read More</a>
            <img src="../../assets/img/read_more.svg" class="ml-1.5" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border border-black">
        <div>
          <img
            src="../../assets/img/construction_eng.png"
            alt="Image 2"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div class="p-3">
          <h2 class="text-black font-semibold mb-2">
            Enhancing Your Construction Business with Olous
          </h2>
          <p class="read-more-text mb-4 pt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a
          </p>
          <div class="flex items-center">
            <a class="read-text" href="#">Read More</a>
            <img src="../../assets/img/read_more.svg" class="ml-1.5" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-black">
        <div>
          <img
            src="../../assets/img/istockphoto.png"
            alt="Image 3"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div class="p-3">
          <h2 class="text-black font-semibold mb-2">
            Finding Your Perfect Business Match on Olous
          </h2>
          <p class="read-more-text mb-4 pt-2">
            It is a long established fact that a reader will be distracted by
            the readable content of a
          </p>
          <div class="flex items-center">
            <a class="read-text" href="#">Read More</a>
            <img src="../../assets/img/read_more.svg" class="ml-1.5" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center py-3">
      <a href=""> <button class="findjob-btn">View All Blogs</button></a>
    </div>
  </div> -->
    <!--end 6-->
    <!---section 5.1 end -->
    <!--section 6 start-->
    <!-- <div class="hidden lg:block md:hidden">
    <div class="app-bg-color-secondary">
      <div class="content-max-width p-4 mt-0.5">
        <h3 class="connect mt-6 pb-7">Most Frequently Asked Question</h3>
        <div class="panel-header grid grid-cols-2 gap-5">
          <Panel
            header="Is Olous Business page free?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0 panel-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Panel>

          <Panel
            header="How do I Create my Business Page on Olous?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p></Panel
          >

          <Panel
            header="How much does it cost to put your business on Olous?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0 panel-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Panel>

          <Panel
            header="What does it mean to claim a business on Olous?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0 panel-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Panel>

          <Panel
            header="How can I edit my Business page?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0 panel-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Panel>

          <Panel
            header="How people will find my Busines page on Olous?"
            toggleable
            :collapsed="true"
          >
            <p class="m-0 panel-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Panel>
        </div>
        <div
          class="flex items-center justify-center pt-8 lg:flex-row md:flex-col"
        >
          <p class="sign-up pr-1 mb-10">
            Ready to Let Us Help You Grow Your Business?
          </p>
          <button class="sign-btn mb-10">
            <img :src="getStaticImage('sign_up.svg')" alt="sign_up" />
          </button>
        </div>
      </div>
    </div>
  </div> -->
    <!--section 6 end-->
    <!--trail-->
    <div class="hidden lg:block md:hidden">
      <div class="app-bg-color-secondary mt-10">
        <div class="content-max-width px-4">
          <h3 class="connect lg:py-10 md:py-8 py-6">
            Most Frequently Asked Questions
          </h3>
          <div class="card grid grid-cols-2 gap-5">
            <Accordion>
              <AccordionTab
                collapseIcon="pi pi-chevron-down"
                expandIcon="pi pi-chevron-right"
                header="What types of job positions are typically available at Olous?"
              >
                <p class="collapse-txt ml-7">
                  Olous offers construction jobs only. We have positions open
                  from freshers, intermediate and senior level positions.
                </p>
              </AccordionTab>
              <AccordionTab
                header="How is Olous App different from other job portals ?"
              >
                <p class="collapse-txt ml-7">
                  Olous is construction specific platform where user can network
                  with construction professionals, do business with companies
                  and provide different type of jobs to its users.
                </p>
              </AccordionTab>
              <AccordionTab header="Do I have to pay to use a job portal?">
                <p class="collapse-txt ml-7">
                  Registration to Olous Job Portal and apply to a job is not
                  chargeable.
                </p>
              </AccordionTab>
              <AccordionTab header="Are my personal details safe on Olous App?">
                <p class="collapse-txt ml-7">
                  Yes,it is 100% secure as per government guidelines.
                </p>
              </AccordionTab>

              <AccordionTab header="What should I include in my Olous profile?">
                <p class="collapse-txt ml-7">
                  Olous guides you to create comprehensive and informative
                  profile. With our advanced AI filtration process, this helps
                  you to find the right job matching your skills.
                </p>
              </AccordionTab>

              <AccordionTab header=" Can I apply to more than 1 job at a time?">
                <p class="collapse-txt ml-7">
                  Yes, you have an option to apply for more than one job at a
                  time for the jobs matching your profile.
                </p>
              </AccordionTab>

              <AccordionTab header="How do I track my job application?">
                <p class="collapse-txt ml-7">
                  After you apply to a job, you will see a message on the screen
                  acknowledging the submission of your application. Further to
                  this,the portal shows the status of the job application. You
                  can see status such as ‘Application Sent’, ‘Application
                  Viewed’, ‘CV Downloaded’, ‘Shortlisted’, ‘Job Expired’ against
                  your application.
                </p>
              </AccordionTab>
            </Accordion>
            <Accordion>
              <AccordionTab
                header="How do I upload my resume on Olous job portal?"
              >
                <p class="collapse-txt ml-7">
                  You need to create your Olous profile and then you can
                  directly uplaod your normal resume an standard procedure.
                </p></AccordionTab
              >

              <AccordionTab
                header="Can I apply for jobs through the job portal?"
              >
                <p class="collapse-txt ml-7">
                  Yes, you can apply for jobs using Olous App and you will get
                  the job notifications once new jobs matching your profile are
                  posted.
                </p>
              </AccordionTab>
              <AccordionTab
                header="How can I set up job alerts for specific job post?"
              >
                <p class="collapse-txt ml-7">
                  Olous has advance job filter, where applicants can set the
                  criteria for job notification.
                </p>
              </AccordionTab>

              <AccordionTab
                header="Do I need to pay for applying for a job or get an interview call?"
              >
                <p class="collapse-txt ml-7">
                  No "Applying for Job on Olous is free". Olous does not charge
                  any fee to job seeker for application.
                </p>
              </AccordionTab>

              <AccordionTab
                header=" Can I contact the employer regarding update of my application?"
              >
                <p class="collapse-txt ml-7">
                  It is generally not advised, as you can see the status of your
                  application on app. In case the recruiter has provided her
                  contact details and asked you to contact her through the job
                  description, you can definitely contact that recruiter.
                </p>
              </AccordionTab>

              <AccordionTab
                header="Can I still apply to a job without registering on Olous?"
              >
                <p class="collapse-txt ml-7">
                  No, the app allows your access to jobs only when you sign in.
                  Registering also allows you to: •Get suggestions for
                  similarjobs •Set up a job notification •Check your application
                  status. •Get an update about new jobs from recruiters.
                </p>
              </AccordionTab>

              <AccordionTab
                header="  Does Olous provide jobs in sectors other than construction  industry?"
              >
                <p class="collapse-txt ml-7">
                  No, Olous App is specifically developed for construction and
                  allied industries.
                </p>
              </AccordionTab>
            </Accordion>
          </div>
          <div
            class="flex flex-col items-center justify-center lg:py-10 md:py-8 py-6 md:flex-col"
          >
            <p class="sign-up pb-5 app-text-color-primary">
              Ready to Let Us Help You Grow Your Business?
            </p>
            <button
              class="btn h-11 px-5 flex justify-center items-center md:text-lg text-base sign-btn w-auto"
              @click="goToBusinessPortal()"
            >
              Sign Up Today
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--trail end-->
    <div class="app-bg-color-secondary mt-10">
      <div class="content-max-width lg:pb-10 md:pb-8 pb-6 lg:px-0 md:px-2 px-4">
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
              <h4
                class="text-sm font-light mt-1"
                v-if="testimonial.designation"
              >
                {{ testimonial.designation }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <HomeFooterVue></HomeFooterVue>
  </div>
  <!---Header is included -->
  <!-- <NavVue></NavVue> -->
  <!---Header is included -->
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
import HomeFooterVue from "./HomeFooter.vue";
import HomeHeaderVue from "./HomeHeader.vue";
import ReadMoreLessVue from "../common/ReadMoreLess.vue";
import Carousel from "primevue/carousel";
import Panel from "primevue/panel";
import NavVue from "../Layout/Nav.vue";
import AccordionTab from "primevue/accordiontab";
import Accordion from "primevue/accordion";
import { useRouter } from "vue-router";
import appConstants from "../../appConstants";
import { getUUIDtoEncodedString } from "/src/common/js/UUIDtoBase64.js";
//import "../../assets/css/landingpage.css";

export default {
  name: "JobsPage",
  components: {
    HomeFooterVue,
    HomeHeaderVue,
    ReadMoreLessVue,
    Panel,
    Carousel,
    NavVue,
    AccordionTab,
    Accordion,
  },
  setup() {
    const app = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const $getStaticImage =
      app.appContext.config.globalProperties.getStaticImage;
    let slideIndex = ref(0);

    const clientLogos = ref([
      {
        text: "Trusted By Leading Companies",
      },
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
    let jobData = computed(() => store.getters["jobs/getter_jobListData"]);
    let employmentTypes = computed(
      () => store.getters["dropdown/getter_empTypesData"]
    );
    let workLocation = appConstants.WORK_LOCATION;
    let workLocationText = ref("");

    onMounted(async () => {
      // showSlides();
      //plusSlides();
      //currentSlide();
      let arg_value = {
        limit: 20,
        scroll_id: "",
        page: 1,
        offset: 0,
      };
      let filterAndArgs = {
        data: {},
        args: arg_value,
      };
      await store
        .dispatch("jobs/action_getAdvancedFiltredJobs", filterAndArgs)
        .then((res) => {
          getEmploymentType();
          getjoblist();
          //console.log("job data=>", jobData.value);
        });
      slideIndex.value = 1;
      showSlides(slideIndex.value);
    });

    // Next/previous controls
    function plusSlides(n) {
      showSlides((slideIndex.value += n));
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides((slideIndex.value = n));
    }
    function setAppliedDate(date) {
      let date1 = new Date(date);
      let year = date1.getFullYear();
      let month = date1.toLocaleString("en-us", { month: "short" });
      let dt = date1.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let newDate = dt + " " + month + " " + year;
      return newDate;
    }
    function getNumberOfApplicantString(job) {
      if (job.no_of_applicants > 0) {
        if (job.no_of_applicants == 1) {
          return `  ${job.no_of_applicants} Applicant`;
        } else {
          return `  ${job.no_of_applicants} Applicants`;
        }
      } else {
        return "";
      }
    }
    function setImageForJobType(type) {
      // console.log("single job data", data);
      if (type == workLocation.OFFICE) {
        return (workLocationText.value = "Office");
      } else if (type == workLocation.ONSITE) {
        return (workLocationText.value = "Onsite");
      } else if (type == workLocation.REMOTE) {
        return (workLocationText.value = "WFH");
      }
    }

    function getjoblist() {
      let filteredArray = jobData.value;
      return filteredArray.slice(0, 4);
    }
    function showSlides(n) {
      let i;
      let slides = document.querySelectorAll(".mySlides");
      let dots = document.querySelectorAll(".dot");
      if (n > slides.length) {
        slideIndex.value = 1;
      }
      if (n < 1) {
        slideIndex.value = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex.value - 1].style.display = "block";
      dots[slideIndex.value - 1].className += " active";
    }
    function getJobLocation(data) {
      //console.log("jobs data", data);
      let location = [];
      // for (let count = 0; count < data.length; count++) {
      //   if (count > 0) break;
      if (data.city != "") {
        location.push(data.city);
      }

      if (data.state != "") {
        location.push(data.state);
      }

      if (data.country != "") {
        location.push(data.country);
      }
      //}

      let res = location.join(", ");
      return res;
    }
    function setCompanyImage(image) {
      //  let imageUrl = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${image}`;

      return image;
    }
    async function getEmploymentType() {
      await store.dispatch("dropdown/action_getEmploymentType").then((res) => {
        //console.log("data", res);
      });
    }
    function setEmploymentType(type) {
      // console.log("type", type);
      for (let i = 0; i < employmentTypes.value.length; i++) {
        if (employmentTypes.value[i].id == type) {
          // console.log("type", employmentTypes.value[i].employment_type);
          return employmentTypes.value[i].employment_type;
        }
        //const element = array[index];
      }
    }
    function goToJobDetails(jobs) {
      let days = calculateNoOfDays(jobs.expires_at);
      let encode_str = getUUIDtoEncodedString(jobs.id);

      let result = getParamsForURL(jobs);

      const routeData = router.resolve({
        name: appConstants.routes.JOBDETAILS,
        params: {
          job_id: `${result}${appConstants.url_separator_jobs}${encode_str}`,
        },
      });
      window.open(routeData.href, "_blank");
    }
    function calculateNoOfDays(expiryDate) {
      var currentDate = new Date().toISOString().split(".")[0] + "Z";
      const d2 = new Date(currentDate);
      //for (let i = 0; i < jobData.value.jobs.length; i++) {
      const d1 = new Date(expiryDate);
      var Difference_In_Time = d1.getTime() - d2.getTime();
      var Difference_In_Days = Math.round(
        Difference_In_Time / (24 * 60 * 60 * 1000)
      );
      return Difference_In_Days;
    }
    function getParamsForURL(job) {
      let jobTitle = "";
      if (job.job_title != undefined && job.job_title != null) {
        jobTitle = job.job_title;
        //Other than all alphabets & space remove other characters
        jobTitle = jobTitle.replace(/[^a-zA-Z ]/g, "");
        //concate with "-""
        jobTitle = jobTitle.replace(/\ /g, "-");
      }
      return jobTitle;
    }
    function goToJobPage() {
      router.push({ name: appConstants.routes.JOBS });
    }
    function goToBusinessPortal() {
      window.open(`${appConstants.BUSINESS_URL}`, "_self");
    }
    function setGrid() {
      if (jobData.value.length == 3) {
        return "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1";
      } else if (jobData.value.length == 2) {
        return "grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1";
      }
    }

    return {
      testimonials,
      clientLogos,
      employmentTypes,
      jobData,
      workLocation,
      workLocationText,
      showSlides,
      plusSlides,
      currentSlide,
      slideIndex,
      goToJobPage,
      setGrid,
      goToBusinessPortal,
      getjoblist,
      setAppliedDate,
      getNumberOfApplicantString,
      setImageForJobType,
      getJobLocation,
      setCompanyImage,
      getEmploymentType,
      setEmploymentType,
      goToJobDetails,
    };
  },
};
</script>
<style scoped>
@import url(../../assets/css/landingpage.css);

.job-card-container {
  display: grid;
  grid-template-columns: 90px auto 90px;
}
/*--------------------------------------------
# General style
---------------------------------------------*/
.content-max-width {
  max-width: 1320px;
  margin-left: auto;
  margin-right: auto;
}
.slide-num {
  color: var(--app-secondary-text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: normal;
  letter-spacing: 0.4px;
}

.find-dream {
  color: var(--app-secondary-text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  font-family: "Manrope Regular" !important;
  line-height: 24px; /* 120% */
  letter-spacing: 0.4px;
}
.top-heading {
  color: var(--app-secondary-text-color);
  font-size: 44px;
  font-style: normal;
  font-weight: 800;
  font-family: "Manrope Bold" !important;
  line-height: normal;
}
.findjob-btn {
  border-radius: 8px;
  border: 1px solid var(--app-primary-color);
  display: flex;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: normal;
}
.recent-jobs {
  color: var(--app-secondary-text-color);
  font-size: 30px;
  font-weight: 800;
  font-family: "Manrope Bold" !important;
  letter-spacing: 0.56px;
  line-height: 32px;
}
.rectangle {
  border-radius: 8px;
  border: 1px solid #222;
  background: #fff;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-shrink: 0; */
}
.inner-rectangle {
  border-radius: 8px;
  background: var(--app-secondary-color);
  width: 100%;
  height: auto;
  flex-shrink: 0;
}
.june-box {
  border-radius: 8px;
  background: #fff;
  width: 100px;
  height: 38px;
  flex-shrink: 0;
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  font-family: "Manrope Regular" !important;
}
.save-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}
.design {
  color: var(--app-secondary-text-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  font-family: "Manrope SemiBold" !important;
  line-height: 24px; /* 150% */
}
.logo {
  border-radius: 8px;
  background: #fff;
  width: 68px;
  height: 64px;
  flex-shrink: 0;
}
.city {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: 20px; /* 142.857% */
}
.area {
  color: var(--app-secondary-text-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: 12px; /* 100% */
}
.apply-btn {
  border-radius: 6px;
  border: 1px solid var(--app-primary-color);
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.looking-for {
  color: var(--app-secondary-text-color);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: normal;
  letter-spacing: 0.36px;
}
.view-jobs {
  color: var(--app-primary-color);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: normal;
  letter-spacing: 0.36px;
}
.get-start {
  color: var(--app-secondary-text-color);
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  font-family: "Manrope Bold" !important;
  line-height: 36px; /* 128.571% */
  letter-spacing: 0.56px;
}
.profile {
  color: var(--app-secondary-text-color);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: 24px; /* 133.333% */
  letter-spacing: 0.36px;
}
.counter-background {
  background: var(--app-secondary-color);
  height: auto;
  flex-shrink: 0;
  padding: 30px;
}
.counter-img {
  padding: 8px 44px;
  border-radius: 8px;
  background-color: var(--app-bg-white);
  display: flex;
  justify-content: center;
}
.counter-img img {
  width: 188px;
  height: 86px;
  object-fit: contain;
}
.cnum {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: normal;
}
.strip-text {
  color: var(--app-primary-color);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  font-family: "Manrope Bold" !important;
  line-height: normal;
}
.connect {
  color: var(--app-secondary-text-color);
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  line-height: normal;
}
.panel-header {
  background-color: transparent;
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  font-family: "Manrope SemiBold" !important;
  line-height: 14px; /* 100% */
  letter-spacing: 0.28px;
  border-radius: 10px;
}
.sign-up {
  color: var(--app-primary-color);
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-family: "Manrope Bold";
  line-height: normal;
  text-transform: capitalize;
}
.rect-box {
  border-radius: 36px;
  border: 1px solid #d9d9d9;
  padding: 16px;
}
.read-text {
  color: var(--app-secondary-text-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
}
.read-more-text {
  color: var(--app-secondary-text-color);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: normal;
  letter-spacing: 0.28px;
  text-transform: lowercase;
}
.btn-blogs {
  border-radius: 2px;
}
.line-counter {
  width: 1px;
  height: 92px;
  background: var(--app-secondary-text-color);
}
.time {
  color: var(--app-secondary-text-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: 12px; /* 100% */
}
.person {
  color: #2a820b;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: 12px; /* 100% */
}
.rect-cover {
  border-radius: 40px;
  border: 1px solid #d9d9d9;
  width: 1150px;
  height: 383px;
  flex-shrink: 0;
}
.details {
  color: var(--app-primary-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  font-family: "Manrope Bold" !important;
  letter-spacing: 0.4px;
  align-items: left;
}
.line-01 {
  background: #222;
  width: 488px;
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.line-1 {
  background: #222;
  width: 1px;
  height: 92px;
}
.img-box {
  border-radius: 19px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background: var(--app-bg-white);
  width: auto;
  height: auto;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.save-data {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: normal;
  letter-spacing: 0.28px;
}

.long {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.28px;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-family: "Manrope Bold";
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #e29f9f;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}
/* 
.active,
.dot:hover {
  background-color: #222;
} */

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}
.screen2 {
  width: 496px;
  height: 392px;
}
.Header {
  color: var(--app-secondary-text-color);
}
.collapse-txt {
  color: var(--app-secondary-text-color);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-family: "Manrope Light" !important;
  letter-spacing: 0.28px;
}
.collapse-txt {
  margin-left: 5px; /* Adjust the margin as needed */
  margin-top: 0; /* Optionally set margin-top to 0 to eliminate any top margin */
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

.screen-ss {
  border-radius: 36px;
}
.job-image {
  width: 68px;
  height: 64px;
  border-radius: 8px;
}
/*--------------------------------------------
# /* Media query for screens smaller than or equal to the MD breakpoint (typical tablet and mobile screens)
---------------------------------------------*/
@media (max-width: 768px) {
  .cnum {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    text-transform: capitalize;
  }
  .strip-text {
    color: var(--app-primary-color);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    text-transform: capitalize;
  }
  .rectangle {
    width: auto;
    height: auto;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #222;
    background: #fff;
  }
  .top-heading {
    color: var(--app-secondary-text-color);
    font-size: 36px;
    font-style: normal;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    line-height: normal;
  }
  .recent-jobs {
    color: var(--app-secondary-text-color);
    font-size: 30px;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    letter-spacing: 0.56px;
  }
  .design {
    color: var(--app-secondary-text-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    font-family: "Manrope SemiBold" !important;
    line-height: 24px; /* 150% */
  }
}

/*--------------------------------------------
# /* Media query for screens smaller (mobile screens)
---------------------------------------------*/

@media (max-width: 576px) {
  .job-card-container {
    display: grid;
    grid-template-columns: 50px auto 50px;
  }
  .top-heading {
    color: var(--app-secondary-text-color);
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    line-height: normal;
  }
  .find-dream {
    color: var(--app-secondary-text-color);
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    font-family: "Manrope Regular" !important;
    line-height: normal;
    letter-spacing: 0.36px;
  }
  .findjob-btn {
    display: flex;
    width: 134px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .looking-for {
    color: var(--app-secondary-text-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-family: "Manrope Light" !important;
    line-height: normal;
    letter-spacing: 0.32px;
  }
  .view-jobs {
    color: var(--app-primary-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    letter-spacing: 0.32px;
  }
  .get-start {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    letter-spacing: 0.4px;
  }
  .profile {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-family: "Manrope Light" !important;
    line-height: 24px; /* 150% */
    letter-spacing: 0.32px;
  }
  .counter-background {
    background: var(--app-secondary-color);
    /* width: 360px; */
    height: auto;
    flex-shrink: 0;
    padding: 24px;
  }
  .cnum {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    text-transform: capitalize;
  }
  .recent-jobs {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    letter-spacing: 0.4px;
  }
  .design {
    color: var(--app-secondary-text-color);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    font-family: "Manrope SemiBold" !important;
    line-height: 24px; /* 171.429% */
  }
  .profile {
    color: var(--app-secondary-text-color);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-family: "Manrope Light" !important;
    line-height: 24px; /* 150% */
    letter-spacing: 0.32px;
  }
  .details {
    color: var(--app-primary-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    letter-spacing: 0.32px;
  }
  .save-data {
    color: var(--app-secondary-text-color);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    font-family: "Manrope Light" !important;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.28px;
  }
  .long {
    color: var(--app-secondary-text-color);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    font-family: "Manrope Light" !important;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.28px;
  }
  .img-box {
    width: auto;
    height: auto;
    border-radius: 19px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    flex-shrink: 0;
  }

  .slide-num {
    color: var(--app-secondary-text-color);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    font-family: "Manrope Bold" !important;
    line-height: normal;
    letter-spacing: 0.32px;
  }
  .rect-box {
    border-radius: 36px;
    border: none;
    padding: 0px;
  }
  .line-01 {
    width: auto;
    height: 1px;
  }
  .rectangle {
    width: auto;
    height: auto;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #222;
    background: #fff;
  }
}
</style>
