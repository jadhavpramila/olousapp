import { getAwsUrl } from "../../common/js/getAwsUrl.js";
import appConstants from "../../appConstants.js";
export class Jobs {
  attachment_description = "";
  attachment_required = false;
  can_apply = false;
  city = "";
  company = "";
  company_info = "";
  company_logo = "";
  company_website = "";
  contact_mobile = "";
  country = "";
  country_code = "";
  country_iso = "";
  created_at = "";
  ctc = "";
  employment = "";
  expires_at = "";
  id = "";
  job_application_url = "";
  job_description = "";
  job_title = "";
  languages = [];
  level = "";
  location = [];
  max_exp = "";
  min_exp = "";
  profession = "";
  professional_categories = [];
  profile_req = "";
  published_at = "";
  sectors = [];
  softwares = [];
  state = "";
  state_iso = "";
  updated_at = "";
  urgent = false;
  vacancy = "";
  work_from_home = false;
  bookmark_id = {
    id: "",
  };
  job_application = {
    isApplied: false,
    application_id: "",
    application_status : 0,
    click_count: 0,
    created_at: "",
    job: "",
  };
  is_recommended = false;
  work_location = 1;
  is_applied = false;
  isExternalJobWithEmailRedirection = ""
  no_of_applicants = 0
  is_expired = false;
  mandatory_location  =  false
 
 



  constructor(data) {
    this.attachment_description =
      data.attachment_description == undefined
        ? ""
        : data.attachment_description;
    this.attachment_required =
      data.attachment_required == undefined ? false : data.attachment_required;
    this.can_apply = data.can_apply == undefined ? false : data.can_apply;
    this.city = data.city == undefined ? "" : data.city;
    this.company = data.company == undefined ? "" : data.company;
    this.company_info = data.company_info == undefined ? "" : data.company_info;

    this.company_logo = data.company_logo == undefined ? "" : data.company_logo;
    this.processed_company_logo =
      data.processed_company_logo == undefined
        ? ""
        : data.processed_company_logo;

    if(this.company_logo == "" || this.company_logo == null){
      this.company_logo =  `${import.meta.env.VITE_APP_S3_STATIC_IMAGES}Company_dummy_icon.svg`

    }else{
      let result = getAwsUrl(
        appConstants.media_stored_at.MEDIA_PRODUCT,
        this.company_logo,
        true,
        this.processed_company_logo
      );
      this.company_logo = result.awsURL;
    }
  

    this.company_website =
      data.company_website == undefined ? "" : data.company_website;
    this.contact_mobile =
      data.contact_mobile == undefined ? "" : data.contact_mobile;
    this.country = data.country == undefined ? "" : data.country;
    this.country_code = data.country_code == undefined ? "" : data.country_code;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.ctc = data.ctc == undefined ? "" : data.ctc;
    this.employment = data.employment == undefined ? "" : data.employment;
    this.expires_at = data.expires_at == undefined ? "" : data.expires_at;
    this.id = data.id == undefined ? "" : data.id;
    this.job_application_url =
      data.job_application_url == undefined ? "" : data.job_application_url;
    this.job_description =
      data.job_description == undefined ? "" : data.job_description;
    this.job_title = data.job_title == undefined ? "" : data.job_title;
    this.languages = data.languages == undefined ? [] : data.languages;
    this.level = data.level == undefined ? "" : data.level;
    if (
      data.location !== null &&
      data.location != undefined &&
      data.location.length > 0
    ) {
      for (let loc of data.location) {
        //sconsole.log("location", loc)
        let singleLocation = new Location(loc);
        this.location.push(singleLocation);
      }
      //this.location = new Location(data.location);
    } else {
      this.location = [];
    }

    this.max_exp = data.max_exp == undefined ? "" : data.max_exp;
    this.min_exp = data.min_exp == undefined ? "" : data.min_exp;
    this.profession = data.profession == undefined ? "" : data.profession;
    this.professional_categories =
      data.professional_categories == undefined
        ? ""
        : data.professional_categories;
    this.profile_req = data.profile_req == undefined ? "" : data.profile_req;
    this.published_at = data.published_at == undefined ? "" : data.published_at;
    this.sectors = data.sectors == undefined ? [] : data.sectors;
    this.softwares = data.softwares == undefined ? [] : data.softwares;
    this.state = data.state == undefined ? "" : data.state;
    this.state_iso = data.state_iso == undefined ? "" : data.state_iso;
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
    this.urgent = data.urgent == undefined ? false : data.urgent;
    this.vacancy = data.vacancy == undefined ? "" : data.vacancy;
    this.work_from_home =
      data.work_from_home == undefined ? false : data.work_from_home;
    this.bookmark_id.id = data.bookmark_id == undefined ? "" : data.bookmark_id
    if (
      data.job_application != undefined &&
      data.job_application.id != undefined
    ) {
      this.job_application.isApplied = true;
      this.job_application.application_id = data.job_application.id == undefined ? "" : data.job_application.id;
      this.job_application.application_status = data.job_application.application_status == undefined ? 0 : data.job_application.application_status
      this.job_application.click_count = data.job_application.click_count == undefined ? 0 : data.job_application.click_count;
      this.job_application.created_at = data.job_application.created_at == undefined ? "" : data.job_application.created_at;
      this.job_application.job = data.job_application.job == undefined ? "": data.job_application.job;
    }
    this.work_location =
      data.work_location == undefined ? 1 : data.work_location;
    this.is_applied = data.is_applied == undefined ? false : data.is_applied;
    this.is_bookmarked =
      data.is_bookmarked == undefined ? false : data.is_bookmarked;
    this.isExternalJobWithEmailRedirection = data.isExternalJobWithEmailRedirection == undefined ? '' : data.isExternalJobWithEmailRedirection;
    this.no_of_applicants = data.no_of_applicants == undefined ? 0 : data.no_of_applicants;
    this.is_expired = data.is_expired == undefined ? false : data.is_expired
    this.mandatory_location = data.mandatory_location == undefined ?false : data.mandatory_location;
    // if (
    //   data.bookmark_id != undefined &&
    //   data.bookmark_id.is_deleted != undefined
    // ) {
    //   this.bookmark_id.is_deleted = data.bookmark_id.is_deleted;
    // }
  }
}
export class Location {
  city = "";
  country = "";
  country_iso = "";
  state = "";
  state_iso = "";

  constructor(data) {
    this.city = data.city == undefined ? "" : data.city;
    this.country = data.country == undefined ? "" : data.country;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.state = data.state == undefined ? "" : data.state;
    this.state_iso = data.state_iso == undefined ? "" : data.state_iso;
  }
}

export class getJobList {
  jobs = [];
  total_jobs = [];
  constructor(data) {
    // console.log(data);
    if (data == null) {
      return;
    }
    var bookmarks_job =
      data.bookmarked_jobs == undefined ? [] : data.bookmarked_jobs;
    var jobs_data = data.jobs == undefined ? [] : data.jobs;
    var applied_jobs_json =
      data.applied_jobs_json == undefined ? [] : data.applied_jobs_json;
    var applied_jobs = data.applied_jobs == undefined ? [] : data.applied_jobs;
    var recommended_jobs =
      data.recommended_jobs == undefined ? [] : data.recommended_jobs;

    // debugger;
    for (let job of recommended_jobs) {
      let jobObj = this.getJobObject(
        job,
        bookmarks_job,
        applied_jobs_json,
        applied_jobs
      );
      jobObj.is_recommended = true;
      this.jobs.push(jobObj);
    }

    for (let job of jobs_data) {
      let jobObj = this.getJobObject(
        job,
        bookmarks_job,
        applied_jobs_json,
        applied_jobs
      );
      this.jobs.push(jobObj);
      //console.log("jobobj",this.jobsNew)
    }
  }

  getJobObject(job, bookmarks_job, applied_jobs_json, applied_jobs) {
    let jobObj = new Jobs(job);

    var bookmark = bookmarks_job.filter(function (el) {
      return el.job_id == job.id;
    });

    // console.log("bookmark",bookmark)
    if (bookmark.length > 0) {
      let job_bookmark = bookmark[0];
      if (
        job_bookmark.bookmark_id != undefined &&
        job_bookmark.bookmark_id != null
      ) {
        jobObj.bookmark_id.id = job_bookmark.bookmark_id;
      }

      // if (
      //   job_bookmark.is_deleted != undefined &&
      //   job_bookmark.is_deleted != null
      // ) {
      //   jobObj.bookmark_id.is_deleted = job_bookmark.is_deleted;
      // }
    }
    if (applied_jobs_json.length > 0) {
      var applied = applied_jobs_json.filter(function (el) {
        return el.job == job.id;
      });
      if (applied.length > 0) {
        let job_applied = applied[0];
        if (
          job_applied.application_id != undefined &&
          job_applied.application_id != null
        ) {
          jobObj.job_application.application_id = job_applied.application_id;
          jobObj.job_application.isApplied = true;
        }

        if (
          job_applied.application_status != undefined &&
          job_applied.application_status != null
        ) {
          jobObj.job_application.application_status = job_applied.application_status;
          jobObj.job_application.isApplied = true;
        }


        if (
          job_applied.click_count != undefined &&
          job_applied.click_count != null
        ) {
          jobObj.job_application.click_count = job_applied.click_count;
        }
        if (
          job_applied.created_at != undefined &&
          job_applied.created_at != null
        ) {
          jobObj.job_application.created_at = job_applied.created_at;
        }
        if (job_applied.job != undefined && job_applied.job != null) {
          jobObj.job_application.job = job_applied.job;
        }
      }
    } else {
      var applied = applied_jobs.filter(function (el) {
        return el == job.id;
      });
      if (applied.length > 0) {
        jobObj.job_application.isApplied = true;
      }
    }

    return jobObj;
  }
}
