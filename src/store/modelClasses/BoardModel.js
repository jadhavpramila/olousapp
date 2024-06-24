import { Media } from "./PostModel.js";

export class Board {
  author = {};
  clip_count = 0;
  collaborators = [];
  cover_images = [];
  created_at = "";
  description = "";
  id = "";
  is_default_board = false;
  is_private = false;
  name = "";
  updated_at = "";
  visits = 0;
  constructor(data) {
    if (
      typeof data.author === "object" &&
      data.author !== null &&
      data.author != undefined
    ) {
      this.author = new Author(data.author);
    } else {
      this.author = {};
    }
    this.clip_count = data.clip_count == undefined ? 0 : data.clip_count;
    if (
      data.collaborators !== null &&
      data.collaborators != undefined &&
      data.collaborators.length > 0
    ) {
      for (let collaborator of data.collaborators) {
        if (typeof collaborator === "object") {
          this.collaborators.push(new Collaborators(collaborator));
        }
      }
    } else {
      data.collaborators = [];
    }
    if (
      data.cover_images.length > 0 &&
      data.cover_images !== null &&
      data.cover_images != undefined
    ) {
      for (let coverImages of data.cover_images) {
        this.cover_images.push(coverImages);
      }
    } else {
      this.cover_images = [];
    }
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.description = data.description == undefined ? "" : data.description;
    this.id = data.id == undefined ? "" : data.id;
    this.is_default_board =
      data.is_default_board == undefined ? false : data.is_default_board;
    this.is_private = data.is_private == undefined ? false : data.is_private;
    this.name = data.name == undefined ? "" : data.name;
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
    this.visits = data.visits == undefined ? 0 : data.visits;
  }
}
export class Collaborators {
  first_name = "";
  id = "";
  is_board_admin = false;
  joined_date = "";
  last_name = "";
  profile_image = "";
  restriction_level = 0;
  constructor(data) {
    this.first_name = data.first_name == undefined ? "" : data.first_name;
    this.id = data.id == undefined ? "" : data.id;
    this.is_board_admin =
      data.is_board_admin == undefined ? false : data.is_board_admin;
    this.joined_date = data.joined_date == undefined ? "" : data.joined_date;
    this.last_name = data.last_name == undefined ? "" : data.last_name;
    this.profile_image =
      data.profile_image == undefined ? "" : data.profile_image;
    this.restriction_level =
      data.restriction_level == undefined ? 0 : data.restriction_level;
  }
}
export class Author {
  about = "";
  associated_company = "";
  designation = "";
  first_name = "";
  id = "";
  is_admin = false;
  is_following = false;
  is_pseudo_user = false;
  is_vendor = false;
  last_name = "";
  numberOfFollowers = 0;
  numberOfFollowings = 0;
  profile_image = "";
  slug = "";
  total_exp = 0;
  user_rank = 0;
  constructor(data) {
    this.about = data.about == undefined ? "" : data.about;
    this.associated_company =
      data.associated_company == undefined ? "" : data.associated_company;
    this.designation = data.designation == undefined ? "" : data.designation;
    this.first_name = data.first_name == undefined ? "" : data.first_name;
    this.id = data.id == undefined ? "" : data.id;
    this.is_admin = data.is_admin == undefined ? false : data.is_admin;
    this.is_following =
      data.is_following == undefined ? false : data.is_following;
    this.is_pseudo_user =
      data.is_pseudo_user == undefined ? false : data.is_pseudo_user;
    this.is_vendor = data.is_vendor == undefined ? false : data.is_vendor;
    this.last_name = data.last_name == undefined ? "" : data.last_name;
    this.numberOfFollowers =
      data.numberOfFollowers == undefined ? 0 : data.numberOfFollowers;
    this.numberOfFollowings =
      data.numberOfFollowings == undefined ? 0 : data.numberOfFollowings;
    this.profile_image =
      data.profile_image == undefined ? "" : data.profile_image;
    this.slug = data.slug == undefined ? "" : data.slug;
    this.total_exp = data.total_exp == undefined ? 0 : data.total_exp;
    this.user_rank = data.user_rank == undefined ? 0 : data.user_rank;
  }
}
export class BoardClips {
  author = "";
  board = "";
  boards = [];
  clip_type = 1;
  created_at = "";
  id = "";
  is_clipped = false;
  is_deleted = false;
  object_id = "";
  object_json = {};
  updated_at = "";
  constructor(data) {
    this.author = data.author == undefined ? "" : data.author;
    this.board = data.board == undefined ? "" : data.board;
    if (
      data.boards.length > 0 &&
      data.boards !== null &&
      data.boards != undefined
    ) {
      for (let board of data.boards) {
        this.boards.push(board);
      }
    } else {
      this.boards = [];
    }
    this.clip_type = data.clip_type == undefined ? "" : data.clip_type;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.id = data.id == undefined ? "" : data.id;
    this.is_clipped = data.is_clipped == undefined ? "" : data.is_clipped;
    this.is_deleted = data.is_deleted == undefined ? "" : data.is_deleted;
    this.object_id = data.object_id == undefined ? "" : data.object_id;
    this.object_json = {};
    if (
      typeof data.object_json === "object" &&
      data.object_json !== null &&
      data.object_json != undefined
    ) {
      this.object_json = new ObjectJson(data.object_json);
    } else {
      this.object_json = {};
    }
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
  }
}
export class ObjectJson {
  author = {};
  content = "";
  cover_image = "";
  created_at = "";
  id = "";
  medias = [];
  numberofmedias = 0;
  title = "";
  url = "";
  video_duration = 0;
  constructor(data) {
    if (
      typeof data.author === "object" &&
      data.author !== null &&
      data.author != undefined
    ) {
      this.author = new Author(data.author);
    } else {
      this.author = {};
    }
    this.content = data.content == undefined ? "" : data.content;
    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.id = data.id == undefined ? "" : data.id;
    if (
      data.medias !== null &&
      data.medias != undefined &&
      data.medias.length > 0
    ) {
      for (let media of data.medias) {
        if (typeof media === "object") {
          this.medias.push(new Media(media));
        }
      }
    } else {
      data.medias = [];
    }
    this.numberofmedias =
      data.numberofmedias == undefined ? 0 : data.numberofmedias;
    this.title = data.title == undefined ? "" : data.title;
    this.url = data.url == undefined ? "" : data.url;
    this.video_duration =
      data.video_duration == undefined ? 0 : data.video_duration;
  }
}
