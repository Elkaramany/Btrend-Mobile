import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import GradientButton from '../../../Components/GradientButton';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Congrats: React.FC<Props> = ({ navigation }) => {

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity style={{ marginTop: hp('3%') }} onPress={() => navigation.goBack()}>
                <Image source={ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            </TouchableOpacity>

            <View style={{ marginBottom: hp('5%') }} />
            <Image source={ImagePath.ic_ready} style={styles.locationIcon} />
            <Text style={[GlobalStyles.regularText,
            { fontWeight: 'bold', textAlign: 'center', fontSize: hp('4%'), marginBottom: hp('2%') }]}>
                Congrats
            </Text>

            <Text style={[GlobalStyles.regularText,
            { textAlign: 'center', color: Colors.darkGray, fontSize: hp('2.5%') }]}>
                Your campaign has been{`\n`} successfully created
            </Text>
            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text={"Okay"} colors={Colors.gradientButton}
                    onPress={() => navigation.navigate("User")} buttonContainerStyle={{ width: wp('90%') }}
                />
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    locationIcon: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: wp('50%'),
        height: wp('90%'),

    },
})

export default Congrats