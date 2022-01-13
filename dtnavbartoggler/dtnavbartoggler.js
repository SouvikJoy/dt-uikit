this.debuggervue = this.debuggervue || {};
this.debuggervue.dtnavbartoggler = (function (vue) {
  'use strict';

  var script$1 = {
    name: "DtIcon",
    props: {
      iconStyle: {
        type: String,
        default: "fas",
      },
      icon: String,
      flag: String,
      size: String,
    },
    setup(props) {
      const className = vue.computed(() => {
        return [
          !props.flag && props.iconStyle,
          props.flag ? `flag flag-${props.flag}` : `fa-${props.icon}`,
          props.size && `fa-${props.size}`,
        ];
      });

      return {
        className,
      };
    },
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("i", {
      class: vue.normalizeClass($setup.className)
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/dticon/DtIcon.vue";

  var script = {
    name: "DtNavbarToggler",
    components: {
      dtIcon: script$1,
    },
    props: {
      tag: {
        type: String,
        default: "button",
      },
      target: {
        type: String,
        default: "#navbarSupportedContent",
      },
      togglerClass: {
        type: String,
      },
      togglerIcon: {
        type: String,
        default: "bars",
      },
      togglerSize: {
        type: String,
        default: "1x",
      },
      iconStyle: {
        type: String,
        default: "fas",
      },
    },
    setup(props) {
      const navTogglerClass = vue.computed(() => {
        return ["navbar-toggler", props.togglerClass];
      });

      const isExpanded = vue.ref(false);

      const handleClick = () => {
        isExpanded.value = !isExpanded.value;
      };

      return {
        navTogglerClass,
        handleClick,
        isExpanded,
        props,
      };
    },
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_dt_icon = vue.resolveComponent("dt-icon");

    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
      class: vue.normalizeClass($setup.navTogglerClass),
      type: "button",
      "aria-controls": $props.target,
      "aria-expanded": $setup.isExpanded,
      "aria-label": "Toggle navigation",
      onClick: $setup.handleClick
    }, {
      default: vue.withCtx(() => [
        vue.createVNode(_component_dt_icon, {
          icon: $props.togglerIcon,
          size: $props.togglerSize,
          iconStyle: $props.iconStyle
        }, null, 8 /* PROPS */, ["icon", "size", "iconStyle"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["class", "aria-controls", "aria-expanded", "onClick"]))
  }

  script.render = render;
  script.__file = "src/components/dtnavbartoggler/DtNavbarToggler.vue";

  return script;

})(Vue);
