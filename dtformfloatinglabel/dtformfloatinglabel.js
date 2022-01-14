this.debuggervue = this.debuggervue || {};
this.debuggervue.dtformfloatinglabel = (function (vue) {
  'use strict';

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
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.createElementVNode("label", {
        class: "ms-2",
        for: $props.labelFor
      }, vue.toDisplayString($props.label), 9 /* TEXT, PROPS */, _hoisted_2)
    ]))
  }

  script.render = render;
  script.__file = "src/components/dtformfloatinglabel/DtFormFloatingLabel.vue";

  return script;

})(Vue);
