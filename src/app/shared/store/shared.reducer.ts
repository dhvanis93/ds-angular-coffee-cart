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
    new Menu(
      'Espresso',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
      ],
      11,
      0,
      0
    ),
    new Menu(
      'Espresso Macchiato',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Milk Foam',
          quantity: 15,
        },
      ],
      12,
      0,
      0
    ),
    new Menu(
      'Cappucino',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Steamed Milk',
          quantity: 20,
        },
        {
          name: 'Milk Foam',
          quantity: 50,
        },
      ],
      19,
      0,
      0
    ),
    new Menu(
      'Mocha',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Chocolate Syrup',
          quantity: 20,
        },
        {
          name: 'Steamed Milk',
          quantity: 25,
        },
        {
          name: 'Whipped Cream',
          quantity: 25,
        },
      ],
      11,
      0,
      0
    ),
    new Menu(
      'Flat White',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Steamed Milk',
          quantity: 50,
        },
      ],
      18,
      0,
      0
    ),
    new Menu(
      'Americano',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Water',
          quantity: 70,
        },
      ],
      10,
      0,
      0
    ),
    new Menu(
      'Cafe Latte',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Steamed Milk',
          quantity: 50,
        },
        {
          name: 'Milk Foam',
          quantity: 20,
        },
      ],
      16,
      0,
      0
    ),
    new Menu(
      'Espresso Con Panna',
      [
        {
          name: 'Espresso',
          quantity: 30,
        },
        {
          name: 'Whipped Cream',
          quantity: 15,
        },
      ],
      14,
      0,
      0
    ),
    new Menu(
      'Cafe Breve',
      [
        {
          name: 'Espresso',
          quantity: 25,
        },
        {
          name: 'Steamed Milk',
          quantity: 30,
        },
        {
          name: 'Steamed Cream',
          quantity: 30,
        },
        {
          name: 'Milk Foam',
          quantity: 15,
        },
      ],
      15,
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
    case SharedActions.CLEAR_STATE:
      // console.log(state);
      return {
        ...state,
        ...initialState,
      };

    // case SharedActions.CLEAR_STATE:
    //   console.log(state);
    //   console.log(initialState);
    //   return {
    //     ...state,
    //     ...initialState,
    //   };
    default:
      return state;
  }
}
