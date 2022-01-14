import { openBlock, createElementBlock, renderSlot, createElementVNode, toDisplayString } from 'vue';

var script = {
  name: "DtFormFloatingLabel",
  props: {
    label: { type: String },
    labelFor: { type: String },
  },
};

const _hoisted_1 = { class: "form-floating" };
const _hoisted_2 = ["for"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    createElementVNode("label", {
      class: "ms-2",
      for: $props.labelFor
    }, toDisplayString($props.label), 9 /* TEXT, PROPS */, _hoisted_2)
  ]))
}

script.render = render;
script.__file = "src/components/dtformfloatinglabel/DtFormFloatingLabel.vue";

export { script as default };
