import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LinearGradient from 'react-native-linear-gradient';

import { GlobalStyles, Colors, ImagePath, isEmptyObject } from '../../../Config'
import { BASE_SOCIAL_MEDIA } from './types'

import Input from '../../../Components/Input'
import FixedPrice from './FixedPrice'
import GradientButton from '../../../Components/GradientButton'
import GradientText from '../../../Components/GradientText'

interface Props {
    coverLetter: string
    setCoverLetter: (text: string) => void
    socialMedia: any
    setSocialMedia: (newSocial: any) => void
    onSubmit: () => void
    totalPrice: number
}


const Bid: React.FC<Props> = ({ socialMedia, setSocialMedia, coverLetter, setCoverLetter, onSubmit, totalPrice }) => {

    const changeOutletValue = (value: string, newValue: number | string, parent: string, outlet: string) => {
        const newSocial = { ...socialMedia }
        //@ts-ignore
        if (value === "price" && parseInt(newValue) <= 0) {
            Alert.alert("Price must be more than zero")
            return;
        }
        //Makes sure the user doesn't submut a proposal without social media
        else if (value === "number" && parseInt(newValue.toString()) <= 0) {
            delete newSocial[`${parent}`][`${outlet}`]
            if (isEmptyObject(newSocial[`${parent}`])) {
                const newParent = { ...newSocial }
                delete newParent[`${parent}`]
                if (!isEmptyObject(newParent)) {
                    delete newSocial[`${parent}`]
                } else {
                    Alert.alert("You must have a social media posting!")
                    newSocial[`${parent}`][`${outlet}`] = { number: 1, price: 200 }
                }
            }
        } else {
            newSocial[`${parent}`][`${outlet}`][`${value}`] = newValue;
        }
        setSocialMedia(newSocial)
    }

    const addNewOutlet = (parent: string, outlet: string) => {
        //Adds new social media outlet, e.g: Posts in instagram
        const newSocial = { ...socialMedia }
        newSocial[`${parent}`][`${outlet}`] = { number: 1, price: 200 }
        setSocialMedia(newSocial)
    }

    const SocialMediaOutlet = (outlet: any, outletTitle: string, parent: string) => {
        //Selected social media outlet
        return (
            <View key={outletTitle} style={{ marginVertical: hp('1%') }}>
                <Text
                    style={styles.outlestStyle}>
                    {outletTitle}
                </Text>
                <View style={GlobalStyles.rowBetween}>
                    <View style={GlobalStyles.rowBetween}>
                        <TouchableOpacity
                            onPress={() =>
                                changeOutletValue("number", outlet.number - 1, parent, outletTitle.toLowerCase())
                            }
                        >
                            <Image source={ImagePath.minus} style={styles.mathButton} />
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.regularText, { marginHorizontal: wp('8%') }]}>{outlet.number}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                changeOutletValue("number", outlet.number + 1, parent, outletTitle.toLowerCase())
                            }
                        >
                            <Image source={ImagePath.plus} style={styles.mathButton} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ top: hp('1%') }}>
                        <Input
                            inputStyle={styles.priceContainer}
                            type={'numeric'}
                            label='$'
                            placeHolder=''
                            value={`${outlet.price}`}
                            onChangeText={(text: string | number) => changeOutletValue("price", text, parent, outletTitle.toLowerCase())}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const SingleSocialMedia = (socialMedia: any, socialMediaTitle: string, img: any) => {
        //Gets all outlets of a specific social media except the ones that already exists from the proposal
        //@ts-ignore
        const filteredOutlets = BASE_SOCIAL_MEDIA[`${socialMediaTitle}`].filter(item => !Object.getOwnPropertyNames(socialMedia).includes(item))
        return (
            <View style={{ marginVertical: hp('1%') }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp('2%') }}>
                    <Image
                        source={img}
                        style={{ height: wp('8%'), width: wp('8%'), marginRight: wp('5%') }}
                    />
                    <Text style={[GlobalStyles.regularText, { fontWeight: '600', textTransform: 'capitalize' }]}>{socialMediaTitle}</Text>
                </View>
                {Object.getOwnPropertyNames(socialMedia).map((outletTitle: string) => {
                    return SocialMediaOutlet(socialMedia[`${outletTitle}`], outletTitle, socialMediaTitle)
                })}
                <View style={GlobalStyles.horizontalLine} />

                {
                    filteredOutlets.map((outletTitle: string) => {
                        return (
                            <>
                                <TouchableOpacity
                                    key={outletTitle}
                                    onPress={() =>
                                        addNewOutlet(socialMediaTitle.toLowerCase(), outletTitle.toLowerCase())
                                    }
                                    style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                                    <Text
                                        style={styles.outlestStyle}>
                                        {outletTitle}
                                    </Text>
                                    <Image source={ImagePath.plusBlack} style={{ height: wp('5%'), width: wp('5%') }} />
                                </TouchableOpacity>
                                <View style={GlobalStyles.horizontalLine} />
                            </>
                        )
                    })
                }
            </View>
        )
    }

    const addNewSocialMedia = (parent: string) => {
        const newSocial = { ...socialMedia }
        let outlet = ''
        if (parent === 'instagram') outlet = 'post'
        else if (parent === 'tiktok') outlet = 'Feedvideo'
        else if (parent === 'snapchat') outlet = 'snap'
        else if (parent === 'youtube') outlet = 'video'
        newSocial[`${parent}`] = {}
        newSocial[`${parent}`][`${outlet}`] = { number: 1, price: 200 }
        setSocialMedia(newSocial)
    }

    const MissingSocialMedia = (socialMediaTitle: string) => {
        return (
            <TouchableOpacity
                onPress={() => addNewSocialMedia(socialMediaTitle.toLowerCase())}
                style={[GlobalStyles.centeredContainer, {
                    padding: hp('1%'),
                    marginVertical: hp('1%'),
                    borderRadius: wp('10%'),
                    borderWidth: wp('0.25%'),
                    borderColor: Colors.brightRed
                }]}>
                <GradientText
                    style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2.25%') }]}
                    end={{ x: 0.8, y: 0.35 }}>
                    Add {socialMediaTitle}
                </GradientText>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, }}>
            {socialMedia['instagram'] && SingleSocialMedia(socialMedia.instagram, "instagram", ImagePath.instaUrl)}
            {socialMedia['tiktok'] && SingleSocialMedia(socialMedia.tiktok, "tiktok", ImagePath.ic_tiktok)}
            {socialMedia['snapchat'] && SingleSocialMedia(socialMedia.snapchat, "snapchat", ImagePath.ic_snapchat)}
            {socialMedia['youtube'] && SingleSocialMedia(socialMedia.youtube, "youtube", ImagePath.ic_youtube)}

            {!socialMedia['instagram'] && MissingSocialMedia("Instagram")}
            {!socialMedia['tiktok'] && MissingSocialMedia("Tiktok")}
            {!socialMedia['snapchat'] && MissingSocialMedia("Snapchat")}
            {!socialMedia['youtube'] && MissingSocialMedia("Youtube")}
            <LinearGradient colors={Colors.gradientButton}
                style={[GlobalStyles.buttonContainer, {
                    justifyContent: 'center', marginTop: hp('2%'),
                    borderRadius: wp('7%'), height: hp('5.5%'),
                    borderWidth: 0, width: '100%'
                }]}
                start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                <View style={[GlobalStyles.rowBetween, { paddingHorizontal: wp('5%') }]}>
                    <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>
                        Total Amount
                    </Text>
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('2.25%'), color: Colors.primary, fontWeight: '500' }]}>
                        ${totalPrice}
                    </Text>
                </View>
            </LinearGradient>
            <FixedPrice
                onSubmit={onSubmit}
                coverLetter={coverLetter} setCoverLetter={setCoverLetter} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, mathButton: {
        height: wp('10%'),
        width: wp('10%'),
        resizeMode: 'contain',
    }, priceContainer: {
        backgroundColor: Colors.veryLightGray,
        width: wp('45%'),
        paddingHorizontal: wp('5%')
    }, outlestStyle: {
        ...GlobalStyles.regularText,
        fontWeight: '500',
        fontSize: hp('1.75%'),
        textTransform: 'capitalize'
    }
})

export default Bid