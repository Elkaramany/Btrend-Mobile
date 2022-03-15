import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
 
interface Props{
 
}
 
const Information: React.FC<Props> = props =>{
    return(
        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
})
 
export default Information