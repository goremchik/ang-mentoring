// Core
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

// Utils
import { getBreadcrumbs, getTitle } from './route';

// Mocks
import { breadcrumbs } from 'src/app/mock';

describe('Route utils', () => {
    const route = new ActivatedRoute();
    route.snapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        route.snapshot.data = {};
    });

    describe('getBreadcrumbs', () => {
        it('should return empty list', () => {
            expect(getBreadcrumbs(route)).toEqual([]);
        });

        it('should return breadcrumbs', () => {
            route.snapshot.data = { breadcrumb: 'Courses' };
            expect(getBreadcrumbs(route)).toEqual([breadcrumbs[0]]);
        });
    });

    describe('getTitle', () => {
        const title = 'title';
        beforeEach(() => {
            route.snapshot.data = { title };
        });

        it('should return title', () => {
            expect(getTitle(route)).toEqual(title);
        });
    });
});

