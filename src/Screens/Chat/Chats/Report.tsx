import React from 'react'
import {
    View, Text, StyleSheet, Image, TouchableOpacity,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Card } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateOrAny, useSelector} from 'react-redux'

import Container from '../../../Components/Container'
import { GlobalStyles, ImagePath, Colors } from '../../../Config'

import Input from '../../../Components/Input'
import GradientButton from '../../../Components/GradientButton';
import Spinner from '../../../Components/Spinner';

interface Props {
    route: any,
    navigation: StackNavigationProp<any, any>
}

const Report: React.FC<Props> = ({ route, navigation }) => {
    const {  name, onReport } = route.params
    const [somethingElse, setSomethingElse] = React.useState(false)
    const [text, setText] = React.useState('')
    const { loading } = useSelector((state: RootStateOrAny) => state.ChatReducer)

    const pressedReport = (reason: string) => {
        navigation.goBack()
        onReport(reason)
    }

    const ReportOption = (text: string) => {
        return (
            <Card style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => pressedReport(text)}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            </Card>
        )
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <View style={[GlobalStyles.rowBetween, { marginVertical: hp('2%') }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={ImagePath.leftArrow} style={[GlobalStyles.arrowImage, { marginRight: wp('10%') }]} />
                </TouchableOpacity>
            </View>
            <Text style={styles.question}>Why do you want to report {name}?</Text>
            {loading ? <Spinner size={false} /> :
                <>
                    {ReportOption("It's spam or scam")}
                    {ReportOption("It's inappropriate")}
                    {ReportOption("It's harassment")}
                    <Card style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setSomethingElse(true)}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>It's something else</Text>
                        </TouchableOpacity>
                    </Card>
                    {somethingElse &&
                        <>
                            <Input
                                label={`Why do you want to report ${name}`}
                                multiline
                                dense
                                inputStyle={{ width: wp('90%'), marginBottom: 5, height: hp('15%') }}
                                value={text}
                                onChangeText={(text) => setText(text)}
                            />
                            {text.length !== 0 &&
                                <GradientButton text={'Send Report'} colors={Colors.disabledButton}
                                    textStyle={{ color: Colors.secondary }}
                                    onPress={() => pressedReport(text)}
                                    buttonContainerStyle={{ marginTop: hp('1%') }}
                                />
                            }
                        </>
                    }
                </>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    question: {
        ...GlobalStyles.regularText,
        fontSize: hp('3%'),
        fontWeight: '700',
        marginVertical: hp('1%')
    }, buttonContainer: {
        marginVertical: hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9.51,
        elevation: 5,
    }, buttonText: {
        ...GlobalStyles.regularText,
        fontSize: hp('3%'),
        textAlign: 'center'
    }
})

export default Report