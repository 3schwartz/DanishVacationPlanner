import VacationPeriodSpecification from './VacationPeriodSpecification';

export default class SepDecSpecification extends VacationPeriodSpecification {
    static isSatisfied(startDate, endDate) {
        return Boolean(
            startDate.month() + 1 > 8 &
            endDate.month() + 1 > 8 &
            endDate.month() + 1 <= 12 &
            startDate.year() === endDate.year());
    }
}