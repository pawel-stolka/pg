import { Injectable } from '@angular/core';
import { Colors } from '@common/Colors';
import { Product, Category, InsuranceType } from '@common/models';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';

export interface CatDur {
  categoryName: string;
  currentDuration: string;
}
export interface PluCats {
  plu: string;
  categories: CatDur[];
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

  private _productsStateSubj = new BehaviorSubject<PluCats[]>([]);
  productsState$: Observable<PluCats[]> =
    this._productsStateSubj.asObservable();

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
    console.log('%[changeState - DROPDOWN]', change); //Colors.INFO, change);
    // console.log('%c[currentState]', Colors.RED, this.productState);

    let pluInState = this.productState.find(({ plu }) => plu === change.plu);
    if (!pluInState) {
      this.addPluToState(change);
      // this.addPluCat(change);
    } else {
      this.updatePluInState(change);
      // this.updatePluCat(change);
    }
  }
  private hasStatePluGivenCategory(change: PluCatDur) {
    let currentPluInState = this.productState.find(
      ({ plu }) => plu === change.plu
    );
    let currentPluInStateCatNames = currentPluInState?.categories.map(
      (c) => c.categoryName
    );
    return !!currentPluInStateCatNames?.includes(change.category.categoryName);
  }

  addPluToState(change: PluCatDur) {
    console.log('%c[1. addPluToState | change]', Colors.INFO, change);
    let currentPluInState = this.productState.find(
      ({ plu }) => plu === change.plu
    );
    let currentPluInStateCatNames = currentPluInState?.categories.map(
      (c) => c.categoryName
    );
    let update: PluCats[] = [];
    // let PLU_CAT_IN_STATE = this.hasStatePluGivenCategory(change);
    // console.log('%c [2. PLU_CAT_IN_STATE ----]', Colors.GOLDEN_BLACK, PLU_CAT_IN_STATE);
    update = [
      ...this.productState,
      {
        plu: change.plu,
        categories: [
          // ...currentPluInState?.categories ?? [],
          // currCatNames,
          change.category,
        ],
      },
    ];
    console.log(
      `%c [1.NO PLU_CAT_IN_STATE | ${change.category.categoryName}] =>`,
      Colors.GOLDEN_BLACK,
      update
    );
    this._productsStateSubj.next(update);
    /*
    if(!PLU_CAT_IN_STATE) {
    // if (!currentPluInStateCatNames?.includes(change.category.categoryName)) {
      update = [
        {
          plu: change.plu,
          categories: [
            ...currentPluInState?.categories ?? [],
            // currCatNames,
            change.category,
          ],
        },
      ];
      console.log(
        `%c [1.NO PLU_CAT_IN_STATE | ${change.category.categoryName}] =>`,
        Colors.GOLDEN_BLACK,
        // currentPluInStateCatNames,
        update
      );
    } else {
      console.log('%c [2. YES PLU_CAT_IN_STATE] =>', Colors.GOLDEN_BLACK, update);
    }
    this._productsStateSubj.next(update);
    */
    // console.log('%c[2. addPluToState | productState]', Colors.INFO_2, currentPluInState, currCatNames);
    console.log(
      '%c[3. addPluToState | productState]',
      Colors.INFO_FIN,
      this.productState
    );
  }

  updatePluInState(change: PluCatDur) {
    let currentPluInState = this.productState.find(
      ({ plu }) => plu === change.plu
    );
    let currentPluInStateCatNames = currentPluInState?.categories.map(
      (c) => c.categoryName
    );
    console.log(
      '%c[1. updatePluInState | ch, pluCN]',
      Colors.INFO,
      change,
      currentPluInState,
      currentPluInStateCatNames
    );

    // console.log(
    //   '%c[2. updatePluInState | productState]',
    //   Colors.INFO_2,
    //   this.productState
    // );

    console.log(
      '%c[3. updatePluInState | productState]',
      Colors.INFO_FIN,
      this.productState
    );
  }

  updatePluCat(change: PluCatDur) {
    let pluCats: PluCats = this.productState.filter(
      ({ plu }) => plu === change.plu
    )[0];

    console.log(
      '%c[updatePluCat | pluCats, change]',
      Colors.BIG_BLUE,
      pluCats,
      change
    );
  }

  _updatePluCat(change: PluCatDur) {
    let hasPlu: PluCats = this.productState.filter(
      ({ plu }) => plu === change.plu
    )[0]; // ?? {} as PluCats
    // console.log('%c[hasPlu]', Colors.BIG_RED, hasPlu, change);
    let currentPluCats: CatDur[] = hasPlu?.categories;
    // console.log('%c[currentCats]', Colors.RED, currentCats);
    let currentCatNames = currentPluCats.map(
      ({ categoryName }) => categoryName
    );
    // console.log(
    //   '%c[currentCatNames]',
    //   Colors.BIG_MAG,
    //   currentCatNames,
    //   change.category.categoryName
    // );

    if (currentCatNames.includes(change.category.categoryName)) {
      console.log(
        '%c[includes]',
        Colors.BIGBIG_GREEN,
        change.category.categoryName
      );
    } else {
      console.log(
        '%c[NO includes]',
        Colors.BIGBIG_RED,
        change.category.categoryName
      );
      this.addPluCat(change);
    }
    // this.updatePluCat(change);
  }

  private addPluCat(change: PluCatDur) {
    // console.log('%c[!hasPlu]', Colors.BIGBIG_GREEN, change);
    let currentState = this.productState;
    let currentPlu = currentState.find(({ plu }) => plu === change.plu); //?.categories//.map(({ categories }) => categories)//.map(({ categoryName }) => categoryName)
    console.log(
      '%c[addPluCat currentPluCats]',
      Colors.INFO,
      change,
      currentPlu
    );
    let update: PluCats[] = [];
    let currCatNames = currentPlu?.categories.map((c) => c.categoryName);
    console.log(
      '%c[addPluCat currentPluCats]',
      Colors.BIGBIG_GREEN,
      currCatNames
    );
    if (!currCatNames?.includes(change.category.categoryName)) {
      console.log(
        '%c [1.NO ----]',
        Colors.GOLDEN_BLACK,
        currCatNames,
        change.category.categoryName
      );
      update = [
        {
          plu: change.plu,
          categories: [
            // currCatNames,
            change.category,
          ],
        },
      ];
    } else {
      console.log('%c [2.----]', Colors.GOLDEN_BLACK, currentPlu?.categories);
    }
    let newPluCats: PluCats = {
      plu: change.plu,
      categories: [change.category],
    };
    // let update: PluCats[] = [
    //   ...currentState,
    //   newPluCats
    // ]
    this._productsStateSubj.next(update);
    console.log('%c[addPluCat update]', Colors.BIGBIG_GREEN, change, update);
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
