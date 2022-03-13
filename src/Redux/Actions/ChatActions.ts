import { CONVERSATIONS_URL } from '@env'
import { StackNavigationProp } from '@react-navigation/stack';
import { POST } from '../../Config/API'
import { ShowToast } from '../../Config'

export const MessageUser = (token: string, id: string, navigation: StackNavigationProp<any, any>) => async (dispatch: any) => {
    dispatch({ type: "Loading_Message", payload: true })

    const { success, data }: any = await POST(`${CONVERSATIONS_URL}/create/${id}`, { token })
    if (success) {
        if (data) {
            ShowToast("info", data)
        }
        navigation.navigate("Chat")
    }
    else {
        ShowToast("error", "Error starting a conversation", data)
    }
    dispatch({ type: "Loading_Message", payload: false })
}

export const Delete = (token: string, id: string, navigation: StackNavigationProp<any, any>) => async (dispatch: any) => {
    console.log("Delete")
}

export const MarkUnread = (token: string, id: string, setVisible: (val: boolean) => void) => async (dispatch: any) => {
    dispatch({ type: "Loading_Message", payload: true })

    const { success, data }: any = await POST(`${CONVERSATIONS_URL}/unread/${id}`, { token })
    if (success) {
        if (data) {
            ShowToast("info", data)
        }
    }
    else {
        ShowToast("error", data)
    }
    setVisible(false)
    dispatch({ type: "Loading_Message", payload: false })
}

export const Mute = (token: string, id: string, setVisible: (val: boolean) => void, muted: boolean, setMuted: (val: boolean) => void) => async (dispatch: any) => {
    dispatch({ type: "Loading_Message", payload: true })

    const { success, data }: any = await POST(`${CONVERSATIONS_URL}/mute/${id}`, { token })
    if (success) {
        if (data) {
            ShowToast("info", data)
        }
        setMuted(!muted)
    }
    else {
        ShowToast("error", data)
    }
    setVisible(false)
    dispatch({ type: "Loading_Message", payload: false })
}

export const SendReport = (token: string, id: string, reason: string, setVisible: (val: boolean) => void) => async (dispatch: any) => {
    dispatch({ type: "Loading_Message", payload: true })

    const { success, data }: any = await POST(`${CONVERSATIONS_URL}/report/${id}`, { token, reason })
    if (success) {
        if (data) {
            ShowToast("info", data)
        }
    }
    else {
        ShowToast("error", data)
    }
    setVisible(false)
    dispatch({ type: "Loading_Message", payload: false })
}