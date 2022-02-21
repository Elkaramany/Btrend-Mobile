import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, Colors, ImagePath } from '../../Config';

import Container from '../../Components/Container'

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>,
}

const SinglePayment: React.FC<Props> = ({ route, navigation }) => {
    const { payment } = route.params;
    return (
        <Container mainStyle={{ marginTop: hp('1%'), marginHorizontal: wp('4'), flex: 1, }}>
            <View style={GlobalStyles.rowBetween}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={ImagePath.leftArrow}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>
                <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('3%') }]}>#{payment.id}</Text>
                <View />
            </View>

            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('3%') }]} />

            <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('2.5%'), marginBottom: hp('0.5%') }]}>{payment.campaignName}</Text>
            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{payment.brandName}</Text>

            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />

            <FlatList
                data={payment.payments}
                keyExtractor={(index) => `${index}`}
                renderItem={({ item }) => {
                    return (
                        <>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.date}</Text>
                            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('0.5%') }]}>
                                <Text
                                    style={[GlobalStyles.regularText, { fontWeight: '400', fontSize: hp('2.5%'), marginBottom: hp('0.5%') }]}>
                                    {item.location}
                                </Text>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.status}</Text>
                            </View>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '600', fontSize: hp('3%') }]}>${item.amount}</Text>
                            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('3%') }]} />
                        </>
                    )
                }}
            />
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SinglePayment