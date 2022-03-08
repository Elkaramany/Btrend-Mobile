import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, Colors } from '../../Config'

import Container from '../../Components/Container'
import Eearnings from './Earnings'
import Insights from './Insights'
import Payments from './Payments'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Dashboard: React.FC<Props> = ({ navigation }) => {

    const [selectedStat, setSelectedStat] = React.useState("Earnings")
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    const [dates, setDates] = React.useState({ start: d, end: new Date() })

    const Stat = (stat: string) => {
        const sameStat = selectedStat === stat
        return (
            <TouchableOpacity
                onPress={() => setSelectedStat(stat)}
                style={[styles.categoryContainer, {
                    borderBottomColor: sameStat ? Colors.brightRed : 'transparent'
                }]}>
                <Text style={[GlobalStyles.regularText, {
                    fontWeight: sameStat ? '500' : '400',
                    color: sameStat ? Colors.secondary : Colors.darkGray,
                }]}>{stat}</Text>
            </TouchableOpacity>
        )
    }

    const SelectedStatScreen = () => {
        if (selectedStat === "Earnings") return <Eearnings />
        else if (selectedStat === "Insights") return <Insights />
        else if (selectedStat === "Payments") return <Payments navigation={navigation} dates={dates} setDates={setDates} />
        else return <View />
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={{ paddingHorizontal: wp('4'), backgroundColor: Colors.primary }}>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('3%') }]}>My Dashboard</Text>
                <View style={{ marginTop: hp('4%'), flexDirection: 'row', }}>
                    {Stat("Earnings")}
                    {Stat("Insights")}
                    {Stat("Payments")}
                </View>
            </View>

            <View style={[GlobalStyles.horizontalLine, { width: '150%', bottom: hp('1%') }]} />

            <View style={{ flex: 1, marginHorizontal: wp('4') }}>
                {SelectedStatScreen()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginRight: wp('12%'),
        borderBottomWidth: hp('0.2%'),
        paddingBottom: hp('1%'),
    }
})

export default Dashboard