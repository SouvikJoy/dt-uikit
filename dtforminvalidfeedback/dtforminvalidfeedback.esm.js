import { computed, openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtFormInvalidFeedback",
  props: {
    ariaLive: { type: String, required: false },
    forceShow: { type: Boolean, default: false },
    id: { type: String, required: false },
    role: { type: String, required: false },
    state: { type: Boolean, default: undefined },
    tag: { type: String, default: "div" },
    tooltip: { type: Boolean, default: false },
  },
  setup(props) {
    const computedShow = computed(
      () => props.forceShow === true || props.state === false
    );
    const classes = computed(() => ({
      "d-block": computedShow.value,
      "invalid-feedback": !props.tooltip,
      "invalid-tooltip": props.tooltip,
    }));
    const attrs = computed(() => ({
      id: props.id || null,
      role: props.role || null,
      "aria-live": props.ariaLive || null,
      "aria-atomic": props.ariaLive ? "true" : null,
    }));

    return {
      attrs,
      classes,
      computedShow,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({ class: $setup.classes }, $setup.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtforminvalidfeedback/DtFormInvalidFeedback.vue";

export { script as default };
