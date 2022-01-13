// @ts-ignore
import { VNode } from "vue";
import { ClassComponent, GlobalComponentConstructor } from "../ts-helpers";

export interface DtButtonProps {
    tag?: string | "button";
    type?: string | "button";
    role?: string | "button";
    block?: Boolean | false;
    pill?: Boolean | false;
    variant?: string | "btn-secondary";
    size?: string | undefined;
    rounded?: Boolean | false;
    floating?: Boolean | false;
    toggler?: Boolean | false;
    toggle?: Boolean | false;
    picker?: Boolean | false;
}
export interface DtButtonSlots {}

export declare type DtButtonEmits = {}

declare class DtButton extends ClassComponent<DtButtonProps, DtButtonSlots, DtButtonEmits> {

}

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtButton: GlobalComponentConstructor<DtButton>
    }
}

export default DtButton;
