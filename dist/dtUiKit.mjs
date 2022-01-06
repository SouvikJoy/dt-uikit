import dtAccordion from '@/components/dtAccordion.vue';
import dtAccordionItem from '@/components/dtAccordionItem.vue';
import dtButton from '@/components/dtButton.vue';
import dtNavbar from '@/components/dtNavbar.vue';
import dtNavbarBrand from '@/components/dtNavbarBrand.vue';
import dtNavbarNav from '@/components/dtNavbarNav.vue';
import dtCollapse from '@/components/dtCollapse.vue';
import dtNavbarItem from '@/components/dtNavbarItem.vue';
import dtNavbarToggler from '@/components/dtNavbarToggler.vue';
import dtContainer from '@/components/dtContainer.vue';
import dtRow from '@/components/dtRow.vue';
import dtCol from '@/components/dtCol.vue';
import dtIcon from '@/components/dtIcon.vue';

var components = {
  dtAccordion,
  dtAccordionItem,
  dtButton,
  dtNavbar,
  dtNavbarBrand,
  dtNavbarNav,
  dtNavbarItem,
  dtNavbarToggler,
  dtCollapse,
  dtIcon,
  dtContainer,
  dtRow,
  dtCol,
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
