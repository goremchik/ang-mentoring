// Core
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { ICourse } from 'src/app/core';

// Pipes
import { FilterPipe } from 'src/app/shared';

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
  providers: [ FilterPipe ],
})
export class CoursesContainerComponent implements OnInit {
  courses: ICourse[] = [];
  searchValue = '';
  courseToRemove: ICourse;

  @ViewChild(DialogComponent) dialogChild: DialogComponent;

  constructor(
    private filterPipe: FilterPipe,
    private activatedRoute: ActivatedRoute,
    public courseService: CourseService,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getList();
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));
  }

  onSearchChange(value): void {
    this.searchValue = value;
    this.courses = this.filterPipe.transform(this.courseService.getList(), value);
  }

  onDelete(courseId: string): void {
    this.courseToRemove = this.courseService.getItemById(courseId);
    this.dialogChild.open();
  }

  onDeleteConfirm(): void {
    this.courseService.removeItem(this.courseToRemove.id);
    this.courses = this.courseService.getList();
  }

  onLoadMore(): void {
    console.log('Load more');
  }
}
