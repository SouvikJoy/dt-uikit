// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtNavbarNavProps {
    tag?: String | 'ul';
    class?: String | undefined;
    right?: Boolean | false;
    center?: Boolean | false;
    vertical?: Boolean | false;
    justifyAround?: Boolean | false;
    nav?: Boolean | false;
}

export interface DtNavbarNavSlots {

}

export declare type DtNavbarNavEmits = {
}

declare class DtNavbarNav extends ClassComponent<DtNavbarNavProps, DtNavbarNavSlots, DtNavbarNavEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtNavbarNav: GlobalComponentConstructor<DtNavbarNav>
    }
}

export default DtNavbarNav;
