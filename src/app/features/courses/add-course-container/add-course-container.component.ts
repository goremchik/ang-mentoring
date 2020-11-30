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
    const subscription = this.courseService.getItemById(params.id)
      .subscribe((data) => {
        this.course = data;
        const title = params.id
          ? this.course.title
          : routeUtils.getTitle(this.activatedRoute);
        this.titleService.setTitle(title);
        subscription.unsubscribe();
      });
  }

  onFormSubmit(courseBareData: any): void {
    const courseData: ICourse = {
      id: this.course?.id || null,
      title: courseBareData.title,
      description: courseBareData.description,
      duration: +courseBareData.duration,
      creationDate: new Date(courseBareData.creationDate),
      authors: courseBareData.authors,
      topRated: this.course?.topRated || false,
    };

    if (this.course) {
      const subscription = this.courseService.updateItem(courseData)
        .subscribe(() => subscription.unsubscribe());
    } else {
      const subscription = this.courseService.createCourse(courseData)
        .subscribe(() => subscription.unsubscribe());
    }

    this.router.navigate(['/']);
  }
}
