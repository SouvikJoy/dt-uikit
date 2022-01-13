// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtColumnProps {
    tag?: String | 'div';
    col?: String | undefined;
    sm?: String | undefined;
    md?: String | undefined;
    lg?: String | undefined;
    xl?: String | undefined;
    offset?: String | undefined;
    offsetSm?: String | undefined;
    offsetMd?: String | undefined;
    offsetLg?: String | undefined;
    offsetXl?: String | undefined;
    auto?: Boolean | false;
}

export interface DtColumnSlots {

}

export declare type DtColumnEmits = {
}

declare class DtColumn extends ClassComponent<DtColumnProps, DtColumnSlots, DtColumnEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtColumn: GlobalComponentConstructor<DtColumn>
    }
}

export default DtColumn;
