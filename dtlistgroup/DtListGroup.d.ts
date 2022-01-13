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

export interface DtListGroupItemProps {
    active?: Boolean | false;
    action?: Boolean | false;
    disabled?: Boolean | false;
    number?: Boolean | undefined;
    tag?: String | 'li';
    color?: String | undefined;
}

export interface DtListGroupSlots {

}

export declare type DtListGroupEmits = {
}


export declare type DtListGroupItemEmits = {
}

export interface DtListGroupItemSlots {

}

declare class DtListGroup extends ClassComponent<DtListGroupProps, DtListGroupSlots, DtListGroupEmits> { }


declare class DtListGroupItem extends ClassComponent<DtListGroupItemProps, DtListGroupItemSlots, DtListGroupItemEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtListGroup: GlobalComponentConstructor<DtListGroup>
        DtListGroupItem: GlobalComponentConstructor<DtListGroupItem>
    }
}

export {DtListGroup, DtListGroupItem} ;
