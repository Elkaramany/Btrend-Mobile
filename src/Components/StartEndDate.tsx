import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { GlobalStyles, Colors, ImagePath, validDate } from '../Config'

interface DatesType {
    start: Date
    end: Date
}

interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const Name: React.FC<Props> = ({ dates, setDates }) => {
    const [startDateModal, setStartDateModal] = React.useState(false)
    const [endDateModal, setEndDateModal] = React.useState(false)

    const ConfirmDate = (start: Date, end: Date) => {
        setDates({ start, end })
        setStartDateModal(false)
        setEndDateModal(false)
    }

    return (
        <View style={[GlobalStyles.rowBetween, { width: '100%', alignSelf: 'center' }]}>
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={GlobalStyles.rowBetween}
                    onPress={() => setStartDateModal(true)}
                >
                    <Text
                        style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.85%'), color: Colors.darkGray }]}>
                        {validDate(dates.start)}
                    </Text>
                    <Image
                        source={ImagePath.calendar}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    date={dates.start}
                    maximumDate={new Date()}
                    isVisible={startDateModal}
                    mode="date"
                    onConfirm={(date) => ConfirmDate(date, dates.end)}
                    onCancel={() => setStartDateModal(false)}
                />
            </View>

            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>-</Text>

            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={GlobalStyles.rowBetween}
                    onPress={() => setEndDateModal(true)}
                >
                    <Text
                        style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.85%'), color: Colors.darkGray }]}>
                        {validDate(dates.end)}
                    </Text>

                    <Image
                        source={ImagePath.calendar}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    date={dates.end}
                    minimumDate={dates.start}
                    maximumDate={new Date()}
                    isVisible={endDateModal}
                    mode="date"
                    onConfirm={(date) => ConfirmDate(dates.start, date)}
                    onCancel={() => setEndDateModal(false)}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    }, dateContainer: {
        alignSelf: 'center',
        borderWidth: hp('0.2%'),
        borderColor: Colors.gray,
        borderRadius: wp('10%'),
        paddingVertical: hp('1.25%'),
        paddingHorizontal: wp('3%'),
        width: '45%'
    }
})

export default Name