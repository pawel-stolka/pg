import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@common/Colors';

@Component({
  selector: 'category-durations',
  templateUrl: './category-durations.component.html',
  styleUrls: ['./category-durations.component.scss'],
})
export class CategoryDurationsComponent implements OnInit {
  @Input() durations!: any;

  durationsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });


  }
  ngOnInit(): void {
    const toSelect = this.durations.durations[0];
    console.log('%c[durations | toSelect]', Colors.BIGBIG_BLUE, toSelect);
    this.durationsForm.get('durations')?.setValue(toSelect);
  }
}
