export default class VacationCalculation {
    constructor(lastYearVacation, currentYearVacation) {
        this.lastYearVacation = lastYearVacation;
        this.currentYearVacation = currentYearVacation
        this.remainingVacation = lastYearVacation + currentYearVacation;
    }
}