// @ts-ignore
import Vue, { Plugin } from 'vue';

interface DebuggerVueConfiguration {
    ripple?: boolean;
    inputStyle?: string;
    locale?: DebuggerVueLocaleOptions;
}

interface DebuggerVueLocaleOptions {
    startsWith?: string;
    contains?: string;
    notContains?: string;
    endWith?: string;
    equals?: string;
    notEquals?: string;
    noFilter?: string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    dateIs?: string;
    dateIsNot?: string;
    dateBefore?: string;
    dateAfter?: string;
    clear?: string;
    apply?: string;
    matchAll?: string;
    matchAny?: string;
    addRule?: string;
    removeRule?: string;
    accept?: string;
    reject?: string;
    choose?: string;
    upload?: string;
    cancel?: string;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today?: string;
    weekHeader?: string;
    firstDayOfWeek?: number;
    dateFormat?: string;
    weak?: string;
    medium?: string;
    strong?: string;
    passwordPrompt?: string;
    emptyFilterMessage?: string;
    emptyMessage?: string;
}

export declare function useDebuggerVue(): { config: DebuggerVueConfiguration };

declare const plugin: Plugin;
export default plugin;

declare module 'vue/types/vue' {
    interface Vue {
        $debuggervue: {
            config: DebuggerVueConfiguration;
        }
    }
}
