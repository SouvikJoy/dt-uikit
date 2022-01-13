// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtRowProps {
    tag?: String | 'div';
    cols?: String | Boolean | undefined;
    start?: Boolean | false;
    end?: Boolean | false;
    center?: Boolean | false;
    between?: Boolean | false;
    around?: Boolean | false;
}

export interface DtRowSlots {

}

export declare type DtRowEmits = {
}

declare class DtRow extends ClassComponent<DtRowProps, DtRowSlots, DtRowEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtRow: GlobalComponentConstructor<DtRow>
    }
}

export default DtRow;
