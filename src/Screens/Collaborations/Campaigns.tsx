import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GlobalStyles, ImagePath, Colors } from '../../Config';

import GradientButton from '../../Components/GradientButton'
import DUMMY_ITEM from './DUMMY_ITEM'


interface Props {
    navigation: StackNavigationProp<any, any>,
    data: any[],
    screen: string
}

const Campaigns: React.FC<Props> = ({ data, screen, navigation }) => {
    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("CampaignDeal", { item: DUMMY_ITEM })}
                                style={{ flexDirection: 'row' }}>
                                <Image
                                    source={ImagePath.profilePhoto}
                                    style={{ width: wp('21%'), height: wp('21%'), resizeMode: 'contain', borderRadius: wp('5%') }}
                                />
                                <View style={[GlobalStyles.rowBetween, { flex: 1, left: wp('2%') }]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2%') }]}>{item.campaignName}</Text>
                                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginVertical: hp('1%') }]}>{item.brandName}</Text>
                                        <View style={[GlobalStyles.rowCenter, { alignSelf: 'flex-start' }]}>
                                            {item.instagram && <Image source={ImagePath.instaUrl} style={styles.socialImg} />}
                                            {item.snapchat && <Image source={ImagePath.ic_snapchat} style={styles.socialImg} />}
                                            {item.tiktok && <Image source={ImagePath.ic_tiktok} style={styles.socialImg} />}
                                            {item.youtube && <Image source={ImagePath.youtube} style={styles.socialImg} />}
                                            {screen === "Invited" &&
                                                <View style={GlobalStyles.rowCenter}>
                                                    <View style={{ height: hp('3%'), width: wp('0.2%'), backgroundColor: Colors.gray, marginRight: wp('2%') }} />
                                                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>${item.amount}</Text>
                                                </View>
                                            }
                                        </View>
                                        {screen === "Invited" &&
                                            <View style={GlobalStyles.rowBetween}>
                                                <GradientButton text={'Confirm'} colors={Colors.gradientButton}
                                                    //@ts-ignore
                                                    buttonContainerStyle={[styles.declinceButton, { borderWidth: 0 }]}
                                                    onPress={() => console.log("Confirm")} textStyle={{ fontSize: hp('2%') }}
                                                />
                                                <TouchableOpacity style={styles.declinceButton}>
                                                    <Text style={GlobalStyles.regularText}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>
                                    <Image
                                        source={ImagePath.arrowRight}
                                        style={{ width: wp('8%'), height: wp('8%'), resizeMode: 'contain' }}
                                    />
                                </View>
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
    }, declinceButton: {
        paddingVertical: hp('0.75%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.secondary,
        borderWidth: wp('0.25%'),
        borderRadius: wp('5%'),
        width: wp('30%'),
        marginTop: hp('2%'),
    },
})

export default Campaigns