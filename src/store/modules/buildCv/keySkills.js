import axios from "axios";

const defaultState = () => {
  return {
    keySkillsList: [],
  };
};

const state = defaultState();

const getters = {
    getter_keySkillsList: (state) => state.keySkillsList,
};

const mutations = {
    commit_keySkillsList: (state, keySkillsListData) => {
    state.keySkillsList = keySkillsListData;
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getKeySkillsList({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/user_profile/?user=${user_id}`)
        .then(function (response) {
          let keySkill = []
          if( response.data.data.key_skills.length > 0){
            keySkill = response.data.data.key_skills.key_skills
          }
          commit(
            "commit_keySkillsList",
            keySkill
          );
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_SaveKeySkillsList({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .post("user_profile/key_skills/", data)
        .then(function (response) {
          commit("commit_keySkillsList", response.data.data.skills);
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
