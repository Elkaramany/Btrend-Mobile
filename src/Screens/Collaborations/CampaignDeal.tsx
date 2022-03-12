import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles, ImagePath } from '../../Config';

import Container from '../../Components/Container'
import HeaderBack from '../../Components/HeaderBack'
import SocialPrice from '../../Components/SocialPrice'


interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const CampaignDeal: React.FC<Props> = ({ navigation, route }) => {
    const { item, isFavorite } = route.params
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <HeaderBack headerText='Campaign Deal' navigateMeBack={() => navigation.goBack()} />

            <View style={{ backgroundColor: Colors.veryLightGray, marginTop: hp('2%'), paddingVertical: hp('1%') }}>
                <View style={{ marginHorizontal: wp('4%'), flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <Image source={{ uri: item.photo }} style={styles.campaignImg} />
                    <View style={{ top: hp('0.5%'), left: wp('5%'), width: '65%' }}>
                        <View style={GlobalStyles.rowBetween}>
                            <Text style={[GlobalStyles.regularText, { fontWeight: 'bold' }]}>{item.name}</Text>
                            <Image source={ImagePath.arrowRight} style={{
                                height: wp('8%'),
                                width: wp('8%'),
                            }} />
                        </View>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.name}</Text>
                        <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), width: '90%' }]}>
                            {true && <Image source={ImagePath.instaUrl} style={styles.socialIconStyle} />}
                            {true && <Image source={ImagePath.ic_snapchat} style={styles.socialIconStyle} />}
                            {true && <Image source={ImagePath.ic_tiktok} style={styles.socialIconStyle} />}
                            {true && <Image source={ImagePath.youtube} style={styles.socialIconStyle} />}

                            <View style={{ height: hp('3%'), width: wp('0.35%'), backgroundColor: Colors.mediumGray }} />

                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>$1500</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    campaignImg: {
        height: wp('20%'),
        width: wp('20%'),
        borderRadius: wp('2.5%')
    }, socialIconStyle: {
        height: hp('2.5%'),
        width: hp('2.5%'),
        resizeMode: 'contain',
        marginHorizontal: wp('2%')
    }
})

export default CampaignDeal