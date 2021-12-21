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
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? Colors.blue : "#FFFFFF"
            }} />
            <Text style={[GlobalStyles.regularText, { marginLeft: wp('2%') }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default RadioBtn