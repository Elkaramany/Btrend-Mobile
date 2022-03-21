import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors, handleSelection } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const ReferencePhotos: React.FC<Props> = ({ navigation }) => {
    const { referencePhotos } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    const handleImage = async (index: number) => {
        if (index > 2) return;
        const image: string | null = await handleSelection()
        dispatch(CampaignCredential({ prop: 'referencePhotos', value: [...referencePhotos, image] }))
    };

    const RemoveImgIndex = (ref: string) => {
        const value = referencePhotos.filter((photo: string) => photo !== ref)
        dispatch(CampaignCredential({ prop: 'referencePhotos', value }))
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Now time for reference photos"}
                navigateMeBack={() => Cancel()}
                textStyle={{ fontWeight: '500', fontSize: hp('3.5%'), marginBottom: hp('2.5%') }}
                imageName={ImagePath.blackCross} />

            <Text style={[GlobalStyles.regularText, { marginBottom: hp('2.5%'), color: Colors.darkGray }]}>
                Add up to <Text style={{ fontWeight: 'bold', color: Colors.secondary }}>3 reference photos</Text>
            </Text>

            <TouchableOpacity
                onPress={() => handleImage(referencePhotos.length)}
                style={GlobalStyles.centeredContainer}>
                <Image source={ImagePath.uploadCoverPhoto}
                    style={{ width: '95%', height: hp('15%'), resizeMode: 'contain', marginBottom: hp('3%') }} />
            </TouchableOpacity>

            <View style={GlobalStyles.rowWrap}>
                {referencePhotos.map((photo: string, index: number) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: photo }} style={styles.refImg} />
                            <TouchableOpacity
                                onPress={() => RemoveImgIndex(photo)}
                                style={styles.crossImg}>
                                <Image
                                    source={ImagePath.ic_crosss}
                                    style={GlobalStyles.arrowImage}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>


            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("Payment")}
                verified={referencePhotos.length}
                lineWidth={wp('8.75%') * 8}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    refImg: {
        width: wp('38%'),
        height: wp('35%'),
        resizeMode: 'cover',
        marginBottom: hp('2%'),
        borderRadius: wp('5%'),
    }, crossImg: {
        top: hp('2%'),
        right: wp('10%'),
        alignSelf: 'flex-start'
    }
})

export default ReferencePhotos