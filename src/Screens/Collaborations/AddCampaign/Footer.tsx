import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Colors, GlobalStyles } from '../../../Config'
import GradientText from '../../../Components/GradientText'
import GradientButton from '../../../Components/GradientButton'

interface Props {
    verified: boolean
    backPress: () => void
    nextPress: () => void
    lineWidth: number
}

const Footer: React.FC<Props> = ({ verified, backPress, nextPress, lineWidth }) => {
    return (
        <View style={GlobalStyles.bottomContainer}>
            <View style={[GlobalStyles.redLine, { width: lineWidth }]} />
            <View style={[GlobalStyles.horizontalLine, { width: '120%', marginTop: 0 }]} />
            <View style={[GlobalStyles.rowBetween, { marginHorizontal: wp('2%') }]}>
                <TouchableOpacity onPress={() => backPress()}>
                    <GradientText
                        style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2.25%') }]}
                        end={{ x: 0.8, y: 0.35 }}>
                        Back
                    </GradientText>
                </TouchableOpacity>
                <GradientButton text={'Next'} colors={verified ? Colors.gradientButton : Colors.disabledButton}
                    onPress={() => verified ? nextPress() : {}} buttonContainerStyle={{ width: wp('55%') }}
                />
            </View>
        </View>
    )
}

export default Footer