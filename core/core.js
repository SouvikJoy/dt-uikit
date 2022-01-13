this.debuggervue = this.debuggervue || {};
this.debuggervue.utils = (function (exports) {
  'use strict';

  var DomHandler = {
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

    getWindowScrollTop() {
      let doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    },

    getWindowScrollLeft() {
      let doc = document.documentElement;
      return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    },

    getOuterWidth(el, margin) {
      if (el) {
        let width = el.offsetWidth;

        if (margin) {
          let style = getComputedStyle(el);
          width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
      } else {
        return 0;
      }
    },

    getOuterHeight(el, margin) {
      if (el) {
        let height = el.offsetHeight;

        if (margin) {
          let style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      } else {
        return 0;
      }
    },

    getClientHeight(el, margin) {
      if (el) {
        let height = el.clientHeight;

        if (margin) {
          let style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      } else {
        return 0;
      }
    },

    getViewport() {
      let win = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName("body")[0],
        w = win.innerWidth || e.clientWidth || g.clientWidth,
        h = win.innerHeight || e.clientHeight || g.clientHeight;

      return { width: w, height: h };
    },

    getOffset(el) {
      var rect = el.getBoundingClientRect();

      return {
        top:
          rect.top +
          (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0),
        left:
          rect.left +
          (window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0),
      };
    },

    index(element) {
      let children = element.parentNode.childNodes;
      let num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element) return num;
        if (children[i].nodeType === 1) num++;
      }
      return -1;
    },

    addMultipleClasses(element, className) {
      if (element.classList) {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.classList.add(styles[i]);
        }
      } else {
        let styles = className.split(" ");
        for (let i = 0; i < styles.length; i++) {
          element.className += " " + styles[i];
        }
      }
    },

    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },

    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },

    hasClass(element, className) {
      if (element) {
        if (element.classList) return element.classList.contains(className);
        else
          return new RegExp("(^| )" + className + "( |$)", "gi").test(
            element.className
          );
      }

      return false;
    },

    find(element, selector) {
      return element.querySelectorAll(selector);
    },

    findSingle(element, selector) {
      return element.querySelector(selector);
    },

    getHeight(el) {
      let height = el.offsetHeight;
      let style = getComputedStyle(el);

      height -=
        parseFloat(style.paddingTop) +
        parseFloat(style.paddingBottom) +
        parseFloat(style.borderTopWidth) +
        parseFloat(style.borderBottomWidth);

      return height;
    },

    getWidth(el) {
      let width = el.offsetWidth;
      let style = getComputedStyle(el);

      width -=
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth);

      return width;
    },

    absolutePosition(element, target) {
      let elementDimensions = element.offsetParent
        ? { width: element.offsetWidth, height: element.offsetHeight }
        : this.getHiddenElementDimensions(element);
      let elementOuterHeight = elementDimensions.height;
      let elementOuterWidth = elementDimensions.width;
      let targetOuterHeight = target.offsetHeight;
      let targetOuterWidth = target.offsetWidth;
      let targetOffset = target.getBoundingClientRect();
      let windowScrollTop = this.getWindowScrollTop();
      let windowScrollLeft = this.getWindowScrollLeft();
      let viewport = this.getViewport();
      let top, left;

      if (
        targetOffset.top + targetOuterHeight + elementOuterHeight >
        viewport.height
      ) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        element.style.transformOrigin = "bottom";

        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
        element.style.transformOrigin = "top";
      }

      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(
          0,
          targetOffset.left +
            windowScrollLeft +
            targetOuterWidth -
            elementOuterWidth
        );
      else left = targetOffset.left + windowScrollLeft;

      element.style.top = top + "px";
      element.style.left = left + "px";
    },

    relativePosition(element, target) {
      let elementDimensions = element.offsetParent
        ? { width: element.offsetWidth, height: element.offsetHeight }
        : this.getHiddenElementDimensions(element);
      const targetHeight = target.offsetHeight;
      const targetOffset = target.getBoundingClientRect();
      const viewport = this.getViewport();
      let top, left;

      if (
        targetOffset.top + targetHeight + elementDimensions.height >
        viewport.height
      ) {
        top = -1 * elementDimensions.height;
        element.style.transformOrigin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
        element.style.transformOrigin = "top";
      }

      if (elementDimensions.width > viewport.width) {
        // element wider then viewport and cannot fit on screen (align at left side of viewport)
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        // element wider then viewport but can be fit on screen (align at right side of viewport)
        left =
          (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        // element fits on screen (align with target)
        left = 0;
      }

      element.style.top = top + "px";
      element.style.left = left + "px";
    },

    getParents(element, parents = []) {
      return element["parentNode"] === null
        ? parents
        : this.getParents(
            element.parentNode,
            parents.concat([element.parentNode])
          );
    },

    getScrollableParents(element) {
      let scrollableParents = [];

      if (element) {
        let parents = this.getParents(element);
        const overflowRegex = /(auto|scroll)/;
        const overflowCheck = (node) => {
          let styleDeclaration = window["getComputedStyle"](node, null);
          return (
            overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) ||
            overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) ||
            overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"))
          );
        };

        for (let parent of parents) {
          let scrollSelectors =
            parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            let selectors = scrollSelectors.split(",");
            for (let selector of selectors) {
              let el = this.findSingle(parent, selector);
              if (el && overflowCheck(el)) {
                scrollableParents.push(el);
              }
            }
          }

          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      }

      return scrollableParents;
    },

    getHiddenElementOuterHeight(element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";

      return elementHeight;
    },

    getHiddenElementOuterWidth(element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      let elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";

      return elementWidth;
    },

    getHiddenElementDimensions(element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";

      return dimensions;
    },

    fadeIn(element, duration) {
      element.style.opacity = 0;

      var last = +new Date();
      var opacity = 0;
      var tick = function () {
        opacity =
          +element.style.opacity + (new Date().getTime() - last) / duration;
        element.style.opacity = opacity;
        last = +new Date();

        if (+opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
            setTimeout(tick, 16);
        }
      };

      tick();
    },

    fadeOut(element, ms) {
      var opacity = 1,
        interval = 50,
        duration = ms,
        gap = interval / duration;

      let fading = setInterval(() => {
        opacity -= gap;

        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }

        element.style.opacity = opacity;
      }, interval);
    },

    getUserAgent() {
      return navigator.userAgent;
    },

    appendChild(element, target) {
      if (this.isElement(target)) target.appendChild(element);
      else if (target.el && target.elElement)
        target.elElement.appendChild(element);
      else throw new Error("Cannot append " + target + " to " + element);
    },

    scrollInView(container, item) {
      let borderTopValue =
        getComputedStyle(container).getPropertyValue("borderTopWidth");
      let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
      let paddingTopValue =
        getComputedStyle(container).getPropertyValue("paddingTop");
      let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
      let containerRect = container.getBoundingClientRect();
      let itemRect = item.getBoundingClientRect();
      let offset =
        itemRect.top +
        document.body.scrollTop -
        (containerRect.top + document.body.scrollTop) -
        borderTop -
        paddingTop;
      let scroll = container.scrollTop;
      let elementHeight = container.clientHeight;
      let itemHeight = this.getOuterHeight(item);

      if (offset < 0) {
        container.scrollTop = scroll + offset;
      } else if (offset + itemHeight > elementHeight) {
        container.scrollTop = scroll + offset - elementHeight + itemHeight;
      }
    },

    clearSelection() {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (
          window.getSelection().removeAllRanges &&
          window.getSelection().rangeCount > 0 &&
          window.getSelection().getRangeAt(0).getClientRects().length > 0
        ) {
          window.getSelection().removeAllRanges();
        }
      } else if (document["selection"] && document["selection"].empty) {
        try {
          document["selection"].empty();
        } catch (error) {
          //ignore IE bug
        }
      }
    },

    calculateScrollbarWidth() {
      if (this.calculatedScrollbarWidth != null)
        return this.calculatedScrollbarWidth;

      let scrollDiv = document.createElement("div");
      scrollDiv.className = "p-scrollbar-measure";
      document.body.appendChild(scrollDiv);

      let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);

      this.calculatedScrollbarWidth = scrollbarWidth;

      return scrollbarWidth;
    },

    getBrowser() {
      if (!this.browser) {
        let matched = this.resolveUserAgent();
        this.browser = {};

        if (matched.browser) {
          this.browser[matched.browser] = true;
          this.browser["version"] = matched.version;
        }

        if (this.browser["chrome"]) {
          this.browser["webkit"] = true;
        } else if (this.browser["webkit"]) {
          this.browser["safari"] = true;
        }
      }

      return this.browser;
    },

    resolveUserAgent() {
      let ua = navigator.userAgent.toLowerCase();
      let match =
        /(chrome)[ ]([\w.]+)/.exec(ua) ||
        /(webkit)[ ]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf("compatible") < 0 &&
          /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [];

      return {
        browser: match[1] || "",
        version: match[2] || "0",
      };
    },

    isVisible(element) {
      return element.offsetParent != null;
    },

    invokeElementMethod(element, methodName, args) {
      element[methodName].apply(element, args);
    },

    getFocusableElements(element) {
      let focusableElements = this.find(
        element,
        `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`
      );

      let visibleFocusableElements = [];
      for (let focusableElement of focusableElements) {
        if (
          getComputedStyle(focusableElement).display != "none" &&
          getComputedStyle(focusableElement).visibility != "hidden"
        )
          visibleFocusableElements.push(focusableElement);
      }

      return visibleFocusableElements;
    },

    getFirstFocusableElement(element) {
      const focusableElements = this.getFocusableElements(element);
      return focusableElements.length > 0 ? focusableElements[0] : null;
    },

    isClickable(element) {
      const targetNode = element.nodeName;
      const parentNode = element.parentElement && element.parentElement.nodeName;

      return (
        targetNode == "INPUT" ||
        targetNode == "BUTTON" ||
        targetNode == "A" ||
        parentNode == "INPUT" ||
        parentNode == "BUTTON" ||
        parentNode == "A" ||
        this.hasClass(element, "p-button") ||
        this.hasClass(element.parentElement, "p-button") ||
        this.hasClass(element.parentElement, "p-checkbox") ||
        this.hasClass(element.parentElement, "p-radiobutton")
      );
    },

    applyStyle(element, style) {
      if (typeof style === "string") {
        element.style.cssText = this.style;
      } else {
        for (let prop in this.style) {
          element.style[prop] = style[prop];
        }
      }
    },

    isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
    },

    isAndroid() {
      return /(android)/i.test(navigator.userAgent);
    },

    isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },

    exportCSV(csv, filename) {
      let blob = new Blob([csv], {
        type: "application/csv;charset=utf-8;",
      });

      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename + ".csv");
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          link.setAttribute("href", URL.createObjectURL(blob));
          link.setAttribute("download", filename + ".csv");
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          csv = "data:text/csv;charset=utf-8," + csv;
          window.open(encodeURI(csv));
        }
      }
    },
  };

  class ConnectedOverlayScrollHandler {
    constructor(element, listener = () => {}) {
      this.element = element;
      this.listener = listener;
    }

    bindScrollListener() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }

    unbindScrollListener() {
      if (this.scrollableParents) {
        for (let i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }

    destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }

  var ObjectUtils = {
    equals(obj1, obj2, field) {
      if (field)
        return (
          this.resolveFieldData(obj1, field) ===
          this.resolveFieldData(obj2, field)
        );
      else return this.deepEquals(obj1, obj2);
    },

    deepEquals(a, b) {
      if (a === b) return true;

      if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = Array.isArray(a),
          arrB = Array.isArray(b),
          i,
          length,
          key;

        if (arrA && arrB) {
          length = a.length;
          if (length !== b.length) return false;
          for (i = length; i-- !== 0; )
            if (!this.deepEquals(a[i], b[i])) return false;
          return true;
        }

        if (arrA !== arrB) return false;

        var dateA = a instanceof Date,
          dateB = b instanceof Date;
        if (dateA !== dateB) return false;
        if (dateA && dateB) return a.getTime() === b.getTime();

        var regexpA = a instanceof RegExp,
          regexpB = b instanceof RegExp;
        if (regexpA !== regexpB) return false;
        if (regexpA && regexpB) return a.toString() === b.toString();

        var keys = Object.keys(a);
        length = keys.length;

        if (length !== Object.keys(b).length) return false;

        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = length; i-- !== 0; ) {
          key = keys[i];
          if (!this.deepEquals(a[key], b[key])) return false;
        }

        return true;
      }

      return a !== a && b !== b;
    },

    resolveFieldData(data, field) {
      if (data && Object.keys(data).length && field) {
        if (this.isFunction(field)) {
          return field(data);
        } else if (field.indexOf(".") === -1) {
          return data[field];
        } else {
          let fields = field.split(".");
          let value = data;
          for (var i = 0, len = fields.length; i < len; ++i) {
            if (value == null) {
              return null;
            }
            value = value[fields[i]];
          }
          return value;
        }
      } else {
        return null;
      }
    },

    isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },

    filter(value, fields, filterValue) {
      var filteredItems = [];

      if (value) {
        for (let item of value) {
          for (let field of fields) {
            if (
              String(this.resolveFieldData(item, field))
                .toLowerCase()
                .indexOf(filterValue.toLowerCase()) > -1
            ) {
              filteredItems.push(item);
              break;
            }
          }
        }
      }

      return filteredItems;
    },

    reorderArray(value, from, to) {
      let target;
      if (value && from !== to) {
        if (to >= value.length) {
          target = to - value.length;
          while (target-- + 1) {
            value.push(undefined);
          }
        }
        value.splice(to, 0, value.splice(from, 1)[0]);
      }
    },

    findIndexInList(value, list) {
      let index = -1;

      if (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i] === value) {
            index = i;
            break;
          }
        }
      }

      return index;
    },

    contains(value, list) {
      if (value != null && list && list.length) {
        for (let val of list) {
          if (this.equals(value, val)) return true;
        }
      }

      return false;
    },

    insertIntoOrderedArray(item, index, arr, sourceArr) {
      if (arr.length > 0) {
        let injected = false;
        for (let i = 0; i < arr.length; i++) {
          let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
          if (currentItemIndex > index) {
            arr.splice(i, 0, item);
            injected = true;
            break;
          }
        }

        if (!injected) {
          arr.push(item);
        }
      } else {
        arr.push(item);
      }
    },

    removeAccents(str) {
      if (str && str.search(/[\xC0-\xFF]/g) > -1) {
        str = str
          .replace(/[\xC0-\xC5]/g, "A")
          .replace(/[\xC6]/g, "AE")
          .replace(/[\xC7]/g, "C")
          .replace(/[\xC8-\xCB]/g, "E")
          .replace(/[\xCC-\xCF]/g, "I")
          .replace(/[\xD0]/g, "D")
          .replace(/[\xD1]/g, "N")
          .replace(/[\xD2-\xD6\xD8]/g, "O")
          .replace(/[\xD9-\xDC]/g, "U")
          .replace(/[\xDD]/g, "Y")
          .replace(/[\xDE]/g, "P")
          .replace(/[\xE0-\xE5]/g, "a")
          .replace(/[\xE6]/g, "ae")
          .replace(/[\xE7]/g, "c")
          .replace(/[\xE8-\xEB]/g, "e")
          .replace(/[\xEC-\xEF]/g, "i")
          .replace(/[\xF1]/g, "n")
          .replace(/[\xF2-\xF6\xF8]/g, "o")
          .replace(/[\xF9-\xFC]/g, "u")
          .replace(/[\xFE]/g, "p")
          .replace(/[\xFD\xFF]/g, "y");
      }

      return str;
    },

    getVNodeProp(vnode, prop) {
      let props = vnode.props;
      if (props) {
        let kebapProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        let propName = Object.prototype.hasOwnProperty.call(props, kebapProp)
          ? kebapProp
          : prop;

        return vnode.type.props[prop].type === Boolean && props[propName] === ""
          ? true
          : props[propName];
      }

      return null;
    },

    isEmpty(value) {
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (!(value instanceof Date) &&
          typeof value === "object" &&
          Object.keys(value).length === 0)
      );
    },

    isNotEmpty(value) {
      return !this.isEmpty(value);
    },
  };

  function handler() {
    let zIndexes = [];

    const generateZIndex = (key, baseZIndex) => {
      let lastZIndex =
        zIndexes.length > 0
          ? zIndexes[zIndexes.length - 1]
          : { key, value: baseZIndex };
      let newZIndex =
        lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;

      zIndexes.push({ key, value: newZIndex });
      return newZIndex;
    };

    const revertZIndex = (zIndex) => {
      zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
    };

    const getCurrentZIndex = () => {
      return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
    };

    const getZIndex = (el) => {
      return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
    };

    return {
      get: getZIndex,
      set: (key, el, baseZIndex) => {
        if (el) {
          el.style.zIndex = String(generateZIndex(key, baseZIndex));
        }
      },
      clear: (el) => {
        if (el) {
          revertZIndex(getZIndex(el));
          el.style.zIndex = "";
        }
      },
      getCurrent: () => getCurrentZIndex(),
    };
  }

  var ZIndexUtils = handler();

  let lastId = 0;

  function UniqueComponentId (prefix = "dv_id_") {
    lastId++;
    return `${prefix}${lastId}`;
  }

  function debuggerbus() {
    const allHandlers = new Map();

    return {
      on(type, handler) {
        let handlers = allHandlers.get(type);
        if (!handlers) handlers = [handler];
        else handlers.push(handler);

        allHandlers.set(type, handlers);
      },

      off(type, handler) {
        let handlers = allHandlers.get(type);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },

      emit(type, evt) {
        let handlers = allHandlers.get(type);
        if (handlers) {
          handlers.slice().map((handler) => {
            handler(evt);
          });
        }
      },
    };
  }

  exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
  exports.DomHandler = DomHandler;
  exports.EventBus = debuggerbus;
  exports.ObjectUtils = ObjectUtils;
  exports.UniqueComponentId = UniqueComponentId;
  exports.ZIndexUtils = ZIndexUtils;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

this.debuggervue = this.debuggervue || {};
this.debuggervue.api = (function (exports) {
  'use strict';

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

  exports.FilterMatchMode = FilterMatchMode;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

this.debuggervue = this.debuggervue || {};
this.debuggervue.config = (function (exports, vue) {
  'use strict';

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

  function render$d(_ctx, _cache, $props, $setup, $data, $options) {
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

  function render$c(_ctx, _cache, $props, $setup, $data, $options) {
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

  const _hoisted_1$3 = ["aria-controls"];

  function render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_DtCollapse = vue.resolveComponent("DtCollapse");

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
          }, vue.toDisplayString($props.headerTitle), 11 /* TEXT, CLASS, PROPS */, _hoisted_1$3)
        ], 2 /* CLASS */),
        vue.createVNode(_component_DtCollapse, {
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
    return (vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(`dt-card-content type-${this.type}`)
    }, [
      vue.createElementVNode("div", _hoisted_1$2, [
        (_ctx.$slots.img)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
              vue.renderSlot(_ctx.$slots, "img"),
              (_ctx.$slots.interactions)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$1, [
                    vue.createElementVNode("span", null, [
                      vue.renderSlot(_ctx.$slots, "interactions")
                    ])
                  ]))
                : vue.createCommentVNode("v-if", true)
            ]))
          : vue.createCommentVNode("v-if", true),
        (_ctx.$slots.text)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$1, [
              (_ctx.$slots.title)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$1, [
                    vue.createElementVNode("h3", null, [
                      vue.renderSlot(_ctx.$slots, "title")
                    ])
                  ]))
                : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("p", null, [
                vue.renderSlot(_ctx.$slots, "text")
              ])
            ]))
          : vue.createCommentVNode("v-if", true)
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
      const toggle = vue.ref(props.toggle);
      const className = vue.computed(() => {
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
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
      type: $props.type,
      role: $props.role,
      class: vue.normalizeClass($setup.className),
      onClick: $setup.handleClick
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
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
    return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
      (_ctx.$slots.header)
        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "header")
          ]))
        : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("div", _hoisted_3, [
        (_ctx.$slots.title)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
              vue.renderSlot(_ctx.$slots, "title")
            ]))
          : vue.createCommentVNode("v-if", true),
        (_ctx.$slots.subtitle)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
              vue.renderSlot(_ctx.$slots, "subtitle")
            ]))
          : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("div", _hoisted_6, [
          vue.renderSlot(_ctx.$slots, "content")
        ]),
        (_ctx.$slots.footer)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
              vue.renderSlot(_ctx.$slots, "footer")
            ]))
          : vue.createCommentVNode("v-if", true)
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

  function render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.tag), {
      class: vue.normalizeClass($setup.className)
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
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

  function render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("i", {
      class: vue.normalizeClass($setup.className)
    }, [
      vue.renderSlot(_ctx.$slots, "default")
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

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
      const isLink = vue.computed(() => {
        return attrs.href ? "a" : props.tag;
      });

      return {
        isLink,
        props,
      };
    },
  };

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($setup.isLink), { class: "navbar-brand" }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
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

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
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

  function render(_ctx, _cache, $props, $setup, $data, $options) {
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

  script.render = render;
  script.__file = "src/components/dtnavbartoggler/DtNavbarToggler.vue";

  var DtNavbar = {
    DtNavbar: script$4,
    DtNavbarBrand: script$3,
    DtNavbarNav: script$2,
    DtNavbarItem: script$1,
    DtNavbarToggler: script,
  };

  //const plugins = [DtNavbarPlugin];

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
    DtNavbar,
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
    const DebuggerVue = vue.inject(DebuggerVueSymbol);
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
      config: vue.reactive(configOptions),
    };

    components.forEach((component) => {
      app.component(component.name, component);
    });

    app.config.globalProperties.$debuggervue = DebuggerVue;
    app.provide(DebuggerVueSymbol, DebuggerVue);
  };

  var DebuggerVue = { install };

  exports.DtAccordion = script$d;
  exports.DtAccordionTab = script$b;
  exports.DtAnimatedCard = script$a;
  exports.DtButton = script$9;
  exports.DtCard = script$8;
  exports.DtCollapse = script$c;
  exports.DtColumn = script$6;
  exports.DtContainer = script$7;
  exports.DtIcon = script$5;
  exports.DtNavbar = DtNavbar;
  exports["default"] = DebuggerVue;
  exports.install = install;
  exports.useDebuggerVue = useDebuggerVue;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, Vue);

