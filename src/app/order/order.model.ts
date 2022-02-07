import { Menu } from '../shared/menu.model';

export class Order {
  public userId: string;
  public total: number;
  public date: string;
  public orderDetail: Menu[];

  constructor(
    userId: string,
    total: number,
    date: string,
    orderDetail: Menu[]
  ) {
    this.userId = userId;
    this.total = total;
    this.date = date;
    this.orderDetail = orderDetail;
  }
}
