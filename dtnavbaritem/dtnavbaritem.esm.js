import { computed, resolveComponent, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, createElementBlock } from 'vue';

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
    const className = computed(() => {
      return ["nav-item", !props.to && !props.href && props.active && "active"];
    });

    const linkClassName = computed(() => {
      return [
        "nav-link",
        props.disabled && "disabled",
        props.active && "active",
        props.linkClass,
      ];
    });
    const tab = computed(() => {
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
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createBlock(resolveDynamicComponent($setup.props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      ($props.to)
        ? (openBlock(), createBlock(_component_router_link, {
            key: 0,
            class: normalizeClass($setup.linkClassName),
            exact: $props.exact,
            to: $props.to,
            target: $setup.tab
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class", "exact", "to", "target"]))
        : ($props.href)
          ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: $props.href,
              class: normalizeClass($setup.linkClassName),
              target: $setup.tab
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_1))
          : renderSlot(_ctx.$slots, "default", { key: 2 })
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtnavbaritem/DtNavbarItem.vue";

export { script as default };
