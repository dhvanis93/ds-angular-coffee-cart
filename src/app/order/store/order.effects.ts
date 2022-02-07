import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Order } from '../order.model';

import * as OrderActions from './order.actions';
import * as FromApp from '../../store/app.reducer';

@Injectable()
export class OrderEffects {
  ordersFetch = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.FETCH_ORDERS),
      switchMap(() => {
        // console.log('ghere in fetch-orders');
        return this.http.get<Order[]>(
          'https://ds-angular-menu-cart-default-rtdb.firebaseio.com/orders.json'
        );
      }),
      map((orders) => {
        // console.log(orders);
        return new OrderActions.SetOrders(orders);
      })
    );
  });

  ordersSave = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(OrderActions.SAVE_ORDERS),
        withLatestFrom(this.store.select('orders')),
        switchMap(([actionData, ordersState]) => {
        //   console.log(ordersState.allOrders);
          return this.http.put(
            'https://ds-angular-menu-cart-default-rtdb.firebaseio.com/orders.json',
            ordersState.allOrders
          );
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<FromApp.AppState>
  ) {}
}
