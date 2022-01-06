import React from 'react'
import { Text, FlatList } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StackNavigationProp } from '@react-navigation/stack';
import { UserSwipe } from '../../Redux/Actions'

import { GlobalStyles } from '../../Config';

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
            return <Text style={[GlobalStyles.regularText, { marginTop: hp('5%') }]}>Nothing to show for now, come back later!</Text>
        }
        return (
            <>
                <Text style={[GlobalStyles.regularText, { fontWeight: '600', marginVertical: hp('2%'), marginLeft: wp('2%') }]}>Most Popular</Text>

                <FlatList
                    data={arr}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => <UserCard
                        item={item} onSwipe={onSwipe} navigation={navigation}
                    />
                    }
                />
            </>
        )
    }
}

export default Feed