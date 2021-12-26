import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { TextInput } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack';

import { Credential } from '../../../Redux/Actions'
import { Colors, Gender, GlobalStyles } from '../../../Config';

import Input from '../../../Components/Input'
import Container from '../../../Components/Container'
import { ImagePath } from '../../../Config'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
    navigation: StackNavigationProp<any, any>
}

interface ArrItem {
    item: string
}

const Genders: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [arr, setArr] = React.useState(Gender)
    const { gender } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [search, setSearch] = React.useState("")

    const renderItem = (item: ArrItem) => {
        return (
            <TouchableOpacity onPress={() => setGender(item.item)} 
            style={[styles.mainButton,{backgroundColor: item.item === gender ? Colors.lightGray : Colors.primary}]}>
                <Text style={GlobalStyles.regularText}>{item.item}</Text>
            </TouchableOpacity>
        )
    }

    React.useEffect(() => {
        const newData = Gender.filter(item => {
            const itemData = `${item.toLowerCase()}`;
            const textData = search.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setArr(newData)
    }, [search])

    const setGender = (item: string) => {
        dispatch(Credential({ prop: 'gender', value: item }))
        setSearch(item)
        navigation.goBack()
    }

    return (
        <Container mainStyle={{ marginBottom: hp('15%') }}>
            <Input
                label="Gender"
                value={search}
                onChangeText={text => setSearch(text)}
                leftIcon={<TextInput.Icon size={17} name={ImagePath.leftArrow} color={Colors.secondary} onPress={() => navigation.goBack()} />}
            />
            <FlatList
                data={arr}
                renderItem={renderItem}
                keyExtractor={gender => gender}
            />
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