this.debuggervue = this.debuggervue || {};
this.debuggervue.dtspinner = (function (vue) {
  'use strict';

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
      const className = vue.computed(() => {
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

  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("span", { class: "visually-hidden" }, "Loading...", -1 /* HOISTED */);

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
      class: vue.normalizeClass($setup.className),
      role: "status"
    }, {
      default: vue.withCtx(() => [
        _hoisted_1,
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["class"]))
  }

  script.render = render;
  script.__file = "src/components/dtspinner/DtSpinner.vue";

  return script;

})(Vue);
