// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormInputInvalidFeedbackProps {
    ariaLive?: String | false;
    id?: String | false;
    role?: String | false;
    state?: String | undefined;
    forceShow?: Boolean | false;
    tooltip?: Boolean | false;
    tag?: String | 'div';
    validated?: Boolean | false;
}

export interface DtFormInputInvalidFeedbackSlots {

}

export declare type DtFormInputInvalidFeedbackEmits = {
}

declare class DtFormInputInvalidFeedback extends ClassComponent<DtFormInputInvalidFeedbackProps, DtFormInputInvalidFeedbackSlots, DtFormInputInvalidFeedbackEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormInputInvalidFeedback: GlobalComponentConstructor<DtFormInputInvalidFeedback>
    }
}

export default DtFormInputInvalidFeedback;
