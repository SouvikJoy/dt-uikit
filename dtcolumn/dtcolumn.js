this.debuggervue = this.debuggervue || {};
this.debuggervue.dtcolumn = (function (vue) {
  'use strict';

  var script = {
    name: "dtColumn",
    props: {
      tag: {
        type: String,
        default: "div",
      },
      col: {
        type: String,
      },
      sm: {
        type: String,
      },
      md: {
        type: String,
      },
      lg: {
        type: String,
      },
      xl: {
        type: String,
      },
      offset: {
        type: String,
      },
      offsetSm: {
        type: String,
      },
      offsetMd: {
        type: String,
      },
      offsetLg: {
        type: String,
      },
      offsetXl: {
        type: String,
      },
      auto: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const className = vue.computed(() => {
        return [
          props.col ? "col-" + props.col : "",
          props.sm ? "col-sm-" + props.sm : "",
          props.md ? "col-md-" + props.md : "",
          props.lg ? "col-lg-" + props.lg : "",
          props.xl ? "col-xl-" + props.xl : "",
          !props.col && !props.sm && !props.md && !props.lg && !props.xl
            ? "col"
            : "",
          props.offset ? "offset-" + props.offset : "",
          props.offsetSm ? "offset-sm-" + props.offsetSm : "",
          props.offsetMd ? "offset-md-" + props.offsetMd : "",
          props.offsetXl ? "offset-lg" + props.offsetXl : "",
          props.auto ? "col-auto" : "",
        ];
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
  script.__file = "src/components/dtcolumn/DtColumn.vue";

  return script;

})(Vue);
