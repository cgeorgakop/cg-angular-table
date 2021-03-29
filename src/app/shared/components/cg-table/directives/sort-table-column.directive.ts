import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as cgTableModels from './../models/cg-table-models';

@Directive({
  selector: '[appSortTableColumn]'
})
export class SortTableColumnDirective {

  @Input()
  appSortTableColumn: string;

  @Input()
  appSortTableDirection: 'asc' | 'desc' | 'none' = 'none';

  @Output()
  appSortTableChange = new EventEmitter<cgTableModels.SortEvent>();

  @HostListener('click', ['$event'])
  clickToSort() {
    let newDirection: 'asc' | 'desc';
    switch (this.appSortTableDirection) {
      case 'asc':
        newDirection = 'desc';
        break;
      default:
        newDirection = 'asc';
        break;
    }
    this.appSortTableChange.emit({ column: this.appSortTableColumn, direction: newDirection });
  }

  constructor(
  ) { }
}
