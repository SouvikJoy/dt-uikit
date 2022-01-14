this.debuggervue = this.debuggervue || {};
this.debuggervue.dtformrow = (function (vue) {
  'use strict';

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
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), { class: "row d-flex flex-wrap" }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }))
  }

  script.render = render;
  script.__file = "src/components/dtformrow/DtFormRow.vue";

  return script;

})(Vue);
