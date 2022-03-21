import React from 'react'
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath } from '../../../Config'
import { StackNavigationProp } from '@react-navigation/stack';
import { CampaignCredential } from '../../../Redux/Actions/CampaignActions';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Footer from './Footer'

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const TYPES = ['In-Kind', 'Other', 'All']

const Payment: React.FC<Props> = ({ navigation }) => {
    const { payment } = useSelector((state: RootStateOrAny) => state.CampaignReducer)
    const dispatch = useDispatch()

    const Cancel = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'User' }]
        })
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <HeaderArrow headerText={"Let's pick type\nof payment"}
                navigateMeBack={() => Cancel()}
                textStyle={{ fontWeight: '500', fontSize: hp('3.5%'), marginBottom: hp('2.5%') }}
                imageName={ImagePath.blackCross} />

            {TYPES.map((type) => {
                return (
                    <TouchableOpacity key={type} style={[GlobalStyles.rowBetween, { marginVertical: hp('1.5%') }]}
                        onPress={() => dispatch(CampaignCredential({ prop: 'payment', value: type }))}>
                        <Text style={[GlobalStyles.regularText, { marginLeft: wp('2%') }]}>
                            {type}
                        </Text>
                        <Image source={payment == type ? ImagePath.selectedCircle : ImagePath.whiteCircle}
                            style={GlobalStyles.arrowImage}
                        />
                    </TouchableOpacity>
                )
            })}


            <Footer backPress={() => navigation.goBack()}
                nextPress={() => navigation.navigate("SocialMediaCampaign")}
                verified={payment.length}
                lineWidth={wp('8.75%') * 9}
            />
        </Container>
    )
}

const styles = StyleSheet.create({

})

export default Payment