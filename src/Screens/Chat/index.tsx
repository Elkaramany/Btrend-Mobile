import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { GlobalStyles, Colors } from '../../Config'
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../Components/Container'

import AllChats from './Chats'
import Notifications from './Notifications'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Chat: React.FC<Props> = ({ navigation }) => {
    const [selectedChatScreen, setSelectedChatScreen] = React.useState("Messages");

    const chatScreen = () => {
        if (selectedChatScreen === "Messages") return <AllChats navigation={navigation} />
        else if (selectedChatScreen === "Notifications") return <Notifications navigation={navigation} />
    }

    const chatSeclector = (screen: string) => {
        const sameScreen = selectedChatScreen === screen

        return (
            <TouchableOpacity
                onPress={() => setSelectedChatScreen(screen)}
                style={[styles.categoryContainer, {
                    borderBottomColor: sameScreen ? Colors.brightRed : 'transparent'
                }]}>
                <Text style={[GlobalStyles.regularText, {
                    fontWeight: sameScreen ? '500' : '400',
                    color: sameScreen ? Colors.secondary : Colors.darkGray,
                }]}>{screen}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('2.5%') }]}>
                Inbox
            </Text>
            <View style={{ marginVertical: hp('3%'), flexDirection: 'row', }}>
                {chatSeclector("Messages")}
                {chatSeclector("Notifications")}
            </View>
            <View style={[GlobalStyles.horizontalLine, { width: '150%', bottom: hp('4%'), marginBottom: 0 }]} />

            {chatScreen()}
        </Container>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginRight: wp('11%'),
        borderBottomWidth: hp('0.2%'),
    }
})

export default Chat