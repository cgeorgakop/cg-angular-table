import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-base-component',
  template: ''
})
export abstract class BaseComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();

  subscribe<T>(subject: Observable<T>, action: (any: T) => void) {
    if (this.subscriptions) {
      this.subscriptions.add(subject.subscribe(action));
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
