import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ImagePath } from '../Config'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const Name: React.FC = () => {
    const [selected, setSelected] = React.useState('Instagram')

    return (
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
    )
}

const styles = StyleSheet.create({
    socialMediaIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginVertical: hp('2%'),
    }
})

export default Name