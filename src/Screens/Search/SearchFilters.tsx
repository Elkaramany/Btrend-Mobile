import React from 'react'
import {
  View, Text, StyleSheet, Modal,
  TouchableWithoutFeedback, TouchableOpacity,
  ScrollView, Image
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import GradientText from '../../Components/GradientText';

import { useSelector, RootStateOrAny } from 'react-redux'

import { GlobalStyles, Colors, ImagePath, LanguagesArr, CategoriesArr } from '../../Config'
import { Filter } from './Types'
import { GoogleAutocomplete } from '../../Config/Utils/Google';

import Input from '../../Components/Input'
import RadioBtn from '../../Components/RadioBtn'
import GradientButton from '../../Components/GradientButton'
import Suggestions from '../../Components/Suggestions'
import FollowersEngagement from './FollowersEngagement'

interface Props {
  modalVisible: boolean
  hideModal: () => void
  filters: Filter
  changeFilter: (type: string, text: number | string | number[] | string[]) => void
  clearFilters: () => void
  pressedSearch: () => void
}


const BottomSheet: React.FC<Props> = ({ modalVisible, hideModal, filters, changeFilter, clearFilters, pressedSearch }) => {
  const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
  const isBrand = userType === "Brand"
  const [categoriesText, setCategoriesText] = React.useState('')
  const [locationsText, setLocationsText] = React.useState('')
  const [googlePlacesPredictions, setGooglePlacesPredictions] = React.useState<string[]>([])
  const [catArr, setCatArr] = React.useState<string[]>([])
  const [langText, setLangText] = React.useState('')
  const [langArr, setLangArr] = React.useState<string[]>([])

  React.useEffect(() => {
    changeFilter('categories', catArr)
  }, [catArr])

  React.useEffect(() => {
    //get places array from googleauto complete api based on the user's text
    async function fetchPlacesPredictions() {
      const predictions = await GoogleAutocomplete(locationsText)
      setGooglePlacesPredictions(predictions)
    }
    fetchPlacesPredictions()
  }, [locationsText])

  React.useEffect(() => {
    changeFilter('languages', langArr)
  }, [langArr])

  const validateFilters = () => {
    return true
  }

  const showBrandFilters = () => {
    if (isBrand) {
      return (
        <FollowersEngagement nof={filters.nof} engagementRate={filters.engagementRate} changeFilter={changeFilter} />
      )
    }
  }

  const searchWithFilters = () => {
    pressedSearch()
    hideModal()
  }

  const AddOrRemovePlatform = (platform: string) => {
    let newArr = []
    if (filters.platforms.includes(platform)) {
      newArr = filters.platforms.filter(plat => plat !== platform)
    } else {
      newArr = [...filters.platforms, platform]
    }
    changeFilter('platforms', newArr)
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
                <TouchableOpacity onPress={() => hideModal()}>
                  <Image source={ImagePath.blackCross} style={[GlobalStyles.arrowImage, { marginTop: hp('1%'), marginBottom: hp('3%') }]} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%') }]}>Advanced Search</Text>
                <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />
              </View>
              <View style={[GlobalStyles.horizontalLine, { width: '90%', marginTop: 0, marginBottom: hp('2%') }]} />

              <Input
                label={`${isBrand ? 'Influencer' : 'Brand'} Name`}
                value={filters.brand}
                onChangeText={(text) => changeFilter('brand', text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />

              <Input
                label={'Categories'}
                value={categoriesText}
                onChangeText={(text) => setCategoriesText(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />

              <Suggestions text={categoriesText} deleteText={() => setCategoriesText('')}
                SuggestionsArr={CategoriesArr} arr={catArr} setArr={setCatArr} />

              <Input
                label={'Language'}
                value={langText}
                onChangeText={(text) => setLangText(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 10 }}
              />

              <Suggestions text={langText} deleteText={() => setLangText('')}
                SuggestionsArr={LanguagesArr} arr={langArr} setArr={setLangArr} />

              {showBrandFilters()}
              <Input
                label={'Location'}
                value={locationsText}
                onChangeText={(text) => setLocationsText(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />

              <Suggestions text={locationsText} deleteText={() => setLocationsText('')}
                SuggestionsArr={googlePlacesPredictions} arr={filters.locations}
                setArr={(arr) => changeFilter('locations', arr)} />

              <Text style={[GlobalStyles.regularText, styles.priceRange, { marginBottom: hp('2%') }]}>Platforms</Text>
              <View style={[GlobalStyles.rowBetween, { width: '70%', alignSelf: 'flex-start', marginLeft: wp('5%') }]}>
                <TouchableOpacity onPress={() => AddOrRemovePlatform("instagram")}>
                  <Image
                    source={filters.platforms.includes("instagram") ? ImagePath.instagramCircleSelect : ImagePath.instagramCircleDeselect}
                    style={{ width: wp('10%'), height: wp('10%') }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddOrRemovePlatform("snapchat")}>
                  <Image
                    source={filters.platforms.includes("snapchat") ? ImagePath.snapchatCircleSelect : ImagePath.snapchatCircleDeselect}
                    style={{ width: wp('10%'), height: wp('10%') }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddOrRemovePlatform("tiktok")}>
                  <Image
                    source={filters.platforms.includes("tiktok") ? ImagePath.tiktokCircleSelect : ImagePath.tiktokCircleDeselect}
                    style={{ width: wp('10%'), height: wp('10%') }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => AddOrRemovePlatform("youtube")}>
                  <Image
                    source={filters.platforms.includes("youtube") ? ImagePath.youtubeCircleSelect : ImagePath.youtubeCircleDeselect}
                    style={{ width: wp('10%'), height: wp('10%') }}
                  />
                </TouchableOpacity>
              </View>

              <View style={[GlobalStyles.horizontalLine, { width: '90%', marginVertical: hp('2.5%') }]} />

              <Text style={[GlobalStyles.regularText, styles.priceRange, { marginBottom: hp('2%') }]}>Price range</Text>
              <View style={GlobalStyles.rowBetween}>
                <Input
                  type={'numeric'}
                  label={'$'}
                  value={filters.range[0] || 1}
                  onChangeText={(text) => changeFilter('range', [parseInt(text), filters.range[1]])}
                  inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />
                <Text style={[GlobalStyles.regularText, { marginHorizontal: wp('1%') }]}>???</Text>
                <Input
                  type={'numeric'}
                  label={'$'}
                  value={filters.range[1] || 100000}
                  onChangeText={(text) => changeFilter('range', [filters.range[0], parseInt(text)])}
                  inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />

              </View>

              <View style={[GlobalStyles.horizontalLine, { width: '90%', marginVertical: hp('2.5%') }]} />

              <Text style={[GlobalStyles.regularText, styles.priceRange, { marginBottom: hp('1%') }]}>Type of payment</Text>
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

              <View style={{ marginBottom: hp('5%'), alignItems: 'center', justifyContent: 'center' }}>
                <GradientButton text={'Search'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                  onPress={() => searchWithFilters()} buttonContainerStyle={{
                    width: wp('90%'),
                    marginHorizontal: wp('5%'), marginBottom: hp('1%'), paddingVertical: hp('1%')
                  }}
                  textStyle={{ fontSize: hp('2.5%') }}
                />
                <TouchableOpacity onPress={() => clearFilters()} style={{ flex: 1, padding: wp('3%'), width: '50%' }}>
                  <GradientText style={[GlobalStyles.regularText, { fontWeight: 'bold' }]} end={{ x: 1, y: 1 }}>Clear All</GradientText>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'flex-start',
    marginLeft: wp('5%')
  }, modalView: {
    marginTop: hp('15%'),
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
  }, modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }, priceRange: {
    alignSelf: 'flex-start',
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
    fontWeight: '600'
  },
});


export default BottomSheet