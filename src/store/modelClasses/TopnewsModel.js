import { Media } from "./PostModel.js";
//import { getCommonMediaType } from "../../common/js/ReadPostData.js";
export class Topnews {
  author = "";
  content = "";
  created_at = "";
  id = "";
  interest_categories = [];
  is_international = false;
  lat = 0;
  lng = 0;
  media_type = 1;
  medias = [];
  profession_categories = [];
  title = "";
  updated_at = "";
  url = "";
  url_str = "";

  constructor(data) {
    this.author = data.author == undefined ? "" : data.author;
    this.content = data.content == undefined ? "" : data.content;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.id = data.id == undefined ? "" : data.id;
    this.interest_categories =
      data.interest_categories == undefined ? [] : data.interest_categories;
    this.is_international =
      data.is_international == undefined ? false : data.is_international;
    this.lat = data.lat == undefined ? 0 : data.lat;
    this.lng = data.lng == undefined ? 0 : data.lng;
    this.media_type = data.media_type == undefined ? 1 : data.media_type;
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
    this.profession_categories =
      data.profession_categories == undefined ? [] : data.profession_categories;
    this.title = data.title == undefined ? "" : data.title;
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
    this.url = data.url == undefined ? "" : data.url;
    this.url_str = data.url_str == undefined ? "" : data.url_str;
  }
}
