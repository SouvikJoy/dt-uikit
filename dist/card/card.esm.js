import { openBlock, createElementBlock, renderSlot, createCommentVNode, createElementVNode } from 'vue';

var script = {
  name: "Card",
};

const _hoisted_1 = { class: "p-card p-component" };
const _hoisted_2 = {
  key: 0,
  class: "p-card-header"
};
const _hoisted_3 = { class: "p-card-body" };
const _hoisted_4 = {
  key: 0,
  class: "p-card-title"
};
const _hoisted_5 = {
  key: 1,
  class: "p-card-subtitle"
};
const _hoisted_6 = { class: "p-card-content" };
const _hoisted_7 = {
  key: 2,
  class: "p-card-footer"
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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-card-header img {\n  width: 100%;\n}\n.p-card {\n  background: #071426;\n  color: rgba(255, 255, 255, 0.87);\n  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),\n    0 1px 3px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 6px;\n}\n.p-card .p-card-body {\n  padding: 1.25rem;\n}\n.p-card .p-card-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n.p-card .p-card-subtitle {\n  font-weight: 400;\n  margin-bottom: 0.5rem;\n  color: rgba(255, 255, 255, 0.6);\n}\n.p-card .p-card-content {\n  padding: 1.25rem 0;\n}\n.p-card .p-card-footer {\n  padding: 1.25rem 0 0 0;\n}\n";
styleInject(css_248z);

script.render = render;
script.__file = "src/components/card/Card.vue";

export { script as default };
