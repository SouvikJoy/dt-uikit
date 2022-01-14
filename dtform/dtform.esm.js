import { computed, openBlock, createElementBlock, normalizeClass, withModifiers, renderSlot } from 'vue';

var script = {
  name: "DtForm",
  props: {
    id: {
      type: String,
      required: false,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    novalidate: {
      type: Boolean,
      default: false,
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit"],
  setup(props) {
    const className = computed(() => ({
      "form-floating": props.floating,
      "was-validated": props.validated,
    }));

    return {
      className,
    };
  },
};

const _hoisted_1 = ["id", "novalidate"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("form", {
    id: $props.id,
    class: normalizeClass($setup.className),
    novalidate: $props.novalidate,
    onSubmit: _cache[0] || (_cache[0] = withModifiers($event => (_ctx.$emit('submit', $event)), ["prevent"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1))
}

script.render = render;
script.__file = "src/components/dtform/DtForm.vue";

export { script as default };
