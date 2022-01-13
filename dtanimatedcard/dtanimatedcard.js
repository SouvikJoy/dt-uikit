this.debuggervue = this.debuggervue || {};
this.debuggervue.dtanimatedcard = (function (vue) {
  'use strict';

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
    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(`dt-card-content type-${this.type}`)
    }, [
      vue.createElementVNode("div", _hoisted_1, [
        (_ctx.$slots.img)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "img"),
              (_ctx.$slots.interactions)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                    vue.createElementVNode("span", null, [
                      vue.renderSlot(_ctx.$slots, "interactions")
                    ])
                  ]))
                : vue.createCommentVNode("v-if", true)
            ]))
          : vue.createCommentVNode("v-if", true),
        (_ctx.$slots.text)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
              (_ctx.$slots.title)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                    vue.createElementVNode("h3", null, [
                      vue.renderSlot(_ctx.$slots, "title")
                    ])
                  ]))
                : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("p", null, [
                vue.renderSlot(_ctx.$slots, "text")
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ], 2 /* CLASS */))
  }

  script.render = render;
  script.__file = "src/components/dtanimatedcard/DtAnimatedCard.vue";

  return script;

})(Vue);
