'use strict';

var dtAccordion = require('@/components/dtAccordion.vue');
var dtAccordionItem = require('@/components/dtAccordionItem.vue');
var dtButton = require('@/components/dtButton.vue');
var dtNavbar = require('@/components/dtNavbar.vue');
var dtNavbarBrand = require('@/components/dtNavbarBrand.vue');
var dtNavbarNav = require('@/components/dtNavbarNav.vue');
var dtCollapse = require('@/components/dtCollapse.vue');
var dtNavbarItem = require('@/components/dtNavbarItem.vue');
var dtNavbarToggler = require('@/components/dtNavbarToggler.vue');
var dtContainer = require('@/components/dtContainer.vue');
var dtRow = require('@/components/dtRow.vue');
var dtCol = require('@/components/dtCol.vue');
var dtIcon = require('@/components/dtIcon.vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dtAccordion__default = /*#__PURE__*/_interopDefaultLegacy(dtAccordion);
var dtAccordionItem__default = /*#__PURE__*/_interopDefaultLegacy(dtAccordionItem);
var dtButton__default = /*#__PURE__*/_interopDefaultLegacy(dtButton);
var dtNavbar__default = /*#__PURE__*/_interopDefaultLegacy(dtNavbar);
var dtNavbarBrand__default = /*#__PURE__*/_interopDefaultLegacy(dtNavbarBrand);
var dtNavbarNav__default = /*#__PURE__*/_interopDefaultLegacy(dtNavbarNav);
var dtCollapse__default = /*#__PURE__*/_interopDefaultLegacy(dtCollapse);
var dtNavbarItem__default = /*#__PURE__*/_interopDefaultLegacy(dtNavbarItem);
var dtNavbarToggler__default = /*#__PURE__*/_interopDefaultLegacy(dtNavbarToggler);
var dtContainer__default = /*#__PURE__*/_interopDefaultLegacy(dtContainer);
var dtRow__default = /*#__PURE__*/_interopDefaultLegacy(dtRow);
var dtCol__default = /*#__PURE__*/_interopDefaultLegacy(dtCol);
var dtIcon__default = /*#__PURE__*/_interopDefaultLegacy(dtIcon);

var components = {
  dtAccordion: dtAccordion__default["default"],
  dtAccordionItem: dtAccordionItem__default["default"],
  dtButton: dtButton__default["default"],
  dtNavbar: dtNavbar__default["default"],
  dtNavbarBrand: dtNavbarBrand__default["default"],
  dtNavbarNav: dtNavbarNav__default["default"],
  dtNavbarItem: dtNavbarItem__default["default"],
  dtNavbarToggler: dtNavbarToggler__default["default"],
  dtCollapse: dtCollapse__default["default"],
  dtIcon: dtIcon__default["default"],
  dtContainer: dtContainer__default["default"],
  dtRow: dtRow__default["default"],
  dtCol: dtCol__default["default"],
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
