import { Order } from '../order.model';
import * as OrderActions from './order.actions';

export interface State {
  allOrders: Order[];
  userOrders: Order[];
  userId: string;
  loading: boolean;
}
const initialState: State = {
  allOrders: [],
  userOrders: [],
  userId: null,
  loading: true,
};
export function OrderReducer(
  state = initialState,
  action: OrderActions.OrderActions
) {
  switch (action.type) {
    case OrderActions.SET_USER:
      return {
        ...state,
        userId: action.payload,
      };

    case OrderActions.SET_ORDERS:
      // console.log(action.payload);
      const orders = action.payload?.filter((el) => el.userId == state.userId);
      // console.log(orders);
      // const alO = [...action.payload.filter((el) => el.userId != state.userId)];
      // console.log(alO);
      return {
        ...state,
        allOrders: [
          ...action.payload.filter((el) => el.userId != state.userId),
        ],
        userOrders: [...orders],
        loading: false,
      };
    case OrderActions.SET_ORDERS_POST:
      // console.log(state);
      const postUserOrders = [...state.userOrders, action.payload];
      // console.log(postUserOrders);
      // const allOr = [...state.allOrders, ...postUserOrders];
      // console.log(allOr);
      return {
        ...state,
        userOrders: postUserOrders,
        allOrders: [...state.allOrders, ...postUserOrders],
      };
    case OrderActions.CLEAR_STATE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
