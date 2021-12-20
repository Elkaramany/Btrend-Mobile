import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Colors} from '../Config'

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText: string;
}

const Header: React.FC<Props> = ({ headerStyle, textStyle, headerText }) => {
    return (
        <View style={[styles.headerContainer, headerStyle]}>
            <Text style={[styles.headerTextStyle, textStyle]}>
                {headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: hp('20%'),
        backgroundColor: 'transparent'
    }, headerTextStyle: {
        color: Colors.secondary,
        fontSize: hp('5%'),
        fontWeight: 'bold'
    },
})

export default Header;