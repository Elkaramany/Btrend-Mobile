import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { Colors, GlobalStyles, ImagePath } from '../../Config'

import GradientButton from '../../Components/GradientButton'

interface Props {
    firstImg?: string
    secondImg?: string
    hasMatch: () => void
    navigation: StackNavigationProp<any, any>,
}

const Name: React.FC<Props> = ({ firstImg, secondImg, hasMatch, navigation }) => {

    const pressedMessage = () => {
        hasMatch()
        navigation.navigate("Chat")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => hasMatch()} style={{ alignSelf: 'flex-start', marginLeft: wp('5%'), bottom: hp('5%') }}>
                <Image
                    source={ImagePath.crossIcon}
                    style={styles.iconImg}
                />
            </TouchableOpacity>
            <View style={[GlobalStyles.rowBetween, { marginBottom: hp('10%'), width: wp('75%') }]}>
                <Image
                    source={ImagePath.profilePhoto}
                    style={styles.matchImg}
                />
                <Image
                    source={ImagePath.matchIcon}
                    style={styles.iconImg}
                />
                <Image
                    source={ImagePath.profilePhoto}
                    style={styles.matchImg}
                />
            </View>
            <Image
                source={ImagePath.matchedColored}
                style={{ height: hp('25%'), width: wp('90%') }}
            />
            <View style={[GlobalStyles.rowAround, { marginTop: hp('10%'), width: wp('95%') }]}>
                <TouchableOpacity onPress={() => hasMatch()}>
                    <Text style={[GlobalStyles.regularText, { color: Colors.primary, fontWeight: 'bold' }]}>Keep swiping</Text>
                </TouchableOpacity>
                <GradientButton text={'Message'} colors={Colors.gradientButton}
                    onPress={() => pressedMessage()} buttonContainerStyle={{ paddingHorizontal: wp('12%') }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    matchImg: {
        width: wp('30%'),
        height: wp('25%'),
        borderRadius: hp('2%')
    },
    iconImg: {
        width: wp('10%'),
        height: hp('4%')
    }
})

export default Name