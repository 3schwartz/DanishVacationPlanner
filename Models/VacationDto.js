export default class VacationDto {
    constructor(key, startDate, endDate) {
        this.key = key;
        this.startDate = startDate;
        this.endDate = endDate;
        this.lastYearVacation = null;
        this.currentYearVacation = null;
        this.remainingVacation = null;
    }

    setLastYearVacation(lastYearVacation) {
        this.lastYearVacation = lastYearVacation;
    }

    setCurrentYearVacation(currentYearVacation) {
        this.currentYearVacation = currentYearVacation;
    }

    setRemainingVacation(remainingVacation) {
        this.remainingVacation = remainingVacation;
    }
}