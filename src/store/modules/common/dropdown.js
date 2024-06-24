import axios from "axios";

const defaultState = () => {
  return {
    sectorData: [],
    professionData: [],
    empTypesData: [],
    softwareData: [],
    interest: [],
    searchedLocation: [],
    countries: [],
    category: [],
    subcategory: [],
    Languages: [],
    //StudyOfFields: [],
    levelofStudy: [],
    NewProfession: [],
    levelOfStudy: [],
    fieldOfStudy: [],
    softwareData_IdAndName: [],
    searchSuggestion: [],
    searchSoftSuggestion: [],
    searchTechSuggestion: [],
    jobDesignation: [],
    cities: [],
    stateData: [],
  };
};

const state = defaultState();

const getters = {
  getter_sector: (state) => state.sectorData,
  getter_profession: (state) => state.professionData,
  getter_software: (state) => state.softwareData,
  getter_software_idAndName: (state) => state.softwareData_idAndName,
  getter_interest: (state) => state.interest,
  getter_searchLocation: (state) => state.searchedLocation,
  getter_countries: (state) => state.countries,
  getter_empTypesData: (state) => state.empTypesData,
  getter_category: (state) => state.category,
  getter_subcategory: (state) => state.subcategory,
  getter_languages: (state) => state.Languages,
  //getter_studyOfFields: (state) => state.StudyOfFields,
  // getter_levelofStudy: (state) => state.levelofStudy,
  getter_newProfession: (state) => state.NewProfession,
  getter_fieldOfStudy: (state) => state.fieldOfStudy,
  getter_levelOfStudy: (state) => state.levelOfStudy,
  getter_allSoftwareList: (state) => state.softwareList,
  getter_searchSuggestion: (state) => state.searchSuggestion,
  getter_jobDesignation: (state) => state.jobDesignation,
  getter_searchSoftwareSuggestion: (state) => state.searchSoftSuggestion,
  getter_searchTechnicalSkillsSuggestion: (state) => state.searchTechSuggestion,
  getter_cities: (state) => state.cities,
  getter_states: (state) => state.stateData,
};

const mutations = {
  commit_sector: (state, sectorData) => {
    let objArray = [];
    if (sectorData) {
      for (let i = 0; i < sectorData.length; i++) {
        let obj = {
          id: sectorData[i]._source.id,
          display_string: sectorData[i]._source.display_string,
          is_org_sector: sectorData[i]._source.is_org_sector,
        };
        objArray.push(obj);
      }
    }
    state.sectorData = objArray;
  },
  commit_profession: (state, professionData) => {
    state.professionData = professionData;
  },
  commit_software: (state, softwareData) => {
    state.softwareData = softwareData;
  },
  commit_software_idAndName: (state, softwareData) => {
    let objArray = [];
    if (softwareData) {
      for (let i = 0; i < softwareData.length; i++) {
        let obj = {
          id: softwareData[i]._source.id,
          name: softwareData[i]._source.name,
        };
        objArray.push(obj);
      }
    }
    state.softwareData_idAndName = objArray;
  },
  commit_interest: (state, InterestData) => {
    state.interest = InterestData;
  },
  commit_searchLocation: (state, location) => {
    state.searchedLocation = location;
  },
  commit_countries: (state, countries) => {
    state.countries = countries;
  },
  commit_empTypesData: (state, empTypesData) => {
    state.empTypesData = empTypesData;
  },
  commit_category: (state, categoryOptions) => {
    state.category = categoryOptions;
  },
  commit_subCategory: (state, subcategoryOptions) => {
    state.subcategory = subcategoryOptions;
  },
  commit_languages: (state, languageData) => {
    let objArray = [];
    if (languageData) {
      for (let i = 0; i < languageData.length; i++) {
        let obj = {
          id: parseInt(languageData[i]._source.id),
          display_string: languageData[i]._source.display_string,
        };
        objArray.push(obj);
      }
    }
    state.Languages = objArray;
  },
  commit_newProfessionData: (state, newProfession) => {
    state.NewProfession = language;
  },
  commit_levelOfStudy: (state, data) => {
    let objArray = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: data[i]._source.id,
          name: data[i]._source.category_name,
        };
        objArray.push(obj);
      }
    }
    state.levelOfStudy = objArray;
  },
  commit_fieldOfStudy: (state, data) => {
    console.log("state", state);
    let objArray = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: data[i]._id,
          name: data[i]._source.education_field,
          master_category: data[i]._source.education_group,
        };
        objArray.push(obj);
      }
    }

    state.fieldOfStudy = objArray;
    console.log("state.fieldOfStudy", state.fieldOfStudy);
  },
  commit_softwareListData: (state, softwareList) => {
    state.softwareList = softwareList;
  },
  commit_searchSuggestion: (state, searchSuggestion) => {
    state.searchSuggestion = searchSuggestion;
  },
  commit_searchSoftSuggestion: (state, searchSoftSuggestion) => {
    state.searchSoftSuggestion = searchSoftSuggestion;
  },
  commit_searchTechSuggestion: (state, searchTechSuggestion) => {
    state.searchTechSuggestion = searchTechSuggestion;
  },
  // commit_levelOfStudy: (state, levelofStudy) => {
  //   state.levelOfStudy = levelofStudy;
  // },
  commit_jobDesignation: (state, jobDesignation) => {
    let objArray = [];
    if (jobDesignation) {
      for (let i = 0; i < jobDesignation.length; i++) {
        let obj = {
          id: jobDesignation[i]._id,
          designation: jobDesignation[i]._source.designation,
          is_listed: jobDesignation[i]._source.is_listed,
          is_denied: jobDesignation[i]._source.is_denied,
        };
        objArray.push(obj);
      }
    }
    state.jobDesignation = objArray;
    //console.log("jobDesignation", state.jobDesignation);
  },
  commit_cities: (state, data) => {
    state.cities = data;
  },
  commit_states: (state, data) => {
    state.stateData = data;
  },

  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  action_getSectorDetails({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/sectors/`)
        .then(function (response) {
          commit("commit_sector", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getProfessionDetails({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/users/prof_cats/`)
        .then(function (response) {
          commit("commit_profession", response.data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getSoftwareDetails({ commit }, query) {
    console.log("from software store ", query);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/softwares/?q=${query}`)
        .then(function (response) {
          console.log("response", response);
          commit("commit_software", response.data.data.hits.hits);
          commit("commit_software_idAndName", response.data.data.hits.hits);

          console.log(
            "response.data.data.hits.hits",
            response.data.data.hits.hits
          );
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getInterest({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/users/interests/`)
        .then(function (response) {
          commit("commit_interest", response.data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_searchLocation({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/places/?country=${data.countryIso2}&q=${data.query}`)
        .then(function (response) {
          commit("commit_searchLocation", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_fetchFilteredCountries({ commit }, countryInitial) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/vendors/country/?q=${countryInitial}`)
        .then(function (response) {
          commit("commit_countries", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getEmploymentType({ commit }) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .get("/vendors/jobs/emp_types/")
        .then(function (response) {
          commit("commit_empTypesData", response.data.data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getCategoryData({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get("/search/vendors/companycategories/list/")
        .then(function (response) {
          const result = response.data;
          var categoryOptions = result.data.hits.hits
            .map((res) => res._source)
            .filter((res) => {
              if (res.name != "") {
                return res;
              }
            });
          commit("commit_category", categoryOptions);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getAllSoftwareList({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get("/search/softwares/all/")
        .then(function (response) {
          const result = response.data;
          var softwareList = result.data;
          console.log("softwareList", softwareList);
          // .map((res) => res._source)
          // .filter((res) => {
          //   if (res.name != "") {
          //     return res;
          //   }
          // });
          commit("commit_softwareListData", softwareList);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getSubCategories({ commit }, categoryId) {
    if (Number.isInteger(categoryId)) {
      return new Promise((resolve, reject) => {
        return axios
          .get(
            `/search/vendors/companysubcategories/list/?category_id=${categoryId}&page=1&limit=200&offset=0`
          )
          .then(function (response) {
            const result = response.data;
            var subcategoryOptions = result.data.hits.hits
              .map((res) => res._source)
              .filter((res) => {
                if (res.name != "") {
                  return res;
                }
              });
            commit("commit_subCategory", subcategoryOptions);
            resolve();
          })
          .catch(function (error) {
            console.log(error.message);
            reject();
          });
      });
    }
  },
  action_getLanguages({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/languages/`)
        .then(function (response) {
          commit("commit_languages", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  // action_getLevelOfStudy({ commit }, data) {
  //   console.log(" action_getLevelOfStudy");
  //   return new Promise((resolve, reject) => {
  //     return axios
  //       .get(`/search/degree/`)
  //       .then(function (response) {
  //         commit("commit_levelOfStudy", result.data.hits.hits);
  //         console.log(" result.data.hits.hits", result.data.hits.hits);
  //         resolve();
  //       })
  //       .catch(function (error) {
  //         console.log(error.message);
  //         reject();
  //       });
  //   });
  // },

  action_getFieldOfStudyByLevel({ commit }, level_id) {
    console.log("level_id", level_id);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/geteducationfields/?q=${level_id}`)
        .then(function (response) {
          const result = response.data;
          commit("commit_fieldOfStudy", result.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  actionSaveDropdownData({ commit }, data) {
    this.professionDataNew = data;
    commit("NewProfession", data);
  },

  action_getSuggestions({ commit }) {
    // console.log("id", id);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/cvautosuggsearch/?q=${3}`)
        .then(function (response) {
          commit("commit_searchSuggestion", response.data.data.hits.hits);
          // console.log("response.data", commit_searchSuggestion);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getSoftSuggestions({ commit }) {
    // console.log("id", id);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/cvautosuggsearch/?q=${1}`)
        .then(function (response) {
          commit("commit_searchSoftSuggestion", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getTechnicalSuggestions({ commit }) {
    // console.log("id", id);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/cvautosuggsearch/?q=${2}`)
        .then(function (response) {
          commit("commit_searchTechSuggestion", response.data.data.hits.hits);
          // console.log(
          //   "commit_searchTechSuggestion",
          //   response.data.data.hits.hits
          // );
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  // action_searchStudyOfFields({ commit }, data) {
  //   return new Promise((resolve, reject) => {
  //     return axios
  //       .get(`/search/degree/?q=${data}`)
  //       .then(function (response) {
  //         commit("commit_studyOfFields", response.data.data);
  //         resolve();
  //       })
  //       .catch(function (error) {
  //         console.log(error.message);
  //         reject();
  //       });
  //   });
  // },
  action_getLevelOfStudy({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/degreemaster/`)
        .then(function (response) {
          let data = response.data.data.hits.hits;
          // let objArray = [];
          // if (data) {
          //   for (let i = 0; i < data.length; i++) {
          //     let obj = {
          //       id: data[i]._source.id,
          //       name: data[i]._source.category_name,
          //     };
          //     objArray.push(obj);
          //   }
          // }
          commit("commit_levelOfStudy", data);
          resolve(data);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getJobDesignationDetails({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/jobdesignation/`)
        .then(function (response) {
          console.log("response", response);
          commit("commit_jobDesignation", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getStates({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/search/vendors/state/?q=${data.state}&country=${data.countryiso}`
        )
        .then(function (response) {
          commit("commit_states", response.data.data.hits.hits);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getCities({ commit }, data) {
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/search/vendors/city/?q=${data.city}&state=${data.stateiso}&country=${data.countryiso}`
        )
        .then(function (response) {
          commit("commit_cities", response.data.data.hits.hits);
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
