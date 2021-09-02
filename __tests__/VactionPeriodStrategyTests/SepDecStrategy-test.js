import 'react-native';
import moment from 'moment';
import SepDecStrategy from '../../Services/VacationPeriodStrategy/SepDecStrategy';

describe("SepDecStrategy", () => {
    let startDate = moment("2011-12-05");
    let endDate = moment("2011-12-09");

    test("When Same Day Then Update Correct", () => {
        // Arrange
        let startDate = moment("2011-09-01");
        let endDate = moment("2011-09-01");
        let lastEndDate = moment("2011-09-01");

        let lastYearVacation = 2.0;
        let currentYearVacation = 0;

        let strategy = new SepDecStrategy(startDate, endDate);
        
        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(1);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(1);
    })

    test("When Last End Date Before Sep Last Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-01-30")
        let lastYearVacation = 0.0;
        let currentYearVacation = 2.0;

        let strategy = new SepDecStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(20);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.25);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(26.25);
    })

    test("When Last End Date Between Sep and Dec Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2011-09-30")
        let lastYearVacation = 2.0;
        let currentYearVacation = 0.0;

        let strategy = new SepDecStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(3.25);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(3.25);
    })

    test("When Last End Date Before Sep Same Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2011-07-30")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        let strategy = new SepDecStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(1.17);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.25);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(7.42);
    })

    test("When Last End Date Before Sep Last Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-11-11")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        let strategy = new SepDecStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(17.83);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(6.25);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(24.08);
    })

    test("When Last End Date Not Supported Then Throw Error", () => {
        let lastEndDate = moment("2030-07-30")

        let strategy = new SepDecStrategy(startDate, endDate);
        // Act & Assert
        expect(() => strategy
            .calculateVacations(lastEndDate, 0, 0)
            .toThrowError('SepDecStrategy combination not supported'));
    })
})