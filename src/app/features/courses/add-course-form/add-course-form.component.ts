// Core
import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// Models
import { ICourse, IAuthor } from 'src/app/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnChanges {
  @Input() course: ICourse;
  @Input() authors: IAuthor[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      creationDate: [new Date()],
      authors: [null, Validators.required],
    })
  }

  ngOnChanges() {
    if (this.course) {
      this.form.patchValue(this.course);
    }
  }

  onSubmit(): void {
    const formData = Object.entries(this.form.controls)
      .reduce((acc, [key, item]) => ({ ...acc, [key]: item.value }), {});
    this.formSubmit.emit(formData);
  }

  getField(fieldName: string): AbstractControl {
    return this.form.get(fieldName);
  }
}
