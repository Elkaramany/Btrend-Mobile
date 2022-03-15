import React from 'react'
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors, GendersArr } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import GradientText from '../../../Components/GradientText';
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'
import Input from '../../../Components/Input'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const GenderAge: React.FC<Props> = ({ navigation }) => {
    const { gender, age } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [arr, setArr] = React.useState<string[]>([])
    const [selectedGenders, setSelectedGenders] = React.useState<string[]>([])
    const [showMore, setShowMore] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (showMore) setArr(GendersArr)
        else setArr(GendersArr.slice(0, 5))
    }, [showMore])

    React.useEffect(() => {
        dispatch(CampaignCredential({ prop: 'gender', value: selectedGenders }))
    }, [selectedGenders])

    const Cancel = () => {
        console.log('here')
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    const addOrRemoveGender = (item: string) => {
        let newArr = []
        if (selectedGenders.includes(item)) {
            newArr = selectedGenders.filter((gen) => gen != item)
        } else newArr = [...selectedGenders, item]
        setSelectedGenders(newArr)
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Now let's add \n Gender and Age"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500' }]}>Gender</Text>
                {arr.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => addOrRemoveGender(item)}
                            style={[GlobalStyles.rowBetween, { marginVertical: hp('1.5%') }]}>
                            <Text style={GlobalStyles.regularText}>{item}</Text>
                            <Image source={selectedGenders.includes(item) ? ImagePath.checkedSquare : ImagePath.uncheckedSquare}
                                style={GlobalStyles.arrowImage} />
                        </TouchableOpacity>
                    )
                })}
                <TouchableOpacity style={{ marginVertical: hp('2%') }} onPress={() => setShowMore(!showMore)}>
                    <GradientText
                        style={[GlobalStyles.regularText, { fontWeight: '500' }]}
                        end={{ x: 0.15, y: 0.35 }}>
                        Show {showMore ? "less" : "more"}
                    </GradientText>
                </TouchableOpacity>

                <View style={GlobalStyles.horizontalLine} />

                <Text style={[GlobalStyles.regularText, { fontWeight: '500', marginVertical: hp('3%') }]}>Age</Text>

                <View style={GlobalStyles.rowBetween}>
                    <Input
                        label={'from'}
                        value={age[0]}
                        onChangeText={(num) => dispatch(CampaignCredential({ prop: 'age', value: [num, age[1]] }))}
                        type={'numeric'}
                        inputStyle={{ width: wp('41%') }}
                    />
                    <View style={[GlobalStyles.horizontalLine, { alignSelf: 'center', width: wp('4%'), bottom: hp('1.15%') }]} />
                    <Input
                        label={'from'}
                        value={age[1]}
                        onChangeText={(num) => dispatch(CampaignCredential({ prop: 'age', value: [age[0], num] }))}
                        type={'numeric'}
                        inputStyle={{ width: wp('41%') }}
                    />
                </View>

                <Footer backPress={() => navigation.goBack()} nextPress={() => navigation.navigate("Languages")}
                    verified={gender.length && age.length} lineWidth={wp('9.5%') * 3}
                />
            </ScrollView>
        </Container>
    )
}


export default GenderAge