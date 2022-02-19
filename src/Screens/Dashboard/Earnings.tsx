import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
//@ts-ignore
import DateRangePicker from "rnv-date-range-picker";


import { GlobalStyles, Colors, ImagePath, formatDate } from '../../Config'
import { DatesType } from './types'

import GradientButton from '../../Components/GradientButton'


interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const Eearnings: React.FC<Props> = ({ dates, setDates }) => {
    const [visibleDate, setVisibleDate] = React.useState(false)

    const GraphDate = () => {
        if (visibleDate) {
            return (
                <>
                    <DateRangePicker
                        onSelectDateRange={(range: any) => {
                            console.log(range);
                            setDates({ start: range.firstDate, end: range.secondDate })
                        }}
                        responseFormat="MMMM DD, YYYY"
                        maxDate={new Date()}
                    />
                    <TouchableOpacity onPress={() => setVisibleDate(false)} style={GlobalStyles.centeredContainer}>
                        <Text style={[GlobalStyles.regularText,{color: Colors.darkRed}]}>Set New Dates</Text>
                    </TouchableOpacity>
                </>

            )
        }
    }

    return (
        <View style={styles.container}>
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

            <TouchableOpacity onPress={() => setVisibleDate(true)} style={[GlobalStyles.rowBetween, styles.dateContainer]}>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{dates.start} - {dates.end}</Text>
                <Image
                    source={ImagePath.calendar}
                    style={GlobalStyles.arrowImage}
                />
            </TouchableOpacity>

            <View style={{ marginTop: hp('1%') }}>
                {GraphDate()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%')
    }, mainContainer: {
        height: hp('20%'),
        borderRadius: hp('3%'),
        justifyContent: 'center'
    }, dateContainer: {
        alignSelf: 'center',
        width: '100%',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderWidth: hp('0.2%'),
        borderColor: Colors.gray,
        borderRadius: wp('10%')
    }
})

export default Eearnings