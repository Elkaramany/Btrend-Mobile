import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper'

import moment from "moment";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles, ImagePath, Colors } from '../../Config'

import Input from '../../Components/Input'

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const GET_MESSAGES = "getMessages"
const RECEIVE_MESSAGES = "receiveMessages"
const SEND_MESSAGE = "sendMessage"


const UserChat: React.FC<Props> = ({ route, navigation }) => {
    const { conversationId, name, socketRef } = route.params
    const [text, setText] = React.useState('')
    const { _id } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [messages, setMessages] = React.useState<any>([]);
    const [startedRecording, setStartedRecording] = React.useState(false)
    //Voice 
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        // @ts-ignore
        socketRef.current.on(RECEIVE_MESSAGES, (newMessages: any) => {
            console.log('called here')
            setMessages(newMessages)
        })
        ReceiveMessages()
    }, [])

    const ReceiveMessages = () => {
        // @ts-ignore
        socketRef.current.emit(GET_MESSAGES, conversationId)
    }

    const onSend = () => {
        if (text.length) {
            // @ts-ignore
            socketRef.current.emit(SEND_MESSAGE, { text, conversationId })
            setMessages([...messages, { text, from: _id, type: "text", createdAt: new Date() }])
            setText('')
        }
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

    const startRecord = async () => {

    }

    async function stoptRecord() {

    }

    function getDurationFormatted(millis: number) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    const renderItem = (item: any, i: number) => {
        const diff = i !== 0 ? moment(item.createdAt).diff(moment(messages[i - 1].createdAt), "minutes") : 2
        const createdAt = moment(item.createdAt);
        return (
            <>
                {diff > 15 &&
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%'), color: Colors.darkGray, alignSelf: 'center' }]}>
                        {moment().diff(createdAt, "days") == 0
                            ? `Today at ${createdAt.format("LT")}`
                            : createdAt.format("ddd LT")}
                    </Text>
                }
                <View key={item._id} style={[styles.chatContainer, _id === item.from ? styles.myChat : styles.otherChat]}>
                    <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>{item.text}</Text>
                    {showBubble(_id, item.from)}
                </View>
            </>
        )
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
            <FlatList
                // @ts-ignore
                data={messages}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => renderItem(item, index)}
            />
            <View style={GlobalStyles.rowBetween}>
                <Input
                    label='iMessage'
                    multiline
                    value={text}
                    onChangeText={(val: string) => setText(val)}
                    inputStyle={{ width: wp('80%') }}
                    onSubmitEditing={() => onSend()}
                    rightIcon={<TextInput.Icon name={"image"} color={Colors.gray} />}
                />
                <TouchableOpacity onLongPress={() => startRecord()} onPressOut={() => stoptRecord()}>
                    <Image source={startedRecording ? ImagePath.playAudio : ImagePath.voice} style={[styles.inputImage, { bottom: hp('1.5%'), marginRight: wp('1%') }]} />
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
        height: hp('5%'),
        width: hp('5%'),
        resizeMode: 'contain'
    }
})

export default UserChat