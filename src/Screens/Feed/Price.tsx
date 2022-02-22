import React from 'react'
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Image, FlatList
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles, ImagePath } from '../../Config'

import Container from '../../Components/Container'


interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const Price: React.FC<Props> = ({ navigation, route }) => {
    const { item } = route.params

    const SocialMediaPrice = (title: string, prices: any[], img: any) => {
        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: wp('2.5%') }}>
                    <Image
                        source={img}
                        style={{ height: wp('10%'), width: wp('10%'), marginRight: wp('5%') }}
                    />
                    <Text style={[GlobalStyles.regularText, { fontWeight: '600' }]}>{title}</Text>
                </View>
                {prices.map((item, index) => {
                    return (
                        <>
                            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), marginHorizontal: wp('2.5%') }]}>
                                <Text style={GlobalStyles.regularText}>{item.title}</Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '600' }]}>${item.amount}</Text>
                            </View>
                            {index !== (prices.length - 1) && <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />}

                        </>
                    )
                })}
                <View style={GlobalStyles.graySeperator} />
            </>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
            <View style={GlobalStyles.rowBetween}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={ImagePath.leftArrow}
                        style={[GlobalStyles.arrowImage, { marginLeft: wp('2.5%') }]}
                    />
                </TouchableOpacity>
                <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2.65%') }]}>What price includes</Text>
                <View />
            </View>
            <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />

            <View style={styles.paymentTypeContainer}>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.payment}</Text>
            </View>


            <ScrollView style={{ flexGrow: 1, }}
            >
                {SocialMediaPrice("Instagram",
                    [{ title: "1 Post", amount: 350 }, { title: "3 Stories", amount: 300 }, { title: "1 Reel", amount: 500 }],
                    ImagePath.instaUrl)}
                {SocialMediaPrice("Snapchat",
                    [{ title: "1 Post", amount: 350 }, { title: "3 Stories", amount: 300 }, { title: "1 Reel", amount: 500 }],
                    ImagePath.ic_snapchat)}
                {SocialMediaPrice("Tiktok",
                    [{ title: "1 Post", amount: 350 }, { title: "3 Stories", amount: 300 }, { title: "1 Reel", amount: 500 }],
                    ImagePath.ic_tiktok)}
                {SocialMediaPrice("Youtube",
                    [{ title: "1 video", amount: 350 }, { title: "3 Stories", amount: 300 }, { title: "1 Post", amount: 500 }],
                    ImagePath.ic_youtube)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    paymentTypeContainer: {
        borderWidth: wp('0.2%'),
        borderColor: Colors.darkGray,
        width: wp('35%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
        borderRadius: wp('2.5%'),
        ...GlobalStyles.centeredContainer,
        marginTop: hp('1%'),
        marginBottom: hp('2%'),
        marginLeft: wp('2.5%')
    },
})

export default Price