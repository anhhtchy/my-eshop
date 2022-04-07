import { Component } from '@angular/core';
import { ItemsStateService } from './services/items-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-eshop-fe';

  constructor(public itemsState: ItemsStateService) {}
}
