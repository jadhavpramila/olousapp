import axios from "axios";

const defaultState = () => {
  return {
    searchedData: [],
  };
};

const state = defaultState();
const getters = {
  getter_searchResult: (state) => state.searchedData,
};
const mutations = {
  commit_searchResult: (state, searchData) => {
    state.searchedData = searchData;
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};
const actions = {
  action_searchResult({ commit }, query) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/company/?q=${query}`)
        .then(function (response) {
          commit("commit_searchResult", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
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
