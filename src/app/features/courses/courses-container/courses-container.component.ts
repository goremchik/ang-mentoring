// Core
import { Component, OnInit } from '@angular/core';

// Models
import { ICourse } from '../../../core';

// Mocks
import { courses } from '../../../mock';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss']
})
export class CoursesContainerComponent implements OnInit {
  courses: ICourse[] = [];

  ngOnInit(): void {
    this.courses = courses;
  }

  onEdit(courseId: string): void {
    console.log('Edit course: ', courseId);
  }

  onDelete(courseId: string): void {
    console.log('Delete course: ', courseId);
  }

  onAdd(): void {
    console.log('Add course');
  }

  onLoadMore(): void {
    console.log('Load more');
  }
}
