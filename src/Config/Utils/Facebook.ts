import { LoginManager, Profile, AccessToken } from 'react-native-fbsdk-next';
import { Alert } from 'react-native';
import axios from 'axios'

// Get the user's profile using Facebook's Graph API

export default async () => {
    const permissions = ["public_profile", "email"]
    const result = await LoginManager.logInWithPermissions(permissions)
    if (result.isCancelled) {
        return null
    } else {
        const { accessToken }: any = await AccessToken.getCurrentAccessToken()
        if (accessToken) {
            const Base_URL = "https://graph.facebook.com/"
            const fields = ["id", "email", "first_name", "last_name", "picture"];
            const query = `${Base_URL}me?access_token=${accessToken}&&fields=${fields}&&type=large`
            const { data } = await axios.get(query)
            if (data) {
                //Get an enhanced user picture
                const { config } = await axios.get(`${Base_URL}${data.id}/picture?type=large&&access_token=${accessToken}`)
                return {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    photo: config?.url || data.picture.data.url,
                    id: data.id
                }
            } else {
                Alert.alert("Couldn't get your profile from facebook.")
                return null
            }
        } else {
            Alert.alert("Couldn't get Facebook' permission to get your profile.")
            return null
        }
    }
}