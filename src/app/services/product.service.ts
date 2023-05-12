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

const products: Product[] = mockProducts;

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

  setProductDuration(pluCatDur: PluCatDur) {
    console.log('%c[this.setProductDuration]', Colors.BIG_BLUE, pluCatDur);
    // debugger;
    this.changeState(pluCatDur);
    // this.changeState(pluCatDur);
  }

  getProducts$(): Observable<Product[]> {
    let DEFAULT_TYPE_ID = 0;
    return of(products).pipe(
      // tap((products) =>
      //   console.log('%c[products]', Colors.GOLDEN_BLACK, products)
      // ),
      map((products) =>
        products.map((p) => ({
          ...p,
          categories: p.categories.map((c) => ({
            ...c,
            insuranceDetails: c.insuranceDetails.map((det) => ({
              type: det.insurances.map((_) => det.type)[DEFAULT_TYPE_ID],
              insurances: det.insurances,
            })),
            // durations: c.insuranceDetails.map(({ duration }) => duration),
          })),
        }))
      ),
      shareReplay(),
      // tap((products) =>
      //   console.log('%c[products AFTER]', Colors.GOLDEN_BLACK, products)
      // ),
      tap((products) => {
        let pluCats: PluCats[] = products.map(({ plu, categories }) => {
          let catDurs: CatDur[] | any[] = categories.map(
            ({ categoryName, insuranceDetails }) => ({
              categoryName,
              currentDuration: insuranceDetails.map(
                (det) => det.insurances.map((ins) => ins.duration)[0]
              ),
            })
          );
          return {
            plu,
            categories: catDurs,
          };
        });
        this.setInitialDurations(pluCats);
      })
    );
  }

  setInitialDurations(pluCats: PluCats[]) {
    pluCats.forEach((pluCat, i) => {
      pluCat.categories.forEach((category, j) => {
        let pluCatDur: PluCatDur = {
          plu: pluCat.plu,
          category: category,
        };
        this.changeState(pluCatDur);
        // let pluState = this.productState.find(
        //   (pluCats) => pluCats.plu === pluCat.plu
        // )?.categories;
        // console.log(`AFTER CHANGE | ${pluCat.plu}`, pluState);
      });
    });
  }

  changeState(change: PluCatDur) {
    // console.log('%c[changeState]', Colors.BIG_YELLOW, change);
    // console.log('%c[currentState]', Colors.RED, this.productState);
    let pluInState = !!this.productState.find(({ plu }) => plu === change.plu);

    if (!pluInState) {
      this.addPluToState(change);
    } else {
      this.updatePluInState(change);
    }
    // console.log('%c[3.productState]', Colors.GOLDEN_BLACK, this.productState);
  }

  private addPluToState(change: PluCatDur) {
    let otherPlus = this.productState.filter(
      (state) => state.plu !== change.plu
    );

    let currentChange: PluCats = {
      plu: change.plu,
      categories: [change.category],
    };
    let update: PluCats[] = [...otherPlus, currentChange];
    this._productsStateSubj.next(update);
    // console.log('%c[3.addPluToState FIN]', Colors.INFO_FIN, this.productState);
  }

  private updatePluInState(change: PluCatDur) {
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
      let otherPlus = this.productState.filter(
        (state) => state.plu !== change.plu
      );
      let correctUpdate: PluCats[] = [...otherPlus, pluUpdate];
      this._productsStateSubj.next(correctUpdate);
    }

    // console.log(
    //   '%c[STATE 3.updatePluInState]',
    //   Colors.INFO_FIN,
    //   this.productState
    // );
  }

  private changeDuration(change: PluCatDur) {
    // debugger;
    let stateForPlu = this.productState.find(({ plu }) => plu === change.plu);
    let stateForPluCategories = stateForPlu?.categories;

    // this.productState = []


    // let TO_LEAVE_otherCategoriesForPlu: CatDur[] | undefined =
    //   stateForPluCategories?.filter(
    //     (c) => c.categoryName !== change.category.categoryName
    //   ) ?? [];

    // let TO_UPDATE_categorySameNameAsChange = stateForPluCategories?.find(
    //   (c) => c.categoryName === change.category.categoryName
    // );

    // let TO_UPDATE_plu;
    // if (TO_UPDATE_categorySameNameAsChange !== undefined) {
    //   TO_UPDATE_categorySameNameAsChange.currentDuration =
    //     change.category.currentDuration;

    //   TO_UPDATE_plu = {
    //     plu: change.plu,
    //     categories: [
    //       TO_UPDATE_categorySameNameAsChange,
    //       ...TO_LEAVE_otherCategoriesForPlu,
    //     ],
    //   };
    // } else {
    //   TO_UPDATE_plu = {
    //     plu: change.plu,
    //     categories: [...TO_LEAVE_otherCategoriesForPlu],
    //   };
    // }

    // let TO_LEAVE_stateForOtherPlus = this.productState.filter(
    //   ({ plu }) => plu !== change.plu
    // );

    // let updateFIN = [...TO_LEAVE_stateForOtherPlus, TO_UPDATE_plu];
    // // console.log('updateFIN', updateFIN);
    // this._productsStateSubj.next(updateFIN);
  }
}
