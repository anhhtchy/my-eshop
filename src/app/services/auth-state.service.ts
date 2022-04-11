import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private readonly _user = new BehaviorSubject<User|null>(
    (sessionStorage.getItem('user')===null) ? null :
    JSON.parse(sessionStorage.getItem('user')??'')
  );
  readonly user$ = this._user.asObservable();
  
  private readonly _deliveryAddress = new BehaviorSubject<number>(-1);
  readonly deliveryAddress$ = this._deliveryAddress.asObservable(); 

  constructor() { }

  get user(): User|null {
    return this._user.getValue();
  }

  set user(val: User|null) {
    this._user.next(val);
  }

  get deliveryAddress(): number {
    return this._deliveryAddress.getValue();
  }

  set deliveryAddress(val: number) {
    this._deliveryAddress.next(val);
  }
}
