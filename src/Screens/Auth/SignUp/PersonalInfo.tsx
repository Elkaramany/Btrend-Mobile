import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential, ClearAll } from '../../../Redux/Actions';
import { Colors, ImagePath, GlobalStyles, validateName } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import Input from '../.././../Components/Input'
import GradientButton from '../../../Components/GradientButton'
import RadioBtn from '../../../Components/RadioBtn';

import { formatDate } from '../../../Config/Validators';

interface Props {
    navigation: StackNavigationProp<any, any>,
}

const PersonalInfo: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [verified, setVerified] = React.useState(false)
    const [dateOpen, setDateOpen] = React.useState(false)
    const { userType, photo, firstName, lastName, dob, gender } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const pressedContinue = () => {
        if (verified) {
            navigation.navigate("Categories")
        }
    }

    React.useEffect(() => {
        if (validateName(firstName) && validateName(lastName) && validateName(dob) && validateName(gender)) {
            setVerified(true)
        } else setVerified(false)
    }, [dob, gender, firstName, lastName])

    const handleUrlPress = React.useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    const setDate = (date: Date) => {
        dispatch(Credential({ prop: 'dob', value: date }))
        setDateOpen(false)
    }

    const handleImage = async (type: string) => {
        const image: any =
            type === "gallery"
                ? await ImagePicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64: true
                })
                : await ImagePicker.openCamera({
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64: true,
                })

        if (image) {
            dispatch(Credential({ prop: 'photo', value: `data:image/jpg;base64,${image.data}` }))
        }
    };

    const handleSelection = () => {
        Alert.alert("Add an image", "", [
            {
                text: "Take photo",
                onPress: () => handleImage("camera")
            },
            {
                text: "Choose from library",
                onPress: () => handleImage("gallery")
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const sendMeBack = () => {
        dispatch(ClearAll())
        navigation.navigate("Home")
    }

    return (
        <Container>
            <ProgressBar progress={0.25} color={'red'} />
            <HeaderArrow headerText={userType === "Brand" ? "Company Info" : "Personal Info"} navigateMeBack={() => sendMeBack()} />
            <TouchableOpacity style={styles.addProfile}
                onPress={() => handleSelection()}
            >
                <Image source={photo && photo.length ? { uri: photo } : ImagePath.profileAdd} style={styles.imageStyle} />
                <Text style={[GlobalStyles.regularText, { marginLeft: wp('10%') }]}>Add profile photo</Text>
            </TouchableOpacity>
            <Input
                label="First Name"
                value={firstName}
                onChangeText={text => dispatch(Credential({ prop: 'firstName', value: text }))}
            />
            <Input
                label="Last Name"
                value={lastName}
                onChangeText={text => dispatch(Credential({ prop: 'lastName', value: text }))}
            />
            <TouchableOpacity
                style={[GlobalStyles.buttonContainer, styles.dateButton]}
                onPress={() => setDateOpen(true)}
            >
                <Text style={[GlobalStyles.regularText, { textAlign: 'left', fontSize: hp('1.85%') }]}>{dob && dob.toString().length ? formatDate(dob) : "Date of Birth"}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                date={new Date("1996-08-26")}
                maximumDate={new Date()}
                isVisible={dateOpen}
                mode="date"
                onConfirm={(date) => setDate(date)}
                onCancel={() => setDateOpen(false)}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: hp('5%') }}>
                <RadioBtn
                    text={"Female"}
                    selected={gender === "Female"}
                    onPress={() => dispatch(Credential({ prop: 'gender', value: gender === "Female" ? "" : "Female" }))}
                />

                <RadioBtn
                    text={"Male"}
                    selected={gender === "Male"}
                    onPress={() => dispatch(Credential({ prop: 'gender', value: gender === "Male" ? "" : "Male" }))}
                />

                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate("Genders")}
                >
                    <Text style={[GlobalStyles.regularText,{color: Colors.blue}]}>{gender.length && gender !== 'Male' && gender !== 'Female' ? gender : "More"}</Text>
                    <Image source={ImagePath.rightArrow} style={{ width: wp('3%'), height: wp('3%'), left: wp('4.5%'), top: hp('0.3%') }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: hp('3%') }}>
                <Text style={GlobalStyles.regularText}>
                    Before continue take a look at{" "}
                    <Text
                        style={[
                            GlobalStyles.regularText,
                            { textDecorationLine: "underline", color: Colors.blue }
                        ]}
                        onPress={() => handleUrlPress("https://google.com")}
                    >
                        Terms of service
                    </Text>
                    ,{" "}
                    <Text
                        style={[
                            GlobalStyles.regularText,
                            { textDecorationLine: "underline", color: Colors.blue }
                        ]}
                        onPress={() => handleUrlPress("https://google.com")}
                    >
                        Privacy policy
                    </Text>
                </Text>
            </View>


            <GradientButton text={'Continue'} colors={verified ? Colors.gradientButton : Colors.disabledButton}
                onPress={() => pressedContinue()}
            />
        </Container >
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: wp('20%'),
        height: wp('20%'),
        resizeMode: 'contain',
        borderRadius: wp('4%'),
    }, addProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%')
    }, dateButton: {
        paddingVertical: hp('2%'),
        justifyContent: 'flex-start',
        borderColor: Colors.secondary,
        marginBottom: hp('3.5%')
    },
})

export default PersonalInfo