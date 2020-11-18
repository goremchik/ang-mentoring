// Core
import {
  Component, Input , Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { ICourse } from 'src/app/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent {
  @Input() courses: ICourse[] = [];
  @Output() delete = new EventEmitter<string>();

  onDelete(courseId: string): void {
    this.delete.emit(courseId);
  }
}
