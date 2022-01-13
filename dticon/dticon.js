this.debuggervue = this.debuggervue || {};
this.debuggervue.dticon = (function (vue) {
  'use strict';

  var script = {
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

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("i", {
      class: vue.normalizeClass($setup.className)
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */))
  }

  script.render = render;
  script.__file = "src/components/dticon/DtIcon.vue";

  return script;

})(Vue);
