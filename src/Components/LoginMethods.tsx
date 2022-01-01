import React from 'react'
import { View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Credential } from '../Redux/Actions';
import { Colors, ImagePath, IOS, validateEmail } from '../Config';

import GradientButton from './GradientButton'
import Spinner from './Spinner'
import SocialButton from './SocialButton'
import Input from './Input'

interface Props {
    buttonText?: string
    label?: string
    pressedContinue?: () => void
    phone?: () => void
    google?: () => void
    facebook?: () => void
    apple?: () => void
}

const LoginMethods: React.FC<Props> = ({ pressedContinue = () => { }, phone = () => { },
    google = () => { }, facebook = () => { }, apple = () => { }, buttonText, label
}) => {
    const { loading, email } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const dispatch = useDispatch()

    if (loading) return <Spinner size={false} />
    else {
        return (
            <>
                <Input
                    label={label || "Enter your email address"}
                    value={email}
                    onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
                />
                <GradientButton text={buttonText || 'Continue'} colors={validateEmail(email) ? Colors.gradientButton : Colors.disabledButton}
                    onPress={() => pressedContinue()}
                />

                <View style={{ backgroundColor: Colors.gray, height: hp('0.2%'), marginVertical: hp('4%') }} />

                <SocialButton text={'Continue with Phone'} imageName={ImagePath.phone} onPress={() => phone()} />
                <SocialButton text={'Continue with Google'} imageName={ImagePath.google} onPress={() => google()} />
                <SocialButton text={'Continue with Facebook'} imageName={ImagePath.fb} onPress={() => facebook()} />
                {IOS && <SocialButton text={'Continue with Apple'} imageName={ImagePath.apple} onPress={() => apple()} />}
            </>
        )
    }
}

export default LoginMethods