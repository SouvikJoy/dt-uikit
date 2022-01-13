// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtNavbarBrandProps {
    tag?: String | 'div';
}

export interface DtNavbarBrandSlots {

}

export declare type DtNavbarBrandEmits = {
}

declare class DtNavbarBrand extends ClassComponent<DtNavbarBrandProps, DtNavbarBrandSlots, DtNavbarBrandEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtNavbarBrand: GlobalComponentConstructor<DtNavbarBrand>
    }
}

export default DtNavbarBrand;
