import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Observer from './Observer';
import Separator from './Separator';
import VacationPeriodFactory from '../Services/VacationPeriodFactory';
import moment from 'moment';

export default class Vacation extends Observer {
    constructor(props) {
        super(props);

        this.props.addObserver(this);

        let previousVacation = this.setPreviousVacation(this.props.vacationGetter());

        let calculatedVacations = this.getCalculatedVacations(previousVacation);
        let vacation = this.updateVacation(calculatedVacations);

        this.state = {
            previousVacation: previousVacation,
            vacation: vacation,
        }
    }

    updateVacation = (calculatedVacations) => {
        let vacation = this.props.vacationGetter()[this.props.index];

        vacation.setLastYearVacation(calculatedVacations.lastYearVacation);
        vacation.setCurrentYearVacation(calculatedVacations.currentYearVacation);
        vacation.setRemainingVacation(calculatedVacations.remainingVacation);

        return vacation;
    }

    update = () => {
        let previousVacation = this.setPreviousVacation(this.props.vacationGetter());
        this.setState({ previousVacation: previousVacation });

        let calculatedVacations = this.getCalculatedVacations(previousVacation);
        let vacation = this.updateVacation(calculatedVacations);

        this.setState({ vacation: vacation });
    }

    getCalculatedVacations = (previousVacation) => {
        let vacationPeriod = VacationPeriodFactory
            .getVactionPeriodStrategy(this.props.item.startDate, this.props.item.endDate);

        return previousVacation === null ?
            vacationPeriod.calculateVacations(
                this.props.firstCalculationDay,
                this.props.remainingVacationDaysLastYear,
                this.props.remainingVacationDays) :
            vacationPeriod.calculateVacations(
                previousVacation.endDate,
                previousVacation.lastYearVacation,
                previousVacation.currentYearVacation);
    }

    setPreviousVacation = (vacations) => {
        if (this.props.index === 0) return null;

        let vacation = vacations[this.props.index - 1];

        return vacation;
    }

    render() {
        return (
            <View>
                {!this.props.calendarSelected &&
                    <View style={styles.column}>

                        <View style={styles.row}>

                            <View style={[styles.row, { flex: 2 }]}>

                                <View style={[styles.column, { flex: 1 }]}>
                                    <Text style={[styles.text, styles.textBold]}>
                                        Fra</Text>
                                    <Text style={styles.text}>
                                        {this.props.item.startDate.format('LL')}</Text>

                                </View>
                                <View style={[styles.column, { flex: 1 }]}>
                                    <Text style={[styles.text, styles.textBold]}>
                                        Til</Text>
                                    <Text style={styles.text}>
                                        {this.props.item.endDate.format('LL')}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: "center", flex: 1 }}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.vacationRemoveCallback(this.props.item.key, this)}>
                                    <Text style={styles.buttonLabel}>Slet</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.column, { flex: 1 }]}>
                                <Text style={[styles.text, styles.textBold]}>
                                    Feriedage brugt</Text>
                                <Text style={styles.text}>
                                    {(moment(this.props.item.endDate).diff(this.props.item.startDate, 'days') + 1)}
                                </Text>

                            </View>
                            <View style={[styles.column, { flex: 1 }]}>
                                <Text style={[styles.text, styles.textBold]}>
                                    Feriedage tilbage</Text>
                                <Text style={[styles.text, 
                                    this.state.vacation.remainingVacation >= 0 ? {color: "green"} : {color: "red"}]}>
                                    {this.state.vacation.remainingVacation.toFixed(2)}</Text>
                            </View>
                        </View>
                        <Separator />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column"
    },
    row: {
        flexDirection: "row"
    },
    textBold: {
        fontFamily: "Tajawal-Bold"
    },
    text: {
        flex: 1,
        fontFamily: "Tajawal-Regular",
        textAlign: "center"
    },
    button: {
        marginTop: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "coral",
        alignItems: "center",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    buttonLabel: {
        fontSize: 15,
        fontWeight: "500",
        color: "white",
        fontFamily: "Tajawal-Regular"
    },
})