import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Modal, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles, Colors, ImagePath } from '../../Config'
import { Filter, INITIAL_FILTERS } from './Types'

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

  const validateFilters = () => {
    return true
  }

  const pressedSearch = () => {

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
              value={filters.categories}
              onChangeText={(text) => changeFilter('categories', text)}
              inputStyle={{ width: wp('90%'), marginBottom: 5 }}
            />
            <Input
              label={'Language'}
              value={filters.language}
              onChangeText={(text) => changeFilter('language', text)}
              inputStyle={{ width: wp('90%'), marginBottom: 10 }}
            />
            <TouchableOpacity
              style={[GlobalStyles.buttonContainer, styles.dateButton]}
              onPress={() => { }}
            >
              <Text style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.85%') }]}>
                {filters.top && filters.top.length ? filters.top : "Type of product"}
              </Text>
              <Image style={GlobalStyles.arrowImage} source={ImagePath.arrowRight} />
            </TouchableOpacity>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <GradientButton text={'Search'} colors={validateFilters() ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedSearch()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
              />
              <GradientButton text={'Clear all'} colors={Colors.disabledButton}
                onPress={() => clearFilters()} buttonContainerStyle={{ width: wp('40%'), marginHorizontal: wp('5%') }}
              />
            </View>

          </View>
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
  }
});


export default BottomSheet