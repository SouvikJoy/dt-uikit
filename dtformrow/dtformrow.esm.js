import { openBlock, createBlock, resolveDynamicComponent, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtFormRow",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), { class: "row d-flex flex-wrap" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/dtformrow/DtFormRow.vue";

export { script as default };
