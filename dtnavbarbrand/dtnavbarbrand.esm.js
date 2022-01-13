import { computed, openBlock, createBlock, resolveDynamicComponent, withCtx, renderSlot } from 'vue';

var script = {
  name: "DtNavbarBrand",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props, { attrs }) {
    const isLink = computed(() => {
      return attrs.href ? "a" : props.tag;
    });

    return {
      isLink,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script.render = render;
script.__file = "src/components/dtnavbarbrand/DtNavbarBrand.vue";

export { script as default };
