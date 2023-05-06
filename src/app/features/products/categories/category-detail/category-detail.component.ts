import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  @Input() detail: any;
  @Input() price: number = 0;
  @Input() duration: string = '';
}
