import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath, handleSelection } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'
import AllSocials from '../../../Components/AllSocials'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const PhotosVideos: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { userType, companyPhotos } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {
        navigation.navigate("Location")
    }

    const handleImage = async (index: number) => {
        const image: string | null = await handleSelection()
        let arr = [...companyPhotos]
        arr[index] = image
        dispatch(Credential({ prop: 'companyPhotos', value: arr }))
    };

    const addPhoto = (photo: string | null, index: number) => {
        return (
            <TouchableOpacity style={styles.addProfile}
                onPress={() => handleImage(index)}
            >
                <Image source={photo && photo.length ? { uri: photo } : ImagePath.addPhoto} style={styles.imageStyle} />
            </TouchableOpacity>
        )
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <View style={GlobalStyles.rowBetween}>
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
            </View>
            <HeaderArrow headerText={"Connect\nSocial Accounts"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />

            <>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                    Connect your Social Media Account to see the Brand offers!
                </Text>
                <AllSocials />
            </>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                <GradientButton text={'Continue'} colors={Colors.gradientButton}
                    onPress={() => pressedContinue()} />
            </View>

        </Container >
    )
}

const styles = StyleSheet.create({
    addProfile: {
        marginBottom: hp('3%')
    }, imageStyle: {
        width: wp('40%'),
        height: wp('40%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    },
})

export default PhotosVideos