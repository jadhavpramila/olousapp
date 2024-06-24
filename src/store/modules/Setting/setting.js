import axios from "axios";
import { data } from "browserslist";

const defaultState = () => {
  return {
    ChangePassword: "",
    emailNotificationStatus: {},
    emailPermission: {},
  };
};

const state = defaultState();

const getters = {
  getter_changePassword: (state) => state.ChangePassword,
  getter_deleteAccount: (state) => state.DeleteAccount,
  getter_emailNotificationStatus: (state) => state.emailNotificationStatus,
  getter_setEmailPermission: (state) => state.emailPermission,
};

const mutations = {
  commit_changePassword: (state, data) => {
    state.test_state = data;
  },
  commit_deleteAccount: (state, data) => {
    state.DeleteAccount = data;
  },
  commit_emailNotificationStatus: (state, data) => {
    state.emailNotificationStatus = data;
  },
  commit_emailPermission: (state, data) => {
    state.emailPermission = data;
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_ChangePassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/users/reset_pwd/`, data)
        .then(function (response) {
          console.log("commit_changePassword", response.data);

          commit("commit_changePassword", response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("commit_changePassword", error.message);
          reject(error);
        });
    });
  },
  action_deleteAccount({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_user/delete_account/`, data)
        .then(function (response) {
          console.log("commit_deleteAccount", response.data);

          commit("commit_deleteAccount", response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("commit_deleteAccount", error.message);
          reject(error);
        });
    });
  },
  action_getEmailNotificationStatus({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/users/email_permission_status/`)
        .then(function (response) {
          commit("commit_emailNotificationStatus", response.data.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("commit_emailNotificationStatus", error.message);
          reject(error);
        });
    });
  },
  action_setEmailPermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/users/email_permission_with_token/`, data)
        .then(function (response) {
          commit("commit_emailPermission", response.data.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log("commit_emailPermission", error.message);
          reject(error);
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
