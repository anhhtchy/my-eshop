import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { Address } from 'src/app/models/address';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { ItemsStateService } from 'src/app/services/items-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  addressIdForModification: number = -1;
  selectedAddressId: number = -1;
  addressList?:Address[];
  
  constructor(
    public itemsState: ItemsStateService,
    public authState: AuthStateService,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if((this?.authState?.user?.id || 0) > 0){
      this.userService.getAddressByUserId(this?.authState?.user?.id || 0)
        .subscribe((addresses:any) => {
          this.addressList = addresses;
          this.selectedAddressId = this.authState.deliveryAddress;
        })
    }
  }

  addressChanged(addr:Address):void{
    let newAddress:Address;
    addr.userId = this?.authState?.user?.id || 0;

    if(this?.authState?.user?.id || 0 > 0){
      this.userService.saveAddress(addr).pipe(
        tap((res:any)=> newAddress = res),
        mergeMap((res:any) => this.userService.getAddressByUserId(this?.authState?.user?.id || 0))
      )
      .subscribe((addresses:any) => {
        this.addressList = addresses;
        //change selected checkbox
        this.selectedAddressId = newAddress.id || 0;
        //toggle modifying
        this.addressIdForModification = -1;
      })
    }    
  }

  modifyAddress(addr:Address):void{
    this.addressIdForModification = addr.id || -1;
  }

  cancelModifyAddress():void{
    this.addressIdForModification = -1;  
  }

  deleteAddress(addr:Address):void{
    if(this?.authState?.user?.id || 0 > 0){
      this.userService.deleteAddress(addr.id)
        .subscribe((addressId:any) => {
          this.addressList = this.addressList?.filter(addr => addr.id != addressId);

          if(this.selectedAddressId == addressId)
            this.selectedAddressId = -1;
        })
    }
  } 

  onSubmit():void{
    this.authState.deliveryAddress = this.selectedAddressId;
    this.router.navigate(['/payment']);
  }
}
