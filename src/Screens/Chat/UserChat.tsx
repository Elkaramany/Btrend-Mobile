import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper'
import AudioRecord from 'react-native-audio-record';
import { readFile } from "react-native-fs";
import Sound from 'react-native-sound';

import moment from "moment";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles, ImagePath, Colors } from '../../Config'

import Input from '../../Components/Input'
import Spinner from '../../Components/Spinner';

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const GET_MESSAGES = "getMessages"
const RECEIVE_MESSAGES = "receiveMessages"
const SEND_MESSAGE = "sendMessage"

const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    wavFile: 'test.wav' // default 'audio.wav'
};

AudioRecord.init(options);

const UserChat: React.FC<Props> = ({ route, navigation }) => {
    const { conversationId, name, socketRef } = route.params
    const [text, setText] = React.useState('')
    const { _id } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [messages, setMessages] = React.useState<any>([]);
    const [startedRecording, setStartedRecording] = React.useState(false)
    const scrollRef = React.useRef<FlatList>()
    const [loaded, setLoaded] = React.useState(false)
    //Playback
    const [soundLoading, setSoundLoading] = React.useState(false)
    const [sound, setSound] = React.useState<any>(null);
    const [audtioState, setAudioState] = React.useState({
        audioFile: '',
        recording: false,
        paused: false
    })

    React.useEffect(() => {
        ReceiveMessages()
        // @ts-ignore
        socketRef.current.on(RECEIVE_MESSAGES, (newMessages: any) => {
            if (newMessages.length) {
                setMessages(newMessages)
            }
            setLoaded(true)
        })
    }, [])

    const ReceiveMessages = () => {
        // @ts-ignore
        socketRef.current.emit(GET_MESSAGES, conversationId)
    }

    const onSend = (content: string, type: string) => {
        if (content.length) {
            // @ts-ignore
            socketRef.current.emit(SEND_MESSAGE, { content, conversationId, type })
            setMessages([...messages, { content, from: _id, type, createdAt: new Date() }])
            setText('')
        }
    }

    const stoptRecord = async () => {
        const audioFile = await AudioRecord.stop();
        const base64String = await readFile(audioFile, "base64");
        onSend(base64String, "audio")
    }

    function getDurationFormatted(millis: number) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
    }

    const playSound = async (file: string) => {
        Sound.setCategory('Playback');

        // Load the sound file 'whoosh.mp3' from the app bundle
        // See notes below about preloading sounds within initialization code below.
        let whoosh = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }

    const pause = () => {
        setSound(sound.pause())
        setAudioState({ ...audtioState, paused: true })
    };

    const resume = () => {
        setAudioState({ ...audtioState, paused: false })
    };

    const renderItem = (item: any, i: number) => {
        const diff = i !== 0 ? moment(item.createdAt).diff(moment(messages[i - 1].createdAt), "minutes") : 16
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
                <View key={item._id} style={[styles.chatContainer, _id === item.from ? styles.myChat : styles.otherChat]}>
                    {item.type === "text" &&
                        <>
                            <Text style={[GlobalStyles.regularText, { color: Colors.primary }]}>
                                {item.content}
                            </Text>
                            {showBubble(_id, item.from)}
                        </>
                    }
                    {item.type === "audio" &&
                        <TouchableOpacity style={[styles.chatContainer, _id === item.from ? styles.myChat : styles.otherChat]}>

                        </TouchableOpacity>
                    }
                </View>
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
                            rightIcon={<TextInput.Icon name={"image"} color={Colors.gray} size={32} />}
                        />
                        <TouchableOpacity onLongPress={() => AudioRecord.start()} onPressOut={() => stoptRecord()}>
                            <Image source={startedRecording ? ImagePath.playAudio : ImagePath.voice} style={[styles.inputImage, { bottom: hp('1.5%'), marginRight: wp('1%') }]} />
                        </TouchableOpacity>
                    </View>
                </>
            )
        } else return <Spinner size={true} />
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
        height: hp('5%'),
        width: hp('5%'),
        resizeMode: 'contain'
    }
})

export default UserChat