import appConstants from "../../appConstants.js";
let s3Url = import.meta.env.VITE_APP_S3URL;
let s3Url_WithS3Dot = import.meta.env.VITE_APP_S3URL_WITHS3_DOT;
let s3Url_WithS3Dash = import.meta.env.VITE_APP_S3URL_WITHS3_DASH;
let s3Url_WithS3_Olous = import.meta.env.VITE_APP_S3URL_WITHS3_OLOUS;
let media_stored_path = appConstants.media_stored_at;

function isContainsStr(str, sub_str) {
  let res = str.indexOf(sub_str);
  if (res !== -1) {
    return true;
  } else {
    return false;
  }
}
function calculateSocialUrl(url) {
  let imgExt = url.substr(url.lastIndexOf("."));
  let socialUrl = url.replace(/(\.[\w\d_-]+)$/i, "_social");
  //console.log("social url", socialUrl+imgExt)
  return socialUrl + imgExt;
}

function isContainsStrIgnoreCase(str) {
  let res = str.toLowerCase().indexOf(s3Url.toLowerCase());
  let res1 = str.toLowerCase().indexOf(s3Url_WithS3Dot.toLowerCase());
  let res2 = str.toLowerCase().indexOf(s3Url_WithS3_Olous.toLowerCase());
  let res3 = str.toLowerCase().indexOf(s3Url_WithS3Dash.toLowerCase());
  //console.log("res",res,"res1",res1)
  if (res !== -1 || res1 !== -1 || res2 !== -1 || res3 !== -1) {
    return true;
  } else {
    return false;
  }
}

export function getAwsUrlFromMedia(media) {
  let mediaType = null;
  let name = "";
  let is_processed = false;
  let processed_file = "";

  if (media.hasOwnProperty("mediaType")) {
    mediaType = media.mediaType;
  }
  if (media.hasOwnProperty("name")) {
    name = media.name;
  }
  if (media.hasOwnProperty("is_processed")) {
    is_processed = media.is_processed;
  }
  if (media.hasOwnProperty("processed_file")) {
    processed_file = media.processed_file;
  }

  if (mediaType == null || name == "") {
    return;
  }

  let fullURL = getAwsUrl(mediaType, name, is_processed, processed_file);
  media.name = fullURL.awsURL;
  media.social_url = fullURL.social_url;
}

export function getAwsUrl(mediaType, name, is_processed, processed_file) {
  let data = {
    awsURL: "",
    social_url: "",
  };

  if (name == null || name == "" || name == undefined) {
    return data;
  }

  if (
    isContainsStrIgnoreCase(name) &&
    processed_file != null &&
    processed_file != undefined &&
    processed_file.length > 0
  ) {
    data.awsURL = name;
    return data;
  }

  if (mediaType == media_stored_path.MEDIA_PRODUCT) {
    if (!isContainsStrIgnoreCase(name)) {
      data.awsURL = `${s3Url}media/products/${name}`;
    } else {
      data.awsURL = name;
    }
  }

  if (
    mediaType == media_stored_path.MEDIA_IMAGES ||
    mediaType == media_stored_path.MEDIA_COVERIMAGES
  ) {
    if (!isContainsStrIgnoreCase(name)) {
      data.awsURL = `${s3Url}media/images/${name}`;
    } else {
      data.awsURL = name;
    }
  }

  if (
    mediaType == media_stored_path.MEDIA_VIDEO ||
    mediaType == media_stored_path.MEDIA_VIDEOPORTFOLIO
  ) {
    if (!isContainsStrIgnoreCase(name)) {
      data.awsURL = `${s3Url}media/video/${name}`;
    } else {
      data.awsURL = name;
    }

    return data;

    // if (name.contains("HLS"))
    // {
    //     if (!name.contains(s3Url))
    //     {
    //         name = `${s3Url}media/${name}`
    //     }
    // }
    // else
    // {
    //     if (!name.contains(s3Url))
    //     {
    //     name = `${s3Url}media/video/${name}`
    //         // print("IVDEO NAME ---- \(name)")

    //     }
    // }
    // if let url = URL(string:name)
    // {
    //     assetItem = AVAsset(url: url)
    // }
  }

  if (mediaType == media_stored_path.MEDIA_DOCUMENTS) {
    if (!isContainsStrIgnoreCase(name)) {
      data.awsURL = `${s3Url}media/documents/${name}`;
    } else {
      data.awsURL = name;
    }
  }
  if (mediaType == media_stored_path.MEDIA_CATALOGUE) {
    if (!isContainsStrIgnoreCase(name)) {
      data.awsURL = `${s3Url}media/catalogue/${name}`;
    } else {
      data.awsURL = name;
    }
  }

  if (
    is_processed &&
    processed_file != null &&
    processed_file != undefined &&
    processed_file.length > 0
  ) {
    data.awsURL = `${s3Url}media/${processed_file}`;
    let result = calculateSocialUrl(data.awsURL);
    data.social_url = result;
    //calculate social url
  }

  return data;
}
