import React from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../Config'


const textInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.secondary, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.primary
    }, roundness: hp('5%')
}

interface Props {
    multiline?: boolean
    inputStyle?: ViewStyle | TextStyle
    label?: string
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
    placeHolder?: string
    maxLength?: number
}

const Input: React.FC<Props> = ({ inputStyle, label, value, onChangeText = (text) => { },
    secureTextEntry, rightIcon, leftIcon, type, numLines, dense,
    multiline, onSubmitEditing, theme, placeHolder, maxLength }) => {
    return (
        <TextInput
            dense={dense || false}
            numberOfLines={numLines || 1}
            right={rightIcon ? rightIcon : null}
            left={leftIcon ? leftIcon : null}
            secureTextEntry={secureTextEntry || false}
            mode="outlined"
            multiline={multiline || false}
            style={[{ marginBottom: hp('3%'), height: hp('5.5%'), borderWidth: 0 }, inputStyle]}
            label={label || ''}
            placeholder={placeHolder || ''}
            value={value.toString() || ''}
            onChangeText={text => onChangeText(text)}
            theme={theme || textInputTheme}
            keyboardType={type ? type : "default"}
            onSubmitEditing={onSubmitEditing}
            maxLength={maxLength || 100}
        />
    )
}

export default Input