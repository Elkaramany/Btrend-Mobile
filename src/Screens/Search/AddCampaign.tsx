import React from 'react'
import {
    View, Text, StyleSheet, Modal,
    TouchableWithoutFeedback, TouchableOpacity,
    ScrollView, Image, Alert
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import {
    GlobalStyles,
    Colors, ImagePath, handleSelection, formatDate,
    CategoriesArr, validateName, Languages
} from '../../Config'
import { AddFilter, CAMPAIGN_INITIAL_FILTERS } from './Types'
import { GoogleAutocomplete } from '../../Config/Utils/Google'
import { CreateCampaign } from '../../Redux/Actions'

import Input from '../../Components/Input'
import RadioBtn from '../../Components/RadioBtn'
import GradientButton from '../../Components/GradientButton'
import Header from '../../Components/Header'
import Suggestions from '../../Components/Suggestions'
import FollowersEngagement from './FollowersEngagement'

interface Props {
    modalVisible: boolean
    hideModal: () => void
}

const AddCampaign: React.FC<Props> = ({ modalVisible, hideModal }) => {
    const [index, setIndex] = React.useState(0)
    const [otherPayment, setOtherPayment] = React.useState(false)
    const [categoriesText, setCategoriesText] = React.useState('')
    const [langText, setLangText] = React.useState('')
    const [locationsText, setLocationsText] = React.useState('')
    const [googlePlacesPredictions, setGooglePlacesPredictions] = React.useState<string[]>([])
    const { token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [startDate, setStartDate] = React.useState(false)
    const [endDate, setEndDate] = React.useState(false)
    const [filters, setFilters] = React.useState<AddFilter>({ ...CAMPAIGN_INITIAL_FILTERS, token })

    const dispatch = useDispatch()

    const changeFilter = (type: string, text: string | number | number[] | string[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    const clearFilters = () => {
        setIndex(0)
        setFilters({ ...CAMPAIGN_INITIAL_FILTERS, token })
    }

    const setDate = (type: string, date: Date) => {
        if (type === "startingDate") setStartDate(false)
        else setEndDate(false)

        changeFilter(type, formatDate(date))
    }

    React.useEffect(() => {
        async function fetchPlacesPredictions() {
            const predictions = await GoogleAutocomplete(locationsText)
            setGooglePlacesPredictions(predictions)
        }
        fetchPlacesPredictions()
    }, [locationsText])

    const validateFilters = () => {
        if (index === 0) {
            if (validateName(filters.name) && validateName(filters.aim) && validateName(filters.startingDate)
                && validateName(filters.endingDate) && validateName(filters.price.toString())
                && filters.categories.length && validateName(filters.payment)) {
                return true
            } else return false
        } else if (index === 1) {
            if (validateName(filters.type) && validateName(filters.need) && filters.location.length
                && validateName(filters.gender) && !isNaN(filters.nof[0])
                && !isNaN(filters.nof[1]) && !isNaN(filters.engagementRate[0])
                && !isNaN(filters.engagementRate[1])
            ) {
                return true
            } else return false
        }
        return false
    }

    const pressedNext = () => {
        if (validateFilters()) {
            if (filters.endingDate <= filters.startingDate) {
                Alert.alert("Your campaign's ending date must be after your starting one.")
            } else setIndex(index + 1)
        }
    }

    const pressedCreate = () => {
        if (!filters.photo.length) {
            Alert.alert("Please attache a campaign photo")
        } else {
            dispatch(CreateCampaign(filters))
            hideModal()
        }
    }

    const defaultPayment = (val: boolean) => {
        if (val) {
            setOtherPayment(false)
            changeFilter('payment', "In-Kind")
        } else {
            setOtherPayment(true)
            changeFilter('payment', "")
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
                    <View style={GlobalStyles.rowBetween}>
                        <View>
                            <TouchableOpacity
                                style={[GlobalStyles.buttonContainer, styles.dateButton]}
                                onPress={() => setStartDate(true)}
                            >
                                <Text style={[GlobalStyles.regularText, { textAlign: 'center', fontSize: hp('1.85%') }]}>{filters.startingDate.length ? filters.startingDate : "Starting date"}</Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                date={filters.startingDate.length ? new Date(filters.startingDate) : new Date()}
                                isVisible={startDate}
                                mode="date"
                                onConfirm={(date) => setDate("startingDate", date)}
                                onCancel={() => setStartDate(false)}
                            />
                        </View>
                        <Text style={GlobalStyles.regularText}>-</Text>
                        <View>
                            <TouchableOpacity
                                style={[GlobalStyles.buttonContainer, styles.dateButton]}
                                onPress={() => setEndDate(true)}
                            >
                                <Text style={[GlobalStyles.regularText, { textAlign: 'center', fontSize: hp('1.85%') }]}>{filters.endingDate.length ? filters.endingDate : "Ending date"}</Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                date={filters.endingDate.length ? new Date(filters.endingDate) : new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000))}
                                isVisible={endDate}
                                mode="date"
                                onConfirm={(date) => setDate("endingDate", date)}
                                onCancel={() => setEndDate(false)}
                            />
                        </View>
                    </View>
                    <Input
                        label={'Categories'}
                        value={categoriesText}
                        onChangeText={(text) => setCategoriesText(text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Suggestions text={categoriesText} SuggestionsArr={CategoriesArr} arr={filters.categories} setArr={(arr) => changeFilter('categories', arr)} />
                    <Input
                        label={'Language(s)'}
                        value={langText}
                        onChangeText={(text) => setLangText(text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Suggestions text={langText} SuggestionsArr={Languages} arr={filters.language} setArr={(arr) => changeFilter('language', arr)} />
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
                        label={'Price in USD'}
                        value={filters.price}
                        onChangeText={(text) => changeFilter('price', text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Text style={[GlobalStyles.regularText, styles.priceRange]}>Type of payment</Text>
                    <View style={{ marginTop: hp('2%'), flexDirection: 'row', width: wp('80%'), justifyContent: 'space-around', alignItems: 'center', marginBottom: hp('3%') }}>
                        <RadioBtn
                            text={"In-Kind"}
                            selected={filters.payment === "In-Kind"}
                            onPress={() => defaultPayment(true)}
                        />
                        <RadioBtn
                            text={"Other"}
                            selected={filters.payment === "Other"}
                            onPress={() => defaultPayment(false)}
                        />
                    </View>
                    {otherPayment &&
                        <Input
                            multiline={true}
                            dense={true}
                            label={'Please specify your other payment options'}
                            value={filters.payment}
                            onChangeText={(text) => changeFilter('payment', text)}
                            inputStyle={{ width: wp('90%'), marginBottom: 10, height: hp('5%') }}
                        />
                    }
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%') }]}>
                        <GradientButton text={'Next'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                            onPress={() => pressedNext()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
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
                        value={locationsText}
                        onChangeText={(text) => setLocationsText(text)}
                        inputStyle={{ width: wp('90%'), marginBottom: 5 }}
                    />
                    <Suggestions text={locationsText} SuggestionsArr={googlePlacesPredictions} arr={filters.location} setArr={(arr) => changeFilter('location', arr)} />

                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%'), marginTop: hp('1%') }]}>
                        <GradientButton text={'Next'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                            onPress={() => pressedNext()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
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
                    <Header headerText={'3 Final step'} headerStyle={{ height: hp('5%') }} textStyle={{ color: Colors.darkRed, fontWeight: '500' }} />
                    <TouchableOpacity style={styles.addProfile}
                        onPress={() => handleImage()}
                    >
                        <Image source={filters.photo && filters.photo.length ? { uri: filters.photo } : ImagePath.profileAdd} style={styles.imageStyle} />
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('10%') }]}>Add a campaign photo</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('5%') }}>
                        <GradientButton text={'Create campaign'} colors={Colors.gradientButton}
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

    const goToPreviousStep = () => {
        if (index > 0) setIndex(index - 1)
    }

    return (
        <View style={[GlobalStyles.centeredContainer, { flex: 1 }]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => hideModal()}
            >
                <View style={[GlobalStyles.centeredContainer, { flex: 1 }]}>
                    <TouchableWithoutFeedback onPress={() => hideModal()}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <ScrollView style={{ flexGrow: 1, height: hp('100%') }} onScroll={(e) => e.nativeEvent.contentOffset.y < 0 ? hideModal() : {}}>
                        <View style={styles.modalView}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => goToPreviousStep()}>
                                    <Image source={index > 0 ? ImagePath.leftArrow : ImagePath.arrowBack} style={GlobalStyles.arrowImage} />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.horizontalLine} />
                                    <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%') }]}>New campaign</Text>
                                </View>
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
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: wp('30%'),
        width: wp('90%'),
        marginBottom: hp('1%'),
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
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }, dateButton: {
        paddingVertical: hp('2%'),
        borderColor: Colors.secondary,
        width: wp('38%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: wp('5%'),
        marginBottom: 5,
        flexDirection: 'row',
        marginTop: hp('0.5%')
    },
    priceRange: {
        alignSelf: 'flex-start',
        marginTop: hp('1%'),
        marginLeft: wp('5%')
    }, addProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        top: hp('10%'),
        marginBottom: hp('3%')
    }, imageStyle: {
        width: wp('30%'),
        height: wp('30%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    }, horizontalLine: {
        height: hp('0.3%'),
        width: wp('10%'),
        backgroundColor: Colors.darkGray
    },
});


export default AddCampaign