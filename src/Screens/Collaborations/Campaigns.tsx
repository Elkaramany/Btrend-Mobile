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
                                    style={{ width: wp('18%'), height: wp('18%'), resizeMode: 'contain', borderRadius: wp('5%') }}
                                />
                                <View style={{ left: wp('5%') }}>
                                    <View style={{ flex: 1 }}>

                                        <View style={[GlobalStyles.rowBetween, { width: wp('68%') }]}>
                                            <Text style={[GlobalStyles.regularText,
                                            { fontWeight: 'bold' }]}>{item.campaignName}</Text>
                                            <Image
                                                source={ImagePath.arrowRight}
                                                style={{ width: wp('8%'), height: wp('8%'), resizeMode: 'contain' }}
                                            />
                                        </View>

                                        <Text style={[GlobalStyles.regularText,
                                        { color: Colors.darkGray }]}>{item.brandName}</Text>
                                        <View style={[GlobalStyles.rowCenter, { alignSelf: 'flex-start', top: hp('0.5%') }]}>
                                            {item.instagram && <Image source={ImagePath.instaUrl} style={styles.socialImg} />}
                                            {item.snapchat && <Image source={ImagePath.ic_snapchat} style={styles.socialImg} />}
                                            {item.tiktok && <Image source={ImagePath.ic_tiktok} style={styles.socialImg} />}
                                            {item.youtube && <Image source={ImagePath.youtube} style={styles.socialImg} />}
                                            {screen === "Invited" &&
                                                <View style={[GlobalStyles.rowCenter, { top: hp('0.25%') }]}>
                                                    <View style={{ height: hp('2%'), width: wp('0.2%'), backgroundColor: Colors.gray, marginRight: wp('2%') }} />
                                                    <Text style={[GlobalStyles.regularText,
                                                    { color: Colors.darkGray, fontSize: hp('1.75%') }]}>${item.amount}</Text>
                                                </View>
                                            }
                                        </View>
                                        {screen === "Invited" &&
                                            <View style={[GlobalStyles.rowBetween, { width: '79%' }]}>
                                                <GradientButton text={'Confirm'} colors={Colors.gradientButton}
                                                    buttonContainerStyle={{ ...styles.declinceButton, borderWidth: 0 }}
                                                    onPress={() => console.log("Confirm")} textStyle={{ fontSize: hp('2%') }}
                                                />
                                                <TouchableOpacity style={styles.declinceButton}>
                                                    <Text style={GlobalStyles.regularText}>Decline</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </View>

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
        paddingVertical: hp('0.5%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.secondary,
        borderWidth: wp('0.25%'),
        borderRadius: wp('5%'),
        width: wp('30%'),
        marginTop: hp('4%'),
    },
})

export default Campaigns