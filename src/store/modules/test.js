import axios from 'axios';

const defaultState = () => {
    return {
        test_state : ""
    }
  }
  
const state = defaultState()

const getters = {
  getTest: (state) => state.test_state,
}

const mutations = {
  setTest: (state, testData) => {
    state.test_state = testData
  },

  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
    getTestData({ commit }, id) {
      axios.get("/vendors/company/info/a531b93d-6a62-4aec-a18d-7f0763cad6c5")
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
