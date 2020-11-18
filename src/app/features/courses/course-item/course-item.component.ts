// Core
import {
  Component, EventEmitter, Input, Output, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { ICourse } from 'src/app/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() course: ICourse;
  @Output() delete = new EventEmitter<string>();

  onDeleteClick(): void {
    this.delete.emit(this.course.id);
  }
}
