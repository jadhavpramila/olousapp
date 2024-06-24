import { uuid } from "vue3-uuid";
import { uploadFileOnS3 } from "./uploadFileOnS3.js";
import appConstants from "../appConstants.js";

export async function s3FileUpload(
  file_to_upload,
  path_to_save_file,
  image_Data,
  isReadDataFromBody
) {
  //console.log("file_to_upload in s3 file=>", file_to_upload);
  let mediaToReturn = "";
  if (file_to_upload) {
    let imgExt = file_to_upload.name.substr(
      file_to_upload.name.lastIndexOf(".")
    );
    let fileName = uuid.v1() + imgExt;
    // let loader = this.$loading.show({});
    // console.log("file_to_upload =>", file_to_upload);

    var upload_file = file_to_upload;

    if (isReadDataFromBody) {
      upload_file = file_to_upload.body;
    }
    await uploadFileOnS3(
      fileName,
      path_to_save_file,
      upload_file,
      appConstants.IMAGE_CONTENT_TYPE
    )
      .then((data) => {
        //   console.log("data =>", data);
        let media = {
          name: data.savedFileName,
          mediaType: appConstants.media_Type.IMAGE,
          cover_image: "",
          contentSize: image_Data.size,
          width: image_Data.width,
          height: image_Data.height,
          video_duration: 0.0,
          is_processed: false,
        };
        // console.log("media =>", media);
        mediaToReturn = media;
        // return media;
      })
      .catch((err) => {
        let obj = {
          UploadImageError: err,
          showUploadImageError: true,
        };
        mediaToReturn = obj;
        // return obj;
      });
    //console.log(mediaToReturn);
    return mediaToReturn;
  }
}
export async function s3VideoUpload(
  file_to_upload,
  path_to_save_file,
  video_Data
) {
  let mediaToReturn = "";
  if (file_to_upload) {
    let imgExt = file_to_upload.name.substr(
      file_to_upload.name.lastIndexOf(".")
    );
    let fileName = uuid.v1() + imgExt;
    // let loader = this.$loading.show({});
    await uploadFileOnS3(
      fileName,
      path_to_save_file,
      file_to_upload,
      appConstants.VIDEO_CONTENT_TYPE
    )
      .then((data) => {
        // console.log("data of video =>", data, video_Data);
        let media = {
          name: data.savedFileName,
          mediaType: appConstants.media_Type.VIDEO,
          cover_image: "",
          contentSize: video_Data.size,
          width: video_Data.width,
          height: video_Data.height,
          video_duration: video_Data.duration,
          is_processed: false,
        };
        // console.log("media =>", media);
        mediaToReturn = media;
      })
      .catch((err) => {
        let obj = {
          UploadImageError: err,
          showUploadImageError: true,
        };
        mediaToReturn = obj;
      });
    return mediaToReturn;
  }
}
