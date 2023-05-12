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

  selection: any;

  durationsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.durationsForm = this.fb.group({
      durations: ['init', Validators.required],
    });
    this.durationsForm.valueChanges.subscribe((change) => {
      // console.log('%c durationsForm change', Colors.BIG_MAG, change);
      this.currentDuration.emit({
        currentDuration: change.durations,
        category: this.durations.categoryName,
      });
    });
  }
  ngOnInit(): void {
    console.log('%c[durations | CHECK]', Colors.BIG_YELLOW, this.durations);
    // const toSelect = this.durations.durations[0];
    const toSelect = this.durations.insuranceDetails[0].insurances[0].duration
    this.selection = this.durations.insuranceDetails[0].insurances[0].duration
    console.log('%c[durations | toSelect]', Colors.BIGBIG_BLUE, toSelect);
    this.durationsForm.get('durations')?.setValue(toSelect);
  }
}
