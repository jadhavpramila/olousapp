import appConstants from "../../appConstants";
import { Jobs } from "./JobModel";
import { Lead } from "./LeadModel";
import { User } from "./UserProfileModel";
import { company } from "./CompanyModel";
import { GetPostListFromAPIResponse } from "./PostModel";

export class Timeline {
  type = 0;
  title = "";
  show_see_all = true;
  see_all_api = "";
  items = [];
  constructor(data) {
    this.type = data.type == undefined ? 0 : data.type;
    this.title = data.title == undefined ? "" : data.title;
    this.show_see_all =
      data.show_see_all == undefined ? false : data.show_see_all;
    this.see_all_api = data.see_all_api == undefined ? "" : data.see_all_api;

    // if (
    //   data.items !== null &&
    //   data.items != undefined &&
    //   data.items.length > 0
    // ) {
    if (this.type == appConstants.Timeline_Type.BUSINESS_LEAD) {
      for (let item of data.items) {
        if (typeof item === "object") {
          this.items.push(new Lead(item));
        }
      }
    }

    if (this.type == appConstants.Timeline_Type.USER) {
      for (let item of data.items) {
        if (typeof item === "object") {
          this.items.push(new User(item));
        }
      }
    }
    if (this.type == appConstants.Timeline_Type.JOB) {
      for (let item of data.items) {
        if (typeof item === "object") {
          this.items.push(new Jobs(item));
        }
      }
    }

    if (this.type == appConstants.Timeline_Type.BUSINESS) {
      for (let item of data.items) {
        if (typeof item === "object") {
          this.items.push(new company(item));
        }
      }
    }
    if (this.type == appConstants.Timeline_Type.CHANNEL) {
      for (let item of data.items) {
        if (typeof item === "object") {
          this.items.push(new Channel(item));
        }
      }
    }

    // if (this.type == appConstants.Timeline_Type.COURSE) {
    //   for (let item of data.items) {
    //     if (typeof item === "object") {
    //       this.items.push(new Lead(item));
    //     }
    //   }
    // } else {
    //   data.items = [];
    // }

    // if (this.type == appConstants.Timeline_Type.COMPANY_ADVERT) {
    //   for (let item of data.items) {
    //     if (typeof item === "object") {
    //       this.items.push(new Lead(item));
    //     }
    //   }
    // } else {
    //   data.items = [];
    // }
    // if (this.type == appConstants.Timeline_Type.JOB_ADVERT) {
    //   for (let item of data.items) {
    //     if (typeof item === "object") {
    //       this.items.push(new Lead(item));
    //     }
    //   }
    // } else {
    //   data.items = [];
    // }
    // if (this.type == appConstants.Timeline_Type.LEAD_ADVERT) {
    //   for (let item of data.items) {
    //     if (typeof item === "object") {
    //       this.items.push(new Lead(item));
    //     }
    //   }
    // } else {
    //   data.items = [];
    // }
    //}
  }
}

export class Channel {
  id = "";
  title = "";
  cover_image = "";
  author = "";
  channel_id = "";
  author_name = "";
  author_slug = "";
  channel_slug = "";
  channel_name = "";

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.title = data.title == undefined ? "" : data.title;
    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    this.author = data.author == undefined ? "" : data.author;
    this.channel_id = data.channel_id == undefined ? "" : data.channel_id;
    this.author_name = data.author_name == undefined ? "" : data.author_name;
    this.author_slug = data.author_slug == undefined ? "" : data.author_slug;
    this.channel_slug = data.channel_slug == undefined ? "" : data.channel_slug;
    this.channel_name = data.channel_name == undefined ? "" : data.channel_name;
  }
}
