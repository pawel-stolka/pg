import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$ = this.productService.products$;
  
  constructor(private readonly productService: ProductService) {}

  getProducts$() {
    return this.productService.getProducts$();
  }
}
