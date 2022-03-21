import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Container from '../../../Components/Container'

interface Props {

}

const Congrats: React.FC<Props> = props => {
    return (
        <Container>
            <Text>congrats</Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Congrats