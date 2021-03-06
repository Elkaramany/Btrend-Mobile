import { BASE_URL, BRANDS_URL } from '@env'
import { POST } from '../../Config/API'
import { ShowToast } from '../../Config'

interface Cred {
    prop: string
    value: number | object | string | null | boolean | string[] | number[]
}

export const CampaignCredential = (cred: Cred) => {
    //Key interpolation
    return {
        type: 'Campaign_Credential_In',
        payload: { prop: cred.prop, value: cred.value }
    }
}

export const CreateCampaign = (item: any, token: string | number, goBack: () => void) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    const { success, data }: any = await POST(`${BRANDS_URL}/create`, { ...item, token })
    if (success) {
        goBack()
    }
    else ShowToast("error", "Error creating your campaign", data)
    dispatch({ type: "Switch_Loading", payload: false })
}

export const SubmitProposal = (proposal: any, id: string | number, goBack: () => void) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    const { success, data }: any = await POST(`${BASE_URL}/proposals/submit/${id}`, proposal)
    if (success) goBack()
    else ShowToast("error", "Error submitting your proposal", data)
    dispatch({ type: "Switch_Loading", payload: false })
}

export const ResetCampaign = () => async (dispatch: any) => {
    dispatch({ type: "Reset_Campaign" })
}