import React from 'react'
import {
    View, Text, StyleSheet,
    Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { CreateCampaign } from '../../../Redux/Actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { GlobalStyles, Colors, ImagePath, formatDate } from '../../../Config';

import GradientText from '../../../Components/GradientText'
import Footer from './Footer'
import Spinner from '../../../Components/Spinner';


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const FinalCampaign: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const { brandName, photo, brandInformation, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const item = useSelector((state: RootStateOrAny) => state.CampaignReducer)

    const HeaderArray = (header: string, arr: string[], icon: any, bottomLine: boolean) => {
        return (
            <>
                <View style={styles.innerContainer}>
                    <Text style={styles.sectionHeader}>{header}</Text>
                    {arr.map((cat: any, index: number) => {
                        return (
                            <View key={index} style={{ flexDirection: 'row', marginVertical: hp('0.5%') }}>
                                {icon &&
                                    <Image
                                        source={icon}
                                        style={[GlobalStyles.arrowImage, { marginRight: wp('3%') }]}
                                    />
                                }
                                <Text key={cat} style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{cat}</Text>
                            </View>
                        )
                    })}
                </View>
                {bottomLine && <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />}
            </>

        )
    }

    const userView = () => {
        return (
            <View>
                <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1%') }]}>
                    <View style={styles.campaignView}>
                        <Text style={[GlobalStyles.regularText,
                        { color: Colors.darkGray, fontSize: hp('1.75%'), fontWeight: '500' }]}>Campaign</Text>
                    </View>
                </View>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('4.5%') }]}>
                    {item.name}
                </Text>

                <GradientText
                    style={[GlobalStyles.regularText,
                    { fontWeight: 'bold', fontSize: hp('2.25%'), marginVertical: hp('2%') }]}
                    end={{ x: 0.2, y: 0.35 }}>
                    ${item.price}
                </GradientText>

                <Text style={[GlobalStyles.regularText,
                { color: Colors.darkGray, fontSize: hp('1.5%'), marginBottom: hp('2%') }]}>
                    Freshly posted
                </Text>

                <Text style={GlobalStyles.regularText}>
                    {item.aim}
                </Text>

                <View style={[GlobalStyles.horizontalLine, { width: '100%', marginTop: hp('5%'), marginBottom: hp('1.5%') }]} />

                <View style={styles.innerContainer}>
                    <Text style={styles.sectionHeader}>Dates:</Text>
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>
                        {formatDate(item.dates[0])} - {formatDate(item.dates[1])}
                    </Text>
                </View>

                <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />

                <View style={styles.innerContainer}>
                    <Text style={styles.sectionHeader}>Gender & Age</Text>
                    <View style={GlobalStyles.rowBetween}>
                        <View>
                            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%'), marginVertical: hp('0.75%') }]}>
                                {item.gender.join(" - ")}
                            </Text>
                            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{item.age.join(" - ")} years old</Text>
                        </View>
                        <Image source={item.gender[0] === "Male" ? ImagePath.female : ImagePath.ic_gender} style={[GlobalStyles.arrowImage, { width: wp('8.75%'), height: wp('8.75%') }]} />
                    </View>
                </View>

                <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />

                {HeaderArray("Languages", item.languages, null, true)}
                {HeaderArray("Categories", item.categories, ImagePath.category, true)}
                {HeaderArray("HashTage", item.tags, null, true)}
                {HeaderArray("In order to apply you need to", [`${item.nof.join(" - ")} followers`,
                `Engagement score of ${item.engagementRate.join("% - ")}%`,
                `Based in ${item.locations.join(" - ")}`], ImagePath.ic_check, false)}

                <View style={GlobalStyles.graySeperator} />
                <View style={styles.innerContainer}>
                    <Text style={styles.sectionHeader}>References</Text>
                    <FlatList
                        contentContainerStyle={{ marginVertical: hp('1%') }}
                        horizontal
                        data={item.referencePhotos}
                        keyExtractor={(item, index) => `${item}${index}`}
                        //@ts-ignore
                        renderItem={({ item }) => {
                            return (
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: wp('50%'), height: wp('60%'), marginRight: wp('3%') }}
                                />
                            )
                        }}
                    />
                </View>
                <View style={GlobalStyles.graySeperator} />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Price", { item: item.socialMedia, payment: item.payment, totalPrice: item.price, licensing: item.licensing })}
                    style={[GlobalStyles.rowBetween, { marginBottom: hp('7%') }]}>
                    {HeaderArray("What price Includes", ["All info"], null, false)}
                    <Image
                        source={ImagePath.arrowRight}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>
                {loading ?
                    <Spinner />
                    :
                    <Footer nextText='Publish' backPress={() => navigation.goBack()}
                        nextPress={() => dispatch(CreateCampaign(item, token, () => navigation.navigate("CongratsCampaign")))}
                        lineWidth={0} verified={true}
                    />
                }
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Image source={{ uri: item.coverPhoto }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.xImage}>
                <Image source={ImagePath.ic_cross} style={{ width: '100%', height: '100%' }} />
            </TouchableOpacity>
            <ScrollView style={[styles.scroller, { position: 'absolute', top: hp('25%') }]}>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: hp('2%') }}>
                    <View style={{ width: '80%', flexDirection: 'row' }} >
                        <Image source={{ uri: photo }} style={styles.campaignImg} />
                        <View>
                            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>
                                {brandName}
                            </Text>
                            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%'), color: Colors.darkGray }]}>
                                {brandInformation}
                            </Text>
                        </View>
                    </View>
                    {userView()}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: wp('100%'),
        height: wp('100%'),
        resizeMode: 'cover',
    }, xImage: {
        height: hp('2%'),
        width: hp('2%'),
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        left: wp('3%'),
        marginTop: hp('2%'),
        top: 0,
        position: 'absolute',
    }, scroller: {
        flexGrow: 1,
        borderTopRightRadius: wp('8%'),
        borderTopLeftRadius: wp('8%'),
        width: '100%',
        backgroundColor: Colors.primary,
        bottom: hp('1%')
    }, campaignImg: {
        marginRight: wp('2%'),
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('3%')
    }, activeContainer: {
        backgroundColor: "#6FCF97",
        padding: hp('0.5%'),
        borderRadius: hp('5%')
    }, collapsibleHeader: {
        paddingVertical: hp('1%'),
        alignSelf: 'center',
        width: wp('85%'),
    }, innerContainer: {
        marginVertical: hp('1.5%'),
    }, sectionHeader: {
        ...GlobalStyles.regularText,
        fontWeight: '600',
        marginBottom: hp('0.5%')
    }, bottomButton: {
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('1%'),
        width: wp('60%'),
        alignSelf: 'center'
    }, campaignView: {
        paddingVertical: hp('0.45%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: wp('0.25%'),
        borderRadius: wp('3%'),
        paddingHorizontal: wp('2%'),
        marginTop: hp('2%'),
    }
})

export default FinalCampaign