// Core
import { Pipe, PipeTransform } from '@angular/core';

export const MINUTES_IN_HOUR = 60;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(input: number | string = 0): string {
    const duration = +input || 0;
    let minutes = duration;
    let hours = 0;

    if (duration >= MINUTES_IN_HOUR) {
      minutes = duration % MINUTES_IN_HOUR;
      hours = Math.floor(duration / MINUTES_IN_HOUR);
    }

    return `${hours ? hours + 'h ' : ''}${minutes} min`;
  }
}
