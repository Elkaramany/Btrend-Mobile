import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper'
import moment from "moment";

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles, ImagePath, Colors, formatDate } from '../../Config'

import Input from '../../Components/Input'

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const GET_MESSAGES = "getMessages"
const RECEIVE_MESSAGES = "receiveMessages"
const SEND_MESSAGE = "sendMessage"

const UserChat: React.FC<Props> = ({ route, navigation }) => {
    const scrollViewRef = React.useRef()
    const [text, setText] = React.useState('')
    const { _id } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [messages, setMessages] = React.useState<any>([]);
    const { conversationId, name, socket, getAllChats } = route.params

    React.useEffect(() => {
        socket.on(RECEIVE_MESSAGES, (newMessages: any) => {
            setMessages(newMessages)
        })
        ReceiveMessages()
    }, [])

    const ReceiveMessages = () => {
        socket.emit(GET_MESSAGES, conversationId)
        // @ts-ignore
        scrollViewRef.current.scrollToEnd({ animated: false })
    }

    React.useEffect(() => {
        ReceiveMessages()
        // @ts-ignore
        scrollViewRef.current.scrollToEnd({ animated: false })
    }, [messages])

    const onSend = () => {
        if (text.length) {
            socket.emit(SEND_MESSAGE, { text, conversationId })
            setMessages([...messages, { text, from: _id }])
            setText('')
        }
    }

    const GoBack = () => {
        getAllChats()
        navigation.goBack()
    }

    const showBubble = (id: number, from: number) => {
        if (id === from) {
            return (
                <>
                    <View style={styles.rightArrow} />
                    <View style={styles.rightArrowOverlap} />
                </>
            )
        } else {
            return (
                <>
                    <View style={styles.leftArrow} />
                    <View style={styles.leftArrowOverlap} />
                </>
            )
        }
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity onPress={() => GoBack()}
                style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={ImagePath.leftArrow} style={[GlobalStyles.arrowImage, { marginRight: wp('10%') }]} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>{name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ padding: hp('2%') }} onPress={() => console.log('options')}>
                    <Image source={ImagePath.options} style={GlobalStyles.arrowImage} />
                </TouchableOpacity>
            </TouchableOpacity>
            <ScrollView
                // @ts-ignore
                ref={scrollViewRef}
                pagingEnabled
                style={{ flexGrow: 1, height: hp('65%') }}>
                {messages.map((m: any, i: number) => {
                    const diff = i !== 0 ? moment(m.createdAt).diff(moment(messages[i - 1].createdAt), "minutes") : 2
                    const createdAt = moment(m.createdAt);
                    return (
                        <>
                            {diff > 15 &&
                                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%'), color: Colors.darkGray, alignSelf: 'center' }]}>
                                    {moment().diff(createdAt, "days") == 0
                                        ? `Today at ${createdAt.format("LT")}`
                                        : createdAt.format("ddd LT")}
                                </Text>
                            }
                            <View key={m._id} style={[styles.chatContainer, _id === m.from ? styles.myChat : styles.otherChat]}>
                                <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>{m.text}</Text>
                                {showBubble(_id, m.from)}
                            </View>
                        </>

                    )
                })}
            </ScrollView>
            <View style={GlobalStyles.rowBetween}>
                <Input
                    label='iMessage'
                    multiline
                    value={text}
                    onChangeText={(val: string) => setText(val)}
                    inputStyle={{ width: wp('82%') }}
                    onSubmitEditing={() => onSend()}
                />
                <TouchableOpacity onPress={() => onSend()}>
                    <Image source={ImagePath.rightArrow} style={[GlobalStyles.arrowImage, { bottom: hp('1.25%'), marginRight: wp('2.5%') }]} />
                </TouchableOpacity>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    chatContainer: {
        marginVertical: hp('1%'),
        borderRadius: hp('2%'),
        padding: hp('1%'),
        minWidth: wp('10%')
    }, myChat: {
        backgroundColor: Colors.darkRed,
        marginLeft: '20%',
        marginRight: "2%",
        alignSelf: 'flex-end',
    }, rightArrow: {
        position: "absolute",
        backgroundColor: Colors.darkRed,
        width: wp('5%'),
        height: wp('5.25%'),
        bottom: 0,
        borderBottomLeftRadius: wp('10%'),
        right: -wp('2.25%')
    },
    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: Colors.primary,
        width: wp('4.85%'),
        height: wp('10%'),
        bottom: -wp('1%'),
        borderBottomLeftRadius: wp('5%'),
        right: -wp('4.85%')
    },
    otherChat: {
        backgroundColor: "#0B93F6",
        marginRight: wp('20%'),
        marginLeft: '2%',
        alignSelf: 'flex-start',
    }, leftArrow: {
        position: "absolute",
        backgroundColor: Colors.darkRed,
        width: wp('5%'),
        height: wp('5.25%'),
        bottom: 0,
        borderBottomRightRadius: wp('10%'),
        left: -wp('2.25%')
    },
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: Colors.primary,
        width: wp('4.85%'),
        height: wp('10%'),
        bottom: -wp('1%'),
        borderBottomRightRadius: wp('5%'),
        left: -wp('4.85%')
    },
})

export default UserChat