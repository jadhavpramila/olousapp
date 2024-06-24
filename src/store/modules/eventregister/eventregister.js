import axios from "axios";

const defaultState = () => {
  return {
    RegistrationData: {},
  };
};

const state = defaultState();

const getters = {
  getter_registrationData: (state) => state.RegistrationData,
};

const mutations = {
  commit_RegistrationData: (state, data) => {
    state.RegistrationData = data;
  },
};

const actions = {
  action_eventRegisterUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/event/registeruser/`, data)
        .then(function (response) {
          commit("commit_RegistrationData", response.data.data);
          resolve(response.data.data);
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
