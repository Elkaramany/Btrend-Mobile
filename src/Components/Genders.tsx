import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import RNLocalize from 'react-native-localize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { ArabCountries, ImagePath, GlobalStyles } from '../Config'
import RadioBtn from './RadioBtn'

interface Props {
    gender: string
    setGender: (value: string) => void
}

const Genders: React.FC<Props> = ({ gender, setGender }) => {
    const navigatio
    return (
        <View style={[GlobalStyles.rowBetween, { marginBottom: hp('5%') }]}>
            <RadioBtn
                text={"Female"}
                selected={gender === "Female"}
                onPress={() => setGender(gender === "Female" ? "" : "Female")}
            />

            <RadioBtn
                text={"Male"}
                selected={gender === "Male"}
                onPress={() => setGender(gender === "Male" ? "" : "Male")}
            />

            {!ArabCountries.includes(RNLocalize.getCountry()) &&
                <TouchableOpacity
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate("Genders")}
                >
                    <Text style={[GlobalStyles.regularText, { color: Colors.blue }]}>{gender.length && gender !== 'Male' && gender !== 'Female' ? gender : "More"}</Text>
                    <Image source={ImagePath.rightArrow} style={{ width: wp('3%'), height: wp('3%'), left: wp('4.5%'), top: hp('0.3%') }} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default Genders