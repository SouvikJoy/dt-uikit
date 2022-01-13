// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtNavbarItemProps {
    tag?: String | 'li';
    active?: Boolean | false;
    disabled?: Boolean | undefined;
    exact?: Boolean | false;
    newTab?: Boolean | false;
    to?: String | Boolean | false;
    href?: String | undefined;
    linkClass?: String | undefined;
}

export interface DtNavbarItemSlots {

}

export declare type DtNavbarItemEmits = {
}

declare class DtNavbarItem extends ClassComponent<DtNavbarItemProps, DtNavbarItemSlots, DtNavbarItemEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtNavbarItem: GlobalComponentConstructor<DtNavbarItem>
    }
}

export default DtNavbarItem;
