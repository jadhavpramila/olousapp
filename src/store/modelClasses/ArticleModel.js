import { Media } from "./PostModel.js";
import { getCommonMediaType } from "../../common/js/ReadPostData.js";
export class Article {
  author = "";
  content = "";
  created_at = "";
  id = "";
  live_date = "";
  media_type = 0;
  medias = [];
  numberOfMedias = 1;
  tags = [];
  title = "";
  updated_at = "";
  url = "";
  video_duration = 0;
  view_count = 8;

  constructor(data) {
    this.author = data.author == undefined ? "" : data.author;
    this.content = data.content == undefined ? "" : data.content;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.id = data.id == undefined ? "" : data.id;
    this.live_date = data.live_date == undefined ? "" : data.live_date;
    // this.media_type = data.media_type == undefined ? 1 : data.media_type;
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
    this.numberOfMedias =
      data.numberOfMedias == undefined ? 0 : data.numberOfMedias;
    this.tags = data.tags == undefined ? [] : data.tags;
    this.title = data.title == undefined ? "" : data.title;
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
    this.url = data.url == undefined ? "" : data.url;
    this.video_duration =
      data.video_duration == undefined ? 0.0 : data.video_duration;
    this.view_count = data.view_count == undefined ? 0 : data.view_count;
    this.media_type = getCommonMediaType(this.medias);
  }
}
