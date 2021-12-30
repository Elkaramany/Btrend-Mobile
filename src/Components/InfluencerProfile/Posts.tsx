import React from 'react'
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Colors, GlobalStyles } from '../../Config'

import { useSelector, useDispatch } from 'react-redux'
import food from '../../Screens/Search/food'

import Header from '../Header'

interface Props {
    user: any
}

const Posts: React.FC<Props> = ({ user }) => {

    return (
        <View style={GlobalStyles.rowWrap}>
            {food.map((post) => {
                return (
                    <View>
                        <Image source={{ uri: post.img }} style={styles.post} />
                    </View>
                )
            })}
        </View>

    )
}

const styles = StyleSheet.create({
    post: {
        width: wp('42%'),
        borderRadius: wp('3%'),
        height: hp('17%'),
        resizeMode: 'cover',
        margin: wp('1%')
    }
})

export default Posts