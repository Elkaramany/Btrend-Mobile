import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert, ScrollView } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as RNLocalize from "react-native-localize";

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { ClearAll, Credential } from '../../../Redux/Actions';
import {
    Colors, ImagePath, GlobalStyles, validateName,
    validateEmail, ArabCountries, handleSelection
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

const PersonalInfo: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [verified, setVerified] = React.useState(false)
    const [dateOpen, setDateOpen] = React.useState(false)
    const { userType, photo, firstName, lastName, dob, gender, companyName, companyEmail, brandInformation } = useSelector((state: RootStateOrAny) => state.AuthReducer)
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
            if (validateEmail(companyEmail) && validateName(companyName) && validateName(photo) && validateName(brandInformation)) setVerified(true)
            else setVerified(false)
        } else if (userType === "Influencer") {
            if (validateName(firstName) && validateName(lastName) && validateName(photo) && validateName(dob) && validateName(gender)) {
                setVerified(true)
            } else setVerified(false)
        }
    }, [dob, gender, firstName, lastName, companyName, companyEmail, brandInformation, photo])

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
                        label="Company Name"
                        value={companyName}
                        onChangeText={text => dispatch(Credential({ prop: 'companyName', value: text }))}
                    />
                    <Input
                        label="Company Email"
                        value={companyEmail}
                        onChangeText={text => dispatch(Credential({ prop: 'companyEmail', value: text }))}
                    />
                    <Input
                        dense
                        multiline
                        inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                        label="Brand Information"
                        value={brandInformation}
                        onChangeText={text => dispatch(Credential({ prop: 'brandInformation', value: text }))}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Input
                        label="First Name"
                        value={firstName}
                        onChangeText={text => dispatch(Credential({ prop: 'firstName', value: text }))}
                    />
                    <Input
                        label="Last Name"
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
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.gray }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.gray }} />
            </View>

            <ScrollView style={{ flexGrow: 1 }}>
                <HeaderArrow headerText={isBrand ? "Company Info" : "Personal Info"} navigateMeBack={() => sendMeBack()} />
                <TouchableOpacity style={styles.addProfile}
                    onPress={() => handleImage()}
                >
                    <Image source={photo && photo.length ? { uri: photo } : ImagePath.profileAddSquare} style={styles.imageStyle} />
                    <Text style={[GlobalStyles.regularText,
                    { marginLeft: wp('5%'), textDecorationLine: 'underline', fontWeight: 'bold' }]}
                    >Add a {isBrand ? "company" : "profile"} photo</Text>
                </TouchableOpacity>
                {showInput()}
                {!isBrand &&
                    <>
                        <TouchableOpacity
                            style={[GlobalStyles.buttonContainer, styles.dateButton]}
                            onPress={() => setDateOpen(true)}
                        >
                            <Text style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.85%') }]}>{dob.length ? dob : "Date of Birth"}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            date={new Date("1996-08-26")}
                            maximumDate={new Date()}
                            isVisible={dateOpen}
                            mode="date"
                            onConfirm={(date) => setDate(date)}
                            onCancel={() => setDateOpen(false)}
                        />

                        <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%') }]}>
                            <RadioBtn
                                text={"Female"}
                                selected={gender === "Female"}
                                onPress={() => dispatch(Credential({ prop: 'gender', value: gender === "Female" ? "" : "Female" }))}
                            />

                            <RadioBtn
                                text={"Male"}
                                selected={gender === "Male"}
                                onPress={() => dispatch(Credential({ prop: 'gender', value: gender === "Male" ? "" : "Male" }))}
                            />

                            {!ArabCountries.includes(RNLocalize.getCountry()) &&
                                <TouchableOpacity
                                    style={GlobalStyles.centeredContainer}
                                    onPress={() => navigation.navigate("Genders")}
                                >
                                    <Text style={GlobalStyles.regularText}>{gender.length && gender !== 'Male' && gender !== 'Female' ? gender : "Other"}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </>
                }

                <View style={{ marginBottom: hp('3%') }}>
                    <Text style={GlobalStyles.regularText}>
                        Before you continue take a look at{" "}
                        <Text
                            style={[
                                GlobalStyles.regularText,
                                { textDecorationLine: "underline", color: Colors.blue }
                            ]}
                            onPress={() => handleUrlPress("https://google.com")}
                        >
                            Terms of service
                        </Text>
                        ,{" "}
                        <Text
                            style={[
                                GlobalStyles.regularText,
                                { textDecorationLine: "underline", color: Colors.blue }
                            ]}
                            onPress={() => handleUrlPress("https://google.com")}
                        >
                            Privacy policy
                        </Text>
                    </Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: hp('3%') }}>
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
        borderColor: Colors.secondary,
        borderWidth: wp('0.25%'),
        marginBottom: hp('3.5%')
    },
})

export default PersonalInfo