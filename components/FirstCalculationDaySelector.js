import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Dates from 'react-native-dates';
import Separator from './Separator';

export default class FirstCalculationDaySelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: this.props.firstCalculationDayGetter(),
            remainingVacationDays: this.props.remainingVacationDaysGetter(),
            remainingVacationDaysLastYear: this.props.remainingVacationDaysLastYear()
        }
    }

    update = () => {
        if (!this.isSelectedDayAfterAnyVacation()) return;

        this.props.firstCalculationDayCallback(
            this.state.selectedDate,
            this.state.remainingVacationDays,
            this.state.remainingVacationDaysLastYear);
    }

    isSelectedDayAfterAnyVacation = () => {
        let vacationsBefore = this.props.vacationsGetter()
            .filter(vacation => vacation.startDate < this.state.selectedDate);

        if (vacationsBefore.length > 0) {
            alert("Første dag kan ikke være før planlagte ferie");
            return false;
        }
        return true;
    }

    isDateBlocked = (date) =>
        date.format('D') !== '1';

    onDateChange = ({ date }) => {
        this.setState({ selectedDate: date })
    }

    handleRemainingVacationDays = (value) => {       
        if (!value) return;

        let valueReplaced = value.replace(",", ".")
        
        var validNumber = new RegExp(/^\d*\.?\d*$/);
        
        if (validNumber.test(valueReplaced)) {
            this.setState({ remainingVacationDays: parseFloat(valueReplaced) });
        }
    }

    handleRemainingVacationDaysLastYear = (value) => {       
        if (!value) return;

        let valueReplaced = value.replace(",", ".")
        
        var validNumber = new RegExp(/^\d*\.?\d*$/);
        
        if (validNumber.test(valueReplaced)) {
            this.setState({ remainingVacationDaysLastYear: parseFloat(valueReplaced) });
        }
    }

    render() {
        return (
            <View style={styles.column}>
                <Dates
                    date={this.state.selectedDate}
                    onDatesChange={this.onDateChange}
                    isDateBlocked={this.isDateBlocked}
                    focusedInput='startDate'
                />
                <Separator />
                <View style={styles.row}>
                    <Text style={[styles.text, styles.textBold]}>
                        Første dag valgt hvorfra nedenstående værdier gælder</Text>
                    <Text style={[styles.text, { alignSelf: "center" }]}>
                        {this.state.selectedDate && this.state.selectedDate.format('LL')}
                    </Text>
                </View>
                <Separator />
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={[styles.text, styles.textBold]}>
                            Feriedage tilbage nuværende år</Text>
                        <Text style={[styles.text, styles.textItalic]}>
                            Tag ikke med fra samme måned og ikke som summen nuværende og nedenstående fra sidste år.
                            Dvs. kun ferie efter 1. sep</Text>
                    </View>
                    <View style={styles.column}>
                        <TextInput
                            style={styles.numericTextInput}
                            onChangeText={this.handleRemainingVacationDays}
                            placeholder={this.props.remainingVacationDaysGetter().toFixed(2)}
                        />
                    </View>
                </View>
                <Separator />
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={[styles.text, styles.textBold]}>
                            Feriedage tilbage fra sidste år</Text>
                        <Text style={[styles.text, styles.textItalic]}>
                            Vælgers en dag mellem 1. januar og 31. august inkl. da vil denne altid være nul i beregninger</Text>
                    </View>
                    <View style={styles.column}>
                    <TextInput
                            style={styles.numericTextInput}
                            onChangeText={this.handleRemainingVacationDaysLastYear}
                            placeholder={this.props.remainingVacationDaysLastYear().toFixed(2)}
                        />
                    </View>
                </View>
                <Separator />

                <View style={styles.row}>


                    <View style={{ alignItems: "center", flex: 1 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.props.calenderSelectedCallback(false)}
                        >
                            <Text style={styles.buttonLabel}>Tilbage</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                (!this.state.selectedDate) && styles.disabledButton
                            ]}
                            disabled={!this.state.selectedDate}
                            onPress={this.update}
                        >
                            <Text
                                style={[
                                    styles.buttonLabel,
                                    (!this.state.selectedDate) && styles.disabledButtonLabel
                                ]}
                            >
                                Opdater
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    column: {
        flex: 1,
        flexDirection: "column"
    },
    row: {
        marginTop: 5,
        flexDirection: "row"
    },
    textItalic: {
        fontFamily: "Tajawal-ExtraLight",
        fontSize: 12,
        fontStyle: "italic"
    },
    textBold: {
        fontFamily: "Tajawal-Bold"
    },
    text: {
        flex: 1,
        fontFamily: "Tajawal-Regular",
        textAlign: "center",
    },
    numericTextInput: {
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        fontFamily: "Tajawal-Regular",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 4,
        maxHeight: "50%",
        minWidth: "50%",
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
    disabledButton: {
        backgroundColor: "oldlace",
    },
    disabledButtonLabel: {
        color: "coral",
    }
})
