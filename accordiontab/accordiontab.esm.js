import { ref, computed, inject, watchEffect, onMounted, provide, watch, onUnmounted, openBlock, createBlock, Transition, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, renderSlot, vShow, resolveComponent, createElementVNode, toDisplayString, createVNode } from 'vue';

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
  name: "Collapse",
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
    const collapse = ref(null);

    const className = computed(() => {
      return [
        collapseClass.value,
        props.collapseClass,
        navbarFlexWrapValue.value ? "navbar-collapse" : "",
        showClass.value,
      ];
    });

    const collapseClass = computed(() => {
      return props.sidenav
        ? "sidenav-collapse"
        : isActive.value
        ? "collapse"
        : null;
    });

    const accordionState = inject("accordionState", null);
    const incrementAccordionItemsCount = inject(
      "incrementAccordionItemsCount",
      false
    );
    const setAccordionActiveItem = inject("setAccordionActiveItem", false);
    const index = ref(null);

    const manageAccordion = () => {
      if (index.value !== null && isActive.value) {
        setAccordionActiveItem(index.value);
      }
    };

    watchEffect(
      () => {
        if (accordionState) {
          if (accordionState.active !== index.value) {
            emit("update:modelValue", false);
          }
        }
      },
      { flush: "post" }
    );

    onMounted(() => {
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

    const isActive = ref(props.modelValue);
    watchEffect(() => {
      isActive.value = props.modelValue;
      if (accordionState) {
        manageAccordion();
      }
    });

    const openCollapse = () => {
      emit("update:modelValue", true);
    };

    provide("openCollapse", openCollapse);

    const navbarFlexWrapValue = inject("navbarFlexWrapValue", false);

    const showClass = computed(() => {
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

    watch(
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

    const uid = computed(() => {
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

    const previousWindowWidth = ref(null);
    const isThrottled = ref(false);

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

    onMounted(() => {
      previousWindowWidth.value = window.innerWidth;
      on(window, "resize", handleResize);
    });

    onUnmounted(() => {
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
  return (openBlock(), createBlock(Transition, {
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
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        class: normalizeClass($setup.className),
        id: $setup.uid,
        ref: "collapse"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["class", "id"])), [
        [vShow, $setup.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave", "duration"]))
}

script$1.render = render$1;
script$1.__file = "src/components/collapse/Collapse.vue";

var script = {
  name: "AccordionTab",
  components: {
    Collapse: script$1,
  },
  props: {
    tag: {
      type: String,
      default: "div",
    },
    collapseId: {
      type: String,
      required: true,
    },
    headerTitle: String,
    headerClasses: String,
    bodyClasses: String,
    itemClasses: String,
  },
  setup(props) {
    const itemRef = ref(null);
    const itemClassName = computed(() => {
      return ["accordion-item", props.itemClasses];
    });
    const headerClassName = computed(() => {
      return ["accordion-header", props.headerClasses];
    });
    const bodyClassName = computed(() => {
      return ["accordion-body", props.bodyClasses];
    });
    const buttonClassName = computed(() => {
      return ["accordion-button", !isActive.value && "collapsed"];
    });

    const setActiveItem = inject("setActiveItem", null);
    const activeItem = inject("activeItem", null);
    const stayOpen = inject("stayOpen", false);

    const isActive = ref(activeItem.value === props.collapseId);

    watchEffect(() => {
      if (stayOpen) {
        return;
      }
      isActive.value = activeItem.value === props.collapseId;
    });

    const toggleAccordion = () => {
      if (stayOpen) {
        isActive.value = !isActive.value;
      } else {
        isActive.value ? setActiveItem("") : setActiveItem(props.collapseId);
      }
    };

    return {
      itemRef,
      itemClassName,
      headerClassName,
      bodyClassName,
      buttonClassName,
      toggleAccordion,
      isActive,
    };
  },
};

const _hoisted_1 = ["aria-controls"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Collapse = resolveComponent("Collapse");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.itemClassName),
    ref: "itemRef"
  }, {
    default: withCtx(() => [
      createElementVNode("h2", {
        class: normalizeClass($setup.headerClassName)
      }, [
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = () => $setup.toggleAccordion($props.collapseId)),
          class: normalizeClass($setup.buttonClassName),
          "aria-expanded": "true",
          "aria-controls": $props.collapseId
        }, toDisplayString($props.headerTitle), 11 /* TEXT, CLASS, PROPS */, _hoisted_1)
      ], 2 /* CLASS */),
      createVNode(_component_Collapse, {
        id: $props.collapseId,
        modelValue: $setup.isActive,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($setup.isActive) = $event))
      }, {
        default: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass($setup.bodyClassName)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */)
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["id", "modelValue"])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/accordiontab/AccordionTab.vue";

export { script as default };
