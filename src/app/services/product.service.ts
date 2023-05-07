import { Injectable } from '@angular/core';
import { Product, Category, InsuranceType } from '@common/models';
import { Observable, map, of, shareReplay, tap } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.getProducts$();
  }

  init() {}

  getProducts$(): Observable<Product[]> {
    return of(mockProducts).pipe(
      // tap((products) => console.log('products', products)),
      map((products) =>
        products.map((p) => ({
          ...p,
          categories: p.categories.map((c) => ({
            ...c,
            durations: c.insuranceDetails.map((det) => det.duration),
          })),
        }))
      ),
      // tap((products) => console.log('products AFTER', products))
    );
  }
}

const mockBenefits: string[][] = [
  ['będzie ok', 'zrobimy to', 'nie ma się czego bać'],
  ['róbta co chceta', 'lepiej uważać'],
  ['czas ucieka, wieczność czeka'],
];
const _categories1: Category[] = [
  {
    id: 0,
    categoryName: 'cat #1',
    insuranceDetails: [
      {
        insuranceId: '#1.0',
        type: InsuranceType.TEN_TIMES,
        price: 123,
        duration: '3',
      },
      {
        insuranceId: '#1.1',
        type: InsuranceType.TEN_TIMES,
        price: 456,
        duration: '5',
      },
    ],
  },
  {
    id: 1,
    categoryName: 'cat #2',
    insuranceDetails: [
      {
        insuranceId: '#2.0',
        type: InsuranceType.TEN_TIMES,
        price: 456,
        duration: '5',
      },
      {
        insuranceId: '#2.1',
        type: InsuranceType.TEN_TIMES,
        price: 789,
        duration: '7',
      },
    ],
  },
];
const _categories2: Category[] = [
  {
    id: 0,
    categoryName: 'cat #3',
    insuranceDetails: [
      {
        insuranceId: '#1.0',
        type: InsuranceType.TEN_TIMES,
        price: 901,
        duration: '9',
      },
      {
        insuranceId: '#1.1',
        type: InsuranceType.TEN_TIMES,
        price: 1024,
        duration: '11',
      },
    ],
  },
  // {
  //   id: 1,
  //   categoryName: 'cat #4',
  //   insuranceDetails: [
  //     {
  //       insuranceId: '#2.0',
  //       type: InsuranceType.TEN_TIMES,
  //       price: 456,
  //       duration: '5',
  //     },
  //     {
  //       insuranceId: '#2.1',
  //       type: InsuranceType.TEN_TIMES,
  //       price: 789,
  //       duration: '7',
  //     },
  //   ],
  // },
];

const _mockCategories: Category[][] = [_categories1, _categories2];
const mockCategories = (id: number) => {
  return _mockCategories[id];
};

const mockProducts: Product[] = [
  {
    plu: '1st',
    benefits: mockBenefits[0],
    categories: mockCategories(0),
  },
  {
    plu: '2nd',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
];
