import 'react-native';
import moment from 'moment';
import VacationPeriodFactory from '../../Services/VacationPeriodFactory';
import SepDecStrategy from '../../Services/VacationPeriodStrategy/SepDecStrategy';
import AugSepStrategy from '../../Services/VacationPeriodStrategy/AugSepStrategy';
import JanAugStrategy from '../../Services/VacationPeriodStrategy/JanAugStrategy';
import DecJanStrategy from '../../Services/VacationPeriodStrategy/DecJanStrategy';

describe('VacationPeriodFactory - Return correct Vacation Period Strategy', () => {
    test("When Sep-Dec Then Return SepDecStrategy", () => {
        // Arrange
        let startDate = moment("20110901");
        let endDate = moment("20110901");

        // Act
        let vacationPeriod = VacationPeriodFactory.getVactionPeriodStrategy(startDate, endDate);

        // Assert
        expect(vacationPeriod).toBeInstanceOf(SepDecStrategy);
    })

    test("When Aug-Sep Then Return AugSepStrategy", () => {
        // Arrange
        let startDate = moment("20110801");
        let endDate = moment("20110901");

        // Act
        let vacationPeriod = VacationPeriodFactory.getVactionPeriodStrategy(startDate, endDate);

        // Assert
        expect(vacationPeriod).toBeInstanceOf(AugSepStrategy);
    })

    test("When Sep-Dec Then Return SepDecStrategy", () => {
        // Arrange
        let startDate = moment("20110101");
        let endDate = moment("20110801");

        // Act
        let vacationPeriod = VacationPeriodFactory.getVactionPeriodStrategy(startDate, endDate);

        // Assert
        expect(vacationPeriod).toBeInstanceOf(JanAugStrategy);
    })

    test("When Sep-Dec Then Return SepDecStrategy", () => {
        // Arrange
        let startDate = moment("20101201");
        let endDate = moment("20110101");

        // Act
        let vacationPeriod = VacationPeriodFactory.getVactionPeriodStrategy(startDate, endDate);

        // Assert
        expect(vacationPeriod).toBeInstanceOf(DecJanStrategy);
    })

    test("When Sep-Dec Then Return SepDecStrategy", () => {
        // Arrange
        let startDate = moment("20111201");
        let endDate = moment("20100101");

        // Act & Assert
        expect(() => VacationPeriodFactory.getVactionPeriodStrategy(startDate, endDate))
            .toThrowError('Error in choosen vacation combination');
    })
})