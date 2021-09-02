import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Separator extends Component {
    render() {
        return (
            <View style={styles.separator}/>
        )
    }
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 1,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})
