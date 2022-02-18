import React from 'react'
import {
    View, StyleSheet, Image,
    TouchableOpacity,
}
    from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { SearchFeed } from '../../Redux/Actions'
import { Filter, INITIAL_FILTERS } from './Types'

import Container from '../../Components/Container'
import Feed from '../Feed/Feed'
import Input from '../../Components/Input'
import BottomSheet from './SearchFilters'

interface Props {
    navigation: StackNavigationProp<any, any>,
}


const Search: React.FC<Props> = ({ navigation }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { fetchedArray } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const [filters, setFilters] = React.useState<Filter>({ ...INITIAL_FILTERS, token })
    const [arr, setArr] = React.useState<any[]>([])
    const [visible, setVisible] = React.useState(true)
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
            <Container mainStyle={{ flex: 1 }}>
                <View style={GlobalStyles.rowAround}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ImagePath.backArrow} style={[GlobalStyles.arrowImage, { marginRight: wp('5%') }]} />
                    </TouchableOpacity>
                    <Input
                        label={'What do you want to search?'}
                        value={filters.search}
                        onChangeText={(text) => changeFilter("search", text)}
                        inputStyle={{ width: wp('75%'), marginBottom: 0 }}
                        rightIcon={filters.search.length ? <TextInput.Icon name={"close"} color={Colors.darkGray} onPress={() => setFilters({ ...INITIAL_FILTERS, token })} /> : null}
                    />
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image source={ImagePath.filter} style={[GlobalStyles.arrowImage, { marginLeft: wp('4%') }]} />
                    </TouchableOpacity>

                    <BottomSheet modalVisible={visible} hideModal={() => setVisible(false)}
                        clearFilters={() => setFilters({ ...INITIAL_FILTERS, token })}
                        filters={filters}
                        changeFilter={(type: string, text: string | number | number[] | string[]) => changeFilter(type, text)}
                        pressedSearch={() => getFeed()}
                    />
                </View>
                <Feed arr={arr} navigation={navigation} setArr={setArr} />
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