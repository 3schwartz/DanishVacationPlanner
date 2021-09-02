import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';
import moment from 'moment';
import VacationDto from '../../Models/VacationDto';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('App-Vacations', () => {
  test("When more vacations Then they use previous", () => {
    // Arrange
    let year = (moment().month() < 9) ? moment().year() - 1 : moment().year();
    let day = moment(`${year}-09-01`);

    firstVacation = new VacationDto(1, day, day);
    secondVacation = new VacationDto(2, day, day);
    thirdVacation = new VacationDto(3, day, day);

    let app = renderer.create(<App />).getInstance();

    // Act
    app.vacationsCallback(firstVacation);
    app.vacationsCallback(secondVacation);
    app.vacationsCallback(thirdVacation);

    // Assert
    expect(app.state.vacations[0].remainingVacation).toBeCloseTo(-1);
    expect(app.state.vacations[1].remainingVacation).toBeCloseTo(-2);
    expect(app.state.vacations[2].remainingVacation).toBeCloseTo(-3);
  })

  test("When more vacations and delete Then they use previous", () => {
    // Arrange
    let year = (moment().month() < 9) ? moment().year() - 1 : moment().year();
    let day = moment(`${year}-09-01`);

    firstVacation = new VacationDto(1, day, day);
    secondVacation = new VacationDto(2, day, day);
    thirdVacation = new VacationDto(3, day, day);

    let app = renderer.create(<App />).getInstance();

    // Act
    app.vacationsCallback(firstVacation);
    app.vacationsCallback(secondVacation);
    app.vacationsCallback(thirdVacation);
    app.vacationRemoveCallback(2, app.state.observers[1])

    // Assert
    expect(app.state.vacations[0].remainingVacation).toBeCloseTo(-1);
    expect(app.state.vacations[1].remainingVacation).toBeCloseTo(-2);
  })
});

describe('App', () => {
  test('When deleting in App, then reference change', () => {
    // Arrange
    let day = moment();
    firstVacation = new VacationDto(1, day, day);
    secondVacation = new VacationDto(2, day, day);
    thirdVacation = new VacationDto(3, day, day);

    let app = renderer.create(<App />).getInstance();

    app.vacationsCallback(firstVacation);
    app.vacationsCallback(secondVacation);
    app.vacationsCallback(thirdVacation);

    let beforeKey = app.state.observers[2].state.previousVacation.key;

    // Act
    app.vacationRemoveCallback(2, app.state.observers[1])

    let afterKey = app.state.observers[1].state.previousVacation.key;

    // Assert
    expect(beforeKey).toBe(2)
    expect(afterKey).toBe(1)
  })

  test('When deleting in Vacation, then reference change', () => {
    // Arrange
    let day = moment();
    firstVacation = new VacationDto(1, day, day);
    secondVacation = new VacationDto(2, day, day);
    thirdVacation = new VacationDto(3, day, day);

    let app = renderer.create(<App />).getInstance();

    app.vacationsCallback(firstVacation);
    app.vacationsCallback(secondVacation);
    app.vacationsCallback(thirdVacation);

    let vacationToKeep = app.state.observers[2];
    let beforeKey = vacationToKeep.state.previousVacation.key;

    // Act
    app.state.observers[1].props.vacationRemoveCallback(2, app.state.observers[1])

    // Assert
    expect(beforeKey).toBe(2)
    expect(vacationToKeep.state.previousVacation.key).toBe(1)
  })
});