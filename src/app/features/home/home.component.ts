import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products$ = this.productService.products$;

  productsState$ = this.productService.productsState$;

  constructor(private readonly productService: ProductService) {}
}
