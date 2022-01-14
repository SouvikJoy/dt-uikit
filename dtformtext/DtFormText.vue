<template>
  <component :is="tag" :class="className" v-bind="attrs">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed } from "vue";

export default {
  name: "DtFormText",
  props: {
    id: { type: String, required: false },
    inline: { type: Boolean, default: false },
    tag: { type: String, default: "small" },
    textVariant: { type: String, default: "muted" },
  },
  setup(props) {
    const className = computed(() => ({
      "form-text": !props.inline,
      [`text-${props.textVariant}`]: props.textVariant,
    }));

    const attrs = computed(() => ({
      id: props.id || null,
    }));

    return {
      attrs,
      className,
    };
  },
};
</script>
