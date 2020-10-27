// Core
import { Component, OnInit } from '@angular/core';

// Models
import { ICourse } from '../../../core';

// Pipes
import { FilterPipe } from '../../../shared';

// Mocks
import { courses } from '../../../mock';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss'],
  providers: [ FilterPipe ]
})
export class CoursesContainerComponent implements OnInit {
  courses: ICourse[] = [];
  searchValue = '';

  constructor(private filterPipe: FilterPipe) {}

  ngOnInit(): void {
    this.courses = courses;
  }

  onSearchChange(value): void {
    this.searchValue = value;
    this.courses = this.filterPipe.transform(courses, value);
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
