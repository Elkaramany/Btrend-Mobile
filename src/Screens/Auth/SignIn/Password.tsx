import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential, SignIn } from '../../../Redux/Actions';
import { validatePassword, Colors } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Input from '../../../Components/Input'
import GradientButton from '../../../Components/GradientButton'
import { TextInput } from 'react-native-paper'
import Spinner from '../../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const Password: React.FC<Props> = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [passwordVerified, setPasswordVerified] = React.useState(false)
    const [secured, setSecured] = React.useState(true)
    const { email, password, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isSignUp = route.params.screenType === "signup"

    React.useEffect(() => {
        if (validatePassword(password)) setPasswordVerified(true)
        else setPasswordVerified(false)
    }, [password])

    const pressedContinue = () => {
        if (passwordVerified) {
            if (isSignUp) {
                dispatch(Credential({ prop: 'authType', value: "email" }))
                navigation.navigate("PersonalInfo")
            } else dispatch(SignIn({ authType: "email", email, password }))
        }
    }

    const showButton = () => {
        if (loading) return <Spinner size={false} />
        else return <GradientButton text={'Continue'} colors={passwordVerified ? Colors.gradientButton : Colors.disabledButton}
            onPress={() => pressedContinue()}
        />
    }

    return (
        <Container>
            <HeaderArrow headerText={isSignUp ? 'Sign Up' : 'Sign In'} navigateMeBack={() => navigation.goBack()} />
            <Input
                secureTextEntry={secured}
                label="Password"
                value={password}
                onChangeText={text => dispatch(Credential({ prop: 'password', value: text }))}
                rightIcon={<TextInput.Icon name={secured ? "eye-off" : "eye"} color={Colors.gray} onPress={() => setSecured(!secured)} />}
            />

            {showButton()}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Password