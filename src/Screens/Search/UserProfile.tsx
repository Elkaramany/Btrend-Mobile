import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    route: any
}

const UserProfile: React.FC<Props> = ({ route }) => {
    const item = route.params.item
    return (
        <View style={styles.container}>
            <Text>{item.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default UserProfile