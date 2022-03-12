import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles } from '../../../Config'

import HeaderBack from '../../../Components/HeaderBack'
import FixedPrice from './FixedPrice'
import Bid from './Bid'

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const SOCIAL_MEDIA = {
    instagram: null,
    tiktok: {
        feedvideo: { number: 2, price: 200 },
        livevideo: { number: 2, price: 200 },
    },
    snapchat: {
        snap: { number: 2, price: 200 },
        story: { number: 2, price: 200 },
        spotlight: { number: 2, price: 200 },
    },
    youtube: {
        video: { number: 2, price: 200 },
        live: { number: 2, price: 200 },
    }
}

const Proposal: React.FC<Props> = ({ navigation, route }) => {
    const { item } = route.params
    const [selectedStat, setSelectedStat] = React.useState("Fixed price")
    const [coverLetter, setCoverLetter] = React.useState("")
    const [socialMedia, setSocialMedia] = React.useState(SOCIAL_MEDIA)

    const OnSubmit = ()=>{
        if(coverLetter.length < 20){
            Alert.alert("Please add a cover letter of at least 20 words")
        }
    }

    const Stat = (stat: string) => {
        const sameStat = selectedStat === stat
        return (
            <TouchableOpacity
                onPress={() => setSelectedStat(stat)}
                style={[styles.categoryContainer, {
                    borderBottomColor: sameStat ? Colors.brightRed : 'transparent'
                }]}>
                <Text style={[GlobalStyles.regularText, {
                    fontWeight: sameStat ? '500' : '400',
                    color: sameStat ? Colors.secondary : Colors.darkGray,
                }]}>{stat}</Text>
            </TouchableOpacity>
        )
    }

    const SelectedStatScreen = () => {
        if (selectedStat === "Fixed price") return <FixedPrice
            coverLetter={coverLetter} setCoverLetter={setCoverLetter} />
        else if (selectedStat === "Bid") return <Bid
            socialMedia={socialMedia} setSocialMedia={setSocialMedia}
            coverLetter={coverLetter} setCoverLetter={setCoverLetter} />
        else return <View />
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
            <HeaderBack headerText='Submit' navigateMeBack={() => navigation.goBack()} />

            <View style={[GlobalStyles.horizontalLine, { width: '93%', marginTop: hp('4%') }]} />

            <View style={[GlobalStyles.rowAround, { marginTop: hp('3%') }]}>
                {Stat("Fixed price")}
                {Stat("Bid")}
            </View>

            <View style={[GlobalStyles.horizontalLine, { width: '150%', bottom: hp('1%') }]} />

            <View style={{ flex: 1, marginHorizontal: wp('4') }}>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.75%'), marginBottom: hp('1.5%') }]}>Client's Budget:</Text>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('3%') }]}>$12,000.000</Text>

                <View style={[GlobalStyles.graySeperator, { marginVertical: hp('3%') }]} />
                {SelectedStatScreen()}
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginRight: wp('12%'),
        borderBottomWidth: hp('0.2%'),
        paddingBottom: hp('1%'),
    }
})

export default Proposal