<template>
  <component
    :is="tag"
    :type="type"
    :role="role"
    :class="className"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "DtButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "button",
    },
    role: {
      type: String,
      default: "button",
    },
    block: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "btn-secondary",
    },
    size: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    toggler: {
      type: Boolean,
      default: false,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    picker: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:toggle"],
  setup(props, { emit }) {
    const toggle = ref(props.toggle);
    const className = computed(() => {
      return [
        !props.picker && "btn",
        props.variant && `btn-${props.variant}`,
        props.size && `btn-${props.size}`,
        props.rounded && `btn-rounded`,
        props.floating && `btn-floating`,
        props.block && `btn-block`,
        props.pill && `rounded-pill`,
        toggle.value && "active",
      ];
    });

    function handleClick() {
      if (props.toggler) {
        toggle.value = !toggle.value;
        emit("update:toggle", toggle.value);
      }
    }

    return {
      className,
      props,
      handleClick,
    };
  },
};
</script>

<style lang="scss"></style>
