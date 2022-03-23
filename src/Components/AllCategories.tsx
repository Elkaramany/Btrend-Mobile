import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { CategoriesArr, GlobalStyles, Colors, selectItem, itemSelected } from '../Config'

interface Props {
    setArr: (arr: string[]) => void
    arr: string[]
}

const AllCategories: React.FC<Props> = ({ setArr, arr }) => {

    return (
        <ScrollView style={{ flexGrow: 1, height: hp('58%') }}>
            <View style={[GlobalStyles.rowWrap, { justifyContent: 'flex-start', right: wp('1%') }]}>
                {CategoriesArr.map((item) => {
                    //@ts-ignore
                    const isSelected = itemSelected(item, arr)
                    return (
                        <TouchableOpacity key={item}
                            style={[styles.mainButton,
                            {
                                backgroundColor: isSelected ? Colors.brightRed : Colors.primary,
                                borderColor: Colors.gray,
                                borderWidth: !isSelected ? wp('0.25%') : 0,
                            }]}
                            //@ts-ignore
                            onPress={() => setArr(selectItem(item, arr))}
                        >
                            <Text style={[GlobalStyles.regularText, {
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                color: isSelected ? Colors.primary : Colors.gray,
                                fontWeight: isSelected ? 'bold' : 'normal'
                            }]}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        paddingVertical: hp('1.2%'),
        paddingHorizontal: wp('3%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('1.25%'),
        borderRadius: wp('10%')
    }
})
export default AllCategories