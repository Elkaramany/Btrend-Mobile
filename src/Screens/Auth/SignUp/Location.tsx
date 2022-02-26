import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';
import GetLocation from 'react-native-get-location'

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Location: React.FC<Props> = ({ navigation }) => {
    const { location } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const dispatch = useDispatch()

    const getUserLocation = async () => {
        const loc = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        const userLocation = { lat: loc.latitude, lng: loc.longitude }
        dispatch(Credential({ prop: 'location', value: userLocation }))
        navigation.navigate("Ready")
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Enable location"} navigateMeBack={() => navigation.goBack()} onSkip={() => navigation.navigate("Ready")} />
            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>
                You'll need to enable your location in order to use BTrend
            </Text>
            
            <Image source={ImagePath.ic_location} style={styles.locationIcon} />

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                <GradientButton text={'Allow location'} colors={Colors.gradientButton}
                    onPress={() => getUserLocation()} />
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    locationIcon: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: wp('60%'),
        height: wp('90%'),
    }
})

export default Location