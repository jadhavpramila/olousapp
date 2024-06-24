import axios from 'axios';

const defaultState = () => {
    return {
        achievementsList : []
    }
  }
  
const state = defaultState()

const getters = {
  getter_achievementsList: (state) => state.achievementsList,
}

const mutations = {
  commit_achievementsList: (state, achievementsListData) => {
    state.achievementsList = achievementsListData
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {

    action_getAchievementsList({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        return axios
          .get(`/user_profile/?user=${user_id}`, )
          .then(function (response) {
            commit('commit_achievementsList',  response.data.data.achievements.achievements)
            resolve()
          })
          .catch(function (error) {
            console.log(error.message);
            reject()
          })
      })
   },

    action_SaveAchievementsList({ commit }, data) {
      return new Promise((resolve, reject) => {
        return axios
          .post("user_profile/achievements/", data)
          .then(function (response) {
            commit('commit_achievementsList',  response.data.data.achievements)
            resolve()
          })
          .catch(function (error) {
            console.log(error.message);
            reject()
          })
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
