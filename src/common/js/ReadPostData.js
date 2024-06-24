//import Olous_Block_img from "https://olous.s3.ap-south-1.amazonaws.com/website/static/Dummy_Image.svg";
//import Olous_Text_Img from "https://olous.s3.ap-south-1.amazonaws.com/website/static/Text-Icon.svg";
import appConstants from "../../appConstants.js";

import { getInterestValues } from "./getValuesFromIds.js";

let Olous_Block_img = `${
  import.meta.env.VITE_APP_S3_STATIC_IMAGES
}${"Dummy_Image.svg"}`;
let Olous_Text_Img = `${
  import.meta.env.VITE_APP_S3_STATIC_IMAGES
}${"Text-Icon.svg"}`;

export function getAuthorName(data) {
  if (
    data.hasOwnProperty("author") &&
    data.author.hasOwnProperty("last_name") &&
    data.author.hasOwnProperty("first_name")
  ) {
    var lastName = data.author.last_name;
    if (lastName == ".") {
      lastName = "";
    }
    var name = `${data.author.first_name} ${lastName}`;
    return name;
  } else {
    return "";
  }
}

export function getUserSubTitle(data, maxLength = 100) {
  if (data.hasOwnProperty("author") && data.author.hasOwnProperty("about")) {
    if (data.author.about == "") {
      let designation = data.author.designation;
      if (data.author.designation.length > maxLength) {
        designation = designation.slice(0, maxLength) + "...";
      }
      return designation;
    } else {
      let about = data.author.about;
      if (data.author.about.length > maxLength) {
        about = about.slice(0, maxLength) + "...";
      }
      return about;
    }
  } else {
    return "";
  }
}

export function getPostTitle(data) {
  if (data.hasOwnProperty("title")) {
    return data.title;
  } else {
    return "";
  }
}

export function getPostContent(data) {
  if (data.hasOwnProperty("content")) {
    return data.content.replace(/\n/g, "<br />");
  } else {
    return "";
  }
}

export function getPostTitleElseContent(data) {
  if (data.hasOwnProperty("title") && data.title != "") {
    return data.title;
  } else if (data.hasOwnProperty("content") && data.content != "") {
    return data.content.replace(/\n/g, "<br />");
  }

  return "";
}

export function getProfileImage(data) {
  if (
    data.author.hasOwnProperty("is_pseudo_user") &&
    data.author.is_pseudo_user == true
  ) {
    if (
      data.author.hasOwnProperty("profile_image") &&
      data.author.profile_image != ""
    ) {
      // let profileImageURL = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
      //   data.author.profile_image
      // }`;
      return data.author.profile_image;
    } else {
      return Olous_Block_img;
    }
  } else {
    if (
      data.hasOwnProperty("author") &&
      data.author.hasOwnProperty("profile_image")
    ) {
      if (
        data.author.profile_image == null ||
        data.author.profile_image.trim() == ""
      ) {
        return Olous_Block_img;
      } else {
        return data.author.profile_image;
      }
    } else {
      return Olous_Block_img;
    }
  }
}

export function getHostName(newsURL) {
  if (newsURL == "" || newsURL == undefined) {
    return "";
  }
  var fullurl = newsURL;
  var j = fullurl.indexOf("://");
  var host = "";
  for (var i = j + 3; i < fullurl.length; i++) {
    if (fullurl.charAt(i) != "/") {
      host = host + "" + fullurl.charAt(i);
    } else {
      break;
    }
  }
  return host;
}

export function getImageURL(data) {
  // if(data.cover_image != null && data.cover_image.trim() != ""){
  //     var postImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${data.cover_image}`
  //     return postImageURL
  // }else{
  if (data.medias.length > "") {
    for (var i = 0; i < data.medias.length; i++) {
      if (
        data.medias[i].mediaType == appConstants.media_Type.IMAGE ||
        data.medias[i].mediaType == appConstants.media_Type.COVER_IMAGE
      ) {
        // var mediaImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
        //   data.medias[i].name
        // }`;
        return data.medias[i].name;
      }
    }
    return Olous_Block_img;
  } else return Olous_Block_img;
  // }
}

export function getImageMedia(data) {
  if (data.medias.length > "") {
    for (var i = 0; i < data.medias.length; i++) {
      if (
        data.medias[i].mediaType == appConstants.media_Type.IMAGE ||
        data.medias[i].mediaType == appConstants.media_Type.COVER_IMAGE
      ) {
        var imageMedia = data.medias[i];
        return imageMedia;
      }
    }
    return null;
  } else return null;
}

export function getCoverImageURL(data) {
  //if did any chnage sdo it in getOGCoverImageURL
  if (data.media_type == appConstants.media_Type.TEXT) {
    return Olous_Text_Img;
  }

  if (data.cover_image != null && data.cover_image.trim() != "") {
    var postImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
      data.cover_image
    }`;
    return postImageURL;
  } else {
    if (data.medias.length > "") {
      for (var i = 0; i < data.medias.length; i++) {
        if (
          data.medias[i].cover_image != "" &&
          data.medias[i].cover_image != null
        ) {
          var mediaImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
            data.medias[i].cover_image
          }`;
          return mediaImageURL;
        }
      }

      for (var i = 0; i < data.medias.length; i++) {
        if (
          data.medias[i].mediaType == appConstants.media_Type.IMAGE ||
          data.medias[i].mediaType == appConstants.media_Type.COVER_IMAGE
        ) {
          // var mediaImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
          //   data.medias[i].name
          // }`;
          return data.medias[i].name;
        }
      }
      return Olous_Block_img;
    } else return Olous_Block_img;
  }
}

export function getOGCoverImageURL(data) {
  let result = {
    url: "",
    is_processed: false,
  };

  if (data.media_type == appConstants.media_Type.TEXT) {
    result.url = Olous_Text_Img;
    result.is_processed = false;
    return result;
  }

  if (data.cover_image != null && data.cover_image.trim() != "") {
    var postImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
      data.cover_image
    }`;
    result.url = postImageURL;
    result.is_processed = false;
    return result;
  } else {
    if (data.medias.length > "") {
      for (var i = 0; i < data.medias.length; i++) {
        if (
          data.medias[i].cover_image != "" &&
          data.medias[i].cover_image != null
        ) {
          var mediaImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
            data.medias[i].cover_image
          }`;
          result.url = mediaImageURL;
          result.is_processed = false;
          return result;
        }
      }

      for (var i = 0; i < data.medias.length; i++) {
        if (
          data.medias[i].mediaType == appConstants.media_Type.IMAGE ||
          data.medias[i].mediaType == appConstants.media_Type.COVER_IMAGE
        ) {
          // var mediaImageURL = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${
          //   data.medias[i].name
          // }`;
          if (data.medias[i].social_url) {
            result.url = data.medias[i].social_url;
            result.is_processed = true;
          } else {
            result.url = data.medias[i].name;
            result.is_processed = false;
          }

          return result;
        }
      }
      result.url = Olous_Block_img;
      result.is_processed = false;
      return result;
    } else result.url = Olous_Block_img;
    result.is_processed = false;
    return result;
  }
}

export function getPostLikes(data) {
  if (data.hasOwnProperty("numberOfLikes")) {
    var postLikes = data.numberOfLikes;
    return postLikes;
  }

  return "";
}

export function getPostComments(data) {
  var postComments = data.numberOfComments;

  return postComments;
}

export function getPostImageURL(imageFileNAme) {
  return `${import.meta.env.VITE_APP_MEDIA_IMGURL}${imageFileNAme}`;
}

export function getPostVideoURL(videoFileNAme) {
  return `${import.meta.env.VITE_APP_MEDIA_VIDEOURL}${videoFileNAme}`;
}

export function getVideoURLFromMedia(data) {
  for (var i = 0; i < data.medias.length; i++) {
    if (data.medias[i].mediaType == appConstants.media_type.VIDEO) {
      return this.getVideoURL(data.medias[i].media_details.name);
    }
  }
}

export function getVideoMedia(data) {
  for (var i = 0; i < data.medias.length; i++) {
    if (data.medias[i].mediaType == appConstants.media_Type.VIDEO) {
      return data.medias[i];
    }
  }
}

export function getDocumentURLFromMedia(data) {
  for (var i = 0; i < data.medias.length; i++) {
    if (data.medias[i].mediaType == appConstants.media_Type.FILE) {
      // var documentURL = `${import.meta.env.VITE_APP_DOCUMENT_URL}${
      //   data.medias[i].name
      // }#navpanes=0&view=fitV, left`;
      var documentURL = `${data.medias[i].name}#navpanes=0&view=fitV, left`;
      return documentURL;
    }
  }

  return "";
}

export function getCommonMediaType(medias) {
  let checkType = [];
  if (medias.length == 1) {
    for (let index = 0; index < medias.length; index++) {
      const element = medias[index];
      // console.log(element);
      return element.mediaType;
    }
  }

  if (medias.length > 1) {
    for (let index = 0; index < medias.length; index++) {
      const element = medias[index];
      // console.log(element);
      let result = checkType.includes(element.mediaType);
      // console.log(result);
      if (result == false) {
        checkType.push(element.mediaType);
      }
    }
    // console.log(this.checkType);
    if (checkType.length > 1) {
      // console.log("in if");
      return appConstants.media_Type.MIX_TYPE;
    } else {
      // console.log("in else", this.checkType);
      return checkType[0];
    }
  }
  if (medias.length == 0) {
    return appConstants.media_Type.TEXT;
  }
}

export async function getParamsForPostURL(data) {
  let userSlug = "";
  let title = "";
  if (data.hasOwnProperty("author")) {
    if (data.author.slug != undefined && data.author.slug != null) {
      userSlug = data.author.slug;
    }
  }

  if (
    data.interest_category != undefined &&
    data.interest_category != null &&
    data.interest_category.length != 0
  ) {
    let interest = await getInterestValues(data.interest_category);
    title = interest;
  } else {
    if (data.title != "") {
      title = data.title;
    } else {
      title = data.content;
    }
    if (title.length > 40) {
      title = title.substring(0, 40);
    }
  }

  //Other than all alphabets & space remove other characters
  title = title.replace(/[^a-zA-Z ]/g, "");
  //concate with "-""
  title = title.replace(/\ /g, "-");

  return {
    user_slur: userSlug,
    title: title.toLocaleLowerCase(),
  };
}

export async function getParamsForBoards(data) {
  let title = "";

  if (data.name != "") {
    title = data.name;
    if (title.length > 40) {
      title = title.substring(0, 40);
    }
  }

  //Other than all alphabets & space remove other characters
  title = title.replace(/[^a-zA-Z ]/g, "");
  //concate with "-""
  title = title.replace(/\ /g, "-");

  return {
    user_slur: data.author.slug,
    title: title.toLocaleLowerCase(),
  };
}
