// Core
import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';

// Models
import { ICourse } from 'src/app/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnChanges {
  @Input() course: ICourse;
  @Output() formSubmit = new EventEmitter<any>();

  title = '';
  description = '';
  duration = '';
  creationDate = '';
  authors = [];

  ngOnChanges() {
    this.title = this.title || this.course?.title || '';
    this.description = this.description || this.course?.description || '';
    this.duration = this.duration || this.course?.duration.toString() || '';
    this.creationDate = this.creationDate
      || this.course?.creationDate.toString() || '';

    this.authors = this.course?.authors || [];
  }

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

  inputHandler(value, name): void {
    this[name] = value;
  }
}
