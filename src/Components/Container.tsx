import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors } from '../Config'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    containerStyle?: ViewStyle
    mainStyle?: ViewStyle
    mainBgColor?: string
}

const Container: React.FC<Props> = ({ containerStyle, mainStyle, mainBgColor, children }) => {
    return (
        <View style={[{ flex: 1, backgroundColor: mainBgColor || Colors.primary }, containerStyle]}>
            <View style={[mainStyle, { marginHorizontal: wp('5%') }]}>
                {children}
            </View>
        </View>
    )
}

export default Container