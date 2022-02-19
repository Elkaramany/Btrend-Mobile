import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { DatesType } from './types'

interface Props {
    dates: DatesType
    setDates: (newDates: DatesType) => void
}


const Transactions: React.FC<Props> = ({ dates, setDates }) => {
    return (
        <View style={styles.container}>
            <Text>Transactions</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Transactions