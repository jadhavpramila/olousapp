<template>
  <div class="cls_uploadimage">
    <div class="">
      <hr class="pb-2" v-if="fileObject.length > 0" />
      <div
        class="logo-preview"
        v-for="(file_obj, counter) in fileObject"
        :key="counter"
      >
        <div class="flex w-full">
          <div :style="styleObject">
            <div class="mr-[11px]">
              <img
                v-if="isFileImage(file_obj)"
                :src="getURL(file_obj)"
                :style="styleObject"
                class="img-preview logo-image"
                :class="getObjectFitClass()"
              />
              <video
                v-else-if="isFileVideo(file_obj)"
                :style="styleObject"
                controls
                class="img-preview logo-image"
              >
                <source :src="getURL(file_obj)" />
                Your browser does not support HTML5 video.
              </video>

              <div v-if="isFileOtherThanImageAndVideo(file_obj)" class="">
                <div
                  class="app-text-color-secondary flex justify-center items-center"
                >
                  <img
                    src="../../assets/img/documents_v1.svg"
                    style="width: 40px; margin-right: 10px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow flex items-center">
            <div class="text-xs font-bold text-[#939393]">
              <span class="mr-2">{{ getFileName(file_obj) }} </span>
              <span>{{ getFileSize(file_obj) }}</span>
              <br />
              <span class="text-[0.6375rem]">Attached</span>
            </div>
          </div>
          <div>
            <img
              @click="removeImage(counter)"
              class="remove-logo"
              :src="getStaticImage('Close_Message_Search.svg')"
              title="Delete"
              style="cursor: pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { uuid } from "vue3-uuid";
import { useLoading } from "vue-loading-overlay";
import {
  checkFileTypeValid,
  checkIsImageValidAndGetHW,
} from "../../mixins/imageCheck.js";
import { checkIsVideoValidGetHW } from "../../mixins/videoCheck.js";
import { uploadFileOnS3 } from "../../mixins/uploadFileOnS3.js";
import { convertFileSize } from "../../common/js/commonFunctions.js";

export default {
  name: "PreviewSelectedMediaInMessaging", //Preview Image from S3 //InMemoryPreviewImageVideo is same just it shows file from uploaded file
  props: [
    "id",
    "media_height",
    "media_width",
    "is_object_fit_contain",
    "fileObject",
    "isShow",
    "save_image_path_value",
  ],
  fileObject: {
    type: Array,
    default: [],
  },
  emits: ["preview_uploadedImagePassURL_Removed"],
  data() {
    return {
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,

      styleObject: {
        width: `${this.media_width}px !important`,
        height: `${this.media_height}px !important`,
      },
    };
  },
  watch: {
    image_name_value: function (val) {
      this.setFullURL(val);
    },
  },
  methods: {
    removeImage(index) {
      this.$emit("preview_uploadedImagePassURL_Removed", index);
    },
    getFileName(file_obj) {
      //console.log(file_obj.file);
      return file_obj.file.name;
    },
    getFileSize(file_obj) {
      let size = convertFileSize(file_obj.file.size);
      return size;
    },
    getURL(file) {
      return URL.createObjectURL(file.file);
    },
    isFileImage(file) {
      return file.file && file.file["type"].split("/")[0] === "image";
    },
    isFileOtherThanImageAndVideo(file) {
      if (this.isFileImage(file)) {
        return false;
      }

      if (this.isFileVideo(file)) {
        return false;
      }

      return true;
    },
    isFileVideo(file) {
      return file.file && file.file["type"].split("/")[0] === "video";
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == "true") {
        return "is_object_fit_contain";
      }
    },
    // emitUploadedImageChangeEvent(file_obj) {
    //   // console.log("file_obj", file_obj);
    //   this.$emit("preview_media_uploaded", file_obj);
    // },
    async btnUploadFile() {
      return new Promise(async (resolve) => {
        try {
          let uploaded_files = [];

          for (let i = 0; i < this.fileObject.length; i++) {
            let file = this.fileObject[i];
            if (!file) {
              continue;
            }
            // let uploaded_file = await this.s3UploadFile(file);
            await this.s3UploadFile(file).then((data) => {
              if (data != null) {
                uploaded_files.push(data);
              }
            });
          }
          // if (this.fileObject) {
          //   this.s3UploadFile(this.fileObject);
          // }

          resolve(uploaded_files);

          // this.emitUploadedImageChangeEvent(uploaded_files);
        } catch (e) {
          resolve([]);
        }
      });
    },
    async s3UploadFile(file_obj) {
      return new Promise((resolve) => {
        try {
          const $loading = useLoading();
          let logoFile = file_obj.file;

          if (logoFile) {
            let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf("."));
            let fileName = uuid.v1() + imgExt;

            uploadFileOnS3(fileName, this.save_image_path_value, logoFile, "")
              .then((data) => {
                // this.company_logo = data.savedFileName
                // console.log("saved file path => ", data.serverFilePath);
                let obj = {
                  height: file_obj.media_height,
                  width: file_obj.media_width,
                  media_type: file_obj.media_type,
                  image_name: data.savedFileName,
                  full_URL: data.serverFilePath,
                  duration: file_obj.duration,
                  original_file_name: file_obj.file.name,
                  file_size: logoFile.size,
                };

                resolve(obj);
                // return obj;
              })
              .catch((err) => {
                this.UploadImageError = err;
                this.showUploadImageError = true;
                this.isLoading = false;
                // loader.hide();

                resolve(null);
              });
          }
        } catch (err) {
          resolve(null);
        }
      });
    },
  },
  created() {},
};
</script>

<style>
.logo-preview {
  /* background: #f2f2f2; */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 8px;
  background: none !important;
}
</style>
