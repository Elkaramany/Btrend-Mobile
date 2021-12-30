import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

import { useSelector, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'
import AllSocials from '../../../Components/AllSocials'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const PhotosVideos: React.FC<Props> = ({ navigation }) => {
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {
        navigation.navigate("Location")
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <ProgressBar progress={0.75} color={'red'} />
            <HeaderArrow headerText={"Add Photos & Videos"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />

            {userType == "Influencer" ? (
                <>
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                        Show us the fabulous you to get the Brands to know you better!
                    </Text>
                    <Text style={GlobalStyles.regularText}>
                        Please  connect at least one of your social media accounts to start using Btrend.
                    </Text>
                </>
            ) : (
                <>
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                        Share your Brand products and service, increase your visibility
                        and find the perfect partnership!
                    </Text>
                    <Text style={GlobalStyles.regularText}>
                        Please  connect at least one of your social media accounts to start using Btrend.
                    </Text>
                </>
            )}

            <AllSocials />

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                <GradientButton text={'Continue'} colors={Colors.gradientButton}
                    onPress={() => pressedContinue()} />
            </View>

        </Container >
    )
}

export default PhotosVideos