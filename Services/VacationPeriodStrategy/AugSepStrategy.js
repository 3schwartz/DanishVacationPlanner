import moment from 'moment';
import VacationPeriodStrategy from './VacationPeriodStrategy';
import VacationCalculation from '../../Models/VacationCalculation';
import { vacationMonthMultiplier, lastDayInAugust, firstDayInSeptember, findMonthPastInLastVacationYear } from '../../Utils/VacationUtils';
import LastEndDateFirstMonthSameYearOrLastMonthLastYear from '../../Specifications/LastEndDateFirstMonthSameYearOrLastMonthLastYear';
import LastEndDateBeforeLastYearCalculations from '../../Specifications/LastEndDateBeforeLastYearCalculations';

export default class AugSepStrategy extends VacationPeriodStrategy {
    constructor(startDate, endDate) {
        super(startDate, endDate);

        this.usedAfter = moment(this.endDate)
            .diff(firstDayInSeptember(this.startDate.year()), 'days') + 1;

        this.usedBefore = moment(lastDayInAugust(this.startDate.year()))
            .diff(this.startDate, 'days') + 1;
    }

    calculateVacations(lastEndDate, lastYearVacation, currentYearVacation) {
        if (LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateBeforePeriod(lastEndDate, lastYearVacation, currentYearVacation);
        }

        if (LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation);
        }

        throw new Error("AugSepStrategy combination not supported");
    }

    calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation) {
        lastYearVacation = 12 * vacationMonthMultiplier - this.usedBefore;

        currentYearVacation = ((this.endDate.month() + 1) - 9) * vacationMonthMultiplier;

        let updatedVacations = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.usedAfter);

        return new VacationCalculation(updatedVacations.lastYearVacation, updatedVacations.currentYearVacation);
    }

    calculationLastEndDateBeforePeriod(lastEndDate, lastYearVacation, currentYearVacation) {
        let monthsPast = findMonthPastInLastVacationYear(lastEndDate);

        lastYearVacation = currentYearVacation + monthsPast * vacationMonthMultiplier - this.usedBefore;

        currentYearVacation = ((this.endDate.month() + 1) - 9) * vacationMonthMultiplier;

        let updatedVacations = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.usedAfter);

        return new VacationCalculation(updatedVacations.lastYearVacation, updatedVacations.currentYearVacation);
    }
}
