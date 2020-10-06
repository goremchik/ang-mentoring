import { Component, OnInit } from '@angular/core';

export interface ICourse {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: number;
}

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, ICourse {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: number;

  constructor() { }

  ngOnInit(): void {
  }

}
