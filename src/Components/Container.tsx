import React from 'react'
import { View } from 'react-native'
import { Colors } from '../Config'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Container: React.FC = props => {
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={{ marginHorizontal: wp('3%') }}>
                {props.children}
            </View>
        </View>
    )
}

export default Container