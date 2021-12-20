import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePath, GlobalStyles, Colors } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText: string;
    imageName?: string;
    navigateMeBack: () => void;
}

const HeaderArrow: React.FC<Props> = ({ headerText, headerStyle, textStyle, imageName, navigateMeBack }) => {
    return (
        <TouchableOpacity
            onPress={() => navigateMeBack()}
            style={[styles.HeaderContainer, headerStyle]}>
            <Image source={imageName || ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            <Text style={[styles.TextStyle, textStyle]}>
                {headerText}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: hp('3%'),
        backgroundColor: 'transparent',
    },
    TextStyle: {
        fontSize: hp('5%'),
        fontWeight: 'bold',
        color: Colors.secondary,
        marginVertical: hp('5%')
    }
})

export default HeaderArrow;