export interface FilterMatchModeOptions {
    readonly STARTS_WITH: string;
    readonly CONTAINS: string;
    readonly NOT_CONTAINS: string;
    readonly ENDS_WITH: string;
    readonly EQUALS: string;
    readonly NOT_EQUALS: string;
    readonly IN: string;
    readonly LESS_THAN: string;
    readonly LESS_THAN_OR_EQUAL_TO: string;
    readonly GREATER_THAN: string;
    readonly GREATER_THAN_OR_EQUAL_TO: string;
    readonly BETWEEN: string;
    readonly DATE_IS: string;
    readonly DATE_IS_NOT: string;
    readonly DATE_BEFORE: string;
    readonly DATE_AFTER: string;
}

export declare const FilterMatchMode: FilterMatchModeOptions;
