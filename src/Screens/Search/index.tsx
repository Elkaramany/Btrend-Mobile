import React from 'react'
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity, FlatList,
}
    from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { SearchFeed, UserSwipe } from '../../Redux/Actions'
import { Filter, INITIAL_FILTERS } from './Types'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import BottomSheet from './SearchFilters'
import UserCard from './UserCard'
import AddCampaign from './AddCampaign'
import Spinner from '../../Components/Spinner';

interface Props {
    navigation: StackNavigationProp<any, any>,
}


const Search: React.FC<Props> = ({ navigation }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { fetchedArray, loading } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const [filters, setFilters] = React.useState<Filter>({ ...INITIAL_FILTERS, token })
    const [arr, setArr] = React.useState<any[]>([])
    const [visible, setVisible] = React.useState(false)
    const [campaignVisible, setCampaignVisible] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        getFeed()
    }, [filters.search])

    React.useEffect(() => {
        setArr(fetchedArray)
    }, [fetchedArray])

    const changeFilter = (type: string, text: string | number | number[] | string[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    const getFeed = () => dispatch(SearchFeed(filters, userType))

    const onSwipe = (id: number | string, direction: string) => {
        if (direction === "right") dispatch(UserSwipe(id, token, userType))
        let newArr = [...arr]
        newArr = newArr.filter(i => i._id !== id);
        setArr(newArr)
    }

    const Feed = () => {
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
            <Container mainStyle={{ flex: 1 }}>
                <View style={GlobalStyles.rowBetween}>
                    <Input
                        label={'Search'}
                        value={filters.search}
                        onChangeText={(text) => changeFilter("search", text)}
                        inputStyle={{ width: wp('80%'), marginBottom: 0 }}
                        rightIcon={<TextInput.Icon name={"close"} color={Colors.darkGray} onPress={() => setFilters({ ...INITIAL_FILTERS, token })} />}
                    />

                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image source={ImagePath.filter} style={[GlobalStyles.arrowImage, { paddingHorizontal: wp('3%'), marginHorizontal: wp('5%') }]} />
                    </TouchableOpacity>

                    <BottomSheet modalVisible={visible} hideModal={() => setVisible(false)}
                        clearFilters={() => setFilters({ ...INITIAL_FILTERS, token })}
                        filters={filters}
                        changeFilter={(type: string, text: string | number | number[] | string[]) => changeFilter(type, text)}
                        pressedSearch={() => getFeed()}
                    />
                </View>
                {Feed()}
                {userType === "Brand" &&
                    <View style={styles.addButton}>
                        <TouchableOpacity onPress={() => setCampaignVisible(true)}>
                            <Image source={ImagePath.uploadFocus} style={{ width: wp('10%'), height: hp('5%'), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <AddCampaign modalVisible={campaignVisible} hideModal={() => setCampaignVisible(false)} />
                    </View>
                }
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: hp('2%'),
        marginRight: wp('3%')
    }
})

export default Search