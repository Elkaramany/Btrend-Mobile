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
            <View style={{ marginHorizontal: wp('5%') }}>
                <HeaderBack headerText='Campaign Deal' navigateMeBack={() => navigation.goBack()} />
            </View>

            <View style={{ backgroundColor: Colors.veryLightGray, marginTop: hp('2%'), paddingVertical: hp('2%') }}>
                <View style={[GlobalStyles.rowBetween,
                { marginHorizontal: wp('5%') }]}>
                    <Image source={{ uri: item.photo }} style={styles.campaignImg} />
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text style={[GlobalStyles.regularText, { fontWeight: 'bold' }]}>{item.name}</Text>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>
                            {isBrand ? `${item.firstName + ' ' + item.lastName}` : item.brand.companyName}
                        </Text>
                        <View style={{ width: '100%' }}>
                            <SocialPrice
                                containerStyle={{ marginRight: wp('5%'), marginLeft: 0, width: '85%' }}
                                instagram={true} tiktok={true} youtube={true} snapchat={true} price={item.price} />
                        </View>
                    </View>
                    <Image source={ImagePath.arrowRight} style={{
                        height: wp('8%'),
                        width: wp('8%'),
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    campaignImg: {
        height: wp('19%'),
        width: wp('19%'),
        borderRadius: wp('2.5%')
    },
})

export default CampaignDeal