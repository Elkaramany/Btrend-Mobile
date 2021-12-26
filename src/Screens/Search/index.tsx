import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { Filter, INITIAL_FILTERS } from './Types'

import Container from '../../Components/Container'
import Input from '../../Components/Input'
import BottomSheet from './BottomSheet'

interface Props {

}

const Search: React.FC<Props> = props => {
    const [searchField, setSearchField] = React.useState('')
    const { userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const [filters, setFilters] = React.useState<Filter>({ ...INITIAL_FILTERS, userType })
    const [arr, setArr] = React.useState([])
    const [visible, setVisible] = React.useState(false)

    const renderItem = ({ item }: any) => {

    }

    const changeFilter = (type: string, text: string | number | number[]) => {
        const newFilters: any = { ...filters }
        newFilters[`${type}`] = text
        setFilters(newFilters)
    }

    React.useEffect(() => {
        console.log(filters)
    }, [filters])


    return (
        <View style={{ flex: 1, backgroundColor: visible ? Colors.lightGray : Colors.primary }}>
            <Container mainStyle={{ flex: 1, marginTop: hp('2%') }} mainBgColor={'transparent'}>
                <View style={styles.header}>
                    <Input
                        label={'Search'}
                        value={searchField}
                        onChangeText={(text) => setSearchField(text)}
                        inputStyle={{ width: wp('80%'), marginBottom: 0 }}
                    />

                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image source={ImagePath.filter} style={[GlobalStyles.arrowImage, { paddingHorizontal: wp('3%'), marginHorizontal: wp('5%') }]} />
                    </TouchableOpacity>

                    <BottomSheet modalVisible={visible} hideModal={() => setVisible(false)}
                        clearFilters={() => setFilters(INITIAL_FILTERS)}
                        filters={filters} changeFilter={(type: string, text: string | number | number[]) => changeFilter(type, text)}
                    />

                    <FlatList<any>
                        data={arr}
                        keyExtractor={(item, index) => `${item.item}-${index}`}
                        renderItem={renderItem}
                    />
                </View>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default Search