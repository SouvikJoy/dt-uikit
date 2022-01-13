// @ts-ignore
import { VNode } from 'vue';
import { ClassComponent, GlobalComponentConstructor } from '../ts-helpers';

export interface DtCardProps {
}

export interface DtCardSlots {
    header: () => VNode[];
    title: () => VNode[];
    subtitle: () => VNode[];
    content: () => VNode[];
    footer: () => VNode[];
}

export declare type DtCardEmits = {
}

declare class DtCard extends ClassComponent<DtCardProps, DtCardSlots, DtCardEmits> { }

declare module '@vue/runtime-core' {
    interface GlobalComponents {
        DtCard: GlobalComponentConstructor<DtCard>
    }
}

export default DtCard;
