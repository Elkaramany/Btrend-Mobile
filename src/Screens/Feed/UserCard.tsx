import React from 'react'
import { View, Text, StyleSheet, Animated, Image, PanResponder, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { FavoriteUser } from '../../Redux/Actions'

import { Colors, ImagePath, GlobalStyles } from '../../Config'

import SocialPrice from '../../Components/SocialPrice'

const CARD_HEIGHT = hp('37%')
const CARD_WIDTH = wp('95%')
const THRESHOLD = CARD_WIDTH / 3.25
const ACTION_OFFSET = 100

interface Props {
    item: any,
    onSwipe: (id: number, direction: string) => void
    navigation: any
}

const UserCard: React.FC<Props> = ({ item, onSwipe, navigation }) => {
    const dispatch = useDispatch()
    const [favorite, setFavorite] = React.useState(item.isFavorite)
    const { token, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const isBrand = userType === "Brand"
    const swipe = React.useRef(new Animated.ValueXY()).current;
    const titleSign = React.useRef(new Animated.Value(1)).current
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, y0 }) => {
            swipe.setValue({ x: dx, y: 0 })
            titleSign.setValue(y0 > CARD_HEIGHT / 2 ? 1 : -1)
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            if (dx > THRESHOLD) {
                completeSwipeAnimation(THRESHOLD * 4, dy, "right")
            } else if (-dx > THRESHOLD) {
                completeSwipeAnimation(-THRESHOLD * 4, dy, "left")
            }
            else {
                //Move back to original position
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start()
            }
        }
    })

    const completeSwipeAnimation = (x: number, y: number, direction: string) => {
        //Animate the card off the screen
        Animated.timing(swipe, {
            duration: 150,
            toValue: {
                x,
                y
            },
            useNativeDriver: true
        }).start(() => onSwipe(item._id, direction))
    }

    const onFavorite = () => {
        dispatch(FavoriteUser(item._id, token, changeFavorite, userType))
    }

    const changeFavorite = () => {
        setFavorite(!favorite)
    }

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={{
                transform: [...swipe.getTranslateTransform(), {
                    rotate: Animated.multiply(swipe.x, titleSign).interpolate({
                        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
                        outputRange: ['-8deg', '0deg', '8deg']
                    })
                }]
            }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { item, isFavorite: favorite })}>
                <Card style={styles.userContainer}>

                    <Image source={{ uri: item.photo }} style={styles.userImg} />

                    <View style={{ marginHorizontal: wp('5%'), marginTop: hp('1%') }}>
                        <View style={GlobalStyles.rowBetween}>
                            <Text style={styles.userTitle}>Hydra zen Spray</Text>
                            <TouchableOpacity onPress={() => onFavorite()}>
                                <Image source={favorite ? ImagePath.heartFilled : ImagePath.heartBlack}
                                    style={{
                                        height: hp('3%'),
                                        width: hp('3%'),
                                        resizeMode: 'contain',
                                    }} />
                            </TouchableOpacity>
                        </View>

                        <SocialPrice instagram={true} tiktok={true} youtube={true} snapchat={true} price={item.price} />

                        <View style={GlobalStyles.horizontalLine} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Image source={{ uri: isBrand ? item.photo : item.brand.photo }} style={styles.userIcon} />
                            <View style={{ marginLeft: wp('5%') }}>
                                <Text style={[GlobalStyles.regularText, { fontSize: hp('1.75%') }]}>{isBrand ? `${item.firstName} ${item.lastName}` : item.companyName}name of company here</Text>
                                <View style={{ width: wp('55%') }}>
                                    <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, fontSize: hp('1.75%') }]}>{item.categories.join(" - ")}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </Card >
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        ...GlobalStyles.centeredContainer,
        alignSelf: 'center',
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        paddingVertical: hp('1%'),
        borderRadius: wp('6%')
    }, userImg: {
        height: hp('15%'),
        width: wp('90%'),
        resizeMode: 'cover',
        borderRadius: wp('6%'),
        overflow: 'hidden'
    }, userTitle: {
        fontWeight: '500',
        marginVertical: hp('1%'),
        fontSize: hp('3%'),
    }, userIcon: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: hp('1%')
    }
})

export default UserCard