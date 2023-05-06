import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  @Input() price: number = 0;
  @Input() duration: string = '';
}
