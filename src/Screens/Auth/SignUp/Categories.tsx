import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, CategoriesArr, GlobalStyles } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

interface ArrItem {
    item: string
}

const Categories: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [verified, setVerified] = React.useState(false)
    const [arr, setArr] = React.useState<string[]>([])
    const { categories } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {
        dispatch(Credential({ prop: 'categories', value: arr }))
        navigation.navigate("PhotosVideos")
    }

    const addCategory = (item: string) => {
        //Item already selected so remove it
        if (categoryAdded(item)) {
            let newArr = [...arr]
            newArr = newArr.filter(i => i !== item);
            setArr(newArr)
        } else {
            //Only have 5 catefories max
            if (arr.length <= 4) {
                const newArr = [...arr]
                newArr.push(item)
                setArr(newArr)
            }
        }
    }

    const categoryAdded = (cat: string) => {
        if (arr && arr.length && arr.includes(cat)) return true
        return false
    }

    const renderItem = (item: ArrItem) => {
        const isAdded = categoryAdded(item.item)
        return (
            <TouchableOpacity onPress={() => addCategory(item.item)}
                style={[styles.mainButton, { backgroundColor: isAdded ? Colors.darkRed : Colors.primary }]}>
                <Text style={[GlobalStyles.regularText, { color: isAdded ? Colors.primary : Colors.darkGray }]}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <ProgressBar progress={0.5} color={'red'} />
            <HeaderArrow headerText={"Categories"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />
            <View style={{ height: hp('63%') }}>
                <FlatList
                    numColumns={2}
                    data={CategoriesArr}
                    renderItem={renderItem}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}
                    keyExtractor={cat => cat}
                />
            </View>
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
        justifyContent: 'space-between',
        borderWidth: hp('0.25%'),
        borderColor: Colors.mediumGray,
        borderRadius: wp('10%')
    }
})

export default Categories