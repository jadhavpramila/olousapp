import { data } from "autoprefixer";
import axios from "axios";
import { useLoading } from "vue-loading-overlay";
import {
  createUserTokenCookie,
  deleteUserTokenCookie,
  readUserTokenCookie,
} from "../../../common/js/UserToken.js";
import router from "../../../router/index.js";
import appConstants from "../../../appConstants.js";

const defaultState = () => {
  return {
    token: "",
    user: "",
    isUserLoggedIn: false,
    error: "",
    forgotPasswordOTP: "",
    resetPassword: "",
    verifyPhoneOTP: "",
    verifyEmailOTP: "",
    optVerified: "",
    onBoard: "",
    companies: "",
    folllowIds: "",
    previousUrl: "",
    showNav: true,
    directFromUserProfile: false,
    device: null,
    userType: "",
    landingPage: "",
  };
};

const state = defaultState();

function checkCookieCreated() {
  console.log(`----Function called to check is cookies created-----`);
  let userToken = readUserTokenCookie();
  if (userToken == "") {
    console.log(
      `++++++ Cookies created in empty so called function again +++  : ${userToken}`
    );
    checkCookieCreated();
  } else {
    console.log(`*********Cookies created*********** : ${userToken}`);
    console.log(userToken);
  }
}

const getters = {
  getter_token: (state) => state.token,
  getter_user: (state) => state.user,
  getter_isUserLoggedIn: (state) => state.isUserLoggedIn,
  getter_error: (state) => state.error,
  getter_forgotPasswordOTP: (state) => state.forgotPasswordOTP,
  getter_resetPassword: (state) => state.resetPassword,
  getter_verifyPhoneOTP: (state) => state.verifyPhoneOTP,
  getter_verifyEmailOTP: (state) => state.verifyEmailOTP,
  getter_optVerified: (state) => state.optVerified,
  getter_onBoardData: (state) => state.onBoard,
  getter_userCompany: (state) => state.companies,
  getter_followIds: (state) => state.folllowIds,
  getter_previousUrl: (state) => state.previousUrl,
  getter_showNav: (state) => state.showNav,
  getter_directFromUserProfile: (state) => state.directFromUserProfile,
  getter_device: (state) => state.device,
  getter_userType: (state) => state.userType,
  getter_landingPage: (state) => state.landingPage,
};

const mutations = {
  commit_token(state, TokenData) {
    state.token = TokenData;
  },
  commit_device(state, data) {
    state.device = data;
  },
  commit_directFromUserProfile(state, data) {
    // console.log("data in commit_directFromUserProfile =>", data);
    state.directFromUserProfile = data;
  },

  commit_showNav(state, data) {
    state.showNav = data;
  },

  commit_user(state, userData) {
    state.user = userData;

    if (userData == "") {
      state.isUserLoggedIn = false;
    } else {
      state.isUserLoggedIn = true;
    }
  },

  commit_error(state, errorData) {
    state.error = errorData;
  },
  commit_forgotPasswordOTP(state, data) {
    state.forgotPasswordOTP = data;
  },
  commit_resetPassword(state, data) {
    state.resetPassword = data;
  },
  commit_verifyEmailOTP(state, data) {
    state.verifyEmailOTP = data;
  },
  commit_verifyPhoneOTP(state, data) {
    state.verifyPhoneOTP = data;
  },
  commit_optVerified(state, data) {
    state.optVerified = data;
  },
  commit_onBoardDetails(state, data) {
    state.onBoard = data;
  },
  commit_userCompany(state, data) {
    state.companies = data;
  },
  commit_sessionData(state, data) {
    // console.log("session data in commit =>", data);
    state.folllowIds = data;
  },
  commit_previousUrl(state, data) {
    state.previousUrl = data;
  },
  commit_userType(state, data) {
    state.userType = data;
  },
  commit_landingPage(state, data) {
    state.landingPage = data;
  },

  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_verifyPhoneOTP({ commit }, data) {
    // console.log(data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("/users/get_phone_otp/", data)
        .then((response) => {
          commit("commit_verifyPhoneOTP", response);
          resolve();
          loader.hide();
        })
        .catch((error) => {
          loader.hide();
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject("Something went wrong.");
          }
        });
    });
  },
  action_verifyEmailOTP({ commit }, data) {
    // console.log(data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("/users/send_signup_email_for_verification/", data)
        .then((response) => {
          commit("commit_verifyEmailOTP", response);
          resolve();
          loader.hide();
        })
        .catch((error) => {
          loader.hide();
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject("Something went wrong.");
          }
        });
    });
  },
  action_phoneOTP({ commit }, data) {
    // console.log("data in action_phoneOTP", data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("/users/verify_phone_otp/", data.verifyOTP)
        .then((response) => {
          axios
            .post("/accounts/registration/", data.phone_data)
            .then((res) => {
              const result = res.data;
              const token = result.data.token.access;
              const user = result.data.user;
              createUserTokenCookie(token);
              commit("commit_token", token);
              commit("commit_user", user);
              resolve();
              loader.hide();
            })
            .catch((error) => {
              deleteUserTokenCookie();
              if (error.response) {
                reject(error.response.data.message);
              } else {
                reject("Something went wrong.");
              }
              loader.hide();
            });
        })
        .catch((error) => {
          loader.hide();
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject("Something went wrong.");
          }
        });
    });
  },
  action_emailOTP({ commit }, data) {
    //console.log("action email  otp in store =>", data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .post("/users/verify_signup_email_otp/", data.verifyOTP)
        .then((response) => {
          // console.log(response);
          axios
            .post("/accounts/registration/", data.email_data)
            .then((res) => {
              commit("commit_optVerified", res.data.data.status);
              const result = res.data;
              const token = result.data.token.access;
              const user = result.data.user;
              createUserTokenCookie(token);
              commit("commit_token", token);
              commit("commit_user", user);
              resolve();
              loader.hide();
            })
            .catch((error) => {
              deleteUserTokenCookie();
              // commit("commit_error", error.response.data.message);
              if (error.response) {
                reject(error.response.data.message);
              } else {
                reject("Something went wrong.");
              }
              loader.hide();
            });
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else {
            reject("Something went wrong.");
          }
          loader.hide();
        });
    });
  },
  action_saveOnBoardDetails({ commit }, data) {
    // console.log(data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch("/users/current_user/", data)
        .then((response) => {
          commit("commit_onBoardDetails", response);
          resolve();
          loader.hide();
        })
        .catch((error) => {
          // commit('commit_error', e)
          reject();
          loader.hide();
        });
    });
  },
  createAccount({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    // console.log("data in store =>", data);
    commit("commit_user", data);
    var axios_instance = axios.create();
    delete axios_instance.defaults.headers.common["Authorization"];
    return new Promise((resolve, reject) => {
      axios_instance
        .post("/accounts/registration/", data)
        .then((res) => {
          const result = res.data;
          const token = result.data.token.access;
          const user = result.data.user;
          createUserTokenCookie(token);
          commit("commit_token", token);
          commit("commit_user", user);
          resolve();
          loader.hide();
        })
        .catch((error) => {
          deleteUserTokenCookie();
          commit("commit_error", error.response.data.message);
          reject();
          loader.hide();
        });
    });
  },
  action_updateAccount({ commit }, updateProfileData) {
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .patch("/users/current_user/", updateProfileData)
        .then((res) => {
          const user = result.data;
          commit("commit_user", user);
          resolve();
          loader.hide();
        })
        .catch((error) => {
          commit("commit_error", error.response.data.message);
          loader.hide();
          reject();
        });
    });
  },
  login({ commit }, authData) {
    const $loading = useLoading();
    let loader = $loading.show();
    var axios_instance = axios.create();
    delete axios_instance.defaults.headers.common["Authorization"];
    // console.log(authData);
    return new Promise((resolve, reject) => {
      axios_instance
        .post("/login/", authData)
        .then((res) => {
          // console.log("res =>", res.data.data.user.id);
          // console.log(window.sessionStorage);
          let obj = [];
          obj.push(res.data.data.id);
          // console.log(obj);
          // let obj = {
          //   id: res.data.data.id,
          //   name: res.data.data.first_name + " " + res.data.data.last_name,
          // };
          // session implementation
          // window.sessionStorage.setItem("fllowIds", obj);
          // let session = sessionStorage.setItem("");
          // console.log(session);
          // commit("commit_sessionData", session);
          const result = res.data;
          const token = result.data.token.access;
          const user = result.data.user;
          // let userToken = readUserTokenCookie();
          createUserTokenCookie(token);
          commit("commit_token", token);
          commit("commit_user", user);

          //console.log(`token : ${token}`)

          // checkCookieCreated()

          resolve();
          loader.hide();
        })
        .catch((error) => {
          deleteUserTokenCookie();
          // commit("commit_error", error.response.data.message);
          reject(error.response);
          loader.hide();
        });
    });
  },
  sendOTP({ commit }, authData) {
    var axios_instance = axios.create();
    delete axios_instance.defaults.headers.common["Authorization"];
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios_instance
        .post("/users/get_login_otp/", { username: authData })
        .then((res) => {
          resolve(res);
          loader.hide();
        })
        .catch((error) => {
          commit("commit_error", error.response);
          reject(error.response);
          loader.hide();
        });
    });
  },
  action_sendOTPForForgotPassword({ commit }, data) {
    const $loading = useLoading();
    let loader = $loading.show();
    // console.log("data in store =>", data);
    return new Promise((resolve, reject) => {
      return axios
        .post("/users/forgot_pwd/", { email: data })
        .then((res) => {
          // console.log(res);
          commit("commit_forgotPasswordOTP", res);
          resolve(res);
          loader.hide();
        })
        .catch((error) => {
          // console.log(error);
          commit("commit_forgotPasswordOTP", error.response.data);
          reject(error.response);
          loader.hide();
        });
    });
  },
  action_resetPassword({ commit }, data) {
    // console.log("data in store =>", data);
    const $loading = useLoading();
    let loader = $loading.show();
    return new Promise((resolve, reject) => {
      return axios
        .post("users/otp/validate/", data)
        .then((res) => {
          commit("commit_resetPassword", res);
          resolve(res);
          loader.hide();
        })
        .catch((error) => {
          // console.log(error);
          commit("commit_resetPassword", error.response.data);
          loader.hide();
          reject(error.response);
        });
    });
  },
  action_userCompany({ commit }) {
    // console.log("in action_userCompany");
    return new Promise((resolve, reject) => {
      return axios
        .get("vendors/company/allcompanies")
        .then((res) => {
          // console.log(res.data.data);
          commit("commit_userCompany", res.data.data);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
  logout({ commit }) {
    //console.log("logout function called");
    // eslint-disable-next-line no-unused-vars

    return new Promise(async (resolve, reject) => {
      commit("commit_user", "");
      commit("commit_token", "");
      commit("commit_error", "");
      // this.$router.push({ name: appConstants.routes.HOME });.
      // router.push("/");

      await deleteUserTokenCookie();
      // router.push({ name: appConstants.routes.HOME });

      // store.replaceState({})
      this.dispatch("resetAllStoreState", { root: true }).then(() => {
        localStorage.removeItem("olous_app_vuexdata");
        resolve();
        //console.log("logout resolve****************");
      });
    });
  },
  getUserDataFromToken({ commit }, currentToken) {
    //console.log("called : getUserDataFromToken");
    return new Promise((resolve, reject) => {
      this.dispatch("resetAllStoreState", { root: true });
      localStorage.removeItem("olous_app_vuexdata");

      axios
        .get("/users/current_user/")
        .then((res) => {
          commit("commit_token", currentToken);
          //console.log("after login =>", res.data.data.id);
          const user = res.data.data;
          commit("commit_user", user);

          resolve();
        })
        .catch((err) => {
          commit("commit_token", "");
          reject();
        });
    });
  },
  action_updateUserLastActivity({ commit }, currentToken) {
    // console.log("called : getUserDataFromToken");
    return new Promise((resolve, reject) => {
      axios
        .post("olous_user/update_last_activity/")
        .then((res) => {
          // console.log("after login =>", res.data.data.id);
          const user = res.data.data;
          //commit("commit_user", user);
          //commit("commit_token", currentToken);
          resolve();
        })
        .catch((err) => {
          reject();
        });
    });
  },

  action_fetchUserDetails({ commit }, currentToken) {
    return new Promise((resolve, reject) => {
      var axios_instance = axios.create();
      const token = readUserTokenCookie();
      if (token) {
        axios_instance.defaults.headers.Authorization = `Bearer ${token}`;
      }
      return axios_instance
        .get("/users/current_user/")
        .then((res) => {
          const user = res.data.data;
          commit("commit_user", user);
          resolve();
        })
        .catch((err) => {
          reject();
        });
    });
  },

  action_fetchUserType({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/search/usertypes/")
        .then((res) => {
          let data = res.data.data.hits.hits;
          let objArray = [];

          if (data) {
            for (let i = 0; i < data.length; i++) {
              if (data[i]._source.visible == "true") {
                let obj = {
                  id: parseInt(data[i]._source.id),
                  name: data[i]._source.display_string,
                  visible: data[i]._source.visible,
                  input_type: parseInt(data[i]._source.input_type),
                };
                objArray.push(obj);
              }
            }
          }
          commit("commit_userType", objArray);
          resolve();
        })
        .catch((err) => {
          reject();
        });
    });
  },
  action_getLandingPage({ commit }) {
    return new Promise((resolve, reject) => {
      var axios_instance = axios.create();
      const token = readUserTokenCookie();
      if (token) {
        axios_instance.defaults.headers.Authorization = `Bearer ${token}`;
      }
      return axios_instance
        .get("/olous_user/landingpage/")
        .then((res) => {
          commit("commit_landingPage", res.data.data);
          resolve();
        })
        .catch((err) => {
          reject();
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
