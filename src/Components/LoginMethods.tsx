import React from 'react'
import { View, Text } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Credential } from '../Redux/Actions';
import { Colors, GlobalStyles, ImagePath, IOS, validateEmail } from '../Config';

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
                    label={label || "Email"}
                    value={email}
                    onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
                />

                <View style={{ height: hp('1%') }} />

                <GradientButton text={buttonText || 'Continue'} colors={validateEmail(email) ? Colors.gradientButton : Colors.disabledButton}
                    onPress={() => pressedContinue()}
                />

                <View style={GlobalStyles.rowBetween}>
                    <View style={[GlobalStyles.horizontalLine,
                    { marginVertical: hp('7%'), width: '45%' }]} />
                    <Text style={[GlobalStyles.regularText, { color: Colors.inputGray }]}> OR </Text>
                    <View style={[GlobalStyles.horizontalLine,
                    { marginVertical: hp('7%'), width: '45%' }]} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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