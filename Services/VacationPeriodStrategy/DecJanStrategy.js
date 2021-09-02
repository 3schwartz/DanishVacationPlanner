import moment from 'moment';
import VacationPeriodStrategy from './VacationPeriodStrategy';
import VacationCalculation from '../../Models/VacationCalculation';
import { vacationMonthMultiplier, lastDayInDecember, firstDayInJanuar, findMonthPastInLastVacationYear } from '../../Utils/VacationUtils';
import LastEndDateFirstMonthSameYearOrLastMonthLastYear from '../../Specifications/LastEndDateFirstMonthSameYearOrLastMonthLastYear';
import LastEndDateBeforeLastYearCalculations from '../../Specifications/LastEndDateBeforeLastYearCalculations';

export default class DecJanStrategy extends VacationPeriodStrategy {
    constructor(startDate, endDate) {
        super(startDate, endDate);

        this.usedBefore = moment(lastDayInDecember(this.startDate.year()))
            .diff(this.startDate, 'days') + 1;

        this.usedAfter = moment(this.endDate)
            .diff(firstDayInJanuar(this.endDate.year()), 'days') + 1;
    }

    calculateVacations(lastEndDate, lastYearVacation, currentYearVacation) {

        if (lastEndDate.year() == this.startDate.year() & lastEndDate.month() + 1 > 8) {
            currentYearVacation += (12 - lastEndDate.month()) * vacationMonthMultiplier;

            return this.distributeBeforeAndAfter(lastYearVacation, currentYearVacation);
        }

        if (LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, this.startDate)) {
            let monthsPast = findMonthPastInLastVacationYear(lastEndDate);

            lastYearVacation = currentYearVacation + monthsPast * vacationMonthMultiplier;

            currentYearVacation = ((this.startDate.month() + 1) - 8) * vacationMonthMultiplier;

            return this.distributeBeforeAndAfter(lastYearVacation, currentYearVacation);
        }

        if (LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, this.startDate)) {
            lastYearVacation = 25;
            
            currentYearVacation = ((this.startDate.month() + 1) - 8) * vacationMonthMultiplier;

            return this.distributeBeforeAndAfter(lastYearVacation, currentYearVacation);
        }

        throw new Error("DecJanStrategy combination not supported");
    }

    distributeBeforeAndAfter(lastYearVacation, currentYearVacation) {
        let updatedBefore = this.updateLastAndCurrentVacation(lastYearVacation, currentYearVacation, this.usedBefore);

        updatedBefore.currentYearVacation += this.endDate.month() * vacationMonthMultiplier - this.usedAfter;

        return new VacationCalculation(0, updatedBefore.currentYearVacation);
    }
}
