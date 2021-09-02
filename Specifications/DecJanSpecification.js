import VacationPeriodSpecification from './VacationPeriodSpecification'

export default class DecJanSpecification extends VacationPeriodSpecification {
    static isSatisfied(startDate, endDate) {
        return Boolean(
            startDate.month() + 1 > 8 &
            endDate.month() + 1 < 9 &
            startDate.year() === endDate.year() - 1);
    }
}