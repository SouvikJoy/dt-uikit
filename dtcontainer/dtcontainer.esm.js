import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot } from 'vue';

const DT_CONTAINER_PROPS = {
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

var script = {
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtcontainer/DtContainer.vue";

export { DT_CONTAINER_PROPS, script as default };
