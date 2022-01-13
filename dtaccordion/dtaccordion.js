this.debuggervue = this.debuggervue || {};
this.debuggervue.dtaccordion = (function (vue) {
  'use strict';

  var script = {
    name: "DtAccordion",
    props: {
      tag: {
        type: String,
        default: "div",
      },
      modelValue: String,
      stayOpen: Boolean,
      flush: Boolean,
      classes: String,
    },
    setup(props, { emit }) {
      const accordionRef = vue.ref(null);
      const className = vue.computed(() => {
        return ["accordion", props.flush && "accordion-flush", props.classes];
      });

      const activeItem = vue.ref(props.modelValue);
      const setActiveItem = (item) => {
        activeItem.value = item;
        emit("update:modelValue", item);
      };

      vue.watchEffect(() => (activeItem.value = props.modelValue));

      vue.provide("activeItem", activeItem);
      vue.provide("stayOpen", props.stayOpen);
      vue.provide("setActiveItem", setActiveItem);

      return {
        accordionRef,
        setActiveItem,
        className,
      };
    },
  };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
      class: vue.normalizeClass($setup.className),
      ref: "accordionRef"
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["class"]))
  }

  script.render = render;
  script.__file = "src/components/dtaccordion/DtAccordion.vue";

  return script;

})(Vue);
