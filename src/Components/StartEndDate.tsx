import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { GlobalStyles, Colors, ImagePath, formatDate } from '../Config'

interface DatesType {
    start: Date
    end: Date
}

interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const Name: React.FC<Props> = ({ dates, setDates }) => {
    const [visibleModal, setVisibleModal] = React.useState("none")

    const ConfirmDate = (start: Date, end: Date) => {
        console.log(start, end)
        if (start >= end) {
            let newEndDate = new Date(start)
            newEndDate.setDate(newEndDate.getDate() + 1);
            setDates({ start, end: newEndDate })
        } else {
            setDates({ start, end })
        }
        setVisibleModal("none")
    }

    return (
        <View style={[GlobalStyles.rowBetween, { width: '100%', alignSelf: 'center' }]}>
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={GlobalStyles.rowBetween}
                    onPress={() => setVisibleModal("start")}
                >
                    <Text
                        style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.75%'), color: Colors.inputGray }]}>
                        {formatDate(dates.start)}
                    </Text>
                    <Image
                        source={ImagePath.calendar}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    date={dates.start}
                    maximumDate={new Date()}
                    isVisible={visibleModal === "start"}
                    mode="date"
                    onConfirm={(date) => ConfirmDate(date, dates.end)}
                    onCancel={() => setVisibleModal("none")}
                />
            </View>

            <Text style={[GlobalStyles.regularText, { color: Colors.inputGray, marginHorizontal: wp('1%') }]}>-</Text>

            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={GlobalStyles.rowBetween}
                    onPress={() => setVisibleModal("end")}
                >
                    <Text
                        style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.75%'), color: Colors.inputGray }]}>
                        {formatDate(dates.end)}
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
                    isVisible={visibleModal === "end"}
                    mode="date"
                    onConfirm={(date) => ConfirmDate(dates.start, date)}
                    onCancel={() => setVisibleModal("none")}
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
        borderColor: Colors.inputGray,
        borderRadius: wp('10%'),
        paddingVertical: hp('1.25%'),
        paddingHorizontal: wp('3%'),
        width: '48%'
    }
})

export default Name