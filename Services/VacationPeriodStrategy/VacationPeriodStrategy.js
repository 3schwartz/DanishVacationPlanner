import VacationCalculation from '../../Models/VacationCalculation';

export default class VacationPeriodStrategy {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    calculateVacations(lastEndDate, lastYearVacation, currentYearVacation) {
        return new VacationCalculation(0.0, 0.0);
    }

    updateLastAndCurrentVacation(oldLastYearVacation, oldCurrentYearVacation, used) {
        let lastYearVacation = oldLastYearVacation;
        let currentYearVacation = oldCurrentYearVacation;

        if (0 > lastYearVacation - used) {
            currentYearVacation += lastYearVacation - used;
            lastYearVacation = 0;
        } else {
            lastYearVacation -= used;
        }

        return { lastYearVacation, currentYearVacation };
    }
}
