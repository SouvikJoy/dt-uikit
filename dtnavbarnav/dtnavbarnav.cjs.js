'use strict';

var vue = require('vue');

const MAX_UID = 1000000;

const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

const stripNameRegex = /\..*/;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
};
const nativeEvents = [
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll",
];

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === "string";
  const originalHandler = delegation ? delegationFn : handler;

  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  let typeEvent = originalTypeEvent.replace(stripNameRegex, "");
  const custom = customEvents[typeEvent];

  if (custom) {
    typeEvent = custom;
  }

  const isNative = nativeEvents.indexOf(typeEvent) > -1;

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn) {
  if (typeof originalTypeEvent !== "string" || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(
    originalTypeEvent,
    handler,
    delegationFn
  );
  element.addEventListener(typeEvent, originalHandler, delegation);
}

function removeHandler(element, typeEvent, handler, delegationSelector) {
  element.removeEventListener(typeEvent, handler, !!delegationSelector);
}

const on = function (element, event, handler, delegationFn) {
  addHandler(element, event, handler, delegationFn);
};

const off = function (element, event, handler, delegationFn) {
  if (typeof event !== "string" || !element) {
    return;
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(
    event,
    handler,
    delegationFn
  );

  removeHandler(
    element,
    typeEvent,
    originalHandler,
    delegation ? handler : null
  );
};

var script$1 = {
  name: "DtCollapse",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    modelValue: Boolean,
    id: String,
    collapseClass: String,
    duration: {
      type: Number,
      default: 300,
    },
    sidenav: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const collapse = vue.ref(null);

    const className = vue.computed(() => {
      return [
        collapseClass.value,
        props.collapseClass,
        navbarFlexWrapValue.value ? "navbar-collapse" : "",
        showClass.value,
      ];
    });

    const collapseClass = vue.computed(() => {
      return props.sidenav
        ? "sidenav-collapse"
        : isActive.value
        ? "collapse"
        : null;
    });

    const accordionState = vue.inject("accordionState", null);
    const incrementAccordionItemsCount = vue.inject(
      "incrementAccordionItemsCount",
      false
    );
    const setAccordionActiveItem = vue.inject("setAccordionActiveItem", false);
    const index = vue.ref(null);

    const manageAccordion = () => {
      if (index.value !== null && isActive.value) {
        setAccordionActiveItem(index.value);
      }
    };

    vue.watchEffect(
      () => {
        if (accordionState) {
          if (accordionState.active !== index.value) {
            emit("update:modelValue", false);
          }
        }
      },
      { flush: "post" }
    );

    vue.onMounted(() => {
      if (isActive.value) {
        collapse.value.style.height = collapse.value.scrollHeight + "px";
      }

      if (accordionState) {
        index.value = incrementAccordionItemsCount();

        if (isActive.value) {
          setAccordionActiveItem(index.value);
        }
      }
    });

    const isActive = vue.ref(props.modelValue);
    vue.watchEffect(() => {
      isActive.value = props.modelValue;
      if (accordionState) {
        manageAccordion();
      }
    });

    const openCollapse = () => {
      emit("update:modelValue", true);
    };

    vue.provide("openCollapse", openCollapse);

    const navbarFlexWrapValue = vue.inject("navbarFlexWrapValue", false);

    const showClass = vue.computed(() => {
      if (
        !navbarFlexWrapValue ||
        (navbarFlexWrapValue.value === "wrap" && isActive.value)
      ) {
        return "show";
      } else if (navbarFlexWrapValue === "nowrap" && isActive.value) {
        return false;
      }

      return false;
    });

    const checkWrapCollapseValue = (cur, prev) => {
      if (prev === "null" && props.modelValue) {
        // open on first render when collapsed props
        isActive.value = true;
      } else if (prev === "null" && !props.modelValue) {
        // close on first render when no collapsed props
        isActive.value = false;
      } else if (prev === "nowrap") {
        // always close when resizing down from full navbar
        isActive.value = false;
      }
    };

    vue.watch(
      () => navbarFlexWrapValue.value,
      (cur, prev) => {
        if (cur === "nowrap") {
          isActive.value = true;
        } else if (cur === "wrap") {
          checkWrapCollapseValue(cur, prev);
        }
        emit("update:modelValue", isActive.value);
      },
      { immediate: true }
    );

    const uid = vue.computed(() => {
      return props.id ? props.id : getUID("collapsibleContent-");
    });

    const beforeEnter = (el) => {
      el.style.height = "0";
    };
    const enter = (el) => {
      el.style.height = `${getContentHeight()}px`;
    };

    const afterEnter = (el) => {
      if (!el.classList.contains("show")) {
        el.classList.add("show");
      }
    };

    const beforeLeave = (el) => {
      if (!el.style.height) {
        el.style.height = `${el.offsetHeight}px`;
      }
    };
    const leave = (el) => {
      el.style.height = "0";
    };

    const afterLeave = (el) => {
      el.classList.add("collapse");
    };

    const previousWindowWidth = vue.ref(null);
    const isThrottled = vue.ref(false);

    const getContentHeight = () => {
      const contentNodes = [
        ...document.getElementById(uid.value).childNodes,
      ].filter((el) => el.textContent.trim() != "");
      return contentNodes.reduce((acc, cur) => {
        return acc + nodeOuterHeight(cur);
      }, 0);
    };

    const nodeOuterHeight = (node) => {
      const height = node.offsetHeight;

      if (!height) {
        // if there is no height it means this node is an inline node without any tag, eg: text node
        if (document.createRange) {
          const range = document.createRange();
          range.selectNodeContents(node);
          if (range.getBoundingClientRect) {
            const rect = range.getBoundingClientRect();
            if (rect) {
              return rect.bottom - rect.top;
            }
          }
        }
        return;
      }

      const style = window.getComputedStyle(node);

      return ["top", "bottom"]
        .map((side) => parseInt(style[`margin-${side}`]))
        .reduce((accHeight, margin) => accHeight + margin, height);
    };

    const handleResize = () => {
      if (!isActive.value || isThrottled.value) return;

      isThrottled.value = true;

      const windowWidth = window.innerWidth;
      const contentHeight = getContentHeight();

      collapse.value.style.height = `${contentHeight}px`;

      previousWindowWidth.value = windowWidth;
      setTimeout(() => {
        isThrottled.value = false;
      }, 100);
    };

    vue.onMounted(() => {
      previousWindowWidth.value = window.innerWidth;
      on(window, "resize", handleResize);
    });

    vue.onUnmounted(() => {
      off(window, "resize", handleResize);
    });

    return {
      collapse,
      className,
      isActive,
      uid,
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
      props,
    };
  },
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Transition, {
    onBeforeEnter: $setup.beforeEnter,
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onLeave: $setup.leave,
    onAfterLeave: $setup.afterLeave,
    "enter-active-class": "collapsing",
    "leave-active-class": "collapsing show",
    duration: $props.duration
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
        class: vue.normalizeClass($setup.className),
        id: $setup.uid,
        ref: "collapse"
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["class", "id"])), [
        [vue.vShow, $setup.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave", "duration"]))
}

script$1.render = render$1;
script$1.__file = "src/components/dtcollapse/DtCollapse.vue";

var script = {
  name: "DtNavbarNav",
  components: { dtCollapse: script$1 },
  props: {
    tag: {
      type: String,
      default: "ul",
    },
    right: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    justifyAround: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
    },
    nav: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = vue.computed(() => {
      return [
        props.nav ? "nav" : "navbar-nav",
        props.right
          ? "ms-auto"
          : props.center
          ? "justify-content-center w-100"
          : props.vertical
          ? "flex-column"
          : props.justifyAround
          ? "justify-content-around w-100"
          : "me-auto",
        props.class && `${props.class}`,
      ];
    });

    return {
      props,
      className,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtnavbarnav/DtNavbarNav.vue";

module.exports = script;
