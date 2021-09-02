import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Separator from './Separator';
import moment from 'moment';

export default class FirstCalculationDay extends Component {
    constructor(props) {
        super(props);

        if (this.props.firstCalculationDayGetter() === null) {
            this.setFirstCalculationDay();
        }
    }

    setFirstCalculationDay = () => {
        let year = (moment().month() < 9) ? moment().year() - 1 : moment().year();

        this.props.firstCalculationDayCallback(moment(`${year}-09-01`))
    }

    render() {
        return (
            <View>
                <View style={styles.column}>
                    <View style={styles.row}>
                        <View style={styles.innerElement}>
                            <Text style={[styles.text, styles.textBold]}>
                                Første dag
                                </Text>
                        </View>
                        <View style={styles.innerElement}>
                            <Text style={[styles.text, styles.textBold]}>
                                Feriedage tilbage nuværende år
                                </Text>
                        </View>
                        <View style={styles.innerElement}>
                            <Text style={[styles.text, styles.textBold]}>
                                Feriedage tilbage fra sidste år
                                </Text>
                        </View>

                    </View>
                    <View style={styles.row}>
                        <View style={styles.innerElement}>
                            <Text style={styles.text}>
                                {this.props.firstCalculationDayGetter() != null ?
                                    this.props.firstCalculationDayGetter().format('LL') :
                                    "Intet valgt"}
                            </Text>
                        </View>
                        <View style={styles.innerElement}>
                            <Text style={styles.text}>
                                {this.props.remainingVacationDaysGetter().toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.innerElement}>
                            <Text style={styles.text}>
                                {this.props.remainingVacationDaysLastYear().toFixed(2)}
                            </Text>
                        </View>

                    </View>
                </View>
                <View style={{ alignItems: "center", flex: 1 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.calenderSelectedCallback(true)}
                    >
                        <Text style={styles.buttonLabel}>Opdater begyndelses værdier</Text>
                    </TouchableOpacity>
                </View>
                <Separator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    innerElement: {
        flex: 1,
        alignItems: "center",
    },
    textBold: {
        fontFamily: "Tajawal-Bold"
    },
    text: {
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