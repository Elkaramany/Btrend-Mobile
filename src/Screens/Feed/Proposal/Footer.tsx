import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { GlobalStyles, Colors } from '../../../Config'

import GradientButton from '../../../Components/GradientButton'
import GradientText from '../../../Components/GradientText'

interface Props {
    Submit: () => void
    Cancel: () => void
}

const Footer: React.FC<Props> = ({ Submit, Cancel }) => {
    const navigation = useNavigation()
    return (
        <View style={
            { position: 'absolute', bottom: 0, marginBottom: hp('3%'), width: '100%', backgroundColor: Colors.primary }}>
            <View style={[GlobalStyles.horizontalLine, { width: '150%', marginTop: 0, marginBottom: hp('2%') }]} />
            <View style={GlobalStyles.rowAround}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <GradientText style={{ fontWeight: 'bold', fontSize: hp('2.5%') }} end={{ x: 0.85, y: 0.35 }}>
                        Cancel
                    </GradientText>
                </TouchableOpacity>
                <GradientButton text={'Submit a proposal'} colors={Colors.gradientButton}
                    onPress={() => Submit()} buttonContainerStyle={{ width: wp('55%') }}
                />
            </View>
        </View>
    )
}


export default Footer