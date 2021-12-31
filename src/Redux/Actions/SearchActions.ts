import { CAMPAIGN_URL } from '@env'
import { Alert } from 'react-native'
import { POST } from '../../Config/API'
import Toast from 'react-native-toast-message'
import { AddFilter } from '../../Screens/Search/Types'

export const CreateCampaign = (filters: AddFilter) => async (dispatch: any) => {
    console.log(filters)
    const { success, data }: any = await POST(`${CAMPAIGN_URL}/create`, filters)
    if (success) {
        Toast.show({
            type: 'success',
            text1: "Your campaign has been published successfully",
        });
    }
    else {
        Toast.show({
            type: 'error',
            text1: `Error publishing your campaign`,
            text2: data,
        });
    }
}