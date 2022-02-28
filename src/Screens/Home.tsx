import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GlobalStyles, Colors, ImagePath } from '../Config'
import { Credential } from '../Redux/Actions';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../Components/Container'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()

    const navigateToSignIn = (type: string) => {
        dispatch(Credential({ prop: 'userType', value: type }))
        navigation.navigate("SignIn")
    }

    return (
        <Container>

            <Text style={[GlobalStyles.regularText, { fontSize: hp('4.5%'), fontFamily: 'Outfit-Bold' }, styles.headerStyle]}>Let's get started</Text>
            <Text style={[GlobalStyles.regularText, {
                color:
                    Colors.tertiary, marginTop: hp('1.5%'),
                marginBottom: hp('4%'), fontSize: hp('2.5%')
            }]}>Select your account type</Text>


            <TouchableOpacity
                onPress={() => navigateToSignIn("Influencer")}
                style={styles.cardStyle}>
                <Image source={ImagePath.profilePicture} style={styles.cardImg} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigateToSignIn("Brand")}
                style={styles.cardStyle}>
                <Image source={ImagePath.brand} style={styles.cardImg} />
            </TouchableOpacity>
        </Container>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: hp('10%'),
        alignItems: 'flex-start',
    }, cardStyle: {
        marginVertical: hp('1.5%'),
        alignSelf: 'center',
    }, cardImg: {
        width: wp('90%'),
        height: hp('25%'),
        resizeMode: 'contain',
        borderRadius: hp('4%'),
    },
})

export default Home