import { CAMPAIGNS_URL, INFLUENCERS_URL } from '@env'
import { POST } from '../../Config/API'
import { Filter } from '../../Screens/Search/Types'
import { AddFilter } from '../../Screens/Feed/Types'
import { ShowToast } from '../../Config'

export const CreateCampaign = (filters: AddFilter) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    const { success, data }: any = await POST(`${CAMPAIGNS_URL}/create`, filters)
    if (success) ShowToast("success", "Your campaign has been published")
    else ShowToast("error", "Error publishing your campaign", data)
    dispatch({ type: "Switch_Loading", payload: false })
}

export const SearchFeed = (filters: Filter, userType: String) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    //Get influencer's profile if logged in as brand and campaigns if logged in as influencer
    const URL = userType === "Brand" ? INFLUENCERS_URL : CAMPAIGNS_URL
    const { success, data }: any = await POST(`${URL}/search`, filters)
    if (success) dispatch({ type: "Received_Search_Arr", payload: data })
    else ShowToast("error", "Error getting your feed", data)
    dispatch({ type: "Switch_Loading", payload: false })
}

export const UserSwipe = (id: number | string, token: string, userType: string) => async (dispatch: any) => {
    const { success, data }: any = await POST(`${URL(userType)}/swipe/${id}`, { token })
    if (!success) ShowToast("error", `Error swiping right on this ${ERROR_TYPE(userType)}`, data)
}

export const FavoriteUser = (id: string, token: string, changeFavorite: () => void, userType: string) => async (dispatch: any) => {
    const { success, data }: any = await POST(`${URL(userType)}/favorite/${id}`, { token })
    if (success) {
        ShowToast("success", data)
        changeFavorite()
    }
    else ShowToast("error", `Error favoriting this ${ERROR_TYPE(userType)}`, data)
}

const ERROR_TYPE = (userType: string) => userType === "Brand" ? "Influencer" : "campaign"
const URL = (userType: string) => userType === "Brand" ? INFLUENCERS_URL : CAMPAIGNS_URL