import 'react-native';
import moment from 'moment';
import DecJanStrategy from '../../Services/VacationPeriodStrategy/DecJanStrategy';

describe("DecJanStrategy", () => {
    let startDate = moment("2010-12-28");
    let endDate = moment("2011-01-02");

    test("When Last End Date After Sep Current Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-09-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        let strategy = new DecJanStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(5.33);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(5.33);
    })

    test("When Last End Date After Sep Current Year and After Jan current year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-06-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        // Act
        let strategy = new DecJanStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.33);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(6.33);
    })

    test("When Last End Date Before Sep Last Year Year and Before Jan current year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2009-11-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        // Act
        let strategy = new DecJanStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.33);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(6.33);
    })

    test("When Last End Date Before Sep Last Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2009-05-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        // Act
        let strategy = new DecJanStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.33);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(6.33);
    })

    test("When Last End Date Not Supported Then Throw Error", () => {
        let lastEndDate = moment("2030-07-30")

        let strategy = new DecJanStrategy(startDate, endDate);

        // Act & Assert
        expect(() => strategy
            .calculateVacations(lastEndDate, 0, 0)
            .toThrowError('DecJanStrategy combination not supported'));
    })
})