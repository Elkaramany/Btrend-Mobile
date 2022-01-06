import { CAMPAIGNS_URL, INFLUENCERS_URL } from '@env'
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native'
import { POST, GET } from '../../Config/API'
import Toast from 'react-native-toast-message'

export const MessageUser = (token: string, id: string, navigation: StackNavigationProp<any, any>) => async (dispatch: any) => {
    console.log("Message")
}

export const Delete = (token: string, id: string, navigation: StackNavigationProp<any, any>,) => async (dispatch: any) => {
    console.log("Delete")
}

export const MarkUnread = (token: string, id: string, setVisible: (val: boolean) => void) => async (dispatch: any) => {
    console.log("Unread")
}
export const Mute = (token: string, id: string, setVisible: (val: boolean) => void) => async (dispatch: any) => {
    console.log("Mute")
}
export const Report = (token: string, id: string, navigation: StackNavigationProp<any, any>, setVisible: (val: boolean) => void, reason: string) => async (dispatch: any) => {
    console.log("Report")
}