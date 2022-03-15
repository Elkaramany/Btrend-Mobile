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

export const getSuggesions = (text: string, arr: string[]) => {
    return arr.filter(
        (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
}