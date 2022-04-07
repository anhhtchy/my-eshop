import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ItemsStateService } from 'src/app/services/items-state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public itemsState: ItemsStateService) { }

  ngOnInit(): void {
  }

  removeFromCart(item: CartItem) {
    this.itemsState.cart.removeItem(item);
  }

  emptyCart() {
    this.itemsState.cart.emptyCart();
  }
}
