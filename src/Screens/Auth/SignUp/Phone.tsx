import React from 'react';
import {
    View, TouchableOpacity, Image,
    StyleSheet, Text,
    Alert
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles, ImagePath, validatePhone } from '../../../Config';
import CountryPicker from 'react-native-country-picker-modal';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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
    route: any
}

interface User {
    email?: string
    firstName?: string
    lastName?: string
    photo?: string
    id: string | null
}

const Phone: React.FC<Props> = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [OTPSent, setOTPSent] = React.useState(false)
    const OTPSentSuccessFully = () => setOTPSent(true)
    const [visible, setVisible] = React.useState(false)
    const [country, setCountry] = React.useState("Country")
    const [cca2, setCca2] = React.useState("")
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 6 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const screenType = route.params.screenType
    const { phone, countryCode, loading, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)


    const pressedContinue = () => {
        if (OTPSent) {
            dispatch(SendOTP(countryCode, phone, value, screenType, navigation))
        } else {
            if (validatePhone(`+${countryCode}${phone}`)) {
                dispatch(SendCode(countryCode, phone, screenType, userType, OTPSentSuccessFully))
            } else {
                Alert.alert("Please enter a valid phone number")
            }
        }
    }

    const chosenCountry = (selectedCountry: any) => {
        dispatch(Credential({ prop: 'countryCode', value: selectedCountry.callingCode[0] }))
        setCountry(selectedCountry.name)
        setVisible(false)
    }

    const phoneInput = (text: string) => {
        if (!countryCode.length) {
            Alert.alert("Please select a country")
        } else {
            dispatch(Credential({ prop: 'phone', value: text }))
        }
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
                <>
                    <Text style={[GlobalStyles.regularText, styles.codeStyle]}>Enter the code sent to +{countryCode}{phone}:</Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={6}
                        rootStyle={{ marginTop: 20 }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </>
            )
        } else {
            return (
                <>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[GlobalStyles.regularText, styles.codeStyle]}>{country}</Text>
                            <Image source={ImagePath.dropdownTriangle} style={[GlobalStyles.arrowImage, { alignSelf: 'center', marginRight: wp('5%') }]} />
                        </TouchableOpacity>
                    </View>

                    <Input
                        label={`+${countryCode}` || "Phone number"}
                        type={'numeric'}
                        value={phone}
                        onChangeText={text => phoneInput(text)}
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
            <HeaderArrow headerText={screenType === "signup" ? 'Sign Up' : "Sign In"} navigateMeBack={() => goBack()} />

            {showVerification()}

            {visible === true && <CountryPicker
                cca2={cca2}
                visible={visible}
                withFlagButton={false}
                withFilter
                onClose={() => setVisible(false)}
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
        borderWidth: wp('0.25%'),
        borderColor: Colors.secondary,
        borderRadius: hp('2%'),
        marginBottom: hp('5%'),
    }, codeStyle: {
        marginHorizontal: wp('4%'),
        marginVertical: hp('2%'),
    }, root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
})

export default Phone