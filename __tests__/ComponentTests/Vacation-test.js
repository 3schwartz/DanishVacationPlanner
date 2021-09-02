import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Vacation from '../../components/Vacation';
import moment from 'moment';
import VacationDto from '../../Models/VacationDto';

describe('Vacation - Two elements', () => {
    test("When more Elements Then Use Each others remaing", () => {
        // Arrange
        let vacationBefore = new VacationDto(1, moment("2011-09-01"), moment("2011-09-01"));
        vacationBefore.setLastYearVacation(2.0);
        vacationBefore.setCurrentYearVacation(1.0)

        let vacationItem = new VacationDto(1, moment("2011-09-01"), moment("2011-09-01"));

        // Act
        let vacation = renderer.create(<Vacation
            addObserver={(_) => {}}
            firstCalculationDay={moment("2011-09-01")}
            remainingVacationDays={0}
            remainingVacationDaysLastYear={0}
            vacationGetter={() => [vacationBefore, vacationItem]}
            item={vacationItem}
            index={1}
        />).getInstance();

        // Assert
        expect(vacation.state.vacation.remainingVacation).toBe(2.0);
        expect(vacation.state.vacation.lastYearVacation).toBe(1.0);
        expect(vacation.state.vacation.currentYearVacation).toBe(1.0);
    })
})

describe('Vacation - First Calculation Day', () => {
    test('When one vacation usable for last year, then use last year', () => {
        // Arrange
        let remainingVacationDaysLastYear = 2.0;

        let vacationItem = new VacationDto(1, moment("2011-09-01"), moment("2011-09-01"));

        // Act
        let vacation = renderer.create(<Vacation
            addObserver={(_) => {}}
            firstCalculationDay={moment("20110901", "YYYYMMDD")}
            remainingVacationDays={0}
            remainingVacationDaysLastYear={remainingVacationDaysLastYear}
            vacationGetter={() => [vacationItem]}
            item={vacationItem}
            index={0}
        />).getInstance();

        // Assert
        expect(vacation.state.vacation.remainingVacation).toBe(1.0);
    })

    test('When two days left and use one, then one day left', () => {
             // Arrange
             let firstCalculationDay = moment("20110901", "YYYYMMDD");
             let remainingVacationDaysLastYear = 2.0;

             let vacationItem = new VacationDto(1, moment("2011-10-01"), moment("2011-10-01", "YYYYMMDD"));
     
             // Act
             let vacation = renderer.create(<Vacation
                 addObserver={(_) => {}}
                 firstCalculationDay={firstCalculationDay}
                 remainingVacationDays={0}
                 remainingVacationDaysLastYear={remainingVacationDaysLastYear}
                 vacationGetter={() => [vacationItem]}
                 item={vacationItem}
                 index={0}
             />).getInstance();
     
             // Assert
             expect(vacation.state.vacation.remainingVacation).toBeCloseTo(3.08);
    })
})