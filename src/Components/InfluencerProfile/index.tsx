import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Posts from './Posts'
import AboutMe from './AboutMe'
import Stats from './Stats'
import { Colors, GlobalStyles } from '../../Config';

export default ({ user }: any) => {
    const [index, setIndex] = React.useState(0)

    const showTab = () => {
        if (index === 0) return <Posts user={user} />
        else if (index === 1) return <AboutMe user={user} />
        return <Stats user={user} />
    }

    return (
        <>
            <View style={{ width: wp('90%') }}>
                <View style={[GlobalStyles.rowBetween,{marginHorizontal: wp('4%')}]}>
                    <TouchableOpacity onPress={() => setIndex(0)}>
                        <Text style={[GlobalStyles.regularText, { textAlign: 'center', color: Colors.darkGray, textDecorationLine: index === 0 ? "underline" : "none", textDecorationColor: Colors.darkRed, }]}>
                            Posts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIndex(1)}>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, textDecorationLine: index === 1 ? "underline" : "none", textDecorationColor: Colors.darkRed }]}>
                            About Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIndex(2)}>
                        <Text style={[GlobalStyles.regularText, { color: Colors.darkGray, textDecorationLine: index === 2 ? "underline" : "none", textDecorationColor: Colors.darkRed }]}>
                            Stats</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView style={{ marginTop: hp('1%') }}>
                {showTab()}
            </SafeAreaView>
        </>
    );
}
