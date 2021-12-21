import axios from 'axios'
import { USERS_URL } from '@env'
import { Props } from '../Types'
import Toast from 'react-native-toast-message';

interface Cred {
    prop: string
    value: number | object | string | null
}


export const Credential = (cred: Cred) => {
    return {
        type: 'Credential_In',
        payload: { prop: cred.prop, value: cred.value }
    }
}

export const SignUp = (user: Props) => async (dispatch: any) => {
    try {
        const res = await axios({
            method: 'post',
            url: `${USERS_URL}/signup`,
            data: user
        })
        dispatch({ type: "Sign_Up_Success", payload: res.data.token })
    } catch (e: any) {
        console.log(e.response.data)
        Toast.show({
            type: 'error',
            text1: e.response.data,
        });
    }
}

export const SendCode = (countryCode: string, phone: string) => async (dispatch: any) => {
    dispatch({ type: "load", payload: true })
    try {
        await axios({
            method: 'post',
            url: `${USERS_URL}/signupWithPhone`,
            data: {
                countryCode,
                phone,
            }
        })
        dispatch({ type: "load", payload: false })
        return true
    } catch (e: any) {
        Toast.show({
            type: 'error',
            text1: e.response.data,
        });
        dispatch({ type: "load", payload: false })
        return false
    }
}

export const SendOTP = (countryCode: string, phone: string, code: string) => async (dispatch: any) => {
    try {
        await axios({
            method: 'post',
            url: `${USERS_URL}/verifySignupWithPhone`,
            data: {
                countryCode,
                phone,
                code,
            }
        })
        return true
    } catch (e: any) {
        Toast.show({
            type: 'error',
            text1: e.response.data,
        });
        return false
    }
}

export const ClearAll = () => async (dispatch: any) => {
    dispatch({ type: "clear" })
}