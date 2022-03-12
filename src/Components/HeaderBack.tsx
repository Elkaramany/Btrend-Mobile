import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View, ImageStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePath, GlobalStyles, Colors } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    imageStyle?: ImageStyle
    navigateMeBack: () => void;
}

const HeaderBack: React.FC<Props> = ({ headerText, headerStyle, textStyle, imageName, navigateMeBack, imageStyle }) => {

    return (
        <View style={[GlobalStyles.rowBetween, { alignSelf: 'center', width: '93%' }, headerStyle]}>
            <TouchableOpacity onPress={() => navigateMeBack()}>
                <Image source={imageName || ImagePath.leftArrow} style={[GlobalStyles.arrowImage, imageStyle]} />
            </TouchableOpacity>
            <Text style={[GlobalStyles.regularText, { fontWeight: '500' }, textStyle]}>
                {headerText}
            </Text>
            <View />
        </View>
    )
}
export default HeaderBack;