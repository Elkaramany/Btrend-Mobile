export interface Action {
    type: string
    payload: any
}

export interface Location {
    lat: number
    lng: number
}

export interface Props {
    email: string
    password: string
    userType: string
    firstName: string
    lastName: string
    dob: Date | string
    gender: string
    photo: string
    categories: string[]
    location: Location | null
    token: null | string
    id: null | number | string
    authType: string
    phone: string
    countryCode: string
    loading: boolean
    otpVerify: string
}