<template>
  <div>
    <div class="cls-create-post">
      <!-- {{ selectedUser }} -->
      <div v-if="isShow" class="absolute">
        <AddTags
          :tags="form_data.interest_category"
          @close="closeModal"
          @tags_selected="setIntrestTags"
        />
      </div>
      <div class="bg-[#f2f2f2] m-auto overflow-hidden rounded-lg">
        <div class="flex text-center px-6 pt-6">
          <div class="text-center w-full">
            <div class="mt-3 text-left sm:mt-0 sm:text-left">
              <div class="flex">
                <div class="flex-1 text-sm flex items-end">
                  <h3
                    class="text-lg leading-6 font-medium text-black mb-5"
                    id="modal-title"
                  >
                    Create Post
                  </h3>
                </div>
              </div>
              <!-- <div
                class="flex bg-[#ffffff] w-96 rounded-3xl"
                v-if="userDropdown.length == 1"
              >
                <div v-for="(user, index) in userDropdown" :key="index">
                  <img
                    v-if="user.profile_photo"
                    class="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                    :src="user.profile_photo"
                    alt="user image"
                  />
                  <div v-else>
                    <div
                      class="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                    >
                      <span>
                        {{ shortForm(user.name) }}
                      </span>
                    </div>
                  </div>
                </div>
                <span class="relative text-black font-size-18 p-2 capitalize"
                  >{{ user.name }}
                </span>
              </div> -->
              <!-- <span class="text-black"> {{ userDropdown.length }}</span> -->
              <!-- dropdown -->
              <div class="flex bg-[#ffffff] w-96 rounded-3xl mt-2 border-none">
                <Dropdown
                  v-if="userDropdown.length > 1"
                  v-model="selectedUser"
                  :options="userDropdown"
                  optionLabel="name"
                  :filter="false"
                  placeholder="Select a user"
                  :showClear="false"
                  class="text-black font-size-18 w-96 rounded-3xl border-none capitalize"
                >
                  <template #value="slotProps">
                    <div
                      class="country-item country-item-value flex"
                      v-if="slotProps.value"
                    >
                      <img
                        v-if="slotProps.value.profile_photo"
                        draggable="false"
                        class="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                        :src="slotProps.value.profile_photo"
                      />
                      <img
                        v-else
                        draggable="false"
                        src="../../assets/backgroundDummyImage.png"
                        alt=""
                        class="relative"
                      />
                      <!-- <span
                        v-if="!slotProps.value.profile_photo"
                        class="w-12 h-12 absolute"
                        >{{ shortForm(slotProps.value.name) }}</span
                      > -->
                      <span
                        class="relative text-black font-size-18 p-2 capitalize"
                        >{{ slotProps.value.name }}</span
                      >
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <span class="country-item flex">
                      <img
                        v-if="slotProps.option.profile_photo"
                        draggable="false"
                        class="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                        :src="slotProps.option.profile_photo"
                      />
                      <img
                        v-else
                        draggable="false"
                        src="../../assets/backgroundDummyImage.png"
                        alt=""
                        class="relative"
                      />
                      <span
                        class="relative text-black font-size-18 p-2 capitalize"
                        >{{ slotProps.option.name }}</span
                      >
                    </span>
                  </template>
                </Dropdown>
                <template v-else>
                  <div
                    class="flex items-center"
                    v-for="(user, index) in userDropdown"
                    :key="index"
                  >
                    <img
                      v-if="user.profile_photo"
                      draggable="false"
                      class="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                      :src="user.profile_photo"
                      alt="user image"
                    />
                    <div v-else>
                      <div
                        class="w-12 h-12 flex items-center bg-[#d1d1d1] justify-center rounded-full border border-gray-100 shadow-sm"
                      >
                        <span
                          class="relative text-black font-size-18 p-2 capitalize"
                        >
                          {{ shortForm(user.name) }}
                        </span>
                      </div>
                    </div>
                    <span
                      class="relative text-black font-size-18 p-2 capitalize"
                      >{{ user.name }}
                    </span>
                  </div>
                </template>
              </div>
              <div class="flex flex-col my-3">
                <!-- <div class="flex space-x-2 flex-col mb-5"> -->
                <textarea
                  placeholder="Say something..."
                  id="textarea"
                  class="text-black p-2 bg-transparent outline-none cursor-auto"
                  name="content"
                  rows="4"
                  cols="50"
                  style="resize: none"
                  @keydown="checkIsUrl($event)"
                  @blur="changeCheckUrl()"
                  v-model="form_data.content"
                ></textarea>
                <div
                  class="invalid-feedback pt-3"
                  v-for="error of v$.form_data.content.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
                <!-- </div> -->
              </div>
              <div v-if="URLhostName">
                <span class="text-black">{{ URLhostName }}</span>
              </div>
              <!-- <p class="text-black">{{ media_files }}</p> -->
              <div class="text-black mt-3">
                <div
                  v-for="(tag, index) in form_data.interest_category"
                  :key="index"
                >
                  <span
                    class="mt-1.5 float-left mr-2.5 mb-1.5 text-black border-gray-900 pl-2 pr-1.5 py-0.5 bg-[#ffffff] rounded-3xl text-sm"
                    >{{ tag.display_string }}
                    <img
                      class="inline-block lg:ml-2.5 ml-1.5 cursor-pointer"
                      draggable="false"
                      src="../../assets/Tags_Close.svg"
                      @click="deleteTag(index)"
                      alt=""
                    />
                  </span>
                </div>
                <div
                  class="invalid-feedback pt-3"
                  v-for="error of v$.form_data.interest_category.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- if enter url then image will display here -->
        <!-- <div v-if="validURlFromText">
          <img
            :src="validURlFromText"
            class="object-cover z-7 lg:w-48 lg:h-48 h-24 w-24 m-2 rounded-md"
            alt=""
          />
        </div> -->
        <!-- <p class="text-black"> -->
        <!-- {{ isUrlMedia }} -->
        <!-- {{ display_media[0] }} -->
        <!-- </p> -->
        <!-- old media show -->
        <div class="flex text-center px-6">
          <div class="flex mt-2" v-if="display_media.length > 0">
            <div class="grid grid-cols-3 gap-4" :key="mediaKey">
              <!-- :key="getUUIDAsKey(index)" -->
              <div v-for="(media, index) in display_media" :key="index">
                <div>
                  <!-- <p class="text-black">{{media}}</p> -->
                  <div class="flex justify-end">
                    <!-- close button for image -->
                    <img
                      v-if="!isUrlMedia"
                      draggable="false"
                      @click="deleteMedia(index)"
                      class="z-10 h-10 pt-4 pr-2 absolute cursor-pointer object-cover"
                      src="../../assets/Media_Close.svg"
                      alt=""
                    />
                  </div>
                  <img
                    v-if="checkImage(media.type)"
                    draggable="false"
                    id="image"
                    :src="setImageUrl(media)"
                    class="object-cover z-7 lg:w-48 lg:h-48 h-24 w-24 m-2 rounded-md"
                  />
                  <video
                    v-if="!checkImage(media.type)"
                    id="video"
                    muted
                    controls="controls"
                    controlsList="nodownload"
                    class="object-cover z-2 lg:w-48 lg:h-48 h-24 w-24 m-2 rounded-md items-stretch"
                  >
                    <source
                      class="z-2"
                      :src="setVideoUrl(media)"
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- image comnversion id -->
        <div id="urlImage"></div>
        <!-- new media show -->
        <!-- <div class="flex flex-col text-center pl-6">
          <div class="flex mt-2" v-if="display_media.length > 0">
            <div class="flex overflow-x-scroll  gap-2">
              <template v-for="(media, index) in display_media" :key="index">
                <div class="flex-shrink-0">
                  <div class="flex justify-end">
                    <img
                      @click="deleteMedia(getUUIDAsKey(index))"
                      class="h-8 pt-2 pr-1 absolute cursor-pointer"
                      src="../../assets/Media_Close.svg"
                      alt=""
                    />
                  </div>
                  <img
                    v-if="checkImage(media.type)"
                    id="image"
                    :src="setImageUrl(media)"
                    class="h-[9.375rem] w-[9.375rem] rounded-md"
                  />
                  <video
                    v-if="!checkImage(media.type)"
                    id="video"
                    muted
                    controls="controls"
                    controlsList="nodownload"
                    class="h-[7.5rem] w-[9.37.5rem] rounded-md"
                  >
                    <source :src="setVideoUrl(media)" type="video/mp4" />
                  </video>
                </div>
              </template>
            </div>
          </div>
        </div> -->
        <div class="w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4r p-6">
          <div
            class="grid grid-cols-2 lg:grid-cols-4 lg:gap-4 gap-4 text-black"
          >
            <div class="flex items-center cursor-pointer">
              <input
                :id="getIDandRef()"
                :accept="getAcceptFileType()"
                :ref="getIDandRef()"
                multiple="multiple"
                @change="previewImage"
                type="file"
                style="display: none"
              />
              <video id="video-element" controls style="display: none">
                <source type="video/mp4" />
              </video>
              <canvas id="canvas-element" style="display: none"></canvas>
              <!-- <img id="video_thumbnail" alt="" /> -->
              <img
                src="../../assets/Media.svg"
                class="h-6 inline mr-2"
                draggable="false"
                alt=""
                @click="openDialog()"
              />
              <span class="cursor-pointer" @click="openDialog()">
                Add Media</span
              >
            </div>
            <!-- <button
              class="
                relative
                btn4
                uppercase
                font-semibold
                tracking-wider
                leading-none
                overflow-hidden
              "
              type="button"
              @click="openTagsModal"
            >
              <img
                src="../../assets/Tags.svg"
                class="h-6 inline mr-2 cursor-pointer"
                alt=""
              />
              <span class="absolute inset-x-0 h-3 bottom-0 bg-black"></span>
              Add Tags
            </button> -->
            <div class="flex text-center items-center">
              <img
                src="../../assets/Tags.svg"
                draggable="false"
                @click="openTagsModal"
                class="h-6 inline mr-2 cursor-pointer"
                alt=""
              />
              <span class="cursor-pointer" @click="openTagsModal">
                Add Tags</span
              >
            </div>
            <div>
              <button
                class="btn my-1 hover-create-post hover-effect lg:text-lg text-sm p-2 w-full btn-inputeControlHeight"
                type="submit"
                id="cancelButton"
                @click="close()"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                class="btn my-1 hover-create-post hover-effect lg:text-base text-sm p-2 w-full btn-inputeControlHeight"
                type="submit"
                @click="savePost()"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConstants from "../../appConstants.js";
import { mapGetters, mapActions } from "vuex";
import { checkFileTypeValid } from "../../mixins/imageCheck.js";
import AddTags from "./addTags.vue";
import { getUUID } from "../../common/js/commonFunctions.js";
import { saveMedia } from "../../common/js/getMediaObjectOfUploadedFile.js";
import useVuelidate from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";
import { useLoading } from "vue-loading-overlay";
import Dropdown from "primevue/dropdown";
import { getHostName } from "/src/common/js/ReadPostData.js";

export default {
  name: "CreatePost",
  // mixins: [imageCheck, videoCheck, uploadFileOnS3, uploadVideosAndImagesOnS3],
  mounted() {
    this.action_getInterest();
    textarea.focus();
    this.action_userCompany();
    // // console.log(["getter_user",this.getter_user );
    this.setUserDropDown();
  },
  components: {
    AddTags,
    Dropdown,
  },
  computed: {
    ...mapGetters("dropdown", ["getter_interest"]),
    ...mapGetters("login", ["getter_user", "getter_userCompany"]),
    // mediaUpate() {
    //   return this.display_media;
    // },
  },
  data() {
    return {
      isUrlMedia: "",
      URLhostName: "",
      userDropdown: [],
      validURlFromText: "",
      selectedUser: "",
      mediaKey: "",
      allow_total_number_of_files: 6,
      isShow: false,
      isReadDataFromBody: false,
      getCoverImageForVideo: "",
      id: "postImage",
      save_image_path_value: appConstants.PATH_SAVE_MEDIA_IMAGE_ON_S3,
      save_video_path_value: appConstants.PATH_SAVE_MEDIA_VIDEOS_ON_S3,
      uploaded_files: "",
      display_media: [],
      media_files: [],
      imageTypes: appConstants.ACCEPT_IMAGE_TYPE,
      videoTypes: appConstants.ACCEPT_VIDEO_TYPE,
      disabled: false,
      form_data: {
        title: "",
        url: "",
        content: "",
        author: "",
        post_type: 0,
        interest_category: [],
        taggedUsers: [],
        profession_category: [],
        tags: [],
        video_duration: 0.0,
        media_type: 1,
        cover_image: "",
        medias: [],
        // is_company_post: false,
      },
      // form_data: {
      //   category: [],
      //   taggedUsers: [],
      //   profession_category: [],
      //   interest_category: [],
      //   media_type: 0,
      //   medias: [],
      //   title: "",
      //   post_type: 0,
      //   url: "",
      //   content: "",
      //   is_company_post: false,
      //   author: "",
      // },
    };
  },
  setup() {
    return { v$: useVuelidate({ $autoDirty: false }) };
  },
  created() {
    this.mediaKey = this.getUUIDAsKey();
  },
  validations() {
    return {
      form_data: {
        content: {
          required: helpers.withMessage(
            "Please say something about your post.",
            required
          ),
        },
        interest_category: {
          required: helpers.withMessage(
            "Please select appropriate tags for this post.",
            requiredIf(function () {
              if (
                this.form_data.content.trim() != "" &&
                this.selectedUser.id == appConstants.UserType.COMPANY
              ) {
                return true;
              } else {
                return false;
              }
            })
          ),

          // required: helpers.withMessage(
          //   requiredIf(function () {
          //     this.selectedUser.id == appConstant.UserType.COMPANY;
          //   }),
          //   `Tags Required !!!!`,
          //   requiredIf
          // ),
        },
      },
    };
  },
  methods: {
    ...mapActions("dropdown", ["action_getInterest"]),
    ...mapActions("post", [
      "action_savePost",
      "action_getImageFromUrl",
      "action_getImageObject",
    ]),
    ...mapActions("login", ["action_userCompany"]),

    validUrl(text) {
      if (this.isValidURL(text) && this.validURlFromText != null) {
        // const urlRegex =
        //   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        const urlRegex =
          /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        let urlArray = text.match(urlRegex);
        if (urlArray.length > 0) {
          this.validURlFromText = urlArray[0];
          this.form_data.content = text.replace(urlArray[0], "");
          // console.log(this.form_data.content);
        }
        // // console.log("url =>", url);
      }
    },
    isValidURL(string) {
      // var res = string.match(
      //   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      // );
      var res = string.match(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      );

      return res !== null;
    },
    async changeCheckUrl() {
      cancelButton.focus();
      // console.log("changeCheckUrl()");
      if (this.display_media.length > 0) {
        return;
      }
      this.urlUpdateToImage();
    },
    async checkIsUrl(e) {
      if (this.display_media.length > 0) {
        return;
      }
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.validUrl(this.form_data.content);
        if (this.validURlFromText) {
          cancelButton.focus();
        }
      }
    },
    urlUpdateToImage() {
      // return new Promise((resolve, reject) => {
      // const $loading = useLoading();
      // let loader = $loading.show();
      this.validUrl(this.form_data.content);
      if (this.validURlFromText) {
        let obj = {
          url: this.validURlFromText,
        };
        this.action_getImageFromUrl(obj)
          .then((result) => {
            // // console.log("image from url result", result);
            let filename = result.file.data.image_content;
            let title = result.URL_title;
            let url = `data:image/jpeg;base64,${filename}`;
            fetch(url)
              .then((res) => res.blob())
              .then((blob) => {
                let filename = `upload_image.${blob.type.split("/").pop()}`;
                const file = new File([blob], filename, {
                  type: blob.type,
                });
                // console.log("file =>", file);
                this.isUrlMedia = true;
                this.display_media.push(file);
                this.allow_total_number_of_files =
                  this.allow_total_number_of_files - 1;
                this.form_data.url = this.validURlFromText;
                this.URLhostName = getHostName(this.validURlFromText);
                if (this.form_data.content.trim() == "") {
                  this.form_data.content = `${title}`;
                } else {
                  this.form_data.content = `${this.form_data.content} `;
                }
                // resolve();
                return false;
              });
          })
          .catch((err) => {
            // reject();
            return false;
          });
      } else {
        // reject();
        return false;
      }
      // });
    },
    setImage(path) {
      // // console.log(path);
      let result = path.includes("media");
      if (result) {
        return path;
      } else {
        let url = `${import.meta.env.VITE_APP_MEDIA_IMGURL}${path}`;
        // // console.log(url);
        return url;
      }
    },
    setUserDropDown() {
      // console.log("in setUserDropDown", this.getter_userCompany);
      console.log("getter_user =>", this.getter_user);
      let obj = {
        id: "user",
        author_id: this.getter_user.id,
        name: this.getter_user.first_name + " " + this.getter_user.last_name,
        profile_photo: "",
        is_pseudo_user: this.getter_user.is_pseudo_user,
      };
      if (obj.is_pseudo_user == true) {
        console.log("in psudo if");
        if (this.getter_user.profile_image) {
          console.log("in if image is there !!");
          obj.profile_photo = `${import.meta.env.VITE_APP_COMPANY_IMGURL}${
            this.getter_user.profile_image
          }`;
        } else {
          console.log("in else");
          // obj.profile_photo = this.shortForm(obj.name);
          obj.profile_photo = this.getter_user.profile_image;
        }
      } else {
        console.log("in psudo else");
        if (this.getter_user.profile_image) {
          console.log("else in if image is there !!");
          obj.profile_photo = this.setImage(this.getter_user.profile_image);
        } else {
          console.log("else in else");
          // obj.profile_photo = this.shortForm(obj.name);
          obj.profile_photo = this.getter_user.profile_image;
        }
        // let path = this.getter_user.profile_image
        // obj.profile_photo = this.setImage(this.getter_user.profile_image);
      }
      this.userDropdown.push(obj);
      // company set object
      let array = this.getter_userCompany;
      for (let index = 0; index < array.length; index++) {
        let ele = array[index];
        let obj = {
          id: "company",
          author_id: ele.company_user_id,
          name: ele.name,
          profile_photo: this.setCompanyProfile(ele.banner_image),
          is_pseudo_user: false,
        };
        this.userDropdown.push(obj);
      }
      this.selectedUser = this.userDropdown[0];
      // // console.log("in setUserDropDown", this.userDropdown);
    },
    setCompanyProfile(path) {
      return `${import.meta.env.VITE_APP_COMPANY_IMGURL}${path}`;
    },
    getUUIDAsKey(index) {
      var res = getUUID(index);
      // // console.log(res);
      return res;
    },
    deleteMedia(position) {
      // // console.log("display_media after =>", this.display_media, position);
      this.display_media.splice(position, 1);
      this.mediaKey = this.getUUIDAsKey();
      this.allow_total_number_of_files = this.allow_total_number_of_files + 1;
      // // console.log("after delete =>", this.display_media);
    },
    deleteTag(index) {
      // // console.log(index);
      this.form_data.interest_category.splice(index, 1);
    },
    checkImage(type) {
      if (type.includes("image")) {
        return true;
      } else {
        return false;
      }
    },
    async setCommonMediaType() {
      // // console.log("in setCommonMediaType =>", this.form_data);
      let arr = [];
      await this.form_data.medias.map((res) => {
        // // console.log("res =>", res);
        if (arr.includes(res.mediaType)) {
          return;
        } else {
          arr.push(res.mediaType);
        }
      });
      // // console.log(arr);
      if (arr.length > 2) {
        // // console.log("mix type");
        this.form_data.media_type = appConstants.media_Type.MIX_TYPE;
      } else if (arr[0] == appConstants.media_Type.IMAGE) {
        // // console.log("image type");
        this.form_data.media_type = appConstants.media_Type.IMAGE;
      } else if (arr[0] == appConstants.media_Type.VIDEO) {
        // // console.log("video type");
        this.form_data.media_type = appConstants.media_Type.VIDEO;
      } else {
        this.form_data.media_type = appConstants.media_Type.TEXT;
      }
    },
    async savePost() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        // // console.log("in if ");
        return false;
      } else {
        const $loading = useLoading();
        // // console.log("selectedUser =>", this.selectedUser);
        if (this.selectedUser.id == appConstants.UserType.USER) {
          this.form_data.author = this.selectedUser.author_id;
          // this.form_data.is_company_post = false;
        } else if (this.selectedUser.id == appConstants.UserType.COMPANY) {
          this.form_data.author = this.selectedUser.author_id;
          // this.form_data.is_company_post = true;
        }
        // console.log(this.form_data);
        let loader = $loading.show();
        // await this.saveMedia();
        this.form_data.medias = await saveMedia(
          this.display_media,
          this.allow_total_number_of_files
        );
        // // console.log("this.form_data.medias =>", this.form_data.medias);
        await this.setCommonMediaType();
        let tempData = this.form_data.interest_category;
        // // console.log(tempData);
        this.form_data.interest_category =
          await this.form_data.interest_category.map((tag) => {
            return tag.id;
          });
        this.form_data.author = this.getter_user.id;
        // // console.log(this.form_data);
        this.form_data.content = this.form_data.content.trimEnd();
        // console.log("content test =>", this.form_data);
        this.action_savePost(this.form_data)
          .then((response) => {
            //   // console.log(response);
            loader.hide();
            this.$toast.add({
              severity: appConstants.toast_severity.SUCCESS,
              summary: appConstants.toast_summary.SUCCESS,
              detail: response.message,
              life: 3000,
            });
            this.close();
          })
          .catch((err) => {
            // // console.log(tempData);
            this.form_data.interest_category = tempData;
            // // console.log(this.form_data);
            loader.hide();
            // // console.log(err);
          });
      }
    },
    close() {
      // this.$router.push({ name: appConstants.routes.TIMELINE });
      this.$emit("close");
    },
    setIntrestTags(val) {
      this.form_data.interest_category = val;
      this.isShow = false;
    },
    openTagsModal() {
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
    getAcceptFileType() {
      let types = `${this.imageTypes},${this.videoTypes}`;
      // // console.log(types);
      return types;
    },
    getIDandRef() {
      return `uploadMultiple_${this.id}`;
    },
    openDialog() {
      if (this.display_media.length < 6) {
        if (this.$refs[this.getIDandRef()].files.length < 6) {
          this.$refs[this.getIDandRef()].value = "";
          this.$refs[this.getIDandRef()].click();
        } else {
          this.$refs[this.getIDandRef()].value = "";
        }
      } else {
        this.$toast.add({
          severity: "info",
          summary: "Info Message",
          detail: "You have already selected 6 medias",
          life: 3000,
        });
      }
      // if (
      //   this.$refs[this.getIDandRef()].files.length >
      //   this.allow_total_number_of_files
      // ) {
      //   // console.log(this.$refs[this.getIDandRef()].value);
      //   this.$refs[this.getIDandRef()].value = "";
      //   // console.log(this.$refs[this.getIDandRef()].value);
      //   this.$toast.add({
      //     severity: "info",
      //     summary: "Info Message",
      //     detail: "Maximum of 6 items can be selected",
      //     life: 3000,
      //   });
      // } else {
      //   this.$refs[this.getIDandRef()].click();
      // }
    },

    async dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    },

    setCoverImageForVideo(file_to_upload) {
      // // console.log("in setCoverImageForVideo", file_to_upload);
      return new Promise((resolve, reject) => {
        try {
          let selected_files = file_to_upload;
          document
            .getElementById("video-element")
            .setAttribute("src", URL.createObjectURL(selected_files));

          var _VIDEO = document.getElementById("video-element");
          var _CANVAS = document.getElementById("canvas-element");
          var _CANVAS_CTX = _CANVAS.getContext("2d");

          // Video metadata is loaded
          _VIDEO.addEventListener("loadedmetadata", function () {
            // Set canvas dimensions same as video dimensions
            _CANVAS.width = _VIDEO.videoWidth;
            _CANVAS.height = _VIDEO.videoHeight;
            _VIDEO.currentTime = 0.0;

            // _VIDEO.addEventListener(
            //   "seeked",
            //   function () {
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
            // },
            //   false
            // );
          });
        } catch (error) {
          reject();
        }
      });
    },
    setImageUrl(media) {
      // console.log(media);
      let src = URL.createObjectURL(media);
      return src;
    },
    setVideoUrl(media) {
      return URL.createObjectURL(media);
    },

    async previewImage() {
      // // console.log(this.allow_total_number_of_files);
      if (
        this.$refs[this.getIDandRef()].files.length >
        this.allow_total_number_of_files
      ) {
        // console.log("here !!s");
        this.$toast.add({
          severity: "info",
          summary: "Info Message",
          detail: `You can only select ${this.allow_total_number_of_files} files`,
          life: 3000,
        });
        this.$refs[this.getIDandRef()].value = "";
        return;
      } else {
        let files = this.$refs[this.getIDandRef()].files;
        let acceptableImageTypes = this.imageTypes + "," + this.videoTypes;
        // // console.log("acceptableImageTypes =>", acceptableImageTypes);
        for (let i = 0; i < files.length; i++) {
          let result = await checkFileTypeValid(acceptableImageTypes, files[i]);
          // // console.log(result);
          if (result) {
            this.isUrlMedia = false;
            this.display_media.push(files[i]);
            // // console.log(
            //   "creating array after media seleceted =>",
            //   this.display_media
            // );
            this.allow_total_number_of_files =
              this.allow_total_number_of_files - 1;
          } else {
            // // console.log("rejected files here !!!");
            this.$toast.add({
              severity: "info",
              summary: "Info Message",
              detail: "You can only select Images or videos",
              life: 3000,
            });
          }
        }
      }
      // console.log(this.display_media);
    },
    isFileImage(file) {
      return file && file["type"].split("/")[0] === "image";
    },
    isFileVideo(file) {
      return file && file["type"].split("/")[0] === "video";
    },
    shortForm(name) {
      let result = name.split(" ");
      // console.log(result);
      let fName = result[0];
      let lName = result[1];
      let initialLetters =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
      return initialLetters;
    },
  },
};
</script>
<style scoped>
.btn4 span {
  transform: translateX(-101%);
  transition: transform 0.2s ease-in;
}

.btn4:hover span {
  transform: translateX(0);
}
.selected-tag {
  background-color: #333 !important;
  color: #f2f2f2;
}
.outline {
  border: 1px solid #f2f2f2;
}
.left-popup {
  margin-left: -214px !important;
}
@media only screen and (max-width: 600px) {
  .left-popup {
    margin-left: 0px !important;
  }
}

textarea::-webkit-scrollbar {
  width: 12px;
  background-color: #f2f2f2;
}

textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #afafaf;
}
</style>
