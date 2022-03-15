import React from 'react'
import {
    View, StyleSheet, Image, Text,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import { GlobalStyles, ImagePath, Colors, CategoriesArr } from '../../Config'
import { SearchFeed } from '../../Redux/Actions'

import Container from '../../Components/Container'
import Match from './Match'

import { INITIAL_FILTERS } from '../Search/Types';
import Feed from './Feed';

interface Props {
    navigation: StackNavigationProp<any, any>,
}


const Search: React.FC<Props> = ({ navigation }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { fetchedArray } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const [arr, setArr] = React.useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([])
    const [hasMatch, setHasMatch] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        setArr(fetchedArray.feed)
    }, [fetchedArray])

    React.useEffect(() => {
        refreshFeed()
    }, [selectedCategory])

    const refreshFeed = () => dispatch(SearchFeed({ ...INITIAL_FILTERS, categories: selectedCategory, token }, userType))

    const AddOrRemoveCategory = (item: string | undefined) => {
        if (!item || !item.length) return;

        let newArr = [...selectedCategory]
        if (selectedCategory.includes(item)) {
            if (selectedCategory.length === 1) newArr = []
            else newArr = newArr.filter(cat => cat !== item)
        }
        else newArr.push(item)
        setSelectedCategory(newArr)
    }

    if (hasMatch) {
        return <Match hasMatch={() => setHasMatch(false)} navigation={navigation} />
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Container containerStyle={{ flex: 0 }}>
                    <View style={GlobalStyles.rowBetween}>
                        <Image source={ImagePath.btrendBlack} style={styles.logo} />
                        <View style={GlobalStyles.rowBetween}>
                            <Text style={GlobalStyles.regularText}></Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                                <Image source={ImagePath.search} style={GlobalStyles.arrowImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: hp('3.5%') }}>
                        <FlatList
                            horizontal
                            data={CategoriesArr}
                            keyExtractor={(item, index) => `${item}${index}`}
                            renderItem={({ item }) => {
                                const sameCategory = item && item.length && selectedCategory.includes(item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => AddOrRemoveCategory(item)}
                                        style={[styles.categoryContainer, {
                                            borderBottomColor: sameCategory ? Colors.brightRed : 'transparent'
                                        }]}>
                                        <Text style={[GlobalStyles.regularText, {
                                            fontWeight: sameCategory ? 'bold' : 'normal',
                                            color: sameCategory ? Colors.secondary : Colors.darkGray,
                                        }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </Container>

                <Feed arr={arr} navigation={navigation} setArr={setArr} refreshFeed={refreshFeed} />
            </View>
        )
    }
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
    }, logo: {
        width: wp('30%'),
        height: hp('8%'),
        resizeMode: 'contain'
    }, categoryContainer: {
        marginRight: wp('11%'),
        borderBottomWidth: hp('0.2%'),
    }
})

export default Search