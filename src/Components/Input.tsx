import React from 'react'
import { ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Colors, ImagePath } from '../Config'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const textInputTheme = {
    colors: {
        placeholder: Colors.secondary, text: Colors.tertiary, primary: Colors.secondary,
        underlineColor: Colors.secondary, background: Colors.primary
    }, roundness: hp('1.75%')
}

interface Props {
    multiline?: boolean
    inputStyle?: ViewStyle
    label: string
    value: string | number
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    rightIcon?: any
    leftIcon?: any
    type?: any
}

const Input: React.FC<Props> = ({ inputStyle, label, value, onChangeText = (text) => { },
    secureTextEntry, rightIcon, leftIcon, type }) => {
    return (
        <TextInput
            right={rightIcon ? rightIcon : null}
            left={leftIcon ? leftIcon : null}
            secureTextEntry={secureTextEntry || false}
            mode="outlined"
            multiline={false}
            style={[{ marginBottom: hp('3.5%') }, inputStyle]}
            label={label}
            value={value.toString()}
            onChangeText={text => onChangeText(text)}
            theme={textInputTheme}
            keyboardType={type ? type : "default"}
        />
    )
}

export default Input