'use strict';

var vue = require('vue');

var script = {
  name: "DtBadge",
  props: {
    color: String,
    pill: Boolean,
    dot: Boolean,
    notification: Boolean,
    tag: {
      type: String,
      default: "span",
    },
  },
  setup(props, { attrs }) {
    const className = vue.computed(() => {
      return [
        "badge",
        props.color && `bg-${props.color}`,
        props.pill && "rounded-pill",
        props.dot && "badge-dot",
        props.notification && "badge-notification",
      ];
    });

    return {
      className,
      attrs,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtbadge/DtBadge.vue";

module.exports = script;
