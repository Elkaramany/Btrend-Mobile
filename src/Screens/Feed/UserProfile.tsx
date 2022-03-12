import React from 'react'
import {
    View, Text, StyleSheet,
    Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { FavoriteUser } from '../../Redux/Actions'
import { GlobalStyles, Colors, ImagePath, Languages } from '../../Config';

import GradientButton from '../../Components/GradientButton';


interface Props {
    route: any
    navigation: StackNavigationProp<any, any>,
}

const UserProfile: React.FC<Props> = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { item, isFavorite } = route.params
    const [favorite, setFavorite] = React.useState(isFavorite)

    const onFavorite = () => {
        dispatch(FavoriteUser(item._id, token, changeFavorite, userType))
    }

    const changeFavorite = () => {
        setFavorite(!favorite)
    }

    const HeaderArray = (header: string, arr: string[], icon: any, bottomLine: boolean) => {
        return (
            <>
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
                    <TouchableOpacity onPress={() => onFavorite()} style={GlobalStyles.centeredContainer}>
                        <Image source={favorite ? ImagePath.heartFilled : ImagePath.heartBlack}
                            style={[GlobalStyles.arrowImage, { width: wp('7%'), height: wp('7%') }]} />
                    </TouchableOpacity>
                </View>
                <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('4.5%'), marginBottom: hp('1%') }]}>{item.name}</Text>
                <Text style={[GlobalStyles.regularText,
                { color: Colors.darkGray, fontSize: hp('1.5%'), marginBottom: hp('3%') }]}>Posted 7h ago</Text>

                <Text style={GlobalStyles.regularText}>
                    {item.aim}
                </Text>

                <View style={[GlobalStyles.horizontalLine, { width: '100%', marginTop: hp('5%'), marginBottom: hp('1.5%') }]} />

                <View style={styles.innerContainer}>
                    <Text style={styles.sectionHeader}>Dates:</Text>
                    <Text style={[GlobalStyles.regularText, { fontSize: hp('1.5%') }]}>{item.startingDate} - {item.endingDate}</Text>
                </View>

                <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />

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

                <View style={[GlobalStyles.horizontalLine, { width: '100%' }]} />

                {HeaderArray("Languages", Languages, null, true)}
                {HeaderArray("Categories", item.categories, ImagePath.category, true)}
                {HeaderArray("HashTage", ["@larose", "#larosetheworld", "#larosetheworldasdsa"], null, true)}
                {HeaderArray("In order to apply you need to", [`${item.nof.join(" - ")} followers`,
                `Engagement score of ${item.engagementRate.join("% - ")}%`,
                `Based in ${item.location.join(" - ")}`], ImagePath.ic_check, false)}

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
                    style={[GlobalStyles.rowBetween, { marginBottom: hp('7%') }]}>
                    {HeaderArray("What price Includes", ["All info"], null, false)}
                    <Image
                        source={ImagePath.arrowRight}
                        style={GlobalStyles.arrowImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Image source={{ uri: item.brand.photo }} style={styles.image} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.xImage}>
                <Image source={ImagePath.ic_cross} />
            </TouchableOpacity>

            <ScrollView style={[styles.scroller, { position: 'absolute', top: hp('25%') }]}>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: hp('2%') }}>
                    <View style={[GlobalStyles.rowBetween, { width: '80%' }]} >
                        <Image source={{ uri: item.photo }} style={styles.campaignImg} />
                        <View>
                            <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{item.brand.companyName}</Text>
                            <View>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.75%') }]}>{item.brand.categories.join(" - ")}</Text>
                            </View>
                        </View>
                    </View>
                    {userView()}

                </View>
            </ScrollView>
            <View style={
                { position: 'absolute', bottom: 0, marginBottom: hp('4%'), width: '100%', backgroundColor: Colors.primary }}>
                <View style={[GlobalStyles.horizontalLine, { width: '100%', marginTop: 0, marginBottom: hp('2%') }]} />
                <View style={GlobalStyles.rowAround}>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Total price</Text>
                        <Text style={GlobalStyles.regularText}>$1200</Text>
                    </View>
                    <GradientButton text={'Continue'} colors={Colors.gradientButton}
                        onPress={() => navigation.navigate("Proposal", { item })} buttonContainerStyle={{ width: wp('55%') }}
                    />
                </View>

            </View>
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

export default UserProfile