import 'react-native';
import moment from 'moment';
import SepDecSpecification from '../../Specifications/SepDecSpecification';
import AugSepSpecification from '../../Specifications/AugSepSpecification';
import JanAugSpecification from '../../Specifications/JanAugSpecification';
import DecJanSpecification from '../../Specifications/DecJanSpecification';

describe("VacationPeriodSpecification - Return true if specification is satisfied by start- and end date", () => {
    test("DecJanSpecification - When within then return true", () => {
        // Arrange
        let startDate = moment("20101201");
        let endDate = moment("20110101");

        // Act
        let satisfied = DecJanSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("DecJanSpecification - When out of then return false", () => {
        // Arrange
        let startDate = moment("20110901");
        let endDate = moment("20110901");

        // Act
        let satisfied = DecJanSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(false);
    })

    test("JanAugSpecification - When within then return true", () => {
        // Arrange
        let startDate = moment("20110101");
        let endDate = moment("20110801");

        // Act
        let satisfied = JanAugSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("JanAugSpecification - When out of then return false", () => {
        // Arrange
        let startDate = moment("20110901");
        let endDate = moment("20110901");

        // Act
        let satisfied = JanAugSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(false);
    })

    test("AugSepSpecification - When within then return true", () => {
        // Arrange
        let startDate = moment("20110801");
        let endDate = moment("20110901");

        // Act
        let satisfied = AugSepSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("AugSepSpecification - When out of then return false", () => {
        // Arrange
        let startDate = moment("20110901");
        let endDate = moment("20110901");

        // Act
        let satisfied = AugSepSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(false);
    })

    test("SepDecSpecification - When within then return true", () => {
        // Arrange
        let startDate = moment("20110901");
        let endDate = moment("20110901");

        // Act
        let satisfied = SepDecSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(true);
    })

    test("SepDecSpecification - When out of then return false", () => {
        // Arrange
        let startDate = moment("20110831");
        let endDate = moment("20110901");

        // Act
        let satisfied = SepDecSpecification.isSatisfied(startDate, endDate);

        // Assert
        expect(satisfied).toBe(false);
    })
})
