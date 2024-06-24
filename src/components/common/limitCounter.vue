<template>
  <div class="cls-limitCounter">
    <label class="form-label">{{ calculateWords(count, limit) }}/{{ limit }}</label>
  </div>
</template>

<script>
export default {
  name: "limitCounter",
  props: {
    count: String,
    limit: Number,
  },
  methods: {
    calculateWords(count, limit) {
      if (count == null) {
        return limit;
      } else {
        let temp = count?.length;
        count = limit - temp;
        return count;
      }
    },
  },
};
</script>

<style>
</style>