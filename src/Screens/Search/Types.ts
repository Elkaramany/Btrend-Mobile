import { CategoriesArr } from "../../Config";

export interface Filter {
    brand: string
    categories: string[]
    languages: string
    locations: string[]
    range: number[]
    payment: string
    search: string
    token: string
    nof: number[]
    engagementRate: number[]
    platforms: string[]
}

export const INITIAL_FILTERS = {
    brand: '',
    categories: [], languages: '',
    locations: [], range: [],
    payment: '', search: '',
    token: '', nof: [],
    engagementRate: [],
    platforms: []
}

export interface SocialMediaOutlet {
    number: string | number
    price: string | number
}

export interface Instagram {
    reel: SocialMediaOutlet
    story: SocialMediaOutlet
    live: SocialMediaOutlet
    igtv: SocialMediaOutlet
    post: SocialMediaOutlet
    carousel: SocialMediaOutlet
}

export interface Tiktok {
    feedvideo: SocialMediaOutlet
    livevideo: SocialMediaOutlet
}

export interface Snapchat {
    snap: SocialMediaOutlet
    story: SocialMediaOutlet
    spotlight: SocialMediaOutlet
}

export interface Youtube {
    video: SocialMediaOutlet
    live: SocialMediaOutlet
}

export interface SocialMedia {
    instagram: Instagram | null
    tiktok: Tiktok | null
    snapchat: Snapchat | null
    youtube: Youtube | null
}

export interface Campaign {
    coverPhoto: string
    name: string
    aim: string
    gender: string[]
    age: number[]
    languages: string[]
    categories: string[]
    tags: string[]
    nof: string[]
    engagementRate: string[]
    locations: string[]
    referencePhotos: string[]
    payment: string
    dates: string[]
    socialMedia: SocialMedia
    price: number | string
}

export const getSuggesions = (text: string, arr: string[]) => {
    return arr.filter(
        (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
}