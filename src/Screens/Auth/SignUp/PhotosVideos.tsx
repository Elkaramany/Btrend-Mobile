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
                    <AllSocials />
                </>
            ) : (
                <>
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                        Share your Brand products and services, increase your visibility
                        and find the perfect partnership!
                    </Text>
                    <View style={GlobalStyles.rowAround}>
                        {addPhoto(companyPhotos[0], 0)}
                        {addPhoto(companyPhotos[1], 1)}
                    </View>
                    <View style={GlobalStyles.rowAround}>
                        {addPhoto(companyPhotos[2], 2)}
                        {addPhoto(companyPhotos[3], 3)}
                    </View>
                </>
            )}


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