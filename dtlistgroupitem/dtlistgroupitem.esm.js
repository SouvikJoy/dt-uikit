import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtListGroupItem",
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
      default: false,
    },
    action: {
      type: Boolean,
      default: false,
    },
    color: String,
  },
  setup(props) {
    const className = computed(() => {
      return [
        "list-group-item",
        props.active && "active",
        props.disabled && "disabled",
        props.action && "list-group-item-action",
        props.color && `list-group-item-${props.color}`,
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    "aria-current": $props.active ? true : null,
    "aria-disabled": $props.disabled ? true : null,
    disabled: $props.disabled ? true : null
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "aria-current", "aria-disabled", "disabled"]))
}

script.render = render;
script.__file = "src/components/dtlistgroupitem/DtListGroupItem.vue";

export { script as default };
