import { Component, OnInit } from '@angular/core';
import { ICourse } from '../course-item/course-item.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: ICourse[];
  constructor() { }

  ngOnInit(): void {
  }

}
