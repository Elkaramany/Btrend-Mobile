import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import { Colors, GlobalStyles, ImagePath } from '../Config'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const Name: React.FC = () => {
    const [connected, setConnected] = React.useState<string[]>([])

    const addConnectedSocial = (social: string) => {
        let arr = []
        if (connected.includes(social)) {
            for (let i = 0; i < connected.length; i++) {
                if (connected[i] != social) {
                    arr.push(connected[i])
                }
            }
        } else {
            arr = [...connected]
            arr.push(social)
        }
        setConnected(arr)
    }

    const socialIcon = (title: string, firstImg: any, secondImg: any) => {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}
                onPress={() => addConnectedSocial(title)}
            >
                <View style={GlobalStyles.rowAround}>
                    <Image source={connected.includes(title) ? firstImg : secondImg}
                        style={styles.socialMediaIcon} />
                    <Text style={GlobalStyles.regularText}>{title}</Text>
                </View>

                <View style={GlobalStyles.rowAround}>
                    {connected.includes(title) ?
                        <>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>Connected</Text>
                            <Image source={ImagePath.rightMarker}
                                style={styles.markerIcon} />
                        </>
                        :
                        <>
                            <Text style={GlobalStyles.regularText}>Connect</Text>
                            <Image source={ImagePath.orangeArrow}
                                style={styles.markerIcon} />
                        </>

                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {socialIcon("Instagram", ImagePath.insta_select, ImagePath.ic_insta)}
            {socialIcon("Tiktok", ImagePath.tiktok_select, ImagePath.ic_tiktok)}
            {socialIcon("Snapchat", ImagePath.snapchat_select, ImagePath.ic_snapchat)}
            {socialIcon("Youtube", ImagePath.youtube_select, ImagePath.ic_youtube)}
        </View >
    )
}

const styles = StyleSheet.create({
    socialMediaIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginVertical: hp('2%'),
        marginRight: wp('5%')
    },
    markerIcon: {
        width: wp('9%'),
        height: wp('9%'),
        resizeMode: 'contain',
        marginLeft: wp('5%')
    },
    socialButton: {
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default Name