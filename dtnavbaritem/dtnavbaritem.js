this.debuggervue = this.debuggervue || {};
this.debuggervue.dtnavbaritem = (function (vue) {
  'use strict';

  var script = {
    name: "DtNavbarItem",
    props: {
      tag: {
        type: String,
        default: "li",
      },
      active: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
      },
      exact: {
        type: Boolean,
        default: false,
      },
      newTab: {
        type: Boolean,
        default: false,
      },
      to: [Object, String],
      href: {
        type: String,
      },
      linkClass: {
        type: String,
      },
    },
    setup(props) {
      const className = vue.computed(() => {
        return ["nav-item", !props.to && !props.href && props.active && "active"];
      });

      const linkClassName = vue.computed(() => {
        return [
          "nav-link",
          props.disabled && "disabled",
          props.active && "active",
          props.linkClass,
        ];
      });
      const tab = vue.computed(() => {
        if (props.newTab) {
          return "_blank";
        }

        return false;
      });

      return {
        props,
        className,
        linkClassName,
        tab,
      };
    },
  };

  const _hoisted_1 = ["href", "target"];

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_link = vue.resolveComponent("router-link");

    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.props.tag), {
      class: vue.normalizeClass($setup.className)
    }, {
      default: vue.withCtx(() => [
        ($props.to)
          ? (vue.openBlock(), vue.createBlock(_component_router_link, {
              key: 0,
              class: vue.normalizeClass($setup.linkClassName),
              exact: $props.exact,
              to: $props.to,
              target: $setup.tab
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["class", "exact", "to", "target"]))
          : ($props.href)
            ? (vue.openBlock(), vue.createElementBlock("a", {
                key: 1,
                href: $props.href,
                class: vue.normalizeClass($setup.linkClassName),
                target: $setup.tab
              }, [
                vue.renderSlot(_ctx.$slots, "default")
              ], 10 /* CLASS, PROPS */, _hoisted_1))
            : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["class"]))
  }

  script.render = render;
  script.__file = "src/components/dtnavbaritem/DtNavbarItem.vue";

  return script;

})(Vue);
