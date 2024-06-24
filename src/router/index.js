import { createRouter, createWebHistory } from "vue-router";
// import { useLoading } from "vue-loading-overlay";
import {
  readUserTokenCookie,
  createUserTokenCookie,
} from "../common/js/UserToken.js";
import useEmitter from "../composables/useEmitter.js";

import LoginUserLayout from "/src/components/Layout/LoginUserLayout.vue";
import DefaultLayout from "/src/components/Layout/DefaultLayout.vue";
import store from "/src/store/index.js";
import appConstants from "../appConstants.js";
import { connectWithIOS } from "../bridge/iosBridge.js";

const routes = [
  // {
  //   path: "",
  //   name: appConstants.routes.HOME,
  //   component: () => import("/src/components/Home/Home.vue"),
  //   props: true,
  // },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: appConstants.routes.HOME,
        component: () => import("/src/components/Home/Home.vue"),
        props: true,
      },
      {
        path: appConstants.display_route_Name.BUSINESS_EXPLORE,
        name: appConstants.routes.BUSINESS_EXPLORE,
        component: () => import("/src/components/Home/Business.vue"),
        props: true,
        meta: {
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: appConstants.display_route_Name.JOB_EXPLORE,
        name: appConstants.routes.JOB_EXPLORE,
        component: () => import("/src/components/Home/JobsPage.vue"),
        props: true,
        meta: {
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: appConstants.routes.JSBRIDGE,
        name: appConstants.routes.JSBRIDGE,
        component: () => import("/src/components/jsbridge.vue"),
        props: true,
        meta: {
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: appConstants.routes.IOSBRIDGE,
        name: appConstants.routes.IOSBRIDGE,
        component: () => import("/src/components/iosbridge.vue"),
        props: true,
        meta: {
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: appConstants.routes.LOGIN,
        name: appConstants.routes.LOGIN,
        component: () => import("/src/components/Login/Login.vue"),
        props: true,
        meta: {
          // hideHeader: false,
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: `${appConstants.routes.LOGIN}/:current_route`,
        name: appConstants.routes.LOGINWITHPARAM,
        component: () => import("/src/components/Login/Login.vue"),
        props: true,
        meta: {
          //showHeader: false,
          hideHeader: appConstants.hideHeader.ALL,
        },
      },
      {
        path: appConstants.routes.SIGNUP,
        name: appConstants.routes.SIGNUP,
        component: () => import("/src/components/Signup/Signup.vue"),
        props: true,
        meta: {
          // hideHeader: false,
          hideHeader: appConstants.hideHeader.NULL,
        },
      },

      {
        path: appConstants.routes.ONBOARD,
        name: appConstants.routes.ONBOARD,
        component: () => import("/src/components/Signup/OnBoard.vue"),
        props: true,
        meta: {
          // hideHeader: false,
          hideHeader: appConstants.hideHeader.ALL,
        },
      },
      //timeline and board
      {
        path: appConstants.display_route_Name.TIMELINE,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,

        children: [
          {
            path: "",
            name: appConstants.routes.TIMELINE,
            component: () => import("../components/Timeline/Timeline.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.display_route_Name.TIMELINESEEALL}`,
            name: appConstants.routes.TIMELINESEEALL,
            component: () =>
              import("../components/Timeline/TimelineSeeAll.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `/:user_slug/${appConstants.display_route_Name.ACTIVITY}/${appConstants.display_route_Name.VIDEOS}`,
            name: appConstants.routes.VIDEOS,
            component: () => import("/src/components/Profile/Activities.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },

      // // // create post route
      // {
      //   path: appConstants.routes.CREATEPOST,
      //   name: appConstants.routes.CREATEPOST,
      //   component: () => import("/src/components/Timeline/CreatePost.vue"),
      //   props: true,
      // },
      {
        path: appConstants.routes.CHOOSEORG,
        name: appConstants.routes.CHOOSEORG,
        component: () => import("/src/components/ChooseOrg.vue"),
        props: true,
      },
      {
        path: `/${appConstants.routes.PORTFOLIO_URL}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: "",
            name: appConstants.routes.BUSINESSLIST,
            component: () => import("/src/components/Business/Business.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `:slug`,
            name: appConstants.routes.PORTFOLIO_URL,
            component: () =>
              import("/src/components/CompanyWebsite/CompanyWebsite.vue"),
            props: true,
          },
          {
            path: `:slug/${appConstants.routes.PRODUCTDETAILS}/:product_id`,
            name: appConstants.routes.PRODUCTDETAILS,
            component: () =>
              import("/src/components/CompanyWebsite/ProductDetails.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.LEAD}/:lead_id`,
            name: appConstants.routes.LEAD,
            component: () => import("/src/components/Lead/Lead.vue"),
            props: true,
          },
        ],
      },
      // {
      //   path: `${appConstants.routes.PORTFOLIO_URL}/:slug`,
      //   name: appConstants.routes.PORTFOLIO_URL,
      //   component: () =>
      //     import("/src/components/CompanyWebsite/CompanyWebsite.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.routes.PORTFOLIO_URL}/:slug/${appConstants.routes.PRODUCTDETAILS}/:product_id`,
      //   name: appConstants.routes.PRODUCTDETAILS,
      //   component: () =>
      //     import("/src/components/CompanyWebsite/ProductDetails.vue"),
      //   props: true,
      // },

      // board
      {
        path: `/${appConstants.display_route_Name.BOARDLIST}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: "",
            name: appConstants.routes.BOARDLIST,
            component: () => import("/src/components/Board/BoardList.vue"),
            props: true,
          },
          {
            path: `:board_id`,
            name: appConstants.routes.BOARDDETAILS,
            component: () => import("/src/components/Board/BoardDetails.vue"),
            props: true,
          },
        ],
      },

      // {
      //   path: appConstants.routes.BOARDLIST,
      //   name: appConstants.routes.BOARDLIST,
      //   component: () => import("/src/components/Board/BoardList.vue"),
      //   props: true,
      //   meta: {
      //     hideHeader: true,
      //   },
      // },
      // // board  details route
      // {
      //   path: `${appConstants.routes.BOARDLIST}/:board_id`,
      //   name: appConstants.routes.BOARDDETAILS,
      //   component: () => import("/src/components/Board/BoardDetails.vue"),
      //   props: true,
      //   meta: {
      //     hideHeader: true,
      //   },
      // },

      {
        path: appConstants.routes.FORGOTPASSWORD,
        name: appConstants.routes.FORGOTPASSWORD,
        component: () => import("/src/components/Login/forgotPassword.vue"),
        props: true,
        meta: {
          // hideHeader: false,
          hideHeader: appConstants.hideHeader.NULL,
        },
      },
      {
        path: `/${appConstants.display_route_Name.SEARCH}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `${appConstants.display_route_Name.CONTENT}`,
            name: appConstants.routes.DEFAULT_SEARCH_CONTENT,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.CONTENT}/:searchFor`,
            name: appConstants.routes.SEARCH_CONTENT,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.HEADLINES}`,
            name: appConstants.routes.DEFAULT_SEARCH_HEADLINES,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.HEADLINES}/:searchFor`,
            name: appConstants.routes.SEARCH_HEADLINES,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.DOCUMENTS}`,
            name: appConstants.routes.DEFAULT_SEARCH_DOCUMENTS,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.DOCUMENTS}/:searchFor`,
            name: appConstants.routes.SEARCH_DOCUMENTS,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.BUSINESS}`,
            name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.BUSINESS}/:searchFor`,
            name: appConstants.routes.SEARCH_BUSINESS,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.PROFILE}`,
            name: appConstants.routes.DEFAULT_SEARCH_PROFILE,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
          {
            path: `${appConstants.display_route_Name.PROFILE}/:searchFor`,
            name: appConstants.routes.SEARCH_PROFILE,
            component: () => import("/src/components/Search/Search.vue"),
            props: true,
          },
        ],
      },

      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.CONTENT}`,
      //   name: appConstants.routes.DEFAULT_SEARCH_CONTENT,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.CONTENT}/:searchFor`,
      //   name: appConstants.routes.SEARCH_CONTENT,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.HEADLINES}`,
      //   name: appConstants.routes.DEFAULT_SEARCH_HEADLINES,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.HEADLINES}/:searchFor`,
      //   name: appConstants.routes.SEARCH_HEADLINES,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.DOCUMENTS}`,
      //   name: appConstants.routes.DEFAULT_SEARCH_DOCUMENTS,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.DOCUMENTS}/:searchFor`,
      //   name: appConstants.routes.SEARCH_DOCUMENTS,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.BUSINESS}`,
      //   name: appConstants.routes.DEFAULT_SEARCH_BUSINESS,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.BUSINESS}/:searchFor`,
      //   name: appConstants.routes.SEARCH_BUSINESS,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.PROFILE}`,
      //   name: appConstants.routes.DEFAULT_SEARCH_PROFILE,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.PROFILE}/:searchFor`,
      //   name: appConstants.routes.SEARCH_PROFILE,
      //   component: () => import("/src/components/Search/Search.vue"),
      //   props: true,
      // },
      // {
      //   path: `/${appConstants.display_route_Name.POST}/:post_id`,
      //
      //   component: () => import("/src/components/Post/Post.vue"),
      //   props: true,
      // },
      {
        path: `/${appConstants.display_route_Name.POST}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `:post_id`,
            name: appConstants.routes.POST,
            component: () => import("/src/components/Post/Post.vue"),
            props: true,
          },
        ],
      },
      {
        path: `/${appConstants.display_route_Name.TERMS}`,
        name: appConstants.routes.TERMS,
        component: () => import("/src/components/Policy/Terms.vue"),
        props: true,
      },
      {
        path: `/${appConstants.display_route_Name.PRIVACYPOLICY}`,
        name: appConstants.routes.PRIVACYPOLICY,
        component: () => import("/src/components/Policy/PrivacyPolicy.vue"),
        props: true,
      },
      {
        path: `/${appConstants.display_route_Name.TERMSOFSERVICE}`,
        name: appConstants.routes.TERMSOFSERVICE,
        component: () => import("/src/components/Policy/TermsofService.vue"),
        props: true,
      },
      {
        path: `/${appConstants.display_route_Name.ABOUT}`,
        name: appConstants.routes.ABOUT,
        component: () => import("/src/components/Policy/AboutUs.vue"),
        props: true,
      },
      {
        path: `/${appConstants.display_route_Name.FAQ}`,
        name: appConstants.routes.FAQ,
        component: () => import("/src/components/Home/FAQs.vue"),
        props: true,
      },
      {
        path: `/${appConstants.display_route_Name.UNSUBSCRIBE}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `:unsubscribe_str`,
            name: appConstants.routes.UNSUBSCRIBE,
            component: () =>
              import("/src/components/Unsubscribe/Unsubscribe.vue"),
            props: true,
          },
        ],
      },
      // {
      //   path: appConstants.display_route_Name.SINGLEDAYTOPNEWS,
      //   component: () => import("/src/components/Layout/EmptyLayout.vue"),
      //   props: true,
      //   children: [
      //     {
      //       path: `:encrypted_str`,
      //       name: appConstants.routes.SINGLEDAYTOPNEWS,
      //       component: () =>
      //         import("/src/components/Headlines/SingleDayTopNews.vue"),
      //       props: true,
      //     },
      //     {
      //       path: `${appConstants.display_route_Name.TOPNEWSLIST}`,
      //       name: appConstants.routes.TOPNEWSLIST,
      //       component: () =>
      //         import("/src/components/Headlines/TopNewsList.vue"),
      //       props: true,
      //     },
      //   ],
      // },

      {
        path: appConstants.display_route_Name.JOBS,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        // meta: {
        //   requireAuth: true,
        // },
        children: [
          {
            path: "",
            name: appConstants.routes.JOBS,
            component: () => import("/src/components/Jobs/JobList.vue"),
            // meta: {
            //   requireAuth: true,
            // },
          },
          {
            path: ":job_id",
            name: appConstants.routes.JOBDETAILS,
            component: () => import("/src/components/Jobs/JobDetails.vue"),
            props: true,
            // meta: {
            //   requireAuth: true,
            // },
          },
          {
            path: `:job_id/${appConstants.display_route_Name.STATUS}`,
            name: appConstants.routes.JOBSTATUS,
            component: () =>
              import("/src/components/Jobs/JobApplicationStatus.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.routes.JOBEXTERNAL}/:job_id`,
            name: appConstants.routes.JOBEXTERNAL,
            component: () => import("/src/components/Jobs/JobExternal.vue"),
            props: true,
            // meta: {
            //   requireAuth: true,
            // },
          },
        ],
      },
      {
        // path: "/",
        // component: () => import("/src/components/Layout/EmptyLayout.vue"),
        // props: true,
        // children: [
        // {
        path: appConstants.display_route_Name.EXTERNALUSERPROFILE,
        name: appConstants.display_route_Name.EXTERNALUSERPROFILE,
        component: () =>
          import("/src/components/Profile/ExternalUserProfile.vue"),
        props: true,
        //  },
        // {
        //   path: `:user_slug/${appConstants.display_route_Name.ACTIVITY}`,
        //   name: appConstants.routes.ACTIVITY,
        //   component: () => import("/src/components/Profile/Activities.vue"),
        //   props: true,
        //   meta: {
        //     requireAuth: true,
        //   },
        // },
        //],
      },

      // {
      //   path: `/${appConstants.display_route_Name.JOBS}`,
      //   name: appConstants.routes.JOBS,
      //   component: () => import("/src/components/Jobs/JobList.vue"),
      //   props: true,
      //   meta: {
      //     requireAuth: true,
      //   },
      // },
      // {
      //   path: `/${appConstants.display_route_Name.JOBS}/:job_id`,
      //   name: appConstants.routes.JOBDETAILS,
      //   component: () => import("/src/components/Jobs/JobDetails.vue"),
      //   props: true,
      //   meta: {
      //     requireAuth: true,
      //   },
      // },
      // {
      //   path: `${appConstants.display_route_Name.TOPNEWSLIST}`,
      //   name: appConstants.routes.TOPNEWSLIST,
      //   component: () => import("/src/components/Headlines/TopNewsList.vue"),
      //   props: true,
      //   // meta: {
      //   //   requireAuth: true,
      //   // },
      // },
      {
        path: `${appConstants.routes.ARTICLE}`,
        name: appConstants.routes.ARTICLE,
        component: () => import("/src/components/Article/Article.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      // {
      //   path: "/",
      //   component: () => import("/src/components/Layout/EmptyLayout.vue"),
      //   props: true,
      //   children: [
      //     {
      //       path: `:user_slug`,
      //       name: appConstants.routes.VIEWPROFILE,
      //       component: () => import("/src/components/Profile/viewProfile.vue"),
      //       props: true,
      //     },
      //     {
      //       path: `:user_slug/${appConstants.display_route_Name.ACTIVITY}`,
      //       name: appConstants.routes.ACTIVITY,
      //       component: () => import("/src/components/Profile/Activities.vue"),
      //       props: true,
      //       meta: {
      //         requireAuth: true,
      //       },
      //     },
      //   ],
      // },
      {
        path: "/",
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `:user_slug`,
            name: appConstants.routes.VIEWPROFILE,
            component: () => import("/src/components/Profile/viewProfile.vue"),
            props: true,
          },
          {
            path: `:user_slug/${appConstants.display_route_Name.ACTIVITY}`,
            name: appConstants.routes.ACTIVITY,
            component: () => import("/src/components/Profile/Activities.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `:user_slug/${appConstants.display_route_Name.PREVIEWCV}`,
            name: appConstants.routes.PREVIEWCV,
            component: () => import("/src/components/Profile/PreviewCV.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },

      // {
      //   path: `/:user_slug`,
      //   name: appConstants.routes.VIEWPROFILE,
      //   component: () => import("/src/components/Profile/viewProfile.vue"),
      //   props: true,
      // },
      // {
      //   path: `/:user_slug/${appConstants.display_route_Name.ACTIVITY}`,
      //   name: appConstants.routes.ACTIVITY,
      //   component: () => import("/src/components/Profile/Activities.vue"),
      //   props: true,
      // },
      {
        path: appConstants.display_route_Name.BUILDCV,
        name: appConstants.routes.BUILDCV,
        component: () => import("/src/components/Profile/buildCV.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        // path: `${appConstants.display_route_Name.PROFILENEW}/:user_slug`,
        path: appConstants.display_route_Name.PROFILENEW,
        // path: `:user_slug`,
        name: appConstants.routes.PROFILENEW,
        component: () => import("/src/components/Profile/profileNew.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        // path: `${appConstants.display_route_Name.PROFILENEW}/:user_slug`,
        path: appConstants.display_route_Name.LANGUAGE,
        // path: `:user_slug`,
        name: appConstants.routes.LANGUAGE,
        component: () => import("/src/components/Profile/Language.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.SOFTWAREPROFICIENCIES,
        name: appConstants.routes.SOFTWAREPROFICIENCIES,
        component: () =>
          import("/src/components/Profile/SoftwareProficiencies.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.RESPONSIBILITY,
        name: appConstants.routes.RESPONSIBILITY,
        component: () => import("/src/components/Profile/Responsibility.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.KEYSKILLS,
        name: appConstants.routes.KEYSKILLS,
        component: () => import("/src/components/Profile/KeySkills.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.ACHIEVEMENTS,
        name: appConstants.routes.ACHIEVEMENTS,
        component: () => import("/src/components/Profile/Achievements.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.CERTIFICATION,
        name: appConstants.routes.CERTIFICATION,
        component: () => import("/src/components/Profile/Certifications.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.EDUCATION,
        name: appConstants.routes.EDUCATION,
        component: () => import("/src/components/Profile/Education.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.INTEREST,
        name: appConstants.routes.INTEREST,
        component: () => import("/src/components/Profile/Interest.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.OTHERDETAILS,
        name: appConstants.routes.OTHERDETAILS,
        component: () => import("/src/components/Profile/OtherDetails.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.SOFTSKILLS,
        name: appConstants.routes.SOFTSKILLS,
        component: () => import("/src/components/Profile/softSkills.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.EXPERIENCE,
        name: appConstants.routes.EXPERIENCE,
        component: () => import("/src/components/Profile/Experience.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.EDITPROFILE,
        name: appConstants.routes.EDITPROFILE,
        component: () => import("/src/components/Profile/editProfile.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: appConstants.display_route_Name.MESSAGING,
        name: appConstants.routes.MESSAGING,
        component: () => import("/src/components/Messaging/Conversation.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: `${appConstants.display_route_Name.CONVERSATION}/:conversation_id`,
            name: appConstants.routes.CONVERSATION,
            component: () =>
              import("/src/components/Messaging/MessagingList.vue"),
            props: true,
            meta: {
              requireAuth: true,
              // hideHeader: true,
              hideHeader: appConstants.hideHeader.LAPTOP,
            },
          },
          {
            path: `${appConstants.display_route_Name.CONVERSATION}/${appConstants.display_route_Name.NEW}`,
            name: appConstants.routes.NEW_CONVERSATION,
            component: () =>
              import("/src/components/Messaging/MessagingList.vue"),
            props: true,
            meta: {
              requireAuth: true,
              hideHeader: appConstants.hideHeader.LAPTOP,
            },
          },
        ],
      },
      {
        path: appConstants.display_route_Name.SETTINGS,
        name: appConstants.display_route_Name.SETTINGS,
        component: () => import("/src/components/Settings/Setting.vue"),
        props: true,
        children: [
          {
            path: `${appConstants.display_route_Name.CHANGEPASSWORD}`,
            name: appConstants.display_route_Name.CHANGEPASSWORD,
            component: () =>
              import("/src/components/Settings/ChangePassword.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.display_route_Name.PUSHNOTIFICATION}`,
            name: appConstants.display_route_Name.PUSHNOTIFICATION,
            component: () =>
              import("/src/components/Settings/PushNotification.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.display_route_Name.EMAILNOTIFICATION}`,
            name: appConstants.display_route_Name.EMAILNOTIFICATION,
            component: () =>
              import("/src/components/Settings/EmailNotification.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.display_route_Name.PERSONALINFO}`,
            name: appConstants.display_route_Name.PERSONALINFO,
            component: () =>
              import("/src/components/Settings/PersonalInfo.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      // {
      //   path: `${appConstants.routes.FOLLOWERSANDFOLLOWING}/:users_type`,
      //   name: appConstants.routes.FOLLOWERSANDFOLLOWING,
      //   component: () =>
      //     import("/src/components/Profile/FollowersAndFollowingList.vue"),
      //   props: true,
      // },
      // {
      //   path: "/",
      //   component: () => import("/src/components/Layout/EmptyLayout.vue"),
      //   props: true,
      //   children: [
      //     {
      //       path: `:user_slug/:users_type`,
      //       name: appConstants.routes.FOLLOWERSANDFOLLOWING,
      //       component: () =>
      //         import("/src/components/Profile/FollowersAndFollowingList.vue"),
      //       props: true,
      //       meta: {
      //         requireAuth: true,
      //       },
      //     },
      //   ],
      // },

      // {
      //   path: `/${appConstants.display_route_Name.MESSAGING}/${appConstants.display_route_Name.CONVERSATION}/:conversation_id`,
      //   name: appConstants.routes.CONVERSATION,
      //   component: () => import("/src/components/Messaging/Conversation.vue"),
      //   props: true,
      //   meta: {
      //     requireAuth: true,
      //   },
      // },
      // route for msging android
      {
        path: appConstants.display_route_Name.MOBILE,
        name: appConstants.routes.MOBILE,
        component: () =>
          import("/src/components/mobileMessaging/Conversation.vue"),
        props: true,
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: `${appConstants.display_route_Name.MOBILECONVERSATION}/:conversation_id`,
            name: appConstants.routes.MOBILECONVERSATION,
            component: () =>
              import("/src/components/mobileMessaging/MessagingList.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
          {
            path: `${appConstants.display_route_Name.MOBILECONVERSATION}/${appConstants.display_route_Name.MOBILENEW}`,
            name: appConstants.routes.MOBILENEW_CONVERSATION,
            component: () =>
              import("/src/components/mobileMessaging/MessagingList.vue"),
            props: true,
            meta: {
              requireAuth: true,
            },
          },
        ],
      },
      {
        path: `/${appConstants.routes.EVENTREGISTRATION}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `${appConstants.routes.REGISTER}/:encoded_str`,
            name: appConstants.routes.EVENTREGISTRATION,
            component: () =>
              import("/src/components/EventRegistration/EventRegistration.vue"),
            props: true,
          },
        ],
      },
      {
        path: `/${appConstants.routes.RESUME}`,
        component: () => import("/src/components/Layout/EmptyLayout.vue"),
        props: true,
        children: [
          {
            path: `:encoded_str`,
            name: appConstants.routes.RESUME,
            component: () => import("/src/components/Profile/UserResume.vue"),
            props: true,
          },
        ],
      },
      {
        path: `${appConstants.display_route_Name.PRICING}/:order_id`,
        name: appConstants.routes.PRICING,
        component: () => import("/src/components/Pricing/Pricing.vue"),
        props: true,
      },
      {
        path: `${appConstants.display_route_Name.PRICING}/${appConstants.display_route_Name.SUCCESS}`,
        name: appConstants.routes.PRICING_SUCCESS,
        component: () => import("/src/components/Pricing/PaymentSuccess.vue"),
        props: true,
      },

      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("/src/components/Layout/NotFound.vue"),
      },
    ],
  },
  // {
  //   path: `/${appConstants.routes.BUILDCV}`,
  //   component: LoginUserLayout,
  //   meta: {
  //     requireAuth: true,
  //   },
  //   children: [

  //   ],
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "not-found",
  //   component: () => import("/src/components/Layout/NotFound.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior() {
  //   // window.scrollTo(0, 0);
  // },
  scrollBehavior(to, from) {
    return new Promise((resolve, reject) => {
      // if (to.name === appConstants.routes.TIMELINE) {
      //   setTimeout(() => {
      //     window.scrollTo(
      //       0,
      //       parseInt(store.getters["timeline/getter_scrollBarPosition"] || "0")
      //     );
      //   }, 400);
      // } else {
      //   window.scrollTo(0, 0);
      // }
      //console.log("")
    });
  },
});

// let loader = null;
// let saved_token = readUserTokenCookie()
// let $loading = useLoading();

// function hideLoader() {
//   // if (loader) {
//   //   loader.hide();
//   //   loader = null;
//   // }
// }

// function showLoader() {
//   // hideLoader();
//   // loader = $loading.show({});
// }

router.beforeEach(async (to, from, next) => {
  // if (to.name) {
  //   showLoader();
  // }
  // if (to.name == appConstants.routes.HOME) {
  //   store.commit("login/commit_showNav", false);
  // } else {
  //   store.commit("login/commit_showNav", true);
  // }
  // if (
  //   from.name == appConstants.routes.JOBS &&
  //   to.name != appConstants.routes.VIEWPROFILE
  // ) {
  //   store.commit("timeline/commit_scrollBarPosition", window.pageYOffset);
  // }

  store.commit("login/commit_previousUrl", from.name);

  // if (to.matched.some((record) => record.meta.requireAuth)) {
  //   let userToken = readUserTokenCookie();
  //   if (userToken != "" && userToken == store.state.login.token) {
  //     next();
  //     return;
  //   } else {

  //     //if token in cookie and vuex did not match , logout user and move to home page
  //     store.dispatch("login/logout");
  //     next(`/`);
  //     return;
  //   }
  // } else {
  //   next();
  // }

  // console.log("route : Inside router.beforeEach");
  let userToken = readUserTokenCookie();
  // console.log("userToken =>", userToken);
  let tokenFromApp = to.query.token;

  if (to.query.device) {
    // console.log("in device");
    store.commit("login/commit_device", to.query.device);
    store.commit("login/commit_showNav", false);
    //console.log("device =>", to.query.device);
  }
  if (to.query.close) {
    store.commit("login/commit_directFromUserProfile", to.query.close);
    // console.log("close =>", to.query.close);
  }

  // appConstants.devices.IOS = "ios"
  if (to.query.device == appConstants.devices.IOS) {
    // alert("connect with ios");
    let res = await connectWithIOS();
    //console.log(" res =>", res);
  } else if (to.query.device == appConstants.devices.ANDROID) {
    // let res = await connectWithANDROID();
    // console.log("to.query.device == appConstants.devices.ANDROID");
  }

  //As we have removed timeline navigate user to home page
  // if (to.name == appConstants.routes.TIMELINE) {
  //   next({ name: appConstants.routes.DEFAULT_SEARCH_BUSINESS });
  // }

  if (tokenFromApp) {
    if (userToken != tokenFromApp) {
      // // console.log("previous token is not equal to received token so login");

      await createUserTokenCookie(tokenFromApp);
      await store
        .dispatch("login/getUserDataFromToken", tokenFromApp)
        .then(() => {
          store.commit("login/commit_showNav", false);
          if (to.query.device) {
            //console.log("in device");
            store.commit("login/commit_device", to.query.device);
            // console.log("device =>", to.query.device);
          }
          store.commit("messaging/commit_is_mobile", true);
        });
    }
    // let url = appConstants.routes.MESSAGING;
    let routerName = to.name;
    // let url;
    //console.log("to =>", to);
    // alert("route to ");
    if (routerName == appConstants.routes.MOBILE) {
      next({ name: appConstants.routes.MOBILE });
    } else if (routerName == appConstants.routes.MOBILECONVERSATION) {
      next({
        name: appConstants.routes.MOBILECONVERSATION,
        params: { conversation_id: to.params.conversation_id },
      });
    } else if (routerName == appConstants.routes.MOBILENEW_CONVERSATION) {
      store.commit("login/commit_tokenSlug", to.query.slug);
      next({
        name: appConstants.routes.MOBILENEW_CONVERSATION,
        query: { slug: to.query.slug },
      });
    }

    return;
  } else {
    //console.log("token not");
    store.commit("login/commit_directFromUserProfile", false);
    if (userToken != "" && userToken == store.state.login.token) {
      //console.log("1 if", to.name);
      if (
        to.name == appConstants.routes.HOME &&
        userToken != "" &&
        userToken == store.state.login.token
      ) {
        //console.log(`to.name before 2 if,${to.name}`);
        // next(
        //   `/${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.BUSINESS}`
        // );
        next({ name: appConstants.routes.TIMELINE });
        return;
      }
      //console.log(`to.name before token store matched:,${to.name}`);
      next();
      return;
    } else {
      //console.log("3 else");
      if (userToken == "") {
        //console.log("4 if");
        if (store.state.login.token != "") {
          store.dispatch("login/logout");
        }
        if (to.matched.some((record) => record.meta.requireAuth)) {
          // console.log("6 if");
          next(`/${appConstants.routes.LOGIN}`);
          return;
        } else {
          // console.log("7 else");
          next();
          return;
        }
      } else {
        await store
          .dispatch("login/getUserDataFromToken", userToken)
          .then(() => {
            //console.log("9 success");
            if (
              to.name == appConstants.routes.HOME &&
              userToken != "" &&
              userToken == store.state.login.token
            ) {
              //console.log(`to.name before 2 if,${to.name}`);
              // next(
              //   `/${appConstants.display_route_Name.SEARCH}/${appConstants.display_route_Name.BUSINESS}`
              // );
              next({ name: appConstants.routes.TIMELINE });
              return;
            }
            next();
            return;
          })
          .catch(() => {
            // console.log("10 fail");
            // console.log("userToken did not match");
            // console.log(
            //   `userToken : ${userToken} -- store.state.login.token : ${store.state.login.token}`
            // );
            store.dispatch("login/logout");
            if (to.matched.some((record) => record.meta.requireAuth)) {
              // console.log("11 if");
              next(`/`);
              return;
            } else {
              // console.log("12 else");
              next();
              return;
            }
          });
      }
    }
  }
});

// router.afterEach(() => {
//   hideLoader();
// });

export default router;
