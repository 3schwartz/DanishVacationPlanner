export default class LastEndDateBeforeLastYearCalculations {
    static isSatisfied(lastEndDate, startDate) {
        return Boolean(
            lastEndDate.year() < startDate.year() & (lastEndDate.month() + 1) < 9 || 
            (lastEndDate.year() < startDate.year() -1)
        );
    }
}