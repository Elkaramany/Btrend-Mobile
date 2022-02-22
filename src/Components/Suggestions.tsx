import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { GlobalStyles, getSuggesions, selectItem, Colors } from '../Config'

interface Props {
    text: string
    SuggestionsArr: any[]
    arr: string[]
    setArr: (value: string[]) => void
}

const Suggestions: React.FC<Props> = ({ text, SuggestionsArr, arr, setArr }) => {
    if (text && text.length) {
        return (
            <View>
                <View style={GlobalStyles.rowWrap}>
                    {getSuggesions(text, SuggestionsArr).map((item) => {
                        if (!arr.includes(item)) {
                            return (
                                <TouchableOpacity key={item}
                                    style={styles.container}
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
                                style={[styles.container, { backgroundColor: Colors.brightRed, borderWidth: 0 }]}
                                onPress={() => setArr(selectItem(item, arr))}
                            >
                                <Text style={[GlobalStyles.regularText, { textAlign: 'center', textAlignVertical: 'center', color: Colors.primary }]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }return <View />
}


const styles = StyleSheet.create({
    container: {
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
})

export default Suggestions