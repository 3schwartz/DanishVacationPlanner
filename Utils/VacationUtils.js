import moment from 'moment';

export const vacationMonthMultiplier = 25 / 12;

export function lastDayInAugust(year) { return moment([year, 8 - 1, 31]); }

export function lastDayInDecember(year) { return moment([year, 12 - 1, 31]); }

export function firstDayInSeptember(year) { return moment([year, 9 - 1, 1]); }

export function firstDayInJanuar(year) { return moment([year, 1 - 1, 1]); }

export function findMonthPastInLastVacationYear(lastEndDate) { 
    return lastEndDate.month() + 1 < 9 ?
    9 - (lastEndDate.month() + 1) :
    8 + 12 - lastEndDate.month();
 }