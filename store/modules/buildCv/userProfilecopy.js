import axios from 'axios';


const defaultState = () => {
    return {
        UserProfile : ""
    }
  }
  
const state = defaultState()

const getters = {
  getter_UserProfile: (state) => state.UserProfile,
}

const mutations = {
  commit_UserProfile: (state, UserProfileData) => {
    state.UserProfile = UserProfileData
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  action_saveUserProfile({ commit }, data) {
      return new Promise((resolve, reject) => {
        return axios
          .patch("users/current_user/", data)
          .then(function (response) {
            commit('commit_UserProfile',  response.data.data)
            resolve()
          })
          .catch(function (error) {
            console.log(error.message);
            reject()
          })
      })
  },

  action_getUserProfile({ commit }, user_id) {
    //console.log(user_id);
  return new Promise((resolve, reject) => {
    return axios
      .get(`users/current_user/?user=${user_id}`)
      .then(function (response) {
        commit('commit_UserProfile',  response.data.data)
        resolve()
      })
      .catch(function (error) {
        console.log(error.message);
        reject()
      })
  })
},

action_saveOtherDetails({ commit }, data) {
return new Promise((resolve, reject) => {
  return axios
    .patch(`users/current_user/`, data)
    .then(function (response) {
      commit('commit_UserProfile',  response.data.data)
      resolve()
    })
    .catch(function (error) {
      console.log(error.message);
      reject()
    })
})
},

action_getOtherDetails({ commit }, user_id) {
  //console.log(user_id);
return new Promise((resolve, reject) => {
  return axios
    .get(`users/current_user/?user=${user_id}`)
    .then(function (response) {
      commit('commit_UserProfile',  response.data.data)
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
