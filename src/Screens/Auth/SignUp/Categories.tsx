import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

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
            <ProgressBar progress={0.5} color={'red'} />
            <HeaderArrow headerText={"Categories"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />
            <ScrollView style={{ flexGrow: 1, height: hp('63%') }}>
                <View style={GlobalStyles.rowWrap}>
                    {CategoriesArr.map((item) => {
                        const isSelected = itemSelected(item, arr)
                        return (
                            <TouchableOpacity key={item}
                                style={[styles.mainButton, { backgroundColor: isSelected ? Colors.darkRed : Colors.primary }]}
                                onPress={() => setArr(selectItem(item, arr))}
                            >
                                <Text style={[GlobalStyles.regularText, { textAlign: 'center', textAlignVertical: 'center', color: isSelected ? Colors.primary : Colors.darkGray }]}>{item}</Text>
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
        borderWidth: hp('0.25%'),
        borderColor: Colors.mediumGray,
        borderRadius: wp('10%')
    }
})

export default Categories