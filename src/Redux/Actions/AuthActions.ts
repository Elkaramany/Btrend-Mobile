import { USERS_URL } from '@env'
import { Props } from '../Types'
import { GET, POST } from '../../Config/API'
import Toast from 'react-native-toast-message'

interface Cred {
    prop: string
    value: number | object | string | null | boolean
}

interface SignInType {
    authType: string
    email?: string
    password?: string
    id?: string | number
}


export const Credential = (cred: Cred) => {
    return {
        type: 'Credential_In',
        payload: { prop: cred.prop, value: cred.value }
    }
}

export const SignIn = (user: SignInType) => async (dispatch: any) => {
    dispatch(Credential({ prop: 'authType', value: user.authType }))
    changeLoader(dispatch, true)
    const { success, data }: any = await POST(`${USERS_URL}/signin`, user)

    if (success) SignInSuccess(dispatch, data)
    else {
        Toast.show({
            type: 'error',
            text1: `Error signing in with ${user.authType || "email"}`,
            text2: data,
        });
    }
    changeLoader(dispatch, false)
}

export const SignUp = (user: Props) => async (dispatch: any) => {
    changeLoader(dispatch, true)
    const { success, data } = await POST(`${USERS_URL}/signup`, user)
    if (success) SignInSuccess(dispatch, data)
    else {
        Toast.show({
            type: 'error',
            text1: `Error signing up with ${user.authType || "email"}`,
            text2: data,
        });
    }
    changeLoader(dispatch, false)
}

const SignInSuccess = (dispatch: any, data: any) => {
    dispatch({ type: "Sign_In_Success", payload: { user: data.user, token: data.token } })
}

export const SendCode = (countryCode: string, phone: string, type: string) => async (dispatch: any) => {
    changeLoader(dispatch, true)
    const { success, data } = await POST(`${USERS_URL}/signupWithPhone`, {
        countryCode,
        phone,
        type,
    })
    if (success) {
        dispatch(Credential({ prop: 'otpVerify', value: "Code Sent" }))
    } else {
        Toast.show({
            type: 'error',
            text1: data || "Please try again.",
            text2: `Error sending code to +${countryCode}${phone}`,
        });
    }
    changeLoader(dispatch, false)
}

export const SendOTP = (countryCode: string, phone: string, code: string, type: string) => async (dispatch: any) => {
    changeLoader(dispatch, true)
    const { success, data } = await POST(`${USERS_URL}/verifySignupWithPhone`, {
        countryCode,
        phone,
        code,
        type,
    })
    if (success) {
        //User signed in with phone number
        if (type === "signin") SignInSuccess(dispatch, data)
        //User is signing up
        else dispatch(Credential({ prop: 'otpVerify', value: "Correct Code" }))
    } else {
        Toast.show({
            type: 'error',
            text1: data || "Please try again.",
            text2: `Error verifying otp to +${countryCode}${phone}`,
        });
    }
    changeLoader(dispatch, false)
}

export const ClearAll = () => async (dispatch: any) => {
    dispatch({ type: "clear" })
}

const changeLoader = (dispatch: any, value: boolean) => {
    dispatch({ type: "load", payload: value })
}