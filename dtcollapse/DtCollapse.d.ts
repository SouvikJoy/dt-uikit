// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtCollapseTabOpenEvent {
    originalEvent: MouseEvent;
    index: number;
}

export interface DtCollapseCloseEvent extends DtCollapseTabOpenEvent { }

export interface DtCollapseProps {
    tag?: String | 'div';
    modelValue?: String | undefined;
    duration?: number | 300;
    stayOpen?: boolean | undefined;
    sidenav?: boolean | undefined;
    collapseClass?: String | undefined;
}

export interface DtCollapseSlots {
    default: () => VNode[];
}

export declare type DtCollapseEmits = {
    'update:modelValue': (value: number | undefined) => void;
}

declare class DtCollapse extends ClassComponent<DtCollapseProps, DtCollapseSlots, DtCollapseEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtCollapse: GlobalComponentConstructor<DtCollapse>
    }
}

export default DtCollapse;
