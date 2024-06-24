<template>
  <div class="py-3 bg-[#fff] w-full fixed top-0">
    <div class="content-max-width">
      <div class="nav flex w-full justify-between">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <img
              @click="homePage()"
              src="../../assets/olous_logo_black.svg"
              alt=""
              class="cursor-pointer lg:w-40 md:w-40 w-32"
            />
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div class="nav-links">
          <a @click="homePage()">Home</a>
          <a @click="jobsClick()" target="_blank">Jobs</a>
          <a @click="businessClick()">Business</a>
          <a href="#">Leads</a>
          <a href="#">Learning</a>
          <a @click="signInPage()">Sign In</a>
        </div>
      </div>

      <!-- <div class="flex flex-row w-full justify-between">
        
        <button
          class="bg-white cursor-pointer font-weight-700 px-4 rounded-full text-base text-black"
         
        >
          Sign In
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import appConstants from "../../appConstants.js";
export default {
  name: "HomeStaticData",
  setup() {
    const router = useRouter();

    onMounted(() => {
      //myFunction();
    });
    // function myFunction() {
    //   var x = document.getElementById("myTopnav");
    //   if (x.className === "topnav") {
    //     x.className += " responsive";
    //   } else {
    //     x.className = "topnav";
    //   }
    // }
    function homePage() {
      router.push({ name: appConstants.routes.HOME });
    }
    function signInPage() {
      router.push({ name: appConstants.routes.LOGIN });
    }
    function jobsClick() {
      // store.commit("jobs/commit_currentJobType", appConstants.jobType.ALL);
      // router.push({ name: appConstants.routes.JOBS });
    }
    function businessClick() {
      router.push({ name: appConstants.routes.BUSINESS_EXPLORE });
    }

    return {
      homePage,
      signInPage,
      jobsClick,
      businessClick,
      // myFunction,
    };
  },
};
</script>

<style>
nav {
  height: 50px;
  width: 100%;
  background-color: #4d4d4d;
  position: relative;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #000;
}

.nav > .nav-links > a:hover {
  background-color: #fff;
  color: var(--app-primary-color);
  font-weight: 700;
}

.nav > #nav-check {
  display: none;
}

@media (max-width: 600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
    /* color: #000;
    background-color: #000; */
  }
  .nav > .nav-btn > label:hover,
  .nav #nav-check:checked ~ .nav-btn > label {
    background-color: #f4efe9;
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #000;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: auto;
    background-color: #fff;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    right: 0px;
    text-align: right;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: auto;
    overflow-y: auto;
  }
}
</style>
