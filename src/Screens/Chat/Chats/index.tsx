import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import { useSelector, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, Card } from 'react-native-paper'
import io from 'socket.io-client'
import moment from "moment";

import { GlobalStyles, ImagePath, Colors } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '@env'

import Options from './Options'
import Input from '../../../Components/Input'
import Spinner from '../../../Components/Spinner'

interface UserChat {
    name: string
    photo?: string
    stattus?: string
}

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const GET_CHATS = 'getAllChats'
const GET_CHANGES = 'getChanges'

const AllChats: React.FC<Props> = ({ navigation }) => {
    const [optionsVisible, setOptionsVisible] = React.useState(false)
    const { token, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"
    const [search, setSearch] = React.useState('')
    const [chats, setChats] = React.useState([])
    const [fetchedChats, setFetchedChats] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const socketRef = React.useRef();

    React.useEffect(() => {
        callEmit()
    }, [])

    const callEmit = () => {
        // @ts-ignore
        socketRef.current = io(`${BASE_URL}/`, { query: { token } })
        // @ts-ignore
        socketRef.current.on(GET_CHATS, chats => {
            setFetchedChats(chats)
            setLoaded(true)
        })
    }

    React.useEffect(() => {
        setChats(fetchedChats)
    }, [fetchedChats])

    React.useEffect(() => {
        if (fetchedChats.length) {
            let filteredData = fetchedChats.filter((item: any) => {
                const name = isBrand ? `${item?.influencer?.firstName} ${item?.influencer?.lastName}` : item?.brand?.brandName
                return name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setChats(filteredData)
        }
    }, [search])

    const GoToChat = (conversationId: number, name: string, isMuted: boolean) => {
        // @ts-ignore
        navigation.navigate("UserChat", { conversationId, name, socketRef, isMuted, onCall: () => callEmit() })
    }

    const renderItem = (item: any) => {
        const name = isBrand ? `${item?.influencer?.firstName} ${item?.influencer?.lastName}` : item?.brand?.brandName
        const photo = isBrand ? item?.influencer?.photo : item?.brand?.photo
        const seen = isBrand ? item?.influencer?.lastSeen : item?.brand?.lastSeen
        //Calculate last seen
        const hours = moment(new Date).diff(moment(seen), "hours")
        const minutes = moment(new Date).diff(moment(seen), "minutes")
        const days = moment(new Date).diff(moment(seen), "days")
        const lastSeen = minutes < 60 ? minutes === 0 ? `Active now` : `Seen ${minutes} minute(s) ago` : hours < 24 ? `Seen ${hours} hour(s) ago` : `Seen ${days} day(s) ago`
        return (
            <TouchableOpacity onPress={() => GoToChat(item._id, name, item.isMuted)}>
                <Card style={{ marginVertical: hp('2%') }} >
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={photo ? { uri: photo } : ImagePath.profilePlace}
                                style={styles.profilePicture} />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '500', textAlign: 'center' }]}>{name}</Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '300', color: Colors.darkGray }]}>{lastSeen}</Text>
                            </View>

                        </View>
                        <View style={GlobalStyles.rowBetween}>
                            {item.isMuted &&
                                <Image source={ImagePath.mute} style={GlobalStyles.arrowImage} />
                            }
                            {item.unread > 0 &&
                                <View style={[GlobalStyles.rowBetween, { padding: hp('2%') }]}>
                                    <Image source={ImagePath.unread} style={GlobalStyles.arrowImage} />
                                </View>
                            }
                            <Options visible={optionsVisible} setVisible={setOptionsVisible}
                                converastionId={item._id}
                                navigation={navigation} isMuted={item.isMuted}
                                name={name} />
                        </View>

                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    const showChats = () => {
        if (loaded) {
            if (!chats.length) {
                return (
                    <>
                        <Text style={[GlobalStyles.regularText,
                        { marginTop: hp('5%'), fontWeight: 'bold' }]}>
                            Inbox is empty
                        </Text>
                        <Text style={[GlobalStyles.regularText,
                        { marginTop: hp('1%'), color: Colors.darkGray }]}>
                            You'll be able to receive messages after matching with a brand
                        </Text>
                    </>
                )
            }
            return (
                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => `${item}${index}`}
                    renderItem={({ item }) => renderItem(item)}
                />
            )
        } else return <Spinner size={false} />
    }

    return (
        <View style={{ flex: 1 }}>
            <Input
                label={'Search'}
                value={search}
                onChangeText={(text) => setSearch(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 0 }}
                rightIcon={<TextInput.Icon name={"close"} color={Colors.darkGray}
                    onPress={() => setSearch('')} style={{ top: hp('0.65%') }} />}
            />
            {showChats()}
        </View>
    )
}

const styles = StyleSheet.create({
    profilePicture: {
        marginRight: wp('2%'),
        width: wp('11%'),
        height: wp('11%'),
        resizeMode: 'contain',
        borderRadius: wp('2%'),
    }
})

export default AllChats