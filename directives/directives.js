this.debuggervue = this.debuggervue || {};
this.debuggervue.directives = (function (bootstrap) {
  'use strict';

  function resolveTrigger(modifiers) {
    if (modifiers.manual) {
      return "manual";
    }

    const trigger = [];

    if (modifiers.click) {
      trigger.push("click");
    }

    if (modifiers.hover) {
      trigger.push("hover");
    }

    if (modifiers.focus) {
      trigger.push("focus");
    }

    if (trigger.length > 0) {
      return trigger.join(" ");
    }

    return "hover focus";
  }

  function resolvePlacement(modifiers) {
    if (modifiers.left) {
      return "left";
    }

    if (modifiers.right) {
      return "right";
    }

    if (modifiers.bottom) {
      return "bottom";
    }

    return "top";
  }

  const DtTooltip = {
    beforeMount(el, binding) {
      el.setAttribute("data-bs-toggle", "tooltip");

      const isHtml = /<("[^"]*"|'[^']*'|[^'">])*>/.test(el.title);
      const trigger = resolveTrigger(binding.modifiers);
      const placement = resolvePlacement(binding.modifiers);

      new bootstrap.Tooltip(el, {
        trigger,
        placement,
        html: isHtml,
      });
    },
    updated(el) {
      const title = el.getAttribute("title");

      if (title !== "") {
        const instance = bootstrap.Tooltip.getInstance(el);
        instance.hide();
        el.setAttribute("data-bs-original-title", title || "");
        el.setAttribute("title", "");
      }
    },
    unmounted(el) {
      const instance = bootstrap.Tooltip.getInstance(el);
      instance.dispose();
    },
  };

  var Directive = { DtTooltip };

  return Directive;

})(bootstrap);
