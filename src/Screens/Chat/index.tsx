import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, Card } from 'react-native-paper'
import io from 'socket.io-client'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { BASE_URL } from '@env'
import Food from '../Search/food'

import Container from '../../Components/Container'
import Input from '../../Components/Input'

interface UserChat {
    name: string
    photo?: string
    stattus?: string
}

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const GET_CHATS = 'getAllChats'

const Chat: React.FC<Props> = ({ navigation }) => {
    const { token, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"
    const [search, setSearch] = React.useState('')
    const [chats, setChats] = React.useState([])
    const [fetchedChats, setFetchedChats] = React.useState<any>([])
    const socket = io(BASE_URL, { query: { token } });

    React.useEffect(() => {
        GetAllChats()
    }, [])

    const GetAllChats = () => {
        socket.on(GET_CHATS, chats => {
            setFetchedChats(chats)
        })
    }

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

    const renderItem = (item: any) => {
        const name = isBrand ? `${item?.influencer?.firstName} ${item?.influencer?.lastName}` : item?.brand?.companyName
        const photo = isBrand ? item?.influencer?.photo : item?.brand?.photo
        const lastSeen = isBrand ? item?.influencer?.lastSeen : item?.brand?.lastSeen
        return (
            <TouchableOpacity onPress={() => navigation.navigate("UserChat", { conversationId: item._id, name, socket, getAllChats: () => GetAllChats() })}>
                <Card style={{ marginVertical: hp('2%') }} >
                    <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%') }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={photo ? { uri: photo } : ImagePath.profilePlace} style={[GlobalStyles.roundedImg, { marginRight: wp('2%') }]} />
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '500', textAlign: 'center' }]}>{name}</Text>
                                <Text style={[GlobalStyles.regularText, { fontWeight: '300', color: Colors.darkGray }]}>{lastSeen}</Text>
                            </View>

                        </View>
                        <TouchableOpacity style={{ padding: hp('2%') }} onPress={() => console.log('options')}>
                            <Image source={ImagePath.options} style={GlobalStyles.arrowImage} />
                        </TouchableOpacity>
                    </View>
                </Card>
            </TouchableOpacity>
        )
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
            <FlatList
                data={chats}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => renderItem(item)}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Chat