// Utils
import { shiftDate } from './date';

describe('Date util shiftDate', () => {
    let date;

    beforeEach(() => {
        date = new Date(Date.parse('2020-01-01'));
    });

    it('should should return 02 Jan 2020', () => {
        expect(+shiftDate(date, { daysShift: 1 })).toEqual(Date.parse('2020-01-02'));
    });

    it('should should return 31 Dec 2019', () => {
        expect(+shiftDate(date, { daysShift: -1 })).toEqual(Date.parse('2019-12-31'));
    });

    it('should should keep date the same', () => {
        expect(+shiftDate(date, {})).toEqual(Date.parse('2020-01-01'));
    });
});
