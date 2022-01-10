// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface CollapseTabOpenEvent {
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
 * @extends {CollapseTabOpenEvent}
 */
export interface CollapseCloseEvent extends CollapseTabOpenEvent { }

export interface CollapseProps {
    /**
     * When enabled, multiple tabs can be activated at the same time.
     */
    tag?: String | 'div';
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     */
    modelValue?: String | undefined;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     */
    duration?: number | 300;
    /**
     * When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css.
     */
    stayOpen?: boolean | undefined;
    /**
     * When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css.
     */
    sidenav?: boolean | undefined;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     */
    collapseClass?: String | undefined;
}

export interface CollapseSlots {
    /**
     * Default slot to detect CollapseTab components.
     */
    default: () => VNode[];
}

export declare type CollapseEmits = {
    /**
     * Emitted when the active tab changes.
     * @param {number | undefined} value - Index of new active tab.
     */
    'update:modelValue': (value: number | undefined) => void;
}

declare class Collapse extends ClassComponent<CollapseProps, CollapseSlots, CollapseEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        Collapse: GlobalComponentConstructor<Collapse>
    }
}

/**
 *
 * Collapse groups a collection of contents in tabs.
 *
 * Helper Components:
 *
 * - CollapseTab
 *
 * Demos:
 *
 * - [Collapse](https://www.primefaces.org/primevue/showcase/#/accordion)
 *
 */
export default Collapse;
