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
            {user.bio &&
                <CollapsibleBody header={"Bio"} title={user.bio}
                    collapsibleValue={bioVisible} setCollapsibleValue={setBioVisible}
                />
            }
            <View style={[GlobalStyles.rowBetween, { marginTop: hp('1%') }]}>
                {user.age &&
                    <GrayedContainer header='Age' title={`${user.age} years old`} />
                }
                <GrayedContainer header='Gender' title={user.gender} />
            </View>
            {user.language && user.language.length &&
                <GrayedContainer header='Language' title={user.language.join(" - ")} />
            }
            {user.location && user.location.length &&
                <GrayedContainer header='Location' title={user.location.join(" - ")} />
            }
            <GrayedContainer header='Payment type' title={user.payment} />
            {user.postsStartingAt &&
                <GrayedContainer header='Posts starting at' title={`$ ${user.postsStartingAt}`} />
            }
            {user.website && user.website.length &&
                <GrayedContainer header='Website' title={user.website} />
            }
        </View>
    )
}

const styles = StyleSheet.create({

})

export default AboutMe