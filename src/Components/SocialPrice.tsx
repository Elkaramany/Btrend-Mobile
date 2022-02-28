import React from 'react'
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { ImagePath, GlobalStyles, Colors } from '../Config'

interface Props {
    instagram: boolean | Object | null
    tiktok: boolean | Object | null
    snapchat: boolean | Object | null
    youtube: boolean | Object | null
    price: string | number
    containerStyle?: ViewStyle
}

const Name: React.FC<Props> = ({ youtube, instagram, snapchat, tiktok, price, containerStyle }) => {
    return (
        <View style={[GlobalStyles.rowBetween, { marginVertical: hp('1%'), marginRight: wp('20%') }, containerStyle]}>
            {instagram && <Image source={ImagePath.instaUrl} style={styles.imgStyle} />}
            {snapchat && <Image source={ImagePath.ic_snapchat} style={styles.imgStyle} />}
            {tiktok && <Image source={ImagePath.ic_tiktok} style={styles.imgStyle} />}
            {youtube && <Image source={ImagePath.youtube} style={styles.imgStyle} />}

            <View style={{ height: hp('3%'), width: wp('0.35%'), backgroundColor: Colors.mediumGray }} />

            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>${price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imgStyle: {
        height: hp('2.5%'),
        width: hp('2.5%'),
        resizeMode: 'contain',
    }
})

export default Name