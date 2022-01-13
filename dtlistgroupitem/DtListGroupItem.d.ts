// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtListGroupItemProps {
    active?: Boolean | false;
    action?: Boolean | false;
    disabled?: Boolean | false;
    number?: Boolean | undefined;
    tag?: String | 'li';
    color?: String | undefined;
}

export declare type DtListGroupItemEmits = {
}

export interface DtListGroupItemSlots {

}


declare class DtListGroupItem extends ClassComponent<DtListGroupItemProps, DtListGroupItemSlots, DtListGroupItemEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtListGroupItem: GlobalComponentConstructor<DtListGroupItem>
    }
}

export default DtListGroupItem ;
