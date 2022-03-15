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
    darkRed: "#EE0979",
    brightRed: '#FF6A00',
    gradientButton: ['#EE0979', '#FF6A00'],
    disabledButton: ["#E0E0E0", "#E0E0E0"],
    inputGray: "#afafaf",
    lightGray: "#F2F2F2",
    veryLightGray: "#f6f6f6",
    mediumGray: "#C4C4C4",
    lineGray: "#b6b6b6",
    darkGray: "#666666",
    gray: "#CCCCCC",
    blue: "#0E94F6",
    blackOpacity30: 'rgba(0,0,0,0.30)',
}

const grayTextInputTheme = {
    colors: {
        placeholder: Colors.gray, text: Colors.gray, primary: Colors.gray,
        underlineColor: Colors.gray, background: Colors.gray
    }, roundness: hp('3%')
}

const semiGrayTextInputTheme = {
    colors: {
        placeholder: Colors.inputGray, text: Colors.darkGray, primary: Colors.inputGray,
        underlineColor: Colors.inputGray, background: Colors.lightGray
    }, roundness: hp('5%')
}

const GlobalStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }, rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        padding: wp('2.4%'),
        paddingVertical: hp('0.75%'),
        borderRadius: wp('7%'),
        borderWidth: wp('0.3%'),
        borderColor: Colors.gray,
        width: '100%'
    }, buttonText: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: Colors.primary
    }, textMissMatch: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    arrowImage: {
        width: wp('6%'),
        height: wp('6%'),
        resizeMode: 'contain'
    },
    regularText: {
        fontSize: hp('2%'),
        color: Colors.secondary,
        fontFamily: "Outfit-Regular"
    }, rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }, horizontalLine: {
        alignSelf: 'center',
        backgroundColor: Colors.lineGray,
        height: hp('0.06%'),
        width: '100%',
        marginVertical: hp('1%')
    }, roundedImg: {
        height: hp('7%'),
        width: hp('7%'),
        resizeMode: 'cover',
        borderRadius: wp('50%'),
    }, graySeperator: {
        width: WIDTH * 1.5,
        height: hp('1.5%'),
        right: wp('10%'),
        backgroundColor: Colors.lightGray,
        marginVertical: hp('2%')
    }, redLine: {
        width: wp('28%'),
        height: hp('0.5%'),
        backgroundColor: Colors.brightRed,
        borderRadius: wp('1%')
    }
})

export { Colors, GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT, grayTextInputTheme, semiGrayTextInputTheme };