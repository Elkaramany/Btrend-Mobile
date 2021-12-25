import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message'

import { Colors, GlobalStyles, validateEmail } from '../../../Config';
import { GET } from '../../../Config/API';
import { USERS_URL } from '@env';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Credential, SignIn } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';

import GoogleLogin from '../../../Config/Utils/Google'
import FacebookLogin from '../../../Config/Utils/Facebook'
import AppleLogin from '../../../Config/Utils/Apple'
import LoginMethods from '../../../Components/LoginMethods';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, authType, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = async () => {
        if (validateEmail(email)) {
            dispatch(Credential({ prop: 'loading', value: true }))
            const { success, data }: any = await GET(`${USERS_URL}/verifyEmailSignIn/${email}`)
            dispatch(Credential({ prop: 'loading', value: false }))
            if (success) navigation.navigate('Password', { screenType: "signin" })
            else {
                Toast.show({
                    type: 'error',
                    text1: `Error signing in with ${authType || "email"}`,
                    text2: data,
                });
            }
        }
    }

    const Phone = async () => {
        navigation.navigate("Phone", { screenType: "signin" })
        dispatch(Credential({ prop: 'authType', value: "phone" }))
    }

    const Apple = async () => {
        const { email }: any = await AppleLogin()
        dispatch(SignIn({ authType: "apple", email }))
    }

    const Google = async () => {
        const { email }: any = await GoogleLogin()
        dispatch(SignIn({ authType: "google", email }))
    }

    const Facebook = async () => {
        const { id }: any = await FacebookLogin()
        dispatch(SignIn({ authType: "facebook", id }))
    }

    return (
        <>
            <Container>
                <HeaderArrow headerText={'Sign In'} navigateMeBack={() => navigation.navigate("Home")} />

                <LoginMethods label={'Email'} buttonText={"Continue"} pressedContinue={() => pressedContinue()}
                    apple={() => Apple()}
                    google={() => Google()}
                    facebook={() => Facebook()}
                    phone={() => Phone()} />
                {!loading && 
                <TouchableOpacity
                    onPress={() => navigation.navigate("Trouble")}
                >
                    <Text style={[GlobalStyles.regularText, { textDecorationLine: 'underline', textAlign: 'center' }]}>Trouble signing in?</Text>
                </TouchableOpacity>}

            </Container>
            <TouchableOpacity style={styles.signUpButton}
                onPress={() => loading ? {} : navigation.navigate("EmailSignUp")}
            >
                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>Need an accout?</Text>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%'), fontWeight: '500', color: Colors.brightRed }]}>Create Account</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    signUpButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        marginBottom: hp('3%'),
        paddingTop: hp('2%')
    },
})

export default Home