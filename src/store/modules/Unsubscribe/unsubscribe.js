import axios from "axios";

const defaultState = () => {
  return {
    ReasonstList: [],
    UnsubscribeData: {},
    UnsubscribeEmailID: "",
  };
};

const state = defaultState();

const getters = {
  getter_reasonsListData: (state) => state.ReasonstList,
  getter_unsubscribeData: (state) => state.UnsubscribeData,
  getter_UnsubscribeEmailID: (state) => state.UnsubscribeEmailID,
};

const mutations = {
  commit_ReasonsList: (state, reasonsData) => {
    state.ReasonstList = reasonsData.reasons.data;
    state.UnsubscribeEmailID = reasonsData.unsubscribe_email_id;

    //console.log(state.UnsubscribeEmailID);
  },
  commit_unsubscribeData: (state, UnsubscribeData) => {
    state.UnsubscribeData = UnsubscribeData;
  },
};

const actions = {
  action_getReasonsList({ commit }, type) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/users/unsubscription_reasons/?q=${type}`)
        .then(function (response) {
          console.log("data", response.data.data);
          commit("commit_ReasonsList", response.data.data);
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },
  action_unsubscribeUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/users/email_permission/`, data)
        .then(function (response) {
          // console.log("action_unsubscribeUser", response.data.data);

          commit("commit_unsubscribeData", response.data.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },
  action_resubscribeUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/users/email_permission/`, data)
        .then(function (response) {
          //console.log("action_resubscribeUser", response.data.data);

          commit("commit_unsubscribeData", response.data.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
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
