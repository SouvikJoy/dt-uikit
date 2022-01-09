export default {
  innerWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  },

  width(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  },

  addClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(
        new RegExp("^|\\b" + className.split("").join("|") + "(\\b|$)", "gi"),
        " "
      );
    }
  },

  findSingle(element, selector) {
    return element.querySelector(selector);
  },
};
