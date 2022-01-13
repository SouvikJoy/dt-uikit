// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtListGroupProps {
    flush?: Boolean | false;
    horizontal?: String | Boolean | false;
    disabled?: Boolean | false;
    number?: Boolean | undefined;
    tag?: String | 'ul';
}


export interface DtListGroupSlots {

}

export declare type DtListGroupEmits = {
}

declare class DtListGroup extends ClassComponent<DtListGroupProps, DtListGroupSlots, DtListGroupEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtListGroup: GlobalComponentConstructor<DtListGroup>
    }
}

export default DtListGroup ;
