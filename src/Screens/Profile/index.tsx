import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';
import { ClearAll } from '../../Redux/Actions';


interface Props {
    navigation: StackNavigationProp<any, any>,
}

const Profile: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()

    const signUserOut = () => {
        dispatch(ClearAll())
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => signUserOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Profile