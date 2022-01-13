'use strict';

var vue = require('vue');

var script = {
  name: "DtNavbarBrand",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props, { attrs }) {
    const isLink = vue.computed(() => {
      return attrs.href ? "a" : props.tag;
    });

    return {
      isLink,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/dtnavbarbrand/DtNavbarBrand.vue";

module.exports = script;
