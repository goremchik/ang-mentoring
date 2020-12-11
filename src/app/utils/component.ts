// Core
import { Subscription } from 'rxjs';

export const unsubscribeAll = (subscriptions: Subscription[]): void => {
    subscriptions.forEach(subscription => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });
}