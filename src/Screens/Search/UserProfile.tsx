import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Card } from 'react-native-paper'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { FavoriteUser } from '../../Redux/Actions'
import { GlobalStyles, Colors, ImagePath } from '../../Config';

import SocialStats from '../../Components/SocialStats'
import GradientButton from '../../Components/GradientButton'
import InfluencerProfile from '../../Components/InfluencerProfile';
import CollapsibleBody from '../../Components/CollapsibleBody'
import GrayedContainer from '../../Components/GrayedContainer'

interface Props {
    route: any
    navigation: StackNavigationProp<any, any>,
}



const UserProfile: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [basicInfoValue, setBasicInfoValue] = React.useState(false)
    const [aimValue, setAimValue] = React.useState(false)
    const [typeValue, setTypeValue] = React.useState(false)
    const [needsValue, setNeedsValue] = React.useState(false)
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { item, isFavorite} = route.params
    const [favorite, setFavorite] = React.useState(isFavorite)

    const pressedMessage = () => {
        console.log("Message")
    }

    const pressedFollow = () => {
        console.log("follow")
    }

    const onFavorite = () => {
        dispatch(FavoriteUser(item._id, token, changeFavorite, userType))
    }

    const changeFavorite = () => {
        setFavorite(!favorite)
    }

    const userView = () => {
        if (userType === "Influencer") {
            return (
                <View>
                    <CollapsibleBody header={"Brand Information"} title={item.brand.brandInformation}
                        collapsibleValue={basicInfoValue} setCollapsibleValue={setBasicInfoValue}
                    />
                    <Card style={styles.collapsibleHeader}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.sectionHeader}>Dates</Text>
                            <View style={{ backgroundColor: Colors.lightGray, marginVertical: hp('1%'), width: wp('75%'), paddingVertical: hp('1%'), borderRadius: wp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={GlobalStyles.regularText}>{item.startingDate} - {item.endingDate}</Text>
                            </View>
                        </View>
                    </Card>
                    <Card style={styles.collapsibleHeader}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.sectionHeader}>Categories</Text>
                            <View style={{ backgroundColor: Colors.lightGray, width: wp('80%'), marginVertical: hp('1%'), paddingVertical: hp('1%'), borderRadius: wp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={GlobalStyles.regularText}>{item.categories.join("    |    ")}</Text>
                            </View>
                        </View>
                    </Card>
                    <CollapsibleBody header={"Aim of the campaign"} title={item.aim}
                        collapsibleValue={aimValue} setCollapsibleValue={setAimValue}
                    />
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), width: wp('85%'), alignSelf: 'center' }]}>
                        <GrayedContainer header='Price' title={`${item.price} $`} />
                        <GrayedContainer header='Payment type' title={item.payment} />
                    </View>
                    <CollapsibleBody header={"Type of influencers we\n are looking for"} title={item.type}
                        collapsibleValue={typeValue} setCollapsibleValue={setTypeValue}
                    />
                    <CollapsibleBody header={"What does the influencer\n need to do?"} title={item.need}
                        collapsibleValue={needsValue} setCollapsibleValue={setNeedsValue}
                    />
                    <View style={[GlobalStyles.rowBetween, { marginTop: hp('0.5%'), width: wp('85%'), alignSelf: 'center' }]}>
                        <GrayedContainer header='Gender' title={item.gender} />
                        <View >
                            <Image source={ImagePath.heartFilled} style={{ height: hp('8%'), width: wp('30%'), resizeMode: 'contain' }} />
                        </View>
                    </View>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '700', marginLeft: wp('8.5%') }]}>In order to apply you need to</Text>
                    <View style={{ flexDirection: 'row', marginVertical: hp('1%') }}>
                        <Image source={ImagePath.ic_check} style={GlobalStyles.arrowImage} />
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('8.5%') }]}>{item.nof.join(" - ")} followers</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: hp('1%') }}>
                        <Image source={ImagePath.ic_check} style={GlobalStyles.arrowImage} />
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('8.5%') }]}>Engagement score of {item.engagementRate.join("% - ")}%</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: hp('1%') }}>
                        <Image source={ImagePath.ic_check} style={GlobalStyles.arrowImage} />
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('8.5%') }]}>Based in {item.location.join(" - ")}</Text>
                    </View>
                </View>
            )
        } else return <InfluencerProfile user={item} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.xImage}>
                <Image source={ImagePath.ic_crosss} style={{ flex: 1 }} />
            </TouchableOpacity>
            <ScrollView style={styles.scroller} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ marginTop: hp('3%'), marginHorizontal: wp('5%') }}>
                    <View style={GlobalStyles.rowBetween}>
                        <Text style={GlobalStyles.regularText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => onFavorite()}>
                            <Image source={favorite ? ImagePath.heartFilled : ImagePath.heart} style={GlobalStyles.arrowImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={GlobalStyles.horizontalLine} />
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1.5%') }]}>
                        <View style={GlobalStyles.rowBetween} >
                            <Image source={{ uri: item.brand.photo }} style={[GlobalStyles.roundedImg, { marginRight: wp('2%') }]} />
                            <View>
                                <Text style={GlobalStyles.regularText}>{item.brand.companyName}</Text>
                                <View style={{ width: wp('55%') }}>
                                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.brand.categories.join(" - ")}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.activeContainer} >
                            <Text style={[GlobalStyles.regularText, { color: Colors.primary, padding: hp('0.25%') }]}>{item.state}</Text>
                        </View>
                    </View>
                    <SocialStats />
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('2%') }]}>
                        <GradientButton text={'Follow'} colors={Colors.gradientButton}
                            onPress={() => pressedFollow()} buttonContainerStyle={styles.bottomButton}
                        />
                        <GradientButton text={'Message'} colors={[Colors.primary, Colors.primary]}
                            textStyle={{ color: Colors.secondary }}
                            onPress={() => pressedMessage()} buttonContainerStyle={{ ...styles.bottomButton, borderColor: Colors.secondary }}
                        />
                    </View>
                    <View style={GlobalStyles.horizontalLine} />
                    {userView()}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: hp('25%'),
        resizeMode: 'cover',
        zIndex: 1
    }, xImage: {
        flex: 1,
        height: hp('5%'),
        width: hp('5%'),
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        right: wp('3%'),
        marginTop: hp('2%'),
        position: 'absolute',
        zIndex: 2
    }, scroller: {
        flexGrow: 1,
        borderTopRightRadius: wp('15%'),
        borderTopLeftRadius: wp('15%'),
        width: '100%',
        zIndex: 3,
        backgroundColor: Colors.primary,
        bottom: hp('6%')
    }, activeContainer: {
        backgroundColor: "#6FCF97",
        padding: hp('0.5%'),
        borderRadius: hp('5%')
    }, collapsibleHeader: {
        paddingVertical: hp('1%'),
        alignSelf: 'center',
        width: wp('85%'),
    }, innerContainer: {
        marginHorizontal: wp('4%'),
    }, sectionHeader: {
        ...GlobalStyles.regularText,
        fontWeight: '600',
    }, bottomButton: {
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('0.5%'),
    }
})

export default UserProfile