import { Component, OnDestroy, ChangeDetectionStrategy, Input, NgZone, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-search-textbox',
  templateUrl: './search-textbox.component.html',
  styleUrls: ['./search-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTextboxComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  @Input()
  placeholder: string;
  text: string = '';
  loading = false;

  @Output()
  textChange = new EventEmitter<string>();

  @ViewChild('input')
  inputElement: ElementRef;

  constructor(
    private zone: NgZone
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.subscribe(
        fromEvent(this.inputElement.nativeElement, 'input').pipe(
          tap(() => { this.loading = true; }),
          debounceTime(500)
        ),
        () => {
          this.loading = false;
          this.textChange.emit(this.text);
        });
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy()
  }
}
