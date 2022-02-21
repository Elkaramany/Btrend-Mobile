import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, Colors } from '../../Config'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Invited from './Invited'
import OnGoing from './OnGoing'
import Finished from './Finished'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Collaborations: React.FC<Props> = ({navigation}) => {
    const [search, setSearch] = React.useState('')
    const [selectedTransaction, setSelectedTransaction] = React.useState("On-going")

    const showIcon = () => {
        if (search.length) {
            return (
                <Icon name={"close"}
                    size={25} color={Colors.darkGray}
                    style={{ right: wp('9%'), top: hp('0.4%') }}
                    onPress={() => setSearch('')} />
            )
        } else return <View />
    }

    const Stat = (stat: string) => {
        const sameStat = selectedTransaction === stat
        return (
            <TouchableOpacity
                onPress={() => setSelectedTransaction(stat)}
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

    const SelectedTransactionScreen = () => {
        if (selectedTransaction === "On-going") return <OnGoing navigation={navigation}/>
        else if (selectedTransaction === "Invited") return <Invited />
        else if (selectedTransaction === "Finished") return <Finished />
        else return <View />
    }

    return (
        <Container>
            <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('3.5%') }]}>Collaborations</Text>
            <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />
            <View style={GlobalStyles.rowBetween}>
                <Input
                    label={'Brand  / Campaign name'}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    inputStyle={{ width: wp('95%'), marginBottom: 0, height: hp('5%') }}
                />
                {showIcon()}
            </View>
            <View style={[GlobalStyles.rowAround, { width: '100%', marginVertical: hp('2%') }]}>
                {Stat("On-going")}
                {Stat("Invited")}
                {Stat("Finished")}
            </View>
            {SelectedTransactionScreen()}
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

export default Collaborations