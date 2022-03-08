import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUp } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import Header from '../../../Components/Header'
import Spinner from '../../../Components/Spinner';
import GradientText from '../../../Components/GradientText';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Ready: React.FC<Props> = ({ navigation }) => {
    const user = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const dispatch = useDispatch()

    const showButton = () => {
        if (user.loading) return <Spinner size={false} />
        else {
            return (
                <TouchableOpacity
                    onPress={() => dispatch(SignUp(user))}
                    style={styles.tutorialStyle}>
                    <GradientText style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2.25%') }]} end={{ x: 0.35, y: 0.35 }}>Start tutorial</GradientText>
                    <Image source={ImagePath.gradientRightArrow} style={[GlobalStyles.arrowImage, { marginLeft: wp('5%') }]} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity style={{ marginTop: hp('3%') }} onPress={() => navigation.goBack()}>
                <Image source={ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            </TouchableOpacity>
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ marginBottom: hp('6%') }} />
                <Image source={ImagePath.ic_ready} style={styles.locationIcon} />
                <View style={[styles.userTypeContainer, {
                    backgroundColor: user.userType === "Brand" ? "#5286ff" : "#FF9500"
                }]}>
                    <Text style={[GlobalStyles.regularText, { color: Colors.primary, fontSize: hp('2.5%') }]}>{user.userType}</Text>
                </View>
                <Header headerText={"You're ready!"} textStyle={{ fontSize: hp('5%') }}
                    headerStyle={{ justifyContent: 'center', height: hp('10%') }} />
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Everything you need to know</Text>

                {showButton()}
            </ScrollView>
        </Container >
    )
}

const styles = StyleSheet.create({
    locationIcon: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: wp('50%'),
        height: wp('90%'),
        marginBottom: hp('6%')
    },
    userTypeContainer: {
        paddingVertical: hp('0.3%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('28%'),
        borderRadius: wp('3%')
    }, tutorialStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: hp('5%'),
        marginTop: hp('5%')
    }
})

export default Ready