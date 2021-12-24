import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message'

import { ImagePath, validateEmail, Colors, GlobalStyles, IOS } from '../../../Config';
import { GET } from '../../../Config/API';
import { USERS_URL } from '@env';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Credential, SignIn } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../../Components/Container';
import HeaderArrow from '../../../Components/HeaderArrow';
import GradientButton from '../../../Components/GradientButton';
import SocialButton from '../../../Components/SocialButton'
import Input from '../../../Components/Input'

import GoogleLogin from '../../../Config/Utils/Google'
import FacebookLogin from '../../../Config/Utils/Facebook'
import AppleLogin from '../../../Config/Utils/Apple'
import Spinner from '../../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [emailVerified, setEmailVerified] = React.useState(false)
    const { email, token, error, authType, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    React.useEffect(() => {
        if (validateEmail(email)) setEmailVerified(true)
        else setEmailVerified(false)
    }, [email])

    React.useEffect(() => {
        //User signed in
        if (token) navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }, [token])

    React.useEffect(() => {
        if (error && error.length) {
            showToastMessage(error)
        }
    }, [error])

    const showToastMessage = (message: string) => {
        Toast.show({
            type: 'error',
            text1: `Error signing in with ${authType || "email"}`,
            text2: message,
        });
    }


    const pressedContinue = async () => {
        if (emailVerified) {
            dispatch(Credential({ prop: 'loading', value: true }))
            const { success, data }: any = await GET(`${USERS_URL}/verifyEmailSignIn/${email}`)
            dispatch(Credential({ prop: 'loading', value: false }))
            if (success) navigation.navigate('Password')
            else showToastMessage(data)
        }
    }

    const Phone = async () => {
        navigation.navigate("Phone", { screenType: "SignIn" })
        dispatch(Credential({ prop: 'authType', value: "phone" }))
    }

    const Apple = async () => {
        const { id }: any = await AppleLogin()
        dispatch(SignIn({ authType: "apple", id }))
    }

    const Google = async () => {
        const { id }: any = await GoogleLogin()
        dispatch(SignIn({ authType: "google", id }))
    }

    const Facebook = async () => {
        const { id }: any = await FacebookLogin()
        dispatch(SignIn({ authType: "facebook", id }))
    }

    const showButtons = () => {
        if (loading) return <Spinner size={false} />
        else {
            return (
                <>
                    <GradientButton text={'Continue'} colors={emailVerified ? Colors.gradientButton : Colors.disabledButton}
                        onPress={() => pressedContinue()}
                    />

                    <View style={{ backgroundColor: Colors.gray, height: hp('0.2%'), marginVertical: hp('4%') }} />

                    <SocialButton text={'Continue with Phone'} imageName={ImagePath.phone} onPress={() => Phone()} />
                    <SocialButton text={'Continue with Google'} imageName={ImagePath.google} onPress={() => Google()} />
                    <SocialButton text={'Continue with Facebook'} imageName={ImagePath.fb} onPress={() => Facebook()} />
                    {IOS && <SocialButton text={'Continue with Apple'} imageName={ImagePath.apple} onPress={() => Apple()} />}
                </>
            )
        }
    }

    return (
        <>
            <Container>
                <HeaderArrow headerText={'Sign In'} navigateMeBack={() => navigation.navigate("Home")} />
                <Input
                    label="Email"
                    value={email}
                    onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
                />

                {showButtons()}
            </Container>
            <TouchableOpacity style={styles.signUpButton}
                onPress={() => loading ? {} : navigation.navigate("EmailSignUp")}
            >
                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>Need an accout?</Text>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%'), fontWeight: '500' }]}>Sign up</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    signUpButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        marginBottom: hp('3%'),
        paddingTop: hp('2%')
    },
})

export default Home