import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

interface CardProps{
    
}

interface Props {
    user?: any
}

const Card: React.FC<Props> = props => {
    return (
        <View >
            <Text>Stats</Text>
        </View>
    )
}

const Stats: React.FC<Props> = props => {
    return (
        <View >
            <Text>Stats</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Stats