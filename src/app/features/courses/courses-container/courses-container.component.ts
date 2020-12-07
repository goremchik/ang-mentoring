// Core
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { ICourse } from 'src/app/core';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

// Components
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

// Utils
import { routeUtils } from 'src/app/utils';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss'],
})
export class CoursesContainerComponent implements OnInit {
  courses: ICourse[] = [];
  searchValue = '';
  courseToRemove: ICourse;
  coursesCount = 5;

  @ViewChild(DialogComponent) dialogChild: DialogComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    public courseService: CourseService,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));
  }

  loadCourses(): void {
    this.courseService
      .getList(this.searchValue, 0, this.coursesCount, 'date')
      .subscribe(courses => {
        this.courses = courses;
      });
  }

  onSearchChange(value): void {
    this.searchValue = value;
    this.loadCourses();
  }

  getLoadedCourseById(courseId): ICourse {
    return this.courses.find(({ id }) => id === courseId);
  }

  onDelete(courseId: string): void {
    this.courseToRemove = this.getLoadedCourseById(courseId);
    this.dialogChild.open();
  }

  onDeleteConfirm(): void {
    this.courseService.removeItem(this.courseToRemove.id)
      .subscribe(() => {
        this.loadCourses();
      });
  }

  onLoadMore(): void {
    this.coursesCount += 5;
    this.loadCourses();
  }
}
