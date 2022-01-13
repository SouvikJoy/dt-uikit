this.debuggervue = this.debuggervue || {};
this.debuggervue.dtlistgroup = (function (vue) {
  'use strict';

  var script = {
    name: "DtListGroup",
    props: {
      flush: {
        type: Boolean,
        default: false,
      },
      horizontal: {
        type: [Boolean, String],
        default: false,
      },
      numbered: Boolean,
      tag: {
        type: String,
        default: "ul",
      },
    },
    setup(props) {
      const className = vue.computed(() => {
        return [
          "list-group",
          props.horizontal && horizontalClass.value,
          props.flush && "list-group-flush",
          props.numbered && "list-group-numbered",
        ];
      });

      const horizontalClass = vue.computed(() => {
        if (!props.horizontal) {
          return;
        }
        return props.horizontal !== true
          ? `list-group-horizontal-${props.horizontal}`
          : "list-group-horizontal";
      });

      return {
        className,
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
  script.__file = "src/components/dtlistgroup/DtListGroup.vue";

  return script;

})(Vue);
