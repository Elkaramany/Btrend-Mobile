import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { GlobalStyles, Colors, ImagePath, isEmptyObject } from '../../../Config'

import Input from '../../../Components/Input'

interface Props {
    coverLetter: string
    setCoverLetter: (text: string) => void
    socialMedia: any
    setSocialMedia: (newSocial: any) => void
}

import FixedPrice from './FixedPrice'
import GradientButton from '../../../Components/GradientButton'

const Bid: React.FC<Props> = ({ socialMedia, setSocialMedia, coverLetter, setCoverLetter }) => {

    const addNewSocialMedia = (title: string) => {
        const newSocail = { ...socialMedia }
        if (title === "Instagram") {
            newSocail.instagram = {
                post: { number: 1, price: 200 },
            }
        } else if (title === "Tiktok") {
            newSocail.tiktok = {
                feedVideo: { number: 1, price: 200 },
            }
        } else if (title === "Snapchat") {
            newSocail.snapchat = {
                snap: { number: 1, price: 200 },
            }
        } else {
            newSocail.youtube = {
                video: { number: 1, price: 200 },
            }
        }
        setSocialMedia(newSocail)
    }

    const changeOutletValue = (value: string, newValue: number | string, parent: string, outlet: string) => {
        const newSocial = { ...socialMedia }
        //@ts-ignore
        if (value === "price" && parseInt(newValue) <= 0) {
            Alert.alert("Price must be more than zero")
            return;
        }
        //@ts-ignore
        else if (value === "number" && parseInt(newValue) <= 0) {
            delete newSocial[`${parent}`][`${outlet}`]
            if (isEmptyObject(newSocial[`${parent}`])) {
                const newParent = {...newSocial}
                delete newParent[`${parent}`]
                if (!isEmptyObject(newParent)) {
                    delete newSocial[`${parent}`]
                } else {
                    Alert.alert("You must have a social media posting!")
                    newSocial[`${parent}`][`${outlet}`] = {number: 1 , price: 200}
                }
            }
        } else {
            newSocial[`${parent}`][`${outlet}`][`${value}`] = newValue;
        }
        setSocialMedia(newSocial)
    }

    const SocialMediaOutlet = (outlet: any, outletTitle: string, parent: string) => {
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
                            label=''
                            value={`$                ${outlet.price}`}
                            onChangeText={(text: string | number) => changeOutletValue("price", text, parent, outletTitle.toLowerCase())}
                        />
                    </View>
                </View>
            </View>
        )
    }

    const SingleSocialMedia = (socialMedia: any, socialMediaTitle: string, img: any) => {
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
            </View>
        )
    }

    const MissingSocialMedia = (socialMediaTitle: string) => {
        return (
            <GradientButton text={`Add ${socialMediaTitle}`} colors={Colors.gradientButton}
                onPress={() => addNewSocialMedia(socialMediaTitle)} buttonContainerStyle={{ height: hp('5%'), marginVertical: hp('1%') }}
            />
        )
    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            {socialMedia['instagram'] && SingleSocialMedia(socialMedia.instagram, "instagram", ImagePath.instaUrl)}
            {socialMedia['tiktok'] && SingleSocialMedia(socialMedia.tiktok, "tiktok", ImagePath.ic_tiktok)}
            {socialMedia['snapchat'] && SingleSocialMedia(socialMedia.snapchat, "snapchat", ImagePath.ic_snapchat)}
            {socialMedia['youtube'] && SingleSocialMedia(socialMedia.youtube, "youtube", ImagePath.ic_youtube)}

            {!socialMedia['instagram'] && MissingSocialMedia("Instagram")}
            {!socialMedia['tiktok'] && MissingSocialMedia("Tiktok")}
            {!socialMedia['snapchat'] && MissingSocialMedia("Snapchat")}
            {!socialMedia['youtube'] && MissingSocialMedia("Youtube")}
            <FixedPrice
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

/*
<TouchableOpacity
                                onPress={() =>
                                    changeOutletValue("number", 1, socialMediaTitle, outletTitle.toLowerCase())
                                }
                                style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                                <Text
                                    style={styles.outlestStyle}>
                                    {outletTitle}
                                </Text>
                                <Image source={ImagePath.plusBlack} style={{ height: wp('5%'), width: wp('5%') }} />
                            </TouchableOpacity>
                            */