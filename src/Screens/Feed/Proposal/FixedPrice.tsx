import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Input from '../../../Components/Input'

import { GlobalStyles, Colors } from '../../../Config'

import Footer from './Footer'

interface Props {
    coverLetter: string
    setCoverLetter: (text: string) => void
    onSubmit: () => void
}

const textInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.secondary, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.primary
    }, roundness: hp('2%')
}

const FixedPrice: React.FC<Props> = ({ coverLetter, setCoverLetter, onSubmit }) => {

    return (
        <View style={styles.container}>
            <View style={[GlobalStyles.graySeperator, { width: wp('150%'), marginVertical: hp('3%') }]} />

            <Text style={[GlobalStyles.regularText, { fontWeight: '500', fontSize: hp('2.5%'), marginBottom: hp('2%') }]}>Pitch</Text>
            <Text style={[GlobalStyles.regularText, { fontWeight: '400', marginBottom: hp('2%') }]}>Cover letter</Text>
            <View style={{ height: hp('45%') }}>
                <Input
                    label=''
                    placeHolder={"Submit your pitch on why you're perfect for this project for the brand to review"}
                    value={coverLetter}
                    onChangeText={setCoverLetter}
                    multiline
                    dense
                    inputStyle={{ height: hp('30%') }}
                    theme={textInputTheme}
                />
            </View>
            <Footer Submit={onSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
})

export default FixedPrice