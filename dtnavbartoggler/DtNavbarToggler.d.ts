// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtNavbarTogglerProps {
    tag?: String | 'button';
    target?: String | '#navbarSupportedContent';
    togglerClass?: String | undefined;
    togglerIcon?: String | 'bars';
    togglerSize?: String | '1x';
    iconStyle?: String | 'fas';
}

export interface DtNavbarTogglerSlots {

}

export declare type DtNavbarTogglerEmits = {
}

declare class DtNavbarToggler extends ClassComponent<DtNavbarTogglerProps, DtNavbarTogglerSlots, DtNavbarTogglerEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtNavbarToggler: GlobalComponentConstructor<DtNavbarToggler>
    }
}

export default DtNavbarToggler;
