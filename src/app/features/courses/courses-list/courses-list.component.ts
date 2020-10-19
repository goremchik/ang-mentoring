import { Component, Input , Output, EventEmitter } from '@angular/core';
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
    console.log('CoursesListComponent Edit course: ', courseId);
    this.edit.emit(courseId);
  }

  onDelete(courseId: string): void {
    console.log('CoursesListComponent Delete course: ', courseId);
    this.delete.emit(courseId);
  }
}
