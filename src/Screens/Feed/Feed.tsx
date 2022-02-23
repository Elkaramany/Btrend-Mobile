import React from 'react'
import { Text, FlatList, Image, View } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';
import { UserSwipe } from '../../Redux/Actions'

import { GlobalStyles, ImagePath, Colors } from '../../Config';

import Spinner from '../../Components/Spinner'
import UserCard from './UserCard'

interface Props {
    navigation: StackNavigationProp<any, any>,
    arr: any[],
    setArr: (arr: any[]) => void
}

const Feed: React.FC<Props> = ({ navigation, arr, setArr }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { loading } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const dispatch = useDispatch()

    const onSwipe = (id: number | string, direction: string) => {
        if (direction === "right") dispatch(UserSwipe(id, token, userType))
        let newArr = [...arr]
        newArr = newArr.filter(i => i._id !== id);
        setArr(newArr)
    }

    if (loading) return <Spinner size={false} />
    else {
        if (!arr.length) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', top: hp('15%') }}>
                    <Image
                        source={ImagePath.emptySearch}
                        style={{ width: wp('25%'), height: wp('25%'), alignSelf: 'center' }}
                    />
                </View>
            )
        }
        return (
            <FlatList
                contentContainerStyle={{marginTop: hp('1.5%')}}
                data={arr}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => <UserCard
                    item={item} onSwipe={onSwipe} navigation={navigation}
                />
                }
            />
        )
    }
}

export default Feed