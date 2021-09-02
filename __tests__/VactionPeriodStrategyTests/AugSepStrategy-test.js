import 'react-native';
import moment from 'moment';
import AugSepStrategy from '../../Services/VacationPeriodStrategy/AugSepStrategy';

describe("AugSepStrategy", () => {
    let startDate = moment("2011-08-28");
    let endDate = moment("2011-09-02");

    test("When Last End Date Before Sep Last Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-06-05")
        let lastYearVacation = 0.0;
        let currentYearVacation = 2.0;

        let strategy = new AugSepStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(19);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(19);
    })

    test("When Last End Date Before Sep but same year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2011-06-05")
        let lastYearVacation = 0.0;
        let currentYearVacation = 2.0;

        let strategy = new AugSepStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(2.25);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(2.25);
    })

    test("When Last End Date Before Sep and last year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-10-05")
        let lastYearVacation = 0.0;
        let currentYearVacation = 1.0;

        let strategy = new AugSepStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(17.92);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(17.92);
    })

    test("When Last End Date Not Supported Then Throw Error", () => {
        let lastEndDate = moment("2030-07-30")

        let strategy = new AugSepStrategy(startDate, endDate);
        // Act & Assert
        expect(() => strategy
            .calculateVacations(lastEndDate, 0, 0)
            .toThrowError('AugSepStrategy combination not supported'));
    })
})