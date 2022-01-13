import { computed, openBlock, createElementBlock, normalizeClass, renderSlot } from 'vue';

var script = {
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
    const className = computed(() => {
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

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass($setup.className)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/dticon/DtIcon.vue";

export { script as default };
