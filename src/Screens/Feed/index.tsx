import React from 'react'
import {
    View, StyleSheet, Image, Text,
    TouchableOpacity,
    FlatList, Modal,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_FILTERS } from '../Search/Types';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import { GlobalStyles, ImagePath, Colors, CategoriesArr } from '../../Config'
import { SearchFeed } from '../../Redux/Actions'

import Container from '../../Components/Container'
import Match from './Match'
import Feed from './Feed';
import GradientButton from '../../Components/GradientButton'

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: any
}


const Search: React.FC<Props> = ({ navigation, route }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { fetchedArray } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const [showTutorial, setShowTutorial] = React.useState(false)
    const [tutorial, setTutorial] = React.useState({
        icon: ImagePath.wave,
        title: "Let's get you ready!",
        titleColor: Colors.primary,
        hasJourney: true,
        onSkip: () => setShowTutorial(false)
    })
    const [arr, setArr] = React.useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([])
    const [hasMatch, setHasMatch] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        async function fetchFirstUse() {
            //Only show the tutorial of how the feed screen if it's ther user's first time opening the app
            const val = await firstUse()
            if (val) {
                setShowTutorial(true)
                try {
                    //Save the first use
                    await AsyncStorage.setItem('first_time', JSON.stringify(true))
                } catch (e) {
                }
            }
        }

        fetchFirstUse()
    }, [])

    //Check if it's the first time using the app
    const firstUse = async () => {
        try {
            const value = await AsyncStorage.getItem('first_time')
            if (value !== null) return false
        } catch (e) {
            // error reading value
        }
        return true
    }

    const nextTutorial = () => {
        setTutorial({
            icon: ImagePath.swipeRight,
            title: "Swipe right to like",
            titleColor: '#a4feaf',
            hasJourney: false,
            onSkip: () => setTutorial({
                icon: ImagePath.swipeLeft,
                title: "Swipe left to pass",
                titleColor: '#e77568',
                hasJourney: false,
                onSkip: () => setShowTutorial(false)
            })
        })
    }

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

    //If the user matched with people navigate their and display the data there using the array, still needs to be configured completely
    if (hasMatch) {
        return <Match hasMatch={() => setHasMatch(false)} navigation={navigation} matches={fetchedArray.matches} />
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
                    <Modal
                        visible={showTutorial}
                        transparent={true}
                        onRequestClose={() => setShowTutorial(false)}
                        animationType={"slide"}
                    >
                        <View style={styles.modalContent}>
                            {tutorial.hasJourney && <Image source={ImagePath.wave} style={GlobalStyles.arrowImage} />}
                            <Text style={[GlobalStyles.regularText,
                            { color: tutorial.titleColor, bottom: tutorial.hasJourney ? hp('3%') : 0, fontSize: hp('2.25%') }]}>
                                {tutorial.title}
                            </Text>
                            {tutorial.hasJourney ?
                                <GradientButton text={'Start Journey'}
                                    colors={Colors.gradientButton}
                                    buttonContainerStyle={{ width: wp('70%') }}
                                    onPress={() => nextTutorial()}
                                />
                                :
                                <Image source={tutorial.icon}
                                    style={{ width: wp('10%'), height: wp('10%'), resizeMode: 'contain' }} />
                            }

                            <TouchableOpacity onPress={() => tutorial.onSkip()}>
                                <Text style={[GlobalStyles.regularText,
                                { textDecorationLine: 'underline', color: Colors.primary, bottom: hp('2%') }]}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

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
    }, modalContent: {
        position: 'absolute',
        top: 0,
        width: '95%',
        height: '38%',
        marginTop: hp('18%'),
        borderRadius: wp('5%'),
        marginHorizontal: wp('2.5%'),
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
})

export default Search