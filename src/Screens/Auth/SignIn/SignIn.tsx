import React from 'react';

import { validateEmail, ShowToast } from '../../../Config';
import { GET } from '../../../Config/API';
import { USERS_URL } from '@env';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { ClearAll, Credential, SignIn } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';
import Footer from '../Footer'

import { GoogleLogin } from '../../../Config/Utils/Google'
import FacebookLogin from '../../../Config/Utils/Facebook'
import AppleLogin from '../../../Config/Utils/Apple'
import LoginMethods from '../../../Components/LoginMethods';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, authType, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = async () => {
        if (validateEmail(email)) {
            dispatch(Credential({ prop: 'loading', value: true }))
            const { success, data }: any = await GET(`${USERS_URL}/verifyEmailSignIn/${email}`)
            dispatch(Credential({ prop: 'loading', value: false }))
            if (success) navigation.navigate('Password', { screenType: "signin" })
            else ShowToast("error", `Error signing in with ${authType || "email"}`, data)
        }
    }

    const Phone = async () => {
        navigation.navigate("Phone", { screenType: "signin" })
        dispatch(Credential({ prop: 'authType', value: "phone" }))
    }

    const Apple = async () => {
        const { id }: any = await AppleLogin()
        dispatch(SignIn({ authType: "apple", id, userType }))
    }

    const Google = async () => {
        const { id }: any = await GoogleLogin()
        dispatch(SignIn({ authType: "google", id, userType }))
    }

    const Facebook = async () => {
        const { id }: any = await FacebookLogin()
        dispatch(SignIn({ authType: "facebook", id, userType }))
    }

    const backHome = () => {
        dispatch(ClearAll())
        navigation.navigate("Home")
    }

    return (
        <>
            <Container>
                <HeaderArrow headerText={'Sign In'} navigateMeBack={() => backHome()} />

                <LoginMethods label={''} buttonText={"Continue"} pressedContinue={() => pressedContinue()}
                    apple={() => Apple()}
                    google={() => Google()}
                    facebook={() => Facebook()}
                    phone={() => Phone()} />
            </Container>
            <Footer title={'Need an account?'} text={'Create Account'} routing={() => navigation.navigate("EmailSignUp")} />
        </>
    )
}

export default Home