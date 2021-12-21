import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles, ImagePath, validatePhone } from '../../../Config';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { ClearAll, Credential, SendCode, SendOTP } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';
import GradientButton from '../../../Components/GradientButton';
import Input from '../../../Components/Input'
import Spinner from '../../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

interface User {
    email?: string
    firstName?: string
    lastName?: string
    photo?: string
    id: string | null
}

const Phone: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [OTPSent, setOTPSent] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [otp, setOtp] = React.useState("")
    const [country, setCountry] = React.useState("Country")
    const [cca2, setCca2] = React.useState("")
    const { phone, countryCode, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {
        if (OTPSent) {
            if (dispatch(SendOTP(countryCode, phone, otp))) {
                navigation.navigate("PersonalInfo")
            }
        } else {
            if (validatePhone(`+${countryCode}${phone}`)) {
                if (dispatch(SendCode(countryCode, phone))) {
                    setOTPSent(true)
                }
            }
        }
    }

    const chosenCountry = (selectedCountry: any) => {
        dispatch(Credential({ prop: 'countryCode', value: selectedCountry.callingCode[0] }))
        setCountry(selectedCountry.name)
        setVisible(false)
    }

    const showButton = () => {
        if (loading) {
            return <Spinner size={false} />
        } else {
            return (
                <GradientButton text={OTPSent ? "Enter the code" : "Send verification code"} colors={Colors.gradientButton}
                    onPress={() => pressedContinue()} />
            )
        }
    }

    const showVerification = () => {
        if (OTPSent) {
            return (
                <View>
                    <Text style={[GlobalStyles.regularText, styles.codeStyle]}>Enter the code sent to +{countryCode}{phone}:</Text>
                    <Input
                        label="Verification code"
                        value={otp}
                        onChangeText={text => setOtp(text)}
                    />
                </View>
            )
        } else {
            return (
                <>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp('1.5%') }}>
                            <Text style={[GlobalStyles.regularText, styles.codeStyle]}>{countryCode}</Text>
                            <View style={{ width: wp('0.4%'), backgroundColor: Colors.secondary }} />
                            <Text style={[GlobalStyles.regularText, styles.codeStyle]}>{country}</Text>
                            <View style={{ marginLeft: wp('35%') }}>
                                <Image source={ImagePath.dropdownTriangle} style={GlobalStyles.arrowImage} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Number"
                        value={phone}
                        onChangeText={text => dispatch(Credential({ prop: 'phone', value: text }))}
                    />
                </>
            )
        }
    }

    const goBack = () => {
        dispatch(ClearAll())
        navigation.goBack()
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={'Sign Up'} navigateMeBack={() => goBack()} />

            {showVerification()}

            {visible === true && <CountryPicker
                cca2={cca2}
                visible={visible}
                withFlagButton={false}
                withFilter
                onSelect={(selectedCountry) => chosenCountry(selectedCountry)}
            />
            }


            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                {showButton()}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: wp('0.5%'),
        borderColor: Colors.secondary,
        borderRadius: hp('1%'),
        marginBottom: hp('5%'),
    }, codeStyle: {
        marginHorizontal: wp('4%'),
        marginVertical: hp('2%'),
    }
})

export default Phone