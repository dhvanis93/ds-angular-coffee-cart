import { ActionReducerMap } from '@ngrx/store';

import * as FromShared from '../shared/store/shared.reducer';
import * as FromAuth from '../auth/store/auth.reducer';
import * as FromOrders from '../order/store/order.reducer'

export interface AppState {
  menu: FromShared.State;
  auth: FromAuth.State;
  orders: FromOrders.State
}
export const appReducer: ActionReducerMap<AppState> = {
  menu: FromShared.SharedReducer,
  auth: FromAuth.authReducer,
 orders: FromOrders.OrderReducer,
};
