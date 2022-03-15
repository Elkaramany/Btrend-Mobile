import React from 'react'
import { FlatList, Image, View, RefreshControl } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';
import { UserSwipe } from '../../Redux/Actions'

import { ImagePath } from '../../Config';

import Spinner from '../../Components/Spinner'
import UserCard from './UserCard'

interface Props {
    navigation: StackNavigationProp<any, any>,
    arr: any[],
    setArr: (arr: any[]) => void
    refreshFeed: () => void
}

const Feed: React.FC<Props> = ({ navigation, arr, setArr, refreshFeed }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { loading } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const dispatch = useDispatch()

    const onSwipe = (id: number | string, direction: string) => {
        dispatch(UserSwipe(id, token, direction, userType))
        let newArr = [...arr]
        newArr = newArr.filter(i => i._id !== id);
        setArr(newArr)
    }

    if (!arr || !arr.length) {
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
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={refreshFeed}
                />
            }
            data={arr}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <UserCard
                item={item} onSwipe={onSwipe} navigation={navigation}
            />
            }
        />
    )
}

export default Feed