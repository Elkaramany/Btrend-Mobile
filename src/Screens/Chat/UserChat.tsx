import React from 'react'
import useStateRef from 'react-usestateref'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper'

import moment from "moment";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny, useSelector } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles, ImagePath, Colors, handleSelection } from '../../Config'

import Input from '../../Components/Input'
import Spinner from '../../Components/Spinner';

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const GET_MESSAGES = "getMessages"
const RECEIVE_MESSAGES = "receiveMessages"
const RECEIVE_MESSAGE = "receiveMessage"
const SEND_MESSAGE = "sendMessage"

const UserChat: React.FC<Props> = ({ route, navigation }) => {
    const { conversationId, name, socketRef } = route.params
    const [text, setText] = React.useState('')
    const { _id } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [messages, setMessages, messagesRef] = useStateRef([]);
    const scrollRef = React.useRef<FlatList>()
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        //Send to the server to get all messages
        socketRef.current.emit(GET_MESSAGES, conversationId)
        // @ts-ignore
        socketRef.current.on(RECEIVE_MESSAGES, (newMessages: any) => {
            if (newMessages.length) {
                setMessages(newMessages)
            }
            setLoaded(true)
        })

        socketRef.current.on(RECEIVE_MESSAGE, (newMessage: any) => {
            if (newMessage.content.length && newMessage.conversationId == conversationId) {
                // @ts-ignore
                setMessages([...messagesRef.current, newMessage])
            }
        })
    }, [])


    const onSend = (content: string, type: string) => {
        if (content.length) {
            // @ts-ignore
            socketRef.current.emit(SEND_MESSAGE, { content, conversationId, type })
            // @ts-ignore
            setMessages([...messages, { content, from: _id, type, createdAt: new Date() }])
            setText('')
        }
    }

    const sendImage = async () => {
        const image: any = await handleSelection()
        if (image && image.length) {
            onSend(image, "image")
        }
    }

    const renderItem = (item: any, i: number) => {
        // @ts-ignore
        const diff = i !== 0 ? moment(item.createdAt).diff(moment(messages[i - 1].createdAt), "minutes") : 21
        const createdAt = moment(item.createdAt);
        return (
            <>
                {diff > 20 &&
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%'), color: Colors.darkGray, alignSelf: 'center' }]}>
                        {moment().diff(createdAt, "days") == 0
                            ? `Today at ${createdAt.format("LT")}`
                            : createdAt.format("ddd LT")}
                    </Text>
                }
                {item.type === "text" &&
                    <View key={item._id} style={[styles.chatContainer, _id === item.from ? styles.myChat : styles.otherChat]}>

                        <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>
                            {item.content}
                        </Text>
                        {showBubble(_id, item.from)}
                    </View>
                }
                {item.type === "image" &&
                    <Image source={{ uri: item.content }} style={[styles.userImg, { alignSelf: _id === item.from ? "flex-end" : "flex-start" }]} />
                }
            </>
        )
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

    const showLoaded = () => {
        if (loaded) {
            return (
                <>
                    <ScrollView style={{ flexGrow: 1, height: hp('80%') }}
                        // @ts-ignore
                        ref={scrollRef}
                        // @ts-ignore
                        onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: false })}
                    >
                        {messages.map((item: any, index: number) => {
                            return <View key={index}>{renderItem(item, index)}</View>
                        })}
                    </ScrollView>
                    <View style={GlobalStyles.rowBetween}>
                        <Input
                            label='iMessage'
                            multiline
                            value={text}
                            onChangeText={(val: string) => setText(val)}
                            inputStyle={{ width: wp('80%') }}
                            onSubmitEditing={() => onSend(text, "text")}
                            rightIcon={<TextInput.Icon name={"image"} color={Colors.gray} size={32} onPress={() => sendImage()} />}
                        />
                        <TouchableOpacity onPress={() => onSend(text, "text")}>
                            <Image source={ImagePath.rightArrow} style={[styles.inputImage, { bottom: hp('1.5%'), marginRight: wp('2.5%') }]} />
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else return <Spinner size={false} />
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}
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
            {showLoaded()}
        </Container>
    )
}

const styles = StyleSheet.create({
    chatContainer: {
        marginVertical: hp('0.75%'),
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
        right: -wp('2.45%')
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
        backgroundColor: "#0B93F6",
        width: wp('5%'),
        height: wp('5.25%'),
        bottom: 0,
        borderBottomRightRadius: wp('10%'),
        left: -wp('2.45%')
    },
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: Colors.primary,
        width: wp('4.85%'),
        height: wp('10%'),
        bottom: -wp('1%'),
        borderBottomRightRadius: wp('5%'),
        left: -wp('4.85%')
    }, inputImage: {
        height: hp('3%'),
        width: hp('3%'),
        resizeMode: 'contain'
    }, userImg: {
        width: wp('65%'),
        height: hp('20%'),
        resizeMode: 'cover',
        borderRadius: hp('5%'),
    }
})

export default UserChat