import React from 'react'
import {
    View, Text, StyleSheet, ScrollView, Image, FlatList,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles, ImagePath } from '../../Config'

import HeaderBack from '../../Components/HeaderBack'

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const Price: React.FC<Props> = ({ navigation, route }) => {
    const { item, payment, totalPrice, licensing } = route.params

    const SocialMedia = (socialMediaTitle: string, socialMedia: any, img: any) => {
        return (
            <View style={{ marginHorizontal: wp('4%'), marginVertical: hp('1%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={img}
                        style={{ height: wp('10%'), width: wp('10%'), marginRight: wp('5%'), resizeMode: 'contain' }}
                    />
                    <Text style={[GlobalStyles.regularText, { fontWeight: '600' }]}>{socialMediaTitle}</Text>
                </View>
                {SocialMediaPrice(socialMedia)}
                <View style={GlobalStyles.graySeperator} />
            </View>
        )
    }

    const SocialMediaPrice = (socialMedia: any,) => {
        return Object.getOwnPropertyNames(socialMedia).map((outletTitle) => {
            if (socialMedia[`${outletTitle}`].number > 0) {
                return (
                    <>
                        <View style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                            <View style={[GlobalStyles.rowCenter, { justifyContent: 'flex-start' }]}>
                                <Text style={GlobalStyles.regularText}>{socialMedia[`${outletTitle}`].number} </Text>
                                <Text style={[GlobalStyles.regularText, { textTransform: 'capitalize' }]}>{outletTitle}</Text>
                            </View>
                            <Text style={GlobalStyles.regularText}>${socialMedia[`${outletTitle}`].price}</Text>
                        </View>
                        <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />
                    </>
                )
            }
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>

            <HeaderBack headerText='What price includes' navigateMeBack={() => navigation.goBack()} />

            <View style={[GlobalStyles.horizontalLine, { width: '93%' }]} />

            <View style={styles.paymentTypeContainer}>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{payment}</Text>
            </View>


            <ScrollView style={{ flexGrow: 1, }}
            >
                {item.instagram && SocialMedia("Instagram", item.instagram, ImagePath.instagramFeed)}
                {item.tiktok && SocialMedia("Tiktok", item.tiktok, ImagePath.tiktokFeed)}
                {item.snapchat && SocialMedia("Snapchat", item.snapchat, ImagePath.snapchatFeed)}
                {item.youtube && SocialMedia("Youtube", item.youtube, ImagePath.youtubeFeed)}
                <View style={[GlobalStyles.rowBetween, { marginHorizontal: wp('3%'), marginBottom: hp('5%') }]}>
                    <Text style={GlobalStyles.regularText}>Total</Text>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('3%') }]}>${totalPrice}</Text>
                </View>
                <View
                    style={{
                        borderColor: Colors.darkGray, borderWidth: wp('0.15%'),
                        marginHorizontal: wp('5%'), borderRadius: wp('5%'),
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('5%') }}>
                        <Image source={ImagePath.warning} style={GlobalStyles.arrowImage} />
                        <Text style={[GlobalStyles.regularText, {
                            color: Colors.darkGray, fontWeight: '500',
                            paddingHorizontal: wp('5%'), paddingVertical: hp('1.5%')
                        }]}>
                            Licensing
                        </Text>
                    </View>
                    {licensing.map((item: string) => {
                        return (
                            <Text style={[GlobalStyles.regularText, {
                                color: Colors.darkGray,
                                paddingHorizontal: wp('15%'), paddingVertical: hp('1%')
                            }]}>
                                •  {item}
                            </Text>
                        )
                    })}

                </View>
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
        marginLeft: wp('3%')
    },
})

export default Price