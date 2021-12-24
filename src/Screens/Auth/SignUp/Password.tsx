import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { validatePassword, Colors } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Input from '../.././../Components/Input'
import GradientButton from '../../../Components/GradientButton'
import { TextInput } from 'react-native-paper'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Password: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [passwordVerified, setPasswordVerified] = React.useState(false)
    const [secured, setSecured] = React.useState(true)
    const { password } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    React.useEffect(() => {
        if (validatePassword(password)) setPasswordVerified(true)
        else setPasswordVerified(false)
    }, [password])

    const pressedContinue = () => {
        if (passwordVerified) {
            dispatch(Credential({ prop: 'authType', value: "email" }))
            navigation.navigate("PersonalInfo")
        }
    }

    return (
        <Container>
            <HeaderArrow headerText={'Sign Up'} navigateMeBack={() => navigation.goBack()} />
            <Input
                secureTextEntry={secured}
                label="Password"
                value={password}
                onChangeText={text => dispatch(Credential({ prop: 'password', value: text }))}
                rightIcon={<TextInput.Icon name={secured ? "eye-off" : "eye"} color={Colors.gray} onPress={() => setSecured(!secured)} />}
            />

            <GradientButton text={'Continue'} colors={passwordVerified ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedContinue()}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Password