import React from 'react'
import { View, Text } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, GlobalStyles } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'
import AllSocials from '../../../Components/AllSocials'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const ConnectSocial: React.FC<Props> = ({ navigation }) => {

    const pressedContinue = () => {
        //Add validation for the gradient button and this function to make sure the user connected at least one social account
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

export default ConnectSocial