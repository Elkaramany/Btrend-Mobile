import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ProgressBar } from 'react-native-paper';

import { useSelector, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { Credential } from '../../../Redux/Actions';
import { Colors, GlobalStyles, ImagePath } from '../../../Config';

import Container from '../../../Components/Container'
import HeaderArrow from '../../../Components/HeaderArrow'
import GradientButton from '../../../Components/GradientButton'


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const PhotosVideos: React.FC<Props> = ({ navigation }) => {
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [selected, setSelected] = React.useState("")

    const pressedContinue = () => {
        navigation.navigate("Location")
    }

    return (
        <Container mainStyle={{ flex: 1 }}>
            <ProgressBar progress={0.75} color={'red'} />
            <HeaderArrow headerText={"Add Photos & Videos"} navigateMeBack={() => navigation.goBack()} onSkip={() => pressedContinue()} />

            {userType == "Influencer" ? (
                <>
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, marginBottom: hp('2%') }]}>
                        Show us the fabulous you to get the Brands to know you better!
                    </Text>
                    <Text style={GlobalStyles.regularText}>
                        Select your content based on your social media profiles.
                    </Text>
                </>
            ) : (
                <Text style={[GlobalStyles.regularText, { marginVertical: hp('5%') }]}>
                    Share your Brand products and service, increase your visibility
                    and find the perfect partnership!
                </Text>
            )}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{ marginEnd: 25 }}
                    onPress={() => setSelected("Instagram")}
                >

                    <Image source={selected === "Instagram" ? ImagePath.insta_select : ImagePath.ic_insta}
                        style={styles.socialMediaIcon} />

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginEnd: 25 }}
                    onPress={() => setSelected("Tiktok")}
                >


                    <Image source={selected === "Tiktok" ? ImagePath.tiktok_select : ImagePath.ic_tiktok}
                        style={styles.socialMediaIcon} />

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginEnd: 25 }}
                    onPress={() => setSelected("Snapchat")}
                >

                    <Image source={selected === "Snapchat" ? ImagePath.snapchat_select : ImagePath.ic_snapchat}
                        style={styles.socialMediaIcon} />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelected("Youtube")}>

                    <Image source={selected === "Youtube" ? ImagePath.youtube_select : ImagePath.ic_youtube}
                        style={styles.socialMediaIcon} />

                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp('3%') }}>
                <GradientButton text={'Continue'} colors={Colors.gradientButton}
                    onPress={() => pressedContinue()} />
            </View>

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
        borderColor: Colors.lightGray,
        borderRadius: wp('10%')
    }, socialMediaIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginVertical: hp('5%')
    }
})

export default PhotosVideos