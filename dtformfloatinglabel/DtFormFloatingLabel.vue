<template>
  <div class="form-floating">
    <slot></slot>
    <label class="ms-2" :for="labelFor">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "DtFormFloatingLabel",
  props: {
    label: { type: String },
    labelFor: { type: String },
  },
};
</script>

<style scoped></style>
