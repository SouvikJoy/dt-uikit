// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtBadgeProps {
    tage?: String | 'div';
    color?: String | undefined;
    pill?: Boolean | undefined;
    dot?: Boolean | undefined;
    notification?: Boolean | undefined;
}

export interface DtBadgeSlots {

}

export declare type DtBadgeEmits = {
}

declare class DtBadge extends ClassComponent<DtBadgeProps, DtBadgeSlots, DtBadgeEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtBadge: GlobalComponentConstructor<DtBadge>
    }
}

export default DtBadge;
