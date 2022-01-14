// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormProps {
    id?: String | false;
    floating?: Boolean | false;
    novalidate?: Boolean | false;
    validated?: Boolean | false;
}

export interface DtFormSlots {

}

export declare type DtFormEmits = {
}

declare class DtForm extends ClassComponent<DtFormProps, DtFormSlots, DtFormEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtForm: GlobalComponentConstructor<DtForm>
    }
}

export default DtForm;
