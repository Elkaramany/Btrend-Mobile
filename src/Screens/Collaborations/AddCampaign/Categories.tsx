import React from 'react'
import { View, Image, Text } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { Colors, GlobalStyles, ImagePath, LanguagesArr } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Suggestions from '../../../Components/Suggestions';
import Footer from './Footer'
import Input from '../../../Components/Input'
import AllCategories from '../../../Components/AllCategories';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Cateogires: React.FC<Props> = ({ navigation }) => {
    const { categories } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [text, setText] = React.useState('')
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }
    //text, deleteText, SuggestionsArr, arr, setArr

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"What cateogires would you like to add"}
                navigateMeBack={() => Cancel()}
                textStyle={{ fontWeight: '500', fontSize: hp('3.5%'), marginBottom: hp('2.5%') }}
                imageName={ImagePath.blackCross} />

            <Text style={[GlobalStyles.regularText, { marginBottom: hp('2.5%'), color: Colors.darkGray }]}>
                Add up to <Text style={{ fontWeight: 'bold', color: Colors.secondary }}>5 categories</Text>
            </Text>

            <AllCategories arr={categories} setArr={value => dispatch(CampaignCredential({ prop: 'categories', value }))} />

            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("Tags")}
                verified={categories.length} lineWidth={wp('8.75%') * 5}
            />
        </Container>
    )
}

export default Cateogires