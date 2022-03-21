import React from 'react'
import { Image, TouchableOpacity, Text, StyleSheet, View, ScrollView, Alert } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors, isEmptyObject } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';
import { BASE_SOCIAL_MEDIA } from '../../Feed/Proposal/types';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'
import Input from '../../../Components/Input'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const BASE_SOCIAL = [
    {
        title: 'instagram',
        img: ImagePath.instaUrl
    },
    {
        title: 'tiktok',
        img: ImagePath.ic_tiktok
    },
    {
        title: 'snapchat',
        img: ImagePath.ic_snapchat
    }, {
        title: 'youtube',
        img: ImagePath.ic_youtube
    },
]

const LICENSING = ['Personal use', 'Commercial use', 'Sponsored social content', ' Temporal license']


const SocialMedia: React.FC<Props> = ({ navigation }) => {
    const { socialMedia, licensing } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [selectedSocial, setSelectedSocial] = React.useState('instagram')
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    const addNewOutlet = (parent: string, outlet: string) => {
        const newSocial = { ...socialMedia }
        newSocial[`${parent}`][`${outlet}`] = { number: 1, price: 200 }
        dispatch(CampaignCredential({ prop: 'socialMedia', value: newSocial }))
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
        } else {
            newSocial[`${parent}`][`${outlet}`][`${value}`] = newValue;
        }
        dispatch(CampaignCredential({ prop: 'socialMedia', value: newSocial }))
    }
    const SocialMediaOutlet = (outlet: any, outletTitle: string, parent: string) => {
        return (
            <View key={outletTitle} style={{ marginVertical: hp('1%') }}>
                {!outlet &&
                    <TouchableOpacity onPress={() => addNewOutlet(parent, outletTitle)}
                        style={GlobalStyles.rowBetween}>
                        <Text
                            style={styles.outlestStyle}>
                            {outletTitle}
                        </Text>
                        <Image source={ImagePath.plusBlack} style={GlobalStyles.arrowImage} />
                    </TouchableOpacity>
                }
                {outlet && !isEmptyObject(outlet) &&
                    <>
                        <Text
                            style={styles.outlestStyle}>
                            {outletTitle}
                        </Text>
                        <View style={GlobalStyles.rowBetween}>
                            <View style={GlobalStyles.rowBetween}>
                                <TouchableOpacity
                                    onPress={() => changeOutletValue("number", outlet.number - 1, parent, outletTitle)}
                                >
                                    <Image source={ImagePath.minus} style={styles.mathButton} />
                                </TouchableOpacity>
                                <Text style={[GlobalStyles.regularText, { marginHorizontal: wp('8%') }]}>{outlet.number}</Text>
                                <TouchableOpacity
                                    onPress={() => changeOutletValue("number", outlet.number + 1, parent, outletTitle)}
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
                                    onChangeText={(text: string | number) => changeOutletValue("price", text, parent, outletTitle)}
                                />
                            </View>
                        </View>
                    </>
                }
            </View>
        )
    }

    const chooseSocialMedia = (parent: string) => {
        if (!socialMedia[`${parent}`]) {
            const newSocial = { ...socialMedia }
            newSocial[`${parent}`] = {}
            //@ts-ignore
            const OutLet = BASE_SOCIAL_MEDIA[`${parent}`][0]
            newSocial[`${parent}`][`${OutLet}`] = { number: 1, price: 200 }
            dispatch(CampaignCredential({ prop: 'socialMedia', value: newSocial }))
        }
        setSelectedSocial(parent)
    }

    const isVerified = () => {
        if (!licensing.length) return false
        let flag = false
        const arr = Object.getOwnPropertyNames(socialMedia)
        arr.map((singleSocial) => {
            if (!isEmptyObject(socialMedia[`${singleSocial}`])) {
                flag = true
            }
        })
        return flag
    }

    const navigateMe = () => {
        const newSocial = { ...socialMedia }
        const arr = Object.getOwnPropertyNames(newSocial)
        arr.map((singleSocial) => {
            if (isEmptyObject(socialMedia[`${singleSocial}`])) {
                delete newSocial[`${singleSocial}`]
            }
        })
        dispatch(CampaignCredential({ prop: 'socialMedia', value: newSocial }))
        dispatch(CampaignCredential({ prop: 'price', value: getTotal().toString() }))
        navigation.navigate("FinalCampaign")
    }

    const getTotal = () => {
        let total = 0
        const arr = Object.getOwnPropertyNames(socialMedia)
        arr.map((singleSocial) => {
            const keys = Object.getOwnPropertyNames(socialMedia[`${singleSocial}`])
            keys.map((key) => {
                total += socialMedia[`${singleSocial}`][`${key}`].number * socialMedia[`${singleSocial}`][`${key}`].price
            })
        })
        return total
    }

    const addOrRemoveLicense = (item: string) => {
        let newArr = []
        if (licensing.includes(item)) {
            newArr = licensing.filter((lic: string) => lic != item)
        } else newArr = [...licensing, item]
        dispatch(CampaignCredential({ prop: 'licensing', value: newArr }))
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Final step\nlet's pick where you want the influencers to post"}
                navigateMeBack={() => Cancel()}
                textStyle={{ fontWeight: '500', fontSize: hp('3.5%'), marginBottom: hp('2.5%') }}
                imageName={ImagePath.blackCross} />

            <ScrollView style={{ width: '110.5%', right: '5%', height: '50%' }}
                contentContainerStyle={{ flexGrow: 1 }}>
                {BASE_SOCIAL.map((social: any, index: number) => {
                    const isSelected = selectedSocial === social.title
                    return (
                        <View key={index} style={{ marginHorizontal: wp('5%') }}>
                            <TouchableOpacity
                                onPress={() => isSelected ? setSelectedSocial('') : chooseSocialMedia(social.title)}
                                key={index} style={[GlobalStyles.rowBetween, { marginVertical: hp('3%') }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={social.img}
                                        style={[GlobalStyles.arrowImage, { marginRight: wp('8%') }]} />
                                    <Text style={[GlobalStyles.regularText,
                                    { fontWeight: '500', textTransform: 'capitalize', fontSize: hp('2.25%') }]}>
                                        {social.title}
                                    </Text>
                                </View>
                                <Image source={isSelected ? ImagePath.upArrow : ImagePath.downArrow}
                                    style={[GlobalStyles.arrowImage, { resizeMode: 'contain' }]} />
                            </TouchableOpacity>
                            {isSelected &&
                                //@ts-ignore
                                BASE_SOCIAL_MEDIA[social.title].map((outlet: string) => {
                                    return SocialMediaOutlet(socialMedia[`${social.title}`][`${outlet}`], outlet, social.title)
                                })
                            }
                            {index !== BASE_SOCIAL.length - 1 && <View style={GlobalStyles.graySeperator} />}
                        </View>

                    )
                })}
                <View style={{ backgroundColor: Colors.veryLightGray }}>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', marginLeft: wp('5%'), marginTop: hp('2%') }]}>Licensing</Text>
                    {LICENSING.map((lic, index) => {
                        return (
                            <View key={index} style={{ marginHorizontal: wp('5%') }}>
                                <TouchableOpacity onPress={() => addOrRemoveLicense(lic)}
                                    style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                                    <Text style={GlobalStyles.regularText}>{lic}</Text>
                                    <Image source={licensing.includes(lic) ? ImagePath.checkedSquare : ImagePath.uncheckedSquare}
                                        style={GlobalStyles.arrowImage} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <Text style={[GlobalStyles.regularText, { textAlign: 'center', marginVertical: hp('2%') }]}>
                Total <Text style={{ fontWeight: '500' }}>${getTotal()}</Text>
            </Text>
            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigateMe()}
                verified={isVerified()}
                lineWidth={wp('8.75%') * 10}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    mathButton: {
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

export default SocialMedia