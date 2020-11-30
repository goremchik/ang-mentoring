// Core
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { ICourse } from 'src/app/core';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

// Utils
import { routeUtils } from 'src/app/utils';

@Component({
  selector: 'app-add-course-container',
  templateUrl: './add-course-container.component.html',
  styleUrls: ['./add-course-container.component.scss']
})
export class AddCourseContainerComponent implements OnInit {
  course: ICourse;

  constructor(
    public courseService: CourseService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
  ) {}

  ngOnInit() {
    const { snapshot: { params = {} } } = this.activatedRoute;
    this.course = this.courseService.getItemById(params.id);

    const title = params.id
      ? this.course.title
      : routeUtils.getTitle(this.activatedRoute);
    this.titleService.setTitle(title);
  }

  onFormSubmit(courseBareData: any): void {
    // TODO: Will be changed in future MRs
    const courseData: ICourse = {
      id: this.course?.id || null,
      title: courseBareData.title,
      description: courseBareData.description,
      duration: +courseBareData.duration,
      creationDate: new Date(courseBareData.creationDate),
      authors: [courseBareData.authors],
    };

    if (this.course) {
      this.courseService.updateItem(courseData);
    } else {
      this.courseService.createCourse(courseData);
    }

    this.router.navigate(['/']);
  }
}
