import axios from "axios";

const defaultState = () => {
  return {
  };
};

const state = defaultState();

const getters = {
};

const mutations = {
 
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getSharableURL({ commit }, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        return axios
        .post("olous_user/geturl/", data)
        .then(function (response) {
            resolve(response.data.data.url)
        })
        .catch(function (error) {
            console.log(error.message);
            reject()
        })
    })
  }
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
