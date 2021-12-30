import React from 'react'
import { View, Text, StyleSheet, Animated, Image, PanResponder, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Colors, ImagePath, GlobalStyles } from '../../Config'

const CARD_HEIGHT = hp('33%')
const CARD_WIDTH = wp('95%')
const THRESHOLD = CARD_WIDTH / 3.25
const ACTION_OFFSET = 100

interface Props {
    item: any,
    onSwipe: (id: number, direction: string) => void
    onFavorite: (id: number) => void
    viewUserProfile: (item: any) => void
}

const UserCard: React.FC<Props> = ({ item, onSwipe, onFavorite, viewUserProfile }) => {
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
        }).start(() => onSwipe(item.id, direction))
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
            <TouchableOpacity onPress={() => viewUserProfile(item)}>
                <Card style={styles.userContainer}>
                    <Image source={{ uri: item.img }} style={styles.userImg} />
                    <Text style={styles.userTitle}>{item.title}</Text>
                    <View style={GlobalStyles.horizontalLine} />
                    <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1.5%') }]}>
                        <View style={GlobalStyles.rowBetween} >
                            <Image source={{ uri: item.img }} style={[GlobalStyles.roundedImg, { marginRight: wp('2%') }]} />
                            <View>
                                <Text style={GlobalStyles.regularText}>{item.title}</Text>
                                <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.title}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => onFavorite(item.id)}>
                            <Image source={item.favorite ? ImagePath.heartFilled : ImagePath.heart} style={styles.heartImg} />
                        </TouchableOpacity>
                    </View>
                </Card >
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        ...GlobalStyles.centeredContainer,
        zIndex: -1,
        height: CARD_HEIGHT,
        width: CARD_WIDTH
    }, userImg: {
        ...GlobalStyles.arrowImage,
        height: hp('15%'),
        width: wp('90%'),
        resizeMode: 'cover',
        borderTopRightRadius: hp('4%'),
        borderTopLeftRadius: hp('4%'),
    }, userTitle: {
        fontWeight: '600',
        marginVertical: hp('2%'),
        fontSize: hp('3%'),
        marginLeft: wp('10%'),
        alignSelf: 'flex-start',
    },
    heartImg: {
        height: hp('4%'),
        width: hp('4%'),
        resizeMode: 'contain',

    }
})

export default UserCard