export function checkIsVideoValidGetHW(
  acceptableVideoTypes, //.mp4
  selectedVideo
) {
  return new Promise((resolve) => {
    let result = {
      isValidVideo: true,
      message: "",
      height: 0.0,
      width: 0.0,
      duration: 0.0,
      size: selectedVideo.size,
    };
    //First check image type
    if (checkVideoTypeValid(acceptableVideoTypes, selectedVideo)) {
      //check Height and width
      const url = URL.createObjectURL(selectedVideo);
      const video = document.createElement("video");
      video.src = url;
      video.addEventListener("loadedmetadata", function () {
        result.height = this.videoHeight;
        result.width = this.videoWidth;
        result.duration = this.duration;
        resolve(result);
      });
    } else {
      result.isValidImage = false;
      result.message = this.getImageTypeError(acceptableVideoTypes);
      resolve(result);
    }
  });
}

export function checkVideoTypeValid(acceptableVideoTypes, selectedVideo) {
  var result = false;
  var videoExtension = selectedVideo.name.split(".").pop(); //get image extension
  var videoTypeArray = acceptableVideoTypes.replaceAll(".", "").split(","); //from .png,.jpg,.jpeg make an array ["png", "jpg",..]
  var videoType;
  for (videoType in videoTypeArray) {
    if (
      videoExtension.toLowerCase() ==
      `${videoTypeArray[videoType]}`.toLowerCase()
    ) {
      result = true;
    }
  }
  return result;
}

export function getAllVideoValidationRule(
  acceptableVideoTypes // .mp4
) {
  var typeRule = this.getVideoTypeError(acceptableVideoTypes);

  return `${typeRule}`; // replace \n as per requirement
}
export function getVideoTypeError(acceptableVideoTypes) {
  var imgType = acceptableVideoTypes.replaceAll(",", "/");
  return `Please select ${imgType} video.`;
}
