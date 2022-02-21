import React from 'react'
import {
    View, Text,
    StyleSheet, Image, FlatList,
    TouchableOpacity, Modal, TouchableWithoutFeedback
} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { DatesType } from './types'

import StartEndDate from '../../Components/StartEndDate'
import { Colors, GlobalStyles, ImagePath } from '../../Config'
import GradientText from '../../Components/GradientText'

interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}

const DUMMY_DATA = [
    {
        campaignName: "Awesome campaign",
        brandName: "Very cool name",
        id: 5642314512,
        amount: 3000
    },
    {
        campaignName: "Awesome campaign2",
        brandName: "Very cool name2",
        id: 23131582,
        amount: 12000
    }
]


const Transactions: React.FC<Props> = ({ dates, setDates }) => {

    const [filterModal, setFilterModal] = React.useState(false)

    return (
        <>
            <View style={GlobalStyles.rowBetween}>
                <View style={{ width: '89%' }}>
                    <StartEndDate dates={dates} setDates={setDates} />
                </View>
                <View style={{ height: hp('3%'), width: wp('0.5%'), backgroundColor: Colors.gray }} />
                <TouchableOpacity onPress={() => setFilterModal(true)}>
                    <Image
                        source={ImagePath.filter}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={filterModal}
                onRequestClose={() => setFilterModal(false)}
            >
                <View style={[GlobalStyles.centeredContainer, { flex: 1 }]}>
                    <TouchableWithoutFeedback onPress={() => setFilterModal(false)}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalView}>

                        <View style={[GlobalStyles.rowBetween, { width: '100%' }]}>
                            <View />
                            <View style={[GlobalStyles.horizontalLine, { width: wp('15%'), backgroundColor: Colors.darkGray }]} />
                            <TouchableOpacity onPress={() => setFilterModal(false)}>
                                <Image source={ImagePath.ic_crosss} style={[GlobalStyles.arrowImage, { height: wp('8%'), width: wp('8%'), right: wp('3%') }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '70%' }}>
                            <TouchableOpacity style={{ marginVertical: hp('3%') }}>
                                <Text style={GlobalStyles.regularText}>
                                    All
                                </Text>
                            </TouchableOpacity>
                            <View style={GlobalStyles.horizontalLine} />
                            <TouchableOpacity style={{ marginVertical: hp('3%') }}>
                                <Text style={GlobalStyles.regularText}>
                                    Last Week
                                </Text>
                            </TouchableOpacity>
                            <View style={GlobalStyles.horizontalLine} />
                            <TouchableOpacity style={{ marginVertical: hp('3%') }}>
                                <Text style={GlobalStyles.regularText}>
                                    Last Month
                                </Text>
                            </TouchableOpacity>
                            <View style={GlobalStyles.horizontalLine} />
                            <TouchableOpacity style={{ marginVertical: hp('3%') }}>
                                <Text style={GlobalStyles.regularText}>
                                    Last 6 Months
                                </Text>
                            </TouchableOpacity>
                            <View style={GlobalStyles.horizontalLine} />
                            <TouchableOpacity style={{ marginVertical: hp('3%') }}>
                                <Text style={GlobalStyles.regularText}>
                                    Last Year
                                </Text>
                            </TouchableOpacity>
                            <View style={GlobalStyles.horizontalLine} />
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                contentContainerStyle={{ marginTop: hp('2%') }}
                data={DUMMY_DATA}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <>
                            <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1%') }]}>
                                <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', fontSize: hp('2%') }]}>{item.campaignName}</Text>
                                <GradientText style={{ fontWeight: 'bold', fontSize: hp('2.5%') }} end={{ x: 0.5, y: 0.5 }}>${item.amount}</GradientText>
                            </View>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray,  }]}>{item.brandName}</Text>
                            <View style={[GlobalStyles.horizontalLine, { width: '100%', marginVertical: hp('2%') }]} />
                        </>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    modalView: {
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
    },
})

export default Transactions