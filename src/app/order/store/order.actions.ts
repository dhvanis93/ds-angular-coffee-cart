import { Action } from '@ngrx/store';
import { Order } from '../order.model';

export const FETCH_ORDERS = '[Orders] Fetch Orders';
export const SAVE_ORDERS = '[Orders] Save Orders';
export const SET_ORDERS = '[Orders] Set Orders';
export const SET_ORDERS_POST = '[Orders] Set Orders Post';
export const SET_USER = '[Orders] Set User';
export const CLEAR_STATE = ' [Orders] Clear State';

export class FetchOrders implements Action {
  readonly type = FETCH_ORDERS;
}
export class SaveOrders implements Action {
  readonly type = SAVE_ORDERS;
}
export class SetOrders implements Action {
  readonly type = SET_ORDERS;

  constructor(public payload: Order[]) {}
}
export class SetOrdersPost implements Action {
  readonly type = SET_ORDERS_POST;

  constructor(public payload: Order) {}
}
export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: string) {}
}
export class ClearState implements Action {
  readonly type = CLEAR_STATE;
}
export type OrderActions =
  | FetchOrders
  | SaveOrders
  | SetOrders
  | SetUser
  | SetOrdersPost
  | ClearState;
