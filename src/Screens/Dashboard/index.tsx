import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles, Colors, validDate } from '../../Config'

import Container from '../../Components/Container'
import Eearnings from './Earnings'
import Insights from './Insights'
import Payments from './Payments'
import Transactions from './Transactions'

interface Props {

}

const Dashboard: React.FC<Props> = props => {

    const [selectedStat, setSelectedStat] = React.useState("Earnings")
    let d = new Date();
    d.setMonth(d.getMonth() - 1);
    const [dates, setDates] = React.useState({ start: validDate(d), end: validDate(new Date()) })

    const Stat = (stat: string) => {
        const sameStat = selectedStat === stat
        return (
            <TouchableOpacity
                onPress={() => setSelectedStat(stat)}
                style={[styles.categoryContainer, {
                    borderBottomColor: sameStat ? Colors.brightRed : 'transparent'
                }]}>
                <Text style={[GlobalStyles.regularText, {
                    fontWeight: sameStat ? 'bold' : 'normal',
                    color: sameStat ? Colors.secondary : Colors.darkGray,
                }]}>{stat}</Text>
            </TouchableOpacity>
        )
    }

    const SelectedStatScreen = () => {
        if (selectedStat === "Earnings") return <Eearnings dates={dates} setDates={setDates} />
        else if (selectedStat === "Insights") return <Insights />
        else if (selectedStat === "Payments") return <Payments />
        else if (selectedStat === "Transactions") return <Transactions dates={dates} setDates={setDates} />
        else return <View />
    }
    return (
        <Container mainStyle={{ marginTop: hp('1%'), marginHorizontal: wp('4'), flex: 1, }}>
            <Text style={[GlobalStyles.regularText, { fontWeight: 'bold' }]}>My Dashboard</Text>
            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />
            <View style={[GlobalStyles.rowAround, { width: '100%' }]}>
                {Stat("Earnings")}
                {Stat("Insights")}
                {Stat("Payments")}
                {Stat("Transactions")}
            </View>
            {SelectedStatScreen()}
        </Container>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginHorizontal: wp('3%'),
        borderBottomWidth: hp('0.2%'),
        paddingBottom: hp('1%'),
    }
})

export default Dashboard