// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface AccordionTabOpenEvent {
    /**
     * Browser mouse event.
     * @type {MouseEvent}
     */
    originalEvent: MouseEvent;
    /**
     * Opened tab index.
     */
    index: number;
}

/**
 * @extends {AccordionTabOpenEvent}
 */
export interface AccordionTabCloseEvent extends AccordionTabOpenEvent { }

export interface AccordionProps {
    /**
     * When enabled, multiple tabs can be activated at the same time.
     */
    tag?: String | 'div';
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     */
    modelValue?: String | undefined;
    /**
     * When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css.
     */
    stayOpen?: boolean | undefined;
    /**
     * When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css.
     */
    flush?: boolean | undefined;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     */
    classes?: String | undefined;
}

export interface AccordionSlots {
    /**
     * Default slot to detect AccordionTab components.
     */
    default: () => VNode[];
}

export declare type AccordionEmits = {
    /**
     * Emitted when the active tab changes.
     * @param {number | undefined} value - Index of new active tab.
     */
    'update:modelValue': (value: number | undefined) => void;
}

declare class Accordion extends ClassComponent<AccordionProps, AccordionSlots, AccordionEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        Accordion: GlobalComponentConstructor<Accordion>
    }
}

/**
 *
 * Accordion groups a collection of contents in tabs.
 *
 * Helper Components:
 *
 * - AccordionTab
 *
 * Demos:
 *
 * - [Accordion](https://www.primefaces.org/primevue/showcase/#/accordion)
 *
 */
export default Accordion;
