import axios from "axios";
import { getJobList, Jobs } from "../../modelClasses/JobModel.js";
import { useLoading } from "vue-loading-overlay";
import { data } from "autoprefixer";
import appConstants from "../../../appConstants.js";

const defaultState = () => {
  return {
    JobListData: [],
    // empTypesData: [],
    singleJobData: [],
    suitabilityStatus: "",
    bookmarkJobData: "",
    userProfileStatus: "",
    externalJobLink: "",
    appliedJobWithCoverNote: "",
    scrollBarPosition: 0,
    jobfilterData: "",
    applyJobData: "",
    unauthorizedBookmarkId: "",

    currentJobType: appConstants.jobType.ALL,
    JobPricingPlanDataById: "",
  };
};

const state = defaultState();

const getters = {
  getter_jobListData: (state) => state.JobListData,
  // getter_empTypesData: (state) => state.empTypesData,
  getter_singleJobData: (state) => state.singleJobData,
  getter_suitabilityStatus: (state) => state.suitabilityStatus,
  getter_bookmarkJobData: (state) => state.bookmarkJobData,
  getter_userProfileStatus: (state) => state.userProfileStatus,
  getter_externalJobLink: (state) => state.externalJobLink,
  getter_appliedJobWithCoverNote: (state) => state.appliedJobWithCoverNote,
  getter_scrollBarPosition: (state) => state.scrollBarPosition,
  getter_filterData: (state) => state.jobfilterData,
  getter_applyJobData: (state) => state.applyJobData,
  getter_unauthorizedBookmarkId: (state) => state.unauthorizedBookmarkId,
  getter_currentJobType: (state) => state.currentJobType,
  getter_jobPricingPlanDataById: (state) => state.JobPricingPlanDataById,
};

const mutations = {
  commit_jobListData: (state, JobListData) => {
    // console.log("job result", JobListData.jobsData);
    let result = {};
    result = new getJobList(JobListData.jobsData);
    // console.log("job result", result);
    // state.JobListData = result;

    if (JobListData.page == 1) {
      state.JobListData = [];
      for (let job of result.jobs) {
        state.JobListData.push(job);
      }
      state.total_jobs = result.total_jobs;
    } else {
      for (let job of result.jobs) {
        state.JobListData.push(job);
      }
      state.total_jobs = result.total_jobs;
    }
    //console.log("JobListData", JobListData);
  },

  commit_singleJobData: (state, singleJobData) => {
    let newJobData = singleJobData;
    // console.log("newJobData", newJobData)
    state.singleJobData = newJobData;
  },
  commit_suitabilityStatus: (state, suitabilityStatus) => {
    state.suitabilityStatus = suitabilityStatus;
  },
  commit_userProfileStatus: (state, userProfileStatus) => {
    state.userProfileStatus = userProfileStatus;
  },
  commit_bookmarkJob: (state, bookmarkJobData) => {
    // console.log("state.JobListData",state.JobListData)
    let job = state.JobListData.find((c) => c.id == bookmarkJobData.job);
    //console.log("job find", job)
    if (job) {
      job.bookmark_id.id = bookmarkJobData.id;
    }
  },
  commit_deleteBookmarkJob: (state, data) => {
    //console.log("state.JobListData",state.JobListData)
    let job = state.JobListData.find((c) => c.id == data.job_id);
    //console.log("job find", job)
    if (job.bookmark_id.id) {
      job.bookmark_id.id = "";
    }
  },
  commit_externalJobLink: (state, jobId) => {
    if (
      state.singleJobData.is_applied == false &&
      state.singleJobData.id == jobId
    ) {
      state.singleJobData.is_applied = true;
    }
  },
  commit_appliedJobWithCoverNote: (state, application_data) => {
    if (
      state.singleJobData.is_applied == false &&
      state.singleJobData.id == application_data.jobId
    ) {
      state.singleJobData.is_applied = true;

      state.singleJobData.job_application.application_id =
        application_data.job_application.id == undefined
          ? ""
          : application_data.job_application.id;
      state.singleJobData.job_application.application_status =
        application_data.job_application.application_status == undefined
          ? 0
          : application_data.job_application.application_status;
      state.singleJobData.job_application.click_count =
        application_data.job_application.click_count == undefined
          ? 0
          : application_data.job_application.click_count;
      state.singleJobData.job_application.created_at =
        application_data.job_application.created_at == undefined
          ? ""
          : application_data.job_application.created_at;
      state.singleJobData.job_application.job =
        application_data.job_application.job == undefined
          ? ""
          : application_data.job_application.job;
    }
  },
  commit_bookmarkSave: (state, data) => {
    if (state.singleJobData.id == data.job) {
      state.singleJobData.bookmark_id.id = data.id;
      state.singleJobData.is_bookmarked = true;
    }
  },
  commit_bookmarkRemove: (state, data) => {
    if (state.singleJobData.id == data.job_id) {
      state.singleJobData.bookmark_id.id = "";
      state.singleJobData.is_bookmarked = false;
    }
  },
  commit_scrollBarPosition: (state, data) => {
    state.scrollBarPosition = data;
  },
  commit_filterData: (state, data) => {
    state.jobfilterData = data;
  },
  commit_applyJobData: (state, data) => {
    state.applyJobData = data;
  },
  commit_unauthorizedBookmarkId: (state, id) => {
    state.unauthorizedBookmarkId = id;
  },
  commit_currentJobType: (state, id) => {
    state.currentJobType = id;
  },
  commit_jobPricingPlanDataById: (state, data) => {
    state.JobPricingPlanDataById = data;
  },
  //Add this mutation in every store module
  reset(state) {
    Object.assign(state, defaultState());
  },
};

const actions = {
  // action_getJobListData({ commit }, data) {
  //   //console.log(data);
  //   return new Promise((resolve, reject) => {
  //     return axios
  //       .get(
  //         `/vendors/jobs/filtered/?filter=all&limit=${data.limit}&offset=${data.offset}&page=${data.page}`
  //       )
  //       .then(function (response) {
  //         let obj = {
  //           page: data.page,
  //           jobsData: response.data.data,
  //         };
  //         commit("commit_jobListData", obj);
  //         let res = {
  //           currentPage: data.page,
  //           next: response.data.data.next,
  //         };
  //         //console.log("next", response.data.data.next)
  //         resolve(res);
  //       })
  //       .catch(function (error) {
  //         console.log(error.message);
  //         reject();
  //       });
  //   });
  // },

  action_getJobListData({ commit }, data) {
    //console.log(data);
    let isFirstPage = 1;
    let jobsList = [];
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/search/recommendations/userjobs/?limit=${data.limit}&scroll_id=${data.scroll_id}&scroll=5m`
        )
        .then(function (response) {
          if (data.scroll_id != "") {
            isFirstPage = 2;
          }

          for (let i = 0; i < response.data.data.hits.hits.length; i++) {
            jobsList.push(response.data.data.hits.hits[i]._source);
          }

          let obj = {
            page: isFirstPage,
            jobsData: {
              jobs: jobsList,
            },
          };

          commit("commit_jobListData", obj);
          let res = {
            scroll_id: response.data.data._scroll_id,
            next: response.data.data.hits.hits.length,
          };
          //console.log("next", response.data.data.next)
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },

  action_getSingleJobData({ commit }, job_id) {
    // let data = {
    //   jobId: job_id,
    // };
    //console.log("job is", data);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/jobs/${job_id}/`)
        .then(function (response) {
          let job_obj = new Jobs(response.data.data);
          commit("commit_singleJobData", job_obj);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject(error);
        });
    });
  },
  action_getAppliedJobs({ commit }, data) {
    //console.log("data", data);
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/vendors/jobs/filtered/?filter=applied&limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          let obj = {
            page: data.page,
            jobsData: response.data.data,
          };
          commit("commit_jobListData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.data.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getBookmarkedJobs({ commit }, data) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/vendors/jobs/filtered/?filter=bookmarked&limit=${data.limit}&offset=${data.offset}&page=${data.page}`
        )
        .then(function (response) {
          let obj = {
            page: data.page,
            jobsData: response.data.data,
          };
          commit("commit_jobListData", obj);
          let res = {
            currentPage: data.page,
            next: response.data.data.next,
          };
          resolve(res);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getAdvancedFiltredJobs({ commit }, filterData) {
    // console.log("filterData =>", filterData);
    const $loading = useLoading();
    let loader = $loading.show();
    let query = `/vendors/jobs/filtered/?filter=all&limit=${filterData.args.limit}&offset=${filterData.args.offset}&page=${filterData.args.page}`;
    if (filterData.data.country) {
      query = query + `&city=${filterData.data.city}`;
      query = query + `&country=${filterData.data.country}`;
      query = query + `&state=${filterData.data.state}`;
    }
    if (filterData.data.employment) {
      query = query + `&employment=${filterData.data.employment}`;
    }
    if (filterData.data.experience) {
      query = query + `&experience=${filterData.data.experience}`;
    }
    if (filterData.data.profession) {
      query = query + `&profession_cat=${filterData.data.profession}`;
    }
    if (filterData.data.workFromHome) {
      query = query + `&work_from_home=${filterData.data.workFromHome}`;
    }
    // console.log("Query", query);
    return new Promise((resolve, reject) => {
      return axios
        .get(query)
        .then(function (response) {
          let obj = {
            page: filterData.args.page,
            jobsData: response.data.data,
          };
          commit("commit_jobListData", obj);
          let res = {
            currentPage: filterData.args.page,
            next: response.data.data.next,
          };
          resolve(res);
          loader.hide();
        })
        .catch(function (error) {
          loader.hide();
          console.log(error.message);
          reject();
        });
    });
  },
  action_getSuitabilityStatus({ commit }, jobId) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .get(`/vendors/jobs/checksuitability/?job_id=${jobId}`)
        .then(function (response) {
          commit("commit_suitabilityStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_saveBookmarkJob({ commit }, jobId) {
    // console.log(data);
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/jobs/${jobId}/bookmark/`)
        .then(function (response) {
          commit("commit_bookmarkSave", response.data.data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_deleteBookmarkJob({ commit }, data) {
    let newData = {
      data: {
        bookmark_id: data.bookmark_id,
      },
    };
    //console.log(newData);
    return new Promise((resolve, reject) => {
      return axios
        .delete(`/vendors/jobs/deletebookmark/`, newData)
        .then(function (response) {
          commit("commit_bookmarkRemove", data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getUserProfileStatus({ commit }) {
    return new Promise((resolve, reject) => {
      const $loading = useLoading();
      let loader = $loading.show();
      return axios
        .get(`/users/resume/?resume_type=shared`)
        .then(function (response) {
          loader.hide();
          commit("commit_userProfileStatus", response.data.data);
          resolve();
        })
        .catch(function (error) {
          loader.hide();
          console.log(error.message);

          reject();
        });
    });
  },
  action_applyExternalJobLink({ commit }, jobId) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/jobs/${jobId}/apply_external_job/`)
        .then(function (response) {
          commit("commit_externalJobLink", jobId);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_appliedJobWithCoverNote({ commit }, data) {
    // let newData = {
    //   applicant_resume: data.applicant_resume,
    //   attachment_file: data.attachment_file,
    //   cover_note: data.cover_note,
    // };
    return new Promise((resolve, reject) => {
      return axios
        .post(`/vendors/jobs/${data.job_id}/apply_job/`, data)
        .then(function (response) {
          let application_data = {
            jobId: data.job_id,
            job_application: response.data.data,
          };
          commit("commit_appliedJobWithCoverNote", application_data);
          resolve();
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  setFilterData({ commit }, jobFilterData) {
    {
      commit("commit_filterData", jobFilterData);
    }
  },
  action_getApplyJobData({ commit }, jobid) {
    return new Promise((resolve, reject) => {
      //console.log("job is", jobid);
      return axios
        .get(`/vendors/jobs/getredirectdetails/${jobid}/`)
        .then(function (response) {
          commit("commit_applyJobData", response.data.data);
          // let result = {
          //   isEmail: true,
          //   isExternalUrl: false,
          // };
          resolve(response);
        })
        .catch(function (error) {
          console.log(error.message);
          reject();
        });
    });
  },
  action_getPlanDetailsFromPricingPlanId({ commit }, planId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/vendors/business/jobplan/${planId}/`)
        .then((response) => {
          commit("commit_jobPricingPlanDataById", response.data.data);
          resolve(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
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
