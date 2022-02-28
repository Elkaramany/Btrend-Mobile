import React from 'react'
import { ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../Config'


const textInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.inputGray, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.primary
    }, roundness: hp('5%')
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
    numLines?: number
    dense?: boolean
    onSubmitEditing?: () => void
    theme?: any
}

const Input: React.FC<Props> = ({ inputStyle, label, value, onChangeText = (text) => { },
    secureTextEntry, rightIcon, leftIcon, type, numLines, dense, onSubmitEditing, theme }) => {
    return (
        <TextInput
            dense={dense || false}
            numberOfLines={numLines || 1}
            right={rightIcon ? rightIcon : null}
            left={leftIcon ? leftIcon : null}
            secureTextEntry={secureTextEntry || false}
            mode="outlined"
            multiline={false}
            style={[{ marginBottom: hp('3.5%'), height: hp('6%') }, inputStyle]}
            label={label}
            value={value.toString()}
            onChangeText={text => onChangeText(text)}
            theme={theme || textInputTheme}
            keyboardType={type ? type : "default"}
            onSubmitEditing={onSubmitEditing}
        />
    )
}

export default Input