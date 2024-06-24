<template>
  <div class="cls-viewProfile form-container">
    <div class="grid lg:grid-cols-4 grid-cols-1 gap-3">
      <div class="lg:col-span-4 col-span-1">
        <!--first section  -->
        <div class="bg-[#fff] rounded-t-2xl px-5 pt-5 pb-5">
          <div class="grid md:grid-cols-3 items-start">
            <div class="grid md:col-span-2 mt-2">
              <div class="text-center lg:col-span-3 md:col-span-3 col-span-12">
                <p class="flex justify-start">
                  <Skeleton
                    width="25%"
                    height="20px"
                    class="mb-1 rounded-lg"
                  ></Skeleton>
                </p>
                <p class="flex justify-start mt-5">
                  <Skeleton
                    width="65%"
                    height="35px"
                    class="rounded-lg"
                  ></Skeleton>
                </p>
                <p class="flex justify-start mt-3">
                  <Skeleton
                    width="55%"
                    height="35px"
                    class="rounded-lg"
                  ></Skeleton>
                </p>
                <p class="flex justify-start mt-3">
                  <Skeleton
                    width="45%"
                    height="35px"
                    class="rounded-lg"
                  ></Skeleton>
                </p>
                <p class="flex justify-start mt-5">
                  <Skeleton
                    width="40%"
                    height="15px"
                    class="mb-3 rounded-lg"
                  ></Skeleton>
                </p>
                <p class="flex justify-start mt-10">
                  <Skeleton
                    width="25%"
                    height="40px"
                    class="mr-16 rounded-lg"
                  ></Skeleton>
                </p>
                <!--  <div class="flex mt-5">
                  <Skeleton
                    width="35%"
                    height="40px"
                    class="mb-1 mr-4 rounded-lg"
                  ></Skeleton>
                  <Skeleton
                    width="35%"
                    height="40px"
                    class="mb-1 mr-4 rounded-lg"
                  ></Skeleton>
                </div> -->
              </div>
            </div>
            <div class="flex self-center order-first md:order-last">
              <Skeleton
                shape="circle"
                class="rounded-full flex md:w-60 md:h-60 lg:w-72 lg:h-72 h-[8.75rem] w-[8.75rem] justify-center items-center relative mx-auto lg:max-w-none"
              ></Skeleton>
            </div>
          </div>
        </div>

        <!-- second section -->
        <div id="largeScreen" class="lg:block md:block hidden">
          <div class="bg-[#f2fafa] p-5">
            <div class="flex pb-8 items-center justify-between">
              <Skeleton
                width="10%"
                height="30px"
                class="mb-1 mr-4 rounded-md"
              ></Skeleton>
              <Skeleton
                width="10%"
                height="30px"
                class="mb-1 mr-4 rounded-md"
              ></Skeleton>
            </div>
            <div class="infografic-cv-main w-full pb-2 justify-between">
              <div class="infographic-img-width">
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
              </div>
              <!--<div
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot"
              >
                <hr class="infographic-line relative w-full" />
                <img
                  :src="getStaticImage('black_dot.svg')"
                  alt=""
                  class="md:w-2.5 absolute"
                />
              </div>
              <div class="infographic-img-width">
                <div class="flex flex-col items-center">
                  <div class="flex flex-col items-center">
                    <Skeleton
                      shape="circle"
                      class="w-[3rem] h-[3rem] rounded-full"
                    ></Skeleton>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="infografic-cv-main w-full justify-between">
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>

              <!-- <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot w-full"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div>
              <div
                class="flex items-center justify-center infographic-line-dot"
              >
                <hr class="" />
              </div>
              <div class="infographic-img-width flex justify-center">
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div> -->
            </div>
            <div class="flex justify-end space-x-5">
              <div class="flex space-x-5 justify-end">
                <Skeleton
                  width="10%"
                  height="20px"
                  class="rounded-md"
                ></Skeleton>

                <Skeleton
                  width="10%"
                  height="20px"
                  class="rounded-md"
                ></Skeleton>

                <Skeleton
                  width="10%"
                  height="20px"
                  class="rounded-md"
                ></Skeleton>
              </div>
            </div>
          </div>
        </div>
        <!-- mobile screen -->
        <div id="mobileScreen" class="lg:hidden md:hidden block">
          <div class="bg-[#f2fafa] p-3">
            <div class="flex pb-4 justify-between items-center">
              <Skeleton
                width="10%"
                height="30px"
                class="mb-1 mr-4 rounded-md"
              ></Skeleton>
              <Skeleton
                width="10%"
                height="30px"
                class="mb-1 mr-4 rounded-md"
              ></Skeleton>
            </div>
            <div class="infografic-cv-main-mobile w-full justify-between">
              <div class="infographic-img-width-mobile">
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>
                <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton>
              </div> -->
            </div>
            <div class="infografic-cv-main-mobile w-full justify-between">
              <div class="infographic-img-width-mobile">
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>

                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>

                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
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
                <div class="flex flex-col items-center">
                  <Skeleton
                    shape="circle"
                    class="w-[3rem] h-[3rem] rounded-full"
                  ></Skeleton>
                </div>

                <!-- <Skeleton
                  width="100%"
                  height="15px"
                  class="rounded-md"
                ></Skeleton> -->
              </div>
              <!-- <div class="flex justify-center infographic-line-dot w-full">
                <hr class="infographic-line relative w-full" />
                <img
                  :src="getStaticImage('black_dot.svg')"
                  alt=""
                  class="md:w-2.5 absolute"
                />
              </div>
              <div class="infographic-img-width-mobile">
                <div class="flex flex-col items-center">
                  <div class="flex flex-col items-center">
                    <Skeleton
                      shape="circle"
                      class="w-[3rem] h-[3rem] rounded-full"
                    ></Skeleton>
                  </div>

                  <Skeleton
                    width="100%"
                    height="15px"
                    class="rounded-md"
                  ></Skeleton>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";

export default {
  name: "viewProfileSkeleton",
  components: {
    Skeleton,
  },
};
</script>
<style scoped>
.line {
  height: 47px;
  border-bottom: 1px solid #343434;
  position: absolute;
}

@media only screen and (max-width: 992px) {
  .infografic-cv-main {
    display: grid;
    grid-template-columns: 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px;
    padding-bottom: 30px;
  }
}
@media only screen and (min-width: 992px) {
  .infografic-cv-main {
    display: grid;
    grid-template-columns: 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px 1fr 50px;
    padding-bottom: 30px;
  }
}
.infografic-cv-main-mobile {
  display: grid;
  grid-template-columns: 40px 1fr 40px 1fr 40px;
  padding-bottom: 30px;
}

.infografic-cv-main-mobile .infographic-line-dot {
  margin-top: 20px;
}

.infografic-cv-main-mobile img {
  margin-top: -5px;
}

/* .infographic-line-dot {
  width: auto;
  height: auto;
} */
.infographic-line {
  border: 1px solid #b7b7b7;
}
</style>
