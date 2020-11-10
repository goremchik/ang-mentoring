// Core
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { ICourse } from 'src/app/core';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

@Component({
  selector: 'app-add-course-container',
  templateUrl: './add-course-container.component.html',
  styleUrls: ['./add-course-container.component.scss']
})
export class AddCourseContainerComponent {
  course: ICourse;

  constructor(
    public courseService: CourseService,
    public router: Router,
  ) {}

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
    this.redirectToHome();
  }

  onFormCancel(): void {
    this.redirectToHome();
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }
}
