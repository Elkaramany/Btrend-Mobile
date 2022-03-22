import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import Input from '../../../Components/Input'
import HeaderArrow from '../../../Components/HeaderArrow'
import StartEndDate from '../../../Components/StartEndDate'
import Footer from './Footer'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const semiGrayTextInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.secondary, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.lightGray
    }, roundness: hp('2%')
}

const Title: React.FC<Props> = ({ navigation }) => {
    const today = new Date()
    const tenDaysFromToday = new Date(today);
    const oneMonthFromToday = new Date(today);
    const fortyDaysFromToday = new Date(today);
    tenDaysFromToday.setDate(tenDaysFromToday.getDate() + 10);
    const { name, aim, dates } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const [campaignDates, setCampaignDates] = React.useState({ start: today, end: tenDaysFromToday })
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    React.useEffect(() => {
        dispatch(CampaignCredential({ prop: 'dates', value: [`${campaignDates.start}`, `${campaignDates.start}`] }))
    }, [campaignDates])

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Now let's write a title and a description for your campain"}
                navigateMeBack={() => Cancel()} textStyle={{ fontWeight: '500', fontSize: hp('3.5%') }}
                imageName={ImagePath.blackCross} />
            <Input
                label='Campaign name'
                value={name}
                onChangeText={(text) => dispatch(CampaignCredential({ prop: 'name', value: text }))}
                multiline
                dense
                inputStyle={{ height: hp('8%'), marginBottom: 0 }}
                theme={semiGrayTextInputTheme}
                maxLength={30}
            />
            <Text style={styles.inputCounter}>
                {name.length}/30
            </Text>

            <Input
                label='Aim of the campaign'
                value={aim}
                onChangeText={(text) => dispatch(CampaignCredential({ prop: 'aim', value: text }))}
                multiline
                dense
                inputStyle={{ height: hp('22%'), marginBottom: 0 }}
                theme={semiGrayTextInputTheme}
                maxLength={240}
            />
            <Text style={styles.inputCounter}>
                {aim.length}/240
            </Text>
            <View style={{ height: hp('1%') }} />
            <StartEndDate dates={campaignDates} setDates={setCampaignDates} 
            maxStartDate={oneMonthFromToday} maxEndDate={fortyDaysFromToday} />

            <Footer backPress={() => navigation.goBack()} nextPress={() => navigation.navigate("GenderAge")}
                verified={name.length && aim.length && dates.length > 1} lineWidth={wp('8.75%') * 2}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    inputCounter: {
        ...GlobalStyles.regularText,
        color: Colors.inputGray,
        bottom: hp('3.%'),
        left: wp('5%')
    }
})

export default Title