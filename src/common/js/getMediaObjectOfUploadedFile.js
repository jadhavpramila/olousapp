// import videoCheck from "../../mixins/videoCheck";
import { checkImageTypeAndGetHW } from "../../mixins/imageCheck.js";
import { checkIsVideoValidGetHW } from "../../mixins/videoCheck.js";
import appConstants from "../../appConstants.js";
import {
  s3FileUpload,
  s3VideoUpload,
} from "../../mixins/uploadVideosAndImagesOnS3.js";

export async function saveMedia(data, allowedNumberFiles) {
  // console.log(data);
  try {
    let medias = [];
    let allow_total_number_of_files = allowedNumberFiles;
    let selected_files = data;
    let media_files = [];
    let isReadDataFromBody = false;
    let save_video_path_value = appConstants.PATH_SAVE_MEDIA_VIDEOS_ON_S3;
    let save_image_path_value = appConstants.PATH_SAVE_MEDIA_IMAGE_ON_S3;
    let invalid_image = 0;
    let valid_files_list = [];
    for (let i = 0; i <= selected_files.length; i++) {
      let file = selected_files[i];
      // // console.log(file);
      if (!file) {
        continue;
      }
      // // console.log("file type", file);
      // let vid = this.isFileVideo(file)
      // file && file["type"].split("/")[0] === "image"
      if (file && file["type"].split("/")[0] === "video") {
        await checkIsVideoValidGetHW(appConstants.ACCEPT_VIDEO_TYPE, file).then(
          (result) => {
            if (result.isValidVideo) {
              valid_files_list.push({
                file: file,
                validResult: result,
                is_video: true,
              });
            } else {
              invalid_image++;
            }
          }
        );
      }
      // let img = this.isFileImage(file)
      // console.log(file);
      if (file && file["type"].split("/")[0] === "image") {
        await checkImageTypeAndGetHW(appConstants.ACCEPT_IMAGE_TYPE, file).then(
          (result) => {
            // console.log("validation result =>", result);
            if (result.isValidImage) {
              valid_files_list.push({
                file: file,
                validResult: result,
                is_video: false,
              });
            } else {
              invalid_image++;
            }
          }
        );
      }
    }
    // // console.log("valid_files_list =>", valid_files_list);
    for (let j = 0; j < valid_files_list.length; j++) {
      let file_to_upload = valid_files_list[j];
      // // console.log("file to upload =>", file_to_upload);
      media_files.push(file_to_upload);
      // // console.log(media_files);
      if (file_to_upload.is_video) {
        // // console.log("video upload", file_to_upload);
        await s3VideoUpload(
          file_to_upload.file,
          save_video_path_value,
          file_to_upload.validResult
        ).then((result) => {
          return new Promise((resolve, reject) => {
            // // console.log(file_to_upload)
            setCoverImageForVideo(file_to_upload.file).then((res) => {
              // console.log("result of s3videoupload =>", res);
              let videoMedia = result;
              isReadDataFromBody = true;
              let fileObj = {
                file: {
                  name: res.name,
                  size: res.Body.size,
                  type: res.Body.type,
                  body: res.Body,
                },
                is_video: false,
                validResult: {
                  height: result.height,
                  isValidImage: true,
                  message: "",
                  size: res.Body.size,
                  width: result.width,
                },
              };
              // console.log("file save object chekc this =>", fileObj);
              s3FileUpload(
                fileObj.file,
                save_image_path_value,
                fileObj.validResult,
                isReadDataFromBody
              )
                .then((result) => {
                  videoMedia.cover_image = result.name;
                  medias.push(videoMedia);
                  allow_total_number_of_files = allow_total_number_of_files - 1;

                  resolve();
                })
                .catch(function (error) {
                  // console.log(error.message);
                  reject();
                });
            });
          });
        });
      } else {
        // console.log("image upload", file_to_upload);
        isReadDataFromBody = false;
        await s3FileUpload(
          file_to_upload.file,
          save_image_path_value,
          file_to_upload.validResult,
          isReadDataFromBody
        ).then((result) => {
          // this.uploaded_files = result;
          // console.log(result);
          medias.push(result);
          allow_total_number_of_files = allow_total_number_of_files - 1;
        });
      }
    }
    if (invalid_image > 0) {
      let validationRules = this.getAllImageValidationRule(
        appConstants.ACCEPT_IMAGE_TYPE,
        max_size,
        max_width,
        max_height
      );
      let message = `${invalid_image} out of ${selected_files.length} files could not be uploaded.`;
      // let UploadImageError = `${message}\n${validationRules}`;
      this.$toast.add({
        severity: appConstants.toast_severity.ERROR,
        summary: appConstants.toast_summary.ERROR,
        detail: message,
        life: 3000,
      });
    } else {
      // console.log("medias =>", medias);
      return medias;
    }
  } catch (err) {
    // console.log("in catch err =>", err);
  }
}
function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}
function isFileVideo(file) {
  return file && file["type"].split("/")[0] === "video";
}
function setCoverImageForVideo(file_to_upload) {
  // console.log("in setCoverImageForVideo", file_to_upload);
  return new Promise((resolve, reject) => {
    try {
      let selected_files = file_to_upload;
      // document
      //   .getElementById("video")
      //   .setAttribute("src", URL.createObjectURL(selected_files));

      const _VIDEO = document.createElement("video");
      const _CANVAS = document.createElement("canvas");
      _VIDEO.src = URL.createObjectURL(selected_files);
      var _CANVAS_CTX = _CANVAS.getContext("2d");

      // Video metadata is loaded
      _VIDEO.addEventListener("loadedmetadata", function () {
        // Set canvas dimensions same as video dimensions
        _CANVAS.width = _VIDEO.videoWidth;
        _CANVAS.height = _VIDEO.videoHeight;
        _VIDEO.currentTime = 0.0;

        _VIDEO.addEventListener("seeked", function () {
          _CANVAS_CTX.drawImage(
            _VIDEO,
            0,
            0,
            _VIDEO.videoWidth,
            _VIDEO.videoHeight
          );

          // document
          //   .getElementById("video_thumbnail")
          //   .setAttribute("src", _CANVAS.toDataURL("image/jpg"));
          var dataUrl = _CANVAS.toDataURL("image/jpg");

          var binary = atob(dataUrl.split(",")[1]);
          var array = [];
          for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          var blobData = new Blob([new Uint8Array(array)], {
            type: "image/jpeg",
          });

          //  var blobData = this.dataURItoBlob(dataUrl);
          var params = {
            name: "video_cover_image.jpeg",
            ContentType: "image/jpeg",
            Body: blobData,
          };
          resolve(params);
        });
        //   false
        // );
      });
    } catch (error) {
      reject();
    }
  });
}
export default {
  isFileImage,
  isFileVideo,
  setCoverImageForVideo,
};
