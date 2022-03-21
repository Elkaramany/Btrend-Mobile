import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton';
import Footer from './Footer'
import Input from '../../../Components/Input'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Tags: React.FC<Props> = ({ navigation }) => {
    const { tags } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [text, setText] = React.useState('')
    const [arr, setArr] = React.useState<string[]>([])
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }
    //text, deleteText, SuggestionsArr, arr, setArr

    const AddToArr = () => {
        if (text.length) {
            let included = arr.includes(text)
            if (included) {
                Alert.alert("Hashtag already added")
            } else setArr([...arr, text])
            setText('')
        }
    }

    const removeItem = (item: string) => {
        let newArr = arr.filter((i) => i !== item)
        setArr(newArr)
    }

    React.useEffect(() => {
        dispatch(CampaignCredential({ prop: 'tags', value: arr }))
    }, [arr])

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Let's add your hashtags and tags"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />

            <View style={[GlobalStyles.rowBetween, { marginBottom: hp('3%') }]}>
                <Input
                    label={'Hashtags & Tags'}
                    value={text}
                    onChangeText={(text) => setText(text)}
                    inputStyle={{ width: '75%', marginBottom: 0 }}
                />

                <GradientButton text={'Add'}
                    colors={Colors.gradientButton}
                    onPress={() => AddToArr()}
                    buttonContainerStyle={{ width: wp('20%') }}
                />
            </View>

            <View style={GlobalStyles.rowWrap}>
                {arr.map((item) => {
                    return (
                        <TouchableOpacity key={item}
                            style={styles.container}
                            onPress={() => removeItem(item)}
                        >
                            <Text
                                style={[GlobalStyles.regularText,
                                { color: Colors.primary, fontWeight: '500' }]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("Information")}
                verified={tags.length} lineWidth={wp('8.75%') * 6}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.brightRed,
        padding: hp('1%'),
        paddingHorizontal: wp('3%'),
        ...GlobalStyles.rowBetween,
        justifyContent: 'center',
        margin: wp('1%'),
        borderRadius: wp('10%')
    },
})

export default Tags