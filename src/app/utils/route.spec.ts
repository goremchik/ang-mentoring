// Core
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

// Utils
import { getTitle } from './route';

// Mocks
import { breadcrumbs } from 'src/app/mock';

describe('Route utils', () => {
    const route = new ActivatedRoute();
    route.snapshot = new ActivatedRouteSnapshot();

    beforeEach(() => {
        route.snapshot.data = {};
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

