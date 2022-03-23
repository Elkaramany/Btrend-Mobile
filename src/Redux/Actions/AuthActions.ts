import { USERS_URL } from '@env'
import { Props } from '../Types'
import { POST } from '../../Config/API'
import { ShowToast } from '../../Config'

interface Cred {
    prop: string
    value: number | object | string | null | boolean
}

interface SignInType {
    authType: string
    userType: string
    email?: string
    password?: string
    id?: string | number
}


export const Credential = (cred: Cred) => {
    //Key interpolation
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
        ShowToast("error", `Error signing in with ${user.authType || "email"}`, data)
    }
    changeLoader(dispatch, false)
}

export const SignUp = (user: Props) => async (dispatch: any) => {
    changeLoader(dispatch, true)
    const { success, data } = await POST(`${USERS_URL}/signup`, user)
    if (success) SignInSuccess(dispatch, data)
    else {
        ShowToast("error", `Error signing up with ${user.authType || "email"}`, data)
    }
    changeLoader(dispatch, false)
}

const SignInSuccess = (dispatch: any, data: any) => {
    dispatch({ type: "Sign_In_Success", payload: { user: data.user, token: data.token } })
}

//Sends verification code to user's phone
export const SendCode = (countryCode: string, phone: string, type: string, userType: string, setOTPSent: () => void) => async (dispatch: any) => {
    changeLoader(dispatch, true)
    const { success, data } = await POST(`${USERS_URL}/signupWithPhone`, {
        countryCode,
        phone,
        type,
        userType,
    })
    if (success) {
        setOTPSent()
    } else {
        ShowToast("error", data || "Please try again.", `Error sending code to +${countryCode}${phone}`)
    }
    changeLoader(dispatch, false)
}

//Checks the OTP send by the user with the verification code by the BE
export const SendOTP = (countryCode: string, phone: string, code: string, type: string, navigation: any) => async (dispatch: any) => {
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
        else navigation.navigate("PersonalInfo")
    } else {
        ShowToast("error", data || "Please try again.", `Error verifying otp to +${countryCode}${phone}`)
    }
    changeLoader(dispatch, false)
}

export const ClearAll = () => async (dispatch: any) => {
    dispatch({ type: "clear" })
}

const changeLoader = (dispatch: any, value: boolean) => {
    dispatch({ type: "load", payload: value })
}