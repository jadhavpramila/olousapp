<template>
  <div class="form-container">
    <div class="flex flex-col justify-center gap-5">
      <div>
        <button @click="clickVadsoft()" class="btn lg:w-36">VADsoft</button>
      </div>
      <div>
        <button @click="clickKosoku()" class="btn lg:w-36">KOSUKO</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChooseOrg",
  setup() {
    function clickVadsoft() {
      let url = "org?name=vadsoft";
      window.open(url, "_blank");
    }

    function clickKosoku() {
      let url = "org?name=kosoku";
      window.open(url, "_blank");
    }

    return {
      clickVadsoft,
      clickKosoku,
    };
  },
};
</script>
