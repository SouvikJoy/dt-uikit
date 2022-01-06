'use strict';

var vue = require('vue');

var script$c = {
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
    const accordionRef = vue.ref(null);
    const className = vue.computed(() => {
      return ["accordion", props.flush && "accordion-flush", props.classes];
    });

    const activeItem = vue.ref(props.modelValue);
    const setActiveItem = (item) => {
      activeItem.value = item;
      emit("update:modelValue", item);
    };

    vue.watchEffect(() => (activeItem.value = props.modelValue));

    vue.provide("activeItem", activeItem);
    vue.provide("stayOpen", props.stayOpen);
    vue.provide("setActiveItem", setActiveItem);

    return {
      accordionRef,
      setActiveItem,
      className,
    };
  },
};

function render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className),
    ref: "accordionRef"
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$c.render = render$c;
script$c.__file = "src/components/dtAccordion.vue";

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

var script$b = {
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

function render$b(_ctx, _cache, $props, $setup, $data, $options) {
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

script$b.render = render$b;
script$b.__file = "src/components/dtCollapse.vue";

var script$a = {
  name: "dtAccordionItem",
  components: {
    dtCollapse: script$b,
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
    const itemRef = vue.ref(null);
    const itemClassName = vue.computed(() => {
      return ["accordion-item", props.itemClasses];
    });
    const headerClassName = vue.computed(() => {
      return ["accordion-header", props.headerClasses];
    });
    const bodyClassName = vue.computed(() => {
      return ["accordion-body", props.bodyClasses];
    });
    const buttonClassName = vue.computed(() => {
      return ["accordion-button", !isActive.value && "collapsed"];
    });

    const setActiveItem = vue.inject("setActiveItem", null);
    const activeItem = vue.inject("activeItem", null);
    const stayOpen = vue.inject("stayOpen", false);

    const isActive = vue.ref(activeItem.value === props.collapseId);

    vue.watchEffect(() => {
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

const _hoisted_1$1 = ["aria-controls"];

function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dtCollapse = vue.resolveComponent("dtCollapse");

  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.itemClassName),
    ref: "itemRef"
  }, {
    default: vue.withCtx(() => [
      vue.createElementVNode("h2", {
        class: vue.normalizeClass($setup.headerClassName)
      }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = () => $setup.toggleAccordion($props.collapseId)),
          class: vue.normalizeClass($setup.buttonClassName),
          "aria-expanded": "true",
          "aria-controls": $props.collapseId
        }, vue.toDisplayString($props.headerTitle), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$1)
      ], 2 /* CLASS */),
      vue.createVNode(_component_dtCollapse, {
        id: $props.collapseId,
        modelValue: $setup.isActive,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($setup.isActive) = $event))
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", {
            class: vue.normalizeClass($setup.bodyClassName)
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */)
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["id", "modelValue"])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$a.render = render$a;
script$a.__file = "src/components/dtAccordionItem.vue";

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

var script$9 = {
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
    const toggle = vue.ref(props.toggle);
    const className = vue.computed(() => {
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

function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_dt_ripple = vue.resolveDirective("dt-ripple");

  return vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    type: $props.type,
    role: $props.role,
    class: vue.normalizeClass($setup.className),
    onClick: $setup.handleClick
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["type", "role", "class", "onClick"])), [
    [_directive_dt_ripple, $props.ripple]
  ])
}

script$9.render = render$9;
script$9.__file = "src/components/dtButton.vue";

var script$8 = {
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
    const navClass = vue.computed(() => {
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

    const containerClass = vue.computed(() => {
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

    const scrollingClass = vue.ref("navbar-scroll");

    const handleScroll = () => {
      if (window.pageYOffset > props.scrollingOffset) {
        scrollingClass.value = "navbar-scroll navbar-scrolled";
      } else {
        scrollingClass.value = "navbar-scroll";
      }
    };

    const navbar = vue.ref(null);
    const navbarFlexWrapValue = vue.ref("nowrap");
    vue.provide("navbarFlexWrapValue", navbarFlexWrapValue);

    const handleResize = () => {
      if (!navbar.value) return;

      const wrap = getComputedStyle(navbar.value).flexWrap;

      if (wrap === "nowrap") {
        navbarFlexWrapValue.value = "nowrap";
      } else if (wrap === "wrap") {
        navbarFlexWrapValue.value = "wrap";
      }
    };

    vue.onMounted(() => {
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

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.navClass),
    role: "navigation",
    ref: "navbar"
  }, {
    default: vue.withCtx(() => [
      ($props.container)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass($setup.containerClass)
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true),
      (!$props.container)
        ? vue.renderSlot(_ctx.$slots, "default", { key: 1 })
        : vue.createCommentVNode("v-if", true)
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$8.render = render$8;
script$8.__file = "src/components/dtNavbar.vue";

var script$7 = {
  name: "dtNavbarBrand",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props, { attrs }) {
    const isLink = vue.computed(() => {
      return attrs.href ? "a" : props.tag;
    });

    return {
      isLink,
      props,
    };
  },
};

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }))
}

script$7.render = render$7;
script$7.__file = "src/components/dtNavbarBrand.vue";

var script$6 = {
  name: "dtNavbarNav",
  components: { dtCollapse: script$b },
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

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$6.render = render$6;
script$6.__file = "src/components/dtNavbarNav.vue";

var script$5 = {
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
    const className = vue.computed(() => {
      return ["nav-item", !props.to && !props.href && props.active && "active"];
    });

    const linkClassName = vue.computed(() => {
      return [
        "nav-link",
        props.disabled && "disabled",
        props.active && "active",
        props.linkClass,
      ];
    });
    const tab = vue.computed(() => {
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

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");

  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      ($props.to)
        ? (vue.openBlock(), vue.createBlock(_component_router_link, {
            key: 0,
            class: vue.normalizeClass($setup.linkClassName),
            exact: $props.exact,
            to: $props.to,
            target: $setup.tab
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default")
            ]),
            _: 3 /* FORWARDED */
          }, 8 /* PROPS */, ["class", "exact", "to", "target"]))
        : ($props.href)
          ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 1,
              href: $props.href,
              class: vue.normalizeClass($setup.linkClassName),
              target: $setup.tab
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_1))
          : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$5.render = render$5;
script$5.__file = "src/components/dtNavbarItem.vue";

var script$4 = {
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
    const className = vue.computed(() => {
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

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("i", {
    class: vue.normalizeClass($setup.className)
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$4.render = render$4;
script$4.__file = "src/components/dtIcon.vue";

var script$3 = {
  name: "dtNavbarToggler",
  components: {
    dtIcon: script$4,
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
    const navTogglerClass = vue.computed(() => {
      return ["navbar-toggler", props.togglerClass];
    });

    const isExpanded = vue.ref(false);

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

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_dt_icon = vue.resolveComponent("dt-icon");

  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.navTogglerClass),
    type: "button",
    "aria-controls": $props.target,
    "aria-expanded": $setup.isExpanded,
    "aria-label": "Toggle navigation",
    onClick: $setup.handleClick
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(_component_dt_icon, {
        icon: $props.togglerIcon,
        size: $props.togglerSize,
        iconStyle: $props.iconStyle
      }, null, 8 /* PROPS */, ["icon", "size", "iconStyle"])
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class", "aria-controls", "aria-expanded", "onClick"]))
}

script$3.render = render$3;
script$3.__file = "src/components/dtNavbarToggler.vue";

var script$2 = {
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
    const className = vue.computed(() => {
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

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$2.render = render$2;
script$2.__file = "src/components/dtContainer.vue";

var script$1 = {
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
    const className = vue.computed(() => {
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

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
    class: vue.normalizeClass($setup.className)
  }, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

script$1.render = render$1;
script$1.__file = "src/components/dtRow.vue";

var script = {
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
    const className = vue.computed(() => {
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
script.__file = "src/components/dtCol.vue";

var components = {
  dtAccordion: script$c,
  dtAccordionItem: script$a,
  dtButton: script$9,
  dtNavbar: script$8,
  dtNavbarBrand: script$7,
  dtNavbarNav: script$6,
  dtNavbarItem: script$5,
  dtNavbarToggler: script$3,
  dtCollapse: script$b,
  dtIcon: script$4,
  dtContainer: script$2,
  dtRow: script$1,
  dtCol: script,
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

module.exports = dtUiKit;
