import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@common/Colors';
import { Category, PluCatDur, Product } from '@common/models';
import { Observable, delay, map, of, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];
  // @Input() product: Product = {} as Product;
  @Input() plu: string = 'cat-plu';

  productsForm: FormGroup;
  // products$: Observable<Product[]>;
  categories$: Observable<any>;
  durations$: Observable<string[]>;
  durationsForm: FormGroup = this.fb.group({
    durations: [null, Validators.required],
  });
  currentDuration: any;

  payments$: Observable<any[]>;

  // _durations$: Observable<string[]>;
  // _durationsForm: FormGroup;
  // _durationsValues: string[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productsForm = this.fb.group({
      products: [null, Validators.required],
    });

    this.categories$ = this.productService.products$.pipe(
      map(
        (products) =>
          products.find(({ plu }) => plu === this.plu)?.categories
      )
    );

    this.durations$ = this.categories$;

    this.payments$ = this.categories$.pipe(
      map((x: any) => x.map((v: any) => v.insuranceDetails))
    );

    // this._durationsForm = this.fb.group({
    //   durations: [null, Validators.required],
    // });
    // this._durations$ = getDurations().pipe(
    //   tap((x) => {
    //     this._durationsValues = x;
    //     const toSelect = this._durationsValues[0];
    //     this._durationsForm.get('durations')?.setValue(toSelect);
    //   })
    //   // tap(res => console.log('res', res))
    // );
  }

  setDuration(event: any) {
    console.log('%c[setDuration]', Colors.BIG_MAG, event);
    this.currentDuration = event;
    let pluCatDur: PluCatDur = {
      plu: this.plu,
      category: {
        categoryName: event.category,
        currentDuration: event.currentDuration,
      },
    };
    this.productService.setProductDuration(pluCatDur);
  }
}

const getDurations = (): Observable<string[]> =>
  of(mockDurations).pipe(delay(2500));

const mockDurations: string[] = ['3', '5', '8', '11'];
