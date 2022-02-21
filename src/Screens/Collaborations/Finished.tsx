import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
 
interface Props{
 
}
 
const Finished: React.FC<Props> = props =>{
    return(
        <View style={styles.container}>
            <Text>Finished</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
    container:{
        
    },
})
 
export default Finished