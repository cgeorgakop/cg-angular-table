import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, ViewChildren, } from '@angular/core';
import * as  cgTableModels from './models/cg-table-models';

@Component({
  selector: 'app-cg-table',
  templateUrl: './cg-table.component.html',
  styleUrls: ['./cg-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CgTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  loading: boolean;
  @Input()
  tableSource: any[];
  @Input()
  tableColumns: cgTableModels.cgTableColumn[];
  @Input()
  tableIdColumnName: string;
  @Input()
  searchable: boolean;

  @Output()
  changeColumnOrder = new EventEmitter<[number, number]>();

  @ViewChildren('resizer', { read: ElementRef })
  resizerElements: QueryList<ElementRef>;

  sortColumn: string;
  sortOrder: 'asc' | 'desc' | 'none' = 'none'

  allData: any[] = [];
  tableData: any[] = [];

  searchText: string;

  mousemoveListenerUnlistenFn: Function;
  mouseupListenerUnlistenFn: Function;
  currentColumnIndex: number = -1;
  currentColumnStartWidth: number;
  currentHeader: HTMLElement;
  nextColumnStartWidth: number;
  nextHeader: HTMLElement;
  startingPageX: number;
  resizerUnlistenFns: Function[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private zone: NgZone
  ) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.resizerElements.forEach((ref, i, a) => {
        this.resizerUnlistenFns.push(this.renderer.listen(ref.nativeElement, 'mousedown', (e) => this.startResize(e, i)))
      });
    })
  }

  resize($event) {
    if (this.currentColumnIndex !== -1) {
      var diffX = $event.pageX - this.startingPageX;

      this.renderer.setAttribute(this.currentHeader, 'width', String(this.currentColumnStartWidth + diffX));
      this.renderer.setAttribute(this.nextHeader, 'width', String(this.nextColumnStartWidth - diffX));
    }
  }

  stopResize() {
    this.currentColumnIndex = -1;
    this.currentColumnStartWidth = null;
    this.currentHeader = null;
    this.nextColumnStartWidth = null;
    this.nextHeader = null;
    this.startingPageX = null;

    if (this.mousemoveListenerUnlistenFn) {
      this.mousemoveListenerUnlistenFn();
    }
    if (this.mouseupListenerUnlistenFn) {
      this.mouseupListenerUnlistenFn();
    }
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    this.changeColumnOrder.emit([event.previousIndex, event.currentIndex]);
  }

  getPropertyData(data: any, colDef: string) {
    if (colDef) {
      const properties = colDef.split('.');
      const first = properties[0];
      const rest = properties.slice(1).join('.');
      return this.getPropertyData(data[first], rest);
    } else {
      return data;
    }
  }

  calculateTableData(data: any[]) {
    let flatData = data.map(row => {
      return [...this.tableColumns.map(col => this.getPropertyData(row, col.columnName))];
    });

    this.allData = flatData;
    if (this.sortColumn) {
      flatData = this.sortData(flatData);
    }
    if (this.searchText) {
      flatData = this.filter(flatData, this.searchText);
    }
    return flatData;
  }

  private sortData(flatData: any[][]) {
    const sortIndex = this.tableColumns.findIndex(c => c.columnName === this.sortColumn);
    flatData = flatData.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return this.sortBy(a[sortIndex], b[sortIndex]);
      }
      return this.sortBy(b[sortIndex], a[sortIndex]);
    });
    return flatData;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableSource']) {
      this.tableData = this.calculateTableData(changes['tableSource'].currentValue);
    } else if (changes['tableColumns']) {
      this.tableData = this.calculateTableData(this.tableSource);
    }
  }

  onSort(event: cgTableModels.SortEvent) {
    this.sortColumn = event.column;
    this.sortOrder = event.direction;
    this.tableData = this.calculateTableData(this.tableSource);
  }

  filterData(term: string) {
    this.searchText = term;
    this.tableData = this.filter(this.allData, this.searchText);
    this.cd.detectChanges();
  }

  filter(data: any[], filter: string) {
    return data.filter(c => {
      for (const prop of c) {
        if (prop && String(prop).toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          return true;
        }
      }
      return false;
    });
  }

  sortBy(a: any, b: any) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  startResize(event: MouseEvent, colIndex: number) {
    this.currentColumnIndex = colIndex;
    this.startingPageX = event.pageX;
    this.currentHeader = (event.target as HTMLElement).parentElement;
    this.currentColumnStartWidth = this.currentHeader.clientWidth;

    this.nextHeader = this.currentHeader.nextElementSibling as HTMLElement;
    this.nextColumnStartWidth = this.nextHeader.clientWidth;

    this.zone.runOutsideAngular(() => {
      this.mousemoveListenerUnlistenFn = this.renderer.listen(document, 'mousemove', (e) => this.resize(e));
      this.mouseupListenerUnlistenFn = this.renderer.listen(document, 'mouseup', () => this.stopResize());
    });
  }

  propertyIdentify(index: number, item: any) {
    return item.propertyName;
  }

  rowIdentify(index: number, item: any) {
    return item[this.tableIdColumnName];
  }

  cellIdentify(index: number) {
    return index;
  }

  ngOnDestroy() {
    this.stopResize();
    this.resizerUnlistenFns.forEach(unlistenFn => {
      if (unlistenFn) {
        unlistenFn();
      }
    });
  }
}
