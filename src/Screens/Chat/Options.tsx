import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux'

import { StackNavigationProp } from '@react-navigation/stack';

import { GlobalStyles, ImagePath, Colors } from '../../Config'
import { Delete, MarkUnread, Mute, SendReport } from '../../Redux/Actions'
import Spinner from '../../Components/Spinner';

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    converastionId: string
    navigation: StackNavigationProp<any, any>
    isMuted: boolean
    name: string
}

const Options: React.FC<Props> = ({ visible, setVisible, converastionId, navigation, isMuted, name }) => {
    const dispatch = useDispatch()
    const [muted, setMuted] = React.useState(isMuted)
    const { token } = useSelector((state: RootStateOrAny) => state.AuthReducer)
    const { loading } = useSelector((state: RootStateOrAny) => state.ChatReducer)

    const ReportUser = (reason: string) => {
        dispatch(SendReport(token, converastionId, reason, setVisible))
    }

    const GoToReport = () => {
        setVisible(false)
        navigation.navigate("Report", { converastionId, name, onReport: (reason: string) => ReportUser(reason), navigation })
    }

    const showOptions = () => {
        if (visible) {
            return (
                <View style={styles.optionsContainer}>
                    {loading ? <Spinner size={true} /> :
                        <>
                            <TouchableOpacity onPress={() => dispatch(Delete(token, converastionId, navigation))}
                                style={styles.optionContainer}>
                                <Image source={ImagePath.delete} style={GlobalStyles.arrowImage} />
                                <Text style={styles.optionText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(MarkUnread(token, converastionId, setVisible))}
                                style={styles.optionContainer}>
                                <Image source={ImagePath.unread} style={GlobalStyles.arrowImage} />
                                <Text style={styles.optionText}>Mark as unread</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(Mute(token, converastionId, setVisible, muted, setMuted))}
                                style={styles.optionContainer}>
                                <Image source={muted ? ImagePath.notification : ImagePath.mute} style={GlobalStyles.arrowImage} />
                                <Text style={styles.optionText}>{muted ? "Unmute" : "Mute"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => GoToReport()}
                                style={styles.optionContainer}>
                                <Image source={ImagePath.report} style={GlobalStyles.arrowImage} />
                                <Text style={styles.optionText}>Report</Text>
                            </TouchableOpacity>
                        </>
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
        <View>
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