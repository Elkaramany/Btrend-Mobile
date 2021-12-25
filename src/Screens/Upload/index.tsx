import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles, Colors, ImagePath } from '../../Config'
import Arr from './arr'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Container from '../../Components/Container'
import GradientButton from '../../Components/GradientButton'
import AllSocials from '../../Components/AllSocials'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {

}

const Upload: React.FC<Props> = props => {
    const [selected, setSelected] = React.useState<string[]>([])
    const [imgArr, setImgArr] = React.useState(Arr)

    const pressedUpload = () => {

    }

    const addImg = (item: string) => {
        let newArr = [...selected]
        if (selected.includes(item)) {
            newArr = newArr.filter(i => i !== item);
        } else {
            newArr.push(item)
        }
        setSelected(newArr)
    }

    return (
        <Container>
            <ScrollView style={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <Text style={GlobalStyles.regularText}>New post</Text>
                    <GradientButton text={'Post'} colors={selected.length ? Colors.gradientButton : Colors.disabledButton}
                        onPress={() => pressedUpload()} buttonContainerStyle={{ paddingVertical: hp('0.5%') }}
                    />
                </View>
                <Text style={GlobalStyles.regularText}>Select your content based on your social media profiles.</Text>
                <AllSocials />
                {selected[0] && <Image source={{ uri: selected[0] }} style={styles.mainImageStyle} />}

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    {imgArr.map((img, index) => {
                        return (
                            <TouchableOpacity key={img.id} onPress={() => addImg(img.img)}>
                                <Image source={{ uri: img.img }} style={styles.secondaryImageStyle} />
                                {selected.includes(img.img) &&
                                    <Image source={ImagePath.postShadow} style={[styles.secondaryImageStyle, { position: 'absolute' }]} />
                                }
                            </TouchableOpacity>
                        )
                    })}
                </View>

            </ScrollView>

        </Container >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
    }, mainImageStyle: {
        height: hp('28%'),
        width: wp('90%'),
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: hp('5%'),
        marginBottom: hp('1%')
    }, secondaryImageStyle: {
        height: wp('27%'),
        width: wp('27%'),
        resizeMode: 'cover',
        alignSelf: 'center',
        marginVertical: hp('0.5%'),
        marginHorizontal: wp('2%'),
        borderRadius: hp('2%')
    }
})

export default Upload