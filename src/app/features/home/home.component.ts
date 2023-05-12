import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog2Component } from './dialog2/dialog2.component';

export interface DialogData {
  test: string;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products$ = this.productService.products$;

  productsState$ = this.productService.productsState$;

  constructor(
    private readonly productService: ProductService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(Dialog2Component, {
      data: {
        test: 'pablo',
      },
    });
  }

  // openDialog(enterAnimationDuration = '250ms', exitAnimationDuration = '500ms'): void {
  //   this.dialog.open(DialogComponent, {
  //     width: '450px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
