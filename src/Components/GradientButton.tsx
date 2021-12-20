import React from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Touchable } from 'react-native'
import { Colors, GlobalStyles, WIDTH } from '../Config'
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    buttonContainerStyle?: ViewStyle
    textStyle?: TextStyle
    text: string
    onPress: () => void
    colors?: string[]
}

const GradientButton: React.FC<Props> = ({ buttonContainerStyle, textStyle, text, onPress, colors }) => {
    return (
        <LinearGradient colors={colors || Colors.gradientButton}
            style={[GlobalStyles.buttonContainer, { justifyContent: 'center', alignItems: 'center' }, buttonContainerStyle]}
            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('3%'), color: Colors.primary }, textStyle]}>{text}</Text>
            </TouchableOpacity>

        </LinearGradient>
    )
}

export default GradientButton