import axios from 'axios'
import { Lead }  from '../../modelClasses/LeadModel.js'

const defaultState = () => {
  return {
    leadDetails: '',
  };
};

const state = defaultState();

const getters = {
  getLeadDetails: (state) => state.leadDetails,
}
const mutations = {
  setLeadDetails: (state, leadDetailsData) => {
    state.leadDetails = leadDetailsData
  },
 
}

const actions = {

    action_getLeadsDetailsFromLeadApplicationId({ commit }, lead_application_id) {
      return new Promise((resolve, reject) => {
        return axios
          .get(`/vendors/lead/application/${lead_application_id}/?q=withlead`)
          .then(function (response) {
            let leadDetails_obj = new Lead(response.data.data.lead_details)
            resolve(leadDetails_obj);
          })
          .catch(function (error) {
            reject(error);
          });
      });

    },

    action_getLeadsById({ commit }, lead_application_id) {
      return new Promise((resolve, reject) => {
        return axios
          .get(`/vendors/lead/${lead_application_id}/`)
          .then(function (response) {
            let leadDetails_obj = new Lead(response.data.data)
            resolve(leadDetails_obj);
          })
          .catch(function (error) {
            reject(error);
          });
      });

    },

    action_getLeadsByEncryptedId({ commit }, lead_application_id) {
      return new Promise((resolve, reject) => {
        return axios
          .get(`/vendors/lead/details/${lead_application_id}/`)
          .then(function (response) {
            let leadDetails_obj = new Lead(response.data.data)
            resolve(leadDetails_obj);
          })
          .catch(function (error) {
            reject(error);
          });
      });

    },
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
