import 'react-native';
import moment from 'moment';
import JanAugStrategy from '../../Services/VacationPeriodStrategy/JanAugStrategy';

describe("JanAugStrategy", () => {
    let startDate = moment("2011-04-10");
    let endDate = moment("2011-06-02");

    test("When Last End Date After Jan Current Year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2011-02-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        let strategy = new JanAugStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(-43.67);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(-43.67);
    })

    test("When Last End Date Before Jan current year and before Sep last year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2010-11-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        // Act
        let strategy = new JanAugStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(-37.42);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(-37.42);
    })

    test("When Last End Date Before Sep last year Then Update Correct", () => {
        // Arrange
        let lastEndDate = moment("2009-02-05")
        let lastYearVacation = 1.0;
        let currentYearVacation = 2.0;

        // Act
        let strategy = new JanAugStrategy(startDate, endDate);

        // Act
        let calculatedVacations = strategy
            .calculateVacations(lastEndDate, lastYearVacation, currentYearVacation);

        // Assert
        expect(calculatedVacations.lastYearVacation).toBeCloseTo(0);
        expect(calculatedVacations.currentYearVacation).toBeCloseTo(-35.25);
        expect(calculatedVacations.remainingVacation).toBeCloseTo(-35.25);
    })

    test("When Last End Date Not Supported Then Throw Error", () => {
        let lastEndDate = moment("2030-07-30")

        let strategy = new JanAugStrategy(startDate, endDate);

        // Act & Assert
        expect(() => strategy
            .calculateVacations(lastEndDate, 0, 0)
            .toThrowError('JanAugStrategy combination not supported'));
    })
})