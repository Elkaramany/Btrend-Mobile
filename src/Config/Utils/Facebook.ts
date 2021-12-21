import { LoginManager, Profile } from 'react-native-fbsdk-next';
import { Alert } from 'react-native';


export default async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
    if (result.isCancelled) {
        return null
    } else {
        const user = await Profile.getCurrentProfile()
        if (user) {
            const { firstName, lastName, email, userID, imageURL } = user
            return { firstName, lastName, email, photo: imageURL, id: userID }
        }
        return null
    }
}
