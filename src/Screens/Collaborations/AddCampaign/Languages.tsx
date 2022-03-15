import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Languages: React.FC<Props> = ({ navigation }) => {
    const { languages } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const dispatch = useDispatch()

    const Cancel = () => {
        console.log('here')
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    return (
        <Container mainStyle={{flex: 1}}>
            <HeaderArrow headerText={"What languages should \nthe influencer speak"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />

            <Footer backPress={() => navigation.goBack()} nextPress={() => navigation.navigate("Title")}
                verified={languages.length} lineWidth={wp('9.5%') * 4}
            />
        </Container>
    )
}

export default Languages