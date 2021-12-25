import { LoginManager, Profile, AccessToken } from 'react-native-fbsdk-next';
import { Alert } from 'react-native';
import axios from 'axios'

const api = axios.create({
    baseURL: `https://graph.facebook.com/`,
    method:'get',
    timeout: 30000,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
    }
});

// Get the user's profile using Facebook's Graph API
const profile = (query: string) => api(`/me?${query}`).then(response => response.data);

export default async () => {
    const permissions = ["public_profile", "email"]
    const result = await LoginManager.logInWithPermissions(permissions)
    if (result.isCancelled) {
        return null
    } else {
        const fields = ["id", "email", "first_name", "last_name", "picture"];
        const { accessToken }: any = await AccessToken.getCurrentAccessToken()
        const query = `access_token=${accessToken}&&fields=${fields}`
        const user = await profile(query)
        if (user) {
            return {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                photo: user.picture.data.url,
                id: user.id
            }
        }
        return null
    }
}