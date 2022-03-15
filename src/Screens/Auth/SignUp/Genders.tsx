import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { TextInput } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack';
import * as RNLocalize from "react-native-localize";

import { Credential } from '../../../Redux/Actions'
import {
    Colors, GendersArr, GlobalStyles,
    conservativeCountries, semiGrayTextInputTheme
} from '../../../Config';

import Input from '../../../Components/Input'
import Container from '../../../Components/Container'
import { ImagePath } from '../../../Config'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import HeaderArrow from '../../../Components/HeaderArrow'

interface Props {
    navigation: StackNavigationProp<any, any>
}

const Genders: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [arr, setArr] = React.useState<string[]>([])
    const { gender } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [search, setSearch] = React.useState("")

    React.useEffect(() => {
        if (!conservativeCountries.includes(RNLocalize.getCountry())) {
            setArr(GendersArr)
        } else setArr(["Female", "Male"])
    }, [])

    React.useEffect(() => {
        const newData = GendersArr.filter(item => {
            const itemData = `${item.toLowerCase()}`;
            const textData = search.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setArr(newData)
    }, [search])

    const selectGender = (gen: string) => {
        dispatch(Credential({ prop: 'gender', value: gen }))
        navigation.goBack()
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={[GlobalStyles.rowBetween, { marginVertical: hp('1.5%') }]}
                onPress={() => selectGender(item)}>
                <Text style={[GlobalStyles.regularText, { marginLeft: wp('2%') }]}>{item}</Text>
                <Image source={gender == item ? ImagePath.selectedCircle : ImagePath.whiteCircle}
                    style={GlobalStyles.arrowImage}
                />
            </TouchableOpacity>
        )
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Select your Gender"} 
            textStyle={{fontWeight: '400', fontSize: hp('3.75%')}}
            navigateMeBack={() => navigation.goBack()} />
            <Input
                label=""
                placeHolder='Insert your gender'
                value={search}
                inputStyle={{ height: hp('4.5%') }}
                onChangeText={text => setSearch(text)}
                rightIcon={<TextInput.Icon size={17}
                    style={{ top: hp('0.5%') }}
                    name={search.length ? 'close' : ''} color={Colors.darkGray}
                    onPress={() => search.length ? setSearch('') : {}} />}
                theme={semiGrayTextInputTheme}
            />
            <FlatList
                data={arr}
                renderItem={renderItem}
                keyExtractor={gender => gender}
            />
            <View style={{ height: hp('5%') }} />
        </Container>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        borderBottomColor: Colors.gray,
        botderWidth: 0,
        borderBottomWidth: hp('0.15%'),
        paddingVertical: hp('2.5%'),
        borderRadius: hp('2%')
    },
})

export default Genders