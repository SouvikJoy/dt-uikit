// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtAccordionTabOpenEvent {
    originalEvent: MouseEvent;
    index: number;
}

export interface DtAccordionTabCloseEvent extends DtAccordionTabOpenEvent { }

export interface DtAccordionProps {
    tag?: String | 'div';
    modelValue?: String | undefined;
    stayOpen?: boolean | undefined;
    flush?: boolean | undefined;
    classes?: String | undefined;
}

export interface DtAccordionSlots {
    default: () => VNode[];
}

export declare type DtAccordionEmits = {
    'update:modelValue': (value: number | undefined) => void;
}

declare class DtAccordion extends ClassComponent<DtAccordionProps, DtAccordionSlots, DtAccordionEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtAccordion: GlobalComponentConstructor<DtAccordion>
    }
}

export default DtAccordion;
