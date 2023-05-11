import { Injectable } from '@angular/core';
import { Colors } from '@common/Colors';
import { mockProducts } from '@common/_mocks/mockProducts';
import {
  Product,
  Category,
  InsuranceType,
  PluCats,
  PluCatDur,
  CatDur,
} from '@common/models';
import { BehaviorSubject, Observable, map, of, shareReplay, tap } from 'rxjs';

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
      let pluUpdate: PluCats = {
        plu: change.plu,
        categories: [...stateForPluCategories, change.category],
      };
      this._productsStateSubj.next([pluUpdate]);
    }
  }

  changeDuration(change: PluCatDur) {
    let stateForPlu = this.productState.find(({ plu }) => plu === change.plu);
    let stateForPluCategories = stateForPlu?.categories;
    let TO_LEAVE_otherCategoriesForPlu: CatDur[] | undefined =
      stateForPluCategories?.filter(
        (c) => c.categoryName !== change.category.categoryName
      ) ?? [];

    let TO_UPDATE_categorySameNameAsChange = stateForPluCategories?.find(
      (c) => c.categoryName === change.category.categoryName
    );

    let TO_UPDATE_plu;
    if (TO_UPDATE_categorySameNameAsChange !== undefined) {
      TO_UPDATE_categorySameNameAsChange.currentDuration =
        change.category.currentDuration;

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
        categories: [...TO_LEAVE_otherCategoriesForPlu],
      };
    }

    let TO_LEAVE_stateForOtherPlus = this.productState.filter(
      ({ plu }) => plu !== change.plu
    );

    let updateFIN = [TO_UPDATE_plu, ...TO_LEAVE_stateForOtherPlus];
    console.log('updateFIN', updateFIN);
    this._productsStateSubj.next(updateFIN);
  }
}
