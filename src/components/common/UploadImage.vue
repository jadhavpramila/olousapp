<template>
  <div>
    <!-- before logo upload -->
    <div class="mb-4" v-if="company_logo == '' || company_logo == null">
      <input
        :id="getIDandRef()"
        :accept="imageTypes"
        :ref="getIDandRef()"
        @change="previewLogo"
        type="file"
        style="display: none"
      />
      <span
        class="lg:w-[10rem] lg:h-[10rem] w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center relative"
      >
        <span class="absolute lg:text-6xl md:text-4xl text-gray-900">{{
          upload_button_text
        }}</span>
        <span
          @click="openDialog"
          class="absolute lg:bottom-[1rem] bottom-[0rem] right-0 bg-gray-100 rounded-full text-sm cursor-pointer"
        >
          <!-- Edit.svg -->
          <img src="../../assets/Edit.svg" alt="" class="max-h-9" />
        </span>
      </span>
    </div>
    <!-- after logo upload -->
    <div v-if="company_logoSrc" class="relative mb-4 flex" :style="styleObject">
      <input
        :id="getIDandRef()"
        :accept="imageTypes"
        :ref="getIDandRef()"
        @change="previewLogo"
        type="file"
        style="display: none"
      />
      <img
        v-if="company_logoSrc"
        :src="company_logoSrc"
        :style="styleObject"
        class="lg:bottom-[1rem] bg-gray-100 p-[0.1rem] rounded-full flex items-center justify-center cursor-pointer"
      />
      <img
        @click="openDialog()"
        src="../../assets/Edit.svg"
        alt=""
        class="absolute max-h-9 right-[10px] bottom-[6px]"
      />
    </div>
    <div v-if="submitted && !$v.company_logo.required" class="is-invalid"></div>
    <div v-if="submitted && !$v.company_logo.required" class="invalid-feedback">
      {{ required_validation_message }}
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { checkIsImageValid } from "../../mixins/imageCheck.js";
import { uploadFileOnS3 } from "../../mixins/uploadFileOnS3.js";
import { uuid } from "vue3-uuid";

export default {
  name: "UploadImage",
  props: [
    "id",
    "component_height",
    "is_logo_image",
    "save_image_path_value",
    "image_name_value",
    "submitted",
    "is_object_fit_contain",
    "upload_button_text",
    "required_validation_message",
  ],
  created() {
    // console.log(this.image_name_value);
    if (this.image_name_value == "" || this.image_name_value == null) {
      this.company_logo = "";
      this.company_logoSrc = "";
    } else {
      this.company_logo = this.image_name_value;
      this.company_logoSrc = `${this.image_name_value}`;
    }
  },
  data() {
    return {
      company_logo: "",
      company_logoSrc: "",
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      styleObject: {
        height: `${this.component_height}px `,
        width: `${this.component_height}px `,
      },
    };
  },
  methods: {
    getIDandRef() {
      return `companyLogo_${this.id}`;
    },
    openDialog() {
      //   this.$refs.profileImage.click();
      this.$refs[this.getIDandRef()].click();
      // document.getElementById(this.getIDandRef()).click();
    },
    previewLogo() {
      let logoFile = this.$refs[this.getIDandRef()].files[0];
      //console.log(logoFile);
      if (!logoFile) {
        return;
      }

      // this.isLoading = true;
      // let loader = this.$loading.show({});
      // console.log(appConstants.imageLogoSize.MAX_SIZE);
      var max_size = appConstants.imageLogoSize.MAX_SIZE;
      var max_width = appConstants.imageLogoSize.MAX_WIDTH;
      var max_height = appConstants.imageLogoSize.MAX_HEIGHT;
      // console.log(this.is_logo_image);
      if (this.is_logo_image) {
        max_size = appConstants.imageSize.MAX_SIZE;
        max_width = appConstants.imageSize.MAX_WIDTH;
        max_height = appConstants.imageSize.MAX_HEIGHT;
      }

      checkIsImageValid(
        appConstants.ACCEPT_IMAGE_TYPE,
        max_size,
        max_width,
        max_height,
        logoFile
      ).then((result) => {
        if (result.isValidImage) {
          //console.log("valid image", result);
          this.s3LogoUpload(logoFile);
          this.$refs[this.getIDandRef()].value = null;
          this.isLoading = false;
          // loader.hide();
        } else {
          this.UploadImageError = result.message;
          this.showUploadImageError = true;
          this.$refs[this.getIDandRef()].value = null;
          // this.isLoading = false;
          // loader.hide();
        }
      });
    },
    s3LogoUpload(logoFile) {
      if (logoFile) {
        let imgExt = logoFile.name.substr(logoFile.name.lastIndexOf("."));
        let fileName = uuid.v1() + imgExt;
        // let loader = this.$loading.show({});
        // console.log("filemane -",fileName);
        uploadFileOnS3(
          fileName,
          this.save_image_path_value,
          logoFile,
          appConstants.IMAGE_CONTENT_TYPE
        )
          .then((data) => {
            //console.log("data =>", data);
            this.company_logo = data.savedFileName;
            this.company_logoSrc = data.serverFilePath;
            // this.isLoading = false;
            // loader.hide();
            // console.log(this.company_logo);
            this.emitUploadedImageChangeEvent();
          })
          .catch((err) => {
            this.UploadImageError = err;
            this.showUploadImageError = true;
            // this.isLoading = false;
            // loader.hide();
          });
      }
    },
    removeLogo() {
      this.$refs[this.getIDandRef()].value = "";
      this.company_logoSrc = "";
      this.company_logo = "";
      this.emitUploadedImageChangeEvent();
    },
    emitUploadedImageChangeEvent() {
      // console.log("before emit =>",this.company_logoSrc);
      this.$emit("uploadedImage_changed", {
        image_name: this.company_logoSrc,
      });
      // this.$emit('uploadedImage_changed', this.company_logo)
    },
    getObjectFitClass() {
      if (this.is_object_fit_contain == "true") {
        return "is_object_fit_contain";
      } else {
        return "is_object_fit_cover";
      }
    },
  },
};
</script>

<style></style>
