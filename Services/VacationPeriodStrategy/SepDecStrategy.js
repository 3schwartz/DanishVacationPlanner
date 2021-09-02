import moment from 'moment';
import VacationPeriodStrategy from './VacationPeriodStrategy';
import VacationCalculation from '../../Models/VacationCalculation';
import { vacationMonthMultiplier, findMonthPastInLastVacationYear } from '../../Utils/VacationUtils';
import LastEndDateFirstMonthSameYearOrLastMonthLastYear from '../../Specifications/LastEndDateFirstMonthSameYearOrLastMonthLastYear';
import LastEndDateBeforeLastYearCalculations from '../../Specifications/LastEndDateBeforeLastYearCalculations';

export default class SepDecStrategy extends VacationPeriodStrategy {
    constructor(startDate, endDate) {
        super(startDate, endDate);

        this.used = moment(endDate).diff(startDate, 'days') + 1;
    }

    calculateVacations(lastEndDate, lastYearVacation, currentYearVacation) {
        if (lastEndDate.year() === this.startDate.year() & lastEndDate.month() + 1 > 8) {
            return this.calculationLastEndDateWithinPeriod(lastEndDate, lastYearVacation, currentYearVacation);
        }

        if (LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateBeforePeriod(lastEndDate, lastYearVacation, currentYearVacation);
        }

        if (LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation);
        }

        throw new Error("SepDecStrategy combination not supported");
    }

    calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation) {
        lastYearVacation = 12 * vacationMonthMultiplier;

        currentYearVacation = ((this.endDate.month() + 1) - 9) * vacationMonthMultiplier;

        let updatedVacations = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.used);

        return new VacationCalculation(updatedVacations.lastYearVacation, updatedVacations.currentYearVacation);
    }

    calculationLastEndDateBeforePeriod(lastEndDate, lastYearVacation, currentYearVacation) {
        let monthsPast = findMonthPastInLastVacationYear(lastEndDate);

        lastYearVacation = monthsPast * vacationMonthMultiplier + currentYearVacation;

        currentYearVacation = ((this.endDate.month() + 1) - 9) * vacationMonthMultiplier;

        let updatedVacations = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.used);

        return new VacationCalculation(updatedVacations.lastYearVacation, updatedVacations.currentYearVacation);
    }

    calculationLastEndDateWithinPeriod(lastEndDate, lastYearVacation, currentYearVacation) {
        currentYearVacation += (this.endDate.month() - lastEndDate.month())
            * vacationMonthMultiplier;

        let updatedVacations = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.used);

        return new VacationCalculation(updatedVacations.lastYearVacation, updatedVacations.currentYearVacation);
    }
}
