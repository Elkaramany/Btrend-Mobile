import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, ImagePath, Colors, grayTextInputTheme } from '../../Config'
import { DatesType } from './types';

import StartEndDate from '../../Components/StartEndDate'
import Input from '../../Components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GradientText from '../../Components/GradientText'

interface Props {
    navigation: StackNavigationProp<any, any>,
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const DUMMY_DATA = [
    {
        campaignName: "Awesome campaign",
        brandName: "Very cool name",
        id: 5642314512,
        amount: 5645612,
    },
    {
        campaignName: "Awesome campaign2",
        brandName: "Very cool name2",
        id: 23131582,
        amount: 78852,
    }
]

const Payments: React.FC<Props> = ({ navigation, dates, setDates }) => {
    const [search, setSearch] = React.useState('')

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

    return (
        <>
            <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1.5%') }]}>
                <Input
                    label={'Search'}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    inputStyle={{ width: wp('90%'), marginBottom: 0, height: hp('5%') }}
                />
                {showIcon()}
            </View>
            <StartEndDate dates={dates} setDates={setDates} />
            <FlatList
                data={DUMMY_DATA}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("SinglePayment", { payment: item })}
                                style={{ marginVertical: hp('2%') }}>
                                <View style={GlobalStyles.rowBetween}>
                                    <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2%'), marginBottom: hp('0.5%') }]}>{item.campaignName}</Text>
                                    <GradientText style={{ fontWeight: 'bold', fontSize: hp('2%') }} end={{ x: 0.35, y: 0.35 }}>${item.amount}</GradientText>
                                </View>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.75%') }]}>{item.brandName}</Text>
                            </TouchableOpacity>
                            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('0.5%') }]} />
                        </>

                    )
                }}
            />
        </>
    )
}

export default Payments