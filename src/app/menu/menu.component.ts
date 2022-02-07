import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Menu } from '../shared/menu.model';

import * as FromApp from '../store/app.reducer';
import * as SharedActions from '../shared/store/shared.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menu: Observable<{ menu: Menu[] }>;
  totalCart: number;
  // isOpen = true;
  // counter = 0;
  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.menu = this.store.select('menu');
  }
  onDecrease(index: number, quantity: number) {
    if (quantity > 0) {
      //this.isOpen = true;
      this.store.dispatch(new SharedActions.DecrementCount(index));
    }
  }
  onIncrease(index: number) {
    // this.isOpen = true;
    // this.counter++;
    //if (this.counter % 3 == 1 && this.counter != 1) this.isOpen = false;
    this.store.dispatch(new SharedActions.IncrementCount(index));
  }
  // onClose() {
  //   this.isOpen = false;
  // }
  // onAdd() {
  //   this.isOpen = true;
  //   this.store.dispatch(new SharedActions.IncrementCount(9));
  // }
  ngOnDestroy(): void {}
}
