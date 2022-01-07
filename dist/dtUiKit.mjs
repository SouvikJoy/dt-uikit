import { ref, computed, watchEffect, provide, openBlock, createBlock, resolveDynamicComponent, normalizeClass, withCtx, renderSlot, inject, onMounted, watch, onUnmounted, Transition, withDirectives, vShow, resolveComponent, createElementVNode, toDisplayString, createVNode, createElementBlock, createCommentVNode, resolveDirective, onUpdated, Fragment, mergeProps, normalizeStyle, KeepAlive, withModifiers, withKeys, renderList, onBeforeUnmount } from 'vue';

var script$C = {
  name: "dtAccordion",
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

function render$C(_ctx, _cache, $props, $setup, $data, $options) {
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

script$C.render = render$C;
script$C.__file = "src/components/dtAccordion.vue";

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

var script$B = {
  name: "dtCollapse",
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

function render$B(_ctx, _cache, $props, $setup, $data, $options) {
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

script$B.render = render$B;
script$B.__file = "src/components/dtCollapse.vue";

var script$A = {
  name: "dtAccordionItem",
  components: {
    dtCollapse: script$B,
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

const _hoisted_1$6 = ["aria-controls"];

function render$A(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dtCollapse = resolveComponent("dtCollapse");

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
        }, toDisplayString($props.headerTitle), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$6)
      ], 2 /* CLASS */),
      createVNode(_component_dtCollapse, {
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

script$A.render = render$A;
script$A.__file = "src/components/dtAccordionItem.vue";

var script$z = {
  name: "dtAnimatedCard",
  props: {
    type: String,
  },
};

const _hoisted_1$5 = { class: "dt-card" };
const _hoisted_2$4 = {
  key: 0,
  class: "dt-card__img"
};
const _hoisted_3$3 = {
  key: 0,
  class: "dt-card__interactions"
};
const _hoisted_4$3 = {
  key: 1,
  class: "dt-card__text"
};
const _hoisted_5$3 = {
  key: 0,
  class: "dt-card__title"
};

function render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(`dt-card-content type-${this.type}`)
  }, [
    createElementVNode("div", _hoisted_1$5, [
      (_ctx.$slots.img)
        ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
            renderSlot(_ctx.$slots, "img"),
            (_ctx.$slots.interactions)
              ? (openBlock(), createElementBlock("div", _hoisted_3$3, [
                  createElementVNode("span", null, [
                    renderSlot(_ctx.$slots, "interactions")
                  ])
                ]))
              : createCommentVNode("v-if", true)
          ]))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.text)
        ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
            (_ctx.$slots.title)
              ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
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

script$z.render = render$z;
script$z.__file = "src/components/dtAnimatedCard.vue";

const bsColors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];
const gradient =
  "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%";
const defaultColor = [0, 0, 0];
const transitionBreakOpacity = 0.5;

const isBSColor = (propColor) => bsColors.includes(propColor.toLowerCase());

const colorToRGB = (color, defaultColor) => {
  const hexToRgb = (color) => {
    const HEX_COLOR_LENGTH = 7;
    const IS_SHORT_HEX = color.length < HEX_COLOR_LENGTH;
    if (IS_SHORT_HEX) {
      color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
    ];
  };

  const namedColorsToRgba = (color) => {
    const tempElem = document.body.appendChild(
      document.createElement("fictum")
    );
    const flag = "rgb(1, 2, 3)";
    tempElem.style.color = flag;

    if (tempElem.style.color !== flag) {
      return defaultColor;
    }
    tempElem.style.color = color;

    if (tempElem.style.color === flag || tempElem.style.color === "") {
      return defaultColor;
    }
    color = getComputedStyle(tempElem).color;
    document.body.removeChild(tempElem);

    return color;
  };

  const rgbaToRgb = (color) => {
    color = color.match(/[.\d]+/g).map((a) => +Number(a));
    color.length = 3;
    return color;
  };

  if (color.toLowerCase() === "transparent") {
    return defaultColor;
  }
  if (color[0] === "#") {
    return hexToRgb(color);
  }
  if (color.indexOf("rgb") === -1) {
    color = namedColorsToRgba(color);
  }
  if (color.indexOf("rgb") === 0) {
    return rgbaToRgb(color);
  }

  return defaultColor;
};

const getDiameter = ({ offsetX, offsetY, height, width }) => {
  const top = offsetY <= height / 2;
  const left = offsetX <= width / 2;
  const pythagorean = (sideA, sideB) => Math.sqrt(sideA ** 2 + sideB ** 2);

  const positionCenter = offsetY === height / 2 && offsetX === width / 2;
  const quadrant = {
    first: top === true && left === false,
    second: top === true && left === true,
    third: top === false && left === true,
    fourth: top === false && left === false,
  };

  const getCorner = {
    topLeft: pythagorean(offsetX, offsetY),
    topRight: pythagorean(width - offsetX, offsetY),
    bottomLeft: pythagorean(offsetX, height - offsetY),
    bottomRight: pythagorean(width - offsetX, height - offsetY),
  };

  let diameter = 0;

  if (positionCenter || quadrant.fourth) {
    diameter = getCorner.topLeft;
  } else if (quadrant.third) {
    diameter = getCorner.topRight;
  } else if (quadrant.second) {
    diameter = getCorner.bottomRight;
  } else if (quadrant.first) {
    diameter = getCorner.bottomLeft;
  }
  return diameter * 2;
};

const setStyles = (el, styles) => {
  for (const property in styles) {
    el.style[property] = styles[property];
  }
};

const getBackgroundImage = (color) => {
  if (color !== "") {
    const rgbValue = colorToRGB(color, defaultColor).join(",");
    const gradientImage = gradient.split("{{color}}").join(`${rgbValue}`);
    return `radial-gradient(circle, ${gradientImage})`;
  }
};

const runRipple = (el, waveConfig, options) => {
  const rippleElement = document.createElement("div");
  rippleElement.classList.add("ripple-wave");

  const diameterConfig = {
    offsetX: options.centered ? waveConfig.height / 2 : waveConfig.left,
    offsetY: options.centered ? waveConfig.width / 2 : waveConfig.top,
    height: waveConfig.height,
    width: waveConfig.width,
  };
  const diameter = getDiameter(diameterConfig);
  const radiusValue = options.radius || diameter / 2;
  const opacity = {
    delay: options.duration * transitionBreakOpacity,
    duration: options.duration - options.duration * transitionBreakOpacity,
  };

  const styles = {
    left: options.centered
      ? `${Math.round(waveConfig.width / 2 - radiusValue)}px`
      : `${Math.round(waveConfig.left - radiusValue)}px`,
    top: options.centered
      ? `${Math.round(waveConfig.height / 2 - radiusValue)}px`
      : `${Math.round(waveConfig.top - radiusValue)}px`,
    height: `${Math.round(options.radius * 2 || diameter)}px`,
    width: `${Math.round(options.radius * 2 || diameter)}px`,
    transitionDelay: `0s, ${opacity.delay}ms`,
    transitionDuration: `${options.duration}ms, ${opacity.duration}ms`,
  };

  if (options.unbound) {
    el.classList.add("ripple-surface-unbound");
  }

  if (isBSColor(options.color)) {
    el.classList.add(`ripple-surface-${options.color}`);
  } else {
    styles.backgroundImage = getBackgroundImage(options.color);
  }

  setStyles(rippleElement, styles);
  el.appendChild(rippleElement);

  setTimeout(() => {
    rippleElement.classList.add("active");
  }, 50);

  setTimeout(() => {
    el.removeChild(rippleElement);
  }, options.duration + 1000);
};

var dtRipple = {
  mounted(el, binding) {
    if (binding.value === false) {
      return;
    }

    const options = {
      centered: (binding.value && binding.value.centered) || false,
      color: (binding.value && binding.value.color) || "",
      duration: (binding.value && binding.value.duration) || 500,
      radius: (binding.value && binding.value.radius) || 0,
      unbound: (binding.value && binding.value.unbound) || false,
    };

    el.classList.add("ripple-surface");
    el.waves = (e) => {
      const waveConfig = {
        top: e.layerY,
        left: e.layerX,
        height: el.offsetHeight,
        width: el.offsetWidth,
      };
      runRipple(el, waveConfig, options);
    };

    el.addEventListener("click", el.waves);
  },

  updated(el) {
    if (!el.classList.contains("ripple-surface")) {
      el.classList.add("ripple-surface");
    }
  },

  unmounted(el) {
    el.removeEventListener("click", el.waves);
  },
};

var script$y = {
  name: "dtButton",
  props: {
    color: String,
    size: String,
    outline: String,
    rounded: Boolean,
    floating: Boolean,
    toggler: Boolean,
    toggle: Boolean,
    role: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "button",
    },
    tag: {
      type: String,
      default: "button",
    },
    block: {
      type: Boolean,
      default: false,
    },
    ripple: {
      type: [Object, Boolean],
      default: (props) =>
        props.outline || props.color === "light" || props.color === "link"
          ? { color: "dark" }
          : true,
    },
    picker: Boolean,
  },
  directives: { dtRipple },
  emits: ["update:toggle"],
  setup(props, { emit }) {
    const toggle = ref(props.toggle);
    const className = computed(() => {
      return [
        !props.picker && "btn",
        props.color && `btn-${props.color}`,
        props.size && `btn-${props.size}`,
        props.outline && `btn-outline-${props.outline}`,
        props.rounded && "btn-rounded",
        props.floating && "btn-floating",
        props.block && "btn-block",
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

function render$y(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_dt_ripple = resolveDirective("dt-ripple");

  return withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    type: $props.type,
    role: $props.role,
    class: normalizeClass($setup.className),
    onClick: $setup.handleClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["type", "role", "class", "onClick"])), [
    [_directive_dt_ripple, $props.ripple]
  ])
}

script$y.render = render$y;
script$y.__file = "src/components/dtButton.vue";

var script$x = {
  name: "dtBadge",
  props: {
    color: String,
    pill: Boolean,
    dot: Boolean,
    notification: Boolean,
    tag: {
      type: String,
      default: "span",
    },
  },
  setup(props, { attrs }) {
    const className = computed(() => {
      return [
        "badge",
        props.color && `bg-${props.color}`,
        props.pill && "rounded-pill",
        props.dot && "badge-dot",
        props.notification && "badge-notification",
      ];
    });

    return {
      className,
      attrs,
      props,
    };
  },
};

function render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$x.render = render$x;
script$x.__file = "src/components/dtBadge.vue";

var script$w = {
  name: "dtButtonGroup",
  props: {
    size: String,
    vertical: Boolean,
    role: {
      type: String,
      default: "group",
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.size && `btn-group-${props.size}`,
        props.vertical ? "btn-group-vertical" : "btn-group",
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render$w(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    role: $props.role
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class", "role"]))
}

script$w.render = render$w;
script$w.__file = "src/components/dtButtonGroup.vue";

var script$v = {
  name: "dtCol",
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

function render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$v.render = render$v;
script$v.__file = "src/components/dtCol.vue";

var script$u = {
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

function render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$u.render = render$u;
script$u.__file = "src/components/dtContainer.vue";

var script$t = {
  name: "dtIcon",
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

function render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("i", {
    class: normalizeClass($setup.className)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$t.render = render$t;
script$t.__file = "src/components/dtIcon.vue";

var dtClickOutside = {
  stopProp(e) {
    e.stopPropagation();
  },

  mounted(el, binding) {
    const handler = (e) => {
      if (!el.contains(e.target) && el !== e.target) {
        binding.value(e);
      }
    };
    el.clickOutside = handler;

    const event = binding.modifiers.mousedown ? "mousedown" : "click";

    document.addEventListener(event, el.clickOutside);
    document.addEventListener("touchstart", el.clickOutside);
  },

  unmounted(el, binding) {
    if (!el.clickOutside) return;

    const event = binding.modifiers.mousedown ? "mousedown" : "click";

    document.removeEventListener(event, el.clickOutside);
    document.removeEventListener("touchstart", el.clickOutside);
    delete el.clickOutside;
  },
};

var script$s = {
  name: "dtInput",
  inheritAttrs: false,
  props: {
    id: String,
    label: String,
    labelClass: String,
    modelValue: [String, Number, Date],
    size: String,
    formOutline: {
      type: Boolean,
      default: true,
    },
    wrapperClass: String,
    inputGroup: {
      type: [Boolean, String],
      default: false,
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    formText: String,
    white: Boolean,
    validationEvent: String,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "div",
    },
    helper: String,
    counter: Boolean,
    maxlength: {
      type: Number,
      default: 0,
    },
  },
  directives: { dtClickOutside },
  emits: ["update:modelValue", "click-outside"],
  setup(props, { attrs, emit }) {
    const inputRef = ref("inputRef");
    const inputValue = ref(props.modelValue);
    const labelRef = ref(null);
    const showPlaceholder = ref(false);
    const notchLeadingWidth = ref(9);
    const notchMiddleWidth = ref(0);
    const uid = props.id || getUID("MDBInput-");

    const wrapperClassName = computed(() => {
      return [
        props.formOutline && "form-outline",
        inputGroupClassName.value,
        props.white && "form-white",
        props.wrapperClass,
      ];
    });
    const inputClassName = computed(() => {
      return [
        "form-control",
        props.size && `form-control-${props.size}`,
        inputValue.value && "active",
        showPlaceholder.value && "placeholder-active",
        isInputValidated.value && isInputValid.value && "is-valid",
        isInputValidated.value && !isInputValid.value && "is-invalid",
      ];
    });
    const labelClassName = computed(() => {
      return ["form-label", props.labelClass];
    });

    const inputGroupClassName = computed(() => {
      if (!props.inputGroup) {
        return;
      }
      return props.inputGroup !== true
        ? `input-group input-group-${props.inputGroup}`
        : "input-group";
    });

    const validationStyle = computed(() => {
      return props.inputGroup && isInputValidated.value
        ? { marginBottom: "1rem" }
        : "";
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? "valid-tooltip" : "valid-feedback";
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? "invalid-tooltip" : "invalid-feedback";
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);
    const defaultValidatorInvalidFeedback = ref("");
    const customInvalidFeedback = computed(() => {
      if (
        isInputValidated.value &&
        !isInputValid.value &&
        props.validationEvent
      ) {
        return defaultValidatorInvalidFeedback.value;
      }
      return props.invalidFeedback;
    });

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      if (!isInputValid.value) {
        defaultValidatorInvalidFeedback.value = e.target.validationMessage;
      }
      isInputValidated.value = true;
    };

    const bindValidationEvents = () => {
      if (props.validationEvent === "submit") return;
      on(inputRef.value, props.validationEvent, handleValidation);
    };

    function calcNotch() {
      if (labelRef.value) {
        notchMiddleWidth.value = labelRef.value.clientWidth * 0.8 + 8;
      }
    }

    function setPlaceholder() {
      if (attrs.placeholder && !labelRef.value) {
        showPlaceholder.value = true;
      } else {
        showPlaceholder.value = false;
      }
    }

    const currentLength = ref(0);

    function handleInput(e) {
      if (props.counter) {
        if (e.target.value.length > props.maxlength) {
          e.target.value = inputValue.value;
          return;
        }

        currentLength.value = e.target.value.length;
      }
      inputValue.value = e.target.value;
      emit("update:modelValue", inputValue.value);
    }

    function clickOutside() {
      emit("click-outside");
    }

    onMounted(() => {
      calcNotch();
      setPlaceholder();

      if (props.validationEvent) {
        bindValidationEvents();
      }
    });

    onUpdated(() => {
      calcNotch();
      setPlaceholder();
    });

    onUnmounted(() => {
      off(inputRef.value, props.validationEvent, handleValidation);
    });

    watchEffect(() => {
      inputValue.value = props.modelValue;
    });

    watch(
      () => props.isValidated,
      (value) => (isInputValidated.value = value)
    );

    watch(
      () => props.isValid,
      (value) => (isInputValid.value = value)
    );

    return {
      inputRef,
      uid,
      inputValue,
      labelRef,
      handleInput,
      wrapperClassName,
      inputClassName,
      labelClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      validationStyle,
      customInvalidFeedback,
      notchLeadingWidth,
      notchMiddleWidth,
      clickOutside,
      props,
      currentLength,
    };
  },
};

const _hoisted_1$4 = ["id", "value"];
const _hoisted_2$3 = ["for"];
const _hoisted_3$2 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_4$2 = {
  key: 3,
  class: "form-helper"
};
const _hoisted_5$2 = { class: "form-counter" };
const _hoisted_6$2 = {
  key: 7,
  class: "form-notch"
};
const _hoisted_7$2 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1 /* HOISTED */);
const _hoisted_8$2 = ["id", "value"];
const _hoisted_9$2 = ["for"];
const _hoisted_10$2 = {
  key: 1,
  class: "form-helper"
};
const _hoisted_11$2 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_12$2 = { class: "form-counter" };
const _hoisted_13$1 = {
  key: 5,
  class: "form-notch"
};
const _hoisted_14 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1 /* HOISTED */);
const _hoisted_15 = {
  key: 9,
  class: "form-text"
};

function render$s(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_dt_click_outside = resolveDirective("dt-click-outside");

  return (openBlock(), createElementBlock(Fragment, null, [
    (!$props.wrap)
      ? withDirectives((openBlock(), createElementBlock("input", mergeProps({
          key: 0,
          class: $setup.inputClassName,
          id: $setup.uid,
          value: $setup.inputValue
        }, _ctx.$attrs, {
          onInput: _cache[0] || (_cache[0] = (...args) => ($setup.handleInput && $setup.handleInput(...args))),
          ref: "inputRef"
        }), null, 16 /* FULL_PROPS */, _hoisted_1$4)), [
          [_directive_dt_click_outside, $setup.clickOutside]
        ])
      : createCommentVNode("v-if", true),
    ($props.label && !$props.wrap)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          ref: "labelRef",
          class: normalizeClass($setup.labelClassName),
          for: $setup.uid
        }, toDisplayString($props.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_2$3))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.helper)
      ? (openBlock(), createElementBlock("div", _hoisted_3$2, toDisplayString($props.helper), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.counter)
      ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", _hoisted_5$2, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxlength), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    (!$props.wrap)
      ? renderSlot(_ctx.$slots, "default", { key: 4 })
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $setup.customInvalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 6,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($setup.customInvalidFeedback), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.formOutline)
      ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
          createElementVNode("div", {
            class: "form-notch-leading",
            style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
          }, null, 4 /* STYLE */),
          createElementVNode("div", {
            class: "form-notch-middle",
            style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
          }, null, 4 /* STYLE */),
          _hoisted_7$2
        ]))
      : createCommentVNode("v-if", true),
    ($props.wrap)
      ? withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 8,
          class: normalizeClass($setup.wrapperClassName),
          style: normalizeStyle($setup.validationStyle)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend"),
            createElementVNode("input", mergeProps({ class: $setup.inputClassName }, _ctx.$attrs, {
              id: $setup.uid,
              value: $setup.inputValue,
              onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput && $setup.handleInput(...args))),
              ref: "inputRef"
            }), null, 16 /* FULL_PROPS */, _hoisted_8$2),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  ref: "labelRef",
                  class: normalizeClass($setup.labelClassName),
                  for: $setup.uid
                }, toDisplayString($props.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_9$2))
              : createCommentVNode("v-if", true),
            ($props.helper)
              ? (openBlock(), createElementBlock("div", _hoisted_10$2, toDisplayString($props.helper), 1 /* TEXT */))
              : createCommentVNode("v-if", true),
            ($props.counter)
              ? (openBlock(), createElementBlock("div", _hoisted_11$2, [
                  createElementVNode("div", _hoisted_12$2, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxlength), 1 /* TEXT */)
                ]))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default"),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true),
            ($setup.customInvalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 4,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($setup.customInvalidFeedback), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true),
            ($props.formOutline)
              ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
                  createElementVNode("div", {
                    class: "form-notch-leading",
                    style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
                  }, null, 4 /* STYLE */),
                  createElementVNode("div", {
                    class: "form-notch-middle",
                    style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
                  }, null, 4 /* STYLE */),
                  _hoisted_14
                ]))
              : createCommentVNode("v-if", true)
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class", "style"])), [
          [_directive_dt_click_outside, $setup.clickOutside]
        ])
      : createCommentVNode("v-if", true),
    ($props.formText)
      ? (openBlock(), createElementBlock("div", _hoisted_15, toDisplayString($props.formText), 1 /* TEXT */))
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

script$s.render = render$s;
script$s.__file = "src/components/dtInput.vue";

var script$r = {
  name: "dtFooter",
  props: {
    tag: {
      type: String,
      default: "footer",
    },
    bg: {
      type: String,
      default: "light",
    },
    text: {
      type: [String, Array],
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.bg && props.bg !== "none" && `bg-${props.bg}`,
        props.text && spreadProps(props.text),
      ];
    });

    const spreadProps = (props) => {
      if (typeof props === "string") {
        return `text-${props}`;
      }
      return props.map((prop) => `text-${prop}`.trim()).join(" ");
    };

    return {
      className,
      props,
    };
  },
};

function render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$r.render = render$r;
script$r.__file = "src/components/dtFooter.vue";

var script$q = {
  name: "dtNavbar",
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

function render$q(_ctx, _cache, $props, $setup, $data, $options) {
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

script$q.render = render$q;
script$q.__file = "src/components/dtNavbar.vue";

var script$p = {
  name: "dtNavbarBrand",
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

function render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script$p.render = render$p;
script$p.__file = "src/components/dtNavbarBrand.vue";

var script$o = {
  name: "dtNavbarNav",
  components: { dtCollapse: script$B },
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

function render$o(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$o.render = render$o;
script$o.__file = "src/components/dtNavbarNav.vue";

var script$n = {
  name: "dtNavbarItem",
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

const _hoisted_1$3 = ["href", "target"];

function render$n(_ctx, _cache, $props, $setup, $data, $options) {
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
            ], 10 /* CLASS, PROPS */, _hoisted_1$3))
          : renderSlot(_ctx.$slots, "default", { key: 2 })
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$n.render = render$n;
script$n.__file = "src/components/dtNavbarItem.vue";

var script$m = {
  name: "dtNavbarToggler",
  components: {
    dtIcon: script$t,
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

function render$m(_ctx, _cache, $props, $setup, $data, $options) {
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

script$m.render = render$m;
script$m.__file = "src/components/dtNavbarToggler.vue";

var script$l = {
  name: "dtRow",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    start: {
      type: Boolean,
      default: false,
    },
    end: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    between: {
      type: Boolean,
      default: false,
    },
    around: {
      type: Boolean,
      default: false,
    },
    cols: {
      type: [String, Array],
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        "row",
        props.cols ? `${spreadProps(props.cols)}` : "",
        props.start && "justify-content-start",
        props.end && "justify-content-end",
        props.center && "justify-content-center",
        props.between && "justify-content-between",
        props.around && "justify-content-around",
      ];
    });

    const spreadProps = (props) => {
      if (typeof props === "string") {
        return `row-cols-${props}`;
      }
      return props.map(() => `row-cols-${props}`.trim()).join(" ");
    };

    return {
      className,
      props,
    };
  },
};

function render$l(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$l.render = render$l;
script$l.__file = "src/components/dtRow.vue";

var script$k = {
  name: "dtTextarea",
  inheritAttrs: false,
  props: {
    id: String,
    rows: {
      type: [String, Number],
      default: 4,
    },
    label: String,
    modelValue: [String, Number],
    size: String,
    formOutline: {
      type: Boolean,
      default: true,
    },
    wrapperClass: String,
    inputGroup: {
      type: [Boolean, String],
      default: false,
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    formText: String,
    white: Boolean,
    validationEvent: String,
    isValidated: Boolean,
    isValid: Boolean,
    validFeedback: String,
    invalidFeedback: String,
    tooltipFeedback: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "div",
    },
    helper: String,
    counter: Boolean,
    maxLength: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const textareaRef = ref("textareaRef");
    const textareaValue = ref(props.modelValue);
    const labelRef = ref(null);
    const showPlaceholder = ref(false);
    const notchLeadingWidth = ref(9);
    const notchMiddleWidth = ref(0);
    const uid = props.id || getUID("MDBTextarea-");

    const wrapperClassName = computed(() => {
      return [
        props.formOutline && "form-outline",
        inputGroupClassName.value,
        props.white && "form-white",
        props.wrapperClass,
      ];
    });
    const textareaClassName = computed(() => {
      return [
        "form-control",
        props.size && `form-control-${props.size}`,
        textareaValue.value && "active",
        showPlaceholder.value && "placeholder-active",
        isInputValidated.value && isInputValid.value && "is-valid",
        isInputValidated.value && !isInputValid.value && "is-invalid",
      ];
    });

    const inputGroupClassName = computed(() => {
      if (!props.inputGroup) {
        return;
      }
      return props.inputGroup !== true
        ? `input-group input-group-${props.inputGroup}`
        : "input-group";
    });

    const validationStyle = computed(() => {
      return props.inputGroup && isInputValidated.value
        ? { marginBottom: "1rem" }
        : "";
    });

    const validFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? "valid-tooltip" : "valid-feedback";
    });

    const invalidFeedbackClassName = computed(() => {
      return props.tooltipFeedback ? "invalid-tooltip" : "invalid-feedback";
    });

    // Validation ------------------------
    const isInputValidated = ref(props.isValidated);
    const isInputValid = ref(props.isValid);
    const defaultValidatorInvalidFeedback = ref("");
    const customInvalidFeedback = computed(() => {
      if (
        isInputValidated.value &&
        !isInputValid.value &&
        props.validationEvent
      ) {
        return defaultValidatorInvalidFeedback.value;
      }
      return props.invalidFeedback;
    });

    const handleValidation = (e) => {
      isInputValid.value = e.target.checkValidity();
      if (!isInputValid.value) {
        defaultValidatorInvalidFeedback.value = e.target.validationMessage;
      }
      isInputValidated.value = true;
    };

    const bindValidationEvents = () => {
      if (props.validationEvent === "submit") return;
      on(textareaRef.value, props.validationEvent, handleValidation);
    };

    function calcNotch() {
      if (labelRef.value) {
        notchMiddleWidth.value = labelRef.value.clientWidth * 0.8 + 8;
      }
    }

    function setPlaceholder() {
      if (attrs.placeholder && !labelRef.value) {
        showPlaceholder.value = true;
      } else {
        showPlaceholder.value = false;
      }
    }

    const currentLength = ref(0);

    function handleInput(e) {
      if (props.counter) {
        if (e.target.value.length > props.maxLength) {
          e.target.value = textareaValue.value;
          return;
        }

        currentLength.value = e.target.value.length;
      }

      textareaValue.value = e.target.value;
      emit("update:modelValue", textareaValue.value);
    }

    onMounted(() => {
      calcNotch();
      setPlaceholder();

      if (props.validationEvent) {
        bindValidationEvents();
      }
    });

    onUpdated(() => {
      calcNotch();
      setPlaceholder();
    });

    onUnmounted(() => {
      off(textareaRef.value, props.validationEvent, handleValidation);
    });

    watchEffect(() => (textareaValue.value = props.modelValue));

    return {
      textareaRef,
      uid,
      textareaValue,
      labelRef,
      handleInput,
      wrapperClassName,
      textareaClassName,
      validFeedbackClassName,
      invalidFeedbackClassName,
      validationStyle,
      customInvalidFeedback,
      notchLeadingWidth,
      notchMiddleWidth,
      props,
      currentLength,
    };
  },
};

const _hoisted_1$2 = ["id", "value", "rows"];
const _hoisted_2$2 = ["for"];
const _hoisted_3$1 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_4$1 = {
  key: 3,
  class: "form-helper"
};
const _hoisted_5$1 = { class: "form-counter" };
const _hoisted_6$1 = ["id", "value", "rows"];
const _hoisted_7$1 = ["for"];
const _hoisted_8$1 = {
  key: 1,
  class: "form-helper"
};
const _hoisted_9$1 = {
  key: 2,
  class: "form-helper"
};
const _hoisted_10$1 = { class: "form-counter" };
const _hoisted_11$1 = {
  key: 5,
  class: "form-notch"
};
const _hoisted_12$1 = /*#__PURE__*/createElementVNode("div", { class: "form-notch-trailing" }, null, -1 /* HOISTED */);
const _hoisted_13 = {
  key: 8,
  class: "form-text"
};

function render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    (!$props.wrap)
      ? (openBlock(), createElementBlock("textarea", mergeProps({
          key: 0,
          class: $setup.textareaClassName
        }, _ctx.$attrs, {
          id: $setup.uid,
          value: $setup.textareaValue,
          onInput: _cache[0] || (_cache[0] = (...args) => ($setup.handleInput && $setup.handleInput(...args))),
          rows: $props.rows,
          ref: "textareaRef"
        }), null, 16 /* FULL_PROPS */, _hoisted_1$2))
      : createCommentVNode("v-if", true),
    ($props.label && !$props.wrap)
      ? (openBlock(), createElementBlock("label", {
          key: 1,
          ref: "labelRef",
          class: "form-label",
          for: $setup.uid
        }, toDisplayString($props.label), 9 /* TEXT, PROPS */, _hoisted_2$2))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.helper)
      ? (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString($props.helper), 1 /* TEXT */))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.counter)
      ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          createElementVNode("div", _hoisted_5$1, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxLength), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    (!$props.wrap)
      ? renderSlot(_ctx.$slots, "default", { key: 4 })
      : createCommentVNode("v-if", true),
    (!$props.wrap && $props.validFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass($setup.validFeedbackClassName)
        }, toDisplayString($props.validFeedback), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true),
    (!$props.wrap && $setup.customInvalidFeedback)
      ? (openBlock(), createElementBlock("div", {
          key: 6,
          class: normalizeClass($setup.invalidFeedbackClassName)
        }, toDisplayString($setup.customInvalidFeedback), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true),
    ($props.wrap)
      ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          key: 7,
          class: normalizeClass($setup.wrapperClassName),
          style: normalizeStyle($setup.validationStyle)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend"),
            createElementVNode("textarea", mergeProps({ class: $setup.textareaClassName }, _ctx.$attrs, {
              id: $setup.uid,
              value: $setup.textareaValue,
              onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput && $setup.handleInput(...args))),
              rows: $props.rows,
              ref: "textareaRef"
            }), null, 16 /* FULL_PROPS */, _hoisted_6$1),
            ($props.label)
              ? (openBlock(), createElementBlock("label", {
                  key: 0,
                  ref: "labelRef",
                  class: "form-label",
                  for: $setup.uid
                }, toDisplayString($props.label), 9 /* TEXT, PROPS */, _hoisted_7$1))
              : createCommentVNode("v-if", true),
            ($props.helper)
              ? (openBlock(), createElementBlock("div", _hoisted_8$1, toDisplayString($props.helper), 1 /* TEXT */))
              : createCommentVNode("v-if", true),
            ($props.counter)
              ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                  createElementVNode("div", _hoisted_10$1, toDisplayString($setup.currentLength) + " / " + toDisplayString($props.maxLength), 1 /* TEXT */)
                ]))
              : createCommentVNode("v-if", true),
            ($props.validFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 3,
                  class: normalizeClass($setup.validFeedbackClassName)
                }, toDisplayString($props.validFeedback), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true),
            ($setup.customInvalidFeedback)
              ? (openBlock(), createElementBlock("div", {
                  key: 4,
                  class: normalizeClass($setup.invalidFeedbackClassName)
                }, toDisplayString($setup.customInvalidFeedback), 3 /* TEXT, CLASS */))
              : createCommentVNode("v-if", true),
            ($props.formOutline)
              ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                  createElementVNode("div", {
                    class: "form-notch-leading",
                    style: normalizeStyle({ width: `${$setup.notchLeadingWidth}px` })
                  }, null, 4 /* STYLE */),
                  createElementVNode("div", {
                    class: "form-notch-middle",
                    style: normalizeStyle({ width: `${$setup.notchMiddleWidth}px` })
                  }, null, 4 /* STYLE */),
                  _hoisted_12$1
                ]))
              : createCommentVNode("v-if", true)
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class", "style"]))
      : createCommentVNode("v-if", true),
    ($props.formText)
      ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString($props.formText), 1 /* TEXT */))
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

script$k.render = render$k;
script$k.__file = "src/components/dtTextarea.vue";

const handleBreakpoints = (windowWidth, breakpointValues) => {
  const breakpoints = {
    none: {
      width: 0,
      attr: null,
    },
    sm: {
      width: 576,
      attr: null,
    },
    md: {
      width: 768,
      attr: null,
    },
    lg: {
      width: 992,
      attr: null,
    },
    xl: {
      width: 1200,
      attr: null,
    },
    xxl: {
      width: 1400,
      attr: null,
    },
    mega: {
      width: 10000,
      attr: null,
    },
  };

  breakpointValues.forEach((value) => {
    const match = Object.keys(breakpoints).filter((breakpoint) =>
      value.includes(breakpoint) ? breakpoint : false
    )[0];
    if (match) {
      breakpoints[match].attr = value;
    } else {
      breakpoints.none.attr = value;
    }
  });
  const ranges = {};
  Object.keys(breakpoints).reduce((acc, cur, index) => {
    if (
      (breakpoints[acc].attr && breakpoints[cur].attr) ||
      (breakpoints[acc].attr && !cur)
    ) {
      ranges[breakpoints[acc].attr] = {
        min: breakpoints[acc].width,
        max: breakpoints[cur].width,
      };
      return cur;
    } else if (breakpoints[acc].attr && !breakpoints[cur].attr) {
      if (index === Object.keys(breakpoints).length - 1) {
        ranges[breakpoints[acc].attr] = {
          min: breakpoints[acc].width,
          max: breakpoints[cur].width,
        };
      }
      return acc;
    }
  });

  // return single value that matches actual window width range
  const value = Object.keys(ranges).filter((key) => {
    if (windowWidth > ranges[key].min && windowWidth < ranges[key].max) {
      return key;
    }
  })[0];

  return value;
};

var script$j = {
  name: "dtTabs",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    modelValue: {
      type: String,
      required: true,
    },
    vertical: {
      type: [Boolean, String],
      default: false,
    },
  },
  emits: ["update:modelValue", "hide", "hidden", "show", "shown"],
  setup(props, { emit }) {
    const prevTab = ref(null);
    const activeTab = ref(null);
    const activeTabId = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (cur) => {
        if (cur !== activeTabId.value) {
          activeTabId.value = cur;
          updateActiveTab(null, cur);
        }
      }
    );

    const updateActiveTab = (element, tabId) => {
      if (!element) {
        element = document.body.querySelector(`#tab-${tabId}`);
      }
      if (prevTab.value) {
        emit("hide", { target: prevTab.value, relatedTarget: element });
      }
      emit("show", { target: element, relatedTarget: prevTab.value });
      emit("update:modelValue", tabId);

      activeTab.value = element;
      activeTabId.value = tabId;
    };

    const emitShown = () => {
      emit("shown", { target: activeTab.value, relatedTarget: prevTab.value });
      prevTab.value = activeTab.value;
    };

    const emitHidden = () => {
      emit("hidden", {
        target: prevTab.value,
        relatedTarget: activeTab.value,
      });
    };

    provide("activeTab", activeTabId);
    provide("updateActiveTab", updateActiveTab);
    provide("emitShown", emitShown);
    provide("emitHidden", emitHidden);

    const isVertical = ref(false);
    const windowWidth = ref(window.innerWidth);
    const activeBrakpointValue = ref(null);

    provide("isVertical", isVertical);

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;

      const breakpointValue = handleBreakpoints(windowWidth.value, [
        "column",
        props.vertical,
      ]);

      if (breakpointValue === activeBrakpointValue.value) return;

      isVertical.value = breakpointValue === props.vertical ? true : false;
      activeBrakpointValue.value = breakpointValue;
    };

    onMounted(() => {
      if (!props.vertical) return;

      if (props.vertical === true) {
        isVertical.value = true;
      } else {
        handleWindowResize();
        on(window, "resize", handleWindowResize);
      }
    });

    onUnmounted(() => {
      off(window, "resize", handleWindowResize);
    });

    return {
      isVertical,
      props,
    };
  },
};

function render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.isVertical)
    ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
        key: 0,
        class: "row"
      }, _ctx.$attrs), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */))
    : renderSlot(_ctx.$slots, "default", { key: 1 })
}

script$j.render = render$j;
script$j.__file = "src/components/dtTabs.vue";

var script$i = {
  name: "dtTabContent",
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: "div",
    },
    col: {
      type: String,
      default: "9",
    },
    contentClasses: String,
  },
  setup(props) {
    const className = computed(() => {
      return ["tab-content", props.contentClasses && props.contentClasses];
    });

    const columnClassName = computed(() => {
      return [`col-${props.col}`];
    });

    const isVertical = inject("isVertical", false);

    return {
      isVertical,
      className,
      columnClassName,
      props,
    };
  },
};

function render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(KeepAlive, null, [
    ($setup.isVertical)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass($setup.columnClassName)
        }, [
          (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({ class: $setup.className }, _ctx.$attrs), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }, 16 /* FULL_PROPS */, ["class"]))
        ], 2 /* CLASS */))
      : (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
          key: 1,
          class: $setup.className
        }, _ctx.$attrs), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3 /* FORWARDED */
        }, 16 /* FULL_PROPS */, ["class"]))
  ], 1024 /* DYNAMIC_SLOTS */))
}

script$i.render = render$i;
script$i.__file = "src/components/dtTabContent.vue";

var script$h = {
  name: "dtTabItem",
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: "a",
    },
    tabId: {
      type: String,
      required: true,
    },
    href: String,
  },
  setup(props) {
    const item = ref("item");

    const className = computed(() => {
      return ["nav-link", isActive.value && "active"];
    });

    const uid = computed(() => {
      return `tab-${props.tabId}`;
    });
    const controls = computed(() => {
      return `${props.tabId}`;
    });

    const activeTabId = inject("activeTab", false);
    const isActive = ref(
      activeTabId &&
        (activeTabId.value === props.tabId ||
          (activeTabId && activeTabId === props.tabId))
    );

    const updateActiveTab = inject("updateActiveTab", false);
    watchEffect(
      () =>
        (isActive.value =
          activeTabId &&
          (activeTabId.value === props.tabId ||
            (activeTabId && activeTabId === props.tabId)))
    );

    const handleClick = () => {
      updateActiveTab(item.value, props.tabId);
    };

    onMounted(() => {
      if (isActive.value && updateActiveTab) {
        updateActiveTab(item.value, props.tabId);
      }
    });

    return {
      item,
      uid,
      controls,
      className,
      handleClick,
      props,
    };
  },
};

const _hoisted_1$1 = {
  key: 0,
  class: "nav-item",
  role: "presentation"
};
const _hoisted_2$1 = ["aria-controls", "id", "href"];

function render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.href)
    ? (openBlock(), createElementBlock("li", _hoisted_1$1, [
        createElementVNode("a", mergeProps({
          class: $setup.className,
          role: "tab",
          "aria-controls": $setup.controls,
          id: $setup.uid,
          href: $props.href
        }, _ctx.$attrs, {
          onClick: _cache[0] || (_cache[0] = withModifiers($event => ($setup.handleClick($props.tabId)), ["prevent"])),
          ref: "item"
        }), [
          renderSlot(_ctx.$slots, "default")
        ], 16 /* FULL_PROPS */, _hoisted_2$1)
      ]))
    : (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
        key: 1,
        class: $setup.className,
        role: "tab",
        "aria-controls": $setup.controls,
        id: $setup.uid
      }, _ctx.$attrs, {
        onClick: _cache[1] || (_cache[1] = withModifiers($event => ($setup.handleClick($props.tabId)), ["prevent"])),
        ref: "item"
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["class", "aria-controls", "id"]))
}

script$h.render = render$h;
script$h.__file = "src/components/dtTabItem.vue";

var script$g = {
  name: "dtTabNav",
  props: {
    tag: {
      type: String,
      default: "ul",
    },
    pills: {
      type: Boolean,
    },
    justify: {
      type: Boolean,
    },
    fill: {
      type: Boolean,
    },
    col: {
      type: String,
      default: "3",
    },
    tabsClasses: String,
  },
  setup(props) {
    const className = computed(() => {
      return [
        "nav",
        props.pills ? "nav-pills" : "nav-tabs",
        props.justify && "nav-justified",
        props.fill && "nav-fill",
        isVertical.value && "flex-column",
        props.tabsClasses && props.tabsClasses,
      ];
    });

    const columnClassName = computed(() => {
      return [`col-${props.col}`];
    });

    const isVertical = inject("isVertical", false);

    return {
      className,
      columnClassName,
      isVertical,
      props,
    };
  },
};

function render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return ($setup.isVertical)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass($setup.columnClassName)
      }, [
        (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
          class: normalizeClass($setup.className)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class"]))
      ], 2 /* CLASS */))
    : (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        key: 1,
        class: normalizeClass($setup.className)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["class"]))
}

script$g.render = render$g;
script$g.__file = "src/components/dtTabNav.vue";

var script$f = {
  name: "dtTabPane",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    tabId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["tab-pane fade", isActive.value && "show active"];
    });

    const item = ref("item");
    const uid = computed(() => {
      return `${props.tabId}`;
    });
    const labelledby = computed(() => {
      return `tab-${props.tabId}`;
    });

    const activeTabId = inject("activeTab", false);
    const isActive = ref(
      activeTabId &&
        (activeTabId.value === props.tabId || activeTabId === props.tabId)
    );

    watchEffect(
      () =>
        (isActive.value =
          activeTabId &&
          (activeTabId.value === props.tabId || activeTabId === props.tabId))
    );

    const emitShown = inject("emitShown", false);
    const emitHidden = inject("emitHidden", false);

    onMounted(() => {
      if (isActive.value && emitShown) {
        emitShown(props.tabId);
      }
    });

    const afterEnter = (el) => {
      el.style.opacity = "1";
    };
    const enter = (el) => {
      el.style.opacity = "0";
      emitShown(props.tabId);
    };
    const beforeLeave = (el) => {
      el.style.opacity = "1";
      emitHidden(props.tabId);
    };
    const afterLeave = (el) => {
      el.style.opacity = "0";
    };

    return {
      isActive,
      item,
      uid,
      labelledby,
      afterEnter,
      enter,
      beforeLeave,
      afterLeave,
      className,
      props,
    };
  },
};

function render$f(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onAfterLeave: $setup.afterLeave,
    duration: 150
  }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(resolveDynamicComponent($props.tag), {
        class: normalizeClass($setup.className),
        ref: "item",
        role: "tabpanel",
        "aria-labelledby": $setup.labelledby,
        id: $setup.uid
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["class", "aria-labelledby", "id"])), [
        [vShow, $setup.isActive]
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
}

script$f.render = render$f;
script$f.__file = "src/components/dtTabPane.vue";

var script$e = {
  name: "dtCard",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    border: {
      type: String,
    },
    bg: {
      type: String,
    },
    text: {
      type: [String, Array],
    },
    shadow: {
      type: String,
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        "card",
        props.border && `border border-${props.border}`,
        props.bg && `bg-${props.bg}`,
        props.shadow && `shadow-${props.shadow}`,
        props.text && spreadProps(props.text),
      ];
    });

    const spreadProps = (props) => {
      if (typeof props === "string") {
        return `text-${props}`;
      }
      return props.map((prop) => `text-${prop}`.trim()).join(" ");
    };

    return {
      className,
      props,
    };
  },
};

function render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$e.render = render$e;
script$e.__file = "src/components/dtCard.vue";

var script$d = {
  name: "dtCardHeader",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    bg: String,
    border: String,
  },
  setup(props) {
    const className = computed(() => {
      return [
        "card-header",
        props.border && `border-${props.border}`,
        props.bg && `bg-${props.bg}`,
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$d.render = render$d;
script$d.__file = "src/components/dtCardHeader.vue";

var script$c = {
  name: "dtCardBody",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    text: {
      type: [String, Array],
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["card-body", props.text && spreadProps(props.text)];
    });

    const spreadProps = (props) => {
      if (typeof props === "string") {
        return `text-${props}`;
      }
      return props.map((prop) => `text-${prop}`.trim()).join(" ");
    };

    return {
      className,
      props,
    };
  },
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$c.render = render$c;
script$c.__file = "src/components/dtCardBody.vue";

var script$b = {
  name: "dtCardLink",
  props: {
    tag: {
      type: String,
      default: "a",
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["card-link"];
    });

    return {
      className,
      props,
    };
  },
};

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$b.render = render$b;
script$b.__file = "src/components/dtCardLink.vue";

var script$a = {
  name: "dtCardImg",
  props: {
    tag: {
      type: String,
      default: "img",
    },
    src: {
      type: String,
      required: true,
    },
    alt: String,
    top: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return [
        props.top && `card-img-top`,
        props.bottom && `card-img-bottom`,
        props.fluid && `img-fluid`,
        props.overlay && "card-img",
        !props.top &&
          !props.bottom &&
          !props.fluid &&
          !props.overlay &&
          `card-img`,
      ];
    });

    return {
      className,
      props,
    };
  },
};

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    (openBlock(), createBlock(resolveDynamicComponent($props.tag), mergeProps({
      src: $props.src,
      alt: $props.alt,
      class: $setup.className
    }, _ctx.$attrs), null, 16 /* FULL_PROPS */, ["src", "alt", "class"])),
    ($props.overlay)
      ? (openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          class: "card-img-overlay"
        }, _ctx.$attrs), [
          renderSlot(_ctx.$slots, "default")
        ], 16 /* FULL_PROPS */))
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

script$a.render = render$a;
script$a.__file = "src/components/dtCardImg.vue";

var script$9 = {
  name: "dtCardText",
  props: {
    tag: {
      type: String,
      default: "p",
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["card-text"];
    });

    return {
      className,
      props,
    };
  },
};

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$9.render = render$9;
script$9.__file = "src/components/dtCardText.vue";

var script$8 = {
  name: "dtCardTitle",
  props: {
    tag: {
      type: String,
      default: "h5",
    },
    subtitle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tagName = computed(() => {
      if (!props.subtitle) {
        return props.tag;
      }
      return props.tag !== "h5" ? props.tag : "h6";
    });

    const className = computed(() => {
      return [props.subtitle ? "card-subtitle" : "card-title"];
    });

    return {
      className,
      tagName,
      props,
    };
  },
};

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($setup.tagName), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$8.render = render$8;
script$8.__file = "src/components/dtCardTitle.vue";

var script$7 = {
  name: "dtCardGroup",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["card-group"];
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
script$7.__file = "src/components/dtCardGroup.vue";

var script$6 = {
  name: "dtCarousel",
  props: {
    captionsClass: {
      type: String,
      default: "carousel-caption d-none d-md-block",
    },
    controls: {
      type: Boolean,
      default: true,
    },
    dark: Boolean,
    fade: Boolean,
    indicators: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: [Number, Boolean],
      default: 5000,
    },
    items: {
      type: Array,
      reguired: true,
    },
    itemsClass: {
      type: String,
      default: "d-block w-100",
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    pause: {
      type: [String, Boolean],
      default: "hover",
    },
    tag: {
      type: String,
      default: "div",
    },
    touch: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const className = computed(() => {
      return [
        "carousel",
        "slide",
        props.fade && "carousel-fade",
        props.dark && "carousel-dark",
      ];
    });

    const activeItemKey = ref(props.modelValue);
    const carouselInnerRef = ref(null);
    const isSliding = ref(false);

    let slidingInterval = null;
    let isPaused = false;

    const prev = () => {
      slideTo("prev");
    };
    const next = () => {
      slideTo("next");
    };
    const slideTo = (target) => {
      if (isSliding.value) {
        return;
      }

      const isPausedState = isPaused;
      isPaused = false;

      slide(target);

      isPaused = isPausedState;
    };

    const slide = (target) => {
      if (isPaused || !carouselInnerRef.value) {
        return;
      }

      isSliding.value = true;
      const targetItemKey = getTargetKey(target);
      const isNext = getTargetSlideOrder(target);
      const directionalClassName = getDirectionalClassName(isNext);
      const orderClassName = getOrderClassName(isNext);
      const currentItem = getItem(activeItemKey.value);
      const targetItem = getItem(targetItemKey);

      activeItemKey.value = targetItemKey;
      targetItem.classList.add(orderClassName);
      emit("update:modelValue", activeItemKey.value);

      if (props.interval) {
        reloadInterval();
      }

      setTimeout(() => {
        currentItem.classList.add(directionalClassName);
        targetItem.classList.add(directionalClassName);
      }, 20);

      setTimeout(() => {
        currentItem.classList.remove("active");
        currentItem.classList.remove(directionalClassName);
        targetItem.classList.remove(directionalClassName);
        targetItem.classList.remove(orderClassName);
        targetItem.classList.add("active");
        isSliding.value = false;
      }, 600);
    };

    const getTargetKey = (target) => {
      if (target === "prev" && activeItemKey.value <= 0) {
        return props.items.length - 1;
      } else if (target === "prev") {
        return activeItemKey.value - 1;
      } else if (
        target === "next" &&
        activeItemKey.value >= props.items.length - 1
      ) {
        return 0;
      } else if (target === "next") {
        return activeItemKey.value + 1;
      } else {
        return target;
      }
    };
    const getTargetSlideOrder = (target) => {
      if (target === "next" || target > activeItemKey.value) {
        return true;
      } else {
        return false;
      }
    };
    const getDirectionalClassName = (isNext) =>
      isNext ? "carousel-item-start" : "carousel-item-end";
    const getOrderClassName = (isNext) =>
      isNext ? "carousel-item-next" : "carousel-item-prev";
    const getItem = (key) =>
      carouselInnerRef.value.querySelectorAll(".carousel-item")[key];

    const reloadInterval = () => {
      clearInterval(slidingInterval);
      slidingInterval = null;

      const itemInterval =
        props.items[activeItemKey.value].interval || props.interval;
      slidingInterval = setInterval(() => {
        slide("next");
      }, itemInterval);
    };

    // keyboard accessibility
    const handleMouseenter = () => {
      if (props.pause === "hover" && props.interval) {
        clearInterval(slidingInterval);
        slidingInterval = null;
        isPaused = true;
      }
    };
    const handleMouseleave = () => {
      if (props.pause === "hover" && props.interval) {
        reloadInterval();
        isPaused = false;
      }
    };
    const handleRight = () => {
      if (props.keyboard) {
        next();
      }
    };
    const handleLeft = () => {
      if (props.keyboard) {
        prev();
      }
    };

    // touch events
    const pointerEvent = Boolean(window.PointerEvent);
    const touchStartX = ref(0);
    const touchDeltaX = ref(0);
    const handleTouchstart = (event) => {
      if (!props.touch) {
        return;
      }

      if (
        pointerEvent &&
        (event.pointerType === "pen" || event.pointerType === "touch")
      ) {
        touchStartX.value = event.clientX;
      } else {
        touchStartX.value = event.touches[0].clientX;
      }
    };
    const handleTouchmove = (event) => {
      if (!props.touch) {
        return;
      }

      touchDeltaX.value =
        event.touches && event.touches.length > 1
          ? 0
          : event.touches[0].clientX - touchStartX.value;
    };
    const handleTouchend = (event) => {
      if (!props.touch) {
        return;
      }

      if (
        pointerEvent &&
        (event.pointerType === "pen" || event.pointerType === "touch")
      ) {
        touchDeltaX.value = event.clientX - touchStartX.value;
      }

      handleSwipe();
    };
    const handleSwipe = () => {
      const absDeltax = Math.abs(touchDeltaX.value);

      if (absDeltax <= 40) {
        return;
      }

      const direction = absDeltax / touchDeltaX.value;
      touchDeltaX.value = 0;

      if (!direction) {
        return;
      }

      if (direction > 0) {
        prev();
      } else {
        next();
      }
    };

    onMounted(() => {
      const currentActiveItem =
        carouselInnerRef.value.querySelectorAll(".carousel-item")[
          activeItemKey.value
        ];
      currentActiveItem.classList.add("active");

      if (props.interval) {
        reloadInterval();
      }
    });

    onUnmounted(() => {
      if (props.interval) {
        clearInterval(slidingInterval);
        slidingInterval = null;
      }
    });

    watch(
      () => props.modelValue,
      (targetItemKey) => slideTo(targetItemKey)
    );

    return {
      className,
      carouselInnerRef,
      activeItemKey,
      handleMouseenter,
      handleMouseleave,
      handleRight,
      handleLeft,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      slideTo,
      next,
      prev,
    };
  },
};

const _hoisted_1 = {
  key: 0,
  class: "carousel-indicators"
};
const _hoisted_2 = ["aria-current", "aria-label", "onClick"];
const _hoisted_3 = {
  class: "carousel-inner",
  ref: "carouselInnerRef"
};
const _hoisted_4 = ["src", "alt"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = /*#__PURE__*/createElementVNode("span", {
  class: "carousel-control-prev-icon",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Previous", -1 /* HOISTED */);
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];
const _hoisted_10 = /*#__PURE__*/createElementVNode("span", {
  class: "carousel-control-next-icon",
  "aria-hidden": "true"
}, null, -1 /* HOISTED */);
const _hoisted_11 = /*#__PURE__*/createElementVNode("span", { class: "visually-hidden" }, "Next", -1 /* HOISTED */);
const _hoisted_12 = [
  _hoisted_10,
  _hoisted_11
];

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className),
    onMouseenter: $setup.handleMouseenter,
    onMouseleave: $setup.handleMouseleave,
    onKeydown: [
      withKeys($setup.handleRight, ["right"]),
      withKeys($setup.handleLeft, ["left"])
    ],
    onTouchstart: $setup.handleTouchstart,
    onTouchmove: $setup.handleTouchmove,
    onTouchend: $setup.handleTouchend
  }, {
    default: withCtx(() => [
      ($props.indicators)
        ? (openBlock(), createElementBlock("div", _hoisted_1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, key) => {
              return (openBlock(), createElementBlock("button", {
                key: key,
                type: "button",
                class: normalizeClass($setup.activeItemKey === key && 'active'),
                "aria-current": $setup.activeItemKey === key && 'true',
                "aria-label": `Slide ${key + 1}`,
                onClick: $event => ($setup.slideTo(key))
              }, null, 10 /* CLASS, PROPS */, _hoisted_2))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : createCommentVNode("v-if", true),
      createElementVNode("div", _hoisted_3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.items, (item, key) => {
          return (openBlock(), createElementBlock("div", {
            class: "carousel-item",
            key: key
          }, [
            createElementVNode("img", {
              src: item.src,
              alt: item.alt,
              class: normalizeClass($props.itemsClass)
            }, null, 10 /* CLASS, PROPS */, _hoisted_4),
            (item.label || item.caption)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass($props.captionsClass)
                }, [
                  (item.label)
                    ? (openBlock(), createElementBlock("h5", _hoisted_5, toDisplayString(item.label), 1 /* TEXT */))
                    : createCommentVNode("v-if", true),
                  (item.caption)
                    ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(item.caption), 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
                ], 2 /* CLASS */))
              : createCommentVNode("v-if", true)
          ]))
        }), 128 /* KEYED_FRAGMENT */))
      ], 512 /* NEED_PATCH */),
      ($props.controls)
        ? (openBlock(), createElementBlock("button", {
            key: 1,
            onClick: _cache[0] || (_cache[0] = (...args) => ($setup.prev && $setup.prev(...args))),
            class: "carousel-control-prev",
            type: "button"
          }, _hoisted_9))
        : createCommentVNode("v-if", true),
      ($props.controls)
        ? (openBlock(), createElementBlock("button", {
            key: 2,
            onClick: _cache[1] || (_cache[1] = (...args) => ($setup.next && $setup.next(...args))),
            class: "carousel-control-next",
            type: "button"
          }, _hoisted_12))
        : createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "onMouseenter", "onMouseleave", "onKeydown", "onTouchstart", "onTouchmove", "onTouchend"]))
}

script$6.render = render$6;
script$6.__file = "src/components/dtCarousel.vue";

var script$5 = {
  name: "dtCloseButton",
  props: {
    white: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["btn-close", props.white && `btn-close-white`];
    });

    return {
      className,
    };
  },
};

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", {
    class: normalizeClass($setup.className),
    "aria-label": "Close"
  }, null, 2 /* CLASS */))
}

script$5.render = render$5;
script$5.__file = "src/components/dtCloseButton.vue";

function dtFocusTrap() {
  const trapElement = ref(null);
  const firstFocusableElement = ref(null);
  const lastFocusableElement = ref(null);

  function initFocusTrap(element) {
    trapElement.value = element;

    calculateFocusTrap();

    on(window, "keydown", focusFirstElement);

    return true;
  }

  function calculateFocusTrap() {
    const focusable = Array.from(
      trapElement.value.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => {
      return (
        !el.classList.contains("ps__thumb-x") &&
        !el.classList.contains("ps__thumb-y") &&
        !el.disabled
      );
    });

    if (focusable.length === 0) return;

    firstFocusableElement.value = focusable[0];

    lastFocusableElement.value = focusable[focusable.length - 1];
    on(lastFocusableElement.value, "keydown", (e) =>
      handleLastElementKeydown(e)
    );
  }

  function handleLastElementKeydown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      focusTrap();
    }
  }

  function focusTrap() {
    if (!firstFocusableElement.value) return;

    firstFocusableElement.value.focus();
  }

  function focusFirstElement(e, trap = false) {
    if (e.key === "Tab") {
      e.preventDefault();
      focusTrap();
    }
    if (trap) return;
    off(window, "keydown", focusFirstElement);
  }

  function removeFocusTrap() {
    off(lastFocusableElement.value, "keydown", handleLastElementKeydown);
  }

  return {
    initFocusTrap,
    removeFocusTrap,
  };
}

var script$4 = {
  name: "dtModal",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    modelValue: Boolean,
    size: {
      type: String,
      validator: (value) =>
        ["sm", "lg", "xl"].indexOf(value.toLowerCase()) > -1,
    },
    removeBackdrop: {
      type: Boolean,
      default: false,
    },
    staticBackdrop: {
      type: Boolean,
      default: false,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    bgSrc: {
      type: String,
      default: "",
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 400,
    },
    labelledby: String,
    fullscreen: {
      type: [Boolean, String],
      default: false,
    },
    animation: {
      type: Boolean,
      default: true,
    },
    dialogClasses: {
      type: String,
    },
    transform: String,
    keyboard: {
      type: Boolean,
      default: true,
    },
    focus: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["show", "shown", "hide", "hidden", "update:modelValue"],
  setup(props, { emit }) {
    const root = ref("root");
    const dialog = ref("dialog");
    const dialogTransform = ref("");
    const focusTrap = ref(null);

    const isActive = ref(props.modelValue);

    const thisElement = ref(null);

    watchEffect(() => {
      isActive.value = props.modelValue;
      if (isActive.value) {
        emit("update:modelValue", true);
      }
    });

    const wrapperClass = computed(() => {
      return [
        "modal",
        props.animation && "fade",
        isActive.value && "show",
        props.staticBackdrop && "modal-static",
      ];
    });

    const dialogClass = computed(() => {
      return [
        "modal-dialog",
        props.size && "modal-" + props.size,
        props.centered && "modal-dialog-centered",
        props.scrollable && "modal-dialog-scrollable",
        props.fullscreen && fullscreenClass.value,
        props.dialogClasses,
      ];
    });

    const backdropStyle = computed(() => {
      return props.removeBackdrop
        ? false
        : { "background-color": `rgba(0,0,0, 0.5)` };
    });

    // shouldOverflow with backdropOverflowStyle prevents bottom modal create additional scrollbar on show
    const shouldOverflow = ref(
      props.transform === "translate(0,25%)" ? false : true
    );
    const backdropOverflowStyle = computed(() => {
      if (shouldOverflow.value) {
        return;
      }
      return "overflow: hidden";
    });

    const computedContentStyle = computed(() => {
      return props.bgSrc
        ? { "background-image": `url("${props.bgSrc}")` }
        : false;
    });

    const fullscreenClass = computed(() => {
      if (!props.fullscreen) {
        return false;
      }
      return [
        props.fullscreen !== true
          ? `modal-fullscreen-${props.fullscreen}`
          : "modal-fullscreen",
      ];
    });

    const animateStaticBackdrop = () => {
      animateStaticModal(dialog.value);
    };

    const closeModal = () => {
      emit("update:modelValue", false);
    };

    provide("closeModal", closeModal);

    const animateStaticModal = (el) => {
      el.style.transform = `scale(1.02)`;
      setTimeout(() => (el.style.transform = `scale(1.0)`), 300);
    };

    const handleEscKeyUp = (e) => {
      if (e.key === "Escape" && isActive.value) {
        closeModal();
      }
    };

    const isBodyOverflowing = ref(null);
    const scrollbarWidth = ref(0);

    // Bootstrap way to measure scrollbar width
    const getScrollbarWidth = () => {
      const scrollDiv = document.createElement("div");
      scrollDiv.className = "modal-scrollbar-measure";
      document.body.appendChild(scrollDiv);
      const scrollbarWidth =
        scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    const setScrollbar = () => {
      const rect = document.body.getBoundingClientRect();
      isBodyOverflowing.value =
        Math.round(rect.left + rect.right) < window.innerWidth;
      scrollbarWidth.value = isBodyOverflowing.value
        ? getScrollbarWidth().toFixed(2)
        : 0;
    };

    const enter = (el) => {
      shouldOverflow.value =
        props.transform === "translate(0,25%)" ? false : true;

      dialogTransform.value = props.transform || "translate(0, -25%)";

      el.childNodes[0].style.transform = dialogTransform.value;
      el.style.opacity = 0;
      el.style.display = "block";

      setScrollbar();
      document.body.style.paddingRight = `${scrollbarWidth.value}px`;
      el.style.paddingRight = `${scrollbarWidth.value}px`;
      document.body.classList.add("modal-open");

      emit("show", root.value);
    };
    const afterEnter = (el) => {
      el.childNodes[0].style.transform = "translate(0,0)";
      el.style.opacity = 1;

      setTimeout(() => {
        shouldOverflow.value = true;
        emit("shown", root.value);
      }, 400);
      thisElement.value = root.value;

      if (props.keyboard) {
        on(window, "keyup", handleEscKeyUp);
      }

      if (props.focus) {
        focusTrap.value = dtFocusTrap();
        focusTrap.value.initFocusTrap(root.value);
      }
    };
    const beforeLeave = (el) => {
      el.childNodes[0].style.transform = dialogTransform.value;
      el.style.opacity = 0;
      setTimeout(() => {
        el.style.paddingRight = null;
        document.body.style.paddingRight = null;
        document.body.classList.remove("modal-open");
      }, 200);

      emit("hide", thisElement.value);

      if (props.keyboard) {
        off(window, "keyup", handleEscKeyUp);
      }
      if (props.focus && focusTrap.value) {
        focusTrap.value.removeFocusTrap();
      }
    };
    const afterLeave = () => {
      emit("hidden", thisElement.value);
      shouldOverflow.value = false;
    };

    onBeforeUnmount(() => {
      off(window, "keyup", handleEscKeyUp);
    });

    return {
      wrapperClass,
      dialogClass,
      backdropStyle,
      backdropOverflowStyle,
      computedContentStyle,
      root,
      dialog,
      isActive,
      closeModal,
      animateStaticBackdrop,
      enter,
      afterEnter,
      beforeLeave,
      afterLeave,
      props,
    };
  },
};

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(Transition, {
    onEnter: $setup.enter,
    onAfterEnter: $setup.afterEnter,
    onBeforeLeave: $setup.beforeLeave,
    onAfterLeave: $setup.afterLeave
  }, {
    default: withCtx(() => [
      ($setup.isActive)
        ? (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
            key: 0,
            ref: "root",
            class: normalizeClass($setup.wrapperClass),
            style: normalizeStyle([$setup.backdropStyle, $setup.backdropOverflowStyle]),
            "aria-hidden": !$setup.isActive,
            "aria-modal": $setup.isActive ? true : null,
            "aria-labelledby": $props.labelledby,
            role: "dialog",
            onClick: _cache[0] || (_cache[0] = withModifiers(
        () => {
          if ($props.staticBackdrop) {
            $setup.animateStaticBackdrop();
          } else {
            $setup.closeModal();
          }
        }
      , ["self"]))
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: normalizeClass($setup.dialogClass),
                role: "document",
                ref: "dialog"
              }, [
                createElementVNode("div", {
                  class: "modal-content",
                  style: normalizeStyle($setup.computedContentStyle)
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 4 /* STYLE */)
              ], 2 /* CLASS */)
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class", "style", "aria-hidden", "aria-modal", "aria-labelledby"]))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["onEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]))
}

script$4.render = render$4;
script$4.__file = "src/components/dtModal.vue";

var script$3 = {
  name: "dtModalTitle",
  props: {
    tag: {
      type: String,
      default: "h5",
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["modal-title", props.bold && "font-weight-bold"];
    });

    return {
      className,
      props,
    };
  },
};

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$3.render = render$3;
script$3.__file = "src/components/dtModalTitle.vue";

var script$2 = {
  name: "dtModalHeader",
  components: {
    dtCloseButton: script$5,
  },
  props: {
    tag: {
      type: String,
      default: "div",
    },
    close: {
      type: Boolean,
      default: true,
    },
    closeWhite: {
      type: Boolean,
      default: false,
    },
    color: String,
  },
  setup(props) {
    const closeModal = inject("closeModal", false);

    const className = computed(() => {
      return ["modal-header", props.color && `bg-${props.color}`];
    });

    return {
      className,
      closeModal,
      props,
    };
  },
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dt_close_button = resolveComponent("dt-close-button");

  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      ($props.close)
        ? (openBlock(), createBlock(_component_dt_close_button, {
            key: 0,
            white: $props.closeWhite,
            onClick: withModifiers($setup.closeModal, ["prevent"])
          }, null, 8 /* PROPS */, ["white", "onClick"]))
        : createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$2.render = render$2;
script$2.__file = "src/components/dtModalHeader.vue";

var script$1 = {
  name: "dtModalBody",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["modal-body"];
    });

    return {
      className,
      props,
    };
  },
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$1.render = render$1;
script$1.__file = "src/components/dtModalBody.vue";

var script = {
  name: "dtModalFooter",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const className = computed(() => {
      return ["modal-footer"];
    });

    return {
      className,
      props,
    };
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent($props.tag), {
    class: normalizeClass($setup.className)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script.render = render;
script.__file = "src/components/dtModalFooter.vue";

var components = {
  dtAccordion: script$C,
  dtAccordionItem: script$A,
  dtButton: script$y,
  dtFooter: script$r,
  dtNavbar: script$q,
  dtNavbarBrand: script$p,
  dtNavbarNav: script$o,
  dtNavbarItem: script$n,
  dtNavbarToggler: script$m,
  dtCollapse: script$B,
  dtIcon: script$t,
  dtContainer: script$u,
  dtRow: script$l,
  dtCol: script$v,
  dtInput: script$s,
  dtTextarea: script$k,
  dtTabs: script$j,
  dtTabContent: script$i,
  dtTabItem: script$h,
  dtTabNav: script$g,
  dtTabPane: script$f,
  dtCard: script$e,
  dtCardHeader: script$d,
  dtCardBody: script$c,
  dtCardLink: script$b,
  dtCardImg: script$a,
  dtCardText: script$9,
  dtCardTitle: script$8,
  dtCardGroup: script$7,
  dtCarousel: script$6,
  dtCloseButton: script$5,
  dtModal: script$4,
  dtModalTitle: script$3,
  dtModalHeader: script$2,
  dtModalBody: script$1,
  dtModalFooter: script,
  dtAnimatedCard: script$z,
  dtBadge: script$x,
  dtButtonGroup: script$w,
  dtRipple,
};

const dtUiKit = {
  install(Vue) {
    for (const prop in components) {
      // eslint-disable-next-line no-prototype-builtins
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  },
};

export { dtUiKit as default };
