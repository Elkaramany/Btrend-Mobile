import axios from 'axios'

export const POST = async (url: string, data?: any) => {
    try {
        const res = await axios({
            method: 'post',
            url,
            data,
        })
        return { success: true, data: res?.data || null }
    } catch (e: any) {
        return { success: false, data: e?.response?.data || null }
    }
}

export const GET = async (url: string, data?: any) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            data,
        })
        return { success: true, data: res?.data || null }
    } catch (e: any) {
        return { success: false, data: e?.response?.data || null }
    }
}