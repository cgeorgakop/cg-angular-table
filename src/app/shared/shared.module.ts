import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CgTableComponent } from './components/cg-table/cg-table.component';
import { SortTableColumnDirective } from './components/cg-table/directives/sort-table-column.directive';
import { SearchTextboxComponent } from './components/search-textbox/search-textbox.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [CgTableComponent, SortTableColumnDirective, SearchTextboxComponent],
  imports: [
    DragDropModule,
    FormsModule,
    CommonModule,
  ],
  exports: [CgTableComponent]
})
export class SharedModule { }
