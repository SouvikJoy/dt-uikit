import { openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, createCommentVNode } from 'vue';

var script = {
  name: "DtAnimatedCard",
  props: {
    type: String,
  },
};

const _hoisted_1 = { class: "dt-card" };
const _hoisted_2 = {
  key: 0,
  class: "dt-card__img"
};
const _hoisted_3 = {
  key: 0,
  class: "dt-card__interactions"
};
const _hoisted_4 = {
  key: 1,
  class: "dt-card__text"
};
const _hoisted_5 = {
  key: 0,
  class: "dt-card__title"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(`dt-card-content type-${this.type}`)
  }, [
    createElementVNode("div", _hoisted_1, [
      (_ctx.$slots.img)
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "img"),
            (_ctx.$slots.interactions)
              ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createElementVNode("span", null, [
                    renderSlot(_ctx.$slots, "interactions")
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ]))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.text)
        ? (openBlock(), createElementBlock("div", _hoisted_4, [
            (_ctx.$slots.title)
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createElementVNode("h3", null, [
                    renderSlot(_ctx.$slots, "title")
                  ])
                ]))
              : createCommentVNode("v-if", true),
            createElementVNode("p", null, [
              renderSlot(_ctx.$slots, "text")
            ])
          ]))
        : createCommentVNode("v-if", true)
    ])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "src/components/dtanimatedcard/DtAnimatedCard.vue";

export { script as default };
