'use strict';

var vue = require('vue');

var script = {
  name: "DtCard",
};

const _hoisted_1 = { class: "dt-simple-card dt-component" };
const _hoisted_2 = {
  key: 0,
  class: "dt-simple-card-header"
};
const _hoisted_3 = { class: "dt-simple-card-body" };
const _hoisted_4 = {
  key: 0,
  class: "dt-simple-card-title"
};
const _hoisted_5 = {
  key: 1,
  class: "dt-simple-card-subtitle"
};
const _hoisted_6 = { class: "dt-simple-card-content" };
const _hoisted_7 = {
  key: 2,
  class: "dt-simple-card-footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.$slots.header)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.renderSlot(_ctx.$slots, "header")
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_3, [
      (_ctx.$slots.title)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
            vue.renderSlot(_ctx.$slots, "title")
          ]))
        : vue.createCommentVNode("v-if", true),
      (_ctx.$slots.subtitle)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
            vue.renderSlot(_ctx.$slots, "subtitle")
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", _hoisted_6, [
        vue.renderSlot(_ctx.$slots, "content")
      ]),
      (_ctx.$slots.footer)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
            vue.renderSlot(_ctx.$slots, "footer")
          ]))
        : vue.createCommentVNode("v-if", true)
    ])
  ]))
}

script.render = render;
script.__file = "src/components/dtcard/DtCard.vue";

module.exports = script;
