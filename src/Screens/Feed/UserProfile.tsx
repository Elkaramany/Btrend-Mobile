import React from 'react'
import {
    View, Text, StyleSheet,
    Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { FavoriteUser } from '../../Redux/Actions'
import { GlobalStyles, Colors, ImagePath, Languages, WIDTH } from '../../Config';

import InfluencerProfile from '../../Components/InfluencerProfile';


interface Props {
    route: any
    navigation: StackNavigationProp<any, any>,
}

const UserProfile: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"
    const { item, isFavorite } = route.params
    const [favorite, setFavorite] = React.useState(isFavorite)


    const name = isBrand ? `${item.firstName} ${item.lastName}` : item.brand.companyName
    const photo = isBrand ? item.photo : item.brand.photo
    const categories = isBrand ? item.categories : item.brand.categories

    const onFavorite = () => {
        dispatch(FavoriteUser(item._id, token, changeFavorite, userType))
    }

    const changeFavorite = () => {
        setFavorite(!favorite)
    }

    const HeaderArray = (header: string, arr: string[], icon: any) => {
        return (
            <View style={styles.innerContainer}>
                <Text style={styles.sectionHeader}>{header}</Text>
                {arr.map((cat: any) => {
                    return (
                        <View style={{ flexDirection: 'row', marginVertical: hp('0.5%') }}>
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
        )
    }

    const userView = () => {
        if (!isBrand) {
            return (
                <View>
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1%') }]}>
                        <View style={styles.campaignView}>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Campaign</Text>
                        </View>
                        <TouchableOpacity onPress={() => onFavorite()}>
                            <Image source={favorite ? ImagePath.heartFilled : ImagePath.heartBlack}
                                style={[GlobalStyles.arrowImage, { width: wp('7%'), height: wp('7%') }]} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('4.5%') }]}>{item.name}</Text>
                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.5%') }]}>Posted 7h ago</Text>
                    <Text style={GlobalStyles.regularText}>
                        {item.aim}
                    </Text>

                    <View style={styles.innerContainer}>
                        <Text style={styles.sectionHeader}>Dates</Text>
                        <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{item.startingDate} - {item.endingDate}</Text>
                    </View>

                    <View style={styles.innerContainer}>
                        <Text style={styles.sectionHeader}>Gender & Age</Text>
                        <View style={GlobalStyles.rowBetween}>
                            <View>
                                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%'), marginVertical: hp('0.75%') }]}>{item.gender}</Text>
                                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{item.age || '18-30 Years old'}</Text>
                            </View>
                            <Image source={item.gender === "Male" ? ImagePath.female : ImagePath.ic_gender} style={[GlobalStyles.arrowImage, { width: wp('9%'), height: wp('9%') }]} />
                        </View>
                    </View>

                    {HeaderArray("Languages", Languages, null)}
                    {HeaderArray("Categories", item.categories, ImagePath.category)}
                    {HeaderArray("HashTage", ["@larose", "#larosetheworld", "#larosetheworldasdsa"], null)}
                    {HeaderArray("In order to apply you need to", [`${item.nof.join(" - ")} followers`,
                    `Engagement score of ${item.engagementRate.join("% - ")}%`,
                    `Based in ${item.location.join(" - ")}`], ImagePath.ic_check)}

                    <View style={GlobalStyles.graySeperator} />
                    <View style={styles.innerContainer}>
                        <Text style={styles.sectionHeader}>References</Text>
                        <FlatList
                            contentContainerStyle={{ marginVertical: hp('1%') }}
                            horizontal
                            data={[ImagePath.serum, ImagePath.editProfile]}
                            keyExtractor={item => `${item}`}
                            renderItem={({ item }) => {
                                return (
                                    <Image
                                        source={item}
                                        style={{ width: wp('50%'), height: wp('60%'), marginRight: wp('3%') }}
                                    />
                                )
                            }}
                        />
                    </View>
                    <View style={GlobalStyles.graySeperator} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Price", { item })}
                        style={GlobalStyles.rowBetween}>
                        {HeaderArray("What price Includes", ["All info"], null)}
                        <Image
                            source={ImagePath.arrowRight}
                            style={GlobalStyles.arrowImage}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else return <InfluencerProfile user={item} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>

            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.xImage}>
                <Image source={ImagePath.ic_cross} />
            </TouchableOpacity>

            <ScrollView style={[styles.scroller, { position: 'absolute', top: hp('15%') }]}>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: hp('2%') }}>
                    <View style={[GlobalStyles.rowBetween, { width: '85%' }]} >
                        <Image source={{ uri: item.photo }} style={styles.campaignImg} />
                        <View>
                            <Text style={GlobalStyles.regularText}>{name}</Text>
                            <View>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{categories.join(" - ")}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[GlobalStyles.horizontalLine, { width: '100%', marginBottom: 0 }]} />
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
        resizeMode: 'contain',
    }, xImage: {
        height: hp('5%'),
        width: hp('5%'),
        resizeMode: 'cover',
        alignSelf: 'flex-end',
        left: wp('3%'),
        marginTop: hp('2%'),
        position: 'absolute',
    }, scroller: {
        flexGrow: 1,
        borderTopRightRadius: wp('8%'),
        borderTopLeftRadius: wp('8%'),
        width: '100%',
        backgroundColor: Colors.primary,
        bottom: hp('6%')
    }, campaignImg: {
        marginRight: wp('2%'),
        width: wp('15%'),
        height: wp('15%'),
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
        marginVertical: hp('0.5%'),
    }, sectionHeader: {
        ...GlobalStyles.regularText,
        fontWeight: '600',
    }, bottomButton: {
        paddingHorizontal: wp('6%'),
        paddingVertical: hp('1%'),
        width: wp('60%'),
        alignSelf: 'center'
    }, campaignView: {
        paddingVertical: hp('0.75%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: wp('0.25%'),
        borderRadius: wp('2%'),
        width: wp('30%'),
        marginTop: hp('2%'),
    }
})

export default UserProfile