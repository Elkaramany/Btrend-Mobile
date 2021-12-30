import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles } from '../../Config'

import Input from '../../Components/Input'

interface Props {
    nof: number[]
    engagementRate: number[]
    changeFilter: (type: string, text: number | string | number[]) => void
}

const Name: React.FC<Props> = ({ nof, engagementRate, changeFilter }) => {
    return (
        <View style={{ width: '95%' }}>
            <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>Number of followers</Text>
            <View style={GlobalStyles.rowBetween}>
                <Input
                    label=''
                    type={'numeric'}
                    value={nof[0] || ""}
                    onChangeText={(text: string) => changeFilter('nof', [parseInt(text), nof[1]])}
                    inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />
                <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>-</Text>
                <Input
                    label=''
                    type={'numeric'}
                    value={nof[1] || ""}
                    onChangeText={(text: string) => changeFilter('nof', [nof[0], parseInt(text)])}
                    inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />
            </View>

            <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>Engagement rate</Text>
            <View style={GlobalStyles.rowBetween}>
                <Input
                    label='%'
                    type={'numeric'}
                    value={engagementRate[0] || ""}
                    onChangeText={(text: string) => changeFilter('engagementRate', [parseFloat(text), engagementRate[1]])}
                    inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />
                <Text style={[GlobalStyles.regularText, { fontWeight: '600', textAlign: 'center' }]}>-</Text>
                <Input
                    label='%'
                    type={'numeric'}
                    value={engagementRate[1] || ""}
                    onChangeText={(text: string) => changeFilter('engagementRate', [engagementRate[0], parseFloat(text)])}
                    inputStyle={{ width: wp('40%'), marginBottom: 5 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Name