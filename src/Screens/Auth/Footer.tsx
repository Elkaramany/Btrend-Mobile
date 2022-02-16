import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useSelector, RootStateOrAny } from 'react-redux';
import { Colors, GlobalStyles } from '../../Config';

interface Props {
    title: string,
    text: string
    routing: () => void
}

const Footer: React.FC<Props> = ({ title, text, routing }) => {

    const { loading } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    return (
        <TouchableOpacity style={styles.signUpButton}
            onPress={() => loading ? {} : routing()}
        >
            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>{title}</Text>
            <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%'), fontWeight: '500', color: Colors.brightRed }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    signUpButton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        marginBottom: hp('3%'),
        paddingTop: hp('2%')
    },
})

export default Footer