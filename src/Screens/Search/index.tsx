import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput, Card } from 'react-native-paper'

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { Filter, INITIAL_FILTERS } from './Types'
import Food from './food'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import BottomSheet from './BottomSheet'

interface Props {

}

const Search: React.FC<Props> = props => {
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [filters, setFilters] = React.useState<Filter>({ ...INITIAL_FILTERS, userType })
    const [arr, setArr] = React.useState([])
    const [visible, setVisible] = React.useState(false)

    const changeFilter = (type: string, text: string | number | number[] | string[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    React.useEffect(() => {
        console.log(filters)
    }, [filters])


    const renderItem = ({ item }: any) => {
        return (
            <Card style={styles.userContainer}>
                <Image source={{ uri: item.img }} style={styles.userImg} />
                <Text style={styles.userTitle}>{item.title}</Text>
                <View style={{ alignSelf: 'center', backgroundColor: Colors.mediumGray, height: hp('0.25%'), width: wp('85%'), marginVertical: hp('1%') }} />
                <View style={[GlobalStyles.rowBetween, { marginBottom: hp('1.5%') }]}>
                    <View style={GlobalStyles.rowBetween} >
                        <Image source={{ uri: item.img }} style={[styles.roundedImg,{marginRight: wp('2%')}]} />
                        <View>
                            <Text style={GlobalStyles.regularText}>{item.title}</Text>
                            <Text style={[GlobalStyles.regularText, { color: Colors.darkGray }]}>{item.title}</Text>
                        </View>
                    </View>
                    <Image source={ImagePath.heart} style={styles.heartImg} />
                </View>
            </Card >
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: visible ? Colors.lightGray : Colors.primary }}>
            <Container mainStyle={{ flex: 1, marginTop: hp('2%') }} mainBgColor={'transparent'}>
                <View style={styles.header}>
                    <Input
                        label={'Search'}
                        value={filters.search}
                        onChangeText={(text) => changeFilter("search", text)}
                        inputStyle={{ width: wp('80%'), marginBottom: 0 }}
                        rightIcon={<TextInput.Icon name={"close"} color={Colors.darkGray} onPress={() => setFilters({ ...INITIAL_FILTERS, userType })} />}
                    />

                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image source={ImagePath.filter} style={[GlobalStyles.arrowImage, { paddingHorizontal: wp('3%'), marginHorizontal: wp('5%') }]} />
                    </TouchableOpacity>

                    <BottomSheet modalVisible={visible} hideModal={() => setVisible(false)}
                        clearFilters={() => setFilters({ ...INITIAL_FILTERS, userType })}
                        filters={filters} changeFilter={(type: string, text: string | number | number[]) => changeFilter(type, text)}
                    />
                </View>
                <Text style={[GlobalStyles.regularText, { fontWeight: '600', marginVertical: hp('2%'), marginLeft: wp('2%') }]}>Most Popular</Text>

                <FlatList
                    data={Food}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                />
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }, userContainer: {
        ...GlobalStyles.centeredContainer,
        marginVertical: hp('2%'),

    },
    userImg: {
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
    roundedImg: {
        height: hp('7%'),
        width: hp('7%'),
        resizeMode: 'cover',
        borderRadius: wp('50%'),
    }, heartImg: {
        height: hp('4%'),
        width: hp('4%'),
        resizeMode: 'contain',

    }
})

export default Search