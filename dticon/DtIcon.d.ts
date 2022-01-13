// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtIconProps {
    iconStyle?: String | 'fas';
    icon?: String | undefined;
    flag?: String | undefined;
    size?: String | undefined;
}

export interface DtIconSlots {

}

export declare type DtIconEmits = {
}

declare class DtIcon extends ClassComponent<DtIconProps, DtIconSlots, DtIconEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtIcon: GlobalComponentConstructor<DtIcon>
    }
}

export default DtIcon;
