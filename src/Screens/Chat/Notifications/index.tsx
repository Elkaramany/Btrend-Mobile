import React from 'react'
import {
    View, Text, FlatList, Image,
    StyleSheet, TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import { Card } from 'react-native-paper'

import { GlobalStyles, Colors, ImagePath } from '../../../Config'

import GradientText from '../../../Components/GradientText'
import Options from './Options'

interface Props {
    navigation: StackNavigationProp<any, any>,
}
const DUMMY_NOTIFICATIONS = [
    {
        img: ImagePath.profilePhoto,
        title: "Campaign name",
        message: "Contract has started",
        date: new Date(),
        unread: true,
        id: 0
    },
    {
        img: ImagePath.profilePhoto,
        title: "BTrend",
        message: "new security update",
        date: new Date(),
        unread: true,
        id: 1
    },
    {
        img: ImagePath.profilePhoto,
        title: "La rose",
        message: "You've got a new match",
        date: new Date(),
        unread: false,
        id: 2
    },
    {
        img: ImagePath.profilePhoto,
        title: "Cosmetics",
        message: "Content submission has been approved",
        date: new Date(),
        unread: false,
        id: 3
    },
]

const Index: React.FC<Props> = ({ navigation }) => {

    const [optionsVisible, setOptionsVisible] = React.useState(false)

    //@ts-ignore
    const renderItem = ({ item }) => {
        //Calculate last seen
        const hours = moment(new Date).diff(moment(item.date), "hours")
        const minutes = moment(new Date).diff(moment(item.date), "minutes")
        const days = moment(new Date).diff(moment(item.date), "days")
        const lastSeen = minutes < 60 ? minutes === 0 ? `Just now` : `${minutes} minute(s) ago` : hours < 24 ? `${hours} hour(s) ago` : `${days} day(s) ago`
        return (
            <View >
                <Card style={{ marginVertical: hp('2%') }} >
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={item.img}
                                style={styles.profilePicture} />

                            <View style={{ width: '70%' }}>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '600', }]}>
                                    {item.title}
                                </Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '500', color: Colors.darkGray, }]}>
                                    {item.message}
                                </Text>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>
                                    {lastSeen}
                                </Text>
                            </View>
                        </View>

                        <Options visible={optionsVisible} setVisible={setOptionsVisible}
                            notificationId={item.id} navigation={navigation}
                            name={item.title} img={item.img} message={item.message}/>
                    </View>
                </Card>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <GradientText
                    style={[GlobalStyles.regularText,
                    {
                        textDecorationLine: "underline", marginTop: hp('1%'),
                        fontSize: hp('1.75%'), fontWeight: '500'
                    }]}
                    end={{ x: 0.7, y: 0.35 }}>
                    Mark all as read
                </GradientText>
            </TouchableOpacity>

            <FlatList
                data={DUMMY_NOTIFICATIONS}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    profilePicture: {
        marginRight: wp('3%'),
        width: wp('11%'),
        height: wp('11%'),
        resizeMode: 'contain',
        borderRadius: wp('2%'),
    }
})

export default Index