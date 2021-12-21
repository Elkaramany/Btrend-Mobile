import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ImagePath, validateEmail, Colors, IOS } from '../../../Config';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Credential } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';
import GradientButton from '../../../Components/GradientButton';
import SocialButton from '../../../Components/SocialButton'
import Input from '../../../Components/Input'
import GoogleLogin from '../../../Config/Utils/Google'
import FacebookLogin from '../../../Config/Utils/Facebook';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

interface User {
    email?: string
    firstName?: string
    lastName?: string
    photo?: string
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [emailVerified, setEmailVerified] = React.useState(false)
    const { email } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    React.useEffect(() => {
        if (validateEmail(email)) setEmailVerified(true)
        else setEmailVerified(false)
    }, [email])

    const pressedContinue = () => {
        if (emailVerified) {
            navigation.navigate('EmailPassword')
        }
    }

    const Google = async () => {
        const user: any = await GoogleLogin()
        dispatchData(user)
    }

    const Facebook = async () => {
        const user = await FacebookLogin()
        dispatchData(user)
    }

    const dispatchData = (user: User | null) => {
        if (user && user !== null) {
            dispatch(Credential({ prop: 'email', value: user?.email || "" }))
            dispatch(Credential({ prop: 'firstName', value: user.firstName || "" }))
            dispatch(Credential({ prop: 'lastName', value: user.lastName || "" }))
            dispatch(Credential({ prop: 'photo', value: user.photo || "" }))
            pressedContinue()
        }
    }

    return (
        <Container>
            <HeaderArrow headerText={'Sign Up'} navigateMeBack={() => navigation.goBack()} />
            <Input
                label="Email"
                value={email}
                onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
            />

            <GradientButton text={'Continue'} colors={emailVerified ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedContinue()}
            />

            <View style={{ backgroundColor: Colors.gray, height: hp('0.2%'), marginVertical: hp('6%') }} />

            <SocialButton text={'Continue with Phone'} imageName={ImagePath.phone} onPress={() => { }} />
            <SocialButton text={'Continue with Google'} imageName={ImagePath.google} onPress={() => Google()} />
            <SocialButton text={'Continue with Facebook'} imageName={ImagePath.fb} onPress={() => Facebook()} />
            {IOS && <SocialButton text={'Continue with Apple'} imageName={ImagePath.apple} onPress={() => { }} />}
        </Container>
    )
}

export default SignUp