import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles, Colors } from '../../Config'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Container from '../../Components/Container'
import GradientButton from '../../Components/GradientButton'
import AllSocials from '../../Components/AllSocials'

interface Props {

}

const Upload: React.FC<Props> = props => {
    const [canUpload, setCanUpload] = React.useState(false)
    const [mainImage, setImage] = React.useState('https://picsum.photos/414/359?random=2')
    const [imgArr, setImgArr] = React.useState([])

    const pressedUpload = () => {

    }

    const renderItem = ({ item }: any) => {
        return (
            <Image source={{ uri: mainImage }} style={styles.mainImageStyle} />
        )
    }

    return (
        <Container>
            <View style={styles.header}>
                <Text style={GlobalStyles.regularText}>New post</Text>
                <GradientButton text={'Post'} colors={canUpload ? Colors.gradientButton : Colors.disabledButton}
                    onPress={() => pressedUpload()} buttonContainerStyle={{ paddingVertical: hp('0.5%') }}
                />
            </View>
            <Text style={GlobalStyles.regularText}>Select your content based on your social media profiles.</Text>
            <AllSocials />
            <Image source={{ uri: mainImage }} style={styles.mainImageStyle} />
            <FlatList
                data={imgArr}
                renderItem={renderItem}
                keyExtractor={item => item.index}
            />
        </Container >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
    }, mainImageStyle: {
        height: hp('40%'),
        width: wp('100%'),
        resizeMode: 'cover',
        alignSelf: 'center'
    }, secondaryImageStyle: {
        height: hp('15%'),
        width: wp('25%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})

export default Upload