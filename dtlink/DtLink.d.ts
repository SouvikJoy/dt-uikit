// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtLinkProps {
    active?: Boolean | false;
    append?: Boolean | false;
    disabled?: Boolean | false;
    exact?: Boolean | false;
    replace?: Boolean | false;
    activeClass?: String | 'router-link-active';
    exactActiveClass?: String | 'router-link-exact-active';
    routerComponentName?: String | 'router-link';
    routerTag?: String | 'a';
    href?: String | undefined;
    rel?: String | null;
    target?: String | '_self';
    to?: String | Object | null;
}

export interface DtLinkSlots {

}

export declare type DtLinkEmits = {
}

declare class DtLink extends ClassComponent<DtLinkProps, DtLinkSlots, DtLinkEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtLink: GlobalComponentConstructor<DtLink>
    }
}

export default DtLink;
