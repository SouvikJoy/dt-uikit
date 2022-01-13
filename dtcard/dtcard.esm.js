import { openBlock, createElementBlock, renderSlot, createCommentVNode, createElementVNode } from 'vue';

var script = {
  name: "DtCard",
};

const _hoisted_1 = { class: "dt-card dt-component" };
const _hoisted_2 = {
  key: 0,
  class: "dt-card-header"
};
const _hoisted_3 = { class: "dt-card-body" };
const _hoisted_4 = {
  key: 0,
  class: "dt-card-title"
};
const _hoisted_5 = {
  key: 1,
  class: "dt-card-subtitle"
};
const _hoisted_6 = { class: "dt-card-content" };
const _hoisted_7 = {
  key: 2,
  class: "dt-card-footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.$slots.header)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "header")
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_3, [
      (_ctx.$slots.title)
        ? (openBlock(), createElementBlock("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "title")
          ]))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.subtitle)
        ? (openBlock(), createElementBlock("div", _hoisted_5, [
            renderSlot(_ctx.$slots, "subtitle")
          ]))
        : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_6, [
        renderSlot(_ctx.$slots, "content")
      ]),
      (_ctx.$slots.footer)
        ? (openBlock(), createElementBlock("div", _hoisted_7, [
            renderSlot(_ctx.$slots, "footer")
          ]))
        : createCommentVNode("v-if", true)
    ])
  ]))
}

script.render = render;
script.__file = "src/components/dtcard/DtCard.vue";

export { script as default };
