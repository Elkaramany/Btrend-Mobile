import React from 'react';
import Toast from 'react-native-toast-message'

import { validateEmail } from '../../../Config';
import { GET } from '../../../Config/API';
import { USERS_URL } from '@env';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Credential } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';
import { GoogleLogin } from '../../../Config/Utils/Google'
import FacebookLogin from '../../../Config/Utils/Facebook';
import AppleLogin from '../../../Config/Utils/Apple';
import LoginMethods from '../../../Components/LoginMethods';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

interface User {
    email: string
    firstName?: string
    lastName?: string
    photo?: string
    id: string | null
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const VerifyEmailSignUp = async (email: string): Promise<boolean> => {
        if (!email || !email.length) return false
        dispatch(Credential({ prop: 'loading', value: true }))
        const { success, data } = await GET(`${USERS_URL}/verifyEmailSignUp/${email}`)
        if (!success) {
            const errors = [`${email} is not allowed`]
            if (Array.isArray(data)) {
                errors[0] = data[0]
                errors[1] = data[1]
            } else errors[1] = data

            Toast.show({
                type: 'error',
                text1: errors[0],
                text2: errors[1]
            });
        }
        dispatch(Credential({ prop: 'loading', value: false }))
        return success
    }

    const pressedContinue = async () => {
        if (validateEmail(email)) {
            const res = await VerifyEmailSignUp(email)
            if (res) navigation.navigate("Password", { screenType: "signup" })
        }
    }

    const Phone = async () => {
        dispatch(Credential({ prop: 'authType', value: "phone" }))
        navigation.navigate("Phone", { screenType: "signup" })
    }

    const Apple = async () => {
        const user: any = await AppleLogin()
        dispatchData(user, "apple")
    }

    const Google = async () => {
        const user: any = await GoogleLogin()
        dispatchData(user, "google")
    }

    const Facebook = async () => {
        const user: any = await FacebookLogin()
        dispatchData(user, "facebook")
    }

    const dispatchData = async (user: User, type: string) => {
        if (!user) return;
        const res = await VerifyEmailSignUp(user.email)
        if (res) {
            dispatch(Credential({ prop: 'email', value: user?.email || "" }))
            if (userType === "Influencer") {
                dispatch(Credential({ prop: 'firstName', value: user.firstName || "" }))
                dispatch(Credential({ prop: 'lastName', value: user.lastName || "" }))
            } else {
                dispatch(Credential({ prop: 'companyName', value: `${user.firstName} ${user.lastName}` || "" }))
            }
            dispatch(Credential({ prop: 'photo', value: user.photo || "" }))
            dispatch(Credential({ prop: 'authType', value: type || "" }))
            dispatch(Credential({ prop: 'id', value: user.id || "" }))
            navigation.navigate('PersonalInfo')
        }
    }

    return (
        <Container>
            <HeaderArrow headerText={'Sign Up'} navigateMeBack={() => navigation.goBack()} />

            <LoginMethods label={'Email'} buttonText={"Continue"} pressedContinue={() => pressedContinue()}
                apple={() => Apple()}
                google={() => Google()}
                facebook={() => Facebook()}
                phone={() => Phone()} />
        </Container>
    )
}

export default SignUp