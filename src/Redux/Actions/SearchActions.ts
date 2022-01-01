import { CAMPAIGNS_URL, INFLUENCERS_URL } from '@env'
import { Alert } from 'react-native'
import { POST } from '../../Config/API'
import Toast from 'react-native-toast-message'
import { AddFilter, Filter } from '../../Screens/Search/Types'

export const CreateCampaign = (filters: AddFilter) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    const { success, data }: any = await POST(`${CAMPAIGNS_URL}/create`, filters)
    if (success) {
        Toast.show({
            type: 'success',
            text1: "Your campaign has been published",
        });
    }
    else {
        Toast.show({
            type: 'error',
            text1: "Error publishing your campaign",
            text2: data,
        });
    }
    dispatch({ type: "Switch_Loading", payload: false })
}

export const SearchFeed = (filters: Filter, userType: String) => async (dispatch: any) => {
    dispatch({ type: "Switch_Loading", payload: true })
    //Get influencer's profile if logged in as brand and campaigns if logged in as influencer
    const URL = userType === "Brand" ? INFLUENCERS_URL : CAMPAIGNS_URL
    const { success, data }: any = await POST(`${URL}/search`, filters)
    if (success) {
        dispatch({ type: "Received_Search_Arr", payload: data })
    }
    else {
        Toast.show({
            type: 'error',
            text1: "Error getting your feed",
            text2: data,
        });
    }
    dispatch({ type: "Switch_Loading", payload: false })
}

export const FavoriteUser = (id: string, token: string, changeFavorite: () => void, userType: string) => async (dispatch: any) => {
    const URL = userType === "Brand" ? INFLUENCERS_URL : CAMPAIGNS_URL
    const ERROR = userType === "Brand" ? "Influencer" : "campaign"
    const { success, data }: any = await POST(`${URL}/favorite/${id}`, { token })
    if (success) {
        Toast.show({
            type: 'success',
            text1: data,
        });
        changeFavorite()
    }
    else {
        Toast.show({
            type: 'error',
            text1: `Error favoriting this ${ERROR}`,
            text2: data,
        });
    }
}