import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, Colors } from '../../Config'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Campaigns from './Campaigns'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const DUMMY_DATA = [
    {
        campaignName: "Awesome campaign",
        brandName: "Very cool name",
        id: 5642314512,
        amount: 3000,
        instagram: true,
    },
    {
        campaignName: "Awesome campaign2",
        brandName: "Very cool name2",
        id: 23131582,
        amount: 12000,
        instagram: true,
        snapchat: true,
        tiktok: true,
        youtube: true,
    }
]

const Collaborations: React.FC<Props> = ({ navigation }) => {
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
            <Campaigns data={DUMMY_DATA} navigation={navigation} screen={selectedTransaction} />
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