'use strict';

var vue = require('vue');

var script = {
  name: "DtFormText",
  props: {
    id: { type: String, required: false },
    inline: { type: Boolean, default: false },
    tag: { type: String, default: "small" },
    textVariant: { type: String, default: "muted" },
  },
  setup(props) {
    const className = vue.computed(() => ({
      "form-text": !props.inline,
      [`text-${props.textVariant}`]: props.textVariant,
    }));

    const attrs = vue.computed(() => ({
      id: props.id || null,
    }));

    return {
      attrs,
      className,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), vue.mergeProps({ class: $setup.className }, $setup.attrs), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtformtext/DtFormText.vue";

module.exports = script;
