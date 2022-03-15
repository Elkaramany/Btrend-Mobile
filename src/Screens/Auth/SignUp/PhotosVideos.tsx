import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, GlobalStyles } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'
import AllSocials from '../../../Components/AllSocials'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const PhotosVideos: React.FC<Props> = ({ navigation }) => {

    const pressedContinue = () => {
        navigation.navigate("Location")
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <View style={GlobalStyles.rowBetween}>
                <View style={GlobalStyles.redLine} />
                <View style={GlobalStyles.redLine} />
                <View style={GlobalStyles.redLine} />
            </View>
            <HeaderArrow headerText={"Connect\nSocial Accounts"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />

            <>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                    Connect your Social Media Account to see the Brand offers.
                </Text>
                <AllSocials />
            </>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text={'Continue'} colors={Colors.gradientButton}
                    onPress={() => pressedContinue()} />
            </View>

        </Container >
    )
}

const styles = StyleSheet.create({
    addProfile: {
        marginBottom: hp('3%')
    }, imageStyle: {
        width: wp('40%'),
        height: wp('40%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    },
})

export default PhotosVideos