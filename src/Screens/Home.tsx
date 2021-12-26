import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GlobalStyles, Colors, ImagePath } from '../Config'
import { Credential } from '../Redux/Actions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../Components/Container'
import Header from '../Components/Header'
import Spinner from '../Components/Spinner'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Home: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const user = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [loading, setLoading] = React.useState(true)

    const navigateToSignIn = (type: string) => {
        dispatch(Credential({ prop: 'userType', value: type }))
        navigation.navigate("SignIn")
    }

    React.useEffect(() => {
        setLoading(true)
        //User signed in
        if (token) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'User' }]
            })
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [token])

    const showHome = () => {
        if (loading) {
            <Container mainStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                <Spinner size={false} />
            </Container>
        } else {
            return (
                <Container>
                    <View style={styles.headerStyle}>
                        <Header headerText={"Let's get \nstarted"} />
                    </View>
                    <Text style={[GlobalStyles.regularText, { color: Colors.tertiary }]}>Select your account type</Text>

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
                </Container>
            )
        }
    }

    return <>{showHome()}</>
}

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: hp('10%'),
        alignItems: 'flex-start',
    }, cardStyle: {
        justifyContent: 'space-around',
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