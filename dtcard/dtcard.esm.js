import { openBlock, createElementBlock, createElementVNode, normalizeClass, renderSlot, createCommentVNode } from 'vue';

var script = {
  name: "DtCard",
  props: {
    type: String,
  },
};

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "dt-card" };
const _hoisted_3 = {
  key: 0,
  class: "dt-card__img"
};
const _hoisted_4 = {
  key: 0,
  class: "dt-card__interactions"
};
const _hoisted_5 = {
  key: 1,
  class: "dt-card__text"
};
const _hoisted_6 = {
  key: 0,
  class: "dt-card__title"
};
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { class: "dt-card-content dt-card-basic" };
const _hoisted_9 = {
  key: 0,
  class: "dt-card-header"
};
const _hoisted_10 = { class: "dt-card-body" };
const _hoisted_11 = {
  key: 0,
  class: "dt-card-title"
};
const _hoisted_12 = {
  key: 1,
  class: "dt-card-subtitle"
};
const _hoisted_13 = {
  key: 2,
  class: "dt-card-content"
};
const _hoisted_14 = {
  key: 3,
  class: "dt-card-interactions"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.type !== undefined)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: normalizeClass(`dt-card-content type-${this.type}`)
        }, [
          createElementVNode("div", _hoisted_2, [
            (_ctx.$slots.header)
              ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  renderSlot(_ctx.$slots, "header"),
                  (_ctx.$slots.interactions)
                    ? (openBlock(), createElementBlock("div", _hoisted_4, [
                        createElementVNode("span", null, [
                          renderSlot(_ctx.$slots, "interactions")
                        ])
                      ]))
                    : createCommentVNode("v-if", true)
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.content)
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  (_ctx.$slots.title)
                    ? (openBlock(), createElementBlock("div", _hoisted_6, [
                        createElementVNode("h3", null, [
                          renderSlot(_ctx.$slots, "title")
                        ])
                      ]))
                    : createCommentVNode("v-if", true),
                  createElementVNode("p", null, [
                    renderSlot(_ctx.$slots, "content")
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */)
      ]))
    : (openBlock(), createElementBlock("div", _hoisted_7, [
        createElementVNode("div", _hoisted_8, [
          (_ctx.$slots.header)
            ? (openBlock(), createElementBlock("div", _hoisted_9, [
                renderSlot(_ctx.$slots, "header")
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_10, [
            (_ctx.$slots.title)
              ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  renderSlot(_ctx.$slots, "title")
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.subtitle)
              ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  renderSlot(_ctx.$slots, "subtitle")
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.content)
              ? (openBlock(), createElementBlock("div", _hoisted_13, [
                  renderSlot(_ctx.$slots, "content")
                ]))
              : createCommentVNode("v-if", true),
            (_ctx.$slots.interactions)
              ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  renderSlot(_ctx.$slots, "interactions")
                ]))
              : createCommentVNode("v-if", true)
          ])
        ])
      ]))
}

script.render = render;
script.__file = "src/components/dtcard/DtCard.vue";

export { script as default };
