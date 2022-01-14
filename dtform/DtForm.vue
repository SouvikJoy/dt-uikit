<template>
  <form
    :id="id"
    :class="className"
    :novalidate="novalidate"
    @submit.prevent="$emit('submit', $event)"
  >
    <slot></slot>
  </form>
</template>

<script>
import { computed } from "vue";

export default {
  name: "DtForm",
  props: {
    id: {
      type: String,
      required: false,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    novalidate: {
      type: Boolean,
      default: false,
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit"],
  setup(props) {
    const className = computed(() => ({
      "form-floating": props.floating,
      "was-validated": props.validated,
    }));

    return {
      className,
    };
  },
};
</script>

<style scoped></style>
