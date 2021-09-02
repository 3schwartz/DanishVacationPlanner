import moment from 'moment';
import VacationPeriodStrategy from './VacationPeriodStrategy';
import VacationCalculation from '../../Models/VacationCalculation';
import { vacationMonthMultiplier } from '../../Utils/VacationUtils';
import LastEndDateFirstMonthSameYearOrLastMonthLastYear from '../../Specifications/LastEndDateFirstMonthSameYearOrLastMonthLastYear';
import LastEndDateBeforeLastYearCalculations from '../../Specifications/LastEndDateBeforeLastYearCalculations';

export default class JanAugStrategy extends VacationPeriodStrategy {
    constructor(startDate, endDate) {
        super(startDate, endDate);

        this.used = moment(endDate).diff(startDate, 'days') + 1;
    }

    calculateVacations(lastEndDate, lastYearVacation, currentYearVacation) {
        if (LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateSameVacationYear(lastEndDate, lastYearVacation, currentYearVacation);
        }

        if (LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, this.startDate)) {
            return this.calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation);
        }

        throw new Error("JanAugStrategy combination not supported");
    }

    calculationLastEndDateBeforeLastYear(lastYearVacation, currentYearVacation) {
        currentYearVacation = (4 + this.endDate.month()) * vacationMonthMultiplier - this.used;

        lastYearVacation = 0;

        return new VacationCalculation(lastYearVacation, currentYearVacation);
    }

    calculationLastEndDateSameVacationYear(lastEndDate, lastYearVacation, currentYearVacation) {
        let monthPast = lastEndDate.month() + 1 < 9 ?
            this.endDate.month() - lastEndDate.month() :
            12 - lastEndDate.month() + this.endDate.month();

        currentYearVacation += monthPast * vacationMonthMultiplier - this.used;

        lastYearVacation = 0;

        return new VacationCalculation(lastYearVacation, currentYearVacation);
    }
}
