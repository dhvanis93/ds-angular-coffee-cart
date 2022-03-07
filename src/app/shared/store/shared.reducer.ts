import { Actions } from '@ngrx/effects';
import { Menu } from '../menu.model';
import * as SharedActions from './shared.actions';

export interface State {
  menu: Menu[];
  totalCart: number;
  total: number;
}
const initialState: State = {
  menu: [],
  totalCart: 0,
  total: 0,
};

export function SharedReducer(
  state = initialState,
  action: SharedActions.SharedActions
) {
  switch (action.type) {
    case SharedActions.SAVE_MENU:
      let modifiedMenu = [...action.payload];
      // console.log('state menu', state.menu);
      let finalMenu = [...action.payload];
      if (state.menu.length > 0) {
        finalMenu = modifiedMenu.map((el, i) => {
          // console.log(el, i);
          return {
            ...el,
            quantity: state.menu[i].quantity,
            itemTotal: state.menu[i].itemTotal,
          };
        });
      }
      // console.log(modifiedMenu);
      return {
        ...state,
        menu: [...finalMenu],
      };

    case SharedActions.ADD_MENU:
      // console.log(action.payload);
      const addMenu = [...state.menu];
      addMenu.push({ ...action.payload });
      // console.log(addMenu);
      return {
        ...state,
        menu: [...addMenu],
      };

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
      // return {
      //   ...state,
      //   ...initialState,
      // };
      const initialMenu = [...state.menu].map((el) => {
        return {
          ...el,
          itemTotal: 0,
          quantity: 0,
        };
      });
      // console.log(initialMenu);
      return {
        ...state,
        totalCart: 0,
        total: 0,
        menu: [...initialMenu],
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
