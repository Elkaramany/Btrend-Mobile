import axios from 'axios'

const AXIOS = async (method: string, url: string, data?: any) => {
    try {
        //@ts-ignore
        const res = await axios({
            method: method,
            url,
            data,
        })
        return { success: true, data: res?.data || null }
    } catch (e: any) {
        //To make sure the user has an internet connection if the server doesn't return an error
        return { success: false, data: e?.response?.data || "Please check your internet connection" }
    }
}

export const POST = async (url: string, data?: any) => {
    return AXIOS("post", url, data)
}

export const GET = async (url: string, data?: any) => {
    return AXIOS("get", url, data)
}

export const PATCH = async (url: string, data?: any) => {
    return AXIOS("patch", url, data)
}