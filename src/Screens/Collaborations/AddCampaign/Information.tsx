import React from 'react'
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../../Config'
import { GoogleAutocomplete } from '../../../Config/Utils/Google';
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Suggestions from '../../../Components/Suggestions';
import Footer from './Footer'
import FollowersEngagement from '../../Search/FollowersEngagement'
import Input from '../../../Components/Input'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Locations: React.FC<Props> = ({ navigation }) => {
    const { locations, nof, engagementRate } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [text, setText] = React.useState('')
    const [googlePredictions, setGooglePredictions] = React.useState<string[]>([])
    const dispatch = useDispatch()

    React.useEffect(() => {
        async function fetchPlacesPredictions() {
            const predictions = await GoogleAutocomplete(text)
            setGooglePredictions(predictions)
        }
        fetchPlacesPredictions()
    }, [text])

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    const isVerified = () => {
        if (!locations.length || nof.length < 2 || !nof[0].length || !nof[1].length
            || engagementRate.length < 2 || !engagementRate[0].length || !engagementRate[1].length
        ) return false
        return true
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Some more information about the influencer"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />

            <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>Number of followers</Text>
            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                <Input
                    placeHolder=''
                    value={nof[0]}
                    onChangeText={(text) => dispatch(CampaignCredential({ prop: 'nof', value: [text, nof[1]] }))}
                    inputStyle={{ width: '45%', marginBottom: 0 }}
                />
                <View style={[GlobalStyles.horizontalLine,
                { width: '5%', backgroundColor: Colors.secondary }]} />
                <Input
                    placeHolder=''
                    value={nof[1]}
                    onChangeText={(text) => dispatch(CampaignCredential({ prop: 'nof', value: [nof[0], text] }))}
                    inputStyle={{ width: '45%', marginBottom: 0 }}
                />

            </View>

            <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>Engagement Rate</Text>
            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                <Input
                    label='%'
                    value={engagementRate[0]}
                    onChangeText={(text) => dispatch(CampaignCredential({ prop: 'engagementRate', value: [text, engagementRate[1]] }))}
                    inputStyle={{ width: '45%', marginBottom: 0 }}
                />
                <View style={[GlobalStyles.horizontalLine,
                { width: '5%', backgroundColor: Colors.secondary }]} />
                <Input
                    label='%'
                    value={engagementRate[1]}
                    onChangeText={(text) => dispatch(CampaignCredential({ prop: 'engagementRate', value: [engagementRate[0], text] }))}
                    inputStyle={{ width: '45%', marginBottom: 0 }}
                />

            </View>


            <Text style={[GlobalStyles.regularText, { fontWeight: '500', marginBottom: hp('2%') }]}>Locations</Text>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Input
                    placeHolder='Locations'
                    value={text}
                    onChangeText={(text) => setText(text)}
                    inputStyle={{ marginBottom: hp('1.5%') }}
                />

                <Suggestions text={text} deleteText={() => setText('')}
                    SuggestionsArr={googlePredictions} arr={locations}
                    setArr={(value) => dispatch(CampaignCredential({ prop: 'locations', value }))} />
            </ScrollView>

            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("ReferencePhotos")}
                verified={isVerified()}
                lineWidth={wp('8.75%') * 7}
            />
        </Container>
    )
}

export default Locations