// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormRowProps {
    tag?: String | 'div';
}

export interface DtFormRowSlots {

}

export declare type DtFormRowEmits = {
}

declare class DtFormRow extends ClassComponent<DtFormRowProps, DtFormRowSlots, DtFormRowEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormRow: GlobalComponentConstructor<DtFormRow>
    }
}

export default DtFormRow;
