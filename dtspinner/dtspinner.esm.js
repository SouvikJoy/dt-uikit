import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, createElementVNode } from 'vue';

var script = {
  name: "DtSpinner",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    grow: {
      type: Boolean,
      default: false,
    },
    color: String,
    size: String,
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.grow ? "spinner-grow" : "spinner-border",
        props.color && `text-${props.color}`,
        `${
          props.size
            ? props.grow
              ? "spinner-grow-" + props.size
              : "spinner-border-" + props.size
            : ""
        }`,
      ];
    });

    return {
      className,
      props,
    };
  },
};

const _hoisted_1 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    role: "status"
  }, {
    default: withCtx(() => [
      _hoisted_1,
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtspinner/DtSpinner.vue";

export { script as default };
