// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtSpinnerProps {
    tag?: String | 'div';
    color?: String | undefined;
    size?: String | undefined;
    grow?: Boolean | false;
}

export interface DtSpinnerSlots {

}

export declare type DtSpinnerEmits = {
}

declare class DtSpinner extends ClassComponent<DtSpinnerProps, DtSpinnerSlots, DtSpinnerEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtSpinner: GlobalComponentConstructor<DtSpinner>
    }
}

export default DtSpinner;
