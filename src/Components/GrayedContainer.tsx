import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { GlobalStyles, Colors } from '../Config'

interface Props {
    header: string
    title: string
    visible?: boolean
}

const Name: React.FC<Props> = props => {
    return (
        <View style={styles.container}>
            <Text style={[GlobalStyles.regularText, { fontWeight: '700', fontStyle: props.visible ? "italic" : 'normal' }]}>
                {props.header}
            </Text>
            <Text style={[GlobalStyles.regularText, { fontWeight: '300', fontStyle: props.visible ? "italic" : 'normal' }]}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightGray,
        padding: hp('1.5%'),
        borderRadius: hp('1.5%'),
        marginHorizontal: wp('2%'),
        marginVertical: hp('0.5%')
    },
})

export default Name