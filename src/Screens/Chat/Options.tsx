import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux'

import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { Delete, MarkUnread, Mute, Report } from '../../Redux/Actions'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    converastionId: string
    navigation: StackNavigationProp<any, any>
}

const Options: React.FC<Props> = ({ visible, setVisible, converastionId, navigation }) => {
    const dispatch = useDispatch()
    const { token, userType } = useSelector((state: RootStateOrAny) => state.AuthReducer)

    const showOptions = () => {
        if (visible) {
            return (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => dispatch(Delete(token, converastionId, navigation))} style={styles.optionContainer}>
                        <Image source={ImagePath.delete} style={GlobalStyles.arrowImage} />
                        <Text style={styles.optionText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Image source={ImagePath.unread} style={GlobalStyles.arrowImage} />
                        <Text style={styles.optionText}>Mark as unread</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Image source={ImagePath.mute} style={GlobalStyles.arrowImage} />
                        <Text style={styles.optionText}>Mute</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionContainer}>
                        <Image source={ImagePath.report} style={GlobalStyles.arrowImage} />
                        <Text style={styles.optionText}>Report</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View>
            {!visible &&
                <TouchableOpacity style={{ paddingHorizontal: hp('2%') }} onPress={() => setVisible(true)}>
                    <Image source={ImagePath.options} style={GlobalStyles.arrowImage} />
                </TouchableOpacity>
            }
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
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Colors.primary,
        padding: hp('2%'),
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
        justifyContent: 'center',
        alignItems: 'center',
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