import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category, createRandomTierItems, TierList } from 'src/app/core';

@Component({
  selector: 'div[tier-list-dialog]',
  templateUrl: './tier-list-dialog.component.html',
  styleUrls: ['./tier-list-dialog.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class TierListDialogComponent {
  random: boolean = false;
  pictures: Array<string> = [];
  nPictures: number = 0;

  onAddNewPictureButtonClicked(value: string) {
    this.pictures.push(value);
  }

  onRemovePictureButtonClicked(i: number) {
    this.pictures = this.pictures.filter((_, index) => index != i);
  }

  getOutputData() {
    this.data.tierList.title = this.firstFormGroup.get('title').value;
    this.data.tierList.description = this.firstFormGroup.get('title').value;
    this.data.tierList.banner = this.firstFormGroup.get('banner').value;
    this.data.tierList.items = createRandomTierItems(this.firstFormGroup.get('nrows').value);
    if (!this.random) {
      this.data.tierList.pictures = this.pictures;
    } else {
      this.data.tierList.category = Category.Random;
      this.data.tierList.nPictures = this.nPictures;
    }
    return this.data;
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      banner: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', Validators.required],
      nrows: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      nPictures: [0, this.conditionalRequirementValidator(this.random)]
    });
  }

  private conditionalRequirementValidator(value: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isRequired = value ? Validators.required(control) != null : false;
      return isRequired ? { conditionalRequirement: {value: control.value} } : null;
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TierListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'add' | 'edit', tierList: TierList },
  ) {}
}
