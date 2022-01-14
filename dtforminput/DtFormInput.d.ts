// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormInputFloatingLabelProps {
    max?: String | Number | false | undefined;
    min?: String | Number | false | undefined;
    step?: String | Number | false | undefined;
    ariaInvalid?: String | Boolean | false;
    type?: String | false;
    autocomplete?: String | false;
    autofocus?: Boolean | false;
    disabled?: Boolean | false;
    form?: String | false;
    formatter?: Function | false;
    id?: String | false;
    lazy?: Boolean | false;
    lazyFormatter?: Boolean | false;
    list?: String | false;
    modelValue?: String | Number | '' | false;
    name?: String | false;
    number?: Boolean | false;
    placeholder?: String | false;
    plaintext?: Boolean | false;
    readonly?: Boolean | false;
    required?: Boolean | false;
    size?: String | false;
    state?: Boolean | null;
    trim?: Boolean | false;
}

export interface DtFormInputFloatingLabelSlots {

}

export declare type DtFormInputFloatingLabelEmits = {
}

declare class DtFormInputFloatingLabel extends ClassComponent<DtFormInputFloatingLabelProps, DtFormInputFloatingLabelSlots, DtFormInputFloatingLabelEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormInputFloatingLabel: GlobalComponentConstructor<DtFormInputFloatingLabel>
    }
}

export default DtFormInputFloatingLabel;
