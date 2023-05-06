import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';
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

  patientCategory: FormGroup; // = new FormGroup(null);

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
    this.durations$ = getDurations();
    this.patientCategory = this.fb.group({
      category: [null, Validators.required],
    });
    const toSelect = this.patientCategories.find((c) => c.id == 2);
    this.patientCategory.get('category')?.setValue(toSelect);
  }

  ngOnInit() {
  }

  /*
  animalsSub: any = null;
  animals: string[] = [];
  animalCtrl: FormControl = new FormControl();
  // animals = mockAnimals;
  // animalControl = new FormControl<Animal>(this.animals[0], Validators.required);

  constructor() {
    this.durations$ = this.getDurations();
  }

  ngOnInit(): void {
    this.animalsSub = this.getAnimals().subscribe(res => {
      // console.log('this.getAnimals | SUB', res);

      this.animals = res;
      console.log('this.animals', this.animals);
      //Not Working
      // this.animalCtrl.setValue('Cat');

      //Working
      // setTimeout(() => {
      //   this.animalCtrl.setValue('Cat');
      // }, 0);
    });
  }

  getAnimals = (): Observable<any> => {
    return of(mockAnimals).pipe(delay(1500));
  };

  getDurations = (): Observable<string[]> => of(mockDurations).pipe(delay(1500));
*/
}

const getDurations = (): Observable<string[]> =>
  of(mockDurations).pipe(delay(1500));

const mockDurations: string[] = ['3', '5', '8', '11'];

const mockAnimals: string[] = ['Lion', 'Tiger', 'Dog', 'Cat'];

const mockAnimals0: Animal[] = [
  { name: 'Dog', sound: 'Woof!' },
  { name: 'Cat', sound: 'Meow!' },
  { name: 'Cow', sound: 'Moo!' },
  { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
];

interface Animal {
  name: string;
  sound: string;
}
