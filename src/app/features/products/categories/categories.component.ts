import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@common/Colors';
import { Category, Product } from '@common/models';
import { Observable, delay, map, of, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];
  @Input() product: Product = {} as Product;

  productsForm: FormGroup;
  // products$: Observable<Product[]>;
  categories$: Observable<any>;
  durations$: Observable<string[]>;
  durationsForm: FormGroup;

  _durations$: Observable<string[]>;
  _durationsForm: FormGroup;
  _durationsValues: string[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productsForm = this.fb.group({
      products: [null, Validators.required],
    });
    this.categories$ = this.productService.products$.pipe(
      tap((products) => {
        console.log('%c[this.categories]', Colors.INFO, this.categories);
        console.log('%c[product]', Colors.BIG_GREY, this.product);
        console.log('%c[RAW products]', Colors.BIG_GREY, products);
      }),
      map((products) => {
        let categories = products.find(
          ({ plu }) => plu === this.product.plu
        )?.categories;

        return categories;
      }),
      tap((categories) => {
        console.log(
          '%c[CategoriesComponent] categories AFTER',
          Colors.BIG_YELLOW,
          categories
        );
      })
    );
    this.durations$ = this.categories$.pipe(
      map((categories: any) => categories.map((x: any) => x.durations)),
      map((durations: any) => {
        let res = durations;
        console.log('durations | res', res)
        const toSelect = durations[0][0];
        this.durationsForm.get('durations')?.setValue(toSelect);
        return res
      })
    )

    this.durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });

    this._durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });
    this._durations$ = getDurations().pipe(
      tap((x) => {
        this._durationsValues = x;
        const toSelect = this._durationsValues[0];
        this._durationsForm.get('durations')?.setValue(toSelect);
      })
      // tap(res => console.log('res', res))
    );
  }
}

const getDurations = (): Observable<string[]> =>
  of(mockDurations).pipe(delay(2500));

const mockDurations: string[] = ['3', '5', '8', '11'];
