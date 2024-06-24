import { User } from "./UserProfileModel.js";
import { getCommonMediaType } from "/src/common/js/ReadPostData.js";
import { getAwsUrlFromMedia } from "../../common/js/getAwsUrl.js";
import appConstants from "../../appConstants.js";
export class Post {
  id = "";
  title = "";
  url = "";
  content = "";
  author = {};
  channel = "";
  video_duration = 0.0;
  created_at = "";
  updated_at = "";
  media_type = 0;
  post_type = 0;
  medias = [];
  numberOfLikes = 0;
  numberOfComments = 0;
  numberOfMedias = 0;
  tags = [];
  interest_category = [];
  like_id = {
    id: "",
    is_deleted: false,
  };
  bookmark_id = {
    id: "",
    is_deleted: false,
  };
  cover_image = "";
  taggedUsers = [];
  isLive = true;
  is_company_post = false;
  view_count = 0;
  activityType = 0;
  activityAuthor = null;

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.title = data.title == undefined ? "" : data.title;
    this.url = data.url == undefined ? "" : data.url;
    this.content = data.content == undefined ? "" : data.content;

    if (
      typeof data.author === "object" &&
      data.author !== null &&
      data.author != undefined
    ) {
      this.author = new User(data.author);
    } else {
      this.author = {};
    }

    this.channel = data.channel == undefined ? "" : data.channel;
    this.video_duration =
      data.video_duration == undefined ? 0.0 : data.video_duration;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.updated_at = data.updated_at == undefined ? "" : data.updated_at;
    // this.media_type = data.media_type == undefined ? 1 : data.media_type;
    this.post_type = data.post_type == undefined ? "" : data.post_type;

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

    this.numberOfLikes =
      data.numberOfLikes == undefined ? 0 : data.numberOfLikes;
    this.numberOfComments =
      data.numberOfComments == undefined ? 0 : data.numberOfComments;
    this.numberOfMedias =
      data.numberOfMedias == undefined ? 0 : data.numberOfMedias;
    this.tags = data.tags == undefined ? [] : data.tags;
    this.interest_category =
      data.interest_category == undefined || data.interest_category == null
        ? []
        : data.interest_category;

    if (data.like_id != undefined && data.like_id.id != undefined) {
      this.like_id.id = data.like_id.id;
    }

    if (data.like_id != undefined && data.like_id.is_deleted != undefined) {
      this.like_id.is_deleted = data.like_id.is_deleted;
    }

    if (data.bookmark_id != undefined && data.bookmark_id.id != undefined) {
      this.bookmark_id.id = data.like_id.id;
    }

    if (
      data.bookmark_id != undefined &&
      data.bookmark_id.is_deleted != undefined
    ) {
      this.bookmark_id.is_deleted = data.bookmark_id.is_deleted;
    }

    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    this.taggedUsers = data.taggedUsers == undefined ? [] : data.taggedUsers;
    this.isLive = data.isLive == undefined ? true : data.isLive;
    this.is_company_post =
      data.is_company_post == undefined ? false : data.is_company_post;
    this.view_count = data.view_count == undefined ? 0 : data.view_count;

    this.media_type = getCommonMediaType(this.medias);
  }
}

export class Media {
  id = "";
  name = "";
  mediaType = 0;
  contentSize = 0;
  width = 0.0;
  height = 0.0;
  author = "";
  created_at = "";
  video_duration = 0.0;
  is_processed = false;
  processed_file = "";
  cover_image = "";
  social_url = "";

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.name = data.name == undefined ? "" : data.name;
    this.mediaType = data.mediaType == undefined ? 0 : data.mediaType;
    this.contentSize = data.contentSize == undefined ? 0 : data.contentSize;
    this.height = data.height == undefined ? 0.0 : data.height;
    this.width = data.width == undefined ? 0.0 : data.width;
    this.author = data.author == undefined ? "" : data.author;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.video_duration =
      data.video_duration == undefined ? 0.0 : data.video_duration;
    this.is_processed =
      data.is_processed == undefined ? false : data.is_processed;
    this.processed_file =
      data.processed_file == undefined ? "" : data.processed_file;
    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    // this.cover_image = getAwsUrl(appConstants.media_stored_at.MEDIA_PRODUCT, this.cover_image, true,this.processed_cover_image)
    getAwsUrlFromMedia(this);
  }
}

export class GetPostListFromAPIResponse {
  posts = [];
  total_posts = 0;
  // next_path = null

  constructor(data) {
    if (data == null) {
      return;
    }
    var post_data = []; //s data.posts;
    var medias_data = data.medias == undefined ? [] : data.medias;
    var post_activity_count_data =
      data.post_activity_count == undefined ? [] : data.post_activity_count;
    var likes_data = data.likes == undefined ? [] : data.likes;
    var bookmarks_data = data.bookmarks == undefined ? [] : data.bookmarks;
    var authors_data = data.authors == undefined ? [] : data.authors;
    var video_view_count_data =
      data.video_view_count == undefined ? [] : data.video_view_count;
    // var feed_activity_info_data = data.feed_activity_info;
    var feeds_data = data.feeds == undefined ? [] : data.feeds;

    // total post
    this.total_posts = data.total_posts == undefined ? "" : data.total_posts;
    // this.next_path = data.next_path == undefined ? null : data.next_path;
    // debugger;
    if (feeds_data.length > 0) {
      feeds_data.forEach((el) =>
        post_data.push(data.posts.find((e) => e.id == el.post_id))
      );
    } else {
      return;
    }

    if (post_data.length > 0) {
      for (let single_post of post_data) {
        //If post_id is present in feed but not s posts then it return undefined(this happens for deleted post)
        if (single_post == undefined) continue;
        // create post object
        let postObj = new Post(single_post);

        //Add medias
        for (let media_id of single_post.medias) {
          var single_media = medias_data.filter(function (el) {
            return el.id == media_id;
          });

          if (single_media.length > 0) {
            let mediaObj = new Media(single_media[0]);
            postObj.medias.push(mediaObj);
            postObj.numberOfMedias = postObj.numberOfMedias + 1;
          }
        }

        postObj.medias.sort((a, b) =>
          parseFloat(a.height) < parseFloat(b.height) ? -1 : 1
        );
        //var sortedarray = postObj.medias.sort((a, b) => (a.height > b.height) ? 1 : -1);
        //console.log("sorted array", sortedarray )

        //Once get all media calculate media type
        postObj.media_type = getCommonMediaType(postObj.medias);

        //set author data
        var user = authors_data.filter(function (el) {
          return el.id == single_post.author;
        });

        if (user.length > 0) {
          let userObj = new User(user[0]);
          postObj.author = userObj;
        }

        //set post_activity_count
        var activity = post_activity_count_data.filter(function (el) {
          return el.post == single_post.id;
        });

        if (activity.length > 0) {
          let post_activity = activity[0];
          if (
            post_activity.comments != undefined &&
            post_activity.comments != null
          ) {
            postObj.numberOfComments = post_activity.comments;
          }
          if (post_activity.likes != undefined && post_activity.likes != null) {
            postObj.numberOfLikes = post_activity.likes;
          }
        }

        //is post_liked by user
        var likes = likes_data.filter(function (el) {
          return el.post == single_post.id;
        });

        if (likes.length > 0) {
          let post_likes = likes[0];
          if (post_likes.id != undefined && post_likes.id != null) {
            postObj.like_id.id = post_likes.id;
          }

          if (
            post_likes.is_deleted != undefined &&
            post_likes.is_deleted != null
          ) {
            postObj.like_id.is_deleted = post_likes.is_deleted;
          }
        }

        //is bookmarked by user
        var bookmark = bookmarks_data.filter(function (el) {
          return el.post == single_post.id;
        });

        if (bookmark.length > 0) {
          let post_bookmark = bookmark[0];
          if (post_bookmark.id != undefined && post_bookmark.id != null) {
            postObj.bookmark_id.id = post_bookmark.id;
          }

          if (
            post_bookmark.is_deleted != undefined &&
            post_bookmark.is_deleted != null
          ) {
            postObj.bookmark_id.is_deleted = post_bookmark.is_deleted;
          }
        }

        //set video view count
        var video_count = video_view_count_data.filter(function (el) {
          return el.post == single_post.id;
        });

        if (video_count.length > 0) {
          let post_view_count = video_count[0];
          if (
            post_view_count.count != undefined &&
            post_view_count.count != null
          ) {
            postObj.view_count = post_view_count.count;
          }
        }

        //set activity user & activity type
        var activity_feed = feeds_data.filter(function (el) {
          return el.post_id == single_post.id;
        });

        if (activity_feed[0].feed_type > 0) {
          var activity_user_id = activity_feed[0].author_id;

          var activity_user = authors_data.filter(function (el) {
            return el.id == activity_user_id;
          });

          if (activity_user.length > 0) {
            let activity_user_obj = new User(activity_user[0]);
            postObj.activityAuthor = activity_user_obj;
            postObj.activityType = activity_feed[0].feed_type;
          }
        }

        this.posts.push(postObj);
      }
    }
  }
}
