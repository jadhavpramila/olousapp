<template>
  <div class=" w-full lg:grid-cols-1 md:grid-cols-1">
    <div class="w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 pl-10 text-center bg-white p-10 mt-10">
      <div class="py-4">
        <p class="text-left text-[#03014c] text-lg font-['Open_Sans']">
          Hello World!..
        </p>
        <p class="text-left pt-3 text-xl text-[#03014c] font-extrabold font-['Open_Sans']">
          I am <span class="text-[#fdad00]">Virendra Khot</span> an <br />
          <span>Co Founder at Vadcore Pune</span>
        </p>
        <p class="text-left pt-5 text-xs text-[#03014c] font-['Open_Sans']">
          Tech & Digital Construction
        </p>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-2 pt-5">
          <div>
            <p class="text-left font-['Open_Sans'] text-[#03014c] text-xs font-bold">
              5.6k Followers
            </p>
          </div>
          <div>
            <p class="text-left font-['Open_Sans'] text-[#03014c] text-xs font-bold">
              5.6k Followers
            </p>
          </div>
        </div>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3 pt-5 font-['Open_Sans']">
          <button
            class="flex justify-center p-1 border-solid hover:text-[#fff] border hover:bg-[#d96f20] text-[#7b7b7b] border-yellow-600 rounded lg:w-28 lg:h-6 md:w-28 md:h-6">
            <span class="lg:text-xs md:text-xs sm:text-xs">Build CV</span>
          </button>
          <button
            class="flex justify-center p-1 border-solid hover:text-[#fff] border hover:bg-[#d96f20] text-[#7b7b7b] border-yellow-600 rounded lg:w-28 lg:h-6 md:w-28 md:h-6">
            <span class="lg:text-xs md:text-xs sm:text-xs">Download CV</span>
          </button>
          <button
            class="flex justify-center p-1 border-solid hover:text-[#fff] border hover:bg-[#d96f20] text-[#7b7b7b] border-yellow-600 rounded lg:w-28 lg:h-6 md:w-28 md:h-6">
            <span class="lg:text-xs md:text-xs sm:text-xs">My Activities</span>
          </button>
        </div>
      </div>
      <div class="bg-white">
        <div class="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1">
          <div>
            <div class="flex items-center justify-center">
              <img src="../../assets/img/temp.jpeg" class="rounded-full lg:w-64 lg:h-64 sm:w-32 sm:h-32 h-20 w-20" alt=""
                srcset="" />
              <img :src="getStaticImage('editProfile.svg')" alt="edit" @click="editProfile()"
                class="absolute cursor-pointer lg:max-h-14 lg:mt-[6.5rem] lg:ml-[14rem] sm:max-h-7 sm:mt-[-2rem] sm:ml-[6rem] max-h-5 ml-[4rem] mt-[-1.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- large screens  -->
    <div id="largeScreen"
      class="w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 grid-cols-1 bg-[#f2fafa] pt-3 py-3">
      <div class="grid pl-10 pr-10 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2">
        <h2 class="text-[#03014c] text-left text-lg font-bold font-['Open_Sans']">
          Infographic CV Progress
        </h2>
        <div class="text-right">
          <button
            class="lg:w-28 lg:h-6 md:w-28 md:h-6 justify-center rounded-md border border-black text-xs font-bold text-[#000000] font-['Open_Sans']">
            Preview
          </button>
        </div>
      </div>
      <div class="bg-[#f2fafa] grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 ml-10 mr-10 mt-10">
        <div class="relative mr-16	">
          <p class="pt-2 text-[#333333] text-left font-bold borderNew"></p>
          <div class="justify-items-center">
            <div class="">
              <div class="absolute bottom11 flex flex-row space-x-14 md:w-32 lg:w-48">
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('experience_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">
                    Experience
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('certificates_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">
                    Certificates
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('education_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">Education</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('software_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">Software</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('technicalSkills_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">Technical</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('softskills_red.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">
                    SoftSkills
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('education_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">
                    Achievements
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('interests_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-xs font-bold mt-1">Interests</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-4">
                  <img :src="getStaticImage('other_red.svg')" alt="exp" />
                  <p class="align-test text-[#333333] text-xs font-bold mt-1">
                    OtherDetai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid pl-10 pr-10 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 mt-12">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-4"></div>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-4"></div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2">
          <div class="text-[#333333] text-xs font-bold text-right flex mb">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/green_dot.svg" alt=""
              width="15px" />
            Completed
          </div>
          <div class="text-[#333333] text-xs font-bold text-right flex">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/Red_dot.svg" alt=""
              width="15px" />
            Incomplete
          </div>
          <div class="text-[#333333] text-xs font-bold text-right flex">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg" alt=""
              width="15px" />
            Optional
          </div>
        </div>
      </div>
    </div>
    <!-- mobile view -->
    <!-- <div id="mobileScreen"
      class="w-full grid sm:grid-cols-1 grid-cols-1 bg-[#f2fafa] pt-3 py-3 visible md:hidden lg:hidden">
      <div class="grid pl-10 pr-10 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-2">
        <h2 class="text-[#03014c] text-left text-lg font-bold font-['Open_Sans']">
          Infographic CV Progress
        </h2>
        <div class="text-right">
          <button
            class="lg:w-28 lg:h-6 md:w-16 md:h-6 justify-center rounded-md border border-black text-xs font-bold text-[#000000] font-['Open_Sans']">
            Preview
          </button>
        </div>
      </div>
      <div class="bg-[#f2fafa] grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 ml-10 mr-10 mt-10">
        <div class="relative">
          <p class="pt-2 text-[#333333] text-left font-bold borderNew"></p>
          <div class="justify-items-center">
            <div class="">
              <div class="absolute bottom11 flex flex-row space-x-14 md:w-32 lg:w-48">
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('experience_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">
                    Experience
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('certificates_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">
                    Certificates
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('education_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Education</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('software_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Software</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('software_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Software</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('software_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Software</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="relative  mt-16">
          <p class="pt-2 text-[#333333] text-left font-bold borderNew"></p>
          <div class="justify-items-center">
            <div class="">
              <div class="absolute bottom11 flex flex-row space-x-14 md:w-32 lg:w-48">
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('experience_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">
                    Experience
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('certificates_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">
                    Certificates
                  </p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('education_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Education</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
                <div class="lg:w-12 md:w-8 w-8">
                  <img :src="getStaticImage('software_green.svg')" alt="exp" />
                  <p class="text-[#333333] text-[8px] font-bold mt-1">Software</p>
                  <img class="circle" :src="getStaticImage('black_dot.svg')" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid pl-10 pr-10 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 mt-12">
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-4"></div>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 grid-cols-4"></div>
        <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
          <div class="text-[#333333] text-xs font-bold text-right flex mb">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/green_dot.svg" alt=""
              width="15px" />
            Completed
          </div>
          <div class="text-[#333333] text-xs font-bold text-right flex">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/Red_dot.svg" alt=""
              width="15px" />
            Incomplete
          </div>
          <div class="text-[#333333] text-xs font-bold text-right flex">
            <img class="mr-1" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg" alt=""
              width="15px" />
            Optional
          </div>
        </div>
      </div>
    </div> -->
    <div
      class="w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] pt-3 py-3 pr-3 border-2 border-inherit">
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        <div></div>
        <div class="flex">
          <h5 class="text-[#333333] text-xs font-bold mr-4">
            Having Trouble Completing Your Cv ? Let Us Know we will help you
          </h5>
          <button
            class="lg:w-28 lg:h-6 md:w-28 md:h-6 sm:w-28 sm:h-6 justify-center rounded-md border border-black text-xs font-bold text-[#000000] font-['Open_Sans']">
            Contact Us
          </button>
        </div>
      </div>
    </div>
    <div class="w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] pl-10 pr-10 pt-3 py-3">
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 ">
        <h2 class="text-[#03014c] text-left text-lg font-bold font-['Open_Sans']">
          My Analytics
        </h2>
      </div>
      <div class="w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] pt-3 py-3 p-3">
        <Card class="bg-[#f2f2f2]">
          <template #title>
            <div class="flex">
              <img src="https://olous.s3.ap-south-1.amazonaws.com/website/static/experience_green1.svg" alt="" />
              <div class="ml-2">
                <h5 class="pt-2 text-[#333333] text-left font-bold">
                  Experience
                </h5>
                <p class="pt-2 text-[#696969] text-left text-xs">
                  Please add your Experience
                </p>
              </div>
            </div>
          </template>
          <template #content>
            <div class="card">
              <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] p-3 borderBottom">
                <div class="flex">
                  <div>
                    <div class="relative">
                      <img :src="getStaticImage('Experience-hexagon.svg')" alt="Snow" class="object-top" />
                      <div class="absolute bottom-5 left-6 right-0">
                        <span class="text-[10px] font-bold p-0 leading-[0rem]">June 2004</span>
                        <br />
                        <span class="text-[10px] font-bold p-0 leading-[0rem]">To</span>
                        <br />
                        <span class="text-[10px] font-bold p-0 leading-[0rem]">June 2004</span>
                        <div class="absolute bottom-5 left-12 right-0 bg-[#ffffff]">
                          <span class="text-[10px] font-bold p-0">3.10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3 pl-3">
                    <p class="text-[#333333] text-left font-bold font-['Open_Sans']">
                      Visual Designer
                    </p>
                    <p class="text-[#333333] text-xs font-bold font-['Open_Sans']">
                      Vadcore Pvt Ltd
                    </p>
                    <p class="text-[#333333] text-xs font-bold font-['Open_Sans']">
                      Pune, Maharashtra India
                    </p>
                  </div>
                </div>
                <div class="grid text-right">
                  <div>
                    <button>
                      <img :src="getStaticImage('Edit+_1.svg')" alt="Architecture" @click="editProfile()" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] p-3 pb-2">
                <h4 class="text-[#333333] text-md font-bold font-['Open_Sans']">
                  Profession
                </h4>
                <div class="lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 flex">
                  <div class="pr-5 text-sm">Architectural</div>
                  <div class="flex pl-2 text-sm">
                    <img class="w-2 mr-2" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                      alt="" />
                    Construction
                  </div>
                </div>
              </div>
              <div class="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] p-3 borderBottom">
                <h4 class="text-[#333333] text-md font-bold font-['Open_Sans']">
                  Sector
                </h4>
                <div class="flex lg:grid-cols-1 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
                  <div class="pr-5 text-sm">Architectural</div>
                  <div class="flex pl-2 text-sm">
                    <img class="w-2 mr-2" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/black_dot.svg"
                      alt="" />
                    Construction
                  </div>
                </div>
              </div>
              <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] p-3">
                <div class="flex">
                  <div class="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] pb-2">
                    <h4 class="text-[#333333] text-md font-bold font-['Open_Sans']">
                      Roles/Responsibilities
                    </h4>
                    <p class="text-sm">Please Add Your Responsibilities</p>
                  </div>
                </div>
                <div class="grid text-right">
                  <div>
                    <button>
                      <img class="w-6" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg"
                        alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="grid pl-10 pr-10 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 text-center">
              <p class="text-[#333333] text-sm font-bold font-['Open_Sans']">
                See All
              </p>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="w-full grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 bg-[#ffffff] pt-3 py-3 pl-10 pr-10">
      <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2">
        <h2 class="text-[#03014c] text-left text-lg font-bold font-['Open_Sans']">
          My Professional Journey
        </h2>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('experience_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Experience</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="experienceclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('certificates_green1.svg')" alt="cert" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">
              Certificates
            </h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Certificates
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="certificationclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('education_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Education</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Education
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="educationclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('software_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold"> Software Proficiency</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Software Knowledge is key to do your job efficiently.List All
              Softwares You Know.
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('technical_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">
              Technical Skills
            </h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="keyskillclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('softskill_red1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Soft Skills</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="softskillclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('achievements_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Achievments</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="achievementclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('interest_red1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Interests</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="interestclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div class="grid bg-[#f2f2f2] lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mt-2">
        <div class="flex py-3">
          <div class="pl-3">
            <img :src="getStaticImage('other_green1.svg')" alt="exp" />
          </div>
          <div class="ml-2">
            <h5 class="pt-2 text-[#333333] text-left font-bold">Other</h5>
            <p class="pt-2 text-[#696969] text-left text-xs">
              Please add your Experience
            </p>
          </div>
        </div>
        <div class="grid text-right">
          <div class="mt-6 pr-5">
            <button>
              <img class="w-7" @click="otherdetailsclick()"
                src="https://olous.s3.ap-south-1.amazonaws.com/website/static/add_black.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Card from "primevue/card";
import ProfessionData from "../common/ProfessionData.vue";
import appConstants from "../../appConstants.js";

export default {
  components: {
    ProfessionData,
    Card,
  },

  data() {
    return {
      formData: {
        professionName: "profession",
        sectorName: "sector",
        softwareName: "software",
      },
    };
  },

  methods: {
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
  }
};
</script>
<style scoped>
.marginLeftImg {
  margin-left: 2.2rem;
}

.image {
  display: inline;
}

.circle {
  position: absolute;
  top: 1.1rem;
  width: 10px;
  margin-left: 70px;
}

.borderBottom {
  border-bottom: 1px solid #000;
}

.test p {
  text-align: center;
}

.test .align-test {
  text-align: left;
}

.borderNew {
  border-top: 1px Solid #b7b7b7;
}

.bottom11 {
  bottom: -36px;
}

@media only screen and (max-width: 320px) {
  #mobileScreen {
    display: block !important;
  }

  #largeScreen {
    display: none !important;
  }

  .bottom11 {
    bottom: -31px;
  }

  .circle {
    position: absolute;
    top: 11px;
    width: 10px;
    margin-left: 56px;
  }
}

@media screen and (max-width: 992px) {
  #mobileScreen {
    display: none !important;
  }

  #largeScreen {
    display: block !important;
  }
}

@media screen and (max-width: 600px) {
  #mobileScreen {
    display: block !important;
  }

  #largeScreen {
    display: none !important;
  }

  .bottom11 {
    bottom: -31px;
  }

  .circle {
    position: absolute;
    top: 11px;
    width: 10px;
    margin-left: 56px;
  }

  .circle {
    position: absolute;
    top: 11px;
    width: 10px;
    margin-left: 56px;
  }
}

.p-card .p-card-content {
  padding: 0rem 0 !important;
}
</style>
