import axios from 'axios';

const defaultState = () => {
    return {
        certificationDetails : []
    }
  }
  
const state = defaultState()

const getters = {
  getter_certificationList: (state) => state.certificationDetails,
}

const mutations = {
  commit_certificationList: (state, certificationListData) => {
    state.certificationDetails = certificationListData
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
    action_savecertificationList({ commit }, data) {
        console.log(data);
      return new Promise((resolve, reject) => {
        return axios
          .post("user_profile/accreditions/", data)
          .then(function (response) {
            commit('commit_certificationList',  response.data.data.accreditions)
            resolve()
          })
          .catch(function (error) {
            console.log(error.message);
            reject()
          })
      })
  },


  action_getCertificationlist({ commit }, user_id) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/user_profile/?user=${user_id}`, )
        .then(function (response) {
          commit('commit_certificationList',  response.data.data.accreditions.accreditions)
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
