import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
// @ts-ignore
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Card } from 'react-native-paper'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { GlobalStyles, Colors, ImagePath } from '../../Config';

import Container from '../../Components/Container'
import SocialStats from '../../Components/SocialStats'
import GradientButton from '../../Components/GradientButton'

interface Props {
    route: any
    navigation: StackNavigationProp<any, any>,
}

interface CollapsibleProps {
    header: string
    title: string
    collapsibleValue: boolean
    setCollapsibleValue: (value: boolean) => void
}

const CollapsibleBody: React.FC<CollapsibleProps> = ({ header, title, collapsibleValue, setCollapsibleValue }) => {
    return (
        <Collapse onToggle={(value: boolean) => setCollapsibleValue(value)}>
            <CollapseHeader>
                <Card style={styles.collapsibleHeader}>
                    <View style={[GlobalStyles.rowBetween, { marginHorizontal: wp('3%') }]}>
                        <Text style={[styles.sectionHeader, { fontStyle: collapsibleValue ? "italic" : "normal", }]}>{header}</Text>
                        <View style={{ backgroundColor: Colors.gray, padding: hp('0.5%'), borderRadius: hp('3%') }}>
                            <Image source={collapsibleValue ? ImagePath.upArrow : ImagePath.downArrow} style={[GlobalStyles.arrowImage, { alignSelf: 'flex-end' }]} />
                        </View>
                    </View>
                </Card>
            </CollapseHeader>
            <CollapseBody>
                <Card style={styles.collapsibleHeader}>
                    <View style={[GlobalStyles.horizontalLine, { width: '90%' }]} />
                    <Text style={[GlobalStyles.regularText, { fontStyle: 'italic', marginHorizontal: wp('4%') }]}>
                        {title}
                    </Text>
                </Card>
            </CollapseBody>
        </Collapse >
    )
}

const UserProfile: React.FC<Props> = ({ route, navigation }) => {
    const [basicInfoValue, setBasicInfoValue] = React.useState(false)
    const [aimValue, setAimValue] = React.useState(false)
    const [compValue, setCompValue] = React.useState(false)
    const [typeValue, setTypeValue] = React.useState(false)
    const [needsValue, setNeedsValue] = React.useState(false)
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const item = route.params.item

    const pressedMessage = () => {
        console.log("Message")
    }

    const pressedFollow = () => {
        console.log("follow")
    }

    const userView = () => {
        if (userType === "Brand") {
            return (
                <View>
                    <CollapsibleBody header={"Brand Information"} title={item.title}
                        collapsibleValue={basicInfoValue} setCollapsibleValue={setBasicInfoValue}
                    />
                    <Card style={styles.collapsibleHeader}>
                        <View style={styles.innerContainer}>
                            <Text style={[styles.sectionHeader, { fontStyle: basicInfoValue ? "italic" : "normal" }]}>Dates</Text>
                            <View style={{ backgroundColor: Colors.lightGray, width: wp('35%'), paddingVertical: hp('0.5%'), borderRadius: wp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[GlobalStyles.regularText, { fontStyle: basicInfoValue ? "italic" : "normal" }]}>{item.title}</Text>
                            </View>
                        </View>
                    </Card>
                    {
                        /*
                        <Card style={styles.collapsibleHeader}>
                        <View style={styles.innerContainer}>
                            <Text style={[styles.sectionHeader, { fontStyle: basicInfoValue ? "italic" : "normal" }]}>Categories</Text>
                            <View style={{ paddingVertical: hp('0.5%'), flexDirection: 'row', flexWrap: 'wrap' }}>
                                {CategoriesArr.map((d: any) => {
                                    return (
                                        <>
                                            <Text style={[GlobalStyles.regularText, { fontStyle: basicInfoValue ? "italic" : "normal", marginHorizontal: wp('2%') }]}>{d}</Text>
                                            <View style={{ backgroundColor: Colors.gray, height: hp('2%'), width: 2, alignSelf: 'center' }} />
                                        </>
                                    )
                                })}
                            </View>
                        </View>
                    </Card>
                    */
                    }
                    <CollapsibleBody header={"Aim of the campaign"} title={item.title}
                        collapsibleValue={aimValue} setCollapsibleValue={setAimValue}
                    />
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), width: wp('85%'), alignSelf: 'center' }]}>
                        <View style={styles.paymentContainer}>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: basicInfoValue ? "italic" : 'normal' }]}>
                                Price
                            </Text>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: basicInfoValue ? "italic" : 'normal' }]}>
                                {item.title}
                            </Text>
                        </View>
                        <View style={styles.paymentContainer}>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: basicInfoValue ? "italic" : 'normal' }]}>
                                Payment type
                            </Text>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: basicInfoValue ? "italic" : 'normal' }]}>
                                {item.title}
                            </Text>
                        </View>
                    </View>
                    <CollapsibleBody header={"Compensation in details"} title={item.title}
                        collapsibleValue={compValue} setCollapsibleValue={setCompValue}
                    />
                    <CollapsibleBody header={"Type of influencers we\n are looking for"} title={item.title}
                        collapsibleValue={typeValue} setCollapsibleValue={setTypeValue}
                    />
                    <CollapsibleBody header={"What does the influencer\n need to do?"} title={item.title}
                        collapsibleValue={needsValue} setCollapsibleValue={setNeedsValue}
                    />
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), width: wp('85%'), alignSelf: 'center' }, styles.paymentContainer]}>
                        <View >
                            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: basicInfoValue ? "italic" : 'normal' }]}>
                                Gender
                            </Text>
                            <Text style={GlobalStyles.regularText}>
                                {item.title}
                            </Text>
                        </View>
                        <View >
                            <Image source={ImagePath.heartFilled} style={{ height: hp('8%'), width: wp('30%'), resizeMode: 'contain' }} />
                        </View>
                    </View>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '700', marginLeft: wp('8.5%') }]}>In order to apply you need to</Text>
                    <Text style={[GlobalStyles.regularText, { marginLeft: wp('8.5%') }]}>{item.title}</Text>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.xImage}>
                <Image source={ImagePath.ic_crosss} style={{ flex: 1 }} />
            </TouchableOpacity>
            <ScrollView style={styles.scroller}>
                <View style={[GlobalStyles.rowBetween, { marginTop: hp('2%') }]}>
                    <Text style={GlobalStyles.regularText}>{item.title}</Text>
                    <Image source={item.favorite ? ImagePath.heartFilled : ImagePath.heart} style={GlobalStyles.arrowImage} />
                </View>
                <View style={GlobalStyles.horizontalLine} />
                <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1.5%') }]}>
                    <View style={GlobalStyles.rowBetween} >
                        <Image source={{ uri: item.img }} style={[GlobalStyles.roundedImg, { marginRight: wp('2%') }]} />
                        <View>
                            <Text style={GlobalStyles.regularText}>{item.title}</Text>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.activeContainer} >
                        <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>{item.active || "nothing yet"}</Text>
                    </View>
                </View>
                <SocialStats />
                <View style={[GlobalStyles.rowBetween, { marginBottom: hp('2%') }]}>
                    <GradientButton text={'Follow'} colors={Colors.gradientButton}
                        textStyle={{ fontStyle: 'italic' }}
                        onPress={() => pressedFollow()} buttonContainerStyle={styles.bottomButton}
                    />
                    <GradientButton text={'Message'} colors={Colors.disabledButton}
                        textStyle={{ fontStyle: 'italic' }}
                        onPress={() => pressedMessage()} buttonContainerStyle={styles.bottomButton}
                    />
                </View>
                <View style={GlobalStyles.horizontalLine} />
                {userView()}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: hp('30%'),
        resizeMode: 'cover',
        zIndex: 1
    }, xImage: {
        flex: 1,
        height: hp('5%'),
        width: hp('5%'),
        resizeMode: 'cover',
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
    }, paymentContainer: {
        backgroundColor: Colors.lightGray,
        padding: hp('1.5%'),
        borderRadius: hp('1.5%'),
        marginHorizontal: wp('2%')
    }, bottomButton: { 
        width: wp('40%'), 
        marginHorizontal: wp('5%'), 
        paddingVertical: hp('0.5%') 
    }
})

export default UserProfile