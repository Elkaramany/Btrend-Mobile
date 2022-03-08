import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Colors, GlobalStyles, ImagePath } from '../../Config'

import GradientText from '../../Components/GradientText'

interface Props {

}

const Insights: React.FC<Props> = props => {

    const DoubleStat = (firstText: string, secondText: string, firstIcon: any, secondIcon: any, firstStat: string, secondStat: string) => {
        return (
            <View style={[GlobalStyles.rowBetween, { width: '100%' }]}>
                <View style={styles.statContainer}>
                    <View style={styles.innerContainer}>
                        <Image
                            source={firstIcon}
                            style={styles.statIcon}
                        />
                        <Text style={styles.textStyle}>{firstText}</Text>
                        <GradientText style={{ fontWeight: 'bold', fontSize: hp('4%')  }} end={{ x: 0.35, y: 0.35 }}>{firstStat}</GradientText>
                    </View>
                </View>

                <View style={styles.statContainer}>
                    <View style={styles.innerContainer}>
                        <Image
                            source={secondIcon}
                            style={styles.statIcon}
                        />
                        <Text style={styles.textStyle}>{secondText}</Text>
                        <GradientText style={{ fontWeight: 'bold', fontSize: hp('4%')  }} end={{ x: 0.35, y: 0.35 }}>{secondStat}</GradientText>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ justifyContent: 'space-around', flex: 1, marginBottom: hp('5%') }}>
            {DoubleStat("Matches", "Campaigns", ImagePath.matches, ImagePath.campaigns, "35", "30")}
            {DoubleStat("Profile Likes", "Profile Views", ImagePath.likes, ImagePath.eyeIcon, "25k", "24k")}
            {DoubleStat("Swipe Right", "Swipe Left", ImagePath.swipeRight, ImagePath.swipeLeft, "25k", "24k")}
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        ...GlobalStyles.regularText,
        color: Colors.secondary,
        fontSize: hp('2.5%')
    },
    statContainer: {
        backgroundColor: Colors.primary,
        borderRadius: hp('3%'),
        width: '48%',
        height: hp('20%'),
    }, innerContainer: {
        marginLeft: wp('5%'),
        justifyContent: 'space-around',
        flex: 1,
        paddingVertical: hp('1%'),
    }, statIcon: {
        width: wp('8%'),
        height: wp('8%'),
        resizeMode: 'contain'
    }
})

export default Insights