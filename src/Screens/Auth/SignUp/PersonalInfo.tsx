import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { ClearAll, Credential } from '../../../Redux/Actions';
import {
    Colors, ImagePath, GlobalStyles, validateName,
    validateEmail, handleSelection
}
    from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Input from '../.././../Components/Input'
import GradientButton from '../../../Components/GradientButton'
import RadioBtn from '../../../Components/RadioBtn';

import { formatDate } from '../../../Config/Validators';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const textInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.secondary, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.primary
    }, roundness: hp('2%')
}

const PersonalInfo: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [verified, setVerified] = React.useState(false)
    const [dateOpen, setDateOpen] = React.useState(false)
    const { userType, photo, firstName, lastName, position,
        dob, gender, brandName, brandEmail, brandInformation } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === 'Brand'

    const handleUrlPress = React.useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);


    const pressedContinue = () => {
        if (verified) navigation.navigate("Categories")
    }

    React.useEffect(() => {
        if (userType === "Brand") {
            if (validateEmail(brandEmail) && validateName(brandName)
                && validateName(photo) && validateName(brandInformation)) setVerified(true)
            else setVerified(false)
        } else if (userType === "Influencer") {
            if (validateName(firstName) && validateName(lastName) && validateName(position),
                validateName(photo) && validateName(dob) && validateName(gender)) {
                setVerified(true)
            } else setVerified(false)
        }
    }, [dob, gender, firstName, lastName, brandName, brandEmail, brandInformation, photo])

    const handleImage = async () => {
        const image: string | null = await handleSelection()
        dispatch(Credential({ prop: 'photo', value: image }))
    };


    const setDate = (date: Date) => {
        dispatch(Credential({ prop: 'dob', value: formatDate(date) }))
        setDateOpen(false)
    }

    const sendMeBack = () => {
        dispatch(ClearAll())
        navigation.navigate("Home")
    }

    const showInput = () => {
        if (isBrand) {
            return (
                <>
                    <Input
                        placeHolder="Brand Name"
                        value={brandName}
                        onChangeText={text => dispatch(Credential({ prop: 'brandName', value: text }))}
                    />
                    <Input
                        placeHolder="Brand Email"
                        value={brandEmail}
                        onChangeText={text => dispatch(Credential({ prop: 'brandEmail', value: text }))}
                    />
                    <Input
                        dense
                        multiline
                        inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                        label="Brand Information"
                        value={brandInformation}
                        theme={textInputTheme}
                        onChangeText={text => dispatch(Credential({ prop: 'brandInformation', value: text }))}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Input
                        placeHolder="First Name"
                        value={firstName}
                        onChangeText={text => dispatch(Credential({ prop: 'firstName', value: text }))}
                    />
                    <Input
                        placeHolder="Last Name"
                        value={lastName}
                        onChangeText={text => dispatch(Credential({ prop: 'lastName', value: text }))}
                    />
                </>
            )
        }
    }

    return (
        <Container mainStyle={{ flex: 1 }}>

            <View style={GlobalStyles.rowBetween}>
                <View style={GlobalStyles.redLine} />
                <View style={[GlobalStyles.redLine, { backgroundColor: Colors.gray }]} />
                <View style={[GlobalStyles.redLine, { backgroundColor: Colors.gray }]} />
            </View>

            <ScrollView style={{ flexGrow: 1 }}>
                <HeaderArrow headerText={isBrand ? "Brand Info" : "Personal Info"} navigateMeBack={() => sendMeBack()} />
                <TouchableOpacity style={styles.addProfile}
                    onPress={() => handleImage()}
                >
                    <Image source={photo && photo.length ? { uri: photo } : ImagePath.profileAddSquare} style={styles.imageStyle} />
                    <Text style={[GlobalStyles.regularText,
                    { marginLeft: wp('5%'), textDecorationLine: 'underline', fontWeight: 'bold' }]}
                    >Add a {isBrand ? "brand" : "profile"} photo</Text>
                </TouchableOpacity>
                {showInput()}
                {!isBrand &&
                    <>
                        <Input
                            placeHolder='Fashion Influencer'
                            value={position}
                            onChangeText={text => dispatch(Credential({ prop: 'position', value: text }))}
                        />
                        <TouchableOpacity
                            style={[GlobalStyles.buttonContainer, styles.dateButton]}
                            onPress={() => setDateOpen(true)}
                        >
                            <Text style={[GlobalStyles.regularText, {
                                textAlign: 'left', fontSize: hp('1.85%'),
                                color: dob.length ? Colors.secondary : Colors.inputGray
                            }]}>{dob.length ? dob : "Date of Birth"}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            date={new Date("1996-08-26")}
                            maximumDate={new Date()}
                            isVisible={dateOpen}
                            mode="date"
                            onConfirm={(date) => setDate(date)}
                            onCancel={() => setDateOpen(false)}
                        />

                        <TouchableOpacity onPress={() => navigation.navigate("Genders")}
                            style={[GlobalStyles.rowBetween, { marginBottom: hp('3%'), marginHorizontal: wp('1%') }]}>
                            <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>
                                {gender.length ? gender : "Select your Gender"}
                            </Text>
                            <Image source={ImagePath.arrowRight} style={{ height: wp('8%'), width: wp('8%'), left: wp('2%') }} />
                        </TouchableOpacity>
                    </>
                }

                <View style={{ marginBottom: hp('3%') }}>
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>
                        Before you continue take a look at{" "}
                        <Text
                            style={[
                                GlobalStyles.regularText,
                                { textDecorationLine: "underline", color: Colors.blue, fontSize: hp('1.5%') }
                            ]}
                            onPress={() => handleUrlPress("https://google.com")}
                        >
                            Terms of service
                        </Text>
                        ,{" "}
                        <Text
                            style={[
                                GlobalStyles.regularText,
                                { textDecorationLine: "underline", color: Colors.blue, fontSize: hp('1.5%') }
                            ]}
                            onPress={() => handleUrlPress("https://google.com")}
                        >
                            Privacy policy
                        </Text>
                    </Text>
                </View>

                <View style={[GlobalStyles.bottomContainer, { marginBottom: hp('1%') }]}>
                    <GradientButton text={'Continue'} colors={verified ? Colors.gradientButton : Colors.disabledButton}
                        onPress={() => pressedContinue()}
                    />
                </View>
            </ScrollView>
        </Container >
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: wp('20%'),
        height: wp('20%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    }, addProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%')
    }, dateButton: {
        paddingVertical: hp('1.6%'),
        justifyContent: 'flex-start',
        borderColor: Colors.inputGray,
        borderWidth: wp('0.25%'),
        marginBottom: hp('3.5%')
    },
})

export default PersonalInfo