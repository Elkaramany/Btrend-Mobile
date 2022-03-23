import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'


import { GlobalStyles, Colors, ImagePath } from '../../Config'

interface Props {

}

const Eearnings: React.FC<Props> = () => {
    const [modal, setModal] = React.useState(false)
    const [date, setDate] = React.useState<any>(new Date().getFullYear().toString())

    function generateArrayOfYears() {
        let max = new Date().getFullYear()
        let min = max - 10
        let years = []

        for (let i = max; i >= min; i--) {
            years.push(i)
        }
        return years
    }

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={Colors.gradientButton}
                style={styles.mainContainer}
            >
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={[GlobalStyles.regularText, { color: Colors.primary, left: wp('7%') }]}>
                        How much I've earned
                    </Text>
                    <Text style={[GlobalStyles.regularText,
                    { color: Colors.primary, fontWeight: 'bold', fontSize: hp('4%'), left: wp('7%'), top: hp('1%') }]}>
                        $100
                    </Text>
                </View>
            </LinearGradient>

            <View style={styles.chartContainer}>

                <View style={{ marginHorizontal: wp('5%'), marginVertical: hp('2%') }}>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('2.25%') }]}>Growth Chart</Text>
                    <View style={[GlobalStyles.horizontalLine, { marginTop: hp('2%') }]} />
                </View>

                <View style={styles.dateContainer}>
                    <TouchableOpacity
                        style={GlobalStyles.rowBetween}
                        onPress={() => setModal(true)}
                    >
                        <Text
                            style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.75%'), color: Colors.inputGray }]}>
                            {date}
                        </Text>

                        <Image
                            source={ImagePath.calendar}
                            style={{ width: wp('5%'), height: wp('5%'), resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal}
                        onRequestClose={() => setModal(false)}
                    >
                        <View style={[{ flex: 1 }, GlobalStyles.centeredContainer]}>
                            <FlatList
                                data={generateArrayOfYears()}
                                keyExtractor={(item, index) => `${item}${index}`}
                                renderItem={({ item }) => {
                                    return (
                                        <Text>{item}</Text>
                                    )
                                }}
                            />
                        </View>
                    </Modal>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: hp('14%'),
        borderRadius: hp('3%'),
        justifyContent: 'center',
        marginVertical: hp('2.5%')
    }, chartContainer: {
        marginTop: hp('1%'),
        backgroundColor: Colors.primary,
        borderRadius: wp('5%'),
        flex: 1,
        marginBottom: hp('2%')
    }, dateContainer: {
        alignSelf: 'center',
        borderWidth: hp('0.2%'),
        borderColor: Colors.inputGray,
        borderRadius: wp('10%'),
        paddingVertical: hp('1.25%'),
        paddingHorizontal: wp('3%'),
        width: '90%'
    }
})

export default Eearnings