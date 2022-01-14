<template>
  <component :is="tag" class="row d-flex flex-wrap">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "DtFormRow",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
};
</script>

<style scoped></style>
