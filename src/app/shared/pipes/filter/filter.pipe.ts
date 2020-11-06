// Core
import { Pipe, PipeTransform } from '@angular/core';

// Models
import { ICourse } from '../../../core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(courses: ICourse[], filterValue = ''): ICourse[] {
    const value = filterValue.toLowerCase();

    return courses.filter((course): boolean => {
      const duration = course.description.toLowerCase();
      const title = course.title.toLowerCase();

      return !value || duration.includes(value) || title.includes(value);
    });
  }
}
