import {
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Input,
  Output,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ICourse } from '../../../core';


export const MINUTES_IN_HOUR = 60;

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent
  implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() course: ICourse;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  // TODO: in future it will be replaced by pipe
  public getDuration(): string {
    let minutes = this.course.duration;
    let hours = 0;

    if (this.course.duration >= MINUTES_IN_HOUR) {
      minutes = this.course.duration % MINUTES_IN_HOUR;
      hours = Math.floor(this.course.duration / MINUTES_IN_HOUR);
    }

    return `${hours ? hours + 'h ' : ''}${minutes} min`;
  }

  onEditClick() {
    this.edit.emit(this.course.id);
  }

  onDeleteClick() {
    this.delete.emit(this.course.id);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
