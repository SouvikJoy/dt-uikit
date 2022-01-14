// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtFormTextProps {
    id?: String | false;
    inline?: Boolean | false;
    tag?: String | 'small';
    textVariant?: String | 'muted';
}

export interface DtFormTextSlots {

}

export declare type DtFormTextEmits = {
}

declare class DtFormText extends ClassComponent<DtFormTextProps, DtFormTextSlots, DtFormTextEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtFormText: GlobalComponentConstructor<DtFormText>
    }
}

export default DtFormText;
