'use strict';

var vue = require('vue');

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
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(`dt-card-content type-${this.type}`)
        }, [
          vue.createElementVNode("div", _hoisted_2, [
            (_ctx.$slots.header)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                  vue.renderSlot(_ctx.$slots, "header"),
                  (_ctx.$slots.interactions)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
                        vue.createElementVNode("span", null, [
                          vue.renderSlot(_ctx.$slots, "interactions")
                        ])
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.$slots.content)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                  (_ctx.$slots.title)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                        vue.createElementVNode("h3", null, [
                          vue.renderSlot(_ctx.$slots, "title")
                        ])
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("p", null, [
                    vue.renderSlot(_ctx.$slots, "content")
                  ])
                ]))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */)
      ]))
    : (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
        vue.createElementVNode("div", _hoisted_8, [
          (_ctx.$slots.header)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
                vue.renderSlot(_ctx.$slots, "header")
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_10, [
            (_ctx.$slots.title)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [
                  vue.renderSlot(_ctx.$slots, "title")
                ]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.$slots.subtitle)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [
                  vue.renderSlot(_ctx.$slots, "subtitle")
                ]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.$slots.content)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, [
                  vue.renderSlot(_ctx.$slots, "content")
                ]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.$slots.interactions)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14, [
                  vue.renderSlot(_ctx.$slots, "interactions")
                ]))
              : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]))
}

script.render = render;
script.__file = "src/components/dtcard/DtCard.vue";

module.exports = script;
