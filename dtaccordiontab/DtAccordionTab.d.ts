// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtAccordionTabProps {
    header?: string | undefined;
    disabled?: boolean | undefined;
}

export interface DtAccordionTabSlots {
    default: () => VNode[];
    header: () => VNode[];
}

export declare type DtAccordionTabEmits = { }

declare class DtAccordionTab extends ClassComponent<DtAccordionTabProps, DtAccordionTabSlots, DtAccordionTabEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtAccordionTab: GlobalComponentConstructor<DtAccordionTab>
    }
}

export default DtAccordionTab;
