import axios from "axios";

const defaultState = () => {
  return {
    
  };
};

const state = defaultState();

const getters = {
};

const mutations = {
};

const actions = {

  action_requestForOTP({ commit }, payload) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_user/otp/create/`, payload)
        .then(function (response) {
          var order_object = response["data"]["data"]
          resolve(order_object);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },

  action_checkIsOTPCorrect({ commit }, payload) {

    return new Promise((resolve, reject) => {
      return axios
        .post(`/olous_user/otp/match/`, payload)
        .then(function (response) {
          resolve(response["data"]["data"]);
        })
        .catch(function (error) {
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
