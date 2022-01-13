// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtContainerProps {
    tag?: String | 'div';
    sm?: Boolean | false;
    md?: Boolean | false;
    lg?: Boolean | false;
    xl?: Boolean | false;
    xxl?: Boolean | false;
    fluid?: Boolean | false;
}

export interface DtContainerSlots {

}

export declare type DtContainerEmits = {
}

declare class DtContainer extends ClassComponent<DtContainerProps, DtContainerSlots, DtContainerEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtContainer: GlobalComponentConstructor<DtContainer>
    }
}

export default DtContainer;
