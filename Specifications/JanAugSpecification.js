import VacationPeriodSpecification from './VacationPeriodSpecification'

export default class JanAugSpecification extends VacationPeriodSpecification {
    static isSatisfied(startDate, endDate) {
        return Boolean(
            startDate.month() + 1 < 9 &
            endDate.month() + 1 < 9 &
            startDate.year() === endDate.year());
    }
}