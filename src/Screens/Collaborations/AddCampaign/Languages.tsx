import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, LanguagesArr } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Suggestions from '../../../Components/Suggestions';
import Footer from './Footer'
import Input from '../../../Components/Input'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Languages: React.FC<Props> = ({ navigation }) => {
    const { languages } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [text, setText] = React.useState('')
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }
    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"What languages should \nthe influencer speak"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />

            <Input
                label={'Languages'}
                value={text}
                onChangeText={(text) => setText(text)}
            />

            <Suggestions text={text}
                deleteText={() => setText('')}
                SuggestionsArr={LanguagesArr}
                arr={languages}
                setArr={(value) => dispatch(CampaignCredential({ prop: 'languages', value }))} />

            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("CategoriesCampaign")}
                verified={languages.length} lineWidth={wp('8.75%') * 4}
            />
        </Container>
    )
}

export default Languages