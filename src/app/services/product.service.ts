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
  categories: CatDur[];
}
// export interface PluCats {
//   plu: string;
//   categories: any[];
// }
export interface PluCatDur {
  plu: string;
  category: CatDur;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$: Observable<Product[]>;

  private _productsStateSubj = new BehaviorSubject<PluCats[]>([]);
  productsState$: Observable<PluCats[]> =
    this._productsStateSubj.asObservable();
  // private _productsStateSubj = new BehaviorSubject<any[]>([]);
  // productsState$: Observable<any[]> = this._productsStateSubj.asObservable();

  get productState() {
    return this._productsStateSubj.value;
  }

  constructor() {
    this.products$ = this.getProducts$();
  }

  init() {}

  setProductDuration(pluCatDur: PluCatDur) {
    console.log('%c[this.setProductDuration]', Colors.BIG_BLUE, pluCatDur);

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
    // debugger;
    let pluInState = !!this.productState.find(({ plu }) => plu === change.plu);

    if (!pluInState) {
      this.addPluToState(change);
    } else {
      this.updatePluInState(change);
    }
    // console.log('%c[3.productState]', Colors.GOLDEN_BLACK, this.productState);
  }

  addPluToState(change: PluCatDur) {
    // console.log('%c[1.addPluToState change]', Colors.INFO, change);
    // console.log('%c[2.addPluToState productState]', Colors.INFO_2, this.productState);
    let update: PluCats[] = [
      ...this.productState,
      {
        plu: change.plu,
        categories: [change.category],
      },
    ];
    this._productsStateSubj.next(update);
    // console.log('%c[3.addPluToState FIN]', Colors.INFO_FIN, this.productState);
  }

  updatePluInState(change: PluCatDur) {
    let stateForPlu = this.productState.find(({ plu }) => plu === change.plu);

    let stateForPluCategories = stateForPlu?.categories ?? [];
    let pluCategoryNames = stateForPluCategories.map((x) => x.categoryName);
    let stateForPlu_hasCategory = pluCategoryNames?.includes(
      change.category.categoryName
    );

    if (stateForPlu_hasCategory) {
      this.changeDuration(change);
    } else {
      let categoriesUpdate = [...stateForPluCategories, change.category];

      let pluUpdate: PluCats = {
        plu: change.plu,
        categories: categoriesUpdate,
      };
      this._productsStateSubj.next([pluUpdate]);
    }
  }

  changeDuration(change: PluCatDur) {
    console.log(
      '%c[changeDuration]',
      Colors.BIG_YELLOW,
      change.plu,
      change.category
    );
    // 1.take plu from this
    let stateForPlu = this.productState.find(({ plu }) => plu === change.plu);
    // 2.this to update
    let stateForPluCategories = stateForPlu?.categories;
    let TO_LEAVE_otherCategoriesForPlu: CatDur[] | undefined =
      stateForPluCategories?.filter(
        (c) => c.categoryName !== change.category.categoryName
      ) ?? [];
    // console.log('%c[categorySameNameAsChange]', Colors.BIGBIG_GREEN, TO_UPDATE_categorySameNameAsChange);
    console.log(
      '%c[otherCategoriesForPlu]',
      Colors.BIG_ORANGE,
      TO_LEAVE_otherCategoriesForPlu
    );
    // 2.this to update
    let TO_UPDATE_categorySameNameAsChange = stateForPluCategories?.find(
      (c) => c.categoryName === change.category.categoryName
    );

    let TO_UPDATE_plu;
    if (TO_UPDATE_categorySameNameAsChange !== undefined) {
      debugger;
      TO_UPDATE_categorySameNameAsChange.currentDuration =
        change.category.currentDuration;

      // let TO_UPDATE_plu: PluCats = {
      TO_UPDATE_plu = {
        plu: change.plu,
        categories: [
          TO_UPDATE_categorySameNameAsChange,
          ...TO_LEAVE_otherCategoriesForPlu,
        ],
      };
    } else {
      TO_UPDATE_plu = {
        plu: change.plu,
        categories: [
          ...TO_LEAVE_otherCategoriesForPlu,
        ],
      };
    }
    // let UPDATE_pluCategories = categorySameNameAsChange;

    let TO_LEAVE_stateForOtherPlus = this.productState.filter(
      ({ plu }) => plu !== change.plu
    );

    console.log('%c[PS TO_UPDATE_plu]', Colors.GOLDEN_BLACK, TO_UPDATE_plu);
    console.log('%c[PS TO_LEAVE_stateForOtherPlus]', Colors.GOLDEN_BLACK, TO_LEAVE_stateForOtherPlus);

    let updateFIN = [
      TO_UPDATE_plu,
      TO_LEAVE_stateForOtherPlus
    ]
    console.log('updateFIN', updateFIN);

    // let stateForOtherPlusCategories = stateForOtherPlus?.categories
    // .find(({ plu }) => plu !== change.plu);
    // console.log('%c[stateForPlu, stateForOtherPlus]', Colors.GOLDEN_BLACK, stateForPlu, stateForOtherPlus);
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
    categoryName: 'cat-1',
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
    categoryName: 'cat-2',
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
    categoryName: 'cat-3',
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
];

const _mockCategories: Category[][] = [_categories1, _categories2];
const mockCategories = (id: number) => {
  return _mockCategories[id];
};

const mockProducts: Product[] = [
  {
    plu: 'plu-1',
    benefits: mockBenefits[0],
    categories: mockCategories(0),
  },
  {
    plu: 'plu-2',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
  {
    plu: 'plu-3',
    benefits: mockBenefits[1],
    categories: mockCategories(1),
  },
];
