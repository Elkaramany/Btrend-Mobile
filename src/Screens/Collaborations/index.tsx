import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, Colors, ImagePath, semiGrayTextInputTheme } from '../../Config'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Campaigns from './Campaigns'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const DUMMY_DATA = [
    {
        campaignName: "Awesome campaign",
        brandName: "Very cool name",
        id: 5642314512,
        amount: 3000,
        instagram: true,
    },
    {
        campaignName: "Awesome campaign2",
        brandName: "Very cool name2",
        id: 23131582,
        amount: 12000,
        instagram: true,
        snapchat: true,
        tiktok: true,
        youtube: true,
    }
]

const Collaborations: React.FC<Props> = ({ navigation }) => {
    const [search, setSearch] = React.useState('')
    const [selectedTransaction, setSelectedTransaction] = React.useState("On-going")
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"

    const showIcon = () => {
        if (search.length) {
            return (
                <Icon name={"close"}
                    size={25} color={Colors.darkGray}
                    style={{ right: wp('8.75%'), top: hp('0.4%') }}
                    onPress={() => setSearch('')} />
            )
        } else return <View />
    }

    const Stat = (stat: string) => {
        const sameStat = selectedTransaction === stat
        return (
            <TouchableOpacity
                onPress={() => setSelectedTransaction(stat)}
                style={[styles.categoryContainer, {
                    borderBottomColor: sameStat ? Colors.brightRed : 'transparent'
                }]}>
                <Text style={[GlobalStyles.regularText, {
                    fontWeight: sameStat ? 'bold' : 'normal',
                    color: sameStat ? Colors.secondary : Colors.darkGray,
                }]}>{stat}</Text>
            </TouchableOpacity>
        )
    }

    const Title = (str: string) => {
        return <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('3%') }]}>{str}</Text>
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={{ backgroundColor: Colors.primary, paddingHorizontal: wp('4'), }}>
                {isBrand ?
                    <View style={GlobalStyles.rowBetween}>
                        {Title("Campaigns")}
                        <TouchableOpacity onPress={() => navigation.navigate("AddCampaign")}>
                            <Image source={ImagePath.iconPluss}
                                style={{ width: wp('8%'), height: wp('8%'), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    :
                    Title("Collaborations")
                }
                <View style={{ marginTop: hp('4%'), flexDirection: 'row', }}>
                    {Stat("On-going")}
                    {Stat("Invited")}
                    {Stat("Finished")}
                </View>
            </View>
            <View style={{ paddingHorizontal: wp('4') }}>
                <View style={[GlobalStyles.rowBetween, { marginVertical: hp('3%'), marginBottom: hp('4%') }]}>
                    <Input
                        label={'Search'}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 0, height: hp('5%') }}
                        theme={semiGrayTextInputTheme}
                    />
                    {showIcon()}
                </View>
                <Campaigns data={DUMMY_DATA} navigation={navigation} screen={selectedTransaction} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginRight: wp('12%'),
        borderBottomWidth: hp('0.2%'),
        paddingBottom: hp('1%'),
    }
})

export default Collaborations