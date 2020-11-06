// Core
import { Pipe, PipeTransform } from '@angular/core';

// Models
import { ICourse } from '../../../core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: ICourse[], orderField = 'creationDate', order = 'desc'): ICourse[] {
    const isDesc = order === 'desc';
    return [...value]
      .sort((itemA: ICourse, itemB: ICourse): number => {
        if (itemA[orderField] > itemB[orderField]) {
          return isDesc ? -1 : 1;
        } else if (itemA[orderField] < itemB[orderField]) {
          return isDesc ? 1 : -1;
        }
        return 0;
      });
  }
}
