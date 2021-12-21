import { LoginManager, Profile } from 'react-native-fbsdk-next';
import { Alert } from 'react-native';


export default async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
    if (result.isCancelled) {
        return null
    } else {
        const user = await Profile.getCurrentProfile()
        if (user) {
            return { firstName: user?.firstName, lastName: user?.lastName, email: user?.email, photo: user?.imageURL, id: user?.userID }
        }
        return null
    }
}