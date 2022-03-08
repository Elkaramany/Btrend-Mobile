import React from 'react'
import { Alert, StyleSheet, Text } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { TextInput } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles, validateEmail, validatePassword, ShowToast } from '../../../Config';
import { POST, PATCH } from '../../../Config/API';
import { USERS_URL } from '@env';

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
    const [codeSent, setCodeSent] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [secured, setSecured] = React.useState(true)
    const { email } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [newPassword, setNewPassword] = React.useState('')
    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 6 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const pressedContinue = async () => {
        setLoading(true)
        if (codeSent) {
            if (value.length === 4 && validatePassword(newPassword)) {
                const { success, data }: any = await PATCH(`${USERS_URL}/resetPassword`, { email, newPassword, verificationCode: value })
                if (success) {
                    Alert.alert(
                        "Your pass word has been reset successfully",
                        "Please sign in",
                        [
                            { text: "OK", onPress: () => navigation.navigate("SignIn") }
                        ]
                    );
                }
                else ShowToast("error", `Something went wrong`, data)
            }
        } else {
            if (validateEmail(email)) {
                const { success }: any = await POST(`${USERS_URL}/sendEmailVerification/${email}`)
                if (success) setCodeSent(true)
                else ShowToast("info", `If ${email} is registered with us`, "You'll find a verification code in your inbox")
            }
        }
        setLoading(false)
    }

    const showButton = () => {
        if (loading) return <Spinner size={true} />
        return (
            <GradientButton text={codeSent ? 'Reset password' : 'Send code'}
                colors={codeSent ? value.length === 4 && validatePassword(newPassword) ? Colors.gradientButton : Colors.disabledButton : validateEmail(email) ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedContinue()}
            />
        )
    }

    const showInputs = () => {
        if (codeSent) {
            return (
                <>
                    <Text style={[GlobalStyles.regularText, styles.subHeader]}>
                        Enter the verificatio code sent to{'\n'}
                        <Text style={[GlobalStyles.regularText, styles.subHeader, { color: Colors.brightRed }]}> {email} {'\n'}</Text>
                        alongside your new password below. {'\n'}
                        P.S. don't forget to check your junk box.
                    </Text>
                    <CodeField
                        ref={ref}
                        value={value}
                        onChangeText={setValue}
                        cellCount={4}
                        rootStyle={{ marginVertical: 30 }}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && { borderColor: '#000' }]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                    <Input
                        secureTextEntry={secured}
                        rightIcon={<TextInput.Icon name={secured ? "eye-off" : "eye"} color={Colors.gray} onPress={() => setSecured(!secured)} />}
                        label="Your new password"
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Text style={[GlobalStyles.regularText, styles.subHeader]}>
                        Please enter the email address associated with your account and you will receive a link that can reset your password
                    </Text>
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={text => dispatch(Credential({ prop: 'email', value: text }))}
                    />
                </>
            )
        }
    }

    return (
        <Container>
            <HeaderArrow headerText={'Reset Password'} navigateMeBack={() => navigation.goBack()} />
            {showInputs()}
            {showButton()}
        </Container>
    )
}

const styles = StyleSheet.create({
    subHeader: {
        marginBottom: hp('5%'),
        color: Colors.darkGray
    }, cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
})

export default Trouble