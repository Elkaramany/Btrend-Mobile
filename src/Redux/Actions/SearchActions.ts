import { BRANDS_URL, INFLUENCERS_URL } from '@env'
import { POST } from '../../Config/API'
import { Filter } from '../../Screens/Search/Types'
import { AddFilter } from '../../Screens/Feed/Types'
import { ShowToast } from '../../Config'

export const SearchFeed = (filters: Filter, userType: String) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    //Get influencer's profile if logged in as brand and campaigns if logged in as influencer
    const URL = userType === "Brand" ? INFLUENCERS_URL : BRANDS_URL
    const { success, data }: any = await POST(`${URL}/search`, filters)
    if (success) dispatch({ type: "Received_Search_Arr", payload: data })
    else ShowToast("error", "Error getting your feed", data)
    dispatch({ type: "Switch_Loading", payload: false })
}

export const UserSwipe = (id: number | string, token: string, direction: string, userType: string) => async () => {
    const { success, data }: any = await POST(`${URL(userType)}/swipe/${id}/${direction}`, { token })
    if (!success) ShowToast("error", `Error swiping right on this ${ERROR_TYPE(userType)}`, data)
}

export const FavoriteUser = (id: string, token: string, changeFavorite: () => void, userType: string) => async () => {
    const { success, data }: any = await POST(`${URL(userType)}/favorite/${id}`, { token })
    if (success) {
        ShowToast("success", data)
        changeFavorite()
    }
    else ShowToast("error", `Error favoriting this ${ERROR_TYPE(userType)}`, data)
}

const ERROR_TYPE = (userType: string) => userType === "Brand" ? "Influencer" : "Campaign"
const URL = (userType: string) => userType === "Brand" ? INFLUENCERS_URL : BRANDS_URL