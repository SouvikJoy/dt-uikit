import { computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot } from 'vue';

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
    const className = computed(() => {
      return [
        "list-group",
        props.horizontal && horizontalClass.value,
        props.flush && "list-group-flush",
        props.numbered && "list-group-numbered",
      ];
    });

    const horizontalClass = computed(() => {
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
script.__file = "src/components/dtlistgroup/DtListGroup.vue";

export { script as default };
