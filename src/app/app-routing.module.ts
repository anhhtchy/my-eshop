import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemsComponent } from './components/items/items.component';

const routes: Routes = [
  {path: '', component: ItemsComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/:id', component: ItemDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
