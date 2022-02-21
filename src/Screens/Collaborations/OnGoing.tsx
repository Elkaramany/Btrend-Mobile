import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GlobalStyles, ImagePath, Colors } from '../../Config';


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

const OnGoing: React.FC<Props> = props => {
    return (
        <>
            <FlatList
                data={DUMMY_DATA}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <>
                            <TouchableOpacity style={GlobalStyles.rowBetween}>
                                <Image
                                    source={ImagePath.profilePhoto}
                                    style={{ width: wp('22%'), height: wp('22%'), resizeMode: 'contain', borderRadius: wp('5%') }}
                                />
                                <View style={{ right: wp('5%') }}>
                                    <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2%') }]}>{item.campaignName}</Text>
                                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginVertical: hp('1%') }]}>{item.brandName}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {item.instagram && <Image source={ImagePath.instaUrl} style={styles.socialImg} />}
                                        {item.snapchat && <Image source={ImagePath.ic_snapchat} style={styles.socialImg} />}
                                        {item.tiktok && <Image source={ImagePath.ic_tiktok} style={styles.socialImg} />}
                                        {item.youtube && <Image source={ImagePath.youtube} style={styles.socialImg} />}
                                    </View>

                                </View>
                                <Image
                                    source={ImagePath.arrowRight}
                                    style={{ width: wp('8%'), height: wp('8%'), resizeMode: 'contain' }}
                                />
                            </TouchableOpacity>
                            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />
                        </>

                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    socialImg: {
        marginTop: hp('0.5%'),
        height: wp('5%'),
        width: wp('5%'),
        resizeMode: 'contain',
        marginHorizontal: wp('2%')
    }
})

export default OnGoing