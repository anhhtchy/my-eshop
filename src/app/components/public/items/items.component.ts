import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { StateStoreService } from 'src/app/services/state-store.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(
    private itemsService: ItemsService,
    public stateStore: StateStoreService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemsService.getItems().subscribe(items => {
      this.stateStore.items = items;
    });
  }
}
