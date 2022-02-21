import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
 
interface Props{
 
}
 
const Invited: React.FC<Props> = props =>{
    return(
        <View style={styles.container}>
            <Text>Invited</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container:{
        
    },
})
 
export default Invited