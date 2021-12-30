import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    user?: any
}

const AboutMe: React.FC<Props> = props => {
    return (
        <View style={{}}>
            <Text>Aboutme</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default AboutMe