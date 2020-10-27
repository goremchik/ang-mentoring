// Core
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  @Output() add = new EventEmitter<string>();

  onClick(): void {
    this.add.emit();
  }
}
