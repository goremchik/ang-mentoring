// Core
import { Pipe, PipeTransform } from '@angular/core';

export const MINUTES_IN_HOUR = 60;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(duration = 0): string {
    let minutes = duration;
    let hours = 0;

    if (duration >= MINUTES_IN_HOUR) {
      minutes = duration % MINUTES_IN_HOUR;
      hours = Math.floor(duration / MINUTES_IN_HOUR);
    }

    return `${hours ? hours + 'h ' : ''}${minutes} min`;
  }
}
