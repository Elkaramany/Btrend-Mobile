import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors } from '../Config'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    mainStyle?: ViewStyle
}

const Container: React.FC<Props> = props => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={[props.mainStyle, { marginHorizontal: wp('3%') }]}>
                {props.children}
            </View>
        </View>
    )
}

export default Container