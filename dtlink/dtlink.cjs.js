'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const BLINK_PROPS = {
  active: { type: Boolean, default: false },
  activeClass: { type: String, default: "router-link-active" },
  append: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  event: { type: [String, Array], default: "click" },
  exact: { type: Boolean, default: false },
  exactActiveClass: { type: String, default: "router-link-exact-active" },
  href: { type: String },
  rel: { type: String, default: null },
  replace: { type: Boolean, default: false },
  routerComponentName: { type: String, default: "router-link" },
  routerTag: { type: String, default: "a" },
  target: { type: String, default: "_self" },
  to: { type: [String, Object], default: null },
};

var script = {
  name: "DtLink",
  props: BLINK_PROPS,
  emits: ["click"],
  setup(props, { emit, attrs }) {
    const instance = vue.getCurrentInstance();
    const link = vue.ref(null);

    const tag = vue.computed(() => {
      const routerName = props.routerComponentName
        .split("-")
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join("");
      const hasRouter =
        instance?.appContext.app.component(routerName) !== undefined;
      if (!hasRouter || props.disabled || !props.to) {
        return "a";
      }
      return props.routerComponentName;
    });

    const computedHref = vue.computed(() => {
      const toFallback = "#";
      if (props.href) return props.href;

      if (typeof props.to === "string") return props.to || toFallback;

      const to = props.to;

      if (
        Object.prototype.toString.call(to) === "[object Object]" &&
        (to.path || to.query || to.hash)
      ) {
        const path = to.path || "";
        const query = to.query
          ? `?${Object.keys(to.query)
              .map((e) => `${e}=${to.query[e]}`)
              .join("=")}`
          : "";
        const hash =
          !to.hash || to.hash.charAt(0) === "#" ? to.hash || "" : `#${to.hash}`;
        return `${path}${query}${hash}` || toFallback;
      }

      return toFallback;
    });

    const focus = () => {
      if (!props.disabled) link.value.focus();
    };

    const blur = () => {
      if (!props.disabled) {
        link.value.blur();
      }
    };

    const clicked = function (e) {
      if (props.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      emit("click", e);
    };

    const routerAttr = vue.computed(() => ({
      to: props.to,
      href: computedHref.value,
      target: props.target,
      rel:
        props.target === "_blank" && props.rel === null
          ? "noopener"
          : props.rel || null,
      tabindex: props.disabled
        ? "-1"
        : typeof attrs.tabindex === "undefined"
        ? null
        : attrs.tabindex,
      "aria-disabled": props.disabled ? "true" : null,
    }));

    return {
      tag,
      routerAttr,
      link,
      focus,
      blur,
      clicked,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.tag === 'router-link')
    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.tag), vue.mergeProps({ key: 0 }, $setup.routerAttr, { custom: "" }), {
        default: vue.withCtx(({ href, navigate, isActive, isExactActive }) => [
          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.routerTag), vue.mergeProps({
            ref: "link",
            href: href,
            class: [isActive && _ctx.activeClass, isExactActive && _ctx.exactActiveClass]
          }, _ctx.$attrs, { onClick: navigate }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 2 /* DYNAMIC */
          }, 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["href", "class", "onClick"]))
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */))
    : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.tag), vue.mergeProps({
        key: 1,
        ref: "link",
        class: { active: _ctx.active, disabled: _ctx.disabled }
      }, $setup.routerAttr, { onClick: $setup.clicked }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["class", "onClick"]))
}

script.render = render;
script.__file = "src/components/dtlink/DtLink.vue";

exports.BLINK_PROPS = BLINK_PROPS;
exports["default"] = script;
