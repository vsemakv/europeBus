<template lang="pug">
    NuxtChild
</template>

<script>
export default {
  name: "error",
  layout: "error", //OR layout:'default'
  props: {
    error: {
      type: Object,
    },
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.error {
}
</style>
