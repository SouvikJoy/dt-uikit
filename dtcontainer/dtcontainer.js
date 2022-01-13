this.debuggervue = this.debuggervue || {};
this.debuggervue.dtcontainer = (function (vue) {
  'use strict';

  var script = {
    name: "dtContainer",
    props: {
      tag: {
        type: String,
        default: "div",
      },
      sm: {
        type: Boolean,
        default: false,
      },
      md: {
        type: Boolean,
        default: false,
      },
      lg: {
        type: Boolean,
        default: false,
      },
      xl: {
        type: Boolean,
        default: false,
      },
      xxl: {
        type: Boolean,
        default: false,
      },
      fluid: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const className = vue.computed(() => {
        return [
          props.fluid ? "container-fluid" : "",
          props.sm ? "container-sm" : "",
          props.md ? "container-md" : "",
          props.lg ? "container-lg" : "",
          props.xl ? "container-xl" : "",
          props.xxl ? "container-xxl" : "",
          !props.fluid && !props.sm && !props.md && !props.xl && !props.xxl
            ? "container"
            : "",
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
  script.__file = "src/components/dtcontainer/DtContainer.vue";

  return script;

})(Vue);
