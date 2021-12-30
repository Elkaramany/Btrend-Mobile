import React from 'react'
import {
    View, Text, StyleSheet, Modal,
    TouchableWithoutFeedback, TouchableOpacity,
    ScrollView, Image
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { useSelector, RootStateOrAny } from 'react-redux'

import { GlobalStyles, Colors, ImagePath, selectItem, handleSelection, CategoriesArr } from '../../Config'
import { addFilter, getSuggesions } from './Types'

import Input from '../../Components/Input'
import RadioBtn from '../../Components/RadioBtn'
import GradientButton from '../../Components/GradientButton'
import Header from '../../Components/Header'
import FollowersEngagement from './FollowersEngagement'

interface Props {
    modalVisible: boolean
    hideModal: () => void
}

const INITIAL_FILTERS = {
    name: '', startingDate: '', endingDate: '', categories: [],
    aim: '',
    price: 1500,
    payment: '',
    type: '',
    need: '',
    gender: '',
    nof: [1000, 100000],
    engagementRate: [0.5, 4.5],
    location: '',
    photo: '',
}


const AddCampaign: React.FC<Props> = ({ modalVisible, hideModal }) => {
    const [index, setIndex] = React.useState(0)
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [categoriesText, setCategoriesText] = React.useState('')
    const [filters, setFilters] = React.useState<addFilter>(INITIAL_FILTERS)

    const changeFilter = (type: string, text: string | number | number[] | string[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    const clearFilters = () => {
        setIndex(0)
        setFilters(INITIAL_FILTERS)
    }

    const validateFilters = () => {
        return true
    }

    const pressedCreate = () => {

    }

    const showSuggestions = (text: string, SuggestionsArr: any, arr: string[], setArr: (value: string[]) => void) => {
        if (text && text.length) {
            return (
                <View>
                    <View style={GlobalStyles.rowWrap}>
                        {getSuggesions(text, SuggestionsArr).map((item) => {
                            if (!arr.includes(item)) {
                                return (
                                    <TouchableOpacity key={item}
                                        style={styles.suggestionsContainer}
                                        onPress={() => setArr(selectItem(item, arr))}
                                    >
                                        <Text style={[GlobalStyles.regularText, { textAlign: 'center', textAlignVertical: 'center', color: Colors.darkGray }]}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </View>
                    <View style={GlobalStyles.rowWrap}>
                        {arr.map((item) => {
                            return (
                                <TouchableOpacity key={item}
                                    style={[styles.suggestionsContainer, { backgroundColor: Colors.darkRed, borderWidth: 0 }]}
                                    onPress={() => setArr(selectItem(item, arr))}
                                >
                                    <Text style={[GlobalStyles.regularText, { textAlign: 'center', textAlignVertical: 'center', color: Colors.primary }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            )
        }
    }

    const showCampaignPart = () => {
        if (index === 0) {
            return (
                <>
                    <Header headerText={'1 Campaign Info'} headerStyle={{ height: hp('7%') }} textStyle={{ color: Colors.darkRed, fontWeight: '500' }} />
                    <Input
                        label={'Name of the campaign'}
                        value={filters.name}
                        onChangeText={(text) => changeFilter('name', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Input
                        label={'Categories'}
                        value={categoriesText}
                        onChangeText={(text) => setCategoriesText(text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    {showSuggestions(categoriesText, CategoriesArr, filters.categories, (arr) => changeFilter('categories', arr))}
                    <Input
                        multiline={true}
                        dense={true}
                        label={'Aim of the campaign'}
                        value={filters.aim}
                        onChangeText={(text) => changeFilter('aim', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                    />
                    <Input
                        type={'numeric'}
                        label={'Price'}
                        value={filters.price}
                        onChangeText={(text) => changeFilter('price', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Text style={[GlobalStyles.regularText, styles.priceRange]}>Type of payment</Text>
                    <View style={{ marginTop: hp('2%'), flexDirection: 'row', width: wp('80%'), justifyContent: 'space-around', alignItems: 'center', marginBottom: hp('3%') }}>
                        <RadioBtn
                            text={"In-Kind"}
                            selected={filters.payment === "In-Kind"}
                            onPress={() => changeFilter('payment', "In-Kind")}
                        />
                        <RadioBtn
                            text={"Other"}
                            selected={filters.payment === "Other"}
                            onPress={() => changeFilter('payment', "Other")}
                        />
                    </View>
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%') }]}>
                        <GradientButton text={'Next'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                            onPress={() => setIndex(index + 1)} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                        />
                        <GradientButton text={'Clear all'} colors={Colors.disabledButton}
                            onPress={() => clearFilters()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                        />
                    </View>
                </>
            )
        } else if (index === 1) {
            return (
                <>
                    <Header headerText={'2 Influencer Info'} headerStyle={{ height: hp('7%') }} textStyle={{ color: Colors.darkRed, fontWeight: '500' }} />
                    <Input
                        multiline={true}
                        dense={true}
                        label={'What type of influencers are you looking for?'}
                        value={filters.type}
                        onChangeText={(text) => changeFilter('type', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                    />
                    <Input
                        multiline={true}
                        dense={true}
                        label={'What does the influencer need to do?'}
                        value={filters.need}
                        onChangeText={(text) => changeFilter('need', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                    />
                    <Text style={[GlobalStyles.regularText, styles.priceRange]}>Gender</Text>
                    <View style={{ marginTop: hp('2%'), flexDirection: 'row', width: wp('80%'), justifyContent: 'space-around', alignItems: 'center', marginBottom: hp('3%') }}>
                        <RadioBtn
                            text={"Male"}
                            selected={filters.gender === "Male"}
                            onPress={() => changeFilter('gender', "Male")}
                        />
                        <RadioBtn
                            text={"Female"}
                            selected={filters.gender === "Female"}
                            onPress={() => changeFilter('gender', "Female")}
                        />
                    </View>
                    <FollowersEngagement nof={filters.nof} engagementRate={filters.engagementRate} changeFilter={changeFilter} />
                    <Input
                        label={'Location'}
                        value={filters.location}
                        onChangeText={(text) => changeFilter('location', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%'), marginTop: hp('1%') }]}>
                        <GradientButton text={'Next'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                            onPress={() => setIndex(index + 1)} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                        />
                        <GradientButton text={'Clear all'} colors={Colors.disabledButton}
                            onPress={() => clearFilters()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                        />
                    </View>
                </>
            )
        } else {
            return (
                <>
                    <Header headerText={'3 Final step'} headerStyle={{ height: hp('7%') }} textStyle={{ color: Colors.darkRed, fontWeight: '500' }} />
                    <TouchableOpacity style={styles.addProfile}
                        onPress={() => handleImage()}
                    >
                        <Image source={filters.photo && filters.photo.length ? { uri: filters.photo } : ImagePath.profileAdd} style={styles.imageStyle} />
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('10%') }]}>Add a campaign photo</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('5%') }}>
                        <GradientButton text={'Create campaign'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                            onPress={() => pressedCreate()} buttonContainerStyle={{ width: wp('70%'), marginHorizontal: wp('5%'), }}
                        />
                    </View>
                </>
            )
        }
    }

    const handleImage = async () => {
        const image: string | null = await handleSelection()
        if (image) changeFilter('photo', image)
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => hideModal()}
            >
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={() => hideModal()}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <ScrollView style={{ flexGrow: 1, height: hp('100%') }} onScroll={(e) => e.nativeEvent.contentOffset.y < 0 ? hideModal() : {}}>
                        <View style={styles.modalView}>

                            <View style={styles.header}>
                                <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%') }]}>New campaign</Text>
                                <View style={styles.horizontalLine} />
                                <TouchableOpacity onPress={() => hideModal()}>
                                    <Image source={ImagePath.ic_crosss} style={[GlobalStyles.arrowImage, { height: wp('8%'), width: wp('8%') }]} />
                                </TouchableOpacity>
                            </View>
                            {showCampaignPart()}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80%'),
        marginBottom: hp('1%'),
    }, horizontalLine: {
        height: hp('0.3%'),
        width: wp('10%'),
        backgroundColor: Colors.darkGray
    },
    modalView: {
        marginTop: hp('30%'),
        height: '100%',
        width: wp('100%'),
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: wp('1%'),
        paddingTop: hp('1.5%'),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }, modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }, dateButton: {
        paddingVertical: hp('2%'),
        borderColor: Colors.secondary,
        width: wp('90%'),
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceRange: {
        alignSelf: 'flex-start',
        marginTop: hp('1%'),
        marginLeft: wp('5%')
    }, priceRangeStyle: {
        height: hp('10%'),
        width: wp('80%'),
        resizeMode: 'contain'
    }, suggestionsContainer: {
        backgroundColor: Colors.primary,
        padding: hp('0.5%'),
        paddingHorizontal: wp('2%'),
        ...GlobalStyles.rowBetween,
        justifyContent: 'center',
        margin: wp('1%'),
        borderWidth: hp('0.25%'),
        borderColor: Colors.mediumGray,
        borderRadius: wp('10%')
    }, addProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%')
    }, imageStyle: {
        width: wp('30%'),
        height: wp('30%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    },
});


export default AddCampaign