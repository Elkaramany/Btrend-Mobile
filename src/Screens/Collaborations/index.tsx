import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector, useDispatch } from 'react-redux'

import Container from '../../Components/Container'
import { GlobalStyles } from '../../Config'

interface Props {

}

const Collaborations: React.FC<Props> = props => {
    return (
        <Container >
            <Text style={[GlobalStyles.regularText, { fontWeight: 'bold', marginLeft: wp('4%') }]}>My Collaborations</Text>
            <View style={GlobalStyles.horizontalLine} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Collaborations