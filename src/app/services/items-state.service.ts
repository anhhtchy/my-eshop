import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { Filter } from '../models/filter';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsStateService {
  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable();

  private readonly _page = new BehaviorSubject<number>(1);
  readonly page$ = this._page.asObservable();
  
  public pageSize = 3;
  public pageSizeSubject = new Subject<number>();
  readonly pageSize$ = this.pageSizeSubject.asObservable();

  private readonly _count = new BehaviorSubject<number>(1);
  readonly count$ = this._count.asObservable();

  private readonly _filter = new BehaviorSubject<Filter>({
    name: '', categories: []
  });
  readonly filter$ = this._filter.asObservable();

  private readonly _cart = new BehaviorSubject<Cart>(new Cart());
  readonly cart$ = this._cart.asObservable();

  constructor() { }

  get items(): Item[] {
    return this._items.getValue();
  }

  set items(val: Item[]) {
    this._items.next(val);
  }

  get page(): number {
    return this._page.getValue();
  }

  set page(val: number) {
    this._page.next(val);
  }

  get count(): number {
    return this._count.getValue();
  }

  set count(val: number) {
    this._count.next(val);
  }

  get filter(): Filter {
    return this._filter.getValue();
  }

  set filter(val: Filter) {
    this._filter.next(val);
  }

  get cart(): Cart {
    return this._cart.getValue();
  }

  set cart(val: Cart) {
    this._cart.next(val);
  }
}
