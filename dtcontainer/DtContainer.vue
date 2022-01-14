<template>
  <component :is="tag" :class="className">
    <slot></slot>
  </component>
</template>

<script>
export const DT_CONTAINER_PROPS = {
  tag: {
    type: String,
    default: "div",
  },
  sm: {
    type: Boolean,
    default: false,
  },
  md: {
    type: Boolean,
    default: false,
  },
  lg: {
    type: Boolean,
    default: false,
  },
  xl: {
    type: Boolean,
    default: false,
  },
  xxl: {
    type: Boolean,
    default: false,
  },
};

import { computed } from "vue";

export default {
  name: "DtContainer",
  props: {
    ...DT_CONTAINER_PROPS,
    fluid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.fluid ? "container-fluid" : "",
        props.sm ? "container-sm" : "",
        props.md ? "container-md" : "",
        props.lg ? "container-lg" : "",
        props.xl ? "container-xl" : "",
        props.xxl ? "container-xxl" : "",
        !props.fluid && !props.sm && !props.md && !props.xl && !props.xxl
          ? "container"
          : "",
      ];
    });

    return {
      className,
      props,
    };
  },
};
</script>

<style scoped></style>
