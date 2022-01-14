// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormInputValidFeedbackProps {
    id?: String | false;
    floating?: Boolean | false;
    novalidate?: Boolean | false;
    validated?: Boolean | false;
}

export interface DtFormInputValidFeedbackSlots {

}

export declare type DtFormInputValidFeedbackEmits = {
}

declare class DtFormInputValidFeedback extends ClassComponent<DtFormInputValidFeedbackProps, DtFormInputValidFeedbackSlots, DtFormInputValidFeedbackEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormInputValidFeedback: GlobalComponentConstructor<DtFormInputValidFeedback>
    }
}

export default DtFormInputValidFeedback;
