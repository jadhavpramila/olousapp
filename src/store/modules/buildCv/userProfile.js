import axios from "axios";
import {
  UserProfileModel,
  KeySkillSModel,
  SoftSkillSModel,
  AccreditionsModel,
  OrganizationModel,
  AchievementsModel,
  RegisterdOrganizationModel,
  User,
  LanguageModel,
  SoftwareDetailsModel,
  OtherDetailWithShowOtherDetailsModel,
} from "../../modelClasses/UserProfileModel.js";
import { useLoading } from "vue-loading-overlay";
import {
  Post,
  GetPostListFromAPIResponse,
} from "../../modelClasses/PostModel.js";
// import { UserProfileModel, KeySkillSModel, OrganizationModel, RegisterdOrganizationModel } from '../../modelClasses/UserProfileModel';

const defaultState = () => {
  return {
    UserProfile: "",
    UserProfileNew: "",
    saveNewOrg: "",
    incompleteFields: [],
    UserActivitiesData: "",
    followUnfollowStatusData: "",
    UnfollowStatusData: "",
    FollowStatusData: "",
    SuggestedUserList: "",
    sendCvData: "",
    userFollowersList: [],
    userFollowingList: [],
    UserProfileReadOnly: "",
    CVImagesData: "",
    oneUserData: "",
    userProjectsDataReadOnly: "",
  };
};

const state = defaultState();

const getters = {
  getter_UserProfile: (state) => state.UserProfile,
  getter_UserProfileNew: (state) => state.UserProfileNew,
  getter_newOrg: (state) => state.saveNewOrg,
  getter_incompleteFields: (state) => state.incompleteFields,
  getter_userActivitiesData: (state) => state.UserActivitiesData,
  getter_FollowUnfollowStatus: (state) => state.followUnfollowStatusData,
  getter_UnfollowStatus: (state) => state.UnfollowStatusData,
  getter_FollowStatus: (state) => state.FollowStatusData,
  getter_SuggestedUserList: (state) => state.SuggestedUserList,
  getter_sendCvStatus: (state) => state.sendCvData,
  getter_userFollowingList: (state) => state.userFollowingList,
  getter_userFollowersList: (state) => state.userFollowersList,
  getter_UserProfileReadOnly: (state) => state.UserProfileReadOnly,
  getter_CVImagesData: (state) => state.CVImagesData,
  getter_oneUserData: (state) => state.oneUserData,
  getter_userProjectsDataReadOnly: (state) => state.userProjectsDataReadOnly,
};

const mutations = {
  commit_incompleteFields: (state, incompleteFieldsData) => {
    state.incompleteFields = incompleteFieldsData;
  },

  commit_UserProfile: (state, UserProfileData) => {
    state.UserProfile = new UserProfileModel(UserProfileData);
  },
  commit_UserProfileNew: (state, UserProfileData) => {
    state.UserProfile = new UserProfileModel(UserProfileData);
  },

  commit_keySkills: (state, keySkillData) => {
    state.UserProfile.key_skills = new KeySkillSModel(keySkillData);
  },

  commit_softSkills: (state, softSkillData) => {
    state.UserProfile.soft_skills = new SoftSkillSModel(softSkillData);
  },

  commit_certification: (state, certificationData) => {
    state.UserProfile.accreditions = new AccreditionsModel(certificationData);
  },

  commit_achievements: (state, achievementsData) => {
    state.UserProfile.achievements = new AchievementsModel(achievementsData);
  },

  commit_InterestList: (state, InterestsData) => {
    state.UserProfile.interests = InterestsData;
  },

  commit_OtherDetails: (state, OtherDetailsData) => {
    state.UserProfile.user_details = OtherDetailsData;
  },

  commit_addOrg: (state, orgData) => {
    let newOrg = new OrganizationModel(orgData);
    state.UserProfile.org_details.push(newOrg);
  },

  commit_updateOrg: (state, orgData) => {
    let updatedOrg = new OrganizationModel(orgData);
    let index = state.UserProfile.org_details.findIndex(
      (c) => c.id == updatedOrg.id
    );
    if (index > -1) {
      state.UserProfile.org_details[index] = updatedOrg;
    }
  },

  commit_deleteOrg: (state, orgID) => {
    let index = state.UserProfile.org_details.findIndex((c) => c.id == orgID);
    if (index > -1) {
      state.UserProfile.org_details.splice(index, 1);
    }
  },

  commit_responsibilities: (state, data) => {
    let index = state.UserProfile.org_details.findIndex((c) => c.id == data.id);
    if (index > -1) {
      state.UserProfile.org_details[index].responsibilities =
        data.responsibilities;
    }
  },

  commit_newOrg: (state, newOrg) => {
    state.saveNewOrg = newOrg;
  },

  commit_userData: (state, userData) => {
    //state.UserProfile.user_details = userData;
    let userInfo = new User(userData);
    state.UserProfile.user_details = [];
    state.UserProfile.user_details.push(userInfo);
  },

  commit_cvData: (state, cvData) => {
    let userCvData = new OtherDetailWithShowOtherDetailsModel(cvData);
    state.UserProfile.other_details = userCvData;
  },

  commit_userEmail: (state, email) => {
    if (state.UserProfile.user_details[0]) {
      state.UserProfile.user_details[0].email = email;
    }
  },
  commit_userPhone: (state, data) => {
    if (state.UserProfile.user_details[0]) {
      state.UserProfile.user_details[0].phone = data.phone;
      state.UserProfile.user_details[0].country_code = data.country_code;
    }
  },
  commit_UserActivitiesData: (state, UserActivitiesData) => {
    // console.log("UserActivitiesData", UserActivitiesData)
    let res = {};
    res = new GetPostListFromAPIResponse(UserActivitiesData.postData);
    // console.log("data object", res);
    if (UserActivitiesData.page == 1) {
      // console.log("in if", res);
      state.UserActivitiesData = [];
      for (let post of res.posts) {
        if (!state.UserActivitiesData.includes(post)) {
          state.UserActivitiesData.push(post);
        }
        // state.UserActivitiesData.push(post);
      }
      // console.log(res);
      state.total_posts = res.total_posts;
    } else {
      // console.log("in else", res);
      for (let post of res.posts) {
        if (!state.UserActivitiesData.includes(post)) {
          state.UserActivitiesData.push(post);
        }
        // state.UserActivitiesData.push(post);
      }
      // console.log(res);
      state.total_posts = res.total_posts;
    }
  },
  commit_likeUserActivityPost: (state, data) => {
    // console.log(state.posts);
    state.UserActivitiesData.find((option) => {
      if (option.id == data.id) {
        option.like_id.id = data.response.id;
        option.like_id.is_deleted = data.response.is_deleted;
        option.numberOfLikes = option.numberOfLikes + 1;
      }
    });
  },
  commit_unlikeUserActivityPost: (state, data) => {
    // console.log(data);
    state.UserActivitiesData.find((option) => {
      if (option.id == data) {
        option.like_id.id = "";
        option.like_id.is_deleted = true;
        option.numberOfLikes = option.numberOfLikes - 1;
      }
    });
  },
  commit_deletePost: (state, postId) => {
    let index = state.UserActivitiesData.findIndex((c) => c.id == postId);
    if (index > -1) {
      state.UserActivitiesData.splice(index, 1);
    }
  },
  commit_followUnfollowStatus: (state, followUnfollowStatusData) => {
    state.followUnfollowStatusData = followUnfollowStatusData;
  },
  commit_UnfollowStatus: (state, UnfollowStatusData) => {
    state.UnfollowStatusData = UnfollowStatusData;
  },
  commit_FollowStatus: (state, FollowStatusData) => {
    state.FollowStatusData = FollowStatusData;
  },
  commit_suggestedUserList: (state, SuggestedUserList) => {
    state.SuggestedUserList = SuggestedUserList;
  },
  commit_sendCvToMail: (state, sendCvData) => {
    state.sendCvData = sendCvData;
  },
  commit_userFollowersList: (state, data) => {
    if (data.usersData == null) {
      return;
    }
    if (data.page == 1) {
      // console.log("in if", data.response);
      state.userFollowersList = [];
      for (let list of data.usersData) {
        state.userFollowersList.push(list);
      }
    } else {
      // console.log("in else", data.response);
      for (let list of data.usersData) {
        state.userFollowersList.push(list);
      }
    }
    //state.userFollowersList = data;
  },
  commit_userFollowingList: (state, data) => {
    if (data.usersData == null) {
      return;
    }
    if (data.page == 1) {
      state.userFollowingList = [];
      for (let list of data.usersData) {
        let user = new User(list);
        state.userFollowingList.push(user);
      }
    } else {
      for (let list of data.usersData) {
        let user = new User(list);
        state.userFollowingList.push(user);
      }
    }
    //state.userFollowingList = data;
  },
  commit_addLanguage: (state, languageData) => {
    let newAddedLanguage = new LanguageModel(languageData);
    state.UserProfile.language_details.push(newAddedLanguage);
  },
  commit_updateLanguage: (state, languageData) => {
    let updatedLanguage = new LanguageModel(languageData);
    let index = state.UserProfile.language_details.findIndex(
      (c) => c.id == updatedLanguage.id
    );
    if (index > -1) {
      state.UserProfile.language_details[index] = updatedLanguage;
    }
  },
  commit_deleteLanguage: (state, languageID) => {
    let index = state.UserProfile.language_details.findIndex(
      (c) => c.id == languageID
    );
    if (index > -1) {
      state.UserProfile.language_details.splice(index, 1);
    }
  },
  commit_addSoftware: (state, SoftwareData) => {
    let newAddedSoftware = new SoftwareDetailsModel(SoftwareData);
    state.UserProfile.software_details.push(newAddedSoftware);
  },
  commit_updateSoftware: (state, softwareData) => {
    let updatedSoftware = new SoftwareDetailsModel(softwareData);
    let index = state.UserProfile.software_details.findIndex(
      (c) => c.id == updatedSoftware.id
    );
    if (index > -1) {
      state.UserProfile.software_details[index] = updatedSoftware;
    }
  },
  commit_deleteSoftware: (state, softwareRecordID) => {
    let index = state.UserProfile.software_details.findIndex(
      (c) => c.id == softwareRecordID
    );
    if (index > -1) {
      state.UserProfile.software_details.splice(index, 1);
    }
  },
  commit_UserProfileReadOnly: (state, data) => {
    state.UserProfileReadOnly = new UserProfileModel(data);
  },
  commit_CVImagesData: (state, data) => {
    state.CVImagesData = data;
  },
  commit_oneUserData: (state, data) => {
    state.oneUserData = data;
  },
  commit_userProjectsDataReadOnly: (state, data) => {
    state.userProjectsDataReadOnly = data;
  },
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getUserProfile({ commit }, userSlug) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/user_profile/?slug=${userSlug}`)
        .then(function (response) {
          // console.log("response.data.data", response.data.data);
          commit("commit_UserProfile", response.data.data);
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
          // loader.hide();
        });
    });
  },
  action_getUserProfileNew({ commit }, userSlug) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/olous_user/display_user_profile/?slug=${userSlug}`)
        .then(function (response) {
          // console.log("response.data.data", response.data.data);
          commit("commit_UserProfile", response.data.data);
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
          // loader.hide();
        });
    });
  },

  action_saveEducationDetails({ commit }, data) {
    let responsibility = [];
    if ("responsibility" in data) {
      responsibility = data.responsibility;
      delete data.responsibility;
    }
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/users/${data.id}/experience/?v=1`, data.data)
        .then(function (response) {
          commit("commit_addOrg", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_updateEducationDetails({ commit }, data) {
    let responsibility = [];
    if ("responsibility" in data) {
      responsibility = data.responsibility;
      delete data.responsibility;
    }
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch(`/users/${data.id}/experience/${data.data.id}/?v=2`, data.data)
        .then(function (response) {
          commit("commit_updateOrg", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_saveExperienceDetails({ commit }, data) {
    let responsibility = [];
    if ("responsibility" in data) {
      responsibility = data.responsibility;
      delete data.responsibility;
    }
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/users/${data.id}/experience/?v=1`, data.data)
        .then(function (response) {
          commit("commit_addOrg", response.data.data);
          resolve(response.data.data);
          loader.hide();
          // axios
          //   .patch(
          //     `/users/experience/${response.data.data.id}/update_responsibilities/`,
          //     responsibility
          //   )
          //   .then((response) => {
          //     console.log(response);
          //     commit("commit_updateOrg", response.data.data);
          //     resolve();
          //     loader.hide();
          //   })
          //   .catch(function (error) {
          //     console.log(error.message);
          //     reject();
          //     loader.hide();
          //   });
        })
        .catch(function (error) {
          console.log(error);
          // reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_updateExperienceDetails({ commit }, data) {
    let responsibility = [];
    if ("responsibility" in data) {
      responsibility = data.responsibility;
      delete data.responsibility;
    }

    if ("responsibilities" in data.data) {
      delete data.data.responsibilities;
    }
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch(`/users/${data.id}/experience/${data.data.id}/?v=2`, data.data)
        .then(function (response) {
          commit("commit_updateOrg", response.data.data);
          // console.log("response.data.data", response.data.data);
          resolve(response.data);
          loader.hide();
          // axios
          //   .patch(
          //     `/users/experience/${response.data.data.id}/update_responsibilities/`,
          //     responsibility
          //   )
          //   .then((response) => {
          //     commit("commit_updateOrg", response.data.data);
          //     resolve(response.data);
          //     loader.hide();
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //     reject();
          //     loader.hide();
          //   });
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
          loader.hide();
        });
    });
  },

  action_updateResponsibility({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`/users/experience/${data.id}/update_responsibilities/`, data)
        .then((response) => {
          commit("commit_responsibilities", data);
          resolve(response.data);
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error);
          reject();
          // loader.hide();
        });
    });
  },

  action_saveNewOrg({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("users/orgs/", data)
        .then(function (response) {
          commit("commit_newOrg", response.data.data);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },

  action_deleteOrg({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .delete(`users/${data.user_id}/userOrgDetails/${data.org_id}/`)
        .then(function (response) {
          commit("commit_deleteOrg", data.org_id);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },

  action_SaveKeySkillsList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("user_profile/key_skills/", data)
        .then(function (response) {
          commit("commit_keySkills", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_SaveSoftSkillsList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post("user_profile/soft_skills/", data)
        .then(function (response) {
          commit("commit_softSkills", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_savecertificationList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();

    return new Promise((resolve, reject) => {
      return axios
        .post("user_profile/accreditions/", data)
        .then(function (response) {
          commit("commit_certification", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_SaveAchievementsList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post("user_profile/achievements/", data)
        .then(function (response) {
          commit("commit_achievements", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_SaveInterestList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .patch("users/current_user/", data)
        .then(function (response) {
          commit("commit_InterestList", response.data.data.interests);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  // send email otp
  action_getEmailOTP({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post("users/send_email_for_verification/", data)
        .then(function (response) {
          //  console.log("response in store =>",response);
          resolve(response);
          loader.hide();
        })
        .catch(function (error) {
          // console.log(error);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  // verify email otp
  action_emailOTPVerify({ commit }, data) {
    // console.log("data in email =>", data.otp);
    let OTP = { otp: data.otp };
    const $loading = useLoading();
    let loader = $loading.show();
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post("users/verify_email_otp/", OTP)
        .then(function (response) {
          // console.log("email response in store =>", data.email);
          commit("commit_userEmail", data.email);
          resolve(response);
          loader.hide();
        })
        .catch(function (error) {
          // cconsole.log(error);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  //send phone otp
  action_getPhoneOTP({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post("users/get_phone_otp/", data)
        .then(function (response) {
          // console.log("response in store =>", response);
          resolve(response);
          loader.hide();
        })
        .catch(function (error) {
          // console.log(error);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  // verify phone otp
  action_phoneOTPVerify({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post("users/verify_phone_otp/", data)
        .then(function (response) {
          // console.log(response.data.data);
          // console.log(data);
          commit("commit_userPhone", data);
          resolve(response);
          loader.hide();
        })
        .catch(function (error) {
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_getIncompleteFields({ commit }) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get("/user_profile/get_incomplete_fields/?v=1")
        .then(function (response) {
          commit(
            "commit_incompleteFields",
            response.data.data.incomplete_fields
          );
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          // loader.hide();
        });
    });
  },

  action_SaveUserProfileData({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .patch("users/current_user/", data)
        .then(function (response) {
          commit("commit_userData", response.data.data);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_getLoggedInUserCVcontactInfo({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .get("users/current_user/cv_contact_info/")
        .then(function (response) {
          let res = {
            show_other_details: true,
            other_details: response.data.data,
          };
          commit("commit_cvData", res);
          resolve(response.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_getUserActivitiesData({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/timeline/activities/?slug=${data.slug}&page=${data.page}&limit=${data.limit}&offset=${data.offset}`
        )
        .then(function (response) {
          // console.log("then");
          let obj = {
            page: data.page,
            postData: response.data.results,
          };
          // console.log(obj);
          commit("commit_UserActivitiesData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          let obj = {
            page: data.page,
            postData: null,
          };
          commit("commit_UserActivitiesData", obj);
          reject();
        });
    });
  },
  action_getUserChannelData({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/timeline/activities/videos/?slug=${data.slug}&page=${data.page}&limit=${data.limit}&offset=${data.offset}`
        )
        .then(function (response) {
          // console.log("then");
          let obj = {
            page: data.page,
            postData: response.data.results,
          };
          // console.log(obj);
          commit("commit_UserActivitiesData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          let obj = {
            page: data.page,
            postData: null,
          };
          commit("commit_UserActivitiesData", obj);
          reject();
        });
    });
  },
  action_likeUserActivityPost({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      this.dispatch("post/likePost", data)
        .then(function (response) {
          // console.log("commit_like response in userProfile", response);
          commit("commit_likeUserActivityPost", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_unlikeUserActivityPost({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      this.dispatch("post/unlikePost", data)
        .then(function (response) {
          // console.log("commit_unlike response in userProfile", response);
          commit("commit_unlikeUserActivityPost", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_reportPost({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post(`posts/report/`, data)
        .then(function (response) {
          // console.log(response);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error.response);
        });
    });
  },
  action_deletePost({ commit }, post_id) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/timeline/post/${post_id}/`)
        .then(function (response) {
          // console.log(response);
          commit("commit_deletePost", post_id);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject(error.response);
        });
    });
  },
  action_getFollowStatus({ commit }, userId) {
    // return new Promise((resolve, reject) => {
    //   return axios
    //     .post(`users/${userId}/follow/`)
    //     .then(function (response) {
    //       commit("commit_FollowStatus", response.data.data);
    //       resolve();
    //     })
    //     .catch(function (error) {
    //       commit("commit_FollowStatus", "");
    //       reject();
    //     });
    // });
    return new Promise((resolve, reject) => {
      let data = {
        id: userId,
        data: {
          reset_feeds: false,
        },
      };
      this.dispatch("post/follow", data)
        .then(function (response) {
          //console.log("response", response);
          commit("commit_FollowStatus", response);
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_getUnfollowStatus({ commit }, userId) {
    // return new Promise((resolve, reject) => {
    //   return axios
    //     .post(`users/${userId}/unfollow/`)
    //     .then(function (response) {
    //       commit("commit_UnfollowStatus", response.data.data);
    //       resolve();
    //     })
    //     .catch(function (error) {
    //       commit("commit_UnfollowStatus", "");
    //       reject();
    //     });
    // });
    return new Promise((resolve, reject) => {
      this.dispatch("post/unfollow", userId)
        .then(function (response) {
          //console.log("response", response);
          commit("commit_UnfollowStatus", response);
          resolve(response);
        })
        .catch(function (error) {
          console.log(error);
          reject();
        });
    });
  },
  action_getFollowUnfollowStatus({ commit }, userId) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`users/${userId}/follow_status/`)
        .then(function (response) {
          commit("commit_followUnfollowStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          commit("commit_followUnfollowStatus", "");
          reject();
        });
    });
  },
  action_getSuggestedUserList({ commit }) {
    //const $loading = useLoading();
    //let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get("/suggestions/")
        .then(function (response) {
          commit(
            "commit_suggestedUserList",
            response.data.results.suggested_users
          );
          resolve();
          //loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          //loader.hide();
        });
    });
  },
  action_sendCvToMail({ commit }) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get("/users/resume/?resume_type=download")
        .then(function (response) {
          commit("commit_sendCvToMail", response.data);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_getUserFollowersList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/users/${data.id}/followers/?limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          let obj = {
            page: data.page,
            usersData: response.data.results,
          };
          commit("commit_userFollowersList", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },
  action_getUserFollowingList({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/users/${data.id}/followees/?limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          let obj = {
            page: data.page,
            usersData: response.data.results,
          };
          commit("commit_userFollowingList", obj);
          let res = {
            currentPage: data.page,
            next: response.data.next,
          };
          resolve(res);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
          loader.hide();
        });
    });
  },

  action_getIsProfileComplete({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/search/userhasdata/`)
        .then(function (response) {
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },

  action_addLanguageDetails({ commit }, data) {
    //console.log("sore data", data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/user_profile/language/add/`, data)
        .then(function (response) {
          let resData = response.data.data;
          // console.log("resData", resData);
          resData["language_name"] = data.language_name;
          commit("commit_addLanguage", resData);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          loader.hide();
          reject(error.response.data);
        });
    });
  },

  action_updateLanguageDetails({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch(`/user_profile/language/update/`, data)
        .then(function (response) {
          let resData = response.data.data;
          resData["language_name"] = data.language_name;

          commit("commit_updateLanguage", resData);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          loader.hide();
          reject(error.response.data);
        });
    });
  },

  action_deleteLanguageDetails({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .delete(`/user_profile/language/${data.id}/`)
        .then(function (response) {
          commit("commit_deleteLanguage", data.id);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_addSoftwareDetails({ commit }, data) {
    //console.log("action_addSoftwareDetails", data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/user_profile/softwares/add/`, data)
        .then(function (response) {
          let resData = response.data.data;
          resData["software"] = data.software;

          commit("commit_addSoftware", resData);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_updateSoftwareDetails({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/user_profile/softwares/update/`, data)
        .then(function (response) {
          // let resData = response.data.data;
          // resData["software"] = data.software;

          commit("commit_updateSoftware", data);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },

  action_deleteSoftwareDetails({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .delete(`/user_profile/softwares/${data.id}/`)
        .then(function (response) {
          commit("commit_deleteSoftware", data.id);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  action_sendContactUsData({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post(`/olous_user/query/`, data)
        .then(function (response) {
          //commit("commit_deleteSoftware", data.id);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  action_getExistingConversation({ commit }, userId) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch(`/messaging/conversation/existingconversation/${userId}/`)
        .then(function (response) {
          // commit("commit_existingConversation", response.data.data);
          resolve(response.data.data);
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  action_getCVImages({ commit }) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/resume/?resume_type=preview`)
        .then(function (response) {
          commit("commit_CVImagesData", response.data.data);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error.response.data);
          loader.hide();
        });
    });
  },
  action_fetchOneUserData({ commit }, userid) {
    //console.log("userid", userid);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/users/fetch_one_user/${userid}/`)
        .then(function (response) {
          commit("commit_oneUserData", response.data);
          resolve();
          loader.hide();
        })
        .catch(function (error) {
          reject(error.response.data);
          loader.hode();
        });
    });
  },
  action_getUserProfileReadOnly({ commit }, userSlug) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/olous_user/display_user_profile_readonly/?slug=${userSlug}`)
        .then(function (response) {
          // console.log("response.data.data", response.data.data);
          commit("commit_UserProfileReadOnly", response.data.data);
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
          // loader.hide();
        });
    });
  },
  action_getUserCompany({ commit }, userid) {
    // const $loading = useLoading();
    // let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/project/user/all/${userid}`)
        .then(function (response) {
          // console.log("response.data.data", response.data.data);
          commit("commit_userProjectsDataReadOnly", response.data.data);
          resolve();
          // loader.hide();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
          // loader.hide();
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
