import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import GradientButton from '../../../Components/GradientButton'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Submitted: React.FC<Props> = ({ navigation }) => {

    const goBack = () => navigation.navigate("Feed")

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity style={{ marginTop: hp('3%') }} onPress={goBack}>
                <Image source={ImagePath.ic_cross} style={GlobalStyles.arrowImage} />
            </TouchableOpacity>
            <View style={{ marginBottom: hp('2%') }} />
            <Image source={ImagePath.ic_ready} style={styles.locationIcon} />

            <View style={GlobalStyles.centeredContainer}>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('4%'), fontWeight: '500', marginBottom: hp('4%') }]}>
                    Submission{`\n`}Succeded
                </Text>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, textAlign: 'center' }]}>
                    The brand will reach out to you after{`\n`}reviewing your proposal
                </Text>
            </View>
            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text={'Thanks'} colors={Colors.gradientButton}
                    onPress={goBack}
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

export default Submitted