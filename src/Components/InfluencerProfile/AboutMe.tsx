import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { GlobalStyles, Colors } from '../../Config'

import CollapsibleBody from '../CollapsibleBody'
import GrayedContainer from '../GrayedContainer'

interface Props {
    user?: any
}

const AboutMe: React.FC<Props> = ({ user }) => {
    const [bioVisible, setBioVisible] = React.useState(false)

    return (
        <View style={{}}>
            <CollapsibleBody header={"Bio"} title={user.title}
                collapsibleValue={bioVisible} setCollapsibleValue={setBioVisible}
            />
            <View style={[GlobalStyles.rowBetween, { marginTop: hp('1%')}]}>
                <GrayedContainer header='Age' title={`${user.cookTime} years old`} />
                <GrayedContainer header='Gender' title={user.title} />
            </View>
            <GrayedContainer header='Language' title={user.title} />
            <GrayedContainer header='Location' title={user.title} />
            <GrayedContainer header='Payment type' title={user.title} />
            <GrayedContainer header='Posts starting at' title={`$ ${user.title}`} />
            <GrayedContainer header='Website' title={user.title} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AboutMe