import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Dates from 'react-native-dates';
import Separator from './Separator';
import moment from 'moment';
import VacationDto from '../Models/VacationDto';

export default class VacationSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focus: 'startDate'
        }
    }

    addVacation = () => {
        if (!this.isSelectedVacationValid()) return;

        this.props.vacationsCallback(
            new VacationDto(Date.now(), this.state.startDate, this.state.endDate));

        this.setState({
            startDate: null,
            endDate: null
        });
    }

    isSelectedVacationValid = () => {
        if (!this.validateVacationNotOverlappingExisting()) return false;
        if (!this.validateVacationBeforeFirstCalculationDay()) return false;

        return true;
    }

    validateVacationBeforeFirstCalculationDay = () => {
        if (this.state.startDate < this.props.firstCalculationDay) {
            alert("En ferie kan ikke være før første dag");
            return false;
        }
        return true;
    }

    validateVacationNotOverlappingExisting = () => {
        let overlappingVacations = this.props.vacations
            .filter(vacation =>
                (vacation.startDate <= this.state.startDate && this.state.startDate <= vacation.endDate) ||
                (vacation.startDate <= this.state.endDate && this.state.endDate <= vacation.endDate))
        if (overlappingVacations.length > 0) {
            alert("Ferier kan ikke overlappe!");
            return false;
        }
        return true;
    }

    isDateBlocked = (date) =>
        ['lørdag', 'søndag'].includes(date.format('dddd'));

    onDatesChange = ({ startDate, endDate, focusedInput }) =>
        this.setState({ startDate, endDate, focus: focusedInput })

    render() {
        return (
            <View style={styles.column}>
                <Dates
                    style={{ marginTop: 1 }}
                    onDatesChange={this.onDatesChange}
                    isDateBlocked={this.isDateBlocked}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    focusedInput={this.state.focus}
                    range={true}
                />
                <View style={styles.row}>
                    <Text style={[styles.text, styles.textBold]}>
                        Fra
                    </Text>
                    <Text style={[styles.text, styles.textBold]}>
                        Til
                    </Text>
                    <Text style={[styles.text, styles.textBold]}>
                        Feriedage brugt
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.state.startDate && this.state.startDate.format('LL')}
                    </Text>
                    <Text style={styles.text}>
                        {this.state.endDate && this.state.endDate.format('LL')}
                    </Text>
                    <Text style={styles.text}>
                        {this.state.startDate && this.state.endDate &&
                            (moment(this.state.endDate).diff(this.state.startDate, 'days') + 1)}
                    </Text>
                </View>

                <View style={{ alignItems: "center", flex: 1 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            (!this.state.startDate || !this.state.endDate) && styles.disabledButton
                        ]}
                        disabled={!this.state.startDate || !this.state.endDate}
                        onPress={this.addVacation}
                    >
                        <Text
                            style={[
                                styles.buttonLabel,
                                (!this.state.startDate || !this.state.endDate) && styles.disabledButtonLabel
                            ]}
                        >
                            Tilføj ferie
                            </Text>
                    </TouchableOpacity>
                </View>
                <Separator />
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
    disabledButton: {
        backgroundColor: "oldlace",
    },
    disabledButtonLabel: {
        color: "coral",
    }
})