import React from 'react'
import { View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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

                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <SocialButton imageName={ImagePath.phone} onPress={() => phone()} />
                    {IOS && <SocialButton imageName={ImagePath.apple} onPress={() => apple()} />}
                    <SocialButton imageName={ImagePath.google} onPress={() => google()} />
                    <SocialButton imageName={ImagePath.fb} onPress={() => facebook()} />
                </View>
            </>
        )
    }
}

export default LoginMethods