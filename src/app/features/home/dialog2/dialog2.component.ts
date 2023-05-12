import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home.component';

@Component({
  selector: 'dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss']
})
export class Dialog2Component {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
