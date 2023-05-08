import { Component, Input } from '@angular/core';

@Component({
  selector: 'category-payments',
  templateUrl: './category-payments.component.html',
  styleUrls: ['./category-payments.component.scss']
})
export class CategoryPaymentsComponent {
  @Input() payments!: any;
  @Input() currentDuration!: any;
}
