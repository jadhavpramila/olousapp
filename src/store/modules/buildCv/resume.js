import axios from "axios";
import { useLoading } from "vue-loading-overlay";

const defaultState = () => {
  return {
    userApplicantsData:"",
    cvImages:{}
  };
};

const state = defaultState();

const getters = {
  getter_userApplicantsData: (state) => state.userApplicantsData,
  getter_CVImageList:(state) => state.cvImages
};

const mutations = {
  
  commit_userApplicantsData: (state, data) => {
    state.userApplicantsData = data
  },
  commit_setCvImages:(state, data) => {
    state.cvImages = data
  },
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  
  action_fetchUserData({ commit }, application_id) {
    var axios_instance = axios.create();
    delete axios_instance.defaults.headers.common["Authorization"];
    return new Promise((resolve, reject) => {
        axios_instance
          .get(`/vendors/jobs/application/shared/${application_id}/`)
          .then(function (response) {
            commit(
              "commit_userApplicantsData",
              response.data.data
            );
            resolve();
            //loader.hide();
          })
          .catch(function (error) {
            console.log(error.message);
            reject();
            //loader.hide();
          });
      });
  },
  action_fetchCvImages({ commit }, data) {
    const $loading = useLoading();
     let loader = $loading.show();
    return new Promise((resolve, reject) => {
      axios
        .get(
          `/users/create_resume_image/?resume_file=${data.cvFile}&application_id=${data.application_id}`
        )
        .then(function (response) {
          const result = response.data
          commit('commit_setCvImages', result.data)
          loader.hide()
          resolve()
        })
        .catch(function (error) {
          console.log(error.response.data)
          //commit('setError', error)
          loader.hide()
          reject(error)
        })
    })
  },
  action_fetchPDFFile({ commit }, urldata) {
    //let loader = Vue.$loading.show({})
    return new Promise((resolve, reject) => {
      return axios({
        method: 'POST',
        url: '/vendors/jobs/download_cv/',
        data: urldata,
        responseType: 'blob'
      })
        .then((response) => {
          //loader.hide()
          resolve(response.data)
        })
        .catch(function (error) {
          console.log(error)
          //loader.hide()
          reject()
        })
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
