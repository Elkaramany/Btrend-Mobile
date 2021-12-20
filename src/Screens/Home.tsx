import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../Components/Header'
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
            <View style={styles.headerStyle}>
                <Header headerText={"Let's get \nstarted"} />
            </View>
            <Text style={[GlobalStyles.regularText, { color: Colors.tertiary, left: wp('3%') }]}>Select your account type</Text>

            <TouchableOpacity
                onPress={() => navigateToSignIn("Influencer")}
                style={styles.cardStyle}>
                <Image source={ImagePath.profilePicture} style={styles.cardImg} />
                <Header headerText={"I am an \nInfluencer"} textStyle={{ fontSize: hp('3.5%') }}
                    headerStyle={{ justifyContent: 'center' }} />
                <Image source={ImagePath.rightArrow} style={[GlobalStyles.arrowImage, styles.arrowStyle]} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigateToSignIn("Brand")}
                style={styles.cardStyle}>
                <Image source={ImagePath.brand} style={styles.cardImg} />
                <Header headerText={"I am a \nBrand"} headerStyle={{ justifyContent: 'center' }}
                    textStyle={{ fontSize: hp('3.5%') }} />
                <Image source={ImagePath.rightArrow} style={[GlobalStyles.arrowImage, styles.arrowStyle]} />
            </TouchableOpacity>
        </Container >
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: hp('10%'),
        alignItems: 'flex-start',
    }, cardStyle: {
        justifyContent: 'space-around',
        marginLeft: wp('3%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.gray,
        borderRadius: wp('10%'),
        marginVertical: hp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center'
    }, cardImg: {
        width: wp('35%'),
        height: wp('35%'),
        resizeMode: 'contain'
    }, arrowStyle: {
        alignSelf: 'flex-end',
        marginBottom: hp('2.5%'),
        marginRight: wp('2%')
    }
})

export default Home