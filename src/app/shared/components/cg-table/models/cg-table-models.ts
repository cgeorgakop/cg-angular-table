export interface cgTableColumn {
    columnName: string;
    columnTitle: string;
    align: 'left' | 'center' | 'right';
}

export interface SortEvent {
    column: string;
    direction: 'asc' | 'desc'
}