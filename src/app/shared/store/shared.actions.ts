import { Action } from '@ngrx/store';
import { Menu } from '../menu.model';

export const INC_COUNT = '[Shared] Increment Count';
export const DEC_COUNT = '[Shared] Decrement Count';
export const REMOVE_FROM_CART = '[Shared] Remove From Cart';
export const PLACE_ORDER = '[Shared] Place Order';
export const CLEAR_STATE = ' [Shared] Clear State';
export const FETCH_MENU = '[Shared] Fetch Menu';
export const SAVE_MENU = '[Shared] Save Menu';
export const POST_MENU = '[Shared] Post Menu';
export const ADD_MENU = '[Shared] Add Menu';
export const EDIT_MENU = '[Shared] Edit Menu';
export const DELETE_MENU = '[Shared] Delete Menu';

export class FetchMenu implements Action {
  readonly type = FETCH_MENU;
}
export class SaveMenu implements Action {
  readonly type = SAVE_MENU;
  constructor(public payload: Menu[]) {}
}
export class PostMenu implements Action {
  readonly type = POST_MENU;
  constructor(
    public payload: { name: string; price: number; ingredients: [] }
  ) {}
}
export class AddMenu implements Action {
  readonly type = ADD_MENU;
  constructor(public payload: Menu) {}
}
export class EditMenu implements Action {
  readonly type = EDIT_MENU;
  constructor(public payload: { menu: Menu; id: string }) {}
}
export class DeleteMenu implements Action {
  readonly type = DELETE_MENU;
  constructor(public payload: string) {}
}
export class IncrementCount implements Action {
  readonly type = INC_COUNT;
  constructor(public payload: number) {}
}
export class DecrementCount implements Action {
  readonly type = DEC_COUNT;
  constructor(public payload: number) {}
}
export class RemoveFromCart implements Action {
  readonly type = REMOVE_FROM_CART;
  constructor(public payload: number) {}
}
export class PlaceOrder implements Action {
  readonly type = PLACE_ORDER;
}
export class ClearState implements Action {
  readonly type = CLEAR_STATE;
}

export type SharedActions =
  | IncrementCount
  | DecrementCount
  | RemoveFromCart
  | PlaceOrder
  | ClearState
  | FetchMenu
  | SaveMenu
  | PostMenu
  | AddMenu
  | EditMenu
  | DeleteMenu;
