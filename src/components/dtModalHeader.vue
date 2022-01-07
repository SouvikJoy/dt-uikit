<template>
  <component :is="tag" :class="className">
    <slot></slot>
    <dt-close-button
      v-if="close"
      :white="closeWhite"
      @click.prevent="closeModal"
    />
  </component>
</template>

<script>
import { computed, inject } from "vue";
import dtCloseButton from "./dtCloseButton.vue";

export default {
  name: "dtModalHeader",
  components: {
    dtCloseButton,
  },
  props: {
    tag: {
      type: String,
      default: "div",
    },
    close: {
      type: Boolean,
      default: true,
    },
    closeWhite: {
      type: Boolean,
      default: false,
    },
    color: String,
  },
  setup(props) {
    const closeModal = inject("closeModal", false);

    const className = computed(() => {
      return ["modal-header", props.color && `bg-${props.color}`];
    });

    return {
      className,
      closeModal,
      props,
    };
  },
};
</script>
