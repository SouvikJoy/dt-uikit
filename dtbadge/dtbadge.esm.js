import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtBadge",
  props: {
    color: String,
    pill: Boolean,
    dot: Boolean,
    notification: Boolean,
    tag: {
      type: String,
      default: "span",
    },
  },
  setup(props, { attrs }) {
    const className = computed(() => {
      return [
        "badge",
        props.color && `bg-${props.color}`,
        props.pill && "rounded-pill",
        props.dot && "badge-dot",
        props.notification && "badge-notification",
      ];
    });

    return {
      className,
      attrs,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtbadge/DtBadge.vue";

export { script as default };
