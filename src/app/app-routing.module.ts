import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/public/cart/cart.component';
import { ItemDetailComponent } from './components/public/item-detail/item-detail.component';
import { ItemsComponent } from './components/public/items/items.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/:id', component: ItemDetailComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
