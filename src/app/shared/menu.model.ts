export class Menu {
  public name: string;
  public ingredients: { name: string; quantity: number }[];
  public price: number;
  public quantity: number;
  public itemTotal: number;

  constructor(
    name: string,
    ingredients: { name: string; quantity: number }[],
    price: number,
    quantity: number,
    itemTotal: number
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.price = price;
    this.quantity = quantity;
    this.itemTotal = itemTotal;
  }
}
