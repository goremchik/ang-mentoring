// Models
import { IDateShift } from '../core';

export function shiftDate(date: Date, { daysShift = 0 }: IDateShift): Date {
    const immutableDate = new Date(date);
    immutableDate.setDate(date.getDate() + daysShift);
    return immutableDate;
}
