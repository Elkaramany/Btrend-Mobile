import React from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GlobalStyles } from '../Config'

interface Props {
    text: string
    imageName: string | any
    onPress: () => void
}

const SocialButton: React.FC<Props> = ({ text, imageName, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={[GlobalStyles.buttonContainer, styles.container]}>
            <Image source={imageName} style={GlobalStyles.arrowImage} />
            <Text style={[GlobalStyles.regularText, { left: wp('18%') }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('0.75%')
    },
})

export default SocialButton