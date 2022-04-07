import { CartItem } from "./cart-item";

export class Cart {
  cartItems: CartItem[] = [];

  addItem(cartItem: CartItem) {
    let found = false;
    this.cartItems = this.cartItems.map(ci => {
      if (ci.item?.id == cartItem.item?.id) {
        ci.quantity++;
        found = true;
      }
      return ci;
    });
    if (!found) {
      this.cartItems.push(cartItem);
    }
  }

  removeItem(item: CartItem) {
    const index = this.cartItems.indexOf(item, 0);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  emptyCart() {
    this.cartItems = [];
  }

  getTotalValue(): number {
    let sum = this.cartItems.reduce(
      (a, b) => {a = a + b.item?.price * b.quantity; return a;}, 0
    );
    return sum;
  }

  isCartValid(): boolean {
    return this.cartItems.find(i => (i.quantity == null || i.quantity < 0)) === undefined;
  }
}