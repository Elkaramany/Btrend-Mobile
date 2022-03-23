import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Alert } from 'react-native';

export default async () => {
    // performs apple login request
    const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!res) return null
    return {
        id: res?.user,
        firstName: res?.fullName?.givenName || '',
        lastName: res?.fullName?.familyName || '',
        //Apple only returns the email address the first time you call apple login but always returns the same user prop 
        email: `${res?.user.slice(0, 9)}apple@email.com`
    }
}