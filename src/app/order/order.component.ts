import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import * as FromApp from '../store/app.reducer';
import { Order } from './order.model';
import * as OrderActions from './store/order.actions';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  isLoading = true;
  orderSub: Subscription;
  orders: Order[];
  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    // console.log('here');
    this.store.dispatch(new OrderActions.FetchOrders());
    this.orderSub = this.store.select('orders').subscribe((orderState) => {
      // console.log(orderState);
      this.isLoading = orderState.loading;
      this.orders = orderState.orders;
      // console.log(orderState.orders);
    });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
