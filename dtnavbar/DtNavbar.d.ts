// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtNavbarProps {
    tag?: String | 'nav';
    bg?: String | undefined;
    position?: String | undefined;
    expand?: String | undefined;
    classContainer?: String | undefined;
    classNavbar?: String | undefined;
    dark?: Boolean | false;
    light?: Boolean | false;
    double?: Boolean | false;
    transparent?: Boolean | false;
    scrolling?: Boolean | false;
    center?: String | Boolean | false;
    container?: String | Boolean | false;
    scrollingoffset?: Number | 100;
}

export interface DtNavbarSlots {

}

export declare type DtNavbarEmits = {
}

declare class DtNavbar extends ClassComponent<DtNavbarProps, DtNavbarSlots, DtNavbarEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtNavbar: GlobalComponentConstructor<DtNavbar>
    }
}

export default DtNavbar;
