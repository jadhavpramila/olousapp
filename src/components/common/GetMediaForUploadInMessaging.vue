<template>
  <div class="cls_uploadimageAndPreviewMultiple">
    <div class="row" :style="upload_button_styleObject">
      <div class="col-12">
        <input
          :id="getIDandRef()"
          :accept="getAcceptableFileType()"
          :ref="getIDandRef()"
          @change="previewLogo"
          type="file"
          style="display: none"
        />
        <div
          id="upload_files"
          class="cursor-pointer"
          @click="uploadImageClick()"
        >
          <img :src="getDisplayImage()" />
          <!-- <label class="upload-text cursor-pointer mt-2">{{
            upload_button_text
          }}</label> -->
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div
        class="col-12"
        v-for="(file_obj, counter) in uploaded_files"
        :key="counter"
      >
        <InMemoryPreviewImageVideo
          :id="getToPreviewImage(counter)"
          :component_height="seleted_image_height"
          :is_object_fit_contain="is_object_fit_contain"
          :fileObject="file_obj.file"
          @preview_uploadedImagePassURL_Removed="removeLogo(counter)"
        ></InMemoryPreviewImageVideo>
      </div>
    </div> -->

    <Dialog
      :showHeader="false"
      v-model:visible="showUploadImageError"
      :style="{ 'min-width': '300px' }"
      :modal="true"
    >
      <div class="form-bg-w p-6">
        <div class="confirmation-content flex items-center">
          <!-- <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" /> -->
          <span class="lg:text-base md:text-base text-sm">{{
            UploadImageError
          }}</span>
        </div>
        <div class="flex justify-end space-x-4 mt-4">
          <button
            @click="showUploadImageError = false"
            class="btn w-auto"
            autofocus
          >
            ok
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import {
  checkFileTypeValid,
  checkImageTypeAndGetHW,
  checkIsImageValidAndGetHW,
} from "../../mixins/imageCheck.js";
import { checkIsVideoValidGetHW } from "../../mixins/videoCheck.js";
import { uploadFileOnS3 } from "../../mixins/uploadFileOnS3.js";
import InMemoryPreviewImageVideo from "../common/InMemoryPreviewImageVideo.vue";
import { uuid } from "vue3-uuid";
import { useLoading } from "vue-loading-overlay";
import { convertFileSize } from "../../common/js/commonFunctions.js";
import Dialog from "primevue/dialog";

export default {
  name: "GetMediaForUploadInMessaging",
  // mixins: [imageCheck, uploadFileOnS3, videoCheck],
  props: [
    "id",
    "upload_button_height",
    "seleted_image_height",
    "is_logo_image",
    "is_object_fit_contain",
    "upload_button_text",
    "file_type",
    "save_image_path_value",
    "display_image",
    "media_max_size",
  ],
  components: {
    InMemoryPreviewImageVideo,
    Dialog,
  },
  emits: ["inMemoryFile_changed", "media_uploaded", "media_selected"],

  data() {
    return {
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,

      showUploadImageError: false,
      UploadImageError: "",
      seleted_image_styleObject: {
        height: `${this.seleted_image_height}px `,
      },
      upload_button_styleObject: {
        height: `${this.upload_button_height}px `,
      },
      uploaded_files: [],
      showUploadButton: true,

      total_number_of_files: 1,
      media_mx_size_in_readable_unit: "",
    };
  },

  methods: {
    getDisplayImage() {
      if (this.display_image == appConstants.upload_file_type.PDF) {
        return this.getStaticImage("msg_file.svg");
        return "../../../src/assets/img/documents_v1.svg";
      } else if (this.display_image == appConstants.upload_file_type.IMAGE) {
        return this.getStaticImage("msg_photo.svg");
      } else if (this.display_image == appConstants.upload_file_type.VIDEO) {
        return this.getStaticImage("msg_video.svg");
      }
    },
    getIDandRef() {
      return `companyLogo_${this.id}`;
    },
    getToPreviewImage(count) {
      return `Preview_Image_${count}`;
    },
    uploadImageClick() {
      document.getElementById(this.getIDandRef()).click();
    },
    async previewLogo() {
      var max_size = appConstants.imageLogoSize.MAX_SIZE;
      var max_width = appConstants.imageLogoSize.MAX_WIDTH;
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT;

      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE;
        max_width = appConstants.imageSize.MAX_WIDTH;
        max_height = appConstants.imageSize.MAX_HEIGHT;
      }

      this.uploaded_files = [];
      let selected_files = this.$refs[this.getIDandRef()].files;

      for (let i = 0; i < selected_files.length; i++) {
        let file = this.$refs[this.getIDandRef()].files[i];
        // check file size
        if (file.size > this.media_max_size) {
          this.UploadImageError = `Please select file less than ${this.media_mx_size_in_readable_unit}`;
          this.showUploadImageError = true;
          this.$refs[this.getIDandRef()].value = "";
          return;
        }
      }

      for (let i = 0; i < selected_files.length; i++) {
        let file = this.$refs[this.getIDandRef()].files[i];
        this.$refs[this.getIDandRef()].value = "";

        //console.log(file)

        if (!file) {
          continue;
        }

        if (this.file_type == appConstants.upload_file_type.IMAGE) {
          await checkImageTypeAndGetHW(
            appConstants.ACCEPT_IMAGE_TYPE,
            file
          ).then((result) => {
            if (result.isValidImage) {
              let data = {
                file: file,
                media_height: result.height,
                media_width: result.width,
                duration: 0,
                media_type: appConstants.media_Type.IMAGE,
              };
              this.uploaded_files.push(data);
              this.emitSelectedImageChangeEvent(this.uploaded_files);
            } else {
              this.UploadImageError = result.message;
              this.showUploadImageError = true;
              this.$refs[this.getIDandRef()].value = null;
            }
          });
        } else if (this.file_type == appConstants.upload_file_type.VIDEO) {
          await checkIsVideoValidGetHW(
            appConstants.ACCEPT_VIDEO_TYPE,
            file
          ).then((result) => {
            if (result.isValidVideo) {
              let data = {
                file: file,
                media_height: result.height,
                media_width: result.width,
                duration: result.duration,
                media_type: appConstants.media_Type.VIDEO,
              };
              this.uploaded_files.push(data);
              this.emitSelectedImageChangeEvent(this.uploaded_files);
            } else {
              this.UploadImageError = result.message;
              this.showUploadImageError = true;
              this.$refs[this.getIDandRef()].value = null;
            }
          });

          // if (this.isFileVideo(file)) {
          //   let data = {
          //     file: file,
          //     media_height: result.media_height,
          //     media_width: result.media_width
          //   }
          //   this.uploaded_files.push(file)
          // } else {
          //   this.UploadImageError = 'Please select video file'
          //   this.showUploadImageError = true
          // }
        } else {
          // console.log("file type");
          // console.log(file.type);

          let data = {
            file: file,
            media_height: "",
            media_width: "",
            duration: "",
            media_type: appConstants.media_Type.FILE,
          };

          this.uploaded_files.push(data);
          this.emitSelectedImageChangeEvent(this.uploaded_files);
          continue;
        }
      }

      this.setVisibilityofUploadButton();
      this.emitFileChangedEvent();
    },
    removeLogo(index) {
      this.uploaded_files.splice(index, 1);
      this.setVisibilityofUploadButton();
      this.emitFileChangedEvent();
    },
    // getObjectFitClass() {
    //   if (this.is_object_fit_contain == 'true') {
    //     return 'is_object_fit_contain'
    //   }
    // },
    checkFileTypeIsZip(selectedImageName) {
      var result = false;
      var imageExtension = selectedImageName.split(".").pop(); //get image extension
      var imageTypeArray = ["zip"]; //from .png,.jpg,.jpeg make an array ["png", "jpg",..]
      var imageType;
      for (imageType in imageTypeArray) {
        if (
          imageExtension.toLowerCase() ==
          `${imageTypeArray[imageType]}`.toLowerCase()
        ) {
          result = true;
        }
      }
      return result;
    },

    getURL(file) {
      return URL.createObjectURL(file);
    },

    isFileImage(file) {
      return file && file["type"].split("/")[0] === "image";
    },
    isFileVideo(file) {
      return file && file["type"].split("/")[0] === "video";
    },

    isFileZip(file) {
      if (file && appConstants.ZIP_CONTENT_TYPE.includes(file["type"])) {
        return true;
      }

      let imgExt = file["name"].substr(file["name"].lastIndexOf("."));
      let zip_extension = appConstants.ACCEPT_ZIP_TYPE.split(",");

      for (let i = 0; i < zip_extension.length; i++) {
        if (imgExt == zip_extension[i].trim()) {
          return true;
        }
      }

      return false;
    },

    isFilePdf(file) {
      return file && file["type"].split("/")[1] === "pdf";
    },
    setVisibilityofUploadButton() {
      if (this.uploaded_files.length >= this.total_number_of_files) {
        this.showUploadButton = false;
      } else {
        this.showUploadButton = true;
      }
    },
    emitFileChangedEvent() {
      if (this.uploaded_files.length > 0) {
        this.$emit("inMemoryFile_changed", {
          file_count: this.uploaded_files.length,
        });
      } else {
        this.$emit("inMemoryFile_changed", {
          file_count: 0,
        });
      }
    },
    emitUploadedImageChangeEvent(file_obj) {
      // console.log("file_obj", file_obj);
      this.$emit("media_uploaded", file_obj);
    },
    emitSelectedImageChangeEvent(file_obj) {
      this.$emit("media_selected", file_obj);
    },
    getAcceptableFileType() {
      if (this.file_type == appConstants.upload_file_type.IMAGE) {
        return appConstants.ACCEPT_IMAGE_TYPE;
      }

      if (this.file_type == appConstants.upload_file_type.VIDEO) {
        return appConstants.ACCEPT_VIDEO_TYPE;
      }

      if (this.file_type == appConstants.upload_file_type.ZIP) {
        return appConstants.ACCEPT_ZIP_TYPE;
      }
      if (this.file_type == appConstants.upload_file_type.PDF) {
        return appConstants.ACCEPT_FILE_TYPE;
      }
    },
    // btnUploadFile() {
    //   for (let i = 0; i < this.uploaded_files.length; i++) {
    //     let file = this.uploaded_files[i];
    //     if (!file) {
    //       continue;
    //     }

    //     this.s3UploadFile(file);
    //   }
    // },
    // s3UploadFile(file_obj) {
    //   const $loading = useLoading();
    //   let logoFile = file_obj.file;
    //   if (logoFile) {
    //     let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf("."));
    //     let fileName = uuid.v1() + imgExt;
    //     let loader = $loading.show({});

    //     // let content_type = appConstants.IMAGE_CONTENT_TYPE

    //     // if (this.isFileVideo(logoFile)) {
    //     //   content_type = appConstants.VIDEO_CONTENT_TYPE
    //     // } else if (this.isFileZip(logoFile)) {
    //     //   content_type = appConstants.ZIP_CONTENT_TYPE
    //     // }

    //     uploadFileOnS3(fileName, this.save_image_path_value, logoFile, "")
    //       .then((data) => {
    //         // this.company_logo = data.savedFileName
    //         // console.log("saved file path => ", data.serverFilePath);
    //         let obj = {
    //           height: file_obj.media_height,
    //           width: file_obj.media_width,
    //           media_type: file_obj.media_type,
    //           image_name: data.savedFileName,
    //           full_URL: data.serverFilePath,
    //           duration: file_obj.duration,
    //         };

    //         this.isLoading = false;
    //         loader.hide();

    //         this.emitUploadedImageChangeEvent(obj);
    //       })
    //       .catch((err) => {
    //         this.UploadImageError = err;
    //         this.showUploadImageError = true;
    //         this.isLoading = false;
    //         loader.hide();
    //       });
    //   }
    // },
    isFileUploaded() {
      if (this.uploaded_files.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    getFileSize(fileSize) {
      let size = convertFileSize(fileSize);
      this.media_mx_size_in_readable_unit = size;
    },
  },
  created() {
    this.setVisibilityofUploadButton();
    this.getFileSize(this.media_max_size);
  },
};
</script>

<style scoped>
/* #upload_files {
  background-color: rgb(0, 151, 153, 0.05) !important;
  border: solid 1px #d1e2ea;
} */

.upload-text {
  font-size: 13px !important;
  color: #000000 !important;
}
</style>
