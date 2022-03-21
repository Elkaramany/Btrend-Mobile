import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { GlobalStyles, getSuggesions, selectItem, Colors } from '../Config'

interface Props {
    text: string
    SuggestionsArr: any[]
    arr: string[]
    setArr: (value: string[]) => void
    deleteText: () => void
}

const Suggestions: React.FC<Props> = ({ text, deleteText, SuggestionsArr, arr, setArr }) => {

    const AddItem = (item: string, arr: string[]) => {
        setArr(selectItem(item, arr))
        deleteText()
    }

    const ViewSuggestions = () => {
        if (text && text.length) {
            return (
                <View style={GlobalStyles.rowWrap}>
                    {getSuggesions(text, SuggestionsArr).map((item) => {
                        if (!arr.includes(item)) {
                            return (
                                <TouchableOpacity key={item}
                                    style={styles.container}
                                    onPress={() => AddItem(item, arr)}
                                >
                                    <Text
                                        style={[GlobalStyles.regularText,
                                        { textAlign: 'center', textAlignVertical: 'center', color: Colors.darkGray }]}>
                                        {item}</Text>
                                </TouchableOpacity>
                            )
                        }
                    })}
                </View>
            )
        }
        return <View />
    }

    return (
        <>
            {ViewSuggestions()}
            <View style={GlobalStyles.rowWrap}>
                {arr.map((item) => {
                    return (
                        <TouchableOpacity key={item}
                            style={[styles.container, { backgroundColor: Colors.brightRed, borderWidth: 0 }]}
                            onPress={() => AddItem(item, arr)}
                        >
                            <Text
                                style={[GlobalStyles.regularText,
                                { textAlign: 'center', textAlignVertical: 'center', color: Colors.primary }]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: hp('1%'),
        paddingHorizontal: wp('3%'),
        ...GlobalStyles.rowBetween,
        justifyContent: 'center',
        margin: wp('1%'),
        borderWidth: hp('0.25%'),
        borderColor: Colors.mediumGray,
        borderRadius: wp('10%')
    },
})

export default Suggestions