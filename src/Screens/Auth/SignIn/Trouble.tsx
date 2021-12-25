import React from 'react'
import { StyleSheet } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Credential } from '../../../Redux/Actions';
import { Colors, validateEmail } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Input from '../../../Components/Input'
import GradientButton from '../../../Components/GradientButton';
import Spinner from '../../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const Trouble: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { email, loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {

    }

    const showButton = () => {
        if (loading) return <Spinner size={true} />
        return (
            <GradientButton text={'Reset password'} colors={validateEmail(email) ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedContinue()}
            />
        )
    }

    return (
        <Container>
            <HeaderArrow headerText={'Trouble signing in'} navigateMeBack={() => navigation.navigate("Home")} />
            <Input
                label="Enter your email address"
                value={email}
                onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
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

export default Trouble