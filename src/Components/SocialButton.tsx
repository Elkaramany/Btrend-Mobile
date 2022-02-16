import React from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GlobalStyles, Colors } from '../Config'

interface Props {
    imageName: string | any
    onPress: () => void
}

const SocialButton: React.FC<Props> = ({ imageName, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={styles.container}>
            <Image source={imageName} style={GlobalStyles.arrowImage} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: hp('0.75%'),
        borderWidth: wp('0.25%'),
        padding: wp('5%'),
        borderColor: Colors.darkGray,
        borderRadius: wp('100%'),
    },
})

export default SocialButton