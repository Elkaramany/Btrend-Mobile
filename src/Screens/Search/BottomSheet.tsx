import React from 'react'
import {
  View, Text, StyleSheet, Modal,
  TouchableWithoutFeedback, TouchableOpacity,
  ScrollView, Image
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useSelector, RootStateOrAny } from 'react-redux'

import { GlobalStyles, Colors, ImagePath, itemSelected, selectItem, Languages, CategoriesArr } from '../../Config'
import { Filter, getSuggesions } from './Types'

import Input from '../../Components/Input'
import RadioBtn from '../../Components/RadioBtn'
import GradientButton from '../../Components/GradientButton'

interface Props {
  modalVisible: boolean
  hideModal: () => void
  filters: Filter
  changeFilter: (type: string, text: number | string | number[]) => void
  clearFilters: () => void
}


const BottomSheet: React.FC<Props> = ({ modalVisible, hideModal, filters, changeFilter, clearFilters }) => {
  const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
  const [categoriesText, setCategoriesText] = React.useState('')
  const [catArr, setCatArr] = React.useState<string[]>([])
  const [langText, setLangText] = React.useState('')
  const [langArr, setLangArr] = React.useState<string[]>([])

  React.useEffect(() => {
    changeFilter('categories', catArr)
  }, [catArr])

  React.useEffect(() => {
    changeFilter('language', langArr)
  }, [langArr])

  const validateFilters = () => {
    return true
  }

  const pressedSearch = () => {

  }

  const showBrandFilters = () => {
    if (userType === "Brand") {
      return (
        <View style={{ width: '95%' }}>
          <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>Number of followers</Text>
          <View style={GlobalStyles.rowBetween}>
            <Input
              label=''
              type={'numeric'}
              value={filters.nof[0] || ""}
              onChangeText={(text) => changeFilter('nof', [parseInt(text), filters.nof[1]])}
              inputStyle={{ width: wp('40%'), marginBottom: 5 }}
            />
            <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>-</Text>
            <Input
              label=''
              type={'numeric'}
              value={filters.nof[1] || ""}
              onChangeText={(text) => changeFilter('nof', [filters.nof[0], parseInt(text)])}
              inputStyle={{ width: wp('40%'), marginBottom: 5 }}
            />
          </View>

          <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>Engagement rate</Text>
          <View style={GlobalStyles.rowBetween}>
            <Input
              label='%'
              type={'numeric'}
              value={filters.engagementRate[0] || ""}
              onChangeText={(text) => changeFilter('engagementRate', [parseFloat(text), filters.engagementRate[1]])}
              inputStyle={{ width: wp('40%'), marginBottom: 5 }}
            />
            <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>-</Text>
            <Input
              label='%'
              type={'numeric'}
              value={filters.engagementRate[1] || ""}
              onChangeText={(text) => changeFilter('engagementRate', [filters.engagementRate[0], parseFloat(text)])}
              inputStyle={{ width: wp('40%'), marginBottom: 5 }}
            />
          </View>
        </View>
      )
    }
  }

  const showSuggestions = (text: string, SuggestionsArr: string[], arr: string[], setArr: (value: string[]) => void) => {
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
                <Text style={[GlobalStyles.regularText, { fontSize: hp('2.5%') }]}>Filter</Text>
                <View style={styles.horizontalLine} />
                <TouchableOpacity onPress={() => hideModal()}>
                  <Image source={ImagePath.ic_crosss} style={[GlobalStyles.arrowImage, { height: wp('8%'), width: wp('8%') }]} />
                </TouchableOpacity>
              </View>
              <Input
                label={'Categories'}
                value={categoriesText}
                onChangeText={(text) => setCategoriesText(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />
              {showSuggestions(categoriesText, CategoriesArr, catArr, setCatArr)}
              <Input
                label={'Language'}
                value={langText}
                onChangeText={(text) => setLangText(text)}
                inputStyle={{ width: wp('90%'), marginBottom: 10 }}
              />
              {showSuggestions(langText, Languages, langArr, setLangArr)}
              {showBrandFilters()}
              <Input
                label={'Country'}
                value={filters.country}
                onChangeText={(text) => changeFilter('country', text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />
              <Input
                label={'City'}
                value={filters.city}
                onChangeText={(text) => changeFilter('city', text)}
                inputStyle={{ width: wp('90%'), marginBottom: 5 }}
              />
              <Text style={[GlobalStyles.regularText, styles.priceRange]}>Price range</Text>
              <Text style={[GlobalStyles.regularText, styles.priceRange, { color: Colors.darkGray }]}>{filters.range[0]} US$ - {filters.range[1]} US$</Text>
              <View style={{ marginVertical: hp('1%') }}>
                <MultiSlider
                  values={[filters.range[0], filters.range[1]]}
                  sliderLength={wp('80%')}
                  onValuesChange={(data: number[]) => changeFilter('range', data)}
                  min={10}
                  max={50000}
                  step={1000}
                />
              </View>
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
                <GradientButton text={'Search'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                  onPress={() => pressedSearch()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                />
                <GradientButton text={'Clear all'} colors={Colors.disabledButton}
                  onPress={() => clearFilters()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
                />
              </View>
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
  },
});


export default BottomSheet