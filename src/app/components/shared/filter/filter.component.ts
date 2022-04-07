import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from 'src/app/models/filter';
import { ItemsStateService } from 'src/app/services/items-state.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories = [
    {name: 'Shoes', selected: false},
    {name: 'Clothes', selected: false},
    {name: 'Gear', selected: false},
  ];
  tempFilter:Filter = {name:'', categories: []};

  constructor(
    public itemsState: ItemsStateService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.tempFilter = this.itemsState.filter;
    this.categories = this.categories.map(cat => ({
      name: cat.name,
      selected: (this.tempFilter.categories.includes(cat.name))
    }));
  }

  onChange(): void {
    this.tempFilter.categories = this.categories.filter(c => c.selected)
      .map(cc => cc.name);
  }

  onFilterChanged(): void {
    this.itemsState.filter = this.tempFilter;
  }

}
