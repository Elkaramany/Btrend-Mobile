import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, CategoriesArr, GlobalStyles, selectItem, itemSelected } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Categories: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [arr, setArr] = React.useState<string[]>([])

    const pressedContinue = () => {
        dispatch(Credential({ prop: 'categories', value: arr }))
        navigation.navigate("PhotosVideos")
    }

    return (
        <Container>
            <View style={GlobalStyles.rowBetween}>
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.brightRed }} />
                <View style={{ width: wp('25%'), height: hp('0.5%'), backgroundColor: Colors.gray }} />
            </View>
            <HeaderArrow headerText={"Categories"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />
            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('3%') }]}>
                Add up to <Text style={{ fontWeight: 'bold', color: Colors.secondary }}> 5 categories</Text> 
                of your business & products you are aligned with
            </Text>

            <ScrollView style={{ flexGrow: 1, height: hp('58%') }}>
                <View style={GlobalStyles.rowWrap}>
                    {CategoriesArr.map((item) => {
                        //@ts-ignore
                        const isSelected = itemSelected(item, arr)
                        return (
                            <TouchableOpacity key={item}
                                style={[styles.mainButton, { backgroundColor: isSelected ? Colors.brightRed : Colors.primary }]}
                                onPress={() => setArr(selectItem(item, arr))}
                            >
                                <Text style={[GlobalStyles.regularText, {
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    color: isSelected ? Colors.primary : Colors.darkGray,
                                    fontWeight: isSelected ? 'bold' : 'normal'
                                }]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <GradientButton text={'Continue'} colors={Colors.gradientButton}
                onPress={() => pressedContinue()}
            />
        </Container >
    )
}

const styles = StyleSheet.create({
    mainButton: {
        padding: hp('1%'),
        paddingHorizontal: wp('3%'),
        marginVertical: hp('1%'),
        marginHorizontal: wp('3%'),
        justifyContent: 'center',
        borderRadius: wp('10%')
    }
})

export default Categories