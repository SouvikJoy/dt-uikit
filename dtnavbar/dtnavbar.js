this.debuggervue = this.debuggervue || {};
this.debuggervue.dtnavbar = (function (vue) {
  'use strict';

  var script = {
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

  function render(_ctx, _cache, $props, $setup, $data, $options) {
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

  script.render = render;
  script.__file = "src/components/dtnavbar/DtNavbar.vue";

  return script;

})(Vue);
