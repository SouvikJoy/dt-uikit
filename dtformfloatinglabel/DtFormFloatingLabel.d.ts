// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormFloatingLabelProps {
    label?: String | undefined;
    labelFor?: String | undefined;
}

export interface DtFormFloatingLabelSlots {

}

export declare type DtFormFloatingLabelEmits = {
}

declare class DtFormFloatingLabel extends ClassComponent<DtFormFloatingLabelProps, DtFormFloatingLabelSlots, DtFormFloatingLabelEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormFloatingLabel: GlobalComponentConstructor<DtFormFloatingLabel>
    }
}

export default DtFormFloatingLabel;
