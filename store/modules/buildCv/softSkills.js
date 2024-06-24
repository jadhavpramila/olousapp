import axios from "axios";

const defaultState = () => {
  return {
    softSkillsList: [],
  };
};

const state = defaultState();

const getters = {
  getter_softSkillsList: (state) => state.softSkillsList,
};

const mutations = {
  commit_softSkillsList: (state, data) => {
    state.softSkillsList = data;
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getSoftSkillsList({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/user_profile/?user=${user_id}`)
        .then(function (response) {
            commit(
              "commit_softSkillsList",
              response.data.data.soft_skills.soft_skills
            );
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_SaveSoftSkillsList({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post("user_profile/soft_skills/", data)
        .then(function (response) {
          //   commit("commit_softSkillsList", response.data.data.skills);
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
