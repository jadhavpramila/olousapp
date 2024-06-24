<template>
  <div>
    <span
      @click="showFullText = !showFullText"
      class="lg:text-sm text-sm leading-4 font-normal break-all text-[#333]"
      :innerHTML="setPostContent()"
    ></span
    ><b v-if="showReadMore && !showFullText" class="text-[#333] text-sm">...</b>

    <a
      v-if="showReadMore"
      @click="showFullText = !showFullText"
      class="cursor-pointer lg:text-xs text-xs app-text-color-primary flex justify-end"
    >
      {{ showFullText ? " ...read less" : " read more..." }}
    </a>
  </div>
</template>

<script>
import { getPostContent } from "/src/common/js/ReadPostData.js";
export default {
  name: "ReadMoreLess",
  props: {
    data: {
      type: Object,
      default: null,
    },
    maxLimit: {
      type: Number,
      default: 100,
    },
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showFullText: false,
      showReadMore: true,
    };
  },
  methods: {
    setPostContent() {
      if (this.data != null) {
        //   console.log(this.data);
        let data = getPostContent(this.data);
        if (data.length > this.maxLimit) {
          this.showReadMore = true;
          if (!this.showFullText) {
            return data.slice(0, this.maxLimit);
          } else {
            return data;
          }
        } else {
          this.showReadMore = false;
          return data;
        }
      } else {
        if (this.content.length > this.maxLimit) {
          this.showReadMore = true;
          if (!this.showFullText) {
            return this.content.slice(0, this.maxLimit);
          } else {
            return this.content;
          }
        } else {
          this.showReadMore = false;
          return this.content;
        }
      }
    },
  },
};
</script>

<style scoped>
a:hover {
  /* color: #2091206; */
  color: rgb(20, 91, 206);
}
</style>
