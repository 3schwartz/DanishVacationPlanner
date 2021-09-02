import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import FirstCalculationDay from './components/FirstCalculationDay';
import FirstCalculationDaySelector from './components/FirstCalculationDaySelector';
import VacationSelector from './components/VacationSelector';
import Vacation from './components/Vacation';
import Subject from './components/Subject';

class App extends Subject {
  constructor(props) {
    super(props);

    this.state = {
      firstCalculationDay: null,

      remainingVacationDays: 0.0,
      remainingVacationDaysLastYear: 0.0,

      calendarSelected: false,

      vacations: [],
      observers: []
    }
  }

  firstCalculationDayCallback = (date, remainingVacationDays, remainingVacationDaysLastYear) => {
    this.setState({
      firstCalculationDay: date,
      remainingVacationDays: remainingVacationDays,
      remainingVacationDaysLastYear: remainingVacationDaysLastYear
    },
      () => {
        this.notify();
        this.setState({ calendarSelected: false })
      });
  }

  vacationsCallback = (vacation) => {
    let sortedVacations = [...this.state.vacations, vacation]
      .sort((firstVacation, secondVacation) =>
        firstVacation.startDate - secondVacation.startDate);

    this.setState({ vacations: sortedVacations }, () => {
      this.notify();
    })
  }

  vacationRemoveCallback = (vacationKey, vacation) => {
    this.setState({
      vacations: this.state.vacations.filter(function (vacation) {
        return vacation.key !== vacationKey
      })
    }, () => {
      this.removeObserver(vacation);
    });
  }

  render() {
    const { calendarSelected } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <>
              {/* Start date component */}
              {!calendarSelected &&
                <FirstCalculationDay
                  firstCalculationDayGetter={() => this.state.firstCalculationDay}
                  remainingVacationDaysGetter={() => this.state.remainingVacationDays}
                  remainingVacationDaysLastYear={() => this.state.remainingVacationDaysLastYear}
                  calenderSelectedCallback={(value) => this.setState({ calendarSelected: value })}
                  firstCalculationDayCallback={(date) => this.setState({ firstCalculationDay: date })}
                />
              }
              {calendarSelected &&
                <FirstCalculationDaySelector
                  firstCalculationDayGetter={() => this.state.firstCalculationDay}
                  remainingVacationDaysGetter={() => this.state.remainingVacationDays}
                  remainingVacationDaysLastYear={() => this.state.remainingVacationDaysLastYear}
                  vacationsGetter={() => this.state.vacations}
                  calenderSelectedCallback={(value) => this.setState({ calendarSelected: value })}
                  firstCalculationDayCallback={this.firstCalculationDayCallback}
                />
              }
              {/* Vacation range picker component */}
              {!calendarSelected &&
                <VacationSelector
                  vacations={this.state.vacations}
                  firstCalculationDay={this.state.firstCalculationDay}
                  vacationsCallback={this.vacationsCallback}
                />
              }
            </>
          }
          data={this.state.vacations}
          renderItem={({ item, index }) =>
            <Vacation
              vacationGetter={() => this.state.vacations}
              addObserver={this.addObserver}
              calendarSelected={this.state.calendarSelected}
              firstCalculationDay={this.state.firstCalculationDay}
              remainingVacationDays={this.state.remainingVacationDays}
              remainingVacationDaysLastYear={this.state.remainingVacationDaysLastYear}
              item={item}
              index={index}
              vacationRemoveCallback={this.vacationRemoveCallback}
            />
          }
          ListFooterComponent={
            <></>
          }
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    flexGrow: 1
  }
});

export default App;