import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


import { GlobalStyles, Colors, ImagePath, formatDate } from '../../Config'
import { DatesType } from './types'

import StartEndDate from '../../Components/StartEndDate'


interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const Eearnings: React.FC<Props> = ({ dates, setDates }) => {

    return (
        <>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={Colors.gradientButton}
                style={styles.mainContainer}
            >
                <Text style={[GlobalStyles.regularText, { color: Colors.primary, left: wp('10%') }]}>
                    How much I've earned
                </Text>
                <Text style={[GlobalStyles.regularText, { color: Colors.primary, fontWeight: 'bold', fontSize: hp('5%'), left: wp('10%'), top: hp('1%') }]}>
                    $100
                </Text>
            </LinearGradient>

            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />

            <StartEndDate dates={dates} setDates={setDates} />


            <View style={{ marginTop: hp('1%') }}>

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: hp('20%'),
        borderRadius: hp('3%'),
        justifyContent: 'center'
    },
})

export default Eearnings