import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, handleSelection } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const CoverPhoto: React.FC<Props> = ({ navigation }) => {
    const { coverPhoto } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const dispatch = useDispatch()

    const handleImage = async () => {
        const image: string | null = await handleSelection()
        dispatch(CampaignCredential({ prop: 'coverPhoto', value: image }))
    };

    const renderCoverPhoto = () => {
        if (coverPhoto.length) {
            return (
                <View style={GlobalStyles.centeredContainer}>
                    <Image source={{ uri: coverPhoto }}
                        style={{ width: '95%', height: hp('30%'), resizeMode: 'cover', borderRadius: hp('5%') }} />
                </View>
            )
        }
    }

    const Cancel = () => {
        console.log('here')
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    return (
        <Container mainStyle={{flex: 1}}>
            <HeaderArrow headerText={"Let's add a cover photo for your campaign"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />
            <TouchableOpacity
                onPress={() => handleImage()}
                style={GlobalStyles.centeredContainer}>
                <Image source={ImagePath.uploadCoverPhoto}
                    style={{ width: '95%', height: hp('15%'), resizeMode: 'contain', marginBottom: hp('3%') }} />
            </TouchableOpacity>
            {renderCoverPhoto()}
            <Footer backPress={() => navigation.goBack()} nextPress={() => navigation.navigate("Title")}
                verified={coverPhoto.length} lineWidth={wp('9.5%')}
            />
        </Container>
    )
}

export default CoverPhoto