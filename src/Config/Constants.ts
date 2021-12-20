import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const IOS: boolean = Platform.OS === 'ios';
const ANDROID: boolean = Platform.OS === 'android';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Colors = {
    primary: '#FFFFFF',
    secondary: '#000000',
    tertiary: "#666666",
    gradientButton: ['#EA7757', '#D9453F'],
    disabledButton: ["#E0E0E0", "#E0E0E0"],
    lightGray: "#F2F2F2",
    gray: "#CCCCCC"
}

const GlobalStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        padding: wp('2.4%'),
        paddingVertical: hp('1.5%'),
        borderRadius: hp('1.75%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.gray,
        width: '100%'
    }, buttonText: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        color: Colors.primary
    }, textMissMatch: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    arrowImage: {
        width: wp('5%'),
        height: wp('5%'),
        resizeMode: 'contain'
    },
    regularText: {
        fontSize: hp('2%'),
    }
})

export { Colors, GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT };