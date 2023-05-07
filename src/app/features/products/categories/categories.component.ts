import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, delay, of, tap } from 'rxjs';
import { Category } from 'src/app/services/product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];

  durations$: Observable<string[]>;

  durationForm: FormControl = new FormControl(); //'bla', Validators.required);

  durationsForm: FormGroup;
  durationsValues: string[] = []

  patientCategory: FormGroup;
  patientCategories = [
    {
      id: 1,
      name: 'name 1',
      description: 'description 1',
    },
    {
      id: 2,
      name: 'name 2',
      description: 'description 2',
    },
    {
      id: 3,
      name: 'name 3',
      description: 'description 3',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.durationsForm = this.fb.group({
      durations: [null, Validators.required],
    });
    this.durations$ = getDurations().pipe(
      tap(x => {
        this.durationsValues = x;
        const toSelect = this.durationsValues[0];
        this.durationsForm.get('durations')?.setValue(toSelect)
      }),
      tap(res => console.log('res', res))
      )

    this.patientCategory = this.fb.group({
      category: [null, Validators.required],
    });
    const toSelect0 = this.patientCategories.find((c) => c.id == 2);
    this.patientCategory.get('category')?.setValue(toSelect0);
  }

}

const getDurations = (): Observable<string[]> =>
  of(mockDurations).pipe(delay(2500));

const mockDurations: string[] = ['3', '5', '8', '11'];
