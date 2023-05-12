import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@common/Colors';
import { PluCatDur } from '@common/models';
import { map, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'category-durations',
  templateUrl: './category-durations.component.html',
  styleUrls: ['./category-durations.component.scss'],
})
export class CategoryDurationsComponent implements OnInit {
  @Input() plu: string = 'init-plu';
  @Input() durations: any;
  @Input() category: any;
  // @Output() currentDuration = new EventEmitter();

  currentDurations$ = this.productService.productsState$.pipe(
    map((pluCats) => pluCats.find((pc) => pc.plu === this.plu)?.categories),
    // tap(cd => console.log(`%c[currentDurations$ 2 ${this.plu}]`, Colors.BIG_ORANGE, cd)),
    map((cats) => ({
      durations: cats?.map(({currentDuration}) => currentDuration),
      currentCategory: cats?.find(
        ({categoryName}) => categoryName === this.category.categoryName
      ),
    }))
    // map(cats => cats?.find(cat => cat.categoryName === this.category.categoryName)),
    // map(cats => cats?.map(cat => cat.currentDuration))
    // map(cats => cats?.map(cat => cat.currentDuration))
  );

  durationsForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });
    this.durationsForm.valueChanges.subscribe((change) => {
      console.log('%c durationsForm change -> productService.setProductDuration', Colors.BIG_MAG);
      let pluCatDur: PluCatDur = {
        plu: this.plu,
        category: {
          categoryName: this.category.categoryName,
          currentDuration: change.durations
        }
      }
      this.productService.setProductDuration(pluCatDur)
      // this.currentDuration.emit({
      //   currentDuration: change.durations,
      //   category: this.durations.categoryName,
      // });
    });
  }
  ngOnInit(): void {
    // console.log('%c[durations | CHECK]', Colors.BIG_YELLOW, this.durations);
    // const toSelect = this.durations.durations[0];
    // const toSelect = this.durations.insuranceDetails[0].insurances[0].duration
    const toSelect = this.durations.insuranceDetails[0].insurances.map(
      (i: any) => i.duration
    )[0];
    // this.selection = this.durations.insuranceDetails[0].insurances.map((i: any) => i.duration)//[0].duration
    console.log('%c[durations | toSelect]', Colors.BIGBIG_BLUE, toSelect);
    this.durationsForm.get('durations')?.setValue(toSelect);
  }
}
