import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, GOOGLE_PLACES } from "@env"
import { Alert } from 'react-native';
import axios from "axios";

export const GoogleLogin = async () => {
    try {
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            iosClientId: GOOGLE_IOS_CLIENT_ID, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const { givenName, familyName, email, photo, id } = userInfo.user
        return { firstName: givenName, lastName: familyName, email, photo, id }
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert("Google Login error: Google Play services is not available on your device")
        } else {
            // some other error happened
            Alert.alert(`Google Login error: ${error.message}`)
        }

        return null
    }
}

const googleAPI = axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/`,
    method: 'get',
    timeout: 10000,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    }
});

export const GoogleAutocomplete = async (searchInput: string) => {
    const GoogleAutocompleteURL = 'place/autocomplete/json'
    const { data } = await googleAPI(`${GoogleAutocompleteURL}?input=${searchInput}&types=(cities)&key=${GOOGLE_PLACES}`)
    if (data && data.predictions.length) {
        let arr: string[] = []
        data.predictions.map((prediction: any) => {
            arr.push(prediction.description)
        })
        return arr
    }
    return []
}