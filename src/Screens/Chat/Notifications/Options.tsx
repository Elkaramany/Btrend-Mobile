import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, ImagePath, Colors } from '../../../Config'
import { } from '../../../Redux/Actions'
import Spinner from '../../../Components/Spinner';

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    notificationId: string
    navigation: StackNavigationProp<any, any>,
    name: string
    img: any
    message: string
}

const Options: React.FC<Props> = ({ visible, setVisible, notificationId, navigation, name, img, message }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { loading } = useSelector((state: RootStateOrAny) => state.ChatReducer)

    const showOptions = () => {
        if (visible) {
            return (
                <View style={styles.optionsContainer}>
                    {loading ? <Spinner size={true} /> :
                        <View>
                            <View style={[GlobalStyles.horizontalLine,
                            {
                                width: wp('8%'), height: hp('0.15%'),
                                backgroundColor: Colors.secondary
                            }]} />
                            <Image
                                source={img}
                                style={{
                                    width: wp('18%'), height: wp('18%'),
                                    resizeMode: 'contain', borderRadius: wp('5%'),
                                    marginVertical: hp('2%')
                                }}
                            />
                            <View style={{ width: '55%', marginBottom: hp('5%') }}>
                                <Text style={[GlobalStyles.regularText,
                                { fontWeight: '500', textAlign: 'center' }]}>
                                    Notification from {name}
                                    <Text style={{ color: Colors.darkGray }}> {message}</Text>
                                </Text>
                            </View>
                            <View style={{ right: wp('15%') }}>
                                <TouchableOpacity style={{ marginVertical: hp('2%') }}>
                                    <Text style={GlobalStyles.regularText}>
                                        Remove this notification
                                    </Text>
                                </TouchableOpacity>

                                <View style={[GlobalStyles.horizontalLine, { width: '300%' }]} />

                                <TouchableOpacity style={{ marginVertical: hp('2%') }}>
                                    <Text style={GlobalStyles.regularText}>
                                        Report issue
                                    </Text>
                                </TouchableOpacity>

                                <View style={[GlobalStyles.horizontalLine, { width: '300%' }]} />

                                <TouchableOpacity style={{ marginVertical: hp('2%') }}>
                                    <Text style={GlobalStyles.regularText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            )
        }
    }

    const ShowOptions = () => {
        if (loading) return <Spinner size={true} />
        else {
            return (
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Image source={ImagePath.options} style={GlobalStyles.arrowImage} />
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={[{ flex: 1 }, GlobalStyles.centeredContainer]}>
            {!visible && <View style={{ paddingHorizontal: hp('2%') }}>{ShowOptions()}</View>}
            <Modal
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(false)}
                animationType={"slide"}
            >
                <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    {showOptions()}
                </View>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    optionsContainer: {
        ...GlobalStyles.centeredContainer,
        paddingBottom: hp('5%'),
        backgroundColor: Colors.primary,
        padding: hp('1%'),
        borderRadius: hp('1%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    }, optionContainer: {
        flexDirection: 'row',
        marginVertical: hp('1%')
    }, modalContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginTop: hp('6%'),
        marginRight: wp('3%'),
    },
    modalOverlay: {
        position: 'absolute',
        top: hp('1%'),
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    }, optionText: {
        ...GlobalStyles.regularText,
        marginLeft: wp('3%')
    }
})

export default Options