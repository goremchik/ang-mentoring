// Core
import { ActivatedRoute } from '@angular/router';

export function getTitle({ snapshot }: ActivatedRoute): string {
  const { data: { title = '' } = {} } = snapshot;
  return title;
}
