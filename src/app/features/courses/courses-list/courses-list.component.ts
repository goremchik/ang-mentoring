// Core
import { Component, Input , Output, EventEmitter } from '@angular/core';

// Models
import { ICourse } from '../../../core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: ICourse[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(courseId: string): void {
    this.edit.emit(courseId);
  }

  onDelete(courseId: string): void {
    this.delete.emit(courseId);
  }
}
