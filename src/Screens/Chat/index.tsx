import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, Card } from 'react-native-paper'
import io from 'socket.io-client'
import moment from "moment";

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '@env'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import Spinner from '../../Components/Spinner'

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

const Chat: React.FC<Props> = ({ navigation }) => {
    const { token, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"
    const [search, setSearch] = React.useState('')
    const [chats, setChats] = React.useState([])
    const [fetchedChats, setFetchedChats] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const socketRef = React.useRef();

    React.useEffect(() => {
        // @ts-ignore
        socketRef.current = io(BASE_URL, { query: { token } })
        // @ts-ignore
        socketRef.current.on(GET_CHATS, chats => {
            setFetchedChats(chats)
            setLoaded(true)
        })
        // @ts-ignore
        socketRef.current.on(GET_CHANGES, (newList: any) => {
            if (newList && newList.length) {
                // @ts-ignore
                setFetchedChats(newList)
            }
        })
    }, [])

    React.useEffect(() => {
        setChats(fetchedChats)
    }, [fetchedChats])

    React.useEffect(() => {
        if (fetchedChats.length) {
            let filteredData = fetchedChats.filter((item: any) => {
                const name = isBrand ? `${item?.influencer?.firstName} ${item?.influencer?.lastName}` : item?.brand?.companyName
                return name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setChats(filteredData)
        }
    }, [search])

    const GoToChat = (conversationId: number, name: string) => {
        // @ts-ignore
        navigation.navigate("UserChat", { conversationId, name, socketRef })
    }

    const renderItem = (item: any) => {
        const name = isBrand ? `${item?.influencer?.firstName} ${item?.influencer?.lastName}` : item?.brand?.companyName
        const photo = isBrand ? item?.influencer?.photo : item?.brand?.photo
        const seen = isBrand ? item?.influencer?.lastSeen : item?.brand?.lastSeen
        const hours = moment(new Date).diff(moment(seen), "hours")
        const minutes = moment(new Date).diff(moment(seen), "minutes")
        const days = moment(new Date).diff(moment(seen), "days")
        const lastSeen = minutes < 60 ? minutes === 0 ? `Active now` : `Seen ${minutes} minute(s) ago` : hours < 24 ? `Seen ${hours} hour(s) ago` : `Seen ${days} day(s) ago`
        return (
            <TouchableOpacity onPress={() => GoToChat(item._id, name)}>
                <Card style={{ marginVertical: hp('2%') }} >
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={photo ? { uri: photo } : ImagePath.profilePlace} style={[GlobalStyles.roundedImg, { marginRight: wp('2%') }]} />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '500', textAlign: 'center' }]}>{name}</Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '300', color: Colors.darkGray }]}>{lastSeen}</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {item.unread > 0 &&
                                <View style={[GlobalStyles.rowBetween, { padding: hp('2%') }]}>
                                    <Text style={GlobalStyles.regularText}>{item.unread}</Text>
                                    <Image source={ImagePath.unread} style={GlobalStyles.arrowImage} />
                                </View>
                            }
                            <TouchableOpacity style={{ padding: hp('2%') }} onPress={() => console.log('options')}>
                                <Image source={ImagePath.options} style={GlobalStyles.arrowImage} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    const showChats = () => {
        if (loaded) {
            return (
                <FlatList
                    data={chats}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item }) => renderItem(item)}
                />
            )
        } else return <Spinner size={false} />
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <Input
                label={'Search'}
                value={search}
                onChangeText={(text) => setSearch(text)}
                inputStyle={{ width: wp('93%'), marginBottom: 0 }}
                rightIcon={<TextInput.Icon name={"close"} color={Colors.darkGray} onPress={() => setSearch('')} />}
            />
            {showChats()}
        </Container>
    )
}

export default Chat