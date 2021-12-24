import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUp } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import Header from '../../../Components/Header'
import Spinner from '../../../Components/Spinner';

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
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkRed, marginRight: wp('5%') }]}>Start tutorial</Text>
                    <Image source={ImagePath.rightArrowGray} style={GlobalStyles.arrowImage} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            </TouchableOpacity>
            <View style={{ marginBottom: hp('6%') }} />
            <Image source={ImagePath.ic_ready} style={styles.locationIcon} />
            <View style={styles.userTypeContainer}>
                <Text style={[GlobalStyles.regularText, { color: Colors.primary, fontSize: hp('3%') }]}>{user.userType}</Text>
            </View>
            <Header headerText={"You're ready!"} textStyle={{ fontSize: hp('5%') }}
                headerStyle={{ justifyContent: 'center', height: hp('15%') }} />
            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Everything you need to know</Text>
            {showButton()}
        </Container >
    )
}

const styles = StyleSheet.create({
    locationIcon: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: wp('70%'),
        height: wp('100%'),
    },
    userTypeContainer: {
        backgroundColor: "#FF9500",
        paddingVertical: hp('0.3%'),
        paddingHorizontal: wp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('35%'),
        borderRadius: wp('3%')
    }, tutorialStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: hp('5%'),
        marginRight: wp('5%'),
    }
})

export default Ready