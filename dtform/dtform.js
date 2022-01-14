this.debuggervue = this.debuggervue || {};
this.debuggervue.dtform = (function (vue) {
  'use strict';

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
      const className = vue.computed(() => ({
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
    return (vue.openBlock(), vue.createElementBlock("form", {
      id: $props.id,
      class: vue.normalizeClass($setup.className),
      novalidate: $props.novalidate,
      onSubmit: _cache[0] || (_cache[0] = vue.withModifiers($event => (_ctx.$emit('submit', $event)), ["prevent"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1))
  }

  script.render = render;
  script.__file = "src/components/dtform/DtForm.vue";

  return script;

})(Vue);
