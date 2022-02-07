import { Actions } from '@ngrx/effects';
import { Menu } from '../menu.model';
import * as SharedActions from './shared.actions';

export interface State {
  menu: Menu[];
  totalCart: number;
  total: number;
}
const initialState: State = {
  menu: [
    new Menu('Espresso', 'espresso', 11, 0, 0),
    new Menu('Espresso Macchiato', 'espresso,milk foam', 12, 0, 0),
    new Menu('Cappucino', 'espresso,stramed milk,milk foam', 19, 0, 0),
    new Menu(
      'Mocha',
      'espresso,chocolate syrup,steamed milk,whipped cream',
      11,
      0,
      0
    ),
    new Menu('Flat White', 'espresso,steamed milk', 18, 0, 0),
    new Menu('Americano', 'espresso,water', 10, 0, 0),
    new Menu('Cafe Latte', 'espresso,steamed milk,milk foam', 16, 0, 0),
    new Menu('Espresso Con Panna', 'espresso,whipped cream', 14, 0, 0),
    new Menu(
      'Cafe Breve',
      'espresso,steamed milk,steamed cream,milk foam',
      15,
      0,
      0
    ),
    new Menu(
      '(Discounted) Mocha',
      'espresso,chocolate syrup,steamed milk,whipped cream',
      4,
      0,
      0
    ),
  ],
  totalCart: 0,
  total: 0,
};

export function SharedReducer(
  state = initialState,
  action: SharedActions.SharedActions
) {
  switch (action.type) {
    case SharedActions.INC_COUNT:
      //console.log(state);
      const item = state.menu[action.payload];
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
        itemTotal: item.itemTotal + item.price,
      };
      const updatedMenu = [...state.menu];
      updatedMenu[action.payload] = updatedItem;
      return {
        ...state,
        total: state.total + item.price,
        totalCart: state.totalCart + 1,
        menu: updatedMenu,
      };

    case SharedActions.DEC_COUNT:
      //console.log(state);
      const itemDec = state.menu[action.payload];
      const updatedItemDec = {
        ...itemDec,
        quantity: itemDec.quantity - 1,
        itemTotal: itemDec.itemTotal - itemDec.price,
      };
      const updatedMenuDec = [...state.menu];
      updatedMenuDec[action.payload] = updatedItemDec;
      return {
        ...state,
        total: state.total - itemDec.price,
        totalCart: state.totalCart - 1,
        menu: updatedMenuDec,
      };

    case SharedActions.REMOVE_FROM_CART:
      //console.log(state);
      const itemRem = state.menu[action.payload];
      const quantityRem = itemRem.quantity;
      const updatedItemRem = {
        ...itemRem,
        quantity: 0,
        itemTotal: 0,
      };
      const updatedMenuRem = [...state.menu];
      updatedMenuRem[action.payload] = updatedItemRem;
      return {
        ...state,
        total: state.total - quantityRem * itemRem.price,
        totalCart: state.totalCart - quantityRem,
        menu: updatedMenuRem,
      };

    case SharedActions.PLACE_ORDER:
      console.log(state);
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
