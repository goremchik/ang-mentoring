// Core
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Models
import { ICourse } from '../../../core';

// Services
import { DateService } from '../../../core/services/date/date.service';

export const MINUTES_IN_HOUR = 60;

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent {
  @Input() course: ICourse;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor(
    private dateService: DateService,
  ) { }

  getDuration(): string {
    return this.dateService.getDuration(this.course?.duration);
  }

  onEditClick(): void {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }
}
