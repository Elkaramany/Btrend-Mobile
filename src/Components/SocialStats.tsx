import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useSelector, useDispatch } from 'react-redux'
import { GlobalStyles, Colors } from '../Config'

import AllSocials from './AllSocials'

interface Props {

}

const SocialStats: React.FC<Props> = props => {
    return (
        <View style={styles.container}>
            <View style={styles.statsContainer}>
                <Text style={[GlobalStyles.regularText, styles.statsText]}>3K{'\n'}Posts</Text>
                <Text style={[GlobalStyles.regularText, styles.statsText]}>1K{'\n'}Following</Text>
                <Text style={[GlobalStyles.regularText, styles.statsText]}>18M{'\n'}Followers</Text>
            </View>
            <AllSocials />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }, statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.lightGray,
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('15%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('85%'),
        borderRadius: hp('30%')
    }, statsText: {
        marginHorizontal: wp('5%'),
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default SocialStats