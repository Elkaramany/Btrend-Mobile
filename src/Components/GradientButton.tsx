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
        <TouchableOpacity onPress={() => onPress()} >
            <LinearGradient colors={colors || Colors.gradientButton}
                style={[GlobalStyles.buttonContainer, { justifyContent: 'center', alignItems: 'center', 
                borderRadius: wp('7%'), height: hp('6%') }, buttonContainerStyle]}
                start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('3%'), color: Colors.primary, fontWeight: '500' }, textStyle]}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton