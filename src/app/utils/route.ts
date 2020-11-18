// Core
import { ActivatedRoute } from '@angular/router';

export function getBreadcrumbs(route: ActivatedRoute): string[] {
  const breadcrumbs = [];
  do {
      const { snapshot } = route;
      const { data: { breadcrumb } = {} } = snapshot;
      if (breadcrumb) {
        breadcrumbs.push(breadcrumb);
      }
      try {
        route = route.parent;
      } catch(e) {
        route = null;
      }
  } while (route);

  return breadcrumbs.reverse();
}

export function getTitle({ snapshot }: ActivatedRoute): string {
  const { data: { title = '' } = {} } = snapshot;
  return title;
}
