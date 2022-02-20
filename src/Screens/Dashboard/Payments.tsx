import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, ImagePath, Colors } from '../../Config'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const DUMMY_DATA = [
    {
        campaignName: "Awesome campaign",
        brandName: "Very cool name",
        id: 5642314512,
        payments: [
            {
                date: "20.01.22",
                location: "sent to the account",
                status: "pending",
                amount: 12000,
                id: 12
            },
            {
                date: "15.07.21",
                location: "Your account",
                status: "waiting",
                amount: 15000,
                id: 457
            },
            {
                date: "19.08.21",
                location: "Your account",
                status: "done",
                amount: 2000,
                id: 78788
            }
        ]
    },
    {
        campaignName: "Awesome campaign2",
        brandName: "Very cool name2",
        id: 23131582,
        payments: [
            {
                date: "19.01.22",
                location: "sent to the account",
                status: "pending",
                amount: 11000,
                id: 56125627
            },
            {
                date: "14.07.21",
                location: "Your account",
                status: "waiting",
                amount: 14000,
                id: 23467
            },
            {
                date: "19.08.21",
                location: "Your account",
                status: "done",
                amount: 1900,
                id: 1245
            }
        ]
    }
]

const Payments: React.FC<Props> = ({ navigation }) => {
    return (
        <>
            <Text style={GlobalStyles.regularText}>Work in Progress</Text>
            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />
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
                                    <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2.5%') }]}>{item.campaignName}</Text>
                                    <Image
                                        source={ImagePath.arrowRight}
                                        style={GlobalStyles.arrowImage}
                                    />
                                </View>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('1.5%') }]}>{item.brandName}</Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '600', fontSize: hp('2.25%') }]}>#{item.id}</Text>
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