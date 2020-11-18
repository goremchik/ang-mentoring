// Core
import { Component, EventEmitter, Output, Input } from '@angular/core';

// Models
import { ICourse } from 'src/app/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent {
  @Input() course: ICourse;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter();

  title = '';
  description = '';
  duration = '';
  creationDate = '';
  authors = '';

  onSubmit(e: Event): void {
    e.preventDefault();
    if (!this.isValid()) {
      return;
    }

    this.formSubmit.emit({
      title: this.title,
      description: this.description,
      duration: this.duration,
      creationDate: this.creationDate,
      authors: this.authors,
    });
  }

  isValid(): boolean {
    return !!this.authors
      && !!this.creationDate
      && !!this.description
      && !!this.title
      && !!this.duration;
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  inputHandler(value, name): void {
    this[name] = value;
    console.log();
  }
}
