import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colors } from '@common/Colors';

@Component({
  selector: 'category-durations',
  templateUrl: './category-durations.component.html',
  styleUrls: ['./category-durations.component.scss'],
})
export class CategoryDurationsComponent implements OnInit {
  @Input() durations: any;
  @Input() category: any;
  @Output() currentDuration = new EventEmitter();

  toSelect: any;

  durationsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });
    this.durationsForm.valueChanges.subscribe(change => {
      // console.log('%c durationsForm change', Colors.BIG_MAG, change);
      this.currentDuration.emit({currentDuration: change.durations, category: this.durations.categoryName})
    })

  }
  ngOnInit(): void {
    const toSelect = this.durations.durations[0];
    this.toSelect = this.durations;
    // console.log('%c[durations | toSelect]', Colors.BIGBIG_BLUE, toSelect);
    this.durationsForm.get('durations')?.setValue(toSelect);
  }
}
