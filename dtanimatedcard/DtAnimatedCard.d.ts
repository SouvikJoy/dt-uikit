// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtAnimatedCardProps {
    type?: string | undefined;
}

export interface DtAnimatedCardSlots {
    default: () => VNode[];
    interactions: () => VNode[];
    img: () => VNode[];
    title: () => VNode[];
    text: () => VNode[];
}

export declare type DtAnimatedCardEmits = { }

declare class DtAnimatedCard extends ClassComponent<DtAnimatedCardProps, DtAnimatedCardSlots, DtAnimatedCardEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtAnimatedCard: GlobalComponentConstructor<DtAnimatedCard>
    }
}

export default DtAnimatedCard;
