import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { GlobalStyles, Colors } from '../Config'

interface Props {
    onPress: () => void
    selected: boolean
    text: string
}

const RadioBtn: React.FC<Props> = ({ onPress = () => { }, selected, text }) => {
    return (
        <TouchableOpacity style={GlobalStyles.rowCenter} onPress={() => onPress()}>
            <View style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: Colors.secondary,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <View style={{ padding: wp('1%'), width: 12, height: 12, borderRadius: 10, backgroundColor: selected ? Colors.secondary : Colors.primary, }} />
            </View>
            <Text style={[GlobalStyles.regularText, { marginLeft: wp('2%') }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default RadioBtn