import React from 'react'
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity, FlatList,
}
    from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TextInput } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { Filter, INITIAL_FILTERS } from './Types'
import Food from './food'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import BottomSheet from './SearchFilters'
import UserCard from './UserCard'
import AddCampaign from './AddCampaign'

interface Props {
    navigation: StackNavigationProp<any, any>,
}


const Search: React.FC<Props> = ({ navigation }) => {
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [filters, setFilters] = React.useState<Filter>({ ...INITIAL_FILTERS, userType })
    const [arr, setArr] = React.useState(Food)
    const [visible, setVisible] = React.useState(false)
    const [campaignVisible, setCampaignVisible] = React.useState(false)


    const changeFilter = (type: string, text: string | number | number[] | string[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    const onSwipe = (id: number, direction: string) => {
        console.log(id, direction)
        let newArr = [...arr]
        newArr = newArr.filter(i => i.id !== id);
        setArr(newArr)
    }

    const onFavorite = (id: number) => {
        console.log(id)
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
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
                        filters={filters} changeFilter={(type: string, text: string | number | number[] | string[]) => changeFilter(type, text)}
                    />
                </View>
                <Text style={[GlobalStyles.regularText, { fontWeight: '600', marginVertical: hp('2%'), marginLeft: wp('2%') }]}>Most Popular</Text>

                <FlatList
                    data={arr}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => <UserCard
                        item={item} onSwipe={onSwipe} onFavorite={(onFavorite)}
                        viewUserProfile={(item) => navigation.navigate("UserProfile", { item, onFavorite: (id: number) => onFavorite(id) })}
                    />
                    }
                />
                {userType === "Brand" &&
                    <>
                        <TouchableOpacity onPress={() => setCampaignVisible(true)}
                            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: hp('3%'), marginRight: wp('5%') }}>
                            <Image source={ImagePath.uploadFocus} style={{ width: wp('10%'), height: hp('5%'), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <AddCampaign modalVisible={campaignVisible} hideModal={() => setCampaignVisible(false)} />
                    </>
                }
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default Search