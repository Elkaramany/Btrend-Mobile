import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, GlobalStyles } from '../../../Config'
import { SubmitProposal } from '../../../Redux/Actions/CampaignActions';

import HeaderBack from '../../../Components/HeaderBack'
import FixedPrice from './FixedPrice'
import Bid from './Bid'

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}

const Proposal: React.FC<Props> = ({ navigation, route }) => {
    const { item, budget, id } = route.params
    const { token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [selectedStat, setSelectedStat] = React.useState("Fixed price")
    const [coverLetter, setCoverLetter] = React.useState("")
    const [socialMedia, setSocialMedia] = React.useState(item)
    const [price, setPrice] = React.useState(budget)
    const dispatch = useDispatch()

    React.useEffect(() => {
        let newPrice = 0
        Object.getOwnPropertyNames(socialMedia).map((parent) => {
            Object.values(socialMedia[`${parent}`]).map((child: any) => {
                newPrice += (parseInt(child.number) * parseInt(child.price))
            })
        })
        setPrice(newPrice)
    }, [socialMedia])

    const OnSubmit = () => {
        let flag = true
        if (coverLetter.length < 10) {
            Alert.alert("Please add a cover letter of at least 10 words")
            return;
        }

        Object.getOwnPropertyNames(socialMedia).map((parent) => {
            Object.values(socialMedia[`${parent}`]).map((child: any) => {
                if (child.price.length == 0) {
                    Alert.alert(`Please fill all the price fields of ${parent}`)
                    flag = false
                }
            })
        })
        if (flag) {
            dispatch(SubmitProposal({
                type: selectedStat, socialMedia: selectedStat === "Bid" ? socialMedia : item
                , coverLetter, price, token
            }, id, () => navigation.navigate("Submitted")))
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
            coverLetter={coverLetter} setCoverLetter={setCoverLetter} onSubmit={OnSubmit} />
        else if (selectedStat === "Bid") return <Bid
            onSubmit={OnSubmit} totalPrice={price}
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

            <View style={{ flex: 1, marginHorizontal: wp('4%') }}>
                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.75%'), marginBottom: hp('1.5%') }]}>Client's Budget:</Text>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('3%') }]}>${budget}</Text>

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