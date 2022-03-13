import { BASE_URL } from '@env'
import { POST } from '../../Config/API'
import { ShowToast } from '../../Config'

interface PROPOSAL {
    coverLetter: string
}

export const SubmitProposal = (proposal: any, id: string | number, goBack: () => void) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    console.log(BASE_URL)
    const { success, data }: any = await POST(`${BASE_URL}/proposals/submit/${id}`, proposal)
    if (success) {
        ShowToast("success", "Your propsosal has been submitted")
        goBack()
    }
    else ShowToast("error", "Error submitting your proposal", data)
    dispatch({ type: "Switch_Loading", payload: false })
}