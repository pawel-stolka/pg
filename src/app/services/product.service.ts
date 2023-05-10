import { Injectable } from '@angular/core';
import { Colors } from '@common/Colors';
import { Product, Category, InsuranceType } from '@common/models';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';

export interface CatDur {
  categoryName: string;
  currentDuration: string;
}
// export interface PluCats {
//   plu: string;
//   categories: CatDur[] | undefined;
// }
export interface PluCats {
  plu: string;
  categories: any[];
}
export interface PluCatDur {
  plu: string;
  category: CatDur;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$: Observable<Product[]>;

  // private _productsStateSubj = new BehaviorSubject<PluCats[]>([]);
  // productsState$: Observable<PluCats[]> =
  //   this._productsStateSubj.asObservable();
  private _productsStateSubj = new BehaviorSubject<any[]>([]);
  productsState$: Observable<any[]> = this._productsStateSubj.asObservable();

  get productState() {
    return this._productsStateSubj.value;
  }

  constructor() {
    this.products$ = this.getProducts$();
  }

  init() {}

  setProductDuration(pluCatDur: PluCatDur) {
    // console.log('%c[this.setProductDuration]', Colors.BIG_BLUE, pluCatDur);

    this.changeState(pluCatDur);
    // console.log('%c[currentState]', Colors.RED, this.productState);
  }

  getProducts$(): Observable<Product[]> {
    return of(mockProducts).pipe(
      // tap((products) => console.log('products', products)),
      map((products) =>
        products.map((p) => ({
          ...p,
          categories: p.categories.map((c) => ({
            ...c,
            durations: c.insuranceDetails.map(({ duration }) => duration),
          })),
        }))
      )
      // tap((products) => console.log('products AFTER', products))
    );
  }

  changeState(change: PluCatDur) {
    console.log('%c[changeState]', Colors.BIG_YELLOW, change);
    // console.log('%c[currentState]', Colors.RED, this.productState);

    let pluInState = this.productState.find(({ plu }) => plu === change.plu);
    console.log(`%c[2.pluInState] ${change.plu}`, Colors.GOLDEN_BLACK, pluInState);
    if (!pluInState) {
      this.addPluToState(change);
    } else {
      this.updatePluInState(change);
    }
    console.log('%c[3.productState]', Colors.BIG_MAG, this.productState);
  }

  addPluToState(change: PluCatDur) {
    let update: PluCats[] = [
      ...this.productState,
      {
        plu: change.plu,
        categories: [change.category],
      },
    ];
    this._productsStateSubj.next(update);
  }

  updatePluInState(change: PluCatDur) {

    let stateForPlu = this.productState.find(({ plu }) => plu === change.plu);
    // console.log('%c1.[stateForPlu]', Colors.GOLDEN_BLACK, stateForPlu);

    let stateForPluCategories = stateForPlu.categories;
    let stateForPlu_hasCategory = stateForPluCategories?.includes(
      change.category
      );
      // console.log('%c1.[stateForPlu_hasCategory]', Colors.GOLDEN_BLACK, stateForPlu_hasCategory);

    if (stateForPlu_hasCategory) {
      console.log(
        '%c[HAS] CHECK DURATION',
        Colors.BIGBIG_RED,
        stateForPlu_hasCategory
      );
      this.changeDuration(change.plu, change.category);
    } else {
      let categoriesUpdate = [...stateForPluCategories, change.category];

      let pluUpdate: PluCats = {
        plu: change.plu,
        categories: categoriesUpdate,
      };
      this._productsStateSubj.next([pluUpdate]);
    }
  }
  changeDuration(plu: string, category: CatDur) {
    throw new Error('Method not implemented.');
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
    plu: '1st-plu',
    benefits: mockBenefits[0],
    categories: mockCategories(0),
  },
  {
    plu: '2nd-plu',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
];
