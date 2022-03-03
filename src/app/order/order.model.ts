import { Menu } from '../shared/menu.model';

export class Order {
  public total: number;
  public orderDetail: {
    name: string;
    price: number;
    quantity: number;
    itemTotal: number;
  }[];
  public createdAt?: string;

  constructor(
    total: number,
    orderDetail: {
      name: string;
      price: number;
      quantity: number;
      itemTotal: number;
    }[]
  ) {
    this.total = total;
    this.orderDetail = orderDetail;
  }
}
