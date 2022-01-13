import { ref, computed, watchEffect, provide, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, inject, onMounted, watch, onUnmounted, Transition, withDirectives, vShow, resolveComponent, createElementVNode, toDisplayString, createVNode, createElementBlock, createCommentVNode, reactive } from 'vue';

var script$d = {
  name: "DtAccordion",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    modelValue: String,
    stayOpen: Boolean,
    flush: Boolean,
    classes: String,
  },
  setup(props, { emit }) {
    const accordionRef = ref(null);
    const className = computed(() => {
      return ["accordion", props.flush && "accordion-flush", props.classes];
    });

    const activeItem = ref(props.modelValue);
    const setActiveItem = (item) => {
      activeItem.value = item;
      emit("update:modelValue", item);
    };

    watchEffect(() => (activeItem.value = props.modelValue));

    provide("activeItem", activeItem);
    provide("stayOpen", props.stayOpen);
    provide("setActiveItem", setActiveItem);

    return {
      accordionRef,
      setActiveItem,
      className,
    };
  },
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    ref: "accordionRef"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$d.render = render$d;
script$d.__file = "src/components/dtaccordion/DtAccordion.vue";

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

var script$c = {
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

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
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

script$c.render = render$c;
script$c.__file = "src/components/dtcollapse/DtCollapse.vue";

var script$b = {
  name: "DtAccordionTab",
  components: {
    DtCollapse: script$c,
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

const _hoisted_1$3 = ["aria-controls"];

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_DtCollapse = resolveComponent("DtCollapse");

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
        }, toDisplayString($props.headerTitle), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$3)
      ], 2 /* CLASS */),
      createVNode(_component_DtCollapse, {
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

script$b.render = render$b;
script$b.__file = "src/components/dtaccordiontab/DtAccordionTab.vue";

var script$a = {
  name: "DtAnimatedCard",
  props: {
    type: String,
  },
};

const _hoisted_1$2 = { class: "dt-card" };
const _hoisted_2$1 = {
  key: 0,
  class: "dt-card__img"
};
const _hoisted_3$1 = {
  key: 0,
  class: "dt-card__interactions"
};
const _hoisted_4$1 = {
  key: 1,
  class: "dt-card__text"
};
const _hoisted_5$1 = {
  key: 0,
  class: "dt-card__title"
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(`dt-card-content type-${this.type}`)
  }, [
    createElementVNode("div", _hoisted_1$2, [
      (_ctx.$slots.img)
        ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            renderSlot(_ctx.$slots, "img"),
            (_ctx.$slots.interactions)
              ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
                  createElementVNode("span", null, [
                    renderSlot(_ctx.$slots, "interactions")
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ]))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.text)
        ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
            (_ctx.$slots.title)
              ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
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

script$a.render = render$a;
script$a.__file = "src/components/dtanimatedcard/DtAnimatedCard.vue";

var script$9 = {
  name: "DtButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "button",
    },
    role: {
      type: String,
      default: "button",
    },
    block: {
      type: Boolean,
      default: false,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "btn-secondary",
    },
    size: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    floating: {
      type: Boolean,
      default: false,
    },
    toggler: {
      type: Boolean,
      default: false,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    picker: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:toggle"],
  setup(props, { emit }) {
    const toggle = ref(props.toggle);
    const className = computed(() => {
      return [
        !props.picker && "btn",
        props.variant && `btn-${props.variant}`,
        props.size && `btn-${props.size}`,
        props.rounded && `btn-rounded`,
        props.floating && `btn-floating`,
        props.block && `btn-block`,
        props.pill && `rounded-pill`,
        toggle.value && "active",
      ];
    });

    function handleClick() {
      if (props.toggler) {
        toggle.value = !toggle.value;
        emit("update:toggle", toggle.value);
      }
    }

    return {
      className,
      props,
      handleClick,
    };
  },
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    type: $props.type,
    role: $props.role,
    class: normalizeClass($setup.className),
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["type", "role", "class", "onClick"]))
}

script$9.render = render$9;
script$9.__file = "src/components/dtbutton/DtButton.vue";

var script$8 = {
  name: "DtCard",
};

const _hoisted_1$1 = { class: "dt-simple-card dt-component" };
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

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
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

script$8.render = render$8;
script$8.__file = "src/components/dtcard/DtCard.vue";

var script$7 = {
  name: "dtContainer",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    sm: {
      type: Boolean,
      default: false,
    },
    md: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: Boolean,
      default: false,
    },
    xl: {
      type: Boolean,
      default: false,
    },
    xxl: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.fluid ? "container-fluid" : "",
        props.sm ? "container-sm" : "",
        props.md ? "container-md" : "",
        props.lg ? "container-lg" : "",
        props.xl ? "container-xl" : "",
        props.xxl ? "container-xxl" : "",
        !props.fluid && !props.sm && !props.md && !props.xl && !props.xxl
          ? "container"
          : "",
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$7.render = render$7;
script$7.__file = "src/components/dtcontainer/DtContainer.vue";

var script$6 = {
  name: "dtColumn",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    col: {
      type: String,
    },
    sm: {
      type: String,
    },
    md: {
      type: String,
    },
    lg: {
      type: String,
    },
    xl: {
      type: String,
    },
    offset: {
      type: String,
    },
    offsetSm: {
      type: String,
    },
    offsetMd: {
      type: String,
    },
    offsetLg: {
      type: String,
    },
    offsetXl: {
      type: String,
    },
    auto: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.col ? "col-" + props.col : "",
        props.sm ? "col-sm-" + props.sm : "",
        props.md ? "col-md-" + props.md : "",
        props.lg ? "col-lg-" + props.lg : "",
        props.xl ? "col-xl-" + props.xl : "",
        !props.col && !props.sm && !props.md && !props.lg && !props.xl
          ? "col"
          : "",
        props.offset ? "offset-" + props.offset : "",
        props.offsetSm ? "offset-sm-" + props.offsetSm : "",
        props.offsetMd ? "offset-md-" + props.offsetMd : "",
        props.offsetXl ? "offset-lg" + props.offsetXl : "",
        props.auto ? "col-auto" : "",
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$6.render = render$6;
script$6.__file = "src/components/dtcolumn/DtColumn.vue";

var script$5 = {
  name: "DtIcon",
  props: {
    iconStyle: {
      type: String,
      default: "fas",
    },
    icon: String,
    flag: String,
    size: String,
  },
  setup(props) {
    const className = computed(() => {
      return [
        !props.flag && props.iconStyle,
        props.flag ? `flag flag-${props.flag}` : `fa-${props.icon}`,
        props.size && `fa-${props.size}`,
      ];
    });

    return {
      className,
    };
  },
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass($setup.className)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$5.render = render$5;
script$5.__file = "src/components/dticon/DtIcon.vue";

var script$4 = {
  name: "DtNavbar",
  props: {
    tag: {
      type: String,
      default: "nav",
    },
    bg: {
      type: String,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    double: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: String,
    },
    position: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    scrolling: {
      type: Boolean,
      default: false,
    },
    scrollingOffset: {
      type: Number,
      default: 100,
    },
    center: {
      type: Boolean,
      default: false,
    },
    container: {
      type: [Boolean, String],
      default: false,
    },
    classContainer: {
      type: String,
    },
    classNavbar: String,
  },
  setup(props) {
    const navClass = computed(() => {
      return [
        "navbar",
        props.dark && "navbar-dark",
        props.light && "navbar-light",
        props.bg && !props.transparent ? `bg-${props.bg}` : "",
        props.expand
          ? props.expand === "small" || props.expand === "sm"
            ? "navbar-expand-sm"
            : props.expand === "medium" || props.expand === "md"
            ? "navbar-expand-md"
            : props.expand === "large" || props.expand === "lg"
            ? "navbar-expand-lg"
            : "navbar-expand-xl"
          : "",
        props.position === "top"
          ? "fixed-top"
          : props.position === "bottom"
          ? "fixed-bottom"
          : props.position === "sticky"
          ? "sticky-top"
          : "",
        props.scrolling && scrollingClass.value,
        props.double && "double-nav",
        props.center && "justify-content-center",
        props.classNavbar,
      ];
    });

    const containerClass = computed(() => {
      if (!props.container) {
        return false;
      }
      return [
        props.container !== true
          ? `container-${props.container}`
          : "container-fluid",
        props.classContainer && props.classContainer,
      ];
    });

    const scrollingClass = ref("navbar-scroll");

    const handleScroll = () => {
      if (window.pageYOffset > props.scrollingOffset) {
        scrollingClass.value = "navbar-scroll navbar-scrolled";
      } else {
        scrollingClass.value = "navbar-scroll";
      }
    };

    const navbar = ref(null);
    const navbarFlexWrapValue = ref("nowrap");
    provide("navbarFlexWrapValue", navbarFlexWrapValue);

    const handleResize = () => {
      if (!navbar.value) return;

      const wrap = getComputedStyle(navbar.value).flexWrap;

      if (wrap === "nowrap") {
        navbarFlexWrapValue.value = "nowrap";
      } else if (wrap === "wrap") {
        navbarFlexWrapValue.value = "wrap";
      }
    };

    onMounted(() => {
      if (
        getComputedStyle(navbar.value) &&
        getComputedStyle(navbar.value).flexWrap === "wrap"
      ) {
        navbarFlexWrapValue.value = "wrap";
      } else {
        navbarFlexWrapValue.value = "nowrap";
      }
      window.addEventListener("resize", () => handleResize());

      if (props.scrolling) {
        window.addEventListener("scroll", handleScroll);
      }
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    return {
      navbar,
      navClass,
      containerClass,
      props,
    };
  },
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.navClass),
    role: "navigation",
    ref: "navbar"
  }, {
    default: withCtx(() => [
      ($props.container)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass($setup.containerClass)
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true),
      (!$props.container)
        ? renderSlot(_ctx.$slots, "default", { key: 1 })
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$4.render = render$4;
script$4.__file = "src/components/dtnavbar/DtNavbar.vue";

var script$3 = {
  name: "DtNavbarBrand",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props, { attrs }) {
    const isLink = computed(() => {
      return attrs.href ? "a" : props.tag;
    });

    return {
      isLink,
      props,
    };
  },
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script$3.render = render$3;
script$3.__file = "src/components/dtnavbarbrand/DtNavbarBrand.vue";

var script$2 = {
  name: "DtNavbarNav",
  components: { dtCollapse: script$c },
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
    const className = computed(() => {
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

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$2.render = render$2;
script$2.__file = "src/components/dtnavbarnav/DtNavbarNav.vue";

var script$1 = {
  name: "DtNavbarItem",
  props: {
    tag: {
      type: String,
      default: "li",
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
    },
    exact: {
      type: Boolean,
      default: false,
    },
    newTab: {
      type: Boolean,
      default: false,
    },
    to: [Object, String],
    href: {
      type: String,
    },
    linkClass: {
      type: String,
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["nav-item", !props.to && !props.href && props.active && "active"];
    });

    const linkClassName = computed(() => {
      return [
        "nav-link",
        props.disabled && "disabled",
        props.active && "active",
        props.linkClass,
      ];
    });
    const tab = computed(() => {
      if (props.newTab) {
        return "_blank";
      }

      return false;
    });

    return {
      props,
      className,
      linkClassName,
      tab,
    };
  },
};

const _hoisted_1 = ["href", "target"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createBlock(resolveDynamicComponent($setup.props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      ($props.to)
        ? (openBlock(), createBlock(_component_router_link, {
            key: 0,
            class: normalizeClass($setup.linkClassName),
            exact: $props.exact,
            to: $props.to,
            target: $setup.tab
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class", "exact", "to", "target"]))
        : ($props.href)
          ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: $props.href,
              class: normalizeClass($setup.linkClassName),
              target: $setup.tab
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_1))
          : renderSlot(_ctx.$slots, "default", { key: 2 })
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$1.render = render$1;
script$1.__file = "src/components/dtnavbaritem/DtNavbarItem.vue";

var script = {
  name: "DtNavbarToggler",
  components: {
    dtIcon: script$5,
  },
  props: {
    tag: {
      type: String,
      default: "button",
    },
    target: {
      type: String,
      default: "#navbarSupportedContent",
    },
    togglerClass: {
      type: String,
    },
    togglerIcon: {
      type: String,
      default: "bars",
    },
    togglerSize: {
      type: String,
      default: "1x",
    },
    iconStyle: {
      type: String,
      default: "fas",
    },
  },
  setup(props) {
    const navTogglerClass = computed(() => {
      return ["navbar-toggler", props.togglerClass];
    });

    const isExpanded = ref(false);

    const handleClick = () => {
      isExpanded.value = !isExpanded.value;
    };

    return {
      navTogglerClass,
      handleClick,
      isExpanded,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dt_icon = resolveComponent("dt-icon");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.navTogglerClass),
    type: "button",
    "aria-controls": $props.target,
    "aria-expanded": $setup.isExpanded,
    "aria-label": "Toggle navigation",
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      createVNode(_component_dt_icon, {
        icon: $props.togglerIcon,
        size: $props.togglerSize,
        iconStyle: $props.iconStyle
      }, null, 8 /* PROPS */, ["icon", "size", "iconStyle"])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "aria-controls", "aria-expanded", "onClick"]))
}

script.render = render;
script.__file = "src/components/dtnavbartoggler/DtNavbarToggler.vue";

var DtNavbarPlugin = {
  DtNavbar: script$4,
  DtNavbarBrand: script$3,
  DtNavbarNav: script$2,
  DtNavbarItem: script$1,
  DtNavbarToggler: script,
};

const plugins = [DtNavbarPlugin];

const components = [
  script$d,
  script$b,
  script$a,
  script$9,
  script$8,
  script$7,
  script$6,
  script$c,
  script$5,
  script$4,
  script$3,
  script$2,
  script$1,
  script,
];

const FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter",
};

const defaultOptions = {
  ripple: false,
  inputStyle: "outlined",
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    emptyMessage: "No available options",
  },
  filterMatchModeOptions: {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
    ],
    numeric: [
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    ],
    date: [
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER,
    ],
  },
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  },
};

const DebuggerVueSymbol = Symbol();

function useDebuggerVue() {
  const DebuggerVue = inject(DebuggerVueSymbol);
  if (!DebuggerVue) {
    throw new Error("DebuggerVue is not installed!");
  }

  return DebuggerVue;
}

const install = (app, options) => {
  let configOptions = options
    ? { ...defaultOptions, ...options }
    : { ...defaultOptions };
  const DebuggerVue = {
    config: reactive(configOptions),
  };

  components.forEach((component) => {
    app.component(component.name, component);
  });

  plugins.forEach((plugin) => {
    app.use(plugin.name, plugin);
  });

  app.config.globalProperties.$debuggervue = DebuggerVue;
  app.provide(DebuggerVueSymbol, DebuggerVue);
};

var DebuggerVue = { install };

export { script$d as DtAccordion, script$b as DtAccordionTab, script$a as DtAnimatedCard, script$9 as DtButton, script$8 as DtCard, script$c as DtCollapse, script$6 as DtColumn, script$7 as DtContainer, script$5 as DtIcon, script$4 as DtNavbar, script$3 as DtNavbarBrand, script$1 as DtNavbarItem, script$2 as DtNavbarNav, DtNavbarPlugin, script as DtNavbarToggler, DebuggerVue as default, install, useDebuggerVue };
