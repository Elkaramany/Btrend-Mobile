import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, Touchable, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Colors, GlobalStyles, ImagePath } from '../../../Config'

import Container from '../../../Components/Container'
import GradientButton from '../../../Components/GradientButton'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Index: React.FC<Props> = ({ navigation }) => {
    return (

        <ImageBackground source={ImagePath.addCampaignBackground} style={{ flex: 1 }}>
            <Container mainStyle={{ flex: 1 }} containerStyle={{ backgroundColor: 'transparent' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Image source={ImagePath.whiteCross} style={[GlobalStyles.arrowImage, { marginTop: hp('5%') }]} />
                </TouchableOpacity>
                <View style={{ height: hp('44%') }} />
                <Text
                    style={[GlobalStyles.regularText,
                    { color: Colors.primary, fontSize: hp('4.5%'), fontWeight: '500', marginBottom: hp('2%') }]}>
                    Create a campaign {'\n'}in a few easy steps
                </Text>
                <Text style={[GlobalStyles.regularText, { color: Colors.primary, fontSize: hp('1.75%') }]}>
                    It will only take a few minutes to fill out {'\n'}and your campaign will be published right away
                </Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                    <GradientButton text={"Let's Start"} colors={Colors.gradientButton}
                        onPress={() => { }}
                    />
                </View>
            </Container>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

export default Index