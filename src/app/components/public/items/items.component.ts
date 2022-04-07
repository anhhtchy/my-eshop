import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ItemsStateService } from 'src/app/services/items-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from '../../shared/filter/filter.component';
import { skip } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(
    private itemsService: ItemsService,
    public itemsState: ItemsStateService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.itemsState.pageSize$.subscribe(newPageSize => {
      this.itemsState.page = 1;
      this.getItems();
    });

    this.itemsState.filter$.pipe(skip(1)).subscribe(filter => {
      this.itemsState.page = 1;
      this.getItems();
    });

    this.getItems();
  }

  getItems(): void {
    this.itemsService.getItems(this.itemsState.page, this.itemsState.pageSize, this.itemsState.filter).subscribe(itemsPayload => {
      this.itemsState.items = itemsPayload.items;
      this.itemsState.count = itemsPayload.count
    });
  }

  onPageChange(newPage: number): void {
    this.itemsState.page = newPage;
    this.getItems();
  }

  onPageSizeChange(): void {
    this.itemsState.pageSizeSubject.next(this.itemsState.pageSize);
  }

  openFilter(): void {
    this.modalService.open(FilterComponent);
  }
}
