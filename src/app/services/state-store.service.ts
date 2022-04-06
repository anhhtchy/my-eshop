import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {
  private readonly _items = new BehaviorSubject<Item[]>([]);
  readonly items$ = this._items.asObservable();

  constructor() { }

  get items(): Item[] {
    return this._items.getValue();
  }

  set items(val: Item[]) {
    this._items.next(val);
  }
}
