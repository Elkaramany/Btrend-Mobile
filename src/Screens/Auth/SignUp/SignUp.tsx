import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message'

import { ImagePath, validateEmail, Colors, IOS } from '../../../Config';
import { GET } from '../../../Config/API';
import { USERS_URL } from '@env';

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
import AppleLogin from '../../../Config/Utils/Apple';
import Phone from './Phone';
import Spinner from '../../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

interface User {
    email?: string
    firstName?: string
    lastName?: string
    photo?: string
    id: string | null
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [emailVerified, setEmailVerified] = React.useState(false)
    const { email, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const VerifyEmailSignUp = async (email: string): Promise<boolean> => {
        dispatch(Credential({ prop: 'loading', value: true }))
        const { success, data } = await GET(`${USERS_URL}/verifyEmailSignUp/${email}`)
        if (!success) {
            Toast.show({
                type: 'error',
                text1: `${email} is not allowed`,
                text2: data
            });
        }
        dispatch(Credential({ prop: 'loading', value: false }))
        return success
    }

    React.useEffect(() => {
        if (validateEmail(email)) setEmailVerified(true)
        else setEmailVerified(false)
    }, [email])

    const pressedContinue = async () => {
        if (emailVerified) {
            const res = await VerifyEmailSignUp(email)
            if (res) navigation.navigate("PersonalInfo")
        }
    }

    const Phone = async () => {
        dispatch(Credential({ prop: 'authType', value: "phone" }))
        navigation.navigate("Phone", { screenType: "SignUp" })
    }

    const Apple = async () => {
        const user: any = await AppleLogin()
        dispatchData(user, "apple")
    }

    const Google = async () => {
        const user: any = await GoogleLogin()
        dispatchData(user, "google")
    }

    const Facebook = async () => {
        const user: any = await FacebookLogin()
        dispatchData(user, "facebook")
    }

    const dispatchData = async (user: User | null, type: string) => {
        const res = await VerifyEmailSignUp(user?.email)
        if (user && user !== null && res) {
            dispatch(Credential({ prop: 'email', value: user?.email || "" }))
            dispatch(Credential({ prop: 'firstName', value: user.firstName || "" }))
            dispatch(Credential({ prop: 'lastName', value: user.lastName || "" }))
            dispatch(Credential({ prop: 'photo', value: user.photo || "" }))
            dispatch(Credential({ prop: 'authType', value: type || "" }))
            dispatch(Credential({ prop: 'id', value: user.id || "" }))
            navigation.navigate('PersonalInfo')
        }
    }

    const ShowButtons = () => {
        if (loading) return <Spinner size={true} />
        else {
            return (
                <>
                    <GradientButton text={'Continue'} colors={emailVerified ? Colors.gradientButton : Colors.disabledButton}
                        onPress={() => pressedContinue()}
                    />

                    <View style={{ backgroundColor: Colors.gray, height: hp('0.2%'), marginVertical: hp('6%') }} />

                    <SocialButton text={'Continue with Phone'} imageName={ImagePath.phone} onPress={() => Phone()} />
                    <SocialButton text={'Continue with Google'} imageName={ImagePath.google} onPress={() => Google()} />
                    <SocialButton text={'Continue with Facebook'} imageName={ImagePath.fb} onPress={() => Facebook()} />
                    {IOS && <SocialButton text={'Continue with Apple'} imageName={ImagePath.apple} onPress={() => { }} />}
                </>
            )
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

            {ShowButtons()}
        </Container>
    )
}

export default SignUp