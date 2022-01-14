this.debuggervue = this.debuggervue || {};
this.debuggervue.dtrow = (function (vue) {
  'use strict';

  var script = {
    name: "DtRow",
    props: {
      tag: {
        type: String,
        default: "div",
      },
      start: {
        type: Boolean,
        default: false,
      },
      end: {
        type: Boolean,
        default: false,
      },
      center: {
        type: Boolean,
        default: false,
      },
      between: {
        type: Boolean,
        default: false,
      },
      around: {
        type: Boolean,
        default: false,
      },
      cols: {
        type: [String, Array],
      },
    },
    setup(props) {
      const className = vue.computed(() => {
        return [
          "row",
          props.cols ? `${spreadProps(props.cols)}` : "",
          props.start && "justify-content-start",
          props.end && "justify-content-end",
          props.center && "justify-content-center",
          props.between && "justify-content-between",
          props.around && "justify-content-around",
        ];
      });

      const spreadProps = (props) => {
        if (typeof props === "string") {
          return `row-cols-${props}`;
        }
        return props.map(() => `row-cols-${props}`.trim()).join(" ");
      };

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
  script.__file = "src/components/dtrow/DtRow.vue";

  return script;

})(Vue);
