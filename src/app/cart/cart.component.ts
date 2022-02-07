import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { Menu } from '../shared/menu.model';

import * as FromApp from '../store/app.reducer';
import * as SharedActions from '../shared/store/shared.actions';
import { Order } from '../order/order.model';
import * as OrderActions from '../order/store/order.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  menu: Observable<{ menu: Menu[] }>;
  cartSub: Subscription;
  total: number;
  orderPlaced = false;
  userSub: Subscription;
  userId: string;
  cartOrder: Menu[];
  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.menu = this.store.select('menu');
    this.cartSub = this.store
      .select('menu')
      .pipe(
        map((cartState) => {
          // console.log(cartState);
          this.cartOrder = cartState.menu.filter((el) => el.quantity > 0);
          // console.log(this.cartOrder);
          return cartState.total;
        })
      )
      .subscribe((total) => (this.total = total));

    this.userSub = this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState) => {
          // console.log(authState.user.id);
          return authState.user.id;
        })
      )
      .subscribe((userId) => (this.userId = userId));
    //this.store.dispatch(new OrderActions.FetchOrders());
  }
  onDecrease(index: number, quantity: number) {
    if (quantity > 0) {
      this.store.dispatch(new SharedActions.DecrementCount(index));
    }
  }
  onIncrease(index: number) {
    this.store.dispatch(new SharedActions.IncrementCount(index));
  }
  onCancel(index: number) {
    this.store.dispatch(new SharedActions.RemoveFromCart(index));
  }
  onPlaceOrder() {
    this.orderPlaced = true;
    const order = new Order(
      this.userId,
      this.total,
      new Date().toUTCString(),
      this.cartOrder
    );
    //console.log(order);
    this.store.dispatch(new OrderActions.SetOrdersPost(order));
    this.store.dispatch(new OrderActions.SaveOrders());
  }
  onCancelOrder() {
    this.orderPlaced = false;
    // console.log('here');
    this.store.dispatch(new SharedActions.PlaceOrder());
  }
  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
