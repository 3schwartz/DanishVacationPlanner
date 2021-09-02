import 'react-native';
import moment from 'moment';
import LastEndDateFirstMonthSameYearOrLastMonthLastYear from '../../Specifications/LastEndDateFirstMonthSameYearOrLastMonthLastYear';
import LastEndDateBeforeLastYearCalculations from '../../Specifications/LastEndDateBeforeLastYearCalculations';

describe("LastEndDateBeforeLastYearCalculations", () => {
    let startDate = moment("2011-12-05");

    test("When same year and first month Then Return false", () => {
        // Arrange
        let lastEndDate = moment("2011-01-01");

        // Act
        let satisfied = LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, startDate);

        // Assert
        expect(satisfied).toBe(false);
    })

    test("When before last year to calculate Then Return true", () => {
        // Arrange
        let lastEndDate = moment("2008-01-01");

        // Act
        let satisfied = LastEndDateBeforeLastYearCalculations.isSatisfied(lastEndDate, startDate);

        // Assert
        expect(satisfied).toBe(true);
    })
})

describe("LastEndDateFirstMonthSameYearOrLastMonthLastYear", () => {
    let startDate = moment("2011-12-05");

    test("When same year and first month Then Return true", () => {
        // Arrange
        let lastEndDate = moment("2011-01-01");

        // Act
        let satisfied = LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, startDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("When last year and last months Then Return true", () => {
        // Arrange
        let lastEndDate = moment("2010-11-01");

        // Act
        let satisfied = LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, startDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("When last year and first months Then Return false", () => {
        // Arrange
        let lastEndDate = moment("2010-01-01");

        // Act
        let satisfied = LastEndDateFirstMonthSameYearOrLastMonthLastYear.isSatisfied(lastEndDate, startDate);

        // Assert
        expect(satisfied).toBe(false);
    })
})