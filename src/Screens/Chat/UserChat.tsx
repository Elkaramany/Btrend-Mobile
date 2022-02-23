import React from 'react'
import useStateRef from 'react-usestateref'
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
    FlatList, ScrollView, TouchableWithoutFeedback
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Svg, Path } from 'react-native-svg'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TextInput } from 'react-native-paper'

import moment from "moment";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny, useSelector } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles, ImagePath, Colors, handleSelection } from '../../Config'

import Input from '../../Components/Input'
import Spinner from '../../Components/Spinner';
import Options from './Options'


interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const GET_MESSAGES = "getMessages"
const RECEIVE_MESSAGES = "receiveMessages"
const RECEIVE_MESSAGE = "receiveMessage"
const SEND_MESSAGE = "sendMessage"

const UserChat: React.FC<Props> = ({ route, navigation }) => {
    const { conversationId, name, socketRef, isMuted, onCall } = route.params
    const [text, setText] = React.useState('')
    const { _id } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [messages, setMessages, messagesRef] = useStateRef([]);
    const scrollRef = React.useRef<FlatList>()
    const [loaded, setLoaded] = React.useState(false)
    const [visible, setVisible] = React.useState(false)

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
        const msgFromMe = _id === item.from
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
                    <View key={item._id} style={[styles.chatContainer, msgFromMe ? styles.myChat : styles.otherChat]}>
                        {msgFromMe ?
                            <View style={[styles.balloon, { backgroundColor: Colors.darkRed }]}>
                                <Text style={{ paddingTop: 5, color: 'white' }}>{item.content}</Text>
                                <View
                                    style={[
                                        styles.arrowContainer,
                                        styles.arrowRightContainer,
                                    ]}
                                >
                                    <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                                        <Path
                                            d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                                            fill={Colors.darkRed}
                                            x="0"
                                            y="0"
                                        />
                                    </Svg>
                                </View>
                            </View>
                            :
                            <View style={[styles.balloon, { backgroundColor: Colors.gray }]}>
                                <Text style={{ paddingTop: 5, color: Colors.secondary }}>{item.content}</Text>
                                <View
                                    style={[
                                        styles.arrowContainer,
                                        styles.arrowLeftContainer,
                                    ]}
                                >
                                    <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                                        <Path
                                            d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                                            fill={Colors.gray}
                                            x="0"
                                            y="0"
                                        />
                                    </Svg>
                                </View>
                            </View>
                        }
                    </View>
                }
                {item.type === "image" &&
                    <Image source={{ uri: item.content }} style={[styles.userImg, { alignSelf: msgFromMe ? "flex-end" : "flex-start" }]} />
                }
            </>
        )
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
                            return <TouchableWithoutFeedback key={index}>{renderItem(item, index)}</TouchableWithoutFeedback>
                        })}
                    </ScrollView>
                    <View style={GlobalStyles.rowBetween}>
                        <Input
                            label='Message...'
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

    const GoBack = () => {
        onCall()
        navigation.goBack()
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => GoBack()}>
                        <Image source={ImagePath.leftArrow} style={[GlobalStyles.arrowImage, { marginRight: wp('10%') }]} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>{name}</Text>
                    </View>
                </View>
                <Options visible={visible} setVisible={setVisible} converastionId={conversationId}
                    navigation={navigation} isMuted={isMuted} name={name} />
            </View>
            {showLoaded()}
        </Container>
    )
}

const styles = StyleSheet.create({
    chatContainer: {
        marginVertical: moderateScale(7, 2),
        borderRadius: moderateScale(15),
        minWidth: moderateScale(50)
    }, myChat: {
        backgroundColor: Colors.darkRed,
        marginLeft: '20%',
        marginRight: "2%",
        alignSelf: 'flex-end',
    },
    otherChat: {
        backgroundColor: Colors.gray,
        marginRight: "20%",
        marginLeft: '2%',
        alignSelf: 'flex-start',
    }, arrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        flex: 1
    },
    arrowLeftContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },

    arrowRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    arrowLeft: {
        left: moderateScale(-6, 0.5),
    },

    arrowRight: {
        right: moderateScale(-6, 0.5),
    }
    , balloon: {
        maxWidth: moderateScale(250, 2),
        paddingHorizontal: moderateScale(10, 2),
        paddingTop: moderateScale(5, 2),
        paddingBottom: moderateScale(7, 2),
        borderRadius: 20,
    },

    inputImage: {
        height: hp('3%'),
        width: hp('3%'),
        resizeMode: 'contain'
    }, userImg: {
        width: wp('65%'),
        height: hp('20%'),
        resizeMode: 'cover',
        borderRadius: hp('5%'),
    },
})

export default UserChat