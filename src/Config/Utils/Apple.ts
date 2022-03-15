import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Alert } from 'react-native';

export default async () => {
    // performs login request
    const res = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!res) return null
    return {
        id: res?.user,
        firstName: res?.fullName?.givenName || '',
        lastName: res?.fullName?.familyName || '',
        email: res?.email || `${res?.user.slice(0,9)}apple@email.com`
    }
}