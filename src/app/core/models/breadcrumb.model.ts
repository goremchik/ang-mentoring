import { Observable } from 'rxjs';

export interface BreadcrumbModel {
    label: string | Observable<string>;
    url: string;
}
