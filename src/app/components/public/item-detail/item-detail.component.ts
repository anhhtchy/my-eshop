import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item = {id: 0, name: '', price: 0, category: '', description: ''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(isNaN(id)) {
      this.navigateWhenError();
      return;
    }
    this.itemsService.getItem(id).subscribe(item => {
      if(!item) {
        this.navigateWhenError();
        return;
      }
      this.item = item;
    });
  }

  addToCart(): void {}

  navigateWhenError() {
    this.router.navigate(['']);
  }
}
