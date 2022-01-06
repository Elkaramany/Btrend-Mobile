import React from 'react'
import {
    View, StyleSheet, Image, Text,
    TouchableOpacity,
}
    from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { SearchFeed } from '../../Redux/Actions'

import Container from '../../Components/Container'
import AddCampaign from './AddCampaign'

import { INITIAL_FILTERS } from '../Search/Types';
import Feed from './Feed';

interface Props {
    navigation: StackNavigationProp<any, any>,
}


const Search: React.FC<Props> = ({ navigation }) => {
    const { userType, token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { fetchedArray } = useSelector((state: RootStateOrAny) => state.SearchReducer)
    const [arr, setArr] = React.useState<any[]>([])
    const [campaignVisible, setCampaignVisible] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(SearchFeed({ ...INITIAL_FILTERS, token }, userType))
    }, [])
    
    React.useEffect(() => {
        setArr(fetchedArray)
    }, [fetchedArray])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
            <Container mainStyle={{ flex: 1 }}>
                <View style={GlobalStyles.rowBetween}>
                    <Image source={ImagePath.btrend} style={styles.logo} />
                    <View style={GlobalStyles.rowBetween}>
                        <Text style={GlobalStyles.regularText}></Text>
                        <Image source={ImagePath.notification} style={GlobalStyles.arrowImage} />
                    </View>
                </View>
                <Feed arr={arr} navigation={navigation} setArr={setArr} />

                {userType === "Brand" &&
                    <View style={styles.addButton}>
                        <TouchableOpacity onPress={() => setCampaignVisible(true)}>
                            <Image source={ImagePath.uploadFocus} style={{ width: wp('10%'), height: hp('5%'), resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <AddCampaign modalVisible={campaignVisible} hideModal={() => setCampaignVisible(false)} />
                    </View>
                }
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    addButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: hp('2%'),
        marginRight: wp('3%')
    }, logo: {
        width: wp('35%'),
        height: hp('10%'),
        resizeMode: 'contain'
    }
})

export default Search