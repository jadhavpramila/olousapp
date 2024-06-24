import axios from "axios";
import { company } from "../../modelClasses/CompanyModel.js";

const defaultState = () => {
  return {
    BusinessData: [],
  };
};

const state = defaultState();

const getters = {
  getter_businessData: (state) => state.BusinessData,
};

const mutations = {
  commit_businessData: (state, data) => {
    let companies = [];
    // console.log("data to commit in business.js =>", data.data);
    if (data.data != null) {
      for (let singleCompanyObject of data.data) {
        let singleObject = new company(singleCompanyObject);
        companies.push(singleObject);
      }
    }

    // state.BusinessData = data;
    if (companies == null) {
      // console.log("null");
      state.BusinessData = [];
      return;
    }
    if (data.page == 1) {
      state.BusinessData = [];
      for (let singleData of companies) {
        state.BusinessData.push(singleData);
      }
    } else {
      for (let singleData of companies) {
        state.BusinessData.push(singleData);
      }
    }
    //console.log("data to commit in business.js =>", state.BusinessData);
  },
};

const actions = {
  action_getBusinessData({ commit }, data) {
    // console.log(data);
    // /vendors/allcompanies/?city=Pune&limit=20&offset=0&page=1
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/vendors/allcompanies/?city=${data.city}&limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          //   console.log(response.data.data);
          let obj = {
            data: response.data.data.companies,
            page: data.page,
          };
          commit("commit_businessData", obj);
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
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
