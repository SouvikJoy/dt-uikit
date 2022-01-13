import { ref, computed, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "button",
    },
    role: {
      type: String,
      default: "button",
    },
    block: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "btn-secondary",
    },
    size: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    toggler: {
      type: Boolean,
      default: false,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    picker: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:toggle"],
  setup(props, { emit }) {
    const toggle = ref(props.toggle);
    const className = computed(() => {
      return [
        !props.picker && "btn",
        props.variant && `btn-${props.variant}`,
        props.size && `btn-${props.size}`,
        props.rounded && `btn-rounded`,
        props.floating && `btn-floating`,
        props.block && `btn-block`,
        props.pill && `rounded-pill`,
        toggle.value && "active",
      ];
    });

    function handleClick() {
      if (props.toggler) {
        toggle.value = !toggle.value;
        emit("update:toggle", toggle.value);
      }
    }

    return {
      className,
      props,
      handleClick,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    type: $props.type,
    role: $props.role,
    class: normalizeClass($setup.className),
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["type", "role", "class", "onClick"]))
}

script.render = render;
script.__file = "src/components/dtbutton/DtButton.vue";

export { script as default };
