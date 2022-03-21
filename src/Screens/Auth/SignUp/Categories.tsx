import React from 'react'
import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'
import AllCategories from '../../../Components/AllCategories';


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
                <View style={GlobalStyles.redLine} />
                <View style={GlobalStyles.redLine} />
                <View style={[GlobalStyles.redLine, { backgroundColor: Colors.gray }]} />
            </View>
            <HeaderArrow headerText={"Categories"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />
            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('3%') }]}>
                Add up to <Text style={{ fontWeight: 'bold', color: Colors.secondary }}> 5 categories</Text>
                of your business & products you are aligned with
            </Text>

            <AllCategories setArr={setArr} arr={arr} />
            <GradientButton text={'Continue'} colors={Colors.gradientButton}
                onPress={() => pressedContinue()}
            />
        </Container >
    )
}

export default Categories