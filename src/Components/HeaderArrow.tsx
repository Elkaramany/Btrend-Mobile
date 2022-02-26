import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePath, GlobalStyles, Colors } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    navigateMeBack: () => void;
    onSkip?: () => void
}

const HeaderArrow: React.FC<Props> = ({ headerText, headerStyle, textStyle, imageName, navigateMeBack, onSkip }) => {
    const headerButtons = () => {
        if (onSkip) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigateMeBack()}>
                        <Image source={imageName || ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSkip()}>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => navigateMeBack()}>
                <Image source={imageName || ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            </TouchableOpacity >
        )
    }

    return (
        <View
            style={[styles.HeaderContainer, headerStyle]}>
            {headerButtons()}
            <Text style={[styles.TextStyle, textStyle]}>
                {headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: hp('3%'),
        backgroundColor: 'transparent',
    },
    TextStyle: {
        fontSize: hp('4%'),
        fontWeight: 'bold',
        color: Colors.secondary,
        marginVertical: hp('5%'),
        fontFamily: "Outfit-Regular"
    }
})

export default HeaderArrow;